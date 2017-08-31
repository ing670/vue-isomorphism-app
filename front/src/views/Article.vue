<template>
    <div class="article-view">
        <div class="article-main">
            <div class="article-author">
                <div class="avatar"
                     style="background-image: url(https://user-gold-cdn.xitu.io/2017/6/30/f93567d38e68c40fca54e668b15cd274?imageView2/1/w/100/h/100/q/85/interlace/1);"></div>
                <div class="info">
                    <div class="article-author-name">
                        {{$store.state.home.articelDetial.userName}}
                    </div>
                    <div class="article-time">
                        {{dealTime($store.state.home.articelDetial.createTime)}}
                    </div>
                </div>
            </div>
            <div class="article-cover"
                 :style="'background-image: url('+$store.state.home.articelDetial.cover+');'">

            </div>
            <h1 class="article-title">{{$store.state.home.articelDetial.title}}</h1>
            <div class="article-content">
                {{$store.state.home.articelDetial.content}}
            </div>
            <div class="article-category">
                <span v-for="i in $store.state.home.articelDetial.category">
                    {{i.title}}
                </span>

            </div>
            <div class="article-share">
                <div class="good">
                    <span>赞</span>
                    <span>200</span>
                </div>
                <div class="article-share-action">
                    <span>评论</span>
                    <span>分享</span>
                </div>

            </div>
            <div class="article-good-list">
                <div class="avatar"
                     style="background-image: url(https://user-gold-cdn.xitu.io/2017/6/30/f93567d38e68c40fca54e668b15cd274?imageView2/1/w/100/h/100/q/85/interlace/1);"></div>
                <div class="avatar"
                     style="background-image: url(https://user-gold-cdn.xitu.io/2017/6/30/f93567d38e68c40fca54e668b15cd274?imageView2/1/w/100/h/100/q/85/interlace/1);"></div>
                <div class="avatar"
                     style="background-image: url(https://user-gold-cdn.xitu.io/2017/6/30/f93567d38e68c40fca54e668b15cd274?imageView2/1/w/100/h/100/q/85/interlace/1);"></div>
                <div class="avatar"
                     style="background-image: url(https://user-gold-cdn.xitu.io/2017/6/30/f93567d38e68c40fca54e668b15cd274?imageView2/1/w/100/h/100/q/85/interlace/1);"></div>
                <div class="avatar"
                     style="background-image: url(https://user-gold-cdn.xitu.io/2017/6/30/f93567d38e68c40fca54e668b15cd274?imageView2/1/w/100/h/100/q/85/interlace/1);"></div>
                <div class="avatar"
                     style="background-image: url(https://user-gold-cdn.xitu.io/2017/6/30/f93567d38e68c40fca54e668b15cd274?imageView2/1/w/100/h/100/q/85/interlace/1);"></div>
            </div>
        </div>
        <div class="article-sidebar">

        </div>

    </div>
</template>

<script>
    import moment from 'moment'
    moment.locale("zh-cn")
    export default {
        name: 'article-view',
        computed: {},
        methods: {
            dealTime(time){
                return moment(Number(time)).fromNow()
            }
        },
        asyncData ({store,route}) {
            return store.dispatch('GET_ARTICLE_DATA',{path:route.fullPath})
        },
    }
</script>

<style lang="less">
    @import "../components/var";

    .article-view {
        margin-top: @main-margin;
        padding: @main-margin;
        background: #fff;

        .article-share {
            margin: @main-margin 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .article-share-action {
                span {
                    margin-right: 5px;
                    color: @main-text-color;
                    vertical-align: middle;
                }
            }
            .good {
                color: @main-them-color;
                span {
                    &:first-child {
                        font-size: 24px;
                    }
                    margin-right: 5px;
                }
            }
        }
        .article-category {
            margin: 20px 0;
            span {
                padding: 8px 12px;
                color: #909090;
                font-size: 14px;
                margin-right: 10px;
                background: @main-border-color;
            }
        }
        .article-cover {
            margin-top: @main-margin;
            background-size: cover;
            background-position: 50%;
            background-repeat: no-repeat;
            height: 360px;
        }

        .article-author,.article-good-list {
            display: flex;
            color: #909090;

            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 3px 0;
            }
            .avatar {
                margin-right: 10px;
                width: 40px;
                height: 40px;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            .article-author-name {
                font-size: 16px;

            }
            .article-time {
                font-size: 12px;
            }

        }
         .article-good-list{
             .avatar {width: 30px;height: 30px;margin-right: 5px;}
        }

    }
</style>
