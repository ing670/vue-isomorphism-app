<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view ></router-view>
        </transition>
    </div>
</template>
<script>
    import 'normalize.css';
    import Login from './components/Login.vue'
    export default {
        compoennts:{
            Login
        },
        created(){
            this.$store.dispatch("GET_USER_INFO")
        }
    }
</script>
<style lang="less">
    body {
        background: #f4f5f5;

    }


    .router-link-exact-active {
        color: lightcoral !important;
    }

    .fade-enter-active, .fade-leave-active {
        transition:all .2s ease
    }

    .fade-enter, .fade-leave-active {
        opacity:0
    }

</style>
