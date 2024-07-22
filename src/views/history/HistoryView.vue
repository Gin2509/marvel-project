<template>
  <div>
    <ul class="tab-list">
      <Tab name="favorites" :isActive="activeTab === 'favorites'" @click="activeTab = 'favorites'">
        F A V O R I T E S
      </Tab>
      <Tab name="history" :isActive="activeTab === 'history'" @click="activeTab = 'history'">
        H I S T O R Y
      </Tab>
    </ul>
    <div class="tab-content">
      <TabContent name="favorites" :isActive="activeTab === 'favorites'">
        <div class="main__container">
          <SeriesCard :showSaveButton="true" v-for="item in seriesFavorite" :key="item.id" :item="item" />
        </div>
      </TabContent>
      <TabContent name="history" :isActive="activeTab === 'history'">
        <div class="main__container">
          <SeriesCard :showSaveButton="true" v-for="item in seriesHistory" :key="item.id" :item="item" />
        </div>   
      </TabContent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SeriesCard from "@/components/SeriesCard.vue";
import { useSeriesStore } from "../history/store";
import {ref} from "vue";
import { storeToRefs } from "pinia";
import Tab from '../../components/TabMain.vue';
import TabContent from '../../components/TabContent.vue';

const activeTab = ref('favorites');
const {seriesHistory, seriesFavorite} = storeToRefs(useSeriesStore());
// Usa directamente las propiedades del store

</script>

<style scoped>
.tab-list {
  display: flex; /* Hacer que las pestañas se alineen horizontalmente */
  padding: 0.5rem;
  margin: 0;
  gap:4rem;
  background-color: #4b4a4a;
  justify-content: center;
  list-style: none; /* Eliminar las viñetas */
}
</style>