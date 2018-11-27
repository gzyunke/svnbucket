<template>
    <div>
        <div id="header">
            <div class="navbox">
                <div class="logo">
                    <h1 class="logoText" @click="jumpTo">SVNBucket</h1>
                </div>
                <div class="menulist">
                    <div class="menuitem" @click="$store.commit('setWxminiDialogVisible', true)">小程序版本</div>
                    <div class="menuitem" style="margin-left: 100px;" @click="openURL('https://easydoc.xyz?ADTAG=svn')">在线文档</div>
                </div>

                <div class="myproject">
                    <div id="myp" @click.prevent="setShowQuickSelectProjectWindow(!isShowQuickSeletcProject)" style="position: relative;left: 88px;">
                        <h5>{{currProjectInfo.name ? currProjectInfo.name : "我的项目"}}</h5>
                        <img src="../assets/img/header-arrow.svg">
                    </div>
                </div>
                <v-quickselect v-if="isShowQuickSeletcProject"/>
                <div class="userInfo">
                    <div class="opera">
                        <div class="head-addproject" @click="$store.commit('setNewProjectDialogVisible', true)"></div>

                        <router-link to="/projects">
                            <div class="head-index"></div>
                        </router-link>

                        <div class="head-help" @click="$store.commit('setContactDialogVisible', true)"></div>
                        <el-badge is-dot v-if="hasNotify">
                            <div class="head-message" @click="getNotifications"></div>
                        </el-badge>
                        <div v-else class="head-message" @click="getNotifications"></div>
                    </div>

                    <!--<el-dropdown >-->
                      <!--<span class="el-dropdown-link">-->
                        <!--下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                      <!--</span>-->
                        <!--<el-dropdown-menu slot="dropdown">-->
                            <!--<el-dropdown-item>用户设置</el-dropdown-item>-->
                            <!--<el-dropdown-item>问题反馈</el-dropdown-item>-->
                            <!--<el-dropdown-item>联系我们</el-dropdown-item>-->
                            <!--<el-dropdown-item divided>退出登录</el-dropdown-item>-->
                        <!--</el-dropdown-menu>-->
                    <!--</el-dropdown>-->
                    <div id='user_nickname_label' class="user" @click="setShowUserOperateWindow(!isShowUserOperateWindow)">
                        <img :src="headURL">
                        <a href="#">
                            <h4 style="display: inline;">{{userData.name}}</h4>
                            <img style="margin-top: -20px;" src="../assets/img/head-user-arrow.svg">
                        </a>
                    </div>
                    <v-useropeate v-if="isShowUserOperateWindow"/>
                </div>

            </div>
        </div>

        <el-dialog title="反馈" :visible.sync="$store.state.feedbackDialogVisible" width="520px">
            <el-form label-width="60px" label-position="top">
                <el-form-item label="问题类型">
                    <el-select v-model="type" placeholder="请选择" style="width: 480px;">
                        <el-option
                                v-for="item in feedbackOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="desc" style="width: 480px;" placeholder="请输入您的反馈内容"/>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="contact" placeholder="手机号码、QQ、微信、邮箱" style="width: 480px;"/>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="feedback" :disabled="desc.length <= 0">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog title="创建项目" :visible.sync="$store.state.newDialogVisible" width="360px">
            <el-form label-width="60px" label-position="top">
                <el-form-item label="项目名字">
                    <el-input v-model="projectName" placeholder="字母、数字、下划线的组合" style="width: 320px;"/>
                </el-form-item>
                <el-form-item label="项目简介">
                    <el-input type="textarea" v-model="projectDesc" style="width: 320px;" placeholder="简单的描述下项目"/>
                </el-form-item>
                <el-checkbox v-model="initdir" true-label="1" false-label="0">自动创建trunk、branches、tags目录结构</el-checkbox>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newProject" :disabled="projectName.length <= 0">创建私有项目</el-button>
            </div>
        </el-dialog>

        <el-dialog title="使用帮助" :visible.sync="$store.state.contactDialogVisible" width="360px">
            <el-form label-width="120px" size="small">
                <el-form-item label="QQ客服:">
                    <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=381301088&site=qq&menu=yes">
                        <img border="0" src="http://wpa.qq.com/pa?p=2:381301088:51" alt="联系客服" title="联系客服" style="margin-top: 8px"/>
                    </a>
                </el-form-item>
                <el-form-item label="SVN教程:">
                    <a target="_blank" href="https://blog.csdn.net/atsoar/article/details/80460440" style="color: #1891F0;">
                        SVN快速上手教程
                    </a>
                </el-form-item>
                <el-form-item label="SVN教程:">
                    <a target="_blank" href="https://segmentfault.com/a/1190000014549695" style="color: #1891F0;">
                        SVN常用命令
                    </a>
                </el-form-item>
                <el-form-item label="SVN客户端:">
                    <a target="_blank" href="https://tortoisesvn.net/downloads.html" style="color: #1891F0;">
                        TortoiseSVN下载
                    </a>
                </el-form-item>
                <el-form-item label="电子邮箱:">
                    <span>gzyunke@qq.com</span>
                </el-form-item>
                <!--<el-form-item label="微信客服:" size="small">-->
                    <!--<img src="/static/img/qrcode.png" style="width:120px; height:120px;">-->
                <!--</el-form-item>-->
            </el-form>
            <span style="font-size: 12px; text-align: center">       我们提供企业定制服务和私有部署，有需要欢迎联系我们</span>
        </el-dialog>

        <el-dialog title="消息通知" :visible.sync="notifyDialogVisible" width="500px">
            <el-table :data="notifications">
                <template slot="empty">
                    暂时没有新消息
                </template>
                <el-table-column label="标题" >
                    <template slot-scope="scope">
                        <div style="cursor: pointer" @click="showNotification(scope.row)">
                            <span v-if="scope.row.isRead">{{scope.row.title}}</span>
                            <h4 v-else>{{scope.row.title}}</h4>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column property="time" label="时间" width="150" :formatter="formateDateRow"/>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import HeaderQuickSelectProject from './HeaderQuickSelectProject.vue'
    import UserOperateWindow from './UserOperateWindow.vue'
    import {mapState, mapMutations} from 'vuex'
    import tools from '../assets/js/tools'

    export default {
        name: 'Header',
        data()
        {
            return {
                page: 1,
                pageSize: 50,
                keyword: '',
                initdir: '0',
                hasNotify:false,
                type: 'problem',
                desc: '',
                contact: '',
                notifyDialogVisible: false,
                projectName: '',
                projectDesc: '',
                notifications:[],
                feedbackOptions: [
                    {label: '反馈问题', value: 'problem'},
                    {label: '反馈建议', value: 'suggest'},
                    {label: '问题咨询', value: 'ask'},
                ]
            }
        },
        methods:
            {
                ...mapMutations([
                    'setIsShowNotifyWindow',
                    'setShowQuickSelectProjectWindow',
                    'setShowUserOperateWindow',
                ]),
                jumpTo()
                {
                    if(this.$route.path === '/projects')
                        this.$router.push('/');
                    else
                        this.$router.push('/projects')
                },
                openURL(url)
                {
                    window.open(url);
                },
                getUserInfo()
                {
                    let self = this;
                    this.$axios.post('/api/userInfo').then((res) =>
                    {
                        if (res.data.success === false)
                        {
                            return
                        }
                        self.$store.commit('updateUserInfo', res.data)
                    })
                },
                formateDateRow(row, column)
                {
                    return tools.formatDateBefore(row.time)
                },
                showNotification(row)
                {
                    this.$alert(row.content, '详情', {
                        dangerouslyUseHTMLString: true,
                        closeOnClickModal:true
                    });
                    this.markRead(row._id)
                },
                markRead(notifyId)
                {
                    let param = new FormData()
                    param.append('notifyId', notifyId)
                    this.$axios.post('/api/markRead', param)
                    let isAllRead = true
                    this.notifications.forEach(function (item)
                    {
                        if(item._id === notifyId)
                        {
                            item.isRead = true
                        }
                        if(!item.isRead)
                        {
                            isAllRead = false
                        }
                    })
                    this.hasNotify = !isAllRead
                },
                feedback()
                {
                    let self = this;
                    let param = new FormData()
                    param.append('type', this.type)
                    param.append('desc', this.desc)
                    param.append('contact', this.contact)
                    param.append('userid', this.$store.state.userData.userid)

                    this.$axios.post('/api/feedback', param).then(function (response)
                    {
                        if (response.data.success === false)
                            return
                        self.$message.success("提交成功")
                        self.$store.commit('setFeedbackDialogVisible', false);

                    })
                },
                getNotifications()
                {
                    let self = this;
                    this.$axios.post('/api/notifications').then(function (response)
                    {
                        self.notifications = response.data.list
                        self.notifyDialogVisible = true
                    })
                },
                newProject()
                {
                    let self = this;
                    if (this.projectName.length <= 0)
                    {
                        self.$message.error("请填写项目名字")
                        return;
                    }
                    let param = new FormData()
                    param.append('name', this.projectName)
                    param.append('desc', this.projectDesc)
                    param.append('initdir', this.initdir)
                    this.$axios.post('/api/newProject', param).then(function (response)
                    {
                        if (response.data.success === false)
                            return
                        self.$store.commit('setNewProjectDialogVisible', false);
                        self.$router.push('/detail/' + response.data.projectId);

                        self.projectName = ''
                        self.projectDesc = ''
                    })
                },
                getProjects()
                {
                    let self = this;
                    let param = new FormData()
                    param.append('page', this.page)
                    param.append('pageSize', this.pageSize)
                    param.append('keyword', this.keyword)

                    this.$axios.post('/api/recentProjects', param).then(function (response)
                    {
                        if (response.data.success === false)
                        {
                            console.log(response.data.msg);
                            return
                        }

                        if (response.data.list)
                        {
                            self.$store.commit('updateProjects', response.data.list)
                        }
                    })
                },
                checkNotify()
                {
                    let self = this;
                    this.$axios.post('/api/checkNotify').then(function (response)
                    {
                        if(response.data.hasNotify)
                        {
                            self.hasNotify = true
                            if(response.data.forceNotify !== false)
                            {
                                self.$alert(response.data.forceNotify.content, '详情', {
                                    dangerouslyUseHTMLString: true,
                                    closeOnClickModal:true,
                                    confirmButtonText:'我知道了',
                                    callback: action => {
                                        if(action === 'confirm')
                                        {
                                            self.markRead(response.data.forceNotify._id)
                                        }
                                    }
                                });
                            }
                        }
                    })
                }
            },
        components: {
            'v-quickselect': HeaderQuickSelectProject,
            'v-useropeate': UserOperateWindow,
        },
        computed: {
            ...mapState([
                 'userData',
                 'isShowNotifyWindow',
                 'isShowQuickSeletcProject',
                 'isShowUserOperateWindow',
                 'currProjectInfo',
                 'projects',
             ]),
            headURL()
            {
                // return tools.CDN_ROOT + "/head/" +  + "?imageView2/5/w/45"
                return tools.imgFullPath(this.$store.state.userData.head, 'head', 5, 45)
            }
        },
        mounted()
        {
            this.getProjects()
            this.checkNotify()
            this.getUserInfo()
        }

    }
</script>

<style scoped>
    @import "../assets/css/head.css";
    .logoText {
        display: block;
        color: rgb(71,71,71);
        font-size: 31px;
        position: relative;
        top: -8px;
        cursor: pointer;
    }

    .menulist
    {
        position: absolute;
        left: 250px;
        color: #545659;
        top: 28px;
        font-size: 15px;
        font-weight: bold;
        width: 200px;
        height: 40px;
    }

    .menuitem
    {
        position: absolute;
        cursor: pointer;
        /*color: red;*/
    }

    .menuitem:hover
    {
        /*color: red;*/
    }

</style>
