<template>
    <div style="position: relative; top: 15%;">
        <template v-if="isValid">
            <el-row type="flex" justify="center">
                <el-col>
                    <router-link to="/">
                        <h1 class="logoText">SVNBucket</h1>
                    </router-link>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col>
                    <el-input v-model="password" :maxlength="100" class="center-row" placeholder="输入新密码" @keyup.enter.native="resetPassword"/>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col>
                    <el-button type="primary" @click="resetPassword" class="center-row">重置密码</el-button>
                </el-col>
            </el-row>
        </template>
        <template v-else>
            <el-col>
                <span class="registTip">{{errorMsg}}</span>
            </el-col>
        </template>
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
                password: '',
                isValid: false,
                errorMsg:'',
            }
        },
        methods:
        {
            resetPassword()
            {
                let self = this
                if (!this.password)
                {
                    this.$message.error('请输入新密码')
                    return;
                }

                let formData = new FormData();
                formData.append('password', this.password);
                formData.append('userid', this._id);
                formData.append('t', this.$route.query.t);
                this.$axios.post('/api/resetpwd', formData).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return
                    }

                    self.$message.success("密码重置成功")
                    self.$router.replace('/login')
                })
            },
            validCheck()
            {
                let self = this
                let formData = new FormData();
                formData.append('t', this.$route.query.t);
                this.$axios.post('/api/resetpwdCheck', formData).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        self.isValid = false
                        self.errorMsg = response.data.msg
                        return
                    }

                    self.isValid = true
                    self._id = response.data._id
                })
            }
        },
        created()
        {
            this.validCheck()
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
