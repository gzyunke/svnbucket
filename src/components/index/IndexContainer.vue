<template>
    <div id="index">
        <div id="user-box" class="user-box">
            <index-header></index-header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import IndexHeader from './IndexHeader.vue';

    export default {
        name: 'index',
        components: {
            'index-header': IndexHeader,
        }
    }

</script>

<style>

</style>
