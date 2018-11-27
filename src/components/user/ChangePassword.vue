<template>
    <div>
        <el-card class="box-card" style="width:600px; height:450px; margin-top: -15px">
            <el-form label-width="80px" label-position="top">
                <el-form-item label="原密码">
                    <el-input type="password" v-model="oldPassword" />
                    <router-link to="/forget" target="_blank" style="color: #1891F0;">忘记密码</router-link>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="newPassword" />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="newPasswordConfirm" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changePassword">保存修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                oldPassword: '',
                newPassword: '',
                newPasswordConfirm: '',
            }
        },
        methods: {
            changePassword()
            {
                if (this.newPassword !== this.newPasswordConfirm)
                {
                    this.$message.error("两次密码输入不一致")
                    return;
                }
                let self = this;
                var formData = new FormData();
                formData.append('oldPassword', self.oldPassword);
                formData.append('newPassword', self.newPassword);
                self.$axios.post('/api/changePassword', formData).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return;
                    }
                    self.$router.replace('/login');
                    self.oldPassword = '';
                    self.newPassword = '';
                    self.newPasswordConfirm = '';
                    self.$message.success("修改成功, 请重新登录账号");

                })
            },
        }
    }

</script>

<style scoped>

</style>
