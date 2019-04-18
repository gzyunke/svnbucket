<template>
    <div>
        <el-table :data="commitLogs" style="width: 100%" size="mini">
            <template slot="empty">
                <span >还没有提交记录</span>
            </template>
            <el-table-column label="版本号" prop="revision" width="80"/>
            <!--<el-table-column label="用户名" prop="author" width="120"/>-->
            <el-table-column label="头像" width="70">
                <template slot-scope="scope">
                    <img :src="imgFullPath(scope.row.head)" style="border-radius:15px;margin-top: 5px;width:30px;height:30px;">
                </template>
            </el-table-column>
            <el-table-column label="名字" prop="name" width="120"/>
            <el-table-column label="时间" width="130">
                <template slot-scope="props">
                    <span>{{formatData(props.row.time)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="msg" :show-overflow-tooltip="true"/>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="getChangeFiles(scope.row.revision)">文件变更</el-button>
                    <!--<el-button type="text" @click="getDiff(scope.row.revision)">查看diff</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change="handlePageChange"
                    layout="total, prev, pager, next"
                    :page-size="pageSize"
                    :total="totalCount">
            </el-pagination>
        </div>

        <el-dialog title="" :visible.sync="dialogVisible" width="800px" center>
            <div style="margin-bottom: 10px;">
                <h4 style="display: inline">{{changeFiles.length}}个文件</h4>
                <span style="color: #808080;">（ {{updateNum}} 修改 / {{newNum}} 新增 / {{deleteNum}} 删除 ）</span>
            </div>
            <div v-for="file in changeFiles" @click="" style="cursor: pointer;margin-top: 8px;">
                <img v-if="file[0] === 'A'" src="../assets/img/record-add.svg">
                <img v-if="file[0] === 'U'" src="../assets/img/record-modify.svg">
                <img v-if="file[0] === 'D'" src="../assets/img/record-delete.svg">
                <span style=" font-family: 'Consolas', 'monaco';" @click="getFileDiff(file[1], file[0])">{{file[1]}}</span>
            </div>
        </el-dialog>

        <el-dialog title="" :visible.sync="diffDialogVisible" width="80%" center>
            <div v-highlight v-if="diffDialogVisible">
                <pre><code class="javascript" style="font-family: Consolas,monaco,sans-serif;">{{diffContent}}</code></pre>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import tools from '../assets/js/tools'
    export default {
        props: ['pid'],
        data()
        {
            return {
                commitLogs: [],
                disableScroll: false,
                page: 1,
                pageSize:14 ,
                totalCount:0,
                changeFiles:[],
                newNum:0,
                deleteNum:0,
                updateNum:0,
                diffContent:'',
                dialogVisible:false,
                diffDialogVisible:false,
                rev: 0,
            }
        },
        methods: {
            handlePageChange(val)
            {
                this.page = val;
                this.getCommitLogs();
            },
            formatData(timets)
            {
                return tools.formatDateBefore(timets);
            },
            imgFullPath(imgName)
            {
                // return tools.CDN_ROOT + "/head/" + imgName + "?imageView2/5/w/30"
                return tools.imgFullPath(imgName, 'head', 5, 30)
            },
            getCommitLogs()
            {
                let self = this;
                let param = new FormData()
                param.append('projectId', this.pid)
                param.append('page', this.page)
                param.append('pageSize', this.pageSize)
                this.$axios.post('/api/getlog', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return
                    }
                    self.totalCount = response.data.totalCount
                    self.commitLogs = response.data.list
                })
            },
            loadMore()
            {
                console.log("on load more page")
                this.page += 1
                this.getCommitLogs()
            },
            getChangeFiles(rev)
            {
                this.rev = rev
                let self = this;
                let param = new FormData()
                param.append('projectId', this.pid)
                param.append('rev', rev)
                this.$axios.post('/api/verChangeFiles', param).then(function (response)
                {
                    if (response.data.success === false)
                        return;
                    self.newNum = 0;
                    self.deleteNum = 0;
                    self.updateNum = 0;
                    self.changeFiles = response.data.changes;
                    if (self.changeFiles.length > 0)
                    {
                        for (let i = 0; i < self.changeFiles.length; i++)
                        {
                            let state = self.changeFiles[i][0];
                            if (state === 'A')
                                self.newNum++;
                            else if (state === 'U')
                                self.updateNum++;
                            else if (state === 'D')
                                self.deleteNum++;
                        }
                    }
                    self.dialogVisible = true
                })
            },
            // getDiff(rev)
            // {
            //     let self = this;
            //     let param = new FormData()
            //     param.append('projectId', this.pid)
            //     param.append('rev', rev)
            //     this.$axios.post('/api/getDiff', param).then(function (response)
            //     {
            //         if (response.data.success === false)
            //             return;
            //         self.diffContent = response.data.diff;
            //         self.diffDialogVisible = true
            //     })
            // },
            getFileDiff(path, state)
            {
                let self = this;
                let param = new FormData()
                param.append('projectId', this.pid)
                param.append('rev', this.rev)
                param.append('path', path)
                param.append('state', state)
                this.$axios.post('/api/getFileDiff', param).then(function (response)
                {
                    if (response.data.success === false)
                        return;
                    self.diffContent = response.data.diff;
                    self.diffDialogVisible = true
                })
            },

        },
        created()
        {
            this.page = 1
            this.getCommitLogs();
        },
        watch: {
            pid: function (newPid)
            {
                console.log('on pid changed, update commit log')
                this.page = 1
                this.getCommitLogs()
            }
        }
    }

</script>

<style scoped>
    .el-button
    {
        padding: 0 0;
    }
    .el-table td, .el-table th
    {
        padding: 5px 0
    }
</style>
