<template>
    <div  class="main-page">
        <main>
            <header class="header">
                <nav class="inner">
                    <div>
                        <router-link :to='$store.state.user.info?"/?token="+$store.state.user.info.token:"/"' exact>
                            <img class="logo" src="../../public/avatar.jpg" alt="logo">
                        </router-link>
                    </div>
                    <div class="inner-nav">
                        <router-link :to='$store.state.user.info?"/?token="+$store.state.user.info.token:"/"'>文章</router-link>
                        <!--<router-link :to='$store.state.user.info?"/zl?token="+$store.state.user.info.token:"/zl"'>专栏</router-link>-->
                        <!--<router-link :to='$store.state.user.info?"/fx?token="+$store.state.user.info.token:"/fx"'>发现</router-link>-->
                        <router-link :to='$store.state.user.info?"/tag?token="+$store.state.user.info.token:"/tag"'>标签</router-link>
                    </div>
                    <div class="user-wrap" v-clickoutside="hideMenu">
                        <a class="user-action" v-if="!$store.state.user.info" href="javascript:void(0);"><span
                                @click="$refs.login.show()">登录</span>|<span @click="$refs.register.show()">注册</span></a>
                        <div v-if="$store.state.user.info" class="user-after-login">
                            <IconText @click="toPostPage" class="user-after-login-post" text="写文章" fontCode="e145" position="left"></IconText>
                            <a @click="showMenu=true" class="user-action" href="javascript:void(0);">
                                <img class="avatar" :src="$store.state.user.info.avatar||avatar" alt="logo"></a>
                        </div>
                        <ul   class="user-feature" v-show="showMenu">
                            <li><a href="javascript:void(0)">主页</a></li>
                            <li><a href="javascript:void(0)">设置</a></li>
                            <li><a href="javascript:void(0)" @click="logOut">退出</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <transition name="fade" mode="out-in">
                <router-view class="view"></router-view>
            </transition>
        </main>
        <Login ref="login"></Login>
        <Register ref="register"></Register>
    </div>

</template>
<script>
    import avatar from '../../public/avatar.jpg'

    import Login from '../components/Login.vue'
    import Register from '../components/Register.vue'

    import IconText from '../components/icontext/index.vue'

    export default {
        components: {
            Login,
            Register,
            IconText
        },

        data() {
            return {
                avatar: avatar,
                showMenu: false
            }
        },
        methods: {
            hideMenu(){
                this.showMenu=false
            },
            logOut() {
                this.$store.dispatch("LOGOUT",this.$route.query.token).then(() => {
                    this.$store.state.user.info || (this.showMenu = false)
                })
            },
            toPostPage(){
                this.$router.push(`/post?token=${this.$route.query.token}`)
            }
        },

    }

</script>
<style lang="less">
    @import '../theme/var';
.main-page {
    .view {
        position: relative;
        margin: @main-margin auto;
        width: 960px;

    }
    .user-wrap {
        position: relative;
        .user-after-login {
            display: flex;
            align-items: center;
            .user-after-login-post {
                cursor: pointer;
                display: flex;
                align-items: center;
                span {
                    color: @main-text-color;
                }
                .wk-icon {
                    font-size: 32px;
                    color: @main-them-color;

                }
            }
        }
        .user-feature {
            position: absolute;
            z-index: 1;
            background: #fff;
            border: 1px solid @main-border-color;
            padding: 10px;
            right: 0;
            li {
                margin-bottom: 8px;
                text-align: right;
                &:last-child {
                    margin-bottom: 0;
                }
                a {
                    width: 100%;
                }
            }
        }
    }

    .header {
        min-width: 960px;
        background: #fff;
        .user-action {
            height: 100%;
            span {
                padding: 0 5px;
            }
        }
        .avatar {
            height: 40px;
        }
        .logo {
            height: 60px;
        }
        height: 60px;
        border-bottom: 1px solid @main-border-color;
        .inner {
            height: 60px;
            width: 960px;
            margin: 0 auto;
            justify-content: space-between;
            display: flex;
            align-items: center;
            .inner-nav {
                flex: 1;
            }
            a {
                padding: 0 15px;
                min-width: 60px;
                text-align: center;
                color: @main-text-color;
                text-decoration: none
            }
        }

    }
}
</style>
