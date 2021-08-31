<template>
  <el-table ref="expandTable" :data="tableData" style="width: 100%">
    <el-table-column type="expand" :allow-expand="allowExpand">
      <template slot-scope="props">
        <el-form inline label-width="90px" class="demo-table-expand">
          <el-form-item label="消息类型">
            <span>{{ props.row.type }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="发送方" prop="from"></el-table-column>
    <el-table-column label="接收方" prop="to"></el-table-column>
    <el-table-column label="内容" prop="msg"></el-table-column>
    <el-table-column label="时间" prop="time"></el-table-column>
  </el-table>
</template>

<script>

export default {
    name:'RecentMsgList',
     data() {
      return {
        tableData: []
      };
    },
    async mounted(){
   
    },
    methods: {
      allowExpand(row, index) {
        return index !== 2;
      }
    }
}
</script>

<style>

</style>