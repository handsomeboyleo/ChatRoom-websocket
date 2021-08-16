<template>
  <div class="online-user-content" :class="checkSeleted" @click="onSelected">
    <div class="user-avatar">{{ name.substr(0, 1) }}</div>
    <div class="user-name">{{ name }}</div>
    <div v-if="unReadMsg.length > 0" class="unRead-box">
      {{ unReadMsg.length }}
    </div>
  </div>
</template>

<script>
export default {
  name: "OnlineUser",
  props: {
    name: {
      type: String,
      defualt: "",
    },
  },
  data: () => {
    return {
      unReadMsg: [],
    };
  },
  methods: {
    onSelected() {
      this.$store.commit("selectTargetUser", this.name);
      this.unReadMsg = [];
    },
  },
  computed: {
    checkSeleted() {
      if (this.$store.state.selectTargetUser === this.name) {
        return {
          "online-user-content-selected": true,
          "online-user-content": false,
        };
      } else {
        return {
          "online-user-content-selected": false,
          "online-user-content": true,
        };
      }
    },
  },
  watch: {
    // 监听 store里面的数据
    "$store.state.dialogs": {
      deep: true,
      handler: function(newValue) {
        var latestMsg = newValue.slice(-1);
        if (this.$store.state.selectTargetUser === this.name) {
          this.unReadMsg = [];
        } else if( latestMsg.length &&latestMsg[0].from === this.name &&latestMsg[0].to === this.$store.state.user){
          this.unReadMsg.push(latestMsg);
        }
      },
    },
  },
};
</script>

<style>
.online-user-content {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 25px;
  margin:10px 5px;
}
.online-user-content-selected {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: rgb(219, 219, 219);
}
.online-user-content:hover {
  transform: scale(1.1);
  background-color:rgb(230, 230, 230) ;
  transition: 0.3s;
}
.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: cadetblue;
  line-height: 50px;
  text-align: center;
  color: white;
  font-weight: bold;
}
.user-name {
  flex: 1;
  line-height: 50px;
  text-align: left;
  padding: 0 10px;
}
.unRead-box {
  height: 24px;
  width: 24px;
  margin: 13px 5px;
  border-radius: 15px;
  background-color: rgb(232, 0, 0);
  color: white;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
}
</style>
