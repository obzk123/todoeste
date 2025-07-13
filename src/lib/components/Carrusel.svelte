<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import productosStore from '$lib/stores/productos';
	import { get } from 'svelte/store';

	let index = 0;
	let productos: any[] = [];
	let interval: any;

	onMount(() => {
		const lista = get(productosStore);

		// Si ya están cargados los productos
		if (lista.length > 0) {
			procesarProductos(lista);
		} else {
			// Esperamos a que se carguen
			const unsubscribe = productosStore.subscribe((data) => {
				if (data.length > 0) {
					procesarProductos(data);
					unsubscribe(); // Nos desuscribimos para no reaccionar más
				}
			});
		}
	});

	function procesarProductos(data: any[]) {
		productos = data
			.filter(p => p.imagen && p.nombre && p.descripcion_corta)
			.sort(() => 0.5 - Math.random())
			.slice(0, 3);

		if (productos.length > 0) {
			interval = setInterval(() => {
				index = (index + 1) % productos.length;
			}, 4000);
		}
	}

	function verMas() {
		goto(`/detalles/${productos[index]?.id}`);
	}
</script>

{#if productos.length > 0}
	<div class="relative w-[90%] mx-auto mt-6 overflow-hidden rounded-lg shadow">
		<img
			src={productos[index].imagen.trim()}
			alt={productos[index].nombre}
			class="w-full h-[500px] object-cover"
			on:error={() => console.error("Error cargando imagen:", productos[index].imagen)}
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent text-white p-6 flex flex-col justify-end">
			<h2 class="text-2xl font-bold">{productos[index].nombre}</h2>
			<p class="mb-2">{productos[index].descripcion_corta}</p>
			<button
				class="self-start bg-white text-green-700 px-4 py-1 rounded font-semibold"
				on:click={verMas}
			>
				Ver más →
			</button>
		</div>
	</div>
{:else}
	<p class="text-center mt-8 text-gray-500">Cargando productos...</p>
{/if}
