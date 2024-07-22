<template>
  <section>
    <span v-if="loading" class="loading">
      <div class="spinner"></div>
      <p> Loading data, please wait...</p>  
    </span>
    <span v-if="isError" class="loading">
      <p class="error__status">
        An error occurred while retrieving the information.s
      </p>
    </span>
    <div v-if="seriesDetail?.id" class="details">
      <div class="icon__favorite">
        <ButtonFavorite :serie="seriesDetail" />
      </div>
      
      <section class="section_detail">
        <h1>{{ seriesDetail?.title }}</h1>
        <img :src="seriesDetail?.image" alt="Series" />
        <p>{{ seriesDetail?.description }}</p>
        <p>{{ seriesDetail?.endYear }}</p>
      </section>
      <ul class="tab-list">
        <Tab name="characters" :isActive="activeTab === 'characters'" @click="activeTab = 'characters'">
          C H A R A C T E R S
        </Tab>
        <Tab name="comics" :isActive="activeTab === 'comics'" @click="activeTab = 'comics'">
          C O M I C S
        </Tab>
        <Tab name="creators" :isActive="activeTab === 'creators'" @click="activeTab = 'creators'">
          C R E A T O R S
        </Tab>
        <Tab name="events" :isActive="activeTab === 'events'" @click="activeTab = 'events'">
          E V E N T S
        </Tab>
      </ul>
      <div class="tab-content">
        <TabContent name="characters" :isActive="activeTab === 'characters'">
          <CharacterList v-if="characters.length" :characters="characters" />
        </TabContent>
        <TabContent name="comics" :isActive="activeTab === 'comics'">
          <ComicList v-if="comics.length" :comics="comics" />
        </TabContent>
        <TabContent name="creators" :isActive="activeTab === 'creators'">
          <CreatorList v-if="creators.length" :creators="creators" />
        </TabContent>
        <TabContent name="events" :isActive="activeTab === 'events'">
          <EventList v-if="events.length" :events="events" />
        </TabContent>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import useSeries from "@/views/home/composable/marvelApiSeries";
import CharacterList from "../../components/CharacterList.vue";
import ComicList from "../../components/ComicList.vue";
import CreatorList from "../../components/CreatorsList.vue";
import EventList from "../../components/EventList.vue";
import ButtonFavorite from "@/components/ButtonFavorite.vue";
import Tab from '../../components/TabMain.vue';
import TabContent from '../../components/TabContent.vue';


const route = useRoute();
const { loading, isError, fetchSeriesDetails, fetchResource, seriesDetail } = useSeries();

const characters = ref<any[]>([]);
const comics = ref<any[]>([]);
const creators = ref<any[]>([]);
const events = ref<any[]>([]);

const RESOURCE_TYPES: { [key: string]: string } = {
  CHARACTERS: 'characters',
  COMICS: 'comics',
  CREATORS: 'creators',
  EVENTS: 'events',
};

const resourceRefs: { [key in string]: Ref<any[]> } = {
  characters: characters,
  comics: comics,
  creators: creators,
  events: events,
};
const activeTab = ref('characters');

const serieId = computed(() => Number(route.params.id))


const processResourceRelationship = async (resourceRelationships: any[]) => {
  const resourcePromises = resourceRelationships
    .filter(resource => resource.count > 0)
    .map(async resource => {
      const resourceType = RESOURCE_TYPES[resource.typeResource.toUpperCase()];
      if (resourceType) {
        await loadResource(serieId.value, resourceType);
      }
    });

  await Promise.allSettled(resourcePromises);
};

const loadResource = async (seriesId: number, resourceType: string) => {
  const resources = await fetchResource(seriesId, resourceType);
  resourceRefs[resourceType].value = resources;
};

onMounted(async () => {
  if (!serieId.value) return
  await fetchSeriesDetails(serieId.value);

  if (seriesDetail.value?.resourceRelationship) {
    await processResourceRelationship(seriesDetail.value?.resourceRelationship);
  }
});
</script>
<style scoped>
.icon__favorite{
  position: absolute;
  right: 34%;
  top:14%;
}
.tab-list {
  display: flex; /* Hacer que las pestañas se alineen horizontalmente */
  padding: 0.5rem;
  margin: 0;
  gap:4rem;
  background-color: #4b4a4a;
  justify-content: center;
  list-style: none; /* Eliminar las viñetas */
}
.section_detail {
  display: flex;
  flex-direction: column; /* Organiza los elementos en una columna */
  align-items: center; /* Centra horizontalmente los elementos dentro de la sección */
  text-align: center; /* Centra el texto en cada elemento */
  padding: 20px; /* Espaciado interno */
  border-radius: 8px; /* Bordes redondeados opcionales */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra opcional */
  max-width: 600px; /* Limita el ancho máximo de la sección */
  margin: auto; /* Centra la sección horizontalmente en su contenedor */
}
h1 {
  margin-bottom: 1rem; /* Espacio debajo del título */
  color: white; /* Color del texto */
}

img {
  max-width: 50%; /* Hace que la imagen se ajuste al ancho de su contenedor */
  height: auto; /* Mantiene la proporción de la imagen */
  margin-bottom: 1rem; /* Espacio debajo de la imagen */
  border-radius: 8px; /* Bordes redondeados opcionales para la imagen */
}

p {
  margin: 0.5rem 0; /* Espacio arriba y abajo de cada párrafo */
  color: white; /* Color del texto */
}
</style>