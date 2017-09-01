<template>
    <div v-show="showing" class="login-mask">
        <div class="login-form">
            <h3><span>登录</span>
                <Icon @click="hide" class="login-form-close" fontCode="e5cd"></Icon>
            </h3>
            <input  class="login-form-input" type="text" placeholder="请输入手机号或邮箱"/>
            <input class="login-form-input" type="password" placeholder="请输入密码"/>
            <div class="login-button">登录</div>
            <div class="login-help"><span>没有账号?<a href="javascript:void(0)">注册</a></span><a href="javascript:void(0)">忘记密码</a>
            </div>
            <div class="login-other-way"><span>第三方账号登录:</span>
                <a href="javascript:void(0)">QQ</a>
                <a href="javascript:void(0)">微信</a>
                <a href="javascript:void(0)">Github</a>
                <a href="javascript:void(0)">微博</a>
            </div>

        </div>
    </div>
</template>
<script>
    import Icon from './icon/index.vue'
    export default{
        data(){
            return {
                showing: false
            }
        },
        watch: {
            showing(nv){
                if(nv){
                    this.$nextTick(()=>{
                        this.$el.querySelector('input').focus()
                    })

                }
            }
        },
        methods: {
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
        display: flex;
        justify-content: center;
        align-items: center;
        .login-form {
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
            .login-form-input {
                padding: 10px;
                display: block;
                width: 100%;
                border: 1px solid @main-bg-color;
                font-size: 14px;
                margin-bottom: 10px;
            }
            width: 360px;
            margin: 0 auto;
            background: #fff;
            padding: @main-margin;
        }
    }
</style>
