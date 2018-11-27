<template>
    <div id="main">
        <el-container>
            <el-header>
                <v-header/>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import header from './Header.vue'

    export default {
        data()
        {
            return {
                info: {}
            }
        },
        methods:
            {},
        components:
            {
                'v-header': header,
            },
    }
</script>

<style scoped>
</style>
