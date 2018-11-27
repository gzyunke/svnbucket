<template>
    <div id="indexDownloadBox" class="indexDownloadBox">
        <h2 class="downloadTitle">让协作走出办公室</h2>
        <span class="downloadIntroduce">
		现在你不仅可以在网页端登录，也可以通过智能手机进行团队协作。
	</span>
        <br/>

        <span class="downloadIntroduce spanTop">
		我们同样保持最快的更新，让你无论何时何地都可以玩完整的使用SVNBuckets。
	</span>

        <div class="downloadType">
            <div class="downDesktop">
                <p class="typeTitle">桌面版</p>
                <img class="desktopImg" src="../../assets/img/downDesktop.svg">
                <div class="desktopBox">
                    <a href="javascript:" class="desktopUrl">OS X</a>
                    <a href="javascript:" class="desktopUrl windowsUrl">windows</a>
                </div>
            </div>

            <div class="downDesktop">
                <p class="typeTitle">iOS版</p>
                <img class="typeTitle qrCode" src="../../assets/img/qrcode.png">
                <a href="javascript:" class="mobileUrl">App Store 下载</a>
            </div>

            <div class="downDesktop">
                <p class="typeTitle">android版</p>
                <img class="typeTitle qrCode" src="../../assets/img/qrcode.png">
                <a href="javascript:" class="mobileUrl">直接下载</a>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: 'Download',
    }
</script>