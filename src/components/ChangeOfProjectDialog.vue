<template>
    <div class="dialog-container">
        <el-dialog title="" :visible.sync="dialogVisible" width="800px" center>
            <div style="margin-bottom: 10px;">
                <h4 style="display: inline">{{changeFiles.length}}个文件</h4>
                <span style="color: #808080;">（ {{num.updateNum}} 修改 / {{num.newNum}} 新增 / {{num.deleteNum}} 删除 ）</span>
            </div>
            <div v-for="file in changeFiles" @click="" style="cursor: pointer;margin-top: 8px">
                <img v-if="file[0] === 'A'" src="../assets/img/record-add.svg">
                <img v-if="file[0] === 'U'" src="../assets/img/record-modify.svg">
                <img v-if="file[0] === 'D'" src="../assets/img/record-delete.svg">
                <span @click="getFileDiff(file[1], file[0])">{{file[1]}}</span>
            </div>
        </el-dialog>

        <el-dialog title="" :visible.sync="diffDialogVisible" width="80%" center>
            <div v-highlight v-if="diffDialogVisible">
                <pre><code class="javascript">{{diffContent}}</code></pre>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ChangeOfProjectDialog",
        props: ['rev','pid','num', 'changeFiles'],
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .dialog-container {
        font-family: "Consolas", "monaco";
    }
</style>