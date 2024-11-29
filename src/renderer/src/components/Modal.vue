<template>
  <dialog :open="showDialog">
    <form @submit.prevent="setRows">
      <article>
        <fieldset>
          <header>
            <h2>Tablero</h2>
            <button @click="rows.push(undefined)" type="button">+</button>
            <button @click="rows.pop()" type="button">-</button>
          </header>

          <main>
            <label v-for="(col, i) in rows" :key="i">
              Fila {{ i + 1 }}
              <input
                placeholder="Columnas"
                type="number"
                :value="col"
                name="rows"
                min="1"
                required
              />
            </label>
          </main>
          <footer>
            <input class="outline" type="button" value="Cancelar" @click="showDialog = false" />
            <input type="submit" value="Guardar" />
          </footer>
        </fieldset>
      </article>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { useController } from '@renderer/store/controler'
import { storeToRefs } from 'pinia'

const ctrl = useController()
const { showDialog, rows } = storeToRefs(ctrl)

function setRows(evt: Event) {
  const $form = evt.target as HTMLFormElement
  const $inputs: HTMLInputElement[] = Array.from($form.querySelectorAll('input[name=rows]'))
  const values = $inputs.map((input) => input.valueAsNumber)
  rows.value = values
  showDialog.value = false
}
</script>

<style>
dialog {
  z-index: 2;
  width: 100%;
  height: 100%;
  border: none;
  display: grid;
  position: fixed;
  place-items: center;
  background-color: color-mix(in srgb, black, transparent 70%);

  form {
    height: 75%;
    display: flex;
    flex-direction: column;

    article {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin: 0 !important;

      fieldset {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        margin: 0 !important;

        header {
          margin-bottom: 1rem;
          align-items: center;
          display: flex;
          gap: 0.5rem;

          h2 {
            margin: 0 !important;
          }

          button {
            width: 2rem;
            height: 2rem;
            margin: 0 !important;
            padding: 0 !important;
          }
        }

        main {
          height: 0;
          flex-grow: 1;
          overflow-y: auto;
          padding-right: 1rem;
          margin-bottom: 1rem;
        }

        footer {
          display: flex;
          gap: 1rem;
        }
      }
    }
  }
}
</style>
