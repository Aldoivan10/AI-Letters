<template>
  <section class="board">
    <template v-for="(cols, row) in rows">
      <Space
        ref="$spaces"
        :class="`row-${row} p-${row}-${col}`"
        v-for="(_, col) in cols"
        @keyup="handleKey"
      />
      <div v-for="_ in maxColumns - (cols ?? 0)"></div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { useController } from '@renderer/store/controler'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import Space from './Space.vue'

const controller = useController()
const $spaces = ref<(typeof Space)[]>([])
const { rows, maxColumns, $starSpace } = storeToRefs(controller)
const colsTemplate = computed(() => `repeat(${maxColumns.value}, 1fr)`)
const $svgs = ref<SVGElement[]>([])
const regex = /^[\p{L}\p{N}]$/u
let hasAccent = false

function next() {
  const $els = $svgs.value
  const index = $els.indexOf(document.activeElement as SVGElement)
  $els[(index + 1) % $els.length]?.focus()
}

function prev() {
  const $els = $svgs.value
  const index = $els.indexOf(document.activeElement as SVGElement)
  $els[(index + $els.length - 1) % $els.length]?.focus()
}

function up() {
  const $el = document.activeElement
  if (!$el || !$el.classList.contains('star-space')) {
    $svgs.value[0].focus()
    return
  }

  const [, row, col] = Array.from($el.classList)[1]?.split('-').map(Number) || []
  const nextRow = (row + rows.value.length - 1) % rows.value.length

  const $space =
    $svgs.value.find(($svg) => $svg.classList.contains(`p-${nextRow}-${col}`)) ||
    $svgs.value.find(($svg) => $svg.classList.contains(`p-${nextRow}-0`))

  $space?.focus()
}

function down() {
  const $el = document.activeElement
  if (!$el || !$el.classList.contains('star-space')) {
    $svgs.value[0].focus()
    return
  }
  const [, row, col] = Array.from($el.classList)[1]?.split('-').map(Number) || []
  const nextRow = (row + 1) % rows.value.length

  const $space =
    $svgs.value.find(($svg) => $svg.classList.contains(`p-${nextRow}-${col}`)) ||
    $svgs.value.find(($svg) => $svg.classList.contains(`p-${nextRow}-0`))

  $space?.focus()
}

function accent(char: string): string {
  const accentMap: Record<string, string> = {
    a: 'á',
    e: 'é',
    i: 'í',
    o: 'ó',
    u: 'ú',
    A: 'Á',
    E: 'É',
    I: 'Í',
    O: 'Ó',
    U: 'Ú'
  }
  return accentMap[char] || char
}

function handleKey(evt: KeyboardEvent) {
  let key = evt.key
  if (key === 'Backspace') controller.toggleChar(evt.target as SVGElement)
  else if (key === 'Dead') hasAccent = true
  else if (regex.test(key)) {
    if (hasAccent) {
      key = accent(evt.key)
      hasAccent = false
    }
    controller.toggleChar(evt.target as SVGElement, key)
  }
}

window.addEventListener('keyup', (evt) => {
  if (evt.key === 'ArrowRight') next()
  else if (evt.key === 'ArrowLeft') prev()
  else if (evt.key === 'ArrowUp') up()
  else if (evt.key === 'ArrowDown') down()
})

onMounted(() => {
  $starSpace.value = $spaces.value[0].$el
  $starSpace.value.focus()
  $svgs.value = $spaces.value.map(($space) => $space.$el)
})
</script>

<style>
.board {
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 1rem;

  gap: 1rem;
  display: grid;
  place-items: center;
  grid-template-columns: v-bind(colsTemplate);

  & > .star-space {
    width: 100%;
    height: 100%;
  }
}
</style>
