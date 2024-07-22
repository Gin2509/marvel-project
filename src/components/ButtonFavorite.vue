<template>
    <button @click="toggleFavorite(serie)" class="favorite-button">
        <svg
          v-if="isFavorite(serie?.id)"
          width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Ícono para cuando está marcado como favorito -->
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="red"/>
        </svg>
        <svg
          v-else
          width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Ícono para cuando NO está marcado como favorito -->
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="gray"/>
        </svg>
      </button>
</template>

<script lang="ts" setup>
    import type { PropType } from "vue";
    import { SeriesDto } from "../views/home/interfaces";
    import { useSeriesStore } from "../views/history/store";

    // eslint-disable-next-line no-undef
    defineProps({
        serie: {
            type: Object as PropType<SeriesDto | null>,
            required: true,
        },
    });


    const storeFavoriteSerie = useSeriesStore();

    const isFavorite = (id: number | undefined): boolean => {
    if (id === undefined) return false;
        return storeFavoriteSerie.isFavorite(id);
    };

    const toggleFavorite = (seriesDetail: SeriesDto | null) => {
        if (!seriesDetail) return;
        if (isFavorite(seriesDetail.id)) {
            storeFavoriteSerie.removeFavoriteSerie(seriesDetail.id);
        } else {
            storeFavoriteSerie.addFavoriteSerie(seriesDetail);
        }
    };
</script>
