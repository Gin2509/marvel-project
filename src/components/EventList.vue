<template>
  <div>
    <h3>Events</h3>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{ event.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    events: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
});
</script>