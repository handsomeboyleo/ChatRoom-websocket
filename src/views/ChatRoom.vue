<template>
  <div class="chat-room">
    <header>
      <div class="left">
      </div>
      <div class="right">
       {{ userName }}
       <el-button @click="logOut">退出登录</el-button>
      </div>
    </header>
      <div class="content-box">
        <div class="online-user">
          <OnlineUser name="everyone" />
          <OnlineUser
            v-for="item in this.$store.state.onlineUser"
            v-bind:key="item"
            :name="item"
          />
        </div>
        <div class="chat-box">
          <div class="chat-content-area">
          <DialogBox />
          </div>
            <div class="chat-option">
              <RecentMsgModal :visible="recentMsgModal" :setVisible="closeRecentDialog" />
              <el-button @click="handleRecentMsgModal">聊天记录</el-button>
            </div>
          <div class="user-input-container">
            <div class="chat-msg-input">
            <el-input
              type="textarea"
              :rows="4"
              :count="100"
              :debounce='2'
              placeholder="请输入信息"
              v-model="msg"
              @keyup.enter.native="handleSend"
            ></el-input>
            </div>
            <div class="user-input-button">
              <el-button @click="handleSend" type="default" icon="h-icon-comment" >
                发送
              </el-button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import initWebsocketServer from "../websocket/websocket.js";
import OnlineUser from "../components/OnlineUser.vue";
import DialogBox from "./DialogBox.vue";
import RecentMsgModal from '../components/RecentMsgModal.vue'
// import getAllMessageList from '../api/getAllMessageList';
import getRecentMessages from '../api/getRecentMessage';
export default {
  name: "chat-room",
  components: {
    OnlineUser,
    DialogBox,
    RecentMsgModal,
  },
  data: () => {
    return {
      userName: "",
      msg: "",
      ws: WebSocket,
      onlineUser: [],
      recentMsgModal:false
    };
  },
  async mounted() {
    this.userName = this.$store.state.user;
    this.ws = initWebsocketServer(this.userName);
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    console.log(this.ws)
  },
  destroyed(){
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  methods: {
    logOut(){
      if(this.ws){
        this.ws.close()
      }
    },
    beforeunloadHandler(e) {
      this.logOut()
      console.log('关闭窗口之后',e)
    },
    handleSend() {
      const data = {
        from: this.userName,
        msg: this.msg,
        to: this.$store.state.selectTargetUser,
      };
      this.ws.send(JSON.stringify(data));
      this.msg = "";
      // this.$store.commit("updateDialogs", data);
    },
    closeRecentDialog(){
      this.recentMsgModal=false
    },
    async handleRecentMsgModal(){
      this.recentMsgModal=true
       const res=await getRecentMessages(this.$store.state.user)
      // const res=await getAllMessageList()
      this.tableData=res.data
    },
    closeWebsocket(){
      if(this.ws){
        this.ws.close;
      }
    }
  },
};
</script>

<style>
header {
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  z-index: 2;
}
.right {
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-items: center;
  align-items: center;
  width:120px;
  text-align: center;
  }
.left {
  display: flex;
  align-items: center;
}
.chat-room{
  height: 100%;
  width: 100%;
}
.content-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.online-user {
  width: 250px;
  height: 100%;
  flex-direction: column;
}
.chat-box {
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.chat-content-area{
  height:700px;
  display: flex;
}
.user-input-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
}
.chat-msg-input{
  width: 100%;
  height:100px
}
.user-input-button {
  margin-left: 20px;
  line-height: 100px;
  border:1px solid rgb(235, 235, 235)
}
.chat-option{
  width:100%;
  height:50px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  background-color: rgb(240, 240, 240);
  padding:10px 0
}
</style>
