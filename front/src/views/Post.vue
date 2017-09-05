<template>
<!--<div>-->
        <div class="post-page" v-if="$store.state.user.info">
        <div class="post-page-category-list">
            <div class="logo-wrap">
                <router-link to="/" exact>
                    <img class="logo" src="../../public/avatar.jpg" alt="logo">
                </router-link>
            </div>
            <div class="post-page-category-list-item">
                <IconText @click="toPostPage" class="user-after-login-post" text="分类" fontCode="e145"
                          position="right"></IconText>
            </div>
            <div class="post-page-category-list-item-child">
                <ul>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>

                </ul>
            </div>
            <div class="post-page-category-list-item">
                <IconText @click="toPostPage" class="user-after-login-post" text="标签" fontCode="e145"
                          position="right"></IconText>
            </div>
            <div class="post-page-category-list-item-child">
                <ul>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>

                </ul>
            </div>
        </div>
        <div class="post-page-article-list">

            <div class="post-page-category-list-item">
                <IconText @click="toPostPage" class="user-after-login-post" text="分类" fontCode="e145"
                          position="right"></IconText>
            </div>
            <div class="post-page-category-list-item-child">
                <ul>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>

                </ul>
            </div>
            <div class="post-page-category-list-item">
                <IconText @click="toPostPage" class="user-after-login-post" text="标签" fontCode="e145"
                          position="right"></IconText>
            </div>
            <div class="post-page-category-list-item-child">
                <ul>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>
                    <li>
                        <span>啊</span><span>20</span>
                    </li>

                </ul>
            </div>
        </div>

        <main >

            <!--<div class="view">-->
                <Editor></Editor>
                <!--<mavon-editor v-model="value"/>-->
            <!--</div>-->

        </main>
        </div>
<!--</div>-->

</template>
<script>
    //    import 'mavon-editor/dist/css/index.css'
    const inBrowser = typeof window !== 'undefined';
    import avatar from '../../public/avatar.jpg'
    import IconText from '../components/icontext/index.vue'

    const Editor = () => inBrowser ? import('../components/Editor.vue') : import('../components/Empty.vue')

    export default {
        components: {
            IconText,
            Editor
        },
        asyncData ({store,route}) {
            return store.dispatch('GET_USER_INFO',route.query.token)
        },
        data() {
            return {
                value: "",
                avatar: avatar,
                showMenu: false
            }
        },
        methods: {
            hideMenu() {
                this.showMenu = false
            },
            logOut() {
                this.$store.dispatch("LOGOUT").then(() => {
                    this.$store.state.user.info || (this.showMenu = false)
                })
            },
            toPostPage() {
                this.$router.push("/post")
            }
        },
        created() {
//            this.$store.dispatch("GET_USER_INFO").then(resolve => {
//                if (!this.$store.state.user.info) {
//                    this.$router.replace('/')
//                }
//            })

        }
    }

</script>
<style lang="less">
    @import '../theme/var';

    .post-page {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        .post-page-category-list ,.post-page-article-list{
            width: 170px;
            min-width: 170px;
            background: #fff;
            border-right: 1px solid @main-border-color;
            .logo-wrap {
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid @main-border-color;
            }
            .post-page-category-list-item{
                height: 36px;
                color: @main-text-color;
                line-height: 36px;
                border-bottom: 1px solid @main-border-color;

            }
            .post-page-category-list-item-child{
                background: @main-bg-color;
                padding: 0 20px;
                li{
                    height: 30px;
                    line-height: 30px;
                    color: @main-text-color;
                    border-bottom: 1px solid #ddd;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    &:last-child{
                        border: none;
                    }
                    span{
                        &:first-child{
                            font-size: 14px;
                        }
                        &:last-child{
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        .post-page-article-list{
            width: 240px;
            min-width: 240px;

        }
        .logo {
            height: 60px;

        }

        main {
            display: flex;
            flex-direction: column;
            flex: 1;

        }
        .view {
            flex: 1;
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
