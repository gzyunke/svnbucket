<template>
    <div>
        <el-card class="box-card" style="width:600px; height:350px; margin-top: -15px" width="100%">
            <el-form label-position="left" class="demo-table-expand" width="100%">
                <el-form-item label="账户类型:">
                    <span :class="[{vipColor:$store.state.userData.accountType > 0}]">{{accountTypeName}}</span>
                </el-form-item>
                <el-form-item label="失效日期:" v-if="$store.state.userData.accountType > 0">
                    <span :class="[{redText:isExpired}]">
                        {{formatData($store.state.userData.expireAt)}}
                    </span>
                </el-form-item>
                <el-form-item label="项目成员:">
                    <span>无限制</span>
                </el-form-item>
                <el-form-item label="项目个数:">
                    <span>无限制</span>
                </el-form-item>
                <el-form-item label="仓库空间:">
                    <span :class="[{redText:$store.state.userData.reposSize >= $store.state.userData.reposMaxSize}]">
                        {{formateSize($store.state.userData.reposSize) }} / {{formateSize($store.state.userData.reposMaxSize)}}
                    </span>
                </el-form-item>
                <el-form-item label="" style="margin-top: 20px">
                    <template v-if="isExpired">
                        <el-tooltip content="助力我们更好的发展" placement="right">
                            <el-button type="primary" @click="buy">
                                购买空间
                            </el-button>
                        </el-tooltip>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="extendTime">续费</el-button>
                        <el-button type="primary" @click="upgrade">升级</el-button>
                    </template>
                </el-form-item>
                <div style="color: #909399; font-size: 12px; margin-top: 20px"><i class="el-icon-info">
                    </i>  我们提供企业定制服务和私有部署，有需要欢迎联系我们
                </div>
            </el-form>
        </el-card>

        <el-dialog title="购买" :visible.sync="dialogVisible" width="500px">
            <el-form label-width="60px" label-position="top">
                <el-form-item label="帐号类型" v-if="buyType !== 1">
                    <el-select v-model="accountType" placeholder="请选择" style="width: 450px;">
                        <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :disabled="isDisable(item.value)"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" v-if="buyType !== 2">
                    <el-radio-group v-model="month" size="medium">
                        <el-radio-button label="1">1月</el-radio-button>
                        <el-radio-button label="2">2月</el-radio-button>
                        <el-radio-button label="3">3月</el-radio-button>
                        <el-radio-button label="6">6月</el-radio-button>
                        <el-radio-button label="12">1年</el-radio-button>
                        <el-radio-button label="24">2年</el-radio-button>
                        <el-radio-button label="36">3年</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item >
                    <span>总额：{{totalMoney}}元  <span style="color: red">{{discountName}}</span></span>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="requestBuy">微信购买</el-button>
            </div>
        </el-dialog>

        <el-dialog title="微信扫码支付" :visible.sync="buyDialogVisible" width="360px" align="center" @close="onCloseQRCode">
            <div id="qrcode"></div>
            <span style="margin-top: 30px; color: #67C23A; font-weight: bold">微信扫一扫付款</span>
        </el-dialog>
    </div>

</template>

<script>
    import tools from '../../assets/js/tools'
    export default {
        data()
        {
            return {
                dialogVisible: false,
                buyDialogVisible:false,
                // 0购买，1续费，2升级
                buyType:0,
                typeOptions: [],
                discountConfig: {},
                accountTypeNameDict:{},
                moneyDict:{},
                month: 12,
                orderid:'',
                timerId:false,
                accountType: '',
                maxAccountType:'',
            }
        },
        mounted()
        {
            if(MtaH5)
                MtaH5.clickStat('goumailiucheng',{'onuserstatepage':'true'});
            this.getShopConfig()
        },
        computed:{
            totalMoney()
            {
                let discount = this.discountConfig[this.month] ? this.discountConfig[this.month] : 1;
                let money = 0;
                // 0购买，1续费，2升级
                if(this.buyType === 0)
                {
                    money = this.moneyDict[this.accountType] * this.month * discount
                }
                else if(this.buyType === 1)
                {
                    money = this.moneyDict[this.$store.state.userData.accountType] * this.month * discount
                }
                else if(this.buyType === 2)
                {
                    let now = new Date().getTime() / 1000;
                    let remainSeconds = this.$store.state.userData.expireAt - now
                    let oldMonthPrice = this.moneyDict[this.$store.state.userData.accountType]
                    let newMonthPrice = this.moneyDict[this.accountType]
                    money = ((newMonthPrice - oldMonthPrice) / (86400 * 30)) * remainSeconds
                }
                return tools.round(money, 2)
            },
            discountName()
            {
                let discount = this.discountConfig[this.month] ? this.discountConfig[this.month] : 1
                return discount !== 1 ? '(' + Math.round(discount*100)/10 + '折)' : ''
            },
            accountTypeName()
            {
                let accountType = this.$store.state.userData.accountType
                return this.accountTypeNameDict[accountType]
            },
            isExpired()
            {
                return new Date().getTime() / 1000 >= this.$store.state.userData.expireAt;
            },
        },
        methods: {
            formatData(time)
            {
                return tools.formatDate(time);
            },
            formateSize(size)
            {
                if(!size)
                    return 0 + ' M'
                return size > 1024 ? tools.round(size / 1024, 2) + ' G' : size + ' M'
            },
            isDisable(value)
            {
                if(this.buyType !== 2)
                    return value < this.$store.state.userData.accountType
                else
                    return value <= this.$store.state.userData.accountType
            },
            upgrade()
            {
                if(this.$store.state.userData.accountType >= this.maxAccountType)
                {
                    this.$alert('你已经是最高等级了，如需定制服务，请联系我们：gzyunke@qq.com', '提示', {
                        confirmButtonText: '确定',
                    });
                    return
                }
                this.buyType = 2
                this.month = 0

                let nextAccountType = this.$store.state.userData.accountType;
                for(let i=0; i < this.typeOptions.length; i++)
                {
                    if(this.typeOptions[i].value > nextAccountType)
                    {
                        nextAccountType = this.typeOptions[i].value
                        break;
                    }
                }

                this.accountType = nextAccountType + ''
                this.dialogVisible = true
                if(MtaH5)
                    MtaH5.clickStat('goumailiucheng',{'clickbuy':'true'});
            },
            extendTime()
            {
                this.buyType = 1
                this.month = 12
                this.accountType = this.$store.state.userData.accountType + ''
                this.dialogVisible = true
                if(MtaH5)
                    MtaH5.clickStat('goumailiucheng',{'clickbuy':'true'});
            },
            buy()
            {
                this.accountType = (this.$store.state.userData.accountType + 1) + ''
                this.month = 12
                this.buyType = 0
                this.dialogVisible = true
                if(MtaH5)
                    MtaH5.clickStat('goumailiucheng',{'clickbuy':'true'});
            },
            getShopConfig()
            {
                let self = this
                this.typeOptions = []
                this.$axios.post('/api/shopConfig').then(function (response)
                {
                    self.discountConfig = response.data.discountConfig
                    let accountConfig = response.data.accountConfig
                    for (let key in accountConfig)
                    {
                        let config = accountConfig[key];
                        self.moneyDict[key] = config['money'];
                        self.$set(self.accountTypeNameDict, key, config['name']);
                        if (config['money'] > 0)
                        {
                            self.maxAccountType = key;
                            self.typeOptions.push({
                                label: config['name'] + '，空间：' + config['reposMaxSize'] / 1024 + 'G，' + config['money'] + '元/月',
                                value: key
                            })
                        }
                    }
                })
            },
            requestBuy()
            {
                let self = this;
                let params = new FormData();
                params.append('accountType', this.accountType)
                params.append('month', this.month)
                params.append('buyType', this.buyType)
                params.append('totalMoney', this.totalMoney)
                this.$axios.post('/api/createOrder', params).then((res) =>
                {
                    if (res.data.success === false)
                    {
                        return
                    }
                    self.orderid = res.data.orderid
                    self.buyDialogVisible = true
                    self.genQRCode(res.data.code_url)
                    self.checkPayResult()

                })
                if(MtaH5)
                    MtaH5.clickStat('goumailiucheng',{'clickwxbuy':'true'});
            },
            checkPayResult()
            {
                let self = this;
                self.timerId = window.setInterval(function()
                {
                    let params = new FormData();
                    params.append('orderid', self.orderid)
                    self.$axios.post('/api/checkPayResult', params).then((res) =>
                    {
                        if (res.data.success === false)
                            return
                        if(res.data.isComplete)
                        {
                            if(self.timerId)
                            {
                                window.clearInterval(self.timerId);
                                self.timerId = null
                            }
                            self.$message.success("购买成功")
                            self.dialogVisible = false
                            self.buyDialogVisible = false
                            self.getUserInfo()
                            if(MtaH5)
                                MtaH5.clickStat('goumailiucheng',{'buysuccess':'true'});
                        }
                    })

                }, 1000);
                console.log('timer id:' + self.timerId)
            },
            onCloseQRCode()
            {
                console.log('on close qrcode dialog, timer id:' + this.timerId)
                if(this.timerId)
                {
                    window.clearInterval(this.timerId);
                    this.timerId = null
                }
            },
            genQRCode(url)
            {
                let self = this
                let addTime = setInterval(function()
                {
                    clearInterval(addTime);
                    document.getElementById('qrcode').innerHTML = "";
                    new QRCode(document.getElementById("qrcode"), {
                        text: url,
                        width: 256,
                        height: 256,
                        correctLevel: QRCode.CorrectLevel.H
                    });

                }, 200);

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
            }
        },
    }

</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #EBEEF5;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .redText
    {
        color:#F56C6C;
    }
    .vipColor
    {
        color:#F56C6C;
        font-size: 20px;
        font-weight: bold;
    }
</style>
