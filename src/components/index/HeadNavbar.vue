<template>
    <div :class="['headNav',{headNavBlack :isScroll}]" id="headNav">
        <router-link to="/">
            <div class="headLeftNav">
                <h1 :class="{iconBlack: isScroll}">SVNBucket</h1>
            </div>
        </router-link>
        <div class="headRightNav">
            <ul :class="['mainNav',{navMarginTop: isScroll}]">
                <li class="userOperaLi">
                    <template v-if="!isLogin">
                        <router-link to="/login">
                            <el-button size="small" type="primary" style="width:70px;margin-right: 10px">登录</el-button>
                        </router-link>
                        <router-link to="/regist">
                            <el-button size="small" plain>注册</el-button>
                        </router-link>
                    </template>
                    <template v-else>
                        <router-link to="/projects">
                            <el-button size="small" plain style="position: relative; right:-57px;">项目列表</el-button>
                        </router-link>
                    </template>
                </li>

                <!--<li :class="[{navHover :!isScroll,navLiColor :isScroll}]">-->
                    <!--&lt;!&ndash;<router-link to="/help">&ndash;&gt;-->
                    <!--<strong :class="[{selectedTab: currentTab === '4'}]">帮助</strong>-->
                    <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
                <!--</li>-->

                <router-link to="/about">
                    <li :class="['aboutUs',{navHover :!isScroll,navLiColor :isScroll}]" @click="setUnlockHeader('3')">
                        <strong :class="[{selectedTab: currentTab === '3'}]">关于我们</strong>
                    </li>
                </router-link>

                <li :class="[{navHover :!isScroll,navLiColor :isScroll}]" @click="setUnlockHeader('4')" style="position: relative">
                    <strong :class="[{selectedTab: currentTab === '3'}]" style="position: absolute; left: -8px; width: 80px; top: 7px">
                        <a href="https://easydoc.xyz?ADTAG=svn" style="color: white;" target="_blank">易文档</a>
                    </strong>
                </li>

                <!--<router-link to="/downLoad">-->
                    <li :class="[{navHover :!isScroll,navLiColor :isScroll}]" @click="$store.commit('setWxminiDialogVisible', true)" style="position: relative">
                        <strong style="position: absolute; left: -8px; width: 80px; top: 7px">小程序</strong>
                    </li>
                <!--</router-link>-->

                <router-link to="/buy">
                    <li :class="[{navHover :!isScroll,navLiColor :isScroll}]" @click="setUnlockHeader('1')">
                        <strong :class="[{selectedTab: currentTab === '1'}]">价格</strong>
                    </li>
                </router-link>
                <router-link to="/">
                    <li :class="[{navHover :!isScroll,navLiColor :isScroll}]" @click="setUnlockHeader('0')">
                        <strong :class="[{selectedTab: currentTab === '0'}]">首页</strong>
                    </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeadNavBar',
        data()
        {
            return {
                isScroll: false,
                isLockHeader: false,
                currentTab: '0',
                isLogin: window.localStorage.getItem('svnbucketToken')
            }
        },
        computed:{
        },
        methods: {
            setLockHeader()
            {
                this.currentTab = '2';
                this.isScroll = true;
                this.isLockHeader = true;
            },
            setUnlockHeader(currentTab)
            {
                this.isScroll = false;
                this.isLockHeader = false;
                this.currentTab = currentTab;
            },
            onScroll()
            {
                let srollToTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if (this.isLockHeader === true)
                {
                    this.isScroll = true;
                    return;
                }
                if (srollToTop >= 86)
                {
                    this.isScroll = true;
                }
                else
                {
                    this.isScroll = false;
                }
            },
        },
        mounted()
        {
            window.addEventListener('scroll', this.onScroll)
        }
    }
</script>
