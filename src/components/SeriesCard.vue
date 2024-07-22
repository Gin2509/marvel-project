<template>
  <article class="card" >
    <div v-if="item" class="card__body" @click="viewDetail(item)">
      <img class="card__image" :alt="item.title" :src="item.image" />
      <span class="card__text">{{ item.title }}</span>
      <span class="card__pharagraph">({{ item.startYear }} - {{ item.endYear }})</span>
    </div>
    <span v-else class="no-data-message" style="color:antiquewhite">No results found</span>
    <span v-if="item.resourceRelationship" class="card__recurso">
       <span>{{buildMessageResource(item.resourceRelationship)}}</span>
    </span>
    <div class="icon__favorite">
      <ButtonFavorite v-if="showSaveButton && item" :serie="item" />
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { SeriesDto,ResourceRelationship } from "@/views/home/interfaces";
import { useSeriesStore } from "@/views/history/store";
import { useRouter } from "vue-router";
import ButtonFavorite from "@/components/ButtonFavorite.vue";


// eslint-disable-next-line no-undef
defineProps({
  item: {
    type: Object as PropType<SeriesDto>,
    required: true,
  },
  showSaveButton: {
    type: Boolean,
    default: false,
  },
});

const storeSerie = useSeriesStore();

const router = useRouter();

const viewDetail = (serie: SeriesDto) => {
  storeSerie.addSerie(serie);
  router.push({
    name: "details",
    params: { id: serie.id, title: serie.title },
  });
};

const buildMessageResource = (resources : ResourceRelationship[]) => {
  return resources.filter((r)=>r.count).map((r) => `${r.typeResource} (${r.count})`).join(', ');
};
</script>

<style scoped>
.icon__favorite{
  position: relative;
  float: right;
  margin-top: 3rem;
  
}
</style>
