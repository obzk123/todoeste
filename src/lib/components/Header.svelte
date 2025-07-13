<script lang="ts">
	import { goto } from '$app/navigation';
	import { loadProductosCSV } from '$lib/utils/loadCSV';

	let busqueda = '';

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

	async function buscar() {
		if (!busqueda.trim()) return;

		const productos = await loadProductosCSV();
		const texto = busqueda.trim().toLowerCase();

		const encontrado = productos.find(p =>
			p.nombre.toLowerCase().includes(texto)
		);

		if (encontrado) {
			goto(`/detalles/${encontrado.id}`);
		} else {
			alert('Producto no encontrado');
		}
	}
</script>
<header class="bg-white shadow-sm border-b border-gray-200 px-8 py-8 flex items-center justify-between rounded-t-xl">
    <!-- IZQUIERDA: Logo -->
    <div class="flex items-center w-[10%]">
        <img src="/images/icono.png" alt="Icono" class="w-24 h-20 ml-[-4px]" />
    </div>

    <!-- CENTRO: Categorías -->
    <nav class="flex justify-center gap-6 text-lg text-gray-800 font-medium flex-1 whitespace-nowrap ml-50">
        {#each categorias as cat}
            <button class="hover:text-green-600" on:click={() => goto(cat.ruta)}>
                {cat.nombre}
            </button>
        {/each}
    </nav>

    <!-- DERECHA: Buscador -->
    <div class="flex items-center gap-2 justify-end w-1/3">
        <input
            type="text"
            placeholder="Buscar producto..."
            bind:value={busqueda}
            on:keydown={(e) => e.key === 'Enter' && buscar()}
            class="border border-gray-300 rounded-full px-5 py-2.5 text-base w-80 shadow-sm"
        />
        <button
            on:click={buscar}
            class="bg-gray-900 text-white p-2.5 rounded-full hover:bg-gray-700 transition"
            aria-label="Buscar"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
        </button>
    </div>
</header>


