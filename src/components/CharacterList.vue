<template>
  <section class="main__container">
    <span v-if="loading" class="loading">
      <div class="spinner"></div>
      <p> Loading data, please wait...</p>  
    </span>
    <div class="card" v-for="character in characters" :key="character.id">

        <div class="card__body" >
            <img class="card__image" :alt="character.name"
              :src="`${character.thumbnail.path}.${character.thumbnail.extension}`" />
              <h4 class="card__text">{{ character.name }}</h4>
              <p class="card__pharagraph">{{ character.description }}</p>
        </div>
    </div>
    
  </section>
</template>

<script lang="ts" setup>
import { PropType, watch } from "vue";
import useSeries from "@/views/home/composable/marvelApiSeries";

const { loading, series } = useSeries();

// eslint-disable-next-line no-undef
defineProps({
  characters: {
    type: Array as PropType<any[]>,
    required: true,
  },
});
watch(() => series.value, (newSeries) => {
  if (newSeries.length > 0) {
    loading.value = false;
  }
}, { immediate: true });
</script>

