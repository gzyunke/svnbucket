<template>
    <div style="position: relative; top: 15%;">
        <el-row type="flex" justify="center">
            <el-col>
                <router-link to="/">
                    <h1 class="logoText">绑定已有帐号</h1>
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
                <el-button type="primary" @click="login" class="center-row">登录并绑定</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <span class="registTip"><router-link to="/login">返回登录</router-link> | <router-link :to="'/bindnew?' + queryParam">绑定新号</router-link></span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                username: '',
                password: '',
                name: '',
                bindToken:'',
                head: '',
                queryParam: '',
                msgBox: null,
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
                formData.append('bindToken', this.bindToken);
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
        },
        mounted()
        {
            this.bindToken = this.$route.query.bindToken ? this.$route.query.bindToken : '';
            this.name = this.$route.query.name ? this.$route.query.name : '';
            this.head = this.$route.query.head ? this.$route.query.head : '';
            this.queryParam = 'bindToken=' + this.bindToken + '&head=' + this.head + '&name=' + this.name;

            if(this.$route.query.first)
            {
                this.msgBox = this.$message({
                    message: '您的微信尚未绑定 SVNBucket 帐号，请登录您的帐号进行绑定；如果您还没有帐号，请点击下面的绑定新号',
                    type: 'success',
                    duration: 60000
                });
            }
        },
        destroyed()
        {
            if(this.msgBox)
            {
                this.msgBox.close()
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
