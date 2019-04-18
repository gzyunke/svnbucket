<template>
    <div class="index-container">
        <div class="banner">
            <div class="banner-bg">
                <img class="big-start" src="../../assets/img/big-start.svg">
                <img class="little-start" src="../../assets/img/little-start.svg">
                <img class="big-eddy" src="../../assets/img/big-eddy.png">
                <img class="little-eddy" src="../../assets/img/little-eddy.png">
                <img class="airship" src="../../assets/img/airship.svg">
                <img class="spaceman" src="../../assets/img/spaceman.svg">
                <img class="house" src="../../assets/img/house.png">
            </div>
            <div class="banner-content">
                <p class="banner-content-title">让开发更简单</p>
                <p class="banner-content-text">SVNBucket 是一个 SVN 代码托管站，你也可以叫他 SVN 桶。我们喜欢 SVN 的简单和方便，还有它更好的权限控制。不限私有项目、不限成员数量，支持目录级权限控制、SVN 钩子，还有更多…</p>
                <router-link to="/regist">
                    <el-button class="banner-content-btn" type="primary">马上注册体验</el-button>
                </router-link>
            </div>
        </div>
        <div class="main-content">
            <div class="section-overview">
                <div class="wrapper">
                    <div class="section-overview-title">功能特色</div>
                    <div class="section-overview-content">
                        <div class="section-overview-item">
                            <div class="overview-item-icon"><img src="../../assets/img/folder.svg"></div>
                            <div class="overview-item-content">
                                <p class="overview-item-title">不限私有项目</p>
                                <p class="overview-item-desc">不限私有项目，不限项目成员</p>
                            </div>
                        </div>
                        <div class="section-overview-item">
                            <div class="overview-item-icon"><img src="../../assets/img/folder.svg"></div>
                            <div class="overview-item-content">
                                <p class="overview-item-title">目录权限</p>
                                <p class="overview-item-desc">目录级别的权限控制，轻松掌控每个人的读写权限</p>
                            </div>
                        </div>
                        <div class="section-overview-item">
                            <div class="overview-item-icon"><img src="../../assets/img/member.svg"></div>
                            <div class="overview-item-content">
                                <p class="overview-item-title">项目成员</p>
                                <p class="overview-item-desc">您可以为每个项目添加任意个数的成员，简单方便，合作开发更愉快</p>
                            </div>
                        </div>
                        <div class="section-overview-item">
                            <div class="overview-item-icon"><img src="../../assets/img/code-manage.svg"></div>
                            <div class="overview-item-content">
                                <p class="overview-item-title">代码管理</p>
                                <p class="overview-item-desc">在线预览代码，提交记录，变更列表，diff查看</p>
                            </div>
                        </div>
                        <div class="section-overview-item">
                            <div class="overview-item-icon"><img src="../../assets/img/hook.svg"></div>
                            <div class="overview-item-content">
                                <p class="overview-item-title">钩子</p>
                                <p class="overview-item-desc">自动更新、自动发布版本，钩子可以帮你简化工作</p>
                            </div>
                        </div>
                        <div class="section-overview-item">
                            <div class="overview-item-icon"><img src="../../assets/img/project.svg"></div>
                            <div class="overview-item-content">
                                <p class="overview-item-title">安全稳定</p>
                                <p class="overview-item-desc">腾讯云加持，稳定不掉线；仓库多层加密，安全不泄漏</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="sections section-project-manage">
                <div class="wrapper">
                    <div class="section-content section-float-left">
                        <p class="section-title">项目管理</p>
                        <p class="section-desc">您可以创建任意多的私有项目；把常用的项目标星置顶；顶部导航栏可以快速的进行最近项目切换；也可以直接搜索关键字快速找到自己想要的项目</p>
                    </div>
                    <div class="section-example"><img src="../../assets/img/project-introduce.png"></div>
                </div>
            </div>
            <div class="sections section-project-member">
                <div class="wrapper">
                    <div class="section-content section-float-right">
                        <p class="section-title">项目成员</p>
                        <p class="section-desc">您可以添加任意多的成员，分配角色，让其他管理员来协助你管理日常的一些项目；还可以为不同角色的项目成员分配不同目录的权限，并且可以设置多个目录，一切尽在掌控中</p>
                    </div>
                    <div class="section-example"><img src="../../assets/img/member-introduce.png"></div>
                </div>
            </div>
            <div class="sections section-code-manage">
                <div class="wrapper">
                    <div class="section-content section-float-left">
                        <p class="section-title">代码管理</p>
                        <p class="section-desc">方便的进行仓库文件浏览，高亮显示代码；查看提交记录，变更文件，文件diff等</p>
                    </div>
                    <div class="section-example"><img src="../../assets/img/code-introduce.png"></div>
                </div>
            </div>
            <div class="sections section-directory-permission">
                <div class="wrapper">
                    <div class="section-content section-float-right">
                        <p class="section-title">目录权限</p>
                        <p class="section-desc">每个项目组都会有不同的角色：服务端、客户端、策划等，为他们分配不同目录的权限，代码更安全</p>
                    </div>
                    <div class="section-example"><img src="../../assets/img/folder-introduce.png"></div>
                </div>
            </div>
            <div class="sections section-hook">
                <div class="wrapper">
                    <div class="section-content section-float-left">
                        <p class="section-title">钩子</p>
                        <p class="section-desc">利用钩子，可以方便的检测到每次代码的提交，利用这个做一些项目的自动化工作，比如自动发布版本，自动更新网站，节省一些日常的繁琐工作</p>
                    </div>
                    <div class="section-example"><img src="../../assets/img/hook-introduce.png"></div>
                </div>
            </div>

            <div class="poster">
                <div class="wrapper">
                    <div class="poster-title">
                        <p>随时随地</p>
                        <p>找到你享受的工作状态</p>
                    </div>
                    <div class="poster-content">
                        <img class="poster-content-img" src="../../assets/img/work-img.svg">
                        <p class="poster-content-title">无论手机端，还是PC端都能轻松的工作</p>
                        <div class="poster-items">
                            <div class="poster-item" @click="$store.commit('setWxminiDialogVisible', true)" style="cursor: pointer">
                                <img src="../../assets/img/mobile-phone.svg">
                                <p>移动端(小程序)</p>
                            </div>
                            <div class="poster-item" style="margin-top: 7px;">
                                <img src="../../assets/img/computer.svg">
                                <p>电脑端(Web)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer">
                <div class="wrapper">
                    <a href="http://www.miibeian.gov.cn/" target="_blank" style="color: #909399;">粤ICP备17148260号-3</a>
                    <span style="color: #909399;"> | </span>
                    <a href="http://gzyunke.cn" target="_blank" style="color: #909399;">广州云科信息科技有限公司</a>
                    <span style="color: #909399;"> | </span>
                    <router-link to="/terms" style="color:#909399;" target='_blank'> 服务条款</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "indexNew",
        methods: {
            getUrlParam(name)
            {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if(r != null) return decodeURI(r[2]);
                return null;
            },
        },
        mounted()
        {
            window.localStorage.setItem('ADTAG', this.getUrlParam('ADTAG'));
        }
    }
</script>

<style scoped>
    .index-container {
        width: 100%;
        min-width: 1200px;
    }
    .wrapper {
        box-sizing: border-box;
        margin: 0 auto;
        padding: 0 10px;
        width: 1200px;
    }

    .banner {
        overflow: hidden;
        position: relative;
        width: 100%;
        min-width: 1200px;
        height: 720px;
        background-image: radial-gradient(51% 90%, #3F7EB4 12%, #202545 91%);
    }
    .banner-bg {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .banner img {
        position: absolute;
    }
    .big-start {
        bottom: 322px;
        left: 0;
        width: 327px;
    }
    .little-start {
        right: 69px;
        bottom: 485px;
        width: 104px;
    }
    .big-eddy {
        bottom: 539px;
        left: 187px;
        width: 112px;
    }
    .little-eddy {
        right: 266px;
        bottom: 418px;
        width: 67px;
    }
    .airship {
        right: 230px;
        bottom: 275px;
        width: 71px;
    }
    .spaceman {
        bottom: 214px;
        left: 0;
        width: 176px;
    }
    .house {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 286px;
    }
    .banner-content {
        position: relative;
        z-index: 1;
        margin: 168px auto 0;
        width: 622px;
    }
    .banner-content-title {
        margin-bottom: 14px;
        font-size: 44px;
        line-height: 62px;
        color: #fff;
    }
    .banner-content-text {
        font-size: 16px;
        line-height: 39px;
        color: #fff;
    }
    .banner-content-btn {
        float: right;
        margin-top: 21px;
    }

    .section-overview {
        padding-top: 60px;
        background: #fafafa;
    }
    .section-overview-title {
        margin-bottom: 60px;
        font-size: 36px;
        color: #474747;
        text-align: center;
    }
    .section-overview-content {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 0 auto;
        width: 1060px;
    }
    .section-overview-item {
        margin-bottom: 60px;
        width: 490px;
    }
    .overview-item-icon {
        float: left;
        margin-right: 25px;
        height: 100%;
    }
    .overview-item-icon img {
        width: 54px;
    }
    .overview-item-content {
        overflow: hidden;
    }
    .overview-item-title {
        margin: 14px 0 20px;
        font-size: 22px;
        color: #4f657b;
        line-height: 30px;
    }
    .overview-item-desc {
        font-size: 17px;
        color: #474747;
        line-height: 24px;
    }

    .sections {
        overflow: hidden;
        padding: 25px 0;
    }
    .sections .wrapper {
        /*width: 1060px;*/
    }
    .section-float-left {
        float: left;
        margin-right: 24px;
    }
    .section-float-right {
        float: right;
    }
    .section-project-member,
    .section-directory-permission {
        background: #fafafa;
    }
    .section-content {
        width: 328px;
    }
    .section-title {
        margin: 60px 0 30px;
        font-size: 30px;
        color: #474747;
        line-height: 42px;
    }
    .section-desc {
        font-size: 16px;
        line-height: 26px;
        color: #4e5157;
    }

    .poster {
        padding: 60px 0 120px;
        background: #fafafa;
    }
    .poster-title {
        margin-bottom: 60px;
        font-size: 36px;
        color: #474747;
        text-align: center;
        line-height: 50px;
    }
    .poster-content {
        overflow: hidden;
        padding: 49px 10px 10px;
        background: #fff;
        box-shadow: 0 6px 20px 0 rgba(0,43,76,0.10);
        border-radius: 4px;
    }
    .poster-content-img {
        float: left;
        margin-right: 159px;
    }
    .poster-content-title {
        margin-bottom: 31px;    
        font-size: 22px;
        color: #474747;
        line-height: 30px;
    }
    .poster-items {
        display: flex;
        justify-content: space-between;
        width: 360px;
    }
    .poster-item p {
        margin-top: 8px;
        font-size: 16px;
        color: #808080;
        text-align: center;
    }

    .footer {
        padding: 10px 0;
        text-align: center;
    }
</style>