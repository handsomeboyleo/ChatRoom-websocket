<template>
  <div id="app">
    <Login v-if="!this.$store.state.isLogin" />
    <chat-room v-if="this.$store.state.isLogin" />
  </div>
</template>

<script>
import Login from "./views/Login.vue";
import ChatRoom from "./views/ChatRoom.vue";
export default {
  components: {
    Login,
    ChatRoom,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.app-content {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.app-menu-content {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
