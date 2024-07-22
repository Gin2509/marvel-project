<template>
  <section >
    <h1>Marvel Series</h1>
    <div ref="scrollContainer" class="scroll-container" @scroll="onScroll" >
      <template v-if="series?.length">
        <div v-for="item in series" :key="item.id" class="card-wrapper">
          <div :class="['card-type', getTypeClass(item.type)]">
            {{ item.type || 'Default' }}
          </div>
          <SeriesCard :item="item" />
        </div>
      </template>
    </div>
    <span v-if="loading" class="loading">
      <div class="spinner"></div>
      <p> Loading data, please wait...</p>  
    </span>
    <span v-if="isError" class="loading">
      <p class="error__status">
        An error occurred while retrieving the information
      </p>
    </span>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import useSeries from "@/views/home/composable/marvelApiSeries";
import SeriesCard from "@/components/SeriesCard.vue";

const { series, fetchSeries, loading, isError } = useSeries();
const scrollContainer = ref<HTMLElement>();



const getTypeClass = computed(() => {
  return (type:string) => {
  switch (type) {
    case 'collection': return 'collection';
    case 'limited': return 'limited';
    default: return 'default'; // Clase predeterminada para tipos no reconocidos
  }}
})
const onScroll = () => {
  if (scrollContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading.value) {
      fetchSeries();
    }
  }
};

fetchSeries();
</script>

<style lang="scss">
@import "./styles/home.scss";
</style>
