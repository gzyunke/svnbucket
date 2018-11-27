<template>
    <div>
        <!--顶部地址栏-->
        <el-breadcrumb separator-class="el-icon-arrow-right" >
            <el-breadcrumb-item style="position: relative;left:11px;margin: 25px 10px 0 0;display: inline">
                <div style="display: inline;" @click="jumpToPathIndex(0)"><span style="color: rgb(96, 127, 148);">{{$store.state.currProjectInfo.name}}</span></div>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="(path, index) in pathList" :key="path + index" style="margin-top: 25px;display: inline" v-if="path.length > 0">
                <div style="display: inline" @click="jumpToPathIndex(index)"><span style="color: rgb(96, 127, 148);">{{path}}</span></div>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div style="float: right;display: inline; position: relative; top:-20px">
            <!--<el-tooltip content="SVN快速上手教程" placement="top">-->
                <!--<a target="_blank" href="https://segmentfault.com/a/1190000014245101" style="color: #808080;">-->
                    <!--<i class="el-icon-question"></i>-->
                <!--</a>-->
            <!--</el-tooltip>-->
            <el-tooltip content="SVN 快速上手教程" placement="top">
                <a target="_blank" href="https://blog.csdn.net/atsoar/article/details/80460440" style="color: #808080;">
                    <i class="el-icon-question"></i>
                </a>
            </el-tooltip>
            <el-input size="small" style="width:350px" class="input-with-select"
                      :value="svnPath"
                      id = 'svnURL'
                      >
                <!--@focus="selectContent"-->
                <el-button slot="append" @click="copyURL">复制</el-button>
            </el-input>
        </div>

        <!--<el-card>-->
            <!--返回-->
            <div @click="backParentPath" style="float:left; position:relative; cursor: pointer; left:9px; top:33px; z-index: 100" v-show="!(isFileList && currentPath === '/')">
                <img src="../assets/img/add-folder-arrow.svg">
                <span>返回</span>
            </div>

            <div @click="getHistory" style="float:right; right: -349px; position:relative; cursor: pointer; top:33px; z-index: 100" v-show="!(isFileList && currentPath === '/')">
                <span style="color: #1891F0;">变更历史</span>
            </div>

            <!--文件列表-->
            <el-table :data="fileList" size="mini" style="width: 100%; margin: 10px 0 0 0" v-if="isFileList" >
                <template slot="empty">
                    <template v-if="currentPath === '/'">
                        当前项目没有代码，
                        <a target="_blank" href="https://blog.csdn.net/atsoar/article/details/80460440" style="color: #1891F0;">
                            SVN快速上手教程
                        </a>
                    </template>
                </template>
                <el-table-column label="" >
                    <template slot-scope="scope">
                        <div @click="getFileList(scope.row.name)" style="cursor: pointer" v-if="scope.row.isDir">
                            <img src="../assets/img/detail-code-folder.svg">
                            <span>{{scope.row.name}}</span>
                        </div>
                        <div @click="getFileContent(scope.row.name)" style="cursor: pointer" v-else>
                            <img src="../assets/img/detail-code-file.svg">
                            <span>{{scope.row.name}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="" prop="author"/>
                <el-table-column label="" >
                    <template slot-scope="props">
                        <span>{{formatData(props.row.time)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="" prop="log" :show-overflow-tooltip="true"/>
            </el-table>
            <div v-else style="margin: 70px 0 0 10px" v-highlight>
                <pre><code class="code-style">{{fileContent}}</code></pre>
            </div>
        <!--</el-card>-->

        <el-dialog title="" :visible.sync="changeListDialogVisible" width="800px" center>
            <div style="margin-bottom: 10px;">
                <h4 style="display: inline">{{changeFiles.length}}个文件</h4>
                <span style="color: #808080;">（ {{updateNum}} 修改 / {{newNum}} 新增 / {{deleteNum}} 删除 ）</span>
            </div>
            <div v-for="file in changeFiles" @click="" style="cursor: pointer;margin-top: 8px">
                <img v-if="file[0] === 'A'" src="../assets/img/record-add.svg">
                <img v-if="file[0] === 'U'" src="../assets/img/record-modify.svg">
                <img v-if="file[0] === 'D'" src="../assets/img/record-delete.svg">
                <span @click="getFileDiff(file[1], file[0])">{{file[1]}}</span>
            </div>
        </el-dialog>

        <el-dialog title="" :visible.sync="logsDialogVisible" width="80%" center>
            <el-table :data="commitLogs" style="width: 100%" @expand-change="onExpand">
                <template slot="empty">
                    <span >还没有提交记录</span>
                </template>
                <el-table-column label="版本号" prop="revision" width="80"/>
                <!--<el-table-column label="用户名" prop="author" width="120"/>-->
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
            <span style="color: #909399;position: relative; top: 3px; right: 50px; margin-bottom: 5px; float: right"><i class="el-icon-info"></i> 只显示最近10条</span>
        </el-dialog>

        <el-dialog title="" :visible.sync="diffDialogVisible" width="80%" center>
            <div v-highlight v-if="diffDialogVisible">
                <pre><code class="javascript">{{diffContent}}</code></pre>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import tools from '../assets/js/tools'

    var hljs = require('highlight.js')
    export default {
        props: ['pid'],
        data()
        {
            return {
                currentPath: '',
                fileContent:'',
                isFileList:true,
                pathList: [],
                fileList: [],
                currentFile: '',
                logsDialogVisible: false,
                changeListDialogVisible: false,
                commitLogs: [],
                changeFiles:[],
                newNum:0,
                deleteNum:0,
                updateNum:0,
                diffContent:'',
                diffDialogVisible:false,
            }
        },
        computed:{
            svnPath()
            {
                let root = this.$store.state.currProjectInfo.svnURL
                let relative = this.pathList.join('/')
                return root + relative
            }
        },
        methods: {
            formatData(time)
            {
                return tools.formatDateBefore(time);
            },
            onExpand(row)
            {
                console.log('expand:' + row.revision)
                this.getChangeFiles(row.revision)
            },
            selectContent(event)
            {
                event.target.select()
            },
            copyURL()
            {
                let e = document.getElementById("svnURL");
                e.select();
                let tag = document.execCommand("Copy");
                if (tag)
                {
                    this.$message.success("复制成功");
                }
            },
            jumpToPathIndex(index)
            {
                if(this.currentPath === '/')
                    return;

                if (index === this.pathList.length - 1)
                    return;
                var newPathList = this.pathList.slice(0, index + 1)
                var toPath = newPathList.join('/') + '/';
                this.getFileList(toPath, false)
            },
            getFileList(path, needConnect = true)
            {
                let fullPath = needConnect ? this.currentPath + path + "/" : path;
                let self = this;
                let param = new FormData()
                param.append('projectId', self.pid)
                param.append('path', fullPath)
                this.$axios.post('/api/getFileList', param).then(function (response)
                {
                    if (response.data.msg)
                    {
                        console.log('获取失败' + response.data.msg);
                        return;
                    }
                    self.currentPath = fullPath;
                    self.pathList = self.currentPath.split('/')
                    self.fileList = response.data.list;
                    self.isFileList = true
                })
            },
            backParentPath()
            {
                if(this.isFileList)
                {
                    if (this.currentPath !== '/')
                    {
                        let paths = this.currentPath.split("/");
                        let parents = paths.slice(0, -2);
                        let backPath = parents.join("/") + '/';
                        this.getFileList(backPath, false);
                    }
                }
                else
                {
                    this.isFileList = true
                }
            },
            getHistory()
            {
                let self = this;
                let path = '';
                if(!this.isFileList)
                {
                    path = this.currentPath + this.currentFile;
                }
                else
                {
                    path = this.currentPath;
                }

                let param = new FormData()
                param.append('projectId', this.pid)
                param.append('path', path)
                this.$axios.post('/api/history', param).then(function (response)
                {
                    if (response.data.msg)
                    {
                        console.log(response.data.msg);
                        return;
                    }
                    self.commitLogs = response.data.logs;
                    self.logsDialogVisible = true;
                })
            },
            getFileContent(path)
            {
                this.currentFile = path;
                let self = this;
                let param = new FormData()
                param.append('projectId', self.pid)
                param.append('path', self.currentPath + path)
                this.$axios.post('/api/getFileContent', param).then(function (response)
                {
                    if (response.data.msg)
                    {
                        console.log('获取文件内容失败:' + response.data.msg);
                        return;
                    }
                    // document.getElementById("code").textContent = response.data.content
                    // hljs.highlightBlock(self.$refs.highlightcode);
                    self.fileContent = response.data.content
                    self.isFileList = false
                })
            },
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
                    self.changeListDialogVisible = true
                })
            },

        },
        created()
        {
            this.getFileList('');
        },
        watch: {
            pid: function (newPid)
            {
                console.log("======on pid changed:" + newPid);
                this.currentPath = ''
                this.getFileList('')
            }
        }

    }
</script>

<style scoped>

</style>
