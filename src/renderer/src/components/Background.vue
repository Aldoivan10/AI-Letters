<template>
  <div class="stars-wrapper">
    <svg class="extras" width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <radialGradient id="comet-gradient" cx="0" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="rgba(255,255,255,.8)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <g transform="rotate(-135)">
        <ellipse
          class="comet comet-a"
          fill="url(#comet-gradient)"
          cx="0"
          cy="0"
          rx="150"
          ry="2"
        ></ellipse>
      </g>
      <g transform="rotate(20)">
        <ellipse
          class="comet comet-b"
          fill="url(#comet-gradient)"
          cx="100%"
          cy="0"
          rx="150"
          ry="2"
        ></ellipse>
      </g>
      <g transform="rotate(300)">
        <ellipse
          class="comet comet-c"
          fill="url(#comet-gradient)"
          cx="40%"
          cy="100%"
          rx="150"
          ry="2"
        ></ellipse>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

function rnd(min = 0, max = 1) {
  const num = Math.floor(Math.random() * (max - min + 1) + min)
  return +num.toFixed(2)
}

function getSVG({ type = 'svg', className, width, height, fill, transform, aspectRatio }: SVGargs) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', type)
  if (aspectRatio) svg.setAttribute('preserveAspectRatio', aspectRatio)
  if (transform) svg.setAttribute('transform', transform)
  if (className) svg.setAttribute('class', className)
  if (height) svg.setAttribute('height', height)
  if (width) svg.setAttribute('width', width)
  if (fill) svg.setAttribute('fill', fill)
  return svg
}

function getStar() {
  const $star = getSVG({ className: 'star', type: 'circle' })
  const cx = `${Math.round(rnd(1, 100))}%`
  const cy = `${Math.round(rnd(1, 100))}%`
  const r = rnd(0.5, 1.5).toString()
  $star.setAttribute('cx', cx)
  $star.setAttribute('cy', cy)
  $star.setAttribute('r', r)
  return $star
}

function getComet(className: string) {
  const $g = getSVG({
    type: 'g',
    transform: `rotate(${Math.round(rnd(250, 350))})`
  })
  const $comet = getSVG({
    type: 'ellipse',
    fill: 'url(#comet-gradient)',
    className: `comet ${className}`
  })
  const cx = `${Math.round(rnd(40, 60))}%`
  const cy = `${Math.round(rnd(0, 25))}%`
  $comet.setAttribute('cx', cx)
  $comet.setAttribute('cy', cy)
  $comet.setAttribute('rx', '150')
  $comet.setAttribute('ry', '2')
  $g.appendChild($comet)
  return $g
}

function buildStars(container) {
  const max = Math.max(Math.round(window.innerWidth * 0.125), 55)
  const numStars = Math.round(rnd(max - 50, max))
  for (let i = 0; i < numStars; ++i) {
    const $star = getStar()
    container.appendChild($star)
  }
}

function init() {
  const $wrapper = document.querySelector('.stars-wrapper')!
  const $comets = $wrapper?.querySelector('.extras')
  const classes = ['comet-a', 'comet-b', 'comet-c']

  for (const clazz of classes) {
    const $comet = getComet(clazz)
    $comets?.appendChild($comet)
  }

  for (let s = 0; s < 3; ++s) {
    const $svg = getSVG({
      className: 'stars',
      width: '100%',
      height: '100%',
      aspectRatio: 'none'
    })
    $wrapper.appendChild($svg)
    buildStars($svg)
  }
}

onMounted(init)
</script>

<style>
.stars-wrapper {
  --twinkle-duration: 4s;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(#16161d, #271f3a, #232658);

  .star {
    fill: white;

    &:nth-child(3n) {
      opacity: 0.8;
    }

    &:nth-child(7n) {
      opacity: 0.6;
    }

    &:nth-child(13n) {
      opacity: 0.4;
    }

    &:nth-child(19n) {
      opacity: 0.2;
    }
  }

  .stars {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    animation: twinkle var(--twinkle-duration) ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: calc(var(--twinkle-duration) * -0.33);
    }

    &:nth-child(3) {
      animation-delay: calc(var(--twinkle-duration) * -0.66);
    }
  }

  .comet {
    transform-origin: center center;
    animation: comet 10s linear infinite;
  }

  .comet-b {
    animation-delay: -3.3s;
  }

  .comet-c {
    animation-delay: -5s;
  }
}

@keyframes twinkle {
  25% {
    opacity: 0;
  }
}

@keyframes comet {
  0%,
  40% {
    transform: translateX(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  60%,
  100% {
    transform: translateX(-100vmax);
    opacity: 0;
  }
}

@keyframes halo {
  from {
    opacity: 0.05;
    box-shadow: 0 0 0 0.1 white;
  }

  to {
    opacity: 0.05;
    box-shadow: 0 0 0 1em white;
  }
}
</style>
