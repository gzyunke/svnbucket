<template>
    <div id="index">
        <div id="user-box" class="user-box">
            <v-headbar></v-headbar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import HeadNavBar from './HeadNavbar.vue';

    export default {
        name: 'index',
        components: {
            'v-headbar': HeadNavBar,
        }
    }

</script>

<style>
    @import '../../assets/css/index.css';
  #index{
    width: 100%;
  }
</style>
