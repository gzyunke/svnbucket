<template>
    <div id="user-bind-box" class="hide-user-box">
        <el-card class="box-card" style="width:600px; height:300px; margin-top: -15px">
            <h4>帐号绑定</h4>
            <el-table :data="bindWays" size="mini" style="width: 100%; margin: 10px 0 0 0" :show-header="false">
                <el-table-column label="" width="80">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon">
                    </template>
                </el-table-column>
                <el-table-column label="">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="" width="80">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" plain @click="bind(scope.row)">绑定</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>

</template>

<script>
    export default {
        data()
        {
            return {
                bindWays:[
                    {icon:'../../assets/img/phone.svg', name:'手机'},
                    {icon:'../../assets/img/wechat.svg', name:'微信'},
                    {icon:'../../assets/img/QQ.svg', name:'QQ'}
                ]
            }
        },
        methods:{
            bind()
            {

            }
        }
    }

</script>

<style scoped>

</style>
