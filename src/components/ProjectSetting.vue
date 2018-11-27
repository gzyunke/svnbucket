<template>
    <div>
        <el-form :model="formData" label-width="80px" label-position="top">
            <el-form-item label="项目封面">
                <el-upload
                        style="float: left;margin-right:15px"
                        action=""
                        :show-file-list="false"
                        :on-success="onUploadSuccess"
                        :http-request="upload2Cos">
                    <img v-if="formData.imgURL" :src="imgFullURL(formData.imgURL)" style="border-radius:5px; width: 258px; height: 129px">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="项目名字">
                <el-popover
                        ref="popover1"
                        placement="right"
                        width="300"
                        trigger="click"
                        content="修改项目名字将导致 SVN 地址变化，请谨慎操作（重定向可快速切换项目地址）">
                </el-popover>
                <el-input v-model="formData.name" :maxlength="50" style="width: 500px;" v-popover:popover1/>
            </el-form-item>
            <el-form-item label="项目简介">
                <el-input type="textarea" v-model="formData.desc" :maxlength="100" style="width: 500px;"/>
            </el-form-item>
            <el-form-item label="">
                <el-checkbox v-model="formData.forceMsg" true-label="1" false-label="0">强制填写提交描述</el-checkbox>
            </el-form-item>
            <!--只有拥有者显示-->
            <el-form-item label="" v-if="$store.state.currProjectInfo.creator === $store.state.userData._id">
                <span>
                  总空间用量：{{formateSize($store.state.userData.reposSize) }} / {{formateSize($store.state.userData.reposMaxSize)}}，
                  <router-link to="/user/state" style="color: #1891F0">提升空间</router-link>
                </span>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" plain @click="deleteProject" :disabled="!isOwner" ><i class="el-icon-delete"></i> 删除项目</el-button>
                <el-button type="warning" plain @click="transferAlert" :disabled="!isOwner" >转让项目</el-button>
                <el-button type="primary" plain @click="updateProject" :disabled="!isOwner" ><i class="el-icon-warning" v-show="isChanged"></i> 保存修改</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="选择接收用户" :visible.sync="selectUserDialogVisible" width="700px">
            <el-input placeholder="请输入对方 SVNBucket 帐号的用户名或Email" v-model="keyword" clearable @keyup.enter.native="searchUsers">
                <el-button slot="append" icon="el-icon-search" @click="searchUsers" />
            </el-input>

            <el-table :data="searchList" size="mini" border style="width: 100%;margin-top: 20px" height="250" @current-change="onSelect" :highlight-current-row="true">
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
                <el-button type="danger" @click="transferProject" :disabled="selectedUid.length <= 0">转让给Ta</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import tools from '../assets/js/tools'
    export default
    {
        props: ['pid'],
        data()
        {
            return {
                tabIndex: 1,
                formData: {
                    _id:'',
                    name:'',
                    desc:'',
                    imgURL:'',
                    forceMsg:'0',
                },
                fileName: '',
                selectUserDialogVisible: false,
                keyword: '',
                searchList: [],
                selectedUid:'',
                cosFullPath: '',
            }
        },
        computed:
        {
            isChanged()
            {
                var oldInfo = this.$store.state.currProjectInfo
                var oldForceMsg = oldInfo.forceMsg ? oldInfo.forceMsg : '0'
                return this.formData.name !== oldInfo.name ||
                        this.formData.desc !== oldInfo.desc ||
                        this.formData.forceMsg !== oldForceMsg ||
                        this.formData.imgURL !== oldInfo.imgURL
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
        methods:
        {
            onUploadSuccess(response)
            {
                if (response.success === false)
                {
                    console.log('failed:' + response.msg);
                    this.$message.error(response.msg);
                }
                else
                {
                    this.$message.success('上传成功');
                }
            },
            searchUsers()
            {
                this.selectedUid = ''
                let self = this;
                let param = new FormData()
                param.append('keyword', this.keyword)
                param.append('pageSize', 50)
                this.$axios.post('/api/searchUser', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        return;
                    }
                    self.searchList = response.data.list;
                })
            },
            onSelect(currentRow)
            {
                this.selectedUid = currentRow._id;
            },
            formateSize(size)
            {
              if(!size)
                return 0 + ' M'
              return size > 1024 ? tools.round(size / 1024, 2) + ' G' : size + ' M'
            },
            imgFullPath(imgName)
            {
                // return tools.CDN_ROOT + "/head/" + imgName + "?imageView2/5/w/30"
                return tools.imgFullPath(imgName, 'head', 5, 30)
            },
            upload2Cos(data)
            {
                console.log(data);
                let self = this;
                var successCallBack = function (result)
                {
                    console.log(JSON.stringify(result));
                    self.formData.imgURL = self.fileName;
                    console.log(result);
                };

                var errorCallBack = function (result)
                {
                    result = result || {};
                    console.log(result.responseText || 'error');
                };

                var progressCallBack = function (curr)
                {
                    console.log('uploading... curr progress is ' + curr);
                };
                this.fileName = Math.floor(new Date().getTime() / 1000) + "_" + data.file.name;
                this.cosFullPath = '/cover/' + this.fileName;
                console.log('file name:' + this.cosFullPath);
                this.cos.uploadFile(successCallBack, errorCallBack, progressCallBack, tools.COS_BUCKET_NAME, this.cosFullPath, data.file, 0);
            },
            getCosSign(callback)
            {
                let self = this;
                let params = new FormData();
                params.append('cosFullPath', this.cosFullPath)
                this.$axios.post('/api/cosSignMore', params).then((res) =>
                {
                    if (res.data.success === false)
                    {
                        self.$message.error(res.data.msg);
                        return
                    }
                    console.log('sign:' + res.data.sign);
                    callback(res.data.sign)
                })
            },
            initCos()
            {
                this.cos = new CosCloud({
                    appid: tools.COS_APPID,
                    bucket: tools.COS_BUCKET_NAME,
                    region: tools.COS_REGION,
                    getAppSign: this.getCosSign,
                });
            },
            imgFullURL(url)
            {
                return tools.imgFullPath(url, 'cover', 1, 258, 129);
            },
            updateProject()
            {
                let self = this;
                let param = new FormData();
                param.append('imgURL', this.formData.imgURL);
                param.append('name', this.formData.name ? this.formData.name : '');
                param.append('desc', this.formData.desc ? this.formData.desc : '');
                param.append('forceMsg', this.formData.forceMsg ? this.formData.forceMsg : '');
                param.append('projectId', this.pid);

                this.$axios.post('/api/updateProject', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        console.log('修改失败！');
                        return;
                    }

                    self.$store.commit('updateProjectInfo', response.data);
                    self.$message.success("保存成功！")
                })
            },
            deleteProject()
            {
                let self = this;
                this.$confirm('一旦你删除了项目，所有与项目有关的信息将会被永久删除。这是一个不可恢复的操作，确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>
                {
                    this.$prompt("这是个危险操作，请输入\"OK\"确认", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        if(value !== 'OK' && value !== 'ok')
                        {
                            self.$message.warning("确认失败，删除取消")
                            return
                        }
                        let formData = new FormData();
                        formData.append('projectId', self.formData._id);
                        this.$axios.post('/api/deleteProject', formData).then(function (response)
                        {
                            if(MtaH5)
                                MtaH5.clickStat("delete")
                            if (response.data.success === false)
                            {
                                console.log('删除失败!');
                                return;
                            }
                            self.$message.success("删除成功")
                            self.$router.push({path: '/projects'})
                        })
                    });
                })
            },
            transferAlert()
            {
                let self = this;
                this.$confirm('转让给他人后，你将变为普通成员，对方变为拥有者；项目地址也会变更（重定向可快速切换项目地址），确定转让吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>
                {
                    self.selectUserDialogVisible = true
                    self.searchUsers()
                })
            },
            transferProject()
            {
                let self = this
                let param = new FormData()
                param.append('toUid', this.selectedUid)
                param.append('projectId', this.pid)
                this.$axios.post('/api/transfer', param).then(function (response)
                {
                    if(MtaH5)
                        MtaH5.clickStat("transfer")
                    if (response.data.success === false)
                    {
                        return;
                    }
                    self.selectUserDialogVisible = false;
                    self.$message.success("转让成功")
                    self.$router.push({path: '/projects'})
                })
            },
        },
        created()
        {
            this.initCos()
            var projectInfo = this.$store.state.currProjectInfo;
            this.formData._id = projectInfo._id;
            this.formData.name = projectInfo.name;
            this.formData.desc = projectInfo.desc;
            this.formData.imgURL = projectInfo.imgURL;
            this.formData.forceMsg = projectInfo.forceMsg ? projectInfo.forceMsg : '0';
        },
    }
</script>

<style scoped>
    .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        font-size: 28px;
        color: #8c939d;
        width: 151px;
        height: 82px;
        line-height: 82px;
        text-align: center;
    }

    .avatar-uploader-icon:hover {
        border-color: #409EFF;
    }

    span{
        color: grey;
        font-size: 14px;
    }
</style>
