<template>
  <el-dialog title="提示" :visible.sync="visible" size="small" :show-close='false'>
    <recent-msg-list/>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="setVisible">确 定</el-button>
      <el-button @click="setVisible">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import RecentMsgList from './RecentMsgList.vue'
  export default {
    name: "RecentMsgModal",
    props: {
        visible: Boolean,
        setVisible:Function
    },
    components:{
        RecentMsgList
    },
    data() {
      return {
      };
    },
    methods: {
     
    }
  };
</script>