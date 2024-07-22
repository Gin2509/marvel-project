<template>
  <section class="main__container">
    <div class="card" v-for="comic in comics" :key="comic.id">

        <div class="card__body" >
          <img
          class="card__image"
          :alt="comic.title"
          :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
        />
              <h4 class="card__text">{{ comic.title }}</h4>
              <p class="card__pharagraph">{{ comic.description }}</p>
        </div>
    </div>
    
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    comics: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
});
</script>
<style scoped>
.comic-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.comic-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.comic-image {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
}

.comic-info {
  padding: 0.5rem;
  text-align: center;
}

.comic-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  margin: 0;
}

.comic-description {
  margin: 0.5rem 0 0;
  color: #666;
}
</style>