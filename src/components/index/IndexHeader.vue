<template>
    <div :class="['header-container', {'isScrolled': isScroll}]">
        <div class="header-menu">
            <div class="header-menu-main">
                <router-link to="/"><div :class="['header-menu-item', { 'current' : currentTab==='/'}]">首页</div></router-link>
                <router-link to="/package"><div :class="['header-menu-item', { 'current' : currentTab==='/package'}]">价格</div></router-link>
                <div class="header-menu-item" @click="$store.commit('setWxminiDialogVisible', true)">小程序</div>
                <div class="header-menu-item"><a class="link-outside" href="https://easydoc.xyz?ADTAG=svn" target="_blank">易文档</a></div>
                <router-link to="about"><div :class="['header-menu-item', { 'current' : currentTab==='/about'}]">关于我们</div></router-link>
                <!--<div class="header-menu-item"><a class="link-outside" href="https://tool.lu/" target="_blank">在线工具</a></div>-->
            </div>
            <div class="header-menu-operate">
                <div v-if="!isLogin">
                    <router-link to="/login"><el-button class="header-menu-login" size="small" type="primary">登录</el-button></router-link>
                    <router-link to="/regist"><el-button class="header-menu-register" size="small" plain>注册</el-button></router-link>
                </div>
                <div v-else>
                    <router-link to="/projects"><el-button class="header-menu-projects">项目列表</el-button></router-link>
                </div>
            </div>
        </div>
        <router-link to="/">
            <p class="header-logo">SVNBucket</p>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                isScroll: false,
                currentTab: '',
                isLogin: false,
            }
        },
        methods: {
            onScroll() {
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if(scrollTop >= 86) {
                    this.isScroll = true;
                } else {
                    this.isScroll = false;
                }
            },
        },
        mounted() {
            window.addEventListener('scroll', this.onScroll);
            if (this.currentTab === '') {
                this.currentTab = this.$route.path;
            }
            if (window.localStorage.getItem('svnbucketToken')) {
                this.isLogin = true;
            }
        },
        watch: {
            $route(to,from){
                console.log(to.path);
                this.currentTab = to.path;
                document.documentElement.scrollTop = 0;
            }
        },
    }
</script>

<style scoped lang="scss">
    .header-container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10086;
        width: 100%;
        min-width: 1200px;
        height: 50px;
        transition: 0.4s;

        .header-logo {
            display: block;
            margin: 10px 0 0 20px;
            font-size: 38px;
            font-weight: 700;
            color: #fff;
            transition: 0.4s;
        }
        .header-menu {
            float: right;
            margin-top: 15px;
            transition: .4s;

            .header-menu-main {
                float: left;

                .header-menu-item {
                    padding: 9px 15px;
                    float: left;
                    font-size: 17px;
                    font-weight: 100;
                    color: #fff;
                    line-height: 17px;
                    transition: .1s;
                    border-radius: 4px;
                    cursor: pointer;

                    .link-outside {
                        color: #fff;
                    }
                }
                .header-menu-item.current {
                    color: #409eff;
                }
                .header-menu-item:hover {
                    background: rgba(200, 200, 200, 0.3);
                }
            }

            .header-menu-operate {
                float: left;
                margin: 0 10px;

                .header-menu-login,
                .header-menu-register,
                .header-menu-projects {
                    margin-right: 10px;
                    padding: 10px 20px;
                    letter-spacing: 2px;
                }
            }
        }
    }
    .header-container.isScrolled {
        background: #fff;

        .header-logo {
            color: #000;
            font-size: 24px;
        }

        .header-menu {
            margin-top: 8px;

            .header-menu-item {
                color: #474747;

                .link-outside {
                    color: #474747;
                }
            }
        }
    }
</style>