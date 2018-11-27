<template>
    <div id="myProjectBox">
        <div class="inner-search">
            <input name="search" class="inner-search-text" placeholder="" v-model="keyword">
            <a href="#">
                <img src="../assets/img/search.svg">
            </a>
        </div>
        <div class="searcher-result">
            <ul>
                <li class="searcher-result-li" v-for="project in filteredProjects" @click="jumpToProject(project._id)">
                    <router-link :to="'/detail/' + project._id">
                        <div>
                            <div class="currentSelectedProject">
                                <img class="currentSelected" v-show="currProjectInfo._id === project._id"
                                     src="../assets/img/head-arrow-checked.svg">
                            </div>
                            <img :src="imgFullPath(project.imgURL)" style="width:51px; height:26px">
                            <a><strong>{{project.name}}</strong></a>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import tools from '../assets/js/tools'
    export default {
        data()
        {
            return {
                keyword: ''
            }
        },
        methods: {
            ...mapMutations([
                'setShowQuickSelectProjectWindow',
                'updateProjectInfo',
            ]),
            onClickFunc(e)
            {
                if (this.isShowQuickSeletcProject === true)
                {
                    if (!this.$el.contains(e.target))
                    {
                        this.setShowQuickSelectProjectWindow(false);
                    }
                }
            },
            jumpToProject(pid)
            {
                this.$router.replace('/detail/' + pid)
                this.setShowQuickSelectProjectWindow(false)
            },
            imgFullPath(imgName)
            {
                return tools.imgFullPath(imgName, 'cover', 1, 51, 26);
            }
        },
        computed: {
            ...mapState([
                'isShowQuickSeletcProject',
                'projects',
                'currProjectInfo',
            ]),
            filteredProjects()
            {
                if (this.keyword === '')
                    return this.projects

                var matchs = []
                var self = this
                this.projects.forEach(function (project)
                {
                    if (project['name'].toLowerCase().indexOf(self.keyword.toLowerCase()) > -1)
                        matchs.push(project)
                })
                return matchs
            },
        },
        mounted()
        {
            document.addEventListener('click', this.onClickFunc)
        },
        destroyed()
        {
            document.removeEventListener("click", this.onClickFunc);
        }
    }
</script>

<style scoped>
    @import '../assets/css/head.css';
</style>
