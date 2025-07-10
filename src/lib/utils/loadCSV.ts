// src/lib/utils/loadCSV.ts
import Papa from 'papaparse';

export async function loadProductosCSV() {
	try {
		const res = await fetch('/productos.csv');

		if (!res.ok) {
			throw new Error(`Error al cargar el CSV: ${res.statusText}`);
		}

		const text = await res.text();

		const parsed = Papa.parse(text, {
			header: true,
			skipEmptyLines: true,
			delimiter: '@'
		});

		console.log("CSV parseado:", parsed);

		return parsed.data;
	} catch (error) {
		console.error("Error cargando productos CSV:", error);
		return [];
	}
}

