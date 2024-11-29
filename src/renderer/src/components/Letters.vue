<template>
  <section class="letters">
    <Char v-for="char in letters" :key="char" :char @mousedown="ctrl.sayLetter(char)" />
  </section>
</template>

<script setup lang="ts">
import { useController } from '@renderer/store/controler'
import Char from './Char.vue'
const letters = [
  'a',
  'á',
  'b',
  'c',
  'd',
  'e',
  'é',
  'f',
  'g',
  'h',
  'i',
  'í',
  'ï',
  'j',
  'k',
  'l',
  'm',
  'n',
  'ñ',
  'o',
  'ó',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'ú',
  'ü',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'Á',
  'B',
  'C',
  'D',
  'E',
  'É',
  'F',
  'G',
  'H',
  'I',
  'Í',
  'Ï',
  'J',
  'K',
  'L',
  'M',
  'N',
  'Ñ',
  'O',
  'Ó',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'Ú',
  'Ü',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

const ctrl = useController()
</script>

<style>
.letters {
  gap: 1rem;
  z-index: 1;
  width: 10%;
  margin: 1rem;
  display: grid;
  padding: 1rem;
  min-width: 8rem;
  overflow-x: auto;
  user-select: none;
  border-radius: 1rem;
  place-items: center;
  grid-auto-flow: row;
  grid-auto-rows: minmax(7rem, 1fr);
  background-color: color-mix(in srgb, white, transparent 75%);
}
</style>
