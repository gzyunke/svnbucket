<template>
    <div style="position: relative; width:1200px; margin: auto; padding: 0 35px;">


        <!--分类-->
        <el-radio-group class="projects-belong" v-model="currentTab" @change="switchTab">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="iCreate">我创建的</el-radio-button>
            <el-radio-button label="iJoin">我加入的</el-radio-button>
        </el-radio-group>


        <div class="view-type">
            <!--<p style="float: left;">视图切换：</p>-->
            <button class="view-type-btn" @click="setViewType" title="显示模式切换">
                <img :src="require('../assets/img/switchList.svg')" style="width: 18px;margin-top: 2px">
            </button>
        </div>

        <!--<el-input style="width:350px;float: right" class="input-with-select"-->
                  <!--v-model="keyword"-->
                  <!--clearable-->
                  <!--placeholder="搜索名字、描述"-->
                  <!--@keyup.enter.native="search">-->
            <!--<el-button slot="prepend" @click="search">搜索</el-button>-->
        <!--</el-input>-->
        <el-input style="width:250px;float: right; margin-right: 20px;" class="input-with-select project-search"
                  v-model="keyword"
                  clearable
                  @keyup.enter.native="search" placeholder="搜索名字、描述">
            <el-button slot="prepend" @click="search" circle>
                <img style="float: left;" src="../assets/img/p-project-search.svg">
            </el-button>
        </el-input>

        <!--项目列表-->
        <el-card class="box-card projects">
            <div class="cover">
                <ul :class="viewType === '1' ? 'simple' : ''" style="padding: 0 0 10px">
                        <li  v-for="project in projects" :key="project._id">
                            <div class="projectItemBox" @click="jump2Detail(project._id)">
                                <div class="img" v-if="viewType === '0'">
                                    <img :src="coverFullURL(project.imgURL)">
                                </div>
                                <div class="project-title">
                                    <h4>{{project.name}}</h4>
                                    <h5>
                                        {{project.desc}}
                                    </h5>
                                    <div class="collect" @click.stop="star(project._id, project.star)">
                                        <img src="../assets/img/collect-Y.svg" v-if="project.star > 0">
                                        <img class="has-not-collected" src="../assets/img/collect-N.svg" v-else>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li v-if="projects.length < pageSize" class="add-project" id="hide-add-project"
                            @click="$store.commit('setNewProjectDialogVisible', true)">
                            <div class="projectItemBox addProjectBtn">
                                <h3>创建新项目</h3>
                            </div>
                        </li>
                </ul>
            </div>

            <div class="pagination">
                <el-pagination
                        @current-change="handlePageChange"
                        layout="total, prev, pager, next"
                        :page-size="pageSize"
                        :total="totalCount">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import tools from '../assets/js/tools'
    export default {
        data() {
            return {
                totalCount: 10,
                currentTab: 'all',
                page: 1,
                keyword: '',
                pageSize: 16,
                projects: [],
                viewType: '',
            }
        },
        methods: {
                handlePageChange(val) {
                    this.page = val;
                    this.getProjects();
                },
                switchTab(tab) {
                    this.page = 1
                    this.getProjects()
                },
                jump2Detail(pid) {
                    this.$router.push('/detail/' + pid)
                },
                coverFullURL(url) {
                    return tools.imgFullPath(url, 'cover', 1, 260, 130);
                    // return tools.CDN_ROOT + "/cover/" + url + "?imageView2/1/w/260/h/130";
                },
                search() {
                    this.currentTab = 'all';
                    this.page = 1;
                    this.getProjects()
                },
                star(pid, star) {
                    let self = this;
                    let param = new FormData();
                    param.append('projectId', pid);
                    param.append('star', star > 0 ? 0 : 1);
                    this.$axios.post('/api/starProject', param).then(function (response)
                    {
                        if (response.data.success === false)
                        {
                            console.log(response.data.msg);
                            return
                        }
                        self.getProjects()
                    })
                },
                getProjects() {
                    let self = this;

                    let param = new FormData();
                    param.append('page', this.page);
                    param.append('pageSize', this.pageSize);
                    param.append('keyword', this.keyword);
                    param.append('ptype', this.currentTab);
                    this.$axios.post('/api/projectList', param).then(function (response)
                    {
                        if (response.data.success === false)
                        {
                            console.log(response.data.msg);
                            return
                        }
                        self.projects = response.data.list;
                        self.totalCount = response.data.totalCount;
                    })
                },

                setViewType() {
                    if (this.viewType === '0') {
                        this.viewType = '1';
                        this.page = 1;
                        this.pageSize = 30;
                        this.getProjects();
                    } else {
                        this.viewType = '0';
                        this.page = 1;
                        this.pageSize = 16;
                        this.getProjects();
                    }
                    window.localStorage.setItem('viewType', this.viewType);
                    window.localStorage.setItem('projectPageSize', this.pageSize);
                }
            },
        created() {
            this.page = 1;
            this.pageSize = window.localStorage.getItem('projectPageSize') ? parseInt(window.localStorage.getItem('projectPageSize')) : 16;
            this.viewType = window.localStorage.getItem('viewType') ? window.localStorage.getItem('viewType') : '0';
            this.getProjects();
        },
    }

</script>

<style scoped>
    .pagination {
        margin: 0;
    }

    .cover ul {
        display: flex;
        justify-content: flex-start;
        flex-flow: row wrap;
        margin: 0 0 0 -20px;
        padding: 10px 0 20px 0;
        width: 1200px;
        list-style: none;
        background: #fff;
    }

    #main .cover ul li {
        width: 258px;
        height: 130px;
        margin: 12px 21px;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
        border-radius: 5px;
        flex-basis: auto;
        display: list-item;
    }
    #main .cover ul li .collect img.has-not-collected {
        display: none;
    }
    #main .cover ul li:hover img.has-not-collected {
        display: block;
    }
    #main .cover ul li .projectItemBox {
        border-radius: 5px;
        width: 100%;
        height: 100%;
        transition: .214s;
        overflow: hidden;
        /*padding:0 10px;*/
        /*background: transparent;*/
        background-color: aliceblue;
        box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.15);
    }
    #main .cover ul li .projectItemBox:hover {
        box-shadow: 0 6px 17px 5px rgba(70, 70, 70, 0.25) !important;
        margin-top: -4px;
    }
    #main .cover ul li .img {
        float: left;
        margin-top: -14px;
    }
    #main .cover ul li img {
        display: block;
        width: 258px;
        height: 131px;
        border-radius: 5px;
        float: left;
        margin-top: 13px;
    }
    #main .cover ul li div {
        display: block;
        height: 0;
        z-index: 2;
    }
    #main .cover ul li .project-title {
        position: relative;
        top: -15px;
        height: 81px;
        background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.00) 100%);
        border-radius: 5px;
        line-height: 20px;
        color: #fefefe;
    }
    #main .cover ul li .project-title h4 {
        position: relative;
        top: 15px;
        margin: 15px 0 0 16px;
        /*font-weight: 400;*/
        font-size: 14px;
    }
    #main .cover ul li .project-title h5 {
        position: relative;
        top: 17px;
        padding: 0 5px;
        overflow: hidden;
        margin:5px 5px 5px 11px;
        font-weight: 400;
        /*background-color: #00b0e8;*/
        height:80px;
        font-size: 13px;
    }
    #main .cover ul li .lock {
        position: absolute;
        top: 89px;
        left: 224px;
        background: black;
        opacity: 0.9;
        z-index: 5;

    }
    #main .cover ul li a {
        text-decoration: none;
    }
    #main .cover ul li .collect {
        position: absolute;
        top: -14px;
        left: 231px;
        cursor: pointer;
        opacity: 1;
    }
    #main .cover ul li .collect img {
        width: 22px;
        height: auto;
        border-radius: 0;
        border-right: 1px solid transparent;
    }
    #main .cover ul.simple li .collect img {
        width: 19px;
    }
    #main .cover ul li .lock img {
        width: 20px;
        height: 20px;
    }
    #main .cover ul .add-project {
        background: #FFFFFF;
        border-radius: 3px;

    }
    #main .cover ul li .addProjectBtn {
        background: url("../assets/img/add-project-N.svg") 109px 29px no-repeat;
    }
    #main .cover ul .add-project h3 {
        font-size: 16px;
        color: #ACACAC;
        letter-spacing: 0;
        font-weight: normal;
        text-indent: 90px;
        position: relative;
        top: 80px
    }
    #main .cover ul li .addProjectBtn:hover {
        background: url("../assets/img/add-project-Y.svg") 109px 29px no-repeat;
    }
    #main .cover ul .add-project:hover h3 {
        color: #1891F0;
        letter-spacing: 0;
    }
    #hide-add-project {
        width: 100px;
        height: 60px;
        margin: 40px auto 40px auto;
        display: block;
    }

    /* create at 2019.03.01 by AzerChan */

    .view-type {
        position: absolute;
        top: 0;
        left: 300px;
        font-size: 14px;
        color: #474747;
        line-height: 35px;
    }
    .view-type-btn {
        margin-top: 2px;
        padding-top: 2px;
        width: 35px;
        height: 35px;
        border: none;
        text-align: center;
        border-radius: 4px;
        background: #fff;
        box-sizing: border-box;
        cursor: pointer;
        outline: none;
    }
    .view-type-btn:hover {
        background: #e8e8e8;
    }

    #main .cover ul.simple li {
        width: 157px;
        height: 86px;
    }

    #main .cover ul.simple li .project-title {
        background-image: unset;
        color: #474747;
    }
    #main .cover ul.simple li .project-title h4 {
        margin: 5px 0 0 10px;
        color: #409EFF;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    #main .cover ul.simple li .project-title h5 {
        margin: 0 5px;
        height: unset;
        color: #909399;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #main .cover ul.simple li .collect {
        position: absolute;
        top: -3px;
        left: 125px;
        cursor: pointer;
        opacity: 1;
    }
    #main .cover ul.simple li .addProjectBtn {
        background: url('../assets/img/add-project-N.svg') 64px 28px no-repeat;
        background-size: 30px auto;
    }
    #main .cover ul.simple li .addProjectBtn h3 {
        opacity: 0;
    }


















</style>
<style>
    .projects-belong .el-radio-button__inner {
        border: none;
        color: #474747;
        background: #fff;
        box-shadow: none;
    }
    .projects-belong .is-active .el-radio-button__inner {
        border: none;
        color: #409eff;
        background: #fff;
        box-shadow: none;
    }
    .projects-belong .el-radio-button:first-child .el-radio-button__inner {
        border-left: none;
    }
    .projects.box-card.el-card {
        border: none;
        box-shadow: none;
    }
    .project-search .el-input__inner {
        padding-left: 0;
        height: 35px;
        line-height: 35px;
        border-color: #e0e0e0;
        border-left: none;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }
    .project-search .el-input-group__prepend {
        height: 33px;
        border-color: #E0E0E0;
        border-right: none;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background: #fff;
    }
    .project-search .el-input-group__prepend .el-button {
        padding: 14px 8px 5px;
    }
    .projects.box-card .el-card__body {
        padding: 0 20px;
    }
</style>
