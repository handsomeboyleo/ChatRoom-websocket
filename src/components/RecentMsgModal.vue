<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    size="small"
    :show-close="false"
  >
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
      <el-table-column label="发送方" prop="user"></el-table-column>
      <el-table-column label="接收方" prop="target"></el-table-column>
      <el-table-column label="内容" prop="msg"></el-table-column>
      <el-table-column label="时间" prop="time"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="setVisible">确 定</el-button>
      <el-button @click="setVisible">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { msgGetRecentMessages } from "../api/messages.js";
export default {
  name: "RecentMsgModal",
  props: {
    visible: Boolean,
    setVisible: Function,
  },
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  async mounted() {},
  methods: {
    allowExpand(row, index) {
      return index !== 2;
    },
    async getRecentMessages() {
      const res = await msgGetRecentMessages(
        this.$store.state.user,
        this.$store.state.selectTargetUser
      );
      this.tableData = res.data;
    },
  },
};
</script>
