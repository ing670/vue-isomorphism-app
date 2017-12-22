<template>
    <div v-if="showing" class="login-mask">
        <div class="login-form">
            <h3><span>登录</span>
                <Icon @click="hide" class="login-form-close" fontCode="e5cd"></Icon>
            </h3>
            <div v-show="userNameTips" class="login-form-error-tips">{{userNameTips}}</div>
            <input v-model="userName" :class="'login-form-input '+(userNameTips?'login-form-error':'')" type="text" placeholder="请输入邮箱"/>
            <div v-show="passWordTips" class="login-form-error-tips">{{passWordTips}}</div>
            <input v-model="passWord" :class="'login-form-input '+(passWordTips?'login-form-error':'')" type="password" placeholder="请输入密码"/>
            <div class="login-button" @click="login">登录</div>
            <div class="login-help"><span>没有账号?<a href="javascript:void(0)" @click="toRegister">注册</a></span><a href="javascript:void(0)">忘记密码</a>
            </div>
            <!--<div class="login-other-way"><span>第三方账号登录:</span>-->
                <!--<a href="javascript:void(0)">QQ</a>-->
                <!--<a href="javascript:void(0)">微信</a>-->
                <!--<a href="javascript:void(0)">Github</a>-->
                <!--<a href="javascript:void(0)">微博</a>-->
            <!--</div>-->

        </div>
    </div>
</template>
<script>

    import Icon from './icon/index.vue'
    const userNameReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;

    export default{
        data(){
            return {
                passWordTips:'',
                userNameTips:'',
                userName:'346467156@qq.com',
                passWord:'123456',
                showing: false
            }
        },
        watch: {
            userName(nv){
                this.validateUserName(nv)
            },
            passWord(nv){
                this.validatePassword(nv)
            },
            showing(nv){
                if(nv){
                    this.$nextTick(()=>{
                        this.$el.querySelector('input').focus()
                    })

                }
            }
        },
        created(){
            this.$bus.$on('showLogin',()=>this.show())
        },
        methods: {
            toRegister(){
                this.hide();
                this.$bus.$emit('showRegister')
            },
            validatePassword(nv){
                nv.length>5?(this.passWordTips=""):(this.passWordTips="请输入正确密码")
                return this.passWordTips?false:true;
            },
            validateUserName(nv){
                let isok = userNameReg.test(nv);
                if (isok) {
                    this.userNameTips = "";
                } else {
                    this.userNameTips = "请输入邮箱";
                }
                return this.userNameTips?false:true;
            },
            login(){
                if(!this.validateUserName(this.userName)){
                    return;
                }
                if(!this.validatePassword(this.passWord)){
                    return;
                }
              this.$store.dispatch("LOGIN",{userName:this.userName,passWord:this.passWord}).then(()=>{
                  if(this.$store.state.user.info){
                      location.replace(host+'/'+'?token='+this.$store.state.user.info.token)
                  }else{
//                      this.userNameTips = "请输入邮箱";
//                      this.passWordTips="请输入正确密码"
                      alert("账号或者密码错误")
                  }
              })
            },
            show(){
                this.showing = true;
            },
            hide(){
                this.showing = false;
            },
            toggle(){
                this.showing = !this.showing;
            }
        },
        components: {
            Icon
        }
    }
</script>
<style lang="less">
    /*e5cd*/
    @import '../theme/var';

    .login-mask {
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-form {
            .login-form-input {
                padding: 10px;
                display: block;
                width: 100%;
                border: 1px solid @main-bg-color;
                font-size: 14px;
                margin-bottom: 10px;
                outline: none;
            }
            .login-form-error-tips{
                color: lightcoral;
                font-size: 12px;
                margin-bottom: 5px;
            }
            .login-form-error {
                border: 1px solid lightcoral;
            }

            .login-form-close {
                cursor: pointer;
            }
            border-radius: 4px;
            .login-other-way {
                font-size: 14px;
                color: @main-text-color;
                margin-top: 20px;
                a {
                    margin-left: 8px;
                    color: @main-them-color;
                }
            }
            .login-help {
                margin: 10px 0;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: @main-text-color;
                a {
                    margin-left: 8px;
                    color: @main-them-color;
                }
            }
            .login-button {
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
                background: @main-them-color;
                color: #fff;
                border-radius: 4px;

            }
            h3 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: @main-margin;
            }

            width: 360px;
            margin: 0 auto;
            background: #fff;
            padding: @main-margin;
        }
    }
</style>
