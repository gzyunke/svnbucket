<template>
    <div style="position: relative; top: 15%;">
        <el-row type="flex" justify="center">
            <el-col>
                <router-link to="/">
                    <h1 class="logoText">绑定新帐号</h1>
                </router-link>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-input v-model="name" :maxlength="10" class="center-row" placeholder="你的名字"/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-input v-model="username" :maxlength="100" class="center-row" placeholder="SVN 用户名（字母、数字、下划线的组合）"/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-input v-model="password" :maxlength="100" class="center-row" placeholder="SVN 密码（最少6位）" @keyup.enter.native="regist"/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-input v-model="email" :maxlength="100" class="center-row" placeholder="密保邮箱（找回密码用，请填写常用邮箱）"/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <div style="color: #808080;font-size: 14px;padding: 0 0 15px 7px;">
                    <el-checkbox v-model="checked"><span style="color:#909399;">已阅读并同意</span></el-checkbox>
                    <router-link to="/terms" style="color:#1891F0;" target='_blank'> 服务条款</router-link>
                </div>
                <el-button type="primary" @click="regist" class="center-row">注册并绑定</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <span class="registTip">有帐号？<router-link :to="'/bindold?'+queryParam">绑定已有帐号</router-link></span>
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
                name: '',
                username: '',
                password: '',
                email:'',
                bindToken:'',
                head: '',
                queryParam: '',
                msgBox: null,
                checked: true,
            }
        },
        methods: {
            regist()
            {
                if (!this.checked) {
                    this.$message.error('必须同意服务条款')
                    return;
                }
                let self = this;
                if (!this.username || !this.password  || !this.email || !this.name)
                {
                    this.$message.error('请填写完整');
                    return;
                }

                if(!tools.isValidEmail(this.email))
                {
                    this.$message.error('Email格式错误');
                    return;
                }

                if(!tools.isValidUsername(this.username))
                {
                    this.$message.error('用户名必须是字母、数字、下划线的组合');
                    return;
                }

                let param = new FormData();
                param.append('name', this.name);
                param.append('email', this.email);
                param.append('username', this.username);
                param.append('password', this.password);
                param.append('bindToken', this.bindToken);
                param.append('head', this.head);

                let adtag = window.localStorage.getItem('ADTAG');
                param.append('ref', adtag ? adtag : '');

                this.$axios.post('/api/regist', param).then(function (response)
                {
                    if (response.data.success === false)
                        return
                    if(MtaH5)
                        MtaH5.clickStat('weixinzhuceliuc',{'wxbind':'true'});

                    if(adtag)
                        window.localStorage.setItem('ADTAG', adtag + '2');
                    self.login();
                })
            },
            login()
            {
                let self = this;
                let param = new FormData()
                param.append('username', this.username)
                param.append('password', this.password)
                this.$axios.post('/api/login', param).then(function (response)
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
                if(MtaH5)
                    MtaH5.clickStat('weixinzhuceliuc',{'wxloginok':'true'});
                this.msgBox = this.$message({
                    message: '您的微信尚未绑定 SVNBucket 帐号，请注册并绑定，这个帐号也是您的 SVN 帐号。如果您已经有了帐号，请点击下面的绑定已有帐号',
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
        margin-bottom: 20px;
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
</style>
