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
    #myProjectBox {
        display: block;
        width: 300px;
        height: 300px;
        background: #F0F0F0;
        border: 1px solid #E8E8E8;
        box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.10);
        border-radius: 4px;
        position: absolute;
        top: 56px;
        left: 50%;
        margin-left: -150px;
    }

    #myProjectBox .inner-search {
        margin: 8px auto 0;
        width: 281px;
        height: 30px;
        border: 1px solid #E8E8E8;
        border-radius: 2px;
        font-size: 12px;
        color: #ACACAC;
        letter-spacing: 0;
        display: flex;
        justify-content: flex-start;
        flex-flow: nowrap row;
        padding: 0;
    }

    #myProjectBox .inner-search:hover {
        border: 1px solid rgba(56, 56, 56, 0.6);
    }

    #myProjectBox .inner-search .inner-search-text {
        width: 247px;
        height: 30px;
        border: 0;
        outline: none;
        border-radius: 2px 0 0 2px;
        font-size: 16px;
        text-indent: 10px;
        font-weight: normal;
        background-color: #FFF;
        margin: 0;
        padding: 0;
    }

    #myProjectBox .inner-search .inner-search-text::-webkit-input-placeholder {
        font-size: 12px;
        color: #464646;
        opacity: 0.6;
    }

    #myProjectBox .inner-search a {
        width: 34px;
        height: 30px;
        display: block;
        float: left;
        background: #FFF;
        border-radius: 0 2px 2px 0;
    }

    #myProjectBox .inner-search a img {
        position: relative;
        left: 3px;
        top: 5px;
    }

    #myProjectBox .searcher-result {
        width: 300px;
        height: 250px;
        margin: 8px auto;
        overflow-y: auto;
        overflow-x: hidden;
        background: #FFF;
    }

    #myProjectBox .searcher-result ul {
        list-style: none;
    }

    #myProjectBox .searcher-result ul li {
        box-shadow: 0 1px 0 0 #E8E8E8;
    }

    #myProjectBox .searcher-result ul .searcher-result-li div {
        width: 285px;
        height: 44px;
        display: block;
        font-size: 12px;
        color: #808080;
        line-height: 44px;
        text-align: left;
        letter-spacing: 0;
    }

    #myProjectBox .searcher-result ul .searcher-result-li img {
        /*height: 26px;*/
        /*width: 26px;*/
        border-radius: 2px;
        margin: 10px 0 0 22px;
        display: block;
        float: left;
    }

    #myProjectBox .searcher-result ul .searcher-result-li div a {
        position: relative;
        left: 6px;
        float: left;
        line-height: 44px;
        margin-left: 8px;
        font-size: 12px;
        color: #808080;
        letter-spacing: 0;
        display: block;
    }

    #myProjectBox .searcher-result ul li:hover {
        background: #EDEDED;
    }

    #myProjectBox .searcher-result ul .searcher-result-li div .currentSelectedProject {
        width: 20px;
        height: 20px;
        float: left;
        margin-left: 0;
    }

    #myProjectBox .searcher-result ul .searcher-result-li div .currentSelectedProject .currentSelected {
        width: 20px;
        height: 20px;
        margin: 12px 0 0 8px;
    }
</style>
