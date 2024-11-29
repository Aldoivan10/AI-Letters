<script setup lang="ts">
import Background from './components/Background.vue'
import Board from './components/Board.vue'
import Modal from './components/Modal.vue'
</script>

<template>
  <Background />
  <!-- <Ornament /> -->
  <Board />
  <Modal />
  <svg class="char">
    <linearGradient id="char-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="10%" stop-color="#FBB407" />
      <stop offset="25%" stop-color="#FBB407" />
      <stop offset="30%" stop-color="#FDCA25" />
      <stop offset="35%" stop-color="#FBB407" />
      <stop offset="40%" stop-color="#FDCA25" />
      <stop offset="45%" stop-color="#FBB407" />
    </linearGradient>
  </svg>
</template>
