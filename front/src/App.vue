<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>
<script>
    import 'normalize.css';
</script>
<style lang="less">
    body {
        background: #f4f5f5;

    }

    .view {
        position: relative;
        margin: 0 auto;
        width: 960px;
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
