<template>
    <div style="width:1000px; margin: auto">
        <el-container>
            <!--左边栏-->
            <el-aside width="400">
                <!--左上-->
                <el-card class="box-card" style="width:315px; height:102px; margin:5px 5px 5px 5px">
                    <img :src="headURL" style="float: left; border-radius: 100px; margin:-4px 0 0 0;width:70px;height:70px;">
                    <div style="margin:10px 0 0 90px">
                        <h4>{{$store.state.userData.name}}</h4>
                        <h4 style="margin-top: 5px">{{$store.state.userData.username ? $store.state.userData.username : $store.state.userData.email}}</h4>
                    </div>
                </el-card>
                <!--左下-->
                <el-card class="box-card" style="width:315px; height:150px; margin:20px 5px 5px 5px">
                    <div id="user-lefter">
                        <ul>
                            <router-link to="/user/info">
                                <li :class="[{selected: '/user/info' === nowPath}]" style="position: relative;top:5px;">
                                    <div :class="['user-info',{userInfoSelected: '/user/info' ===nowPath}]">
                                        <strong>个人信息</strong>
                                    </div>
                                </li>
                            </router-link>
                            <router-link to="/user/state">
                                <li :class="[{selected: '/user/state' === nowPath}]" >
                                    <div :class="['user-state',{userStateSelected: '/user/state' ===nowPath}]">
                                        <strong>账号状态</strong>
                                    </div>
                                </li>
                            </router-link>
                            <!--<router-link to="/user/bind">-->
                                <!--<li :class="[{selected: currentTab === '3'}]" @click="currentTab = '3'">-->
                                    <!--<div :class="['user-bind',{userBindSelected: currentTab ==='3'}]">-->
                                        <!--<strong>账号绑定</strong>-->
                                    <!--</div>-->
                                <!--</li>-->
                            <!--</router-link>-->
                            <router-link to="/user/password">
                                <li :class="[{selected: '/user/password' === nowPath}]" >
                                    <div :class="['user-password',{userPasswordSelected: '/user/password' ===nowPath}]">
                                        <strong>修改密码</strong>
                                    </div>
                                </li>
                            </router-link>
                        </ul>
                    </div>
                </el-card>
            </el-aside>
            <!--右边-->
            <el-main style="">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import tools from '../../assets/js/tools'

    export default {
        data()
        {
            return {}
        },
        computed:
        {
            headURL()
            {
                // return tools.CDN_ROOT + "/head/" + this.$store.state.userData.head + "?imageView2/5/w/70"
                return tools.imgFullPath(this.$store.state.userData.head, 'head', 5, 70)
            },
            nowPath()
            {
                return this.$route.path
            }
        },
    }


</script>

<style scoped>
    h4 {
        color: grey;
    }

    #user-lefter{
        background: #FFF;
        margin: -18px 0 0 8px;
    }

    #user-lefter ul{
        height:178px;
        width:285px;
        border-radius: 2px;
    }

    #user-lefter ul li{
        display: block;
        border-radius: 2px;
        height:43px;
        margin-right: 5px;
        font-size: 14px;
        color: #4F657B;
        letter-spacing: 0;
        cursor: pointer;
        margin-left: -20px;
    }
    #user-lefter ul li strong{
        margin-left: 46px;
        line-height: 44px;
    }
    #user-lefter ul li.selected{
        color: #1891F0;
        background: #ECEDF0;
    }
    #user-lefter ul li:hover{
        color: #1891F0;
        background: #ECEDF0;
    }
    #user-lefter ul .user-bind{
        background: url(../../assets/img/user-bind-N.svg)24px 15px no-repeat;
    }
    #user-lefter ul .userBindSelected{
        background: url(../../assets/img/user-bind-Y.svg)24px 15px no-repeat;
    }
    #user-lefter ul .user-state{
        background: url(../../assets/img/user-state-N.svg)24px 15px no-repeat;
    }
    #user-lefter ul .userStateSelected{
        background: url(../../assets/img/user-state-Y.svg)24px 15px no-repeat;
    }
    #user-lefter ul .user-password{
        background: url(../../assets/img/user-password-N.svg)24px 15px no-repeat;
    }
    #user-lefter ul .userPasswordSelected{
        background: url(../../assets/img/user-password-Y.svg)24px 15px no-repeat;
    }
    #user-lefter ul .user-info{
        background: url(../../assets/img/user-info-N.svg)24px 15px no-repeat;
    }
    #user-lefter ul .userInfoSelected{
        background: url(../../assets/img/user-info-Y.svg)24px 15px no-repeat;
    }

    #user-lefter ul .user-bind:hover{
        background: url(../../assets/img/user-bind-Y.svg)24px 15px no-repeat !important;
    }
    #user-lefter ul .user-info:hover{
        background: url(../../assets/img/user-info-Y.svg)24px 15px no-repeat !important;
    }
    #user-lefter ul .user-state:hover{
        background: url(../../assets/img/user-state-Y.svg)24px 15px no-repeat !important;
    }
    #user-lefter ul .user-password:hover{
        background: url(../../assets/img/user-password-Y.svg)24px 15px no-repeat !important;
    }

</style>