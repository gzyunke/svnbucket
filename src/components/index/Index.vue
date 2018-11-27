<template>
    <div style="width: 100%!important;">
        <div id="indexBox">
            <div class="imgBox">
                <img class="bigEddy" src="../../assets/img/big-eddy.png">

                <img class="bigStart" src="../../assets/img/big-start.png">

                <img class="spaceman" src="../../assets/img/spaceman.png">

                <img class="littleStart" src="../../assets/img/little-start.png">

                <img class="airship" src="../../assets/img/airship.png">

                <img class="littleEddy" src="../../assets/img/little-eddy.png">

                <!--<img class="lotsLittleStart" src="../../assets/img/lots-little-start.png">-->

                <img class="house" src="../../assets/img/house.png">

                <div class="showBox">
                    <h2>让开发更简单</h2>
                    <div class="showSpan">SVNBucket是一个SVN代码托管站，你也可以叫他SVN桶或码桶。我们喜欢SVN的简单和方便，还有它更好的权限控制。
                        这里你可以创建无限的私有项目；便捷的进行项目成员管理；分配不同目录的权限；配置钩子，让工作自动化起来；还有更多…</div>
                    <router-link to="/regist" style="position: relative; left:480px">
                        <el-button type="primary">马上注册体验</el-button>
                    </router-link>
                </div>

            </div>
            <div class="mainBox">
                <div class="introduceBackgroud">
                    <div class="introduceBox boxWidth">
                        <h2>功能特色</h2>
                        <div class="singleIntro">
                            <img src="../../assets/img/folder.svg">
                            <h3>不限私有项目</h3>
                            <div class="clearBoth"></div>
                            <span>不限私有项目，不限项目成员</span>
                        </div>
                        <div class="singleIntro introRight">
                            <img src="../../assets/img/folder.svg">
                            <h3>目录权限</h3>
                            <div class="clearBoth"></div>
                            <span>目录级别的权限控制，轻松掌控每个人的读写权限</span>
                        </div>
                        <div class="singleIntro ">
                            <img src="../../assets/img/member.svg">
                            <h3>项目成员</h3>
                            <div class="clearBoth"></div>
                            <span>您可以为每个项目添加任意个数的成员，合作开发更简单</span>
                        </div>
                        <div class="singleIntro introRight">
                            <img src="../../assets/img/code-manage.svg">
                            <h3>代码管理</h3>
                            <div class="clearBoth"></div>
                            <span>在线预览代码，提交记录，变更列表，diff查看</span>
                        </div>
                        <div class="singleIntro ">
                            <img src="../../assets/img/hook.svg">
                            <h3>钩子</h3>
                            <div class="clearBoth"></div>
                            <span>自动更新、自动发布版本，钩子可以帮你简化工作</span>
                        </div>
                        <div class="singleIntro introRight">
                            <img src="../../assets/img/project.svg">
                            <h3>安全稳定</h3>
                            <div class="clearBoth"></div>
                            <span>腾讯云加持，稳定不掉线；仓库多层加密，安全不泄漏</span>
                        </div>
                    </div>
                </div>

                <div class="codeManageBox boxHeight boxWidth">
                    <div class="introduceContainer">
                        <h2 class="introTitle">项目管理</h2>
                        <div class="clearBoth"></div>
                        <span class="introduce">您可以创建任意多的私有项目；把常用的项目标星置顶；顶部导航栏可以快速的进行最近项目切换；也可以直接搜索关键字快速找到自己想要的项目</span>
                    </div>
                    <img class="introduceImg" src="../../assets/img/project-introduce.png">

                </div>

                <div class="introduceBackgroud">
                    <div class="codeManageBox boxHeight boxWidth opposite">
                        <div class="introduceContainer oppositeContainer">
                            <h2 class="introTitle">项目成员</h2>
                            <div class="clearBoth"></div>
                            <span class="introduce">您可以添加任意多的成员，分配角色，让其他管理员来协助你管理日常的一些项目；还可以为不同角色的项目成员分配不同目录的权限，并且可以设置多个目录，一切尽在掌控中</span>
                        </div>
                        <img class="introduceImg oppositeImg" src="../../assets/img/member-introduce.png">

                    </div>
                </div>

                <div class="codeManageBox boxHeight boxWidth">
                    <div class="introduceContainer">
                        <h2 class="introTitle">代码管理</h2>
                        <div class="clearBoth"></div>
                        <span class="introduce">方便的进行仓库文件浏览，高亮显示代码；查看提交记录，变更文件，文件diff等</span>
                    </div>
                    <img class="introduceImg" src="../../assets/img/code-introduce.png">
                </div>

                <div class="introduceBackgroud">
                    <div class="codeManageBox boxHeight boxWidth opposite">
                        <div class="introduceContainer oppositeContainer">
                            <h2 class="introTitle">目录权限</h2>
                            <div class="clearBoth"></div>
                            <span class="introduce">每个项目组都会有不同的角色：服务端、客户端、策划等，为他们分配不同目录的权限，代码更安全</span>
                        </div>
                        <img class="introduceImg oppositeImg" src="../../assets/img/folder-introduce.png">

                    </div>
                </div>

                <div class="codeManageBox boxHeight boxWidth">
                    <div class="introduceContainer">
                        <h2 class="introTitle">钩子</h2>
                        <div class="clearBoth"></div>
                        <span class="introduce">利用钩子，可以方便的检测到每次代码的提交，利用这个做一些项目的自动化工作，比如自动发布版本，自动更新网站，节省一些日常的繁琐工作</span>
                    </div>
                    <img class="introduceImg" src="../../assets/img/hook-introduce.png">
                </div>

                <div class="introduceBackgroud heightPublicity">
                    <div class="publicityBox">
                        <h2 class="publicityBoxH2">随时随地</h2>
                        <h2>找到你享受的工作状态</h2>
                        <div class="publicityImgBox">
                            <img class="wordImg" src="../../assets/img/work-img.svg">
                            <div class="publicityeQuipment">
                                <h4>无论手机端，还是PC端都能轻松的工作</h4>
                                <div class="mobileBox" @click="$store.commit('setWxminiDialogVisible', true)">
                                    <img src="../../assets/img/mobile-phone.svg">
                                    <span class="quipmentSpan1">移动端(小程序)</span>
                                </div>
                                <div class="computerBox">
                                    <img src="../../assets/img/computer.svg" class="marginTop">
                                    <span class="quipmentSpan ">电脑端(Web)</span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>
                <a href="http://www.miibeian.gov.cn/" target="_blank" style="color: #909399;">粤ICP备17148260号-3</a>
                <span style="color: #909399;"> | </span>
                <a href="http://gzyunke.cn" target="_blank" style="color: #909399;">广州云科信息科技有限公司</a>
                <span style="color: #909399;"> | </span>
                <router-link to="/terms" style="color:#909399;" target='_blank'> 服务条款</router-link>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            getUrlParam(name)
            {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if(r != null) return decodeURI(r[2]);
                return null;
            },
        },
        mounted()
        {
            window.localStorage.setItem('ADTAG', this.getUrlParam('ADTAG'));
        }
    }
</script>

<style scoped>
  @media screen and (max-width: 1524px) {
    #indexBox {
      width: 1524px;
    }

    .house{
      width: 1524px;
    }
    /*#index{*/
      /*width: 1524px;*/
    /*}*/

  }


</style>
