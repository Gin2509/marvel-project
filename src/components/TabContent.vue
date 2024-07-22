<template>
    <div v-if="isActive">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';

  // eslint-disable-next-line no-undef
defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
});
  </script>
  
  <style scoped>
   /* Estilo para el contenido de las pestañas */
   .tab-content {
    border: 1px solid #ddd;
    border-top: none; /* Eliminar el borde superior para que se conecte con la pestaña activa */
    border-radius: 0 0 5px 5px; /* Bordes redondeados en la parte inferior */
    padding: 16px;
    background-color: white;
  }
  </style>