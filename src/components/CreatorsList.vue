<template>
  <section class="main__container">
    <div class="card" v-for="creator in creators" :key="creator.id">

        <div class="card__body" >
          <img
          class="card__image"
          :alt="creator.fullName"
          :src="`${creator.thumbnail.path}.${creator.thumbnail.extension}`"
        />
              <h4 class="card__text">{{ creator.fullName }}</h4>
        </div>
    </div>
  </section>

</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    creators: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
});
</script>
<style scoped>
.creator-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.creator-card {
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

.creator-image {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
}

.creator-info {
  padding: 0.5rem;
  text-align: center;
}

.creator-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  margin: 0;
}

.creator-description {
  margin: 0.5rem 0 0;
  color: #666;
}
</style>