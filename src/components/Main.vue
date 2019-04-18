<template>
    <div id="main">
        <el-container>
            <el-header>

                <header-c></header-c>
            </el-header>
            <el-main style="padding: 10px 20px">
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>

    import HeaderC from "./HeaderC";

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
                HeaderC,
            },
    }
</script>

<style scoped>
</style>
