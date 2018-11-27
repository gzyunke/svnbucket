<template>
    <div style="width:1200px; margin: auto">
        <!--分类-->
        <el-radio-group v-model="currentTab" style="margin-bottom: 18px;" @change="switchTab">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="iCreate">我创建的</el-radio-button>
            <el-radio-button label="iJoin">我加入的</el-radio-button>
        </el-radio-group>

        <el-input style="width:350px;float: right" class="input-with-select"
                  v-model="keyword"
                  clearable
                  placeholder="搜索名字、描述"
                  @keyup.enter.native="search">
            <el-button slot="append" @click="search">搜索</el-button>
        </el-input>

        <!--项目列表-->
        <el-card class="box-card">
            <div class="cover">
                <ul id="projectList">
                    <li v-for="project in projects">
                        <div class="projectItemBox" @click="jump2Detail(project._id)">
                            <div class="img">
                                <img :src="coverFullURL(project.imgURL)">
                            </div>
                            <div class="project-title">
                                <h4>{{project.name}}</h4>
                                <h5>
                                    {{project.desc}}
                                </h5>
                                <div class="collect" @click.stop="star(project._id, project.star)">
                                    <img src="../assets/img/collect-Y.svg" v-if="project.star > 0">
                                    <img src="../assets/img/collect-N.svg" v-else>
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
        data()
        {
            return {
                totalCount: 10,
                currentTab: 'all',
                page: 1,
                keyword: '',
                pageSize: 16,
                projects: []
            }
        },
        methods:
            {
                handlePageChange(val)
                {
                    this.page = val;
                    this.getProjects();
                },
                switchTab(tab)
                {
                    this.page = 1
                    this.getProjects()
                },
                jump2Detail(pid)
                {
                    this.$router.push('/detail/' + pid)
                },
                coverFullURL(url)
                {
                    return tools.imgFullPath(url, 'cover', 1, 260, 130);
                    // return tools.CDN_ROOT + "/cover/" + url + "?imageView2/1/w/260/h/130";
                },
                search()
                {
                    this.currentTab = 'all'
                    this.page = 1
                    this.getProjects()
                },
                star(pid, star)
                {
                    let self = this
                    let param = new FormData()
                    param.append('projectId', pid)
                    param.append('star', star > 0 ? 0 : 1)
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
                getProjects()
                {
                    let self = this;

                    let param = new FormData()
                    param.append('page', this.page)
                    param.append('pageSize', this.pageSize)
                    param.append('keyword', this.keyword)
                    param.append('ptype', this.currentTab)
                    this.$axios.post('/api/projectList', param).then(function (response)
                    {
                        if (response.data.success === false)
                        {
                            console.log(response.data.msg);
                            return
                        }
                        self.projects = response.data.list
                        self.totalCount = response.data.totalCount;
                    })
                },
            },
        created()
        {
            this.page = 1
            this.getProjects();
        },
    }

</script>

<style scoped>
    .pagination {
        margin: 0;
    }

    .cover ul {
        min-width: 880px;
        list-style: none;
        background: #fff;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        width: 98%;
        padding: 10px 0 20px 0;
        margin: 0 auto;
    }

    #main .cover ul li {
        width: 258px;
        height: 130px;
        margin: 12px 12px 12px 12px;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
        border-radius: 5px;
        flex-basis: auto;
        display: list-item;
    }

    #main .cover ul li .projectItemBox {
        border-radius: 5px;
        width: 258px;
        height: 130px;
        transition: .214s;
        overflow: hidden;
        /*padding:0 10px;*/
        background: transparent;
        box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.15);
    }

    #main .cover ul li .projectItemBox:hover {
        box-shadow: 0 6px 17px 5px rgba(70, 70, 70, 0.25) !important;
        margin-top: -4px;
    }

    #main .cover ul li:hover {

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
        width: 258px;
        height: 81px;
        background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.00) 100%);
        border-radius: 5px;
    }

    #main .cover ul li .project-title h4 {
        position: relative;
        top: 15px;
        margin: 15px 0 0 16px;
        font-weight: 400;
        line-height: 20px;
        font-size: 14px;
        color: #fefefe;
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
        line-height: 20px;
        font-size: 14px;
        color: #fefefe;
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
        height: 25px;
        border-radius: 0;
        border-right: 1px solid transparent;
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
</style>
