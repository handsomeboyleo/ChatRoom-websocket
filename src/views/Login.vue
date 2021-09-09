<template>
  <div class="login">
    <div v-if="isRegister" class="form-container">
      <el-form
        label-position="top"
        ref="loginForm"
        label-width="100px"
        class="login-form"
      >
        <el-row class="login-welcome">
          <span class="login-welcome-text">{{ "welcome" }}</span>
        </el-row>
        <!-- 邮箱 -->
        <el-form-item>
          <el-input
            id="email"
            v-model="email"
            type="text"
            placeholder="请输入email"
          ></el-input>
        </el-form-item>
        <el-form-item>
        <el-input
            id="userName"
            v-model="userName"
            type="text"
            placeholder="请输入userName"
          ></el-input>
        </el-form-item>
        <el-form-item>
        <el-input
            id="mobile"
            v-model="mobile"
            type="text"
            placeholder="请输入mobile"
          ></el-input>
        </el-form-item>
         <el-form-item>
          <el-input
            id="password"
            v-model="password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item style="margin-bottom: 4px">
          <el-button type="primary" @click="register" class="login-btn"
            >注册
          </el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="link" @click="changeType">登录</el-button>
      </div>
    </div> 
    <div v-if="!isRegister"  class="form-container">
      <el-form
        label-position="top"
        ref="loginForm"
        label-width="100px"
        class="login-form"
      >
        <el-row class="login-welcome">
          <span class="login-welcome-text">{{ "welcome" }}</span>
        </el-row>
        <!-- 邮箱 -->
        <el-form-item>
          <el-input
            id="userName"
            v-model="email"
            type="text"
            placeholder="请用账户邮箱或手机号登录"
          ></el-input>
        </el-form-item>
         <el-form-item>
          <el-input
            id="password"
            v-model="password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item style="margin-bottom: 4px">
          <el-button type="primary" @click="login" class="login-btn"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="link" @click="changeType">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  userLogin,userRegister,tokenLogin
} from '../api/user.js'
export default {
  name: "Login",
  data: () => {
    return {
      isRegister: false,
      email: "",
      password:"",
      mobile:'',
      userName:''
    };
  },
  async mounted(){
    await tokenLogin().then((res)=>{
        if(res.code=='200'){
          this.isLogin = true;
          this.$store.commit("loginChatroom", res.data.userName);
        }
      })
  },
  methods: {
    changeType(){
      this.isRegister=!this.isRegister
    },
    async login() {
      await userLogin(
        this.email,this.password
      ).then((res)=>{
        if(res.data){
          this.isLogin = true;
          localStorage.setItem('token',res.data.token)
          this.$store.commit("loginChatroom", res.data.userName);
        }
      })
    },
    async register(){
      await userRegister(
        this.email,
        this.mobile,
        this.userName,
        this.password
      ).then((res)=>{
        if(res.data){
          this.login()
        }
      })
    }
  },
};
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  position: relative;

  .hcc-logo {
    //   background-image: url("../../assets/img/logo_hcc.svg");
    width: 400px;
    height: 80px;
    background-size: 400px 80px;
    background-repeat: no-repeat;
  }
  .form-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background: #f4f4f4;
    position: relative;

    .login-welcome {
      margin-bottom: 55px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;

      .login-welcome-text {
        text-overflow: ellipsis;
        color: #333;
        font-size: 22px;
        font-weight: 600;
        line-height: 34px;
      }
    }

    .login-form {
      width: 560px;
      height: 500px;
      background: #ffffff;
      border-radius: 32px;
      padding: 57px 80px;

      /deep/ .verification-code-item .el-form-item__content {
        display: flex;

        .input-verification-code {
          width: 250px;
          margin-right: 20px;
          flex: 0 0 auto;

          input {
            height: 36px;
          }
        }

        img {
          flex: 1 1 auto;
          width: 120px;
          height: 36px;
          margin-left: 10px;
        }
      }

      .login-btn {
        width: 100%;
        max-width: 100%;
        border-radius: 2px;
      }
    }
  }

  /deep/ .download-item {
    margin-top: 24px;

    .el-form-item__content {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;

      .download-btn {
        text-overflow: ellipsis;
        color: #2196f3;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .qr-code-container {
    display: flex;
    flex-flow: row;
    justify-content: center;
    margin-top: 22px;

    .qr-code-item {
      display: flex;
      align-items: center;

      span {
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.dialog-deny-tip {
  color: #333;
  line-height: 30px;
  padding: 20px 45px;
}

//动画
@keyframes up-down-animate {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -30px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}

header {
  width: 100%;
  height:50px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  z-index: 2;

  .left {
    display: flex;
    align-items: center;
    i {
      padding: 24px;
    }
  }

  .right {
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-items: center;
    align-items: center;

    .language-select,
    .country-select {
      width: 100px;

      .el-input {
        input {
          border: none;
        }
      }
    }

    p {
      margin-left: 46px;
      word-break: keep-all;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
<style lang="less">
.language-select,
.country-select {
  width: 100px;
  min-width: 100px;

  .el-input {
    input {
      border: none;
    }
  }
}
.login-form {
  .el-input {
    input {
      border: none;
      border-bottom: 1px solid #ccc;
    }
  }

  .el-form-item {
    margin-bottom: 24px;
  }
}
</style>
