<template>
     <div class="dynamic-container">
         <div class="dynamic-content">
            <el-table :data="dynamic" style="width: 100%">
                <el-table-column label="项目" width="180">

                    <template slot-scope="scope">
                        <router-link :to="'/detail/' + scope.row.projectId"><p style="color: #409eff">{{ scope.row.projectName}}</p></router-link>
                    </template>
                </el-table-column>

                <el-table-column label="头像" width="80">
                    <template slot-scope="scope">
                        <img :src="imgFullPath(scope.row.head)" style="width: 30px; height: 30px; border-radius: 50%">
                    </template>
                </el-table-column>

                <el-table-column label="名字" width="120" :show-tooltip-when-overflow="true">
                    <template slot-scope="scope">
                        <span>{{scope.row.name || scope.row.author}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="msg" label="描述" :show-tooltip-when-overflow="true"/>

                <el-table-column prop="" label="时间" width="150">
                    <template slot-scope="scope">
                        {{timeFormat(scope.row.time)}}
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" plain size="small" @click="getChangeFiles(scope.row)">文件变更</el-button>
                    </template>
                </el-table-column>

            </el-table>
         </div>

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
             <div v-for="file in changeFiles" @click="" style="cursor: pointer;margin-top: 8px">
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
        name: "ProjectsDynamic",
        data() {
            return {
                page: 1,
                pageSize: 10,
                totalCount: 0,
                dynamic: [],
                currentTime: new Date(),
                changeFiles: [],
                pid: '',
                rev: '',
                newNum: 0,
                updateNum: 0,
                deleteNum: 0,
                diffContent:'',
                dialogVisible:false,
                diffDialogVisible:false,
            }
        },
        methods: {
            imgFullPath(head) {
                return tools.imgFullPath(head, 'head', 5, 30)
            },
            handlePageChange(val) {
                this.page = val;
                this.getDynamic();
            },
            getDynamic() {
                let self = this;
                let param = new FormData();
                param.append('page', self.page);
                param.append('pageSize', self.pageSize);
                this.$axios.post('/api/timeline', param).then((res) => {
                    console.log(res);
                    self.totalCount = res.data.totalCount;
                    self.dynamic = res.data.list;
                })
            },
            timeFormat(date) {
                return tools.formatDateBefore(date);
            },
            getChangeFiles(data) {
                this.pid = data.projectId;
                this.rev = data.revision;
                let self = this;
                let param = new FormData();
                param.append('projectId', data.projectId);
                param.append('rev', data.revision);
                this.$axios.post('/api/verChangeFiles', param).then(function (response) {
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
            getFileDiff(path, state) {
                let self = this;
                let param = new FormData();
                param.append('projectId', this.pid);
                param.append('rev', this.rev);
                param.append('path', path);
                param.append('state', state);
                this.$axios.post('/api/getFileDiff', param).then(function (response)
                {
                    if (response.data.success === false)
                        return;
                    self.diffContent = response.data.diff;
                    self.diffDialogVisible = true
                })
            },
        },
        mounted() {
            this.getDynamic();
        }
    }
</script>

<style scoped>
    .dynamic-container {
        margin: 0 auto;
        /*padding: 20px 30px;*/
        width: 1200px;
        padding: 0 35px;
    }
</style>