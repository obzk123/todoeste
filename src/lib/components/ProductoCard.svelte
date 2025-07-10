<script lang="ts">
  import { goto } from '$app/navigation';

  export let producto: any;

  function navegarADetalle() {
    goto(`/detalles/${encodeURIComponent(producto.id)}`);
  }
</script>

<button
  type="button"
  class="bg-white rounded-lg shadow-md p-4 text-left hover:shadow-lg transition w-full"
  on:click={navegarADetalle}
  aria-label={`Ver detalle del producto ${producto.nombre}`}
>
  <img
    src={producto.imagen}
    alt={producto.nombre}
    class="w-full h-40 object-contain rounded mb-3"
  />

  <h2 class="text-md font-bold mb-1">{producto.nombre}</h2>
  <p class="text-sm text-gray-500 mb-2">{producto.descripcion_corta}</p>

  <div class="flex items-center gap-2">
    <p class="text-green-600 font-semibold text-sm">${producto.precio}</p>
    <a
      href={`https://wa.me/5491164521435?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(producto.nombre)}`}
      target="_blank"
      class="text-green-600 hover:text-green-800 transition"
      aria-label={`Enviar WhatsApp sobre ${producto.nombre}`}
      on:click|stopPropagation
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.93 11.93 0 0012 0a11.94 11.94 0 00-10.3 18.1L0 24l6.15-1.61A11.94 11.94 0 1012 0c3.18 0 6.1 1.24 8.32 3.48zM12 21.6a9.63 9.63 0 01-4.9-1.33l-.35-.2-3.65.96.98-3.55-.23-.36a9.63 9.63 0 0114.75-11.48A9.63 9.63 0 0112 21.6zm5.32-7.38l-1.53-.44c-.21-.06-.45-.1-.64.11l-.88.91a.53.53 0 01-.59.14 7.49 7.49 0 01-3.94-3.94.53.53 0 01.14-.59l.91-.88c.2-.19.17-.43.11-.64l-.44-1.53a.56.56 0 00-.52-.4c-.28-.02-.55-.04-.82-.04a1.62 1.62 0 00-1.63 1.63c0 .94.14 1.85.4 2.71a10.35 10.35 0 004.78 5.62 10.3 10.3 0 002.71.4 1.62 1.62 0 001.63-1.63c0-.27-.01-.54-.04-.82a.56.56 0 00-.4-.52z"/>
      </svg>
    </a>
  </div>
</button>
