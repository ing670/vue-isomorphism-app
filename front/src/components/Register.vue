<template>
    <div v-show="showing" class="register-mask">
        <div class="register-form">
            <h3><span>注册</span>
                <Icon @click="hide" class="register-form-close" fontCode="e5cd"></Icon>
            </h3>
            <div v-show="userNameErr" class="register-form-error-tips">{{userNameTips}}</div>
            <input v-model="userName" :class="'register-form-input '+(userNameErr?'register-form-error':'')" type="text"
                   placeholder="请输入邮箱"/>
            <div v-show="stronger!=-1" :class="'register-form-password-tips '+getTipsPwdClass()">密码强度：{{passWordTips}}</div>

            <input v-model="passWord" :class="'register-form-input '+ getPwdClass()" type="password" placeholder="请输入密码"/>
            <div v-show="copyPassWordErr" class="register-form-error-tips">两次密码输入不一致</div>

            <input v-model="copyPassWord" :class="'register-form-input '+(copyPassWordErr?'register-form-error':'') " type="password" placeholder="请再次输入密码"/>
            <div class="register-button" @click="register">登录</div>
            <div class="register-help"><span>已经有账号?<a href="javascript:void(0)">登录</a></span>
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
                    :this.stronger==0?"低"
                        :this.stronger==1?"中"
                            :this.stronger==2?"高":""
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
                console.log("nv==>"+nv+"<==nv")
                this.passWord = nv.trim();
                last.test(nv)&&(this.stronger=0);
                mid.test(nv)&&(this.stronger=1);
                good.test(nv)&&(this.stronger=2);
                nv||(this.stronger=-1);
                (this.copyPassWord === nv)?(this.copyPassWordErr=false):(this.copyPassWordErr=true);
                console.log("this.copyPassWordErr",this.copyPassWordErr)
                //this.$nextTick(()=>this.getPwdClass())
//                if(last.test(nv)||mid.test(nv)||good.test(nv)){
//
//                }
//                let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
//                let isok = reg.test(nv);
            },
            userName(nv){
                console.log(nv)
                let isok = userNameReg.test(nv);
                if (isok) {
                    this.userNameErr = false;
                    //查询是否注册
                } else {
                    this.userNameErr = true;
                }
                if (!nv) {
                    this.userNameErr = false;
                }
            }
        },
//        asyncData ({store,route}) {
//            console.log("asdasdasdsadasdasdasdsadasdsa")
//            return store.dispatch("GET_USER_INFO")
//        },
        methods: {
            getPwdClass(){
                 return this.stronger==-1?""
                     :this.stronger==0?"register-form-last"
                     :this.stronger==1?"register-form-mid"
                         :this.stronger==2?"register-form-good":""
            },
            getTipsPwdClass(){
                return this.stronger==-1?""
                    :this.stronger==0?"register-form-last-tips"
                        :this.stronger==1?"register-form-mid-tips"
                            :this.stronger==2?"register-form-good-tips":""
            },
            register(){
                this.$store.dispatch("register", {userName: this.userName, passWord: this.passWord}).then(() => {
                    if (this.$store.state.user.info) {
                        location.replace(host + '/' + '?token=' + this.$store.state.user.info.token)
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
