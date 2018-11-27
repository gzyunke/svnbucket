<template>
    <div>
        <el-button type="primary" size="small" @click="handleNew" style="float: right;margin:10px 0 10px 0" :disabled="!isManager">
            <i class="el-icon-plus"></i>添加钩子
        </el-button>

        <h4 style="float: left; margin: 20px 0 0 0">
            钩子列表
            <el-tooltip content="如何使用钩子？" placement="top">
            <a target="_blank" href="https://segmentfault.com/a/1190000014244612" style="color: #808080;">
                <i class="el-icon-question"></i>
            </a>
            </el-tooltip>
        </h4>
        <el-table :data="hookList" size="mini" border style="width: 100%;margin-top:20px">
            <template slot="empty">
                还没有钩子，
                <a target="_blank" href="https://segmentfault.com/a/1190000014244612" style="color: #1891F0;">
                    如何使用？
                </a>
            </template>
            <el-table-column label="链接" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <i class="el-icon-warning" v-if="scope.row.state === '0'" style="color:#F56C6C"></i>
                    <span>{{scope.row.url}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="token" label="token" :show-overflow-tooltip="true"/>
            <el-table-column label="触发事件" width="200">
                <template slot-scope="scope">
                    <el-tag v-for="event in scope.row.events" :key="event" style="margin-right:5px">{{formateEvent(event)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" plain :disabled="!isManager" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-tooltip :content="scope.row.state === '0' ? '恢复钩子触发' : '暂停钩子触发'" placement="top">
                        <el-button size="mini" :type="scope.row.state === '0' ? 'success' : 'danger'" plain :disabled="!isManager" @click="switchHook(scope.row)">
                            {{scope.row.state === '0' ? '恢复' : '暂停'}}
                        </el-button>
                    </el-tooltip>
                    <el-button size="mini" type="primary" plain @click="testHook(scope.row)">测试</el-button>
                    <el-button size="mini" type="primary" plain :disabled="!isManager" @click="handleEdit(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <h4 style="margin: 20px 0 0 0">最近触发记录</h4>
        <el-table :data="hookCallLogs" size="mini" border style="width: 100%;margin-top:20px">
            <el-table-column prop="time" :formatter="formateDateRow" label="时间" width="120"/>
            <el-table-column prop="event" label="事件"  width="150"/>
            <el-table-column prop="success" label="状态" :show-overflow-tooltip="true"/>
            <el-table-column prop="url" label="链接"/>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change="handlePageChange"
                    layout="total, prev, pager, next"
                    :page-size="pageSize"
                    :total="totalCount">
            </el-pagination>
        </div>

        <el-dialog title="钩子" :visible.sync="dialogFormVisible" width="540px">
            <el-form label-width="80px">
                <el-form-item label="链接">
                    <el-input v-model="formData.url" placeholder="条件触发后调用的链接，http开头，POST调用"/>
                </el-form-item>
                <el-form-item label="token">
                    <el-input v-model="formData.token" placeholder="校验用token，可选，调用链接时会带上这个参数"/>
                </el-form-item>
                <el-form-item label="触发条件">
                    <el-checkbox-group v-model="formData.events">
                        <el-tooltip content="提交前触发，返回'ok'提交通过，其他则拒绝提交，并显示返回的信息给提交者" placement="top">
                            <el-checkbox label="start-commit">提交前</el-checkbox>
                        </el-tooltip>
                        <!--<el-checkbox label="pre-commit">pre-commit</el-checkbox>-->
                        <el-checkbox label="post-commit">提交后</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import tools from '../assets/js/tools'
    export default {
        props: {
            pid: {
                type: String,
                default: '0'
            },
        },
        data()
        {
            return {
                dialogFormVisible: false,
                currentPage: 1,
                disableScroll: false,
                hookCallLogs: [],
                hookInfo: null,
                hookList: [],
                totalCount:0,
                pageSize:13,
                formData: {
                    url: '',
                    token: '',
                    events: [],
                    _id: '',
                }
            };
        },
        computed:{
            isManager()
            {
                return this.$store.state.currProjectInfo.role !== 'normal'
            },
            isOwner()
            {
                return this.$store.state.currProjectInfo.role === 'owner'
            },
        },
        methods: {
            handleNew()
            {
                this.formData = {
                    url: '',
                    token: '',
                    events: [],
                    _id: '',
                }
                this.dialogFormVisible = true
            },
            formateEvent(event)
            {
                let name = ''
                if(event === 'start-commit')
                    name = '提交前'
                else if(event === 'post-commit')
                    name = '提交后'
                return name
            },
            handlePageChange(val)
            {
                this.page = val;
                this.getHookLogs();
            },
            handleEdit(row)
            {
                this.formData.url = row.url;
                this.formData.token = row.token;
                this.formData.events = row.events;
                this.formData._id = row._id;
                this.dialogFormVisible = true;
            },
            handleDelete(index, row)
            {
                let self = this;
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>
                {
                    self.$axios.get('/api/deleteHook?id=' + row._id).then((res) =>
                    {
                        if (res.data.success === false)
                            return
                        self.hookList.splice(index, 1);
                    })
                })

            },
            save()
            {
                if(this.formData.url.indexOf("http") !== 0)
                {
                    this.$message.error('链接必须以http开头')
                    return
                }
                let self = this;
                let param = new FormData()
                param.append('projectId', this.pid)
                param.append('hid', this.formData._id)
                param.append('url', this.formData.url)
                param.append('token', this.formData.token)
                param.append('events', this.formData.events.join(";"))
                this.$axios.post('/api/saveHook', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        console.log(response.data.msg)
                        return
                    }
                    self.getDatas();
                    self.dialogFormVisible = false
                })
            },
            formateDateRow(row, column)
            {
                return tools.formatDateBefore(row.time)
            },
            loadMore()
            {
                console.log("on load more page")
                this.page += 1
                this.getHookLogs()
            },
            getDatas()
            {
                let self = this;
                let param = new FormData()
                param.append('projectId', this.pid)
                param.append('page', 1)
                param.append('pageSize', 50)

                this.$axios.post('/api/getHooks', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        console.log('获取hook失败' + response.data.msg);
                        return
                    }
                    self.hookList = response.data.list;
                })
            },
            getHookLogs()
            {
                if (this.page === 1)
                    this.hookCallLogs = []
                let self = this;
                let param = new FormData()
                param.append('projectId', this.pid)
                param.append('page', this.page)
                param.append('pageSize', this.pageSize)


                this.$axios.post('/api/getHookLogs', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        console.log(response.data.msg);
                        return
                    }

                    self.hookCallLogs = response.data.list
                    self.totalCount = response.data.totalCount
                    self.disableScroll = self.page >= response.data.totalPage
                })
            },
            testHook(row)
            {
                let self = this;
                let param = new FormData()
                param.append('hookid', row._id)
                this.$axios.post('/api/testHook', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        console.log(response.data.msg);
                        return
                    }
                    self.getHookLogs()
                })
            },
            switchHook(row)
            {
                let self = this;
                let param = new FormData()
                param.append('hookid', row._id)
                this.$axios.post('/api/switchHook', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return
                    }
                    self.getDatas();
                })
            },
        },
        created()
        {
            this.page = 1
            this.getDatas();
            this.getHookLogs();
        },
        mounted()
        {
        },
        watch: {
            pid: function (newPid)
            {
                console.log('on pid changed, update hooks page')
                this.page = 1
                this.getDatas();
                this.getHookLogs();
            }
        }
    }
</script>

<style scoped>

</style>
