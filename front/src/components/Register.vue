<template>
    <div v-if="showing" class="register-mask">
        <div class="register-form">
            <h3><span>注册</span>
                <Icon @click="hide" class="register-form-close" fontCode="e5cd"></Icon>
            </h3>
            <div v-show="userNameErr" class="register-form-error-tips">{{userNameTips}}</div>
            <input v-model="userName" ref="userNameInput" :class="'register-form-input '+(userNameErr?'register-form-error':'')" type="text"
                   placeholder="请输入邮箱"/>
            <div v-show="stronger!=-1" :class="'register-form-password-tips '+getTipsPwdClass()">{{passWordTips}}</div>

            <input v-model="passWord" ref="passWordInput" :class="'register-form-input '+ getPwdClass()" type="password" placeholder="请输入密码"/>
            <div v-show="copyPassWordErr" class="register-form-error-tips">两次密码输入不一致</div>

            <input v-model="copyPassWord" :class="'register-form-input '+(copyPassWordErr?'register-form-error':'') " type="password" placeholder="请再次输入密码"/>
            <div class="register-button" @click="register">确定</div>
            <div class="register-help"><span>已经有账号?<a href="javascript:void(0)" @click="toLogin">登录</a></span>
            </div>
            <!--<div class="register-other-way"><span>第三方账号登录:</span>-->
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
    //强：字母+数字+特殊字符
    const good=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
    //中：字母+数字，字母+特殊字符，数字+特殊字符
    const mid=/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
    //弱：纯数字，纯字母，纯特殊字符
    const last=/^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/
    const userNameReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    import ERROR from '../../../server/api/errorcodes'
    export default{
        data(){
            return {
                userNameTips:'请输入正确邮箱',
                userName: '',
                userNameErr: false,
                passWord: '',
                copyPassWord: '',
                copyPassWordErr:false,
                showing: false,
                stronger:-1,
            }
        },
        computed:{
            passWordTips(){
                return this.stronger==-1?""
                    :this.stronger==0?"密码强度：低"
                        :this.stronger==1?"密码强度：中"
                            :this.stronger==2?"密码强度：高"
                                :this.stronger==3?"密码不能少于6位"
                                    :''
            }
        },
        watch: {
            showing(nv){
                if (nv) {
                    this.$nextTick(() => {
                        this.$el.querySelector('input').focus()
                    })
                }
            },
            copyPassWord(nv){
                (this.passWord === nv)?this.copyPassWordErr=false:this.copyPassWordErr=true;
                nv||(this.copyPassWordErr=false);
            },
            passWord(nv){
               this.validatePassWord(nv)
            },
            userName(nv){
                this.validateUserName(nv)
            }
        },
        created(){
            this.$bus.$on('showRegister',()=>this.show())
        },
        methods: {
            toLogin(){
                this.hide();
                this.$bus.$emit('showLogin')
            },
            validateUserName(nv){
                let isok = userNameReg.test(nv);
                if (isok) {
                    this.userNameErr = false;
                    //查询是否注册
                } else {
                    this.userNameErr = true;
                }
//                if (!nv) {
//                    this.userNameErr = false;
//                }
                return !this.userNameErr;
            },
            validatePassWord(nv){
                this.passWord = nv.trim();
                last.test(nv)&&(this.stronger=0);
                mid.test(nv)&&(this.stronger=1);
                good.test(nv)&&(this.stronger=2);
                nv||(this.stronger=-1);
                nv.length<6&&(this.stronger=3);
                (this.copyPassWord === nv)?(this.copyPassWordErr=false):(this.copyPassWordErr=true);
                return (this.stronger!=-1&&this.stronger!=3&&this.copyPassWordErr==false)
            },
            getPwdClass(){
                 return this.stronger==-1?""
                     :this.stronger==0?"register-form-last"
                     :this.stronger==1?"register-form-mid"
                         :this.stronger==2?"register-form-good"
                                 :this.stronger==3?"register-form-error":""
            },
            getTipsPwdClass(){
                return this.stronger==-1?""
                    :this.stronger==0?"register-form-last-tips"
                        :this.stronger==1?"register-form-mid-tips"
                            :this.stronger==2?"register-form-good-tips"
                                :this.stronger==3?"register-form-error-tips":''
            },
            register(){
                if(!this.validateUserName(this.userName)){
                    this.$refs.userNameInput.focus();
                    return
                }
                if(!this.validatePassWord(this.passWord)){
                    this.$refs.passWordInput.focus();
                    return
                }
                this.$store.dispatch("REGISTER", {userName: this.userName, passWord: this.passWord}).then((res) => {
                   if(res.data.code == 0){
                       this.hide();
                       alert(res.data.msg)
                   }else if(res.data.code == ERROR.USER_EXIST.code){
                       this.userNameTips = ERROR.USER_EXIST.msg;
                       this.userNameErr = true;
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

    .register-mask {
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .register-form {
            .register-form-close {
                cursor: pointer;
            }
            border-radius: 4px;
            .register-other-way {
                font-size: 14px;
                color: @main-text-color;
                margin-top: 20px;
                a {
                    margin-left: 8px;
                    color: @main-them-color;
                }
            }
            .register-help {
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
            .register-button {
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
            .register-form-input {
                outline: none;
                padding: 10px;
                display: block;
                width: 100%;
                border: 1px solid @main-bg-color;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .register-form-error {
                border: 1px solid lightcoral;
            }
            .register-form-password-tips{
                font-size: 12px;
                margin-bottom: 5px;
            }
            .register-form-error-tips {
               color: lightcoral;
                font-size: 12px;
                margin-bottom: 5px;
            }
            .register-form-last {
                border: 1px solid #8a5d06;
            }
            .register-form-last-tips {
                color: #8a5d06;
            }
            .register-form-mid {
                border: 1px solid #788a41;
            }
            .register-form-mid-tips {
                color:#788a41;
            }
            .register-form-good {
                border: 1px solid #468a58;
            }
            .register-form-good-tips {
               color: #468a58;
            }
            width: 360px;
            margin: 0 auto;
            background: #fff;
            padding: @main-margin;
        }
    }
</style>
