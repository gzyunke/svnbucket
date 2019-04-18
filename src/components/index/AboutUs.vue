<template>
    <div class="about-container">
        <div class="banner">
            <div class="banner-bg">
                <img class="spaceman" src="../../assets/img/about-spaceman.png">
                <img class="big-start" src="../../assets/img/about-big-start.png">
                <img class="little-start" src="../../assets/img/about-little-start.png">
            </div>
            <p class="banner-title">我们的使命是使开发更好。</p>
        </div>
        
        <div class="section section-about">
            <p class="section-title">关于我们</p>
            <p class="section-desc">SVNBucket 由广州云科信息科技有限公司开发和运营</p>
            <p class="section-desc">广州云科，致力于为企业和个人不断提供让工作生活更便捷的软件</p>
            <p class="section-desc">公司成员来自国内知名IT企业的核心开发团队、有多年游戏开发经验</p>
            <p class="section-desc">曾开发过用户量过亿的大型手游，技术实力有保障</p>
        </div>

        <div class="section section-contact">
            <p class="section-title">联系我们</p>
            <div class="section-content">
                <div class="content-main">
                    <p class="content-title">广州云科</p>
                    <p>广州市番禺区</p>
                    <p>Email：gzyunke@qq.com</p>
                    <p>
                        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=381301088&site=qq&menu=yes">
                            <img border="0" src="http://wpa.qq.com/pa?p=2:381301088:51" alt="联系客服" title="联系客服" style=""/>
                        </a>
                    </p>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="wrapper">
                <a href="http://www.miibeian.gov.cn/" target="_blank" style="color: #909399;">粤ICP备17148260号-3</a>
                <span style="color: #909399;"> | </span>
                <a href="http://gzyunke.cn" target="_blank" style="color: #909399;">广州云科信息科技有限公司</a>
                <span style="color: #909399;"> | </span>
                <router-link to="/terms" style="color:#909399;" target='_blank'> 服务条款</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AboutUs"
    }
</script>

<style scoped>
    .about-container {
        min-width: 1200px;
    }
    .banner {
        position: relative;
        height: 460px;
        background: #376999;
    }
    .banner-bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
    }
    .banner-bg img {
        position: absolute;
    }
    .spaceman {
        width: 321px;
        top: 145px;
        right: 465px;
    }
    .big-start {
        width: 500px;
        top: 230px;
        right: 87px;
    }
    .little-start {
        width: 104px;
        top: 137px;
        right: 84px;
    }
    .banner-title {
        position: relative;
        z-index: 1;
        padding: 215px 0 0 73px;
        font-size: 40px;
        color: #fff;
        line-height: 56px;
        text-shadow: 0 0 10px #376999;
    }

    .section {
        padding: 60px 0 100px;
        text-align: center;
        color: #474747;
    }
    .section-about {
        background: #fafafa;
    }
    .section-title {
        margin-bottom: 60px;
        font-size: 36px;
        line-height: 50px;
    }
    .section-desc {
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 26px;
    }

    .section-content {
        position: relative;
        margin: 0 auto;
        width: 980px;
        height: 426px;
        text-align: left;
        background: url("../../assets/img/map.png") no-repeat;
    }
    .content-main {
        position: absolute;
        top: 84px;
        left: 415px;
        box-sizing: border-box;
        padding: 40px 30px;
        width: 380px;
        height: 220px;
        line-height: 22px;
        font-size: 16px;
        color: #474747;
        background: rgba(255, 255, 255, .8);
    }
    .content-main p {
        margin-bottom: 10px;
    }
    .content-title {
        margin-bottom: 20px;
        font-size: 28px;
        line-height: 40px;
    }


    .footer {
        padding: 10px 0;
        text-align: center;
    }
</style>