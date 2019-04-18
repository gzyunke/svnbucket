<template>
    <div>
        <el-card class="box-card" style="width:600px; height:600px; margin-top: -15px">
            <el-form label-width="20px" label-position="top">
                <el-form-item label="">
                    <!--<el-upload-->
                            <!--style="float: left;margin-right:15px"-->
                            <!--action=""-->
                            <!--:show-file-list="false"-->
                            <!--:on-success="onUploadSuccess"-->
                            <!--:before-upload="beforeUpload"-->
                            <!--:http-request="upload2Cos">-->
                        <!--<img :src="fullHeadURL" style="border-radius:200px;width:150px;height:150px">-->
                    <!--</el-upload>-->
                    <div class="user-head">
                        <div class="img-wrapper" style="position: relative; border-radius: 50%; width: 150px; height: 150px; overflow: hidden; cursor: pointer;" @click="picUpload">
                            <div class="img-cover"><el-button type="info" plain size="small">更换头像</el-button></div>
                            <img v-if="head" :src="imgFullURL(head)" style="border-radius: 50%; width: 150px; height: 150px;">
                            <i v-else class="el-icon-plus avatar-uploader-icon" style="display: block; width: 14px; margin: 49px auto;"></i>
                        </div>
                        <input type="file" ref="uploadPic" style="display: none;" @change="openPicCutDialog($event)">
                        <!--<el-button type="primary" size="small" style="position: absolute; top: 30px; right: 192px;" @click="picUpload">上传封面</el-button>-->
                    </div>
                </el-form-item>
                <el-form-item label="">
                    <el-popover
                            ref="popover1"
                            placement="right"
                            title=""
                            width="300"
                            trigger="click"
                            :content="$store.state.userData.changeUsernameCount >= 1 ? '只能修改一次用户名' : '修改用户名将导致你所有项目 SVN 地址变化，请谨慎操作（重定向可快速切换项目地址）。只能修改一次'">
                    </el-popover>
                    <el-input placeholder="请输入内容" :disabled="disableChangeUsername" v-model="username" style="width: 400px;" v-popover:popover1>
                        <template slot="prepend">svn://{{$store.state.userData.webRoot}}/</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="name" :maxlength="10" style="width: 400px;">
                        <template slot="prepend">你的名字</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-popover
                            ref="popover2"
                            placement="right"
                            title=""
                            width="300"
                            trigger="click"
                            content="用来密码找回，请务必填写常用邮箱，避免无法再找回密码">
                    </el-popover>
                    <el-input v-model="email" style="width: 400px;" v-popover:popover2>
                        <template slot="prepend">电子邮箱</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="mobile" :minlength="11" :maxlength="11" style="width: 400px;">
                        <template slot="prepend">手机号码</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="textSign" :maxlength="100" style="width: 400px;">
                        <template slot="prepend">个性签名</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveUserInfo" >保存修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>

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
    </div>

</template>

<script>
    import tools from '../../assets/js/tools'
    export default {
        data(){
            return {
                head:'',
                username: '',
                name:'',
                email:'',
                mobile:'',
                textSign:'1',
                fileName:'',
                cosFullPath:'',
                visible: {
                    picCutDialog: false,
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
                    fixedNumber: [1, 1]
                },
            }
        },
        computed:
        {
            fullHeadURL()
            {
                // return tools.CDN_ROOT + "/head/" + this.head + "?imageView2/5/w/150";
                return tools.imgFullPath(this.head, 'head', 5, 150)
            },
            disableChangeUsername()
            {
                return this.$store.state.userData.changeUsernameCount >= 1
            }
        },
        methods:{
            imgFullURL(url) {
                return tools.imgFullPath(url, 'head', 5, 70)
                // return tools.CDN_ROOT + "/cover/" + url
                // + "?imageView2/1/w/258/h/129";
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
            openPicCutDialog(e) {
                this.uploadImg(e, 2);
                // console.log(e);
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
            dataURL2File(dataURL, filename) {//将base64转换为文件
                var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type:mime});
            },
            saveUserInfo()
            {
                let self = this;
                let params = new FormData();
                params.append('username', this.username ? this.username : '')
                params.append('name', this.name ? this.name : '')
                params.append('head', this.head)
                params.append('email', this.email ? this.email : '')
                params.append('mobile', this.mobile ? this.mobile : '')
                params.append('textSign', this.textSign ? this.textSign : '')
                this.$axios.post('/api/saveUser', params).then((res) =>
                {
                    if (res.data.success === false)
                    {
                        return
                    }
                    if(res.data.msg)
                    {
                        if(MtaH5)
                            MtaH5.clickStat("changeusername")
                        self.$notify({
                            title: '提示',
                            type: 'success',
                            message: res.data.msg,
                            duration: 30000
                        });
                    }
                    else
                    {
                        self.$message.success("保存成功")
                    }
                    self.getUserInfo()
                })
            },
            getUserInfo()
            {
                let self = this;
                this.$axios.post('/api/userInfo').then((res) =>
                {
                    if (res.data.success === false)
                    {
                        return
                    }
                    self.$store.commit('updateUserInfo', res.data)
                })
            },
            beforeUpload(file)
            {
                const size = file.size / 1024 / 1024;
                console.log('type:' + file.type + ', size:' + size);

                if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                {
                    this.$message.error('只能上传jpg和png格式的图片!');
                    return false
                }

                if (size > 2)
                {
                    this.$message.error('上传文件大小不能超过2MB!');
                    return false
                }
                return true;
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
            upload2Cos(data)
            {
                console.log(data);
                let self = this;
                var successCallBack = function (result)
                {
                    console.log("upload to cos ok:" + JSON.stringify(result));
                    self.head = self.fileName;
                };

                var errorCallBack = function (result)
                {
                    console.log("upload to cos error:" + result);
                };

                var progressCallBack = function (curr)
                {
                    console.log('uploading... curr progress is ' + curr);
                };
                this.fileName = this.$store.state.userData.username + "_" + data.name;
                this.cosFullPath = '/head/' + this.fileName;
                console.log('file name:' + data.name);
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
        },
        mounted()
        {
            this.name = this.$store.state.userData.name;
            this.head = this.$store.state.userData.head;
            this.email = this.$store.state.userData.email;
            this.mobile = this.$store.state.userData.mobile;
            this.textSign = this.$store.state.userData.textSign;
            this.username = this.$store.state.userData.username;
            this.initCos();
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
    .img-wrapper:hover .img-cover {
        display: block;
    }
    .img-cover {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 150px;
        height: 150px;
        line-height: 150px;
        color: #fbfbfb;
        font-size: 20px;
        text-align: center;
        background: rgba(0, 0, 0, .2);
    }
</style>
