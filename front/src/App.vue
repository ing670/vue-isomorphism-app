<template>
    <div id="app">
        <main>
            <header class="header">
                <nav class="inner">
                    <div>
                        <router-link to="/" exact>
                            <img class="logo" src="../public/avatar.jpg" alt="logo">
                        </router-link>
                    </div>
                    <div class="inner-nav">
                        <router-link to="/">首页</router-link>
                        <router-link to="/zl">专栏</router-link>
                        <router-link to="/fx">发现</router-link>
                        <router-link to="/bq">标签</router-link>
                    </div>
                    <div>
                        <a class="user-action" href="javascript:void(0);"><span @click="$login.show()">登录</span>|<span>注册</span></a>
                    </div>
                </nav>
            </header>
            <transition name="fade" mode="out-in">
                <router-view class="view"></router-view>
            </transition>
        </main>
    </div>

</template>
<script>
    import 'normalize.css';

//    import Login from './components/Login.vue'
    export default{
        components:{
//            Login
        }
    }

</script>
<style lang="less">
    @import 'theme/var';
    body {
        background: #f4f5f5;

    }

    .view {
        position: relative;
        margin: 0 auto;
        width: 960px;
    }

    .header {
        min-width: 960px;
        background: #fff;
        .user-action {
            span {
                padding: 0 5px;
            }
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
        .router-link-exact-active {
            color: lightcoral !important;
        }
    }
</style>
