import drop from '@renderer/assets/drop.mp3'
import music from '@renderer/assets/music.mp3'
import put from '@renderer/assets/put.mp3'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useController = defineStore('controller', () => {
  const $starSpace = ref<SVGElement>(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
  const $ornament = ref<SVGElement>(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
  const rows = ref<Array<number | undefined>>(JSON.parse(localStorage.getItem('rows') || '[]'))
  const playMusic = ref<boolean>(JSON.parse(localStorage.getItem('music') || 'true'))
  const maxColumns = computed(() => Math.max(...rows.value.map((row) => row || 0)))
  const sayChar = ref<boolean>(JSON.parse(localStorage.getItem('say') || 'true'))
  const utterance = ref<SpeechSynthesisUtterance>()
  const $draggable = ref<SVGElement>()
  const showDialog = ref(false)
  const canMove = ref(false)

  new AudioContext()
  const dropSound = new Audio(drop)
  const musicSound = new Audio(music)

  musicSound.loop = true
  musicSound.volume = 0.8

  if (playMusic.value) musicSound.play()

  if ('speechSynthesis' in window) {
    utterance.value = new SpeechSynthesisUtterance()
    utterance.value.lang = 'es-ES'
    window.speechSynthesis.onvoiceschanged = () => {
      if (utterance.value)
        utterance.value.voice = window.speechSynthesis
          .getVoices()
          .find((voice) => voice.name === 'Microsoft Sabina - Spanish (Mexico)')!
    }
  }

  function startDrag(evt: MouseEvent) {
    const $el = evt.target as SVGElement
    const $star = $el.cloneNode(true) as SVGElement
    const { width } = $starSpace.value.getBoundingClientRect()
    const percentW = (width / window.innerWidth) * 100
    const x = evt.pageX
    const y = evt.pageY

    $star.classList.add('draggable')

    $star.style.width = `${percentW}%`
    $star.style.setProperty('--x', `calc(${x}px - 50%)`)
    $star.style.setProperty('--y', `calc(${y}px - 50%)`)

    $draggable.value = $star
    document.body.appendChild($star)
  }

  function drag(evt: MouseEvent) {
    const $star = $draggable.value
    if (canMove.value && $star) {
      $star.style.setProperty('--x', `calc(${evt.pageX}px - 50%)`)
      $star.style.setProperty('--y', `calc(${evt.pageY}px - 50%)`)
    }
  }

  function dragEnd(evt: MouseEvent) {
    const $star = $draggable.value
    canMove.value = false
    if ($star) {
      const elements = document.elementsFromPoint(evt.pageX, evt.pageY)
      const $space = elements.find((el) => el.classList.contains('star-space'))
      const $text = $star.querySelector('text')
      const $g = $star.querySelector('g')

      $g?.classList.add('placed')

      if ($space) {
        const sound = new Audio(put)
        sound.volume = 0.5
        sound.play()

        $space.querySelector('.placed')?.remove()
        $space.querySelector('text')?.remove()

        $space.appendChild($g!)
        $space.appendChild($text!)

        playOrnament($ornament.value, $space)

        checkRow($space.classList[1])
      }

      $star.remove()
      $draggable.value = undefined
    }
  }

  function checkRow(rowClass: string) {
    const $spaces = document.querySelectorAll(`.${rowClass}`)
    const arr = Array.from($spaces)
    const complete = arr.every(($el) => $el.querySelector('.placed'))
    if (complete) {
      const word = arr.map(($el) => $el.querySelector('text')?.textContent).join('')
      sayLetter(word)
    }
  }

  function removeLetter($svg: SVGElement) {
    const $placed = $svg.querySelector('.placed')
    if ($placed) {
      $svg.querySelector('text')?.remove()
      $placed.remove()
      dropSound.play()
    }
  }

  function sayLetter(letter: string) {
    if (sayChar.value && utterance.value) {
      utterance.value.text = letter
      window.speechSynthesis.speak(utterance.value)
    }
  }

  function playOrnament($ornament: SVGElement, $target: Element) {
    const { x, y, width } = $target.getBoundingClientRect()
    $ornament.style.width = `${width}px`
    $ornament.style.left = `${x}px`
    $ornament.style.top = `${y}px`
    $ornament.style.opacity = '1'

    $ornament
      .animate(
        [
          { transform: `rotate(0deg)`, opacity: 1 },
          { transform: `rotate(360deg)`, opacity: 0 }
        ],
        {
          duration: 0.5 * 1000,
          easing: 'ease-in-out'
        }
      )
      .finished.then(() => {
        $ornament.style.opacity = '0'
      })
  }

  window.api.showBoardConfig(() => (showDialog.value = true))
  window.api.onToggleMusic((val) => (playMusic.value = val))
  window.api.onToggleSay((val) => (sayChar.value = val))
  window.api.setValues(playMusic.value, sayChar.value)

  window.addEventListener('mousemove', drag)
  window.addEventListener('mouseup', dragEnd)
  window.addEventListener('mousedown', () => (canMove.value = true))

  watch(playMusic, (val) => {
    if (val) musicSound.play()
    else musicSound.pause()
    localStorage.setItem('music', val.toString())
  })
  watch(sayChar, (val) => localStorage.setItem('say', val.toString()))
  watch(rows, (arr) => {
    localStorage.setItem('rows', JSON.stringify(arr))
    const $spaces = document.querySelectorAll('.star-space')
    $spaces.forEach(($el) => {
      $el.querySelector('.placed')?.remove()
      $el.querySelector('text')?.remove()
    })
  })

  return {
    rows,
    sayChar,
    $ornament,
    $starSpace,
    showDialog,
    maxColumns,
    removeLetter,
    startDrag,
    sayLetter
  }
})
