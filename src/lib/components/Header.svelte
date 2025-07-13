<script lang="ts">
	import { goto } from '$app/navigation';
    import { get } from 'svelte/store';
    import productos, { initProductos } from '$lib/stores/productos';

	let busqueda = '';
	let resultadosFiltrados: any[] = [];

    // Cargar productos al inicio
	initProductos();

	const categorias = [
		{ nombre: 'Novedades', ruta: '/' },
		{ nombre: 'Perfumes', ruta: '/productos?categoria=perfumes' },
		{ nombre: 'Electrodomésticos', ruta: '/productos?categoria=electrodomesticos' },
		{ nombre: 'Hogar', ruta: '/productos?categoria=hogar' },
		{ nombre: 'Jardín y Herramientas', ruta: '/productos?categoria=jardin' },
		{ nombre: 'Celulares', ruta: '/productos?categoria=celulares' },
        { nombre: 'Deportes', ruta: '/productos?categoria=deportes' },
		{ nombre: 'Acerca de', ruta: '/acerca' }
	];

function filtrarResultados() {
	const texto = busqueda.trim().toLowerCase();
	const lista = get(productos);

	if (texto) {
		resultadosFiltrados = lista
			.filter(p => p.nombre.toLowerCase().includes(texto))
			.slice(0, 5);
	} else {
		resultadosFiltrados = [];
	}
}

function buscar() {
	const texto = busqueda.trim().toLowerCase();
	const lista = get(productos);

	const encontrado = lista.find(p => p.nombre.toLowerCase().includes(texto));
	if (encontrado) {
		busqueda = '';
		resultadosFiltrados = [];
		goto(`/detalles/${encontrado.id}`);
	} else {
		alert('Producto no encontrado');
	}
}
    
</script>

<style>
	/* Para evitar que el contenedor colapse al mostrar resultados */
	.buscador-wrapper {
		position: relative;
	}
</style>

<header class="bg-white shadow-sm border-b border-gray-200 px-8 py-8 flex items-center justify-between rounded-t-xl">
    <!-- IZQUIERDA: Logo -->
    <div class="flex items-center w-[10%]">
        <button on:click={() => goto(categorias[0].ruta)} class="p-0 border-none bg-transparent">
            <img src="/images/icono.png" alt="Ir a Novedades" class="w-24 h-20 ml-[-4px]" />
        </button>
    </div>

    <!-- CENTRO: Categorías -->
    <nav class="flex justify-start gap-8 text-lg text-gray-800 font-medium flex-1 whitespace-nowrap ml-10">
        {#each categorias as cat}
            <button class="hover:text-green-600" on:click={() => goto(cat.ruta)}>
                {cat.nombre}
            </button>
        {/each}
    </nav>

<!-- Buscador -->
<div class="flex items-center buscador-wrapper gap-2">
	<div class="relative w-80">
		<input
			type="text"
			placeholder="Buscar producto..."
			bind:value={busqueda}
			on:input={filtrarResultados}
			on:keydown={(e) => e.key === 'Enter' && buscar()}
			class="border border-gray-300 rounded-full px-5 py-2.5 text-base w-full shadow-sm"
		/>

		<!-- Sugerencias -->
		{#if resultadosFiltrados.length}
			<ul class="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 shadow-md">
				{#each resultadosFiltrados as resultado}
					<li>
						<button
							type="button"
							on:click={() => {
								busqueda = '';
								resultadosFiltrados = [];
								goto(`/detalles/${resultado.id}`);
							}}
							class="w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
						>
							{resultado.nombre}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<!-- Botón Buscar -->
	<button
		on:click={buscar}
		class="ml-2 bg-gray-900 text-white p-2.5 rounded-full hover:bg-gray-700 transition"
		aria-label="Buscar"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
		</svg>
	</button>
</div>
</header>


