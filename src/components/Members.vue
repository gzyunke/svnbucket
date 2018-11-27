<template>
    <div>
        <el-button type="primary" size="small" @click="handleNew" style="float: right;margin:10px 26px 10px 0" :disabled="!isManager"><i class="el-icon-plus"></i>添加成员</el-button>
        <h4 style="float: left;margin-top: 20px">成员列表</h4>
        <el-table :data="memberList" size="mini"  style="width: 100%;margin-top:20px">
            <el-table-column label="头像" width="70">
                <template slot-scope="scope">
                    <img :src="imgFullPath(scope.row.head)" style="border-radius:15px;margin-top: 5px;width:30px;height:30px">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名字" width="200"/>
            <el-table-column prop="username" label="用户名" width="200"/>
            <el-table-column prop="permissions" label="权限" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-tag v-for="(permission, key) in scope.row.permissions" :key="key" style="margin-right:5px">
                        {{key}} = {{permission}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="角色" width="120">
                <template slot-scope="scope">
                    <el-tag style="margin-right:5px" :type="roleStyle(scope.row.role)">
                        {{formateRole(scope.row.role)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="加入时间" :formatter="formateDateRow" width="100"/>
            <el-table-column label="操作" width="230">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.userid === $store.state.userData.userid" size="mini" type="danger" plain
                               @click="handleExit(scope.$index, scope.row)" :disabled="isOwner">退出</el-button>

                    <el-button v-else size="mini" type="danger" plain :disabled="!isManager || scope.row.userid === $store.state.currProjectInfo.creator"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                    <el-button size="mini" type="primary" plain :disabled="!isOwner"
                               @click="roleEdit(scope.row)">角色</el-button>

                    <el-button size="mini" type="primary" plain :disabled="!isManager" @click="permissionEdit(scope.row)">权限</el-button>

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

        <el-dialog title="角色" :visible.sync="roleDialogVisible" width="400px" center>
            <div style="margin-left: 83px">
                <el-tooltip content="拥有管理项目成员、钩子权限" placement="top">
                    <el-radio v-model="role" label="manager">管理员</el-radio>
                </el-tooltip>
                <el-tooltip content="无项目管理权限" placement="top">
                    <el-radio v-model="role" label="normal">普通成员</el-radio>
                </el-tooltip>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRole">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="选择用户" :visible.sync="selectUserDialogVisible" width="700px">
            <el-input placeholder="请输入对方 SVNBucket 帐号的用户名或Email" v-model="keyword" clearable @keyup.enter.native="searchUsers">
                <el-button slot="append" icon="el-icon-search" @click="searchUsers" />
            </el-input>

            <el-table :data="searchList" size="mini" border style="width: 100%;margin-top: 20px"
                      class="rowHeight" height="250" @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column label="头像" width="70">
                    <template slot-scope="scope">
                        <img :src="imgFullPath(scope.row.head)" style="border-radius: 100px;width:30px;height:30px;">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名"/>
                <el-table-column prop="username" label="帐号"/>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="selectUserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="nextStep" :disabled="selectedUids.length <= 0">下一步</el-button>
            </div>
        </el-dialog>

        <el-dialog title="目录权限设定" :visible.sync="permissionDialogVisible" width="680px">
            <el-row :gutter="10" type="flex" align="middle" justify="end" v-for="(info, index) in permissions"
                    :key="index">
                <el-col :span="3">
                    <el-button type="danger" icon="el-icon-delete" plain :disabled="index === 0"
                               @click="deletePath(index)"/>
                </el-col>
                <el-col :span="14">
                    <el-input v-model="info.path" placeholder="以/开头，非/结尾">
                        <el-button slot="append" @click="browserDir(index)">浏览</el-button>
                    </el-input>
                </el-col>
                <el-col :span="9">
                    <el-radio v-model="info.permission" label="rw" style="width:30px;">读写</el-radio>
                    <el-radio v-model="info.permission" label="r" style="width:30px;">只读</el-radio>
                    <el-radio v-model="info.permission" label="" style="width:30px;">无权限</el-radio>
                </el-col>
            </el-row>

            <div slot="footer" class="dialog-footer">
                <a target="_blank" href="https://blog.csdn.net/atsoar/article/details/82625928" style="color: #1891F0;float: left; margin-left: 8px">
                    <i class="el-icon-question"></i> 如何设置权限
                </a>
                <el-button @click="permissionDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPath" >添加路径</el-button>
                <el-button type="primary" @click="savePermissions">保存</el-button>
            </div>
        </el-dialog>

        <el-dialog title="选择路径" :visible.sync="browserDialogVisible" width="500px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item style="position: relative;left:26px;margin: 0 24px 0 0">
                    <div style="display: inline;" @click="jumpToPathIndex(0)"><span style="color: rgb(96, 127, 148);">{{$store.state.currProjectInfo.name}}</span></div>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-for="(path, index) in pathList" :key="path + index" v-if="path.length > 0">
                    <div style="display: inline" @click="jumpToPathIndex(index)"><span style="color: rgb(96, 127, 148);">{{path}}</span></div>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div @click="backParentPath" style="position:relative; cursor: pointer;left:39px;top:48px; z-index: 1000">
                <img src="../assets/img/add-folder-arrow.svg">
                <span>返回</span>
            </div>
            <el-table :data="fileList" size="mini" style="width: 100%;margin-top: 20px"
                      class="rowHeight" height="250" head>
                <el-table-column width="30">
                    <template slot-scope="scope">
                        <el-checkbox v-model="checkList[scope.$index]"
                                     @change="function(value){handleCheckDir(scope.$index)}"/>
                        <!--<el-radio v-model="checkedPath" :label="scope.row.name"> </el-radio>-->
                    </template>
                </el-table-column>
                <el-table-column label="">
                    <template slot-scope="scope">
                        <div @click="getFileList(scope.row.name)" style="cursor: pointer">
                            <img src="../assets/img/detail-code-folder.svg">
                            <span>{{scope.row.name}}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="browserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSelectedPath" :disabled="!isChecked">确定</el-button>
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
                roleDialogVisible: false,
                selectUserDialogVisible: false,
                permissionDialogVisible: false,
                browserDialogVisible: false,
                keyword: '',
                page: 1,
                pageSize: 15,
                totalCount: 0,
                memberList: [],
                searchList: [],
                selectedUids: [],
                role: '',
                userid: '',
                currentPath: '',
                pathList: [],
                fileList: [],
                checkList: [],
                browserIndex: 0,
                selectedPath: '',
                permissions: []
            }
        },
        computed: {
            isChecked()
            {
                for (let i in this.checkList)
                {
                    if (this.checkList[i])
                        return true
                }
            },
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
            handlePageChange(val)
            {
                this.page = val;
                this.getMembers();
            },
            handleSelectionChange(selections)
            {
                this.selectedUids = selections.map((user) => user._id);
            },
            handleCheckDir(index)
            {
                for (let i in this.checkList)
                {
                    this.checkList[i] = false
                }
                this.checkList[index] = true
                this.selectedPath = this.currentPath + this.fileList[index].name
            },
            onSelectedPath()
            {
                this.permissions[this.browserIndex].path = this.selectedPath
                this.browserDialogVisible = false
            },
            handleNew()
            {
                this.searchUsers()
                this.selectedUids = []
                this.permissions = [{path: '/', permission: 'rw'}]
                this.selectUserDialogVisible = true;
            },
            permissionEdit(row)
            {
                let permissions = []
                for (let key in row.permissions)
                {
                    permissions.push({path: key, permission: row.permissions[key]})
                }
                this.permissions = permissions
                this.selectedUids = [row.userid]
                this.permissionDialogVisible = true;
            },
            roleEdit(row)
            {
                this.role = row.role;
                this.userid = row.userid;
                this.roleDialogVisible = true;
            },
            addPath()
            {
                // if(this.permissions.length >= 10)
                // {
                //     this.$message.error('最多设置 10 个路径')
                //     return
                // }
                this.permissions.push({path: '', permission: 'rw'})
            },
            deletePath(index)
            {
                this.permissions.splice(index, 1)
            },
            savePermissions()
            {
                let self = this
                let permissionDict = {}
                let isComplete = false
                this.permissions.forEach(function (item)
                {
                    if (item.path.length > 0)
                    {
                        permissionDict[item.path] = item.permission
                        isComplete = true
                    }
                })

                if (!isComplete)
                {
                    this.$message.error('至少填写一个路径')
                    return
                }

                let param = new FormData()
                param.append('projectId', this.pid)
                param.append('userids', this.selectedUids.join(';'))
                param.append('permissions', JSON.stringify(permissionDict))

                this.$axios.post('/api/savePermissions', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return;
                    }
                    self.getMembers();
                    self.selectUserDialogVisible = false
                    self.permissionDialogVisible = false
                })
            },
            browserDir(index)
            {
                this.browserIndex = index
                this.currentPath = ''
                this.getFileList('')
                this.browserDialogVisible = true;
            },
            jumpToPathIndex(index)
            {
                if (index === this.pathList.length - 1)
                    return;
                var newPathList = this.pathList.slice(0, index + 1)
                var toPath = newPathList.join('/')
                this.currentPath = '';
                this.getFileList(toPath)
            },
            backParentPath()
            {
                if (this.currentPath !== '/')
                {
                    let paths = this.currentPath.split("/");
                    let parents = paths.slice(0, -2);
                    this.currentPath = parents.join("/");
                    this.getFileList('');
                }
            },
            getFileList(path)
            {
                let self = this;
                let param = new FormData()
                param.append('projectId', this.pid)
                param.append('path', this.currentPath + path + "/")
                param.append('onlyDir', 1)
                this.$axios.post('/api/getFileList', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return;
                    }
                    self.currentPath += path + "/";

                    self.pathList = self.currentPath.split('/')
                    self.fileList = response.data.list
                    self.checkList = self.fileList.map(() => false)
                    self.selectedPath = ''
                })
            },
            nextStep()
            {
                this.permissionDialogVisible = true;
            },
            imgFullPath(imgName)
            {
                // return tools.CDN_ROOT + "/head/" + imgName + "?imageView2/5/w/30"
                return tools.imgFullPath(imgName, 'head', 5, 30)
            },
            formateDateRow(row, column)
            {
                return tools.formatDateBefore(row.joinTime)
            },
            formateRole(role)
            {
                if(role === 'normal')
                    name = '普通成员'
                else if(role === 'manager')
                    name = '管理员'
                else if(role === 'owner')
                    name = '拥有者'

                return name
            },
            roleStyle(role)
            {
                if(role === 'normal')
                    name = 'info'
                else if(role === 'manager')
                    name = ''
                else if(role === 'owner')
                    name = 'danger'

                return name
            },
            formatData(str)
            {
                return tools.formatDateBefore(str);
            },
            saveRole()
            {
                let self = this;
                let param = new FormData()
                param.append('userids', this.userid)
                param.append('projectId', this.pid)
                param.append('role', this.role)
                this.$axios.post('/api/setMemberRole', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return
                    }
                    self.getMembers();
                    self.roleDialogVisible = false;
                })
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
                    let param = new FormData()
                    param.append('projectId', this.pid)
                    param.append('userids', row.userid)
                    this.$axios.post('/api/deleteMembers', param).then(function (response)
                    {
                        if (response.data.success === false)
                        {
                            return
                        }
                        self.getMembers();
                    })
                })
            },
            handleExit(index, row)
            {
                let self = this;
                this.$confirm('确定退出项目吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>
                {
                    let param = new FormData()
                    param.append('projectId', this.pid)
                    param.append('userids', row.userid)
                    this.$axios.post('/api/deleteMembers', param).then(function (response)
                    {
                        if (response.data.success === false)
                        {
                            return
                        }
                        self.$message.success("退出成功")
                        self.$router.push({path: '/projects'})
                    })
                })
            },
            getMembers()
            {
                let self = this;
                let param = new FormData()
                param.append('projectId', this.pid)
                param.append('page', this.page)
                param.append('pageSize', this.pageSize)
                this.$axios.post('/api/memberList', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return;
                    }
                    self.memberList = response.data.list
                    self.totalCount = response.data.totalCount
                })
            },
            searchUsers()
            {
                let self = this;
                let param = new FormData()
                param.append('keyword', this.keyword)
                param.append('projectId', this.pid)
                param.append('pageSize', 50)
                this.$axios.post('/api/searchUser', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return;
                    }
                    self.searchList = response.data.list;
                })
            }
        },
        created()
        {
            this.page = 1
            this.getMembers();
        },
        watch: {
            pid: function (newPid)
            {
                this.page = 1
                this.getMembers();
            }
        }
    }
</script>

<style>
    .el-row {
        margin-bottom: 20px;
    }
</style>
