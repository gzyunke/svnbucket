<template>
    <div class="header-container">
        <div class="header-menu-right">
            <div class="header-menu-item" @click="$store.commit('setNewProjectDialogVisible', true)">创建项目</div>

            <router-link to="/projects"><div class="header-menu-item">项目列表</div></router-link>



            <div class="header-menu-item header-user-menu" @click="$store.commit('setShowUserOperateWindow', !$store.state.isShowUserOperateWindow)">
                <img class="header-user-head" :src="imgFullPath($store.state.userData.head)">
                <img class="header-user-arrow" src="../assets/img/head-user-arrow.svg">
                <user-operate-window v-if="$store.state.isShowUserOperateWindow" style="font-weight: 500;"></user-operate-window>
            </div>
        </div>

        <div class="header-logo" @click="$route.path === '/projects'? $router.push('/'): $router.push('/projects')">SVNBucket</div>

        <div class="header-menu-left">
            <div class="header-menu-item" @click="$store.commit('setWxminiDialogVisible', true)">小程序</div>
            <a href="https://easydoc.xyz?ADTAG=svn" target="_blank"><div class="header-menu-item">易文档</div></a>

            <div class="header-menu-item"  @click="getNotifications" style="position: relative;">
                消息通知<i v-if="hasNotify" style="position: absolute; top: 3px; right: -7px; width: 8px; height: 8px; border-radius: 50%; background: #f56c6c"></i>
            </div>

            <!--<div v-else class="header-menu-item" @click="getNotifications">消息通知</div>-->
            <div class="header-menu-item" @click="$store.commit('setContactDialogVisible', true)">使用帮助</div>
            <div class="header-menu-item" @click="$router.push('/user/state')">升级空间</div>
        </div>
        <div class="header-my-projects" @click="$store.commit('setShowQuickSelectProjectWindow', !$store.state.isShowQuickSeletcProject)">{{$store.state.currProjectInfo.name ? $store.state.currProjectInfo.name : "我的项目"}}<img src="../assets/img/header-arrow.svg"></div>
        <header-quick-select-project v-if="$store.state.isShowQuickSeletcProject"/>

        <el-dialog :modal-append-to-body='false' title="反馈" :visible.sync="$store.state.feedbackDialogVisible" width="520px">
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

        <el-dialog :modal-append-to-body='false' title="创建项目" :visible.sync="$store.state.newDialogVisible" width="360px">
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

        <el-dialog :modal-append-to-body='false' title="使用帮助" :visible.sync="$store.state.contactDialogVisible" width="360px">
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
                <el-form-item label="常见问题:">
                    <a target="_blank" href="https://easydoc.xyz/#/doc/78416752/21807778" style="color: #1891F0;">
                        点击查看
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

        <!--<div class="notify-container">-->
            <el-dialog class="notify-container" :modal-append-to-body='false' title="消息通知" :visible.sync="notifyDialogVisible" width="800px" @close="checkNotify">
                <div slot="title" class="dialog-title">
                    <img src="../assets/img/message-bell.svg" style="float:left; margin-top: 2px;">
                    <span style="margin-left: 5px; font-size: 14px; font-weight: 700; color: #474747;">系统消息</span>
                </div>
                <div class="dialog-content">
                    <div style="width: 100%; height: 100%;" v-if="notifications.length > 0">
                        <div class="notify-sidebar">
                            <el-scrollbar style="height: 100%;">
                                <div :class="['notify-item', currentItem === item._id ? 'current-item' : '']" v-for="item in notifications" :key="item._id" @click="setCurrentItem(item)" :title="item.title">
                                    <img class="notify-item-state" :style="[{ 'margin-top' : item.isRead ? '2px' : '6px'}]" :src="item.isRead ? require('../assets/img/message-read.svg') : require('../assets/img/message-unread.svg')">
                                    <p class="notify-item-title">{{ item.title }}</p>
                                    <p class="notify-item-date">{{ dateFormat(item.time) }}</p>
                                </div>
                            </el-scrollbar>
                        </div>
                        <div class="notify-content" v-loading="loadingContent">
                            <mavon-editor ref="md" v-model="content" :subfield="false" :editable="false" :boxShadow="false" :toolbarsFlag="false" defaultOpen="preview"/>
                        </div>
                    </div>
                    <div class="without-notify" v-else>
                        <div class="img-box"><div><img src="../assets/img/smile.svg"></div></div>
                        <p>收到系统消息时</p>
                        <p>你就会在这里收到通知提醒</p>
                    </div>
                </div>
            </el-dialog>
        <!--</div>-->
    </div>
</template>

<script>
    import tools from '../assets/js/tools'
    import HeaderQuickSelectProject from './HeaderQuickSelectProject.vue'
    import UserOperateWindow from './UserOperateWindow.vue'

    export default {
        name: "HeaderC",
        components: {
            UserOperateWindow,HeaderQuickSelectProject
        },
        data() {
            return {
                page: 1,
                pageSize: 50,
                keyword: '',
                initdir: '0',
                hasNotify: false,
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
                ],

                content: '',
                currentItem: '',
                loadingContent: '',
            }
        },
        methods: {
            setCurrentItem(item) {
                this.currentItem = item._id;
                this.loadingContent = true;

                let param = new FormData();
                param.append('notifyId', item._id);

                if (item.isRead) {
                    this.content = item.content;
                    this.loadingContent = false;
                    return;
                }
                this.$axios.post('/api/markRead', param).then(() => {
                    item.isRead = true;
                    this.content = item.content;
                    this.loadingContent = false;
                })
            },
            dateFormat(date) {
                return tools.formatDateBefore(date);
            },

            getUserInfo() {
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
            imgFullPath(head) {
                // return tools.CDN_ROOT + "/head/" +  + "?imageView2/5/w/45"
                return tools.imgFullPath(head, 'head', 5, 45)
            },
            getNotifications() {
                let self = this;
                this.$axios.post('/api/notifications').then(function (response)
                {
                    self.notifications = response.data.list;
                    self.notifyDialogVisible = true;
                    console.log(self.notifications);
                    if (self.notifications.length > 0) {
                        self.setCurrentItem(self.notifications[0]);
                    }
                })
            },
            feedback() {
                let self = this;
                let param = new FormData();
                param.append('type', this.type);
                param.append('desc', this.desc);
                param.append('contact', this.contact);
                param.append('userid', this.$store.state.userData.userid);

                this.$axios.post('/api/feedback', param).then(function (response)
                {
                    if (response.data.success === false)
                        return;
                    self.$message.success("提交成功");
                    self.$store.commit('setFeedbackDialogVisible', false);

                })
            },
            newProject() {
                let self = this;
                if (this.projectName.length <= 0)
                {
                    self.$message.error("请填写项目名字");
                    return;
                }
                let param = new FormData();
                param.append('name', this.projectName);
                param.append('desc', this.projectDesc);
                param.append('initdir', this.initdir);
                this.$axios.post('/api/newProject', param).then(function (response)
                {
                    if (response.data.success === false)
                        return;
                    self.$store.commit('setNewProjectDialogVisible', false);
                    self.$router.push('/detail/' + response.data.projectId);

                    self.projectName = '';
                    self.projectDesc = '';
                })
            },
            formateDateRow(row, column) {
                return tools.formatDateBefore(row.time)
            },
            getProjects() {
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
            checkNotify() {
                let self = this;
                this.$axios.post('/api/checkNotify').then(function (response) {
                    if(response.data.hasNotify) {
                        self.hasNotify = true
                        // if(response.data.forceNotify !== false) {
                        //     self.$alert(response.data.forceNotify.content, '详情', {
                        //         dangerouslyUseHTMLString: true,
                        //         closeOnClickModal:true,
                        //         confirmButtonText:'我知道了',
                        //         callback: action => {
                        //             if(action === 'confirm') {
                        //                 self.markRead(response.data.forceNotify._id)
                        //             }
                        //         }
                        //     });
                        // }
                    } else {
                        self.hasNotify = false;
                    }
                })
            },
            showNotification(row) {
                this.$alert(row.content, '详情', {
                    dangerouslyUseHTMLString: true,
                    closeOnClickModal:true
                });
                this.markRead(row._id)
            },
            markRead(notifyId) {
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
        },
        mounted() {
            this.getProjects();
            this.checkNotify();
            this.getUserInfo();
        }
    }
</script>

<style scoped>
    .header-container {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        margin: 0;
        padding: 0 20px;
        width: 100%;
        min-width: 1200px;
        height: 64px;
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
    }
    .header-menu-right {
        float: right;
    }
    .header-logo {
        float: left;
        margin-right: 32px;
        font-size: 32px;
        font-weight: 700;
        line-height: 64px;
        color: #474747;
        cursor: pointer;
    }
    .header-menu-left {
        float: left;
    }
    .header-menu-item {
        float: left;
        margin: 20px 15px 12px;
        color: #545659;
        font-size: 15px;
        line-height: 32px;
        cursor: pointer;
    }
    .header-menu-item:hover {
        color: #409eff;
    }

    .header-user-menu {
        margin: 15px 15px 12px;
    }
    .header-user-head {
        float: left;
        /*margin-right: 10px;*/
        width: 38px;
        height: 38px;
        border-radius: 50%;
    }

    .header-user-arrow {
        float: left;
        margin-top: 8px;
        width: 22px;
        height: 22px;
    }

    .header-my-projects {
        margin: 20px auto 12px;
        width: 200px;
        text-align: center;
        color: #545659;
        font-size: 15px;
        line-height: 32px;
        font-weight: 700;
        cursor: pointer;
    }

    .dialog-content {
        height: 500px;
        border-top: 1px solid #e8e8e8;
    }

    .notify-sidebar {
        float: left;
        width: 25%;
        height: 100%;
        border-right: 1px solid #e8e8e8;
        line-height: 24px;
    }

    .notify-item {
        overflow: hidden;
        padding: 5px 20px;
        border-bottom: 1px solid #e8e8e8;
        cursor: pointer;
    }
    .notify-item:hover {
        background: #e8e8e8;
    }
    .notify-item.current-item {
        background: #e8e8e8;
    }

    .notify-item-state {
        float: left;
        margin-right: 10px;
    }

    .notify-item-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #474747;
    }

    .notify-item-date {
        font-size: 12px;
        color: #808080;
    }

    .notify-content {
        float: left;
        width: 74.7%;
        height: 500px;
    }

    .without-notify {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 16px;
        color: #808080;
        line-height: 20px;
    }
    .without-notify .img-box {
        box-sizing: border-box;
        margin: 64px auto 15px;
        padding-top: 32px;
        width: 160px;
        height: 160px;
        background: #efefef;
        border-radius: 50%;
    }
    .without-notify .img-box>div {
        box-sizing: border-box;
        margin: 0 auto;
        padding-top: 32px;
        width: 72px;
        height: 93px;
        background: #fff;
    }
    .without-notify .img-box>div img {
        width: 50px;
        height: auto;
    }
    .without-notify p {
        margin-bottom: 8px;
    }

</style>

<style>
    .notify-container .el-dialog__header {
        padding: 15px 20px !important;
    }
    .notify-container .el-dialog__headerbtn {
        top: 17px !important;
    }
    .notify-container .el-dialog__body {
        padding: 0 !important;
    }
    .notify-container .v-note-wrapper.markdown-body {
        height: 500px;
    }

    .notify-container .doc-container .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
        padding: 20px;
    }
    .notify-container .v-note-wrapper .v-note-panel {
        border: unset;
    }
</style>