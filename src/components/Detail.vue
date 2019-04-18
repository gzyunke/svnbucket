<template>
    <div id="detail">
        <el-container>
            <el-aside width="170px">
                <v-sidebar :pid="pid"/>
            </el-aside>
            <el-main style="width:100px; margin: -15px 0 0 0">
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Sidebar from './Sidebar.vue'

    export default {
        props:['pid'],
        data()
        {
            return {
                info: {}
            }
        },
        components:
        {
            'v-sidebar': Sidebar,
        },
        methods:
        {
            getDetailInfo()
            {
                let self = this
                let param = new FormData()
                param.append('projectId', this.pid)

                this.$axios.post('/api/projectDetail', param).then(function (response)
                {
                    if (response.data.success === false)
                    {
                        console.log(response.data.msg)
                        return
                    }

                    if (response.data)
                    {
                        self.$store.commit('updateProjectInfo', response.data)
                    }

                })
            }
        },
        created()
        {
            this.getDetailInfo()
        },
        destroyed()
        {
            this.$store.commit('updateProjectInfo', {})
        },
        watch: {
            pid: function (newPid)
            {
                console.log('on pid changed, get new current project info')
                this.getDetailInfo()
            }
        }
    }
</script>

<style>
    #detail h4 {
        font-size: 14px;
        color: #909399;
    }
</style>