<template>
    <div>
        <el-form :model="formData" label-width="80px" label-position="top">
            <el-form-item label="项目封面">
                <!--<el-upload-->
                        <!--style="float: left;margin-right:15px"-->
                        <!--action=""-->
                        <!--:show-file-list="false"-->
                        <!--:on-success="onUploadSuccess"-->
                        <!--:http-request="upload2Cos">-->
                    <!--<img v-if="formData.imgURL" :src="imgFullURL(formData.imgURL)" style="border-radius:5px; width: 258px; height: 129px">-->
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                <!--</el-upload>-->
                <div class="project-cover" style="position: relative;">
                    <div class="img-wrapper" style="position: relative; width: 258px; height: 129px; cursor: pointer;" @click="picUpload">
                        <div class="img-cover" style="position: absolute; top: 45px;right: -100px;"><el-button type="primary" size="small" plain>更换封面</el-button></div>
                        <img v-if="formData.imgURL" :src="imgFullURL(formData.imgURL)" style="width: 258px; height: 129px; border-radius: 5px">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="display: block; width: 14px; margin: 49px auto;"></i>
                    </div>
                    <input type="file" ref="uploadPic" style="display: none;" @change="openPicCutDialog($event)">
                    <el-button type="primary" size="small" plain @click.stop="visible.defaultCoverDialog = true" style="position: absolute; bottom: 0; left: 278px;">默认封面</el-button>
                </div>
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

        <el-dialog title="图片裁剪" class="pic-cut-dialog" :visible.sync="visible.picCutDialog" width="800px" @opened="changePic">
            <div style="width: 100%; height: 500px;">
                <vueCropper
                        ref="cropper2"
                        :img="example2.img"
                        :outputSize="example2.size"
                        :outputType="example2.outputType"
                        :info="example2.info"
                        :canScale="example2.canScale"
                        :autoCrop="example2.autoCrop"
                        :autoCropWidth="example2.autoCropWidth"
                        :autoCropHeight="example2.autoCropHeight"
                        :fixed="example2.fixed"
                        :fixedNumber="example2.fixedNumber"
                ></vueCropper>
            </div>
            <input type="file" ref="changePic" style="display: none;" @change="uploadImg($event, 2)">
            <div style="margin-top: 10px;">
                <el-button type="primary" plain @click="picCut">确定</el-button>
                <el-button type="primary" plain @click="changePic">更换图片</el-button>
            </div>
        </el-dialog>

        <el-dialog title="默认封面" class="default-cover-dialog" :visible.sync="visible.defaultCoverDialog" width="700px" >
            <div style="display: flex; justify-content: space-evenly; flex-wrap: wrap">
                <div class="default-cover-item" v-for="i in 9" :key="i" style="margin-bottom: 8px;" @click="chooseCover(i)">
                    <img :src="'https://svnbucket-1255322048.image.myqcloud.com/cover/'+ i +'.png?imageView2/1/w/258/h/129'" style="width: 200px; height: calc(200/258*129px); border-radius: 5px">
                </div>
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
                visible: {
                    picCutDialog: false,
                    defaultCoverDialog: false,
                },
                example2: {
                    img: '',
                    info: true,
                    size: 1,
                    outputType: 'png',
                    canScale: true,
                    autoCrop: true,
                    // 只有自动截图开启 宽度高度才生效
                    autoCropWidth: 300 ,
                    autoCropHeight: 250 ,
                    // 开启宽度和高度比例
                    fixed: true,
                    fixedNumber: [258, 129]
                },
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
            chooseCover(i) {
                this.formData.imgURL = 'https://svnbucket-1255322048.image.myqcloud.com/cover/'+ i +'.png?imageView2/1/w/258/h/129';
                this.visible.defaultCoverDialog = false;
            },
            uploadImg (e, num) {
                let max_size = 5 * 1024;
                //上传图片
                // this.option.img
                var file = e.target.files[0];
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    this.$message.error('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
                    return false
                }else if (file.size > max_size * 1024) {
                    this.$message.error("图片大小不能超过5M");
                    e.target.value = "";
                    return false;
                }

                this.visible.picCutDialog = true;

                var reader = new FileReader();
                reader.onload = (e) => {
                    let data;
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result;
                    }
                    if (num === 1) {
                        this.option.img = data;
                    } else if (num === 2) {
                        this.example2.img = data;
                    }
                };
                // 转化为base64
                // reader.readAsDataURL(file)
                // 转化为blob
                reader.readAsArrayBuffer(file);
                e.target.value = '';
            },
            openPicCutDialog(e) {
                this.uploadImg(e, 2);
                // console.log(e);
            },
            picUpload() {
                return this.$refs.uploadPic.click();
            },
            picCut() {
                // console.log(this.$refs.cropper2);
                this.$refs.cropper2.getCropData((data) => {
                    // console.log(data);
                    let file = this.dataURL2File(data, 'new' + Math.ceil(Math.random()*20181026) );
                    this.upload2Cos(file);
                    this.visible.picCutDialog = false;
                })
            },
            changePic() {
                this.$refs.changePic.click();
            },
            dataURL2File(dataURL, filename) {//将base64转换为文件
                var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type:mime});up
            },



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
                console.log(data.name);
                this.fileName = Math.floor(new Date().getTime() / 1000) + "_" + data.name;
                this.cosFullPath = '/cover/' + this.fileName;
                console.log('file name:' + this.cosFullPath);
                this.cos.uploadFile(successCallBack, errorCallBack, progressCallBack, tools.COS_BUCKET_NAME, this.cosFullPath, data, 0);
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
