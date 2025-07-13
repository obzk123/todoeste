import { writable } from 'svelte/store';
import { loadProductosCSV } from '$lib/utils/loadCSV';
import { onMount } from 'svelte';

const productos = writable<any[]>([]);

let initialized = false;

export function initProductos() {
	if (initialized) return; // evitamos recargar varias veces

	initialized = true;

	// Solo corre en el cliente
	if (typeof window !== 'undefined') {
		onMount(async () => {
			try {
				const data = await loadProductosCSV();
				productos.set(data);
			} catch (error) {
				console.error('Error cargando productos CSV:', error);
			}
		});
	}
}

export default productos;