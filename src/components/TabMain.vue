<template>
    <div>
        <li class="tab-item" :class="{ active: isActive }" @click="$emit('click')">
            <slot></slot>
        </li>
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

.tab-item {
    display: block;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    color:white
}

.tab-item.active {
    background-color: black;
    color: white;
    border-bottom: 1px solid transparent; /* Ocultar el borde inferior para el efecto de pestaña */
  }
</style>