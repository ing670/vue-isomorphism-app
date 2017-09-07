<template>
    <!--<div>-->
    <div class="post-page" v-if="$store.state.user.info">
        <div class="post-page-menu-list">
            <div class="logo-wrap">
                <router-link to="/" exact>
                    <img class="logo" src="../../public/avatar.jpg" alt="logo">
                </router-link>
            </div>
            <div class="post-page-menu-list-item">
                <IconText text="文章" fontCode="e24d"
                          position="bottom"></IconText>
            </div>
            <div class="post-page-menu-list-item">
                <IconText text="草稿" fontCode="e24d"
                          position="bottom"></IconText>
            </div>
            <div class="post-page-menu-list-item">
                <IconText text="标签" fontCode="e8e6"
                          position="bottom"></IconText>
            </div>
            <div class="post-page-menu-list-item">
                <IconText text="图库" fontCode="e3ad"
                          position="bottom"></IconText>
            </div>
        </div>
        <div class="post-page-article-list">
            <div class="post-page-article-list-header">
                <IconText class="post-page-icon-text post-page-list-icon-text" text="文章" fontCode="e24d"
                          position="left"></IconText>
                <div @click="addArticle" class="post-page-add-button">添加</div>
            </div>
            <div class="post-page-article-list-item-wrap">
                <div @click="itemClick(it,index)" :key="it._id" :class='index===currentArticleIndex?"post-page-article-list-item-active post-page-article-list-item":"post-page-article-list-item"'
                     v-for="(it,index)  in $store.state.post.myList">
                    <h4>{{it.title}}</h4>
                    <div class="post-page-article-list-item-time">{{formatTime(it.createTime)}}</div>
                    <div class="post-page-article-list-item-content">
                        {{it.content}}
                    </div>
                </div>

            </div>
        </div>

        <main>
            <div class="post-page-ed-header">
                <div class="post-page-ed-title">

                    <lable>标题</lable>
                    <input type="text" placeholder="请输入标题" value="">

                </div>
                <div class="post-page-save-button">保存</div>
                <div class="post-page-pub-button">发布</div>
            </div>
            <div class="post-page-ed-tag">
                <span>tag1</span><span>tag1</span><span>tag1</span>
                <div class="post-page-ed-tag-auto-complete">
                    <input type="text" value="">
                    <ul class="post-page-ed-tag-list" style="display: none">
                        <li>tag1</li>
                        <li>tag2</li>
                    </ul>
                </div>
            </div>
            <div class="post-page-ed-cover">
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <Editor ref="editor" @toc-change="getToc"></Editor>
        </main>
        <div class="post-page-dir-list">
            <div class="post-page-article-list-header">
                <IconText class="post-page-icon-text" text="文章目录" fontCode="e8d2"
                          position="left"></IconText>
            </div>
            <div v-html="dir" class="post-page-dir-list-item-wrap markdown-body">
            </div>
        </div>
    </div>

</template>
<script>
    //    import 'mavon-editor/dist/css/index.css'
    const inBrowser = typeof window !== 'undefined';
    import avatar from '../../public/avatar.jpg'
    import IconText from '../components/icontext/index.vue'
    import moment from '../util/time'
    const Editor = () => inBrowser ? import('../components/Editor.vue') : import('../components/Empty.vue')

    export default {
        components: {
            IconText,
            Editor
        },
        asyncData({store, route}) {
            return Promise.all([store.dispatch('GET_USER_INFO', route.query.token), store.dispatch('GET_MY_ARTICLES', route.query.token)])
        },

        data() {
            return {
                value: "",
                avatar: avatar,
                showMenu: false,
                dir:'',
                currentArticleIndex:0
            }
        },
        methods: {
            addArticle(){
                store.dispatch('ADD_MY_ARTICLE',this.$route.query.token)
            },
            itemClick(article,index){
                this.currentArticleIndex = index;
            },
            formatTime(time){
                return moment(+time).fromNow()
            },
            getToc(toc){
                this.dir = toc
            },
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
        .post-page-pub-button, .post-page-save-button, .post-page-add-button {
            background: @main-them-hover-color;
            width: 50px;
            color: #fff;
            text-align: center;
            border-radius: 2px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            cursor: pointer;
            &:hover {
                color: #fff;
                background: @main-them-color;
            }
        }
        .post-page-pub-button {
            margin-left: @main-margin;
        }
        .post-page-ed-tag-auto-complete {
            position: relative;
            ul {
                position: absolute;
                background: #fff;
                z-index: 1;
                width: 120px;
                color: @main-text-color;
                padding: @main-margin;
                border: 1px solid @main-border-color;
                border-radius: 4px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                li {
                    cursor: pointer;
                    margin-bottom: 5px;
                    padding-bottom: 5px;
                    padding-left: 5px;
                    border-bottom: 1px solid @main-border-color;
                    &:hover {
                        background: @main-them-hover-color;
                        color: #fff;
                    }
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
        .post-page-ed-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 @main-block-margin;
            border-bottom: 1px solid @main-border-color;
            height: 60px;
            min-height: 60px;
            background: #fff;

            .post-page-ed-title {
                display: flex;
                align-items: center;
                flex: 1;
                input {
                    margin-left: @main-block-margin;
                    border: none;
                    height: 100%;
                    width: 80%;
                    outline-style: none;
                }
            }
        }
        .post-page-ed-cover {
            height: 140px;
            min-height: 140px;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            > div {
                cursor: pointer;
                position: relative;
                height: 100px;
                width: 160px;
                border: 2px dashed @main-bg-color;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                overflow: hidden;
                div {
                    position: absolute;
                    width: 30%;
                    height: 2px;
                    background: @main-bg-color;
                    &:last-child {
                        transform: rotate(90deg);
                    }
                }
            }
        }
        .post-page-ed-tag {
            min-height: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            padding-left: @main-block-margin;
            border-bottom: 1px solid @main-bg-color;
            background: #fff;
            input {
                border: none;
                outline-style: none;
                font-size: 12px;
                //  background: @main-bg-color;
            }
            span {
                padding: 2px 4px;
                font-size: 12px;
                color: #fff;
                background: #5cb85c;
                margin-right: @main-margin;
                border-radius: 2px;
            }
        }
        .post-page-menu-list {
            width: 80px;
            min-width: 80px;
            background: #fff;
            border-right: 1px solid @main-border-color;
            display: flex;
            flex-direction: column;
            align-items: center;
            .logo-wrap {
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid @main-border-color;
            }
            .post-page-menu-list-item {
                cursor: pointer;
                margin-top: 50px;
                height: 50px;
                width: 50px;
                border: 1px solid @main-border-color;
                border-radius: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: @main-text-color;
                font-size: 12px;
                &:hover {
                    background: @main-them-hover-color;
                    color: #fff;
                }
                .wk-icon {
                    font-size: 18px;
                }
                /*span{*/
                /*font-size: 12px;*/

                /*}*/

            }
        }
        .post-page-dir-list-item-wrap{
            padding: @main-block-margin 0;
            ul{
                padding-left: 15px;
                li{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }

        }
        .post-page-article-list, .post-page-dir-list {
            width: 240px;
            min-width: 240px;
            background: #fff;
            border-right: 1px solid @main-border-color;
            height: 100%;
            overflow-y: scroll;
            .post-page-article-list-header {
                height: 60px;
                border-bottom: 1px solid @main-bg-color;
                color: @main-text-color;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0 @main-block-margin;
            }
            .post-page-article-list-item-wrap {
                padding: 0 @main-block-margin;
            }
            .post-page-article-list-item-active {
                position: relative;
                h4 {
                    color: @main-them-color;
                }

            }
            .post-page-article-list-item-active::before {
                position: absolute;
                width: 3px;
                height: 100%;
                top: 0;
                left: -10px;
                content: '';
                background: @main-them-color;
            }
            .post-page-article-list-item {
                cursor: pointer;
                margin-top: @main-block-margin;
                padding-bottom: @main-margin;
                border-bottom: 1px solid @main-border-color;
                h4 {
                    width: 120px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:hover{
                        color: @main-them-hover-color;
                    }
                }
                .post-page-article-list-item-content {
                    font-size: 14px;
                    color: @main-text-color;
                    max-height: 48px;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    overflow: hidden;
                }
                .post-page-article-list-item-time {
                    font-size: 12px;
                    padding: 5px 0;
                    color: @main-text-color;
                }
            }
        }
        .post-page-dir-list {
            width: 240px;
            min-width: 240px;
            background: #fff;
            border-left: 1px solid @main-border-color;
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

        .post-page-icon-text {
            cursor: pointer;
            display: flex;
            align-items: center;
            span {
                color: @main-text-color;
                &:last-child {
                    font-size: 18px;
                    padding-left: 5px;
                }
            }
            .wk-icon {
                font-size: 24px;
                color: @main-them-color;

            }
        }
        .post-page-list-icon-text {
            .wk-icon {
                color: @main-text-color;
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


</style>
