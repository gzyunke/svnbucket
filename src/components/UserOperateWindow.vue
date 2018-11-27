<template>
    <div id="hide-user-box">
        <ul @click="setShowUserOperateWindow(false)">
            <router-link to="/user/info">
                <li class="accout-setting">
                    <div class="li-lefter"></div>
                    账号设置
                </li>
            </router-link>
            <router-link to="/user/state">
                <li class="buy">
                    <div class="li-lefter"></div>
                    购买空间
                </li>
            </router-link>
            <li class="suggestion" @click="$store.commit('setFeedbackDialogVisible', true)">
                <div class="li-lefter"></div>
                反馈建议
            </li>
            <li class="help">
                <div class="li-lefter"></div>
                <a target="_blank" href="https://segmentfault.com/blog/svnbucket" style="color: #474747;">
                    SVN教程
                </a>
            </li>
            <li class="log-out" @click="logout()">
                <div class="li-lefter"></div>
                退出登录
                <div class="last-li"></div>
            </li>
        </ul>
    </div>

</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: 'userOperateWindow',
        methods: {
            ...mapMutations([
                'setShowUserOperateWindow',
                'setShowSuggestionWindow',
            ]),

            onClickFunc(e)
            {
                if (this.isShowUserOperateWindow === true)
                {
                    if (!this.$el.contains(e.target))
                    {
                        this.setShowUserOperateWindow(!this.isShowUserOperateWindow);
                    }
                }
            },
            logout()
            {
                window.localStorage.removeItem('svnbucketToken');
                this.setShowUserOperateWindow(false);
                this.$router.push({path: '/login'})
            }
        },
        computed: mapState([
            'isShowUserOperateWindow',
            'userData',
        ]),
        mounted()
        {
            let self = this;
            document.addEventListener('click', this.onClickFunc)
        },
        destroyed()
        {
            document.removeEventListener("click", this.onClickFunc);
        }
    }
</script>

<style scoped>
    #hide-user-box {
        display: block;
        background: #FFFFFF;
        border: 1px solid #E8E8E8;
        box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.10);
        border-radius: 4px;
        width: 120px;
        height: 215px;
        position: absolute;
        top: 70px;
        z-index: 100;
        right: 20px;
    }

    #hide-user-box div {
        height: 64px;
        width: 120px;
        margin-top: 6px;
    }

    #hide-user-box div img {
        float: left;
        margin: 7px 0 -1px 34px;
    }

    #hide-user-box div p {
        float: left;
        margin: 7px 0 -1px 6px;
        font-size: 14px;
        color: #474747;
        letter-spacing: 0;
    }

    #hide-user-box div a {
        font-size: 12px;
        color: #1891F0;
        letter-spacing: 0;
        text-decoration: none;
        margin: 0 0 0 58px;
    }

    #hide-user-box ul {
        list-style: none;
        width: 120px;
    }

    #hide-user-box ul li {
        height: 41px;
        font-size: 14px;
        color: #474747;
        letter-spacing: 0;
        border-top: 1px solid #E8E8E8;
        background: #FFFFFF;
        box-shadow: 0 1px 0 0 #E8E8E8;
        text-indent: 40px;
        line-height: 42px;
        cursor: pointer;
        border-bottom: 0;
        margin-left: -1px;
    }

    #hide-user-box ul li .li-lefter {
        width: 3px;
        height: 42px;
        background: #1891F0;
        float: left;
        margin-top: -1px;
        display: block;
        opacity: 0;
    }

    #hide-user-box ul li .last-li {
        width: 152px;
        height: 1px;
        position: relative;
        background: #FFF;
        top: -7px;

    }

    #hide-user-box ul li:hover {
        background-color: #ECEDF0;
    }

    #hide-user-box ul li:hover .li-lefter {
        opacity: 1;
    }

    #hide-user-box ul .contact-us {
        background: url('../assets/img/contact-us.svg') 20px 13px no-repeat;
    }

    #hide-user-box ul .log-out {
        background: url('../assets/img/log-out.svg') 20px 13px no-repeat;
    }

    #hide-user-box ul .suggestion {
        background: url('../assets/img/suggestion.svg') 20px 13px no-repeat;
    }

    #hide-user-box ul .help {
        background: url('../assets/img/use-help.svg') 20px 13px no-repeat;
    }

    #hide-user-box ul .accout-setting {
        background: url('../assets/img/accout-setting.svg') 20px 13px no-repeat;
    }

    #hide-user-box ul .buy {
        background: url('../assets/img/user-state-N.svg') 20px 13px no-repeat;
    }
</style>
