<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-black;
  padding: 0 20px;
}
</style>
