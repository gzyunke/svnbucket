<template>
    <div>
        <div id="user-lefter-info">
            <img src="../../assets/img/y.jpg">
            <div>
                <span class="user-name">熬大汪</span>
                <span class="user-email">atsoar@qq.com</span>
            </div>
        </div>
        <div id="user-lefter">
            <ul>
                <router-link to="/user/infomation">
                    <li :class="[{selected: currentTab === '1'}]" @click="currentTab = '1'"
                        style="position: relative;top:5px;">
                        <div :class="['user-info',{userInfoSelected: currentTab ==='1'}]">
                            <strong>个人信息</strong>
                        </div>
                    </li>
                </router-link>
                <router-link to="/user/state">
                    <li :class="[{selected: currentTab === '2'}]" @click="currentTab = '2'">
                        <div :class="['user-state',{userStateSelected: currentTab ==='2'}]">
                            <strong>账号状态</strong>
                        </div>
                    </li>
                </router-link>
                <router-link to="/user/bind">
                    <li :class="[{selected: currentTab === '3'}]" @click="currentTab = '3'">
                        <div :class="['user-bind',{userBindSelected: currentTab ==='3'}]">
                            <strong>账号绑定</strong>
                        </div>
                    </li>
                </router-link>
                <router-link to="/user/password">
                    <li :class="[{selected: currentTab === '4'}]" @click="currentTab = '4'">
                        <div :class="['user-password',{userPasswordSelected: currentTab ==='4'}]">
                            <strong>修改密码</strong>
                        </div>
                    </li>
                </router-link>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'userMain',
        data() {
            return {
                currentTab: '1',
            }
        }
    }

</script>

<style scoped>

</style>
