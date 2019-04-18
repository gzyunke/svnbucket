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
                <el-input v-model="username" class="center-row" placeholder="SVN 账号 / 密保邮箱" @keyup.enter.native="sendMail"/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-button type="primary" @click="sendMail" class="center-row">发送重置邮件</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <span class="registTip">重置有问题？发邮件致gzyunke@qq.com寻求帮助</span>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <span class="registTip">已想起密码，<router-link to="/login">前往登录</router-link></span>
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
            }
        },
        methods:
            {
                sendMail()
                {
                    let self = this
                    if (!this.username)
                    {
                        this.$message.error('请输入用户名')
                        return;
                    }

                    let formData = new FormData();
                    formData.append('username', this.username);
                    this.$axios.post('/api/sendResetPasswordMail', formData).then(function (response)
                    {
                        if(MtaH5)
                            MtaH5.clickStat("forget")
                        if (response.data.success === false)
                        {
                            return
                        }

                        self.$notify({
                            title: '提示',
                            message: response.data.msg,
                            duration: 0
                        });
                    })
                }
            },
        mounted()
        {
            if(this.$store.state.userData)
                this.username = this.$store.state.userData.username ? this.$store.state.userData.username : this.$store.state.userData.email
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
        color: #909399;
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
