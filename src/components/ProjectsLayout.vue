<template>
    <div class="main-content-container" style="position: relative; min-width: 1200px">
        <el-tabs
                v-model="activeName"
                @tab-click="handleClick"
                style="margin: 0 auto; padding: 0 35px;  width: 1200px;">
            <el-tab-pane label="项目列表" name="projects">
                <template slot="label">
                    <img style="float: left; margin: 11px 5px 0 0; width: 17px;"
                         :src="activeName === 'projects' ? require('../assets/img/p-projects-list-hl.svg') : require('../assets/img/p-projects-list.svg')">
                    项目列表
                </template>
            </el-tab-pane>
            <el-tab-pane label="项目动态" name="projects-dynamic">
                <template slot="label">
                    <img style="float: left; margin: 11px 5px 0 0; width: 17px;"
                         :src="activeName === 'projects-dynamic' ? require('../assets/img/p-dynamic-hl.svg') : require('../assets/img/p-dynamic.svg')">
                    项目动态
                </template>
            </el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "projectsLayout",
        data() {
            return {
                activeName: 'projects'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                console.log(tab.name);
                this.$router.push(tab.name)
            }
        },
        mounted() {
            this.activeName = this.$route.path.substring(1) === '' ? 'projects' : this.$route.path.substring(1);
        }
    }
</script>

<style scoped>

</style>