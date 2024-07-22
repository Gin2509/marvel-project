<template>
  <nav>
    <router-link to="/">H O M E</router-link>
    <router-link :to="{name:'history'}">H I S T O R Y</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
