<template>
  <div id="app">
    <main-tab-bar/>
    <router-view/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar.vue'
export default {
  name: 'app',
    components: {
        MainTabBar
    }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
