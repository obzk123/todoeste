<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let precioMin = '';
  export let precioMax = '';
  export let orden = '';

  const dispatch = createEventDispatcher();

  function aplicar() {
    dispatch('filtrar', {
      precioMin,
      precioMax,
      orden
    });
  }
</script>

<div class="bg-white rounded-lg shadow-md p-4 self-start">
  <h2 class="text-xl font-bold mb-4 text-green-700">Filtrar y Ordenar</h2>

  <label class="block mb-2 text-sm font-semibold">Ordenar por:</label>
  <select bind:value={orden} class="w-full border px-2 py-1 rounded mb-4">
    <option value="">Seleccionar</option>
    <option value="precioAsc">Precio Ascendente</option>
    <option value="precioDesc">Precio Descendente</option>
    <option value="nombreAsc">Nombre Ascendente</option>
    <option value="nombreDesc">Nombre Descendente</option>
  </select>

  <label class="block mb-2 text-sm font-semibold">Precio mínimo:</label>
  <input type="number" bind:value={precioMin} class="w-full border px-2 py-1 rounded mb-4" />

  <label class="block mb-2 text-sm font-semibold">Precio máximo:</label>
  <input type="number" bind:value={precioMax} class="w-full border px-2 py-1 rounded mb-4" />

  <button on:click={aplicar} class="bg-green-600 text-white px-4 py-2 rounded w-full">
    Aplicar Filtros
  </button>
</div>
