<template>
    <div class="aboutUsBox">
        <div class="aboutUsHead">
            <img class="aboutSpaceman" src="../../assets/img/about-spaceman.png">

            <img class="aboutBigStart" src="../../assets/img/about-big-start.png">

            <img class="aboutLittleStart" src="../../assets/img/about-little-start.png">

            <h3 class="aboutHeadTitle">我们的使命是让开发更简单。</h3>

        </div>
        <div class="aboutMain">
            <h2 class="aboutTitle">关于我们</h2>
            <span class="aboutSpan">
                <!--<p>SVNBucket是一个代码托管仓库。属于<a target="_blank" href="http://gzyunke.cn/index" style="color: #1891F0;">广州云科信息科技有限公司</a>的产品之一</p>-->
                <p>SVNBucket 由广州云科信息科技有限公司开发和运营</p>
                <p>广州云科，致力于为企业和个人不断提供让工作生活更便捷的软件。</p>
                <p>公司成员来自国内知名IT企业的核心开发团队、多年游戏开发经验</p>
                <p>曾开发过用户量过亿的大型手游，技术实力有保障。</p>
            </span>

        </div>

        <div class="contactUs">
            <h2 class="aboutTitle">联系我们</h2>
            <div class="addressBox">

                <div class="address">
                    <h4 class="guangzhou">广州云科</h4>

                    <span class="addressSpan">广州市番禺区大石街南大路54号金达创意园</span>

                    <p class="addressSpan" style="margin-top: 15px;">Email：gzyunke@qq.com</p>
                    <!--<p class="addressSpan" style="margin-top: 15px;">电话：020-82369527</p>-->
                    <p class="addressSpan" style="">
                        <!--<span style="padding-bottom:8px;">QQ客服：</span>-->
                        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=381301088&site=qq&menu=yes">
                            <img border="0" src="http://wpa.qq.com/pa?p=2:381301088:51" alt="联系客服" title="联系客服" style=""/>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'About',
    }
</script>

<style>
  @media screen and (max-width: 1124px) {
    .aboutUsBox {
      width: 1124px;
    }
  }
</style>
