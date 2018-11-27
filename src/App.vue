<template>
    <div id="app" style="width: 100%;">
        <router-view></router-view>

        <el-dialog title="微信小程序" :visible.sync="$store.state.wxminiDialogVisible" width="450px">
            <div style="position: relative">
                <img src="./assets/img/wxmini.jpg" class="wxminiImg">
                <div style="font-size: 14px; text-align: center">微信扫码，随时随地管理你的项目</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        methods: {
            statsConfig()
            {
                var _mtac = {"performanceMonitor":1,"senseQuery":1};
                (function() {
                    var mta = document.createElement("script");
                    mta.src = "https://pingjs.qq.com/h5/stats.js?v2.0.4";
                    mta.setAttribute("name", "MTAH5");
                    mta.setAttribute("sid", "500553641");
                    mta.setAttribute("cid", "500590386");
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(mta, s);
                })();
            },
        },
        mounted()
        {
            this.statsConfig(0)
        }
    }
</script>

<style>
    @import "./assets/css/main.css";

    .wxminiImg
    {
        width: 300px;
        height: 300px;
        position: relative;
        left: 46px;
        top: -15px;
    }
</style>

