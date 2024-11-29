<template>
  <section class="board">
    <template v-for="(cols, row) in rows">
      <Space ref="$spaces" :class="`row-${row}`" v-for="_ in cols" />
      <div v-for="_ in maxColumns - (cols ?? 0)"></div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { useController } from '@renderer/store/controler'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import Space from './Space.vue'

const $spaces = ref<(typeof Space)[]>([])
const controller = useController()
const { rows, maxColumns, $starSpace } = storeToRefs(controller)
const colsTemplate = computed(() => `repeat(${maxColumns.value}, 1fr)`)

onMounted(() => ($starSpace.value = $spaces.value[0].$el))
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
