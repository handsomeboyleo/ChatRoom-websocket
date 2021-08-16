<template>
  <div class="m-container-defult" :class="checkFrom">
    <div class="m-user">{{ name.substr(0, 1) }}</div>
    <div class="m-msg-box">
      <div class="m-content">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    name: {
      type: String,
      defualt: "unKnow",
    },
    message: {
      type: String,
      defualt: false,
    },
  },
  computed: {
    checkFrom: function() {
      if (this.name !== this.$store.state.user) {
        return {
          "m-container-right": false,
          "m-container-defualt": true,
        };
      } else {
        return {
          "m-container-right": true,
          "m-container-defualt": false,
        };
      }
    },
  },
};
</script>

<style>
.m-container-defult {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 5px;
}
.m-container-right {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
}
.m-user {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 5px 10px 5px 10px;
  background-color: cadetblue;
  line-height: 50px;
  text-align: center;
  color: white;
  font-weight: bold;
}
.m-msg-box {
  margin-left: 5px;
  margin-right: 5px;
  max-width: 50%;
}
.m-content {
  background-color: #d2d2d2;
  border-radius: 10px;
  min-height: 30px;
  line-height: 23px;
  text-align: left;
  margin-top: 5px;
  padding: 10px 12px;
  word-break: break-all;
  word-wrap: break-word;
}
</style>
