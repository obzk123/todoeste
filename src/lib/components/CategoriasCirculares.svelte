<script lang="ts">
	const categorias = [
	{ nombre: 'Perfumes', imagen: '/images/perfumes.jpg' },
	{ nombre: 'Electrodomésticos', imagen: '/images/electrodomesticos.png' },
	{ nombre: 'Hogar', imagen: '/images/hogar.jpg' },
	{ nombre: 'Jardín y Herramientas', imagen: '/images/jardin.jpg' },
	{ nombre: 'Celulares', imagen: '/images/celulares.png' },
	{ nombre: 'Deportes', imagen: '/images/celulares.png' }
];
</script>

<div class="flex justify-center gap-8 flex-wrap mt-6">
	{#each categorias as categoria}
		<div class="flex flex-col items-center">
			<a href={`/?categoria=${categoria.nombre}`} class="flex flex-col items-center">
				<img src={categoria.imagen} alt={categoria.nombre} class="w-40 h-40 rounded-full object-cover shadow" />
				<span class="mt-2 text-sm font-semibold text-center">{categoria.nombre}</span>
			</a>
		</div>
	{/each}
</div>