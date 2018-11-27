<template>
    <div id="lefter">
        <ul>
            <li :class="[{selected: sidebarCurrentIndex === '1'}]" @click="updateSidebarIndex('1')">
                <router-link :to="'/detail/' + pid + '/source'">
                    <div :class="['detailCode',{detailCodeSelected: sidebarCurrentIndex === '1'}]">
                        <strong>源码</strong>
                    </div>
                </router-link>
            </li>
            <li style="display: none">
                <div :class="['detailWiki',{detailWikiSelected: false}]">
                    <strong>WIKI</strong>
                </div>
            </li>
            <li :class="[{selected: sidebarCurrentIndex === '3'}]" @click="updateSidebarIndex('3')">
                <router-link :to="'/detail/' + pid + '/logs'">
                    <div :class="['detailRecord',{detailRecordSelected: sidebarCurrentIndex === '3'}]">
                        <strong>提交记录</strong>
                    </div>
                </router-link>
            </li>
            <li :class="[{selected: sidebarCurrentIndex === '4'}]" @click="updateSidebarIndex('4')">
                <router-link :to="'/detail/' + pid + '/members'">
                    <div :class="['detailMember',{detailMemberSelected: sidebarCurrentIndex === '4'}]">
                        <strong>成员</strong>
                    </div>
                </router-link>
            </li>
            <li :class="[{selected: sidebarCurrentIndex === '5'}]" @click="updateSidebarIndex('5')">
                <router-link :to="'/detail/' + pid + '/hooks'">
                    <div :class="['detailHook',{detailHookSelected: sidebarCurrentIndex === '5'}]">
                        <strong>钩子</strong>
                    </div>
                </router-link>
            </li>
            <li style="display: none" :class="[{selected: sidebarCurrentIndex === '6'}]"
                @click="updateSidebarIndex('6')">
                <div :class="['detailDownload',{detailDownloadSelected: sidebarCurrentIndex === '6'}]">
                    <strong>下载</strong>
                </div>
            </li>
            <li :class="[{selected: sidebarCurrentIndex === '7'}]" @click="updateSidebarIndex('7')">
                <router-link :to="'/detail/' + pid + '/setting'">
                    <div :class="['detailSetting',{detailSettingSelected: sidebarCurrentIndex === '7'}]">
                        <strong>设置</strong>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: 'Sidebar',
        props: {
            pid: {
                type: String,
                default: '0'
            },
        },
        data()
        {
            return {}
        },
        computed:
            {
                ...mapState([
                    'sidebarCurrentIndex'
                ]),
            },
        methods: {
            ...mapMutations([
                'updateCodes',
                'updateSidebarIndex'
            ]),

        },
        watch: {
            pid: function (newPid)
            {
                this.updateSidebarIndex('1')
            }
        },
        destroyed()
        {
            this.updateSidebarIndex('1')
        }


    }
</script>

<style scoped>
    #lefter {
        height: 884px;
        width: 190px;
        background: #F8F8F8;
        position: fixed;
        left: 0;
        top: 65px;
    }

    #lefter ul {
        margin-top: 5px;
        margin-left: 5px;
    }

    #lefter ul li {
        display: block;
        height: 42px;
        width: 180px;
        font-size: 14px;
        color: #4F657B;
        cursor: pointer;
        letter-spacing: 0;
    }

    #lefter ul li div strong {
        font-size: 14px;
        position: relative;
        top: 11px;
        left: 45px;
        color: #4F657B;
        letter-spacing: 0;
        font-weight: 400;
    }

    #lefter ul li:hover {
        transition: .1s;
        border-radius: 2px;
        background: #ECEDF0;

    }

    #lefter ul li:hover div strong {
        color: #1891F0;
    }

    #lefter ul li div {
        height: 42px;
        width: 180px;
    }

    #lefter ul li.selected {
        background-color: #ECEDF0;
    }

    #lefter ul li.selected strong {
        color: #1891F0;
    }

    .detailCode {
        background: url("../assets/img/detail-code-N.svg") 24px 13px no-repeat;
    }

    .detailCodeSelected {
        background: url("../assets/img/detail-code-Y.svg") 24px 13px no-repeat;
    }

    #lefter ul li:hover .detailCode {
        background: url("../assets/img/detail-code-Y.svg") 24px 13px no-repeat !important;
    }

    .detailRecord {
        background: url("../assets/img/detail-record-N.svg") 24px 13px no-repeat;
    }

    .detailRecordSelected {
        background: url("../assets/img/detail-record-Y.svg") 24px 13px no-repeat;
    }

    #lefter ul li:hover .detailRecord {
        background: url("../assets/img/detail-record-Y.svg") 24px 13px no-repeat !important;
    }

    .detailMember {
        background: url("../assets/img/detail-member-N.svg") 24px 13px no-repeat;
    }

    .detailMemberSelected {
        background: url("../assets/img/detail-member-Y.svg") 24px 13px no-repeat;
    }

    #lefter ul li:hover .detailMember {
        background: url("../assets/img/detail-member-Y.svg") 24px 13px no-repeat !important;
    }

    .detailHook {
        background: url("../assets/img/detail-hook-N.svg") 24px 13px no-repeat;
    }

    .detailHookSelected {
        background: url("../assets/img/detail-hook-Y.svg") 24px 13px no-repeat;
    }

    #lefter ul li:hover .detailHook {
        background: url("../assets/img/detail-hook-Y.svg") 24px 13px no-repeat !important;
    }

    .detailSetting {
        background: url("../assets/img/detail-setting-N.svg") 24px 13px no-repeat;
    }

    .detailSettingSelected {
        background: url("../assets/img/detail-setting-Y.svg") 24px 13px no-repeat;
    }

    #lefter ul li:hover .detailSetting {
        background: url("../assets/img/detail-setting-Y.svg") 24px 13px no-repeat !important;
    }


</style>
