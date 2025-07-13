<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import productos from '$lib/stores/productos';
	import { get } from 'svelte/store';

	let producto: any = null;
	let imagenActual = null;

	// Función que actualiza el producto al cambiar el ID
	function actualizarProducto(id: string) {
		const todos = get(productos);
		producto = todos.find((p) => p.id === id);
		if (producto) {
			imagenActual = `/${producto.imagen}`;
		}
	}

	// Suscribirse al store $page para reaccionar al cambio de ID
	const unsubscribe = page.subscribe(($page) => {
		const id = $page.params.id;
		if (id) actualizarProducto(id);
	});

	onDestroy(unsubscribe);

	function volverAtras() {
		history.back();
	}

	function abrirWhatsApp(nombre: string) {
		const mensaje = `Hola, me interesa el producto: ${nombre}`;
		const numero = '5491164521435';
		window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
	}
</script>

{#if producto}
  <div class="p-6">

    <!-- Botón volver -->
    <button on:click={volverAtras} class="mb-4 text-sm text-green-700 font-semibold hover:underline">
      ← Volver
    </button>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Columna izquierda -->
<div class="lg:w-1/2 w-full flex flex-col items-center">
  <!-- Imagen principal -->
  <img src={imagenActual} alt={producto.nombre} class="rounded-lg w-full object-contain h-96 mb-4" />

<!-- Miniaturas con botones accesibles -->
<div class="flex gap-2 justify-center">
  <button on:click={() => imagenActual = `/${producto.imagen}`} class="p-0 border-none bg-transparent">
    <img
      src={`/${producto.imagen}`}
      alt="Miniatura 1"
      class="w-20 h-20 rounded object-cover"
    />
  </button>

  <button on:click={() => imagenActual = `/${producto.imagen2}`} class="p-0 border-none bg-transparent">
    <img
      src={`/${producto.imagen2}`}
      alt="Miniatura 2"
      class="w-20 h-20 rounded object-cover"
    />
  </button>

  <button on:click={() => imagenActual = `/${producto.imagen3}`} class="p-0 border-none bg-transparent">
    <img
      src={`/${producto.imagen3}`}
      alt="Miniatura 3"
      class="w-20 h-20 rounded object-cover"
    />
  </button>
</div>
</div>

      <!-- Columna derecha -->
      <div class="lg:w-1/2 w-full">
        <!-- Título y descripción -->
        <h1 class="text-3xl font-bold text-green-700 mb-2">{producto.nombre}</h1>
        <p class="text-gray-700 mb-6">{producto.descripcion_larga}</p>

        <!-- Especificaciones -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2 text-green-700">Especificaciones:</h2>
          <ul class="list-disc list-inside text-sm text-gray-800">
			        <span>{producto.especificaciones}</span>
          </ul>
        </div>

        <!-- Información adicional -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2 text-green-700">Información adicional:</h2>
            <ul class="list-disc list-inside text-sm text-gray-800">
				<li>Efectivo o transferencia: ${producto.precio}</li>
				<li>Tarjeta: tiene interés</li>
				<li>Precio en dólares: se toma el blue</li>
				<li>Entrega a domicilio o retiro por zona oeste</li>
			</ul>
        </div>

        <!-- Botón de WhatsApp -->
        <button
          on:click={() => abrirWhatsApp(producto.nombre)}
          class="bg-green-600 text-white w-full py-3 text-center text-lg font-semibold rounded hover:bg-green-700 transition flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M20.52 3.48A11.93 11.93 0 0012 0a11.94 11.94 0 00-10.3 18.1L0 24l6.15-1.61A11.94 11.94 0 1012 0c3.18 0 6.1 1.24 8.32 3.48zM12 21.6a9.63 9.63 0 01-4.9-1.33l-.35-.2-3.65.96.98-3.55-.23-.36a9.63 9.63 0 0114.75-11.48A9.63 9.63 0 0112 21.6zm5.32-7.38l-1.53-.44c-.21-.06-.45-.1-.64.11l-.88.91a.53.53 0 01-.59.14 7.49 7.49 0 01-3.94-3.94.53.53 0 01.14-.59l.91-.88c.2-.19.17-.43.11-.64l-.44-1.53a.56.56 0 00-.52-.4c-.28-.02-.55-.04-.82-.04a1.62 1.62 0 00-1.63 1.63c0 .94.14 1.85.4 2.71a10.35 10.35 0 004.78 5.62 10.3 10.3 0 002.71.4 1.62 1.62 0 001.63-1.63c0-.27-.01-.54-.04-.82a.56.56 0 00-.4-.52z"/>
          </svg>
          Consultar
        </button>
      </div>
    </div>
  </div>
{:else}
  <p class="p-6 text-gray-500">Cargando producto...</p>
{/if}
