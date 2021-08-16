<template>
  <div class="dialog-box"  :v-bind="filterMessage">
    <div class="dialog-header">{{this.$store.state.selectTargetUser}}</div>
    <div class="dialog-content" id="dialog">
      <Message
        v-for="item in filterMessage"
        :key="item.index"
        :message="item.msg"
        :name="item.from"
      />
    </div>
  </div>
</template>

<script>
import Message from "../components/Message.vue";
export default {
  name: "DialogBox",
  components: { Message },
  computed: {
    filterMessage() {
      let temp = [];
      const selected = this.$store.state.selectTargetUser;
      const storeMsg = this.$store.state.dialogs;
      const user = this.$store.state.user;
      if (selected == "everyone") {
        temp = storeMsg.filter((item) => item.to == "everyone");
      } else {
        temp = storeMsg.filter(
          (item) =>
            (item.from == selected && item.to == user) ||
            (item.to == selected && item.from == user)
        );
      }
      return temp;
    },
  },
  updated() {
    let dialog = document.getElementById("dialog");
    dialog.scrollTop = dialog.scrollHeight;
  },
};
</script>

<style>
.dialog-box {
  flex: 1;
  flex-direction: column;
  border-radius: 25px;
}
.dialog-header{
  width:100%;
  height: 30px;
  background-color: rgb(255, 255, 255);
}
.dialog-content{
  height: 100%;
  width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: rgb(240, 240, 240);
}
.dialog-content::-webkit-scrollbar {
  display: none;
}

</style>
