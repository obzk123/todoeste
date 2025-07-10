<script lang="ts">
  import Filtros from '$lib/components/Filtros.svelte';
  import ProductoCard from '$lib/components/ProductoCard.svelte';
  import { loadProductosCSV } from '$lib/utils/loadCSV';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { onMount, onDestroy } from 'svelte';

  let productos: any[] = [];
  let productosFiltrados: any[] = [];
  let cargado = false;

  let precioMin = '';
  let precioMax = '';
  let orden = '';

  function aplicarFiltrosPersonalizados(event) {
    const { precioMin: min, precioMax: max, orden: ordenamiento } = event.detail;
    precioMin = min;
    precioMax = max;
    orden = ordenamiento;
    aplicarFiltros();
  }

  function aplicarFiltros() {
    const $pageData = get(page);
    const categoria = $pageData.url.searchParams.get('categoria');

    let resultado = productos.filter((p) => {
      const matchCategoria = !categoria || p.categoria.toLowerCase().includes(categoria.toLowerCase());
      const precio = parseFloat(p.precio);
      const matchMin = !precioMin || precio >= parseFloat(precioMin);
      const matchMax = !precioMax || precio <= parseFloat(precioMax);
      return matchCategoria && matchMin && matchMax;
    });

    if (orden === 'precioAsc') resultado.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
    else if (orden === 'precioDesc') resultado.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
    else if (orden === 'nombreAsc') resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    else if (orden === 'nombreDesc') resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));

    productosFiltrados = resultado;
  }

  function filtrar($page) {
    const categoria = $page.url.searchParams.get('categoria');
    productosFiltrados = categoria
      ? productos.filter((p) => p.categoria.toLowerCase().includes(categoria.toLowerCase()))
      : productos;
  }

  onMount(async () => {
    productos = await loadProductosCSV();
    cargado = true;
    filtrar(get(page));
  });

  const unsubscribe = page.subscribe(($page) => {
    if (cargado) filtrar($page);
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1 class="text-3xl font-bold text-center mt-6 text-green-700">Productos</h1>

<div class="flex flex-col md:flex-row p-6 gap-6">
  <div class="md:w-1/4 w-full">
    <Filtros bind:precioMin bind:precioMax bind:orden on:filtrar={aplicarFiltrosPersonalizados} />
  </div>

  <div class="md:w-3/4 w-full">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each productosFiltrados as producto}
        <ProductoCard {producto} />
      {/each}
    </div>
  </div>
</div>
