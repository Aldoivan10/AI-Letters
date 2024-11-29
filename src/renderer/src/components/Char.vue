<template>
  <svg
    version="1.0"
    class="star-char"
    viewBox="0 0 1280 1280"
    xmlns="http://www.w3.org/2000/svg"
    @mousedown="ctrl.startDrag"
  >
    <linearGradient id="char-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="10%" stop-color="#FBB407" />
      <stop offset="25%" stop-color="#FBB407" />
      <stop offset="30%" stop-color="#FDCA25" />
      <stop offset="35%" stop-color="#FBB407" />
      <stop offset="40%" stop-color="#FDCA25" />
      <stop offset="45%" stop-color="#FBB407" />
    </linearGradient>
    <g transform="translate(0,1280) scale(0.1,-0.1)">
      <path
        d="M5605 12784c367 65 753-72 1003-358 26-30 466-646 977-1370l930-1316 265 5c523 10 2025 27 2555 29 420 1 552-2 595-12 273-67 489-202 644-406 252-331 295-769 112-1141-46-92-114-190-413-590-197-264-636-852-976-1307l-616-826 145-429c80-235 191-560 245-721 155-457 282-833 477-1407 122-360 185-560 196-624 31-182 14-371-50-550-176-494-687-794-1202-705-95 16-167 40-1107 359-588 200-879 298-1395 473-179 61-405 137-503 171l-179 61-826-617c-455-340-1029-768-1277-953-539-402-523-391-640-446-452-214-999-85-1312 311-70 89-150 235-181 335-47 150-47 148-46 700 2 535 19 2119 29 2580l6 255-1318 930C834 5857 401 6168 346 6220 159 6396 45 6615 11 6864c-61 440 157 877 550 1098 107 61 66 47 1679 548 85 26 259 80 385 120 338 105 922 286 1059 329l120 37 138 444c76 245 186 598 244 785s169 543 246 790c375 1208 357 1156 455 1303 162 244 424 414 718 466Z"
      />
    </g>
    <text x="50%" y="60%" text-anchor="middle" dominant-baseline="middle">{{ char }}</text>
  </svg>
</template>

<script setup lang="ts">
import { useController } from '@renderer/store/controler'

defineProps<{ char: string }>()

const ctrl = useController()
</script>
