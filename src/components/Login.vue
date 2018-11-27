<template>
    <div style="position: relative; top: 15%;">
        <el-row type="flex" justify="center">
            <el-col>
                <router-link to="/">
                    <h1 class="logoText">SVNBucket</h1>
                </router-link>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-input v-model="username" :maxlength="100" class="center-row" placeholder="SVN 用户名（不是邮箱）"/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-input type="password" v-model="password" :maxlength="100" class="center-row" placeholder="SVN 密码" @keyup.enter.native="login"/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-button type="primary" @click="login" class="center-row">登 录</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <span class="registTip">还没帐号？<router-link to="/regist">免费注册</router-link> | <router-link to="/forget">找回密码</router-link></span>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-button type="success" plain @click="wxLogin" class="center-row">微信登陆</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import tools from '../assets/js/tools'
    export default {
        data()
        {
            return {
                username: '',
                password: '',
            }
        },
        methods:
        {
            login()
            {
                let self = this
                if (!this.username || !this.password)
                {
                    this.$message.error('请输入用户名和密码')
                    return;
                }

                let formData = new FormData();
                formData.append('username', this.username);
                formData.append('password', this.password);
                this.$axios.post('/api/login', formData).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return
                    }

                    window.localStorage.setItem('svnbucketToken', response.data.token)
                    // self.$store.commit('updateUserInfo', response.data)
                    self.$router.replace('/projects')
                })
            },
            wxLogin()
            {
                tools.wxLogin('bindold')
            }
        },
        mounted()
        {
            let token = this.$route.query.token;
            if(token)
            {
                window.localStorage.setItem('svnbucketToken', token);
                this.$router.replace('/projects');
            }

        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 30px;
    }
    .el-col-24
    {
        width:330px;
    }
    .svnbucket-icon {
        width: 191px;
        display: block;
        margin: auto;
    }

    .center-row {
        width: 320px;
        display: block;
        margin: auto;
    }

    .registTip {
        font-size: 14px;
        color: #808080;
        width: 320px;
        display: block;
        margin: auto;
        text-align: center;
    }

    .registTip a {
        color: #1891F0
    }

    .logoText {
        display: block;
        position: relative;
        width: 320px;
        margin: auto;
        text-align: center;
        color: rgb(71,71,71);
        font-size: 38px;
    }

    .wxLogin {
        display: block;
        position: relative;
        margin: auto;
        text-align: center;
    }
</style>
