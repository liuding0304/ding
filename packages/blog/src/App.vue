<template>
  <div class="app-content">
    <router-view></router-view>
  </div>
  <!-- <IndexFooter class="app-footer" /> -->
</template>

<style>
  .app {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .app-content {
    flex: 1;
    flex-basis: auto;
    overflow: auto;
  }
  .app-footet {
    flex-shrink: 0;
  }
</style>
