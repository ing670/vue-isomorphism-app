<template>
    <div class="home-view margin-top">
        <div class="home-content">
            <nav class="home-content-nav">
                <span>热门文章</span>
                <ul>
                    <li v-for="item in $store.state.home.categorys" :key="item._id"><a href="javascript:void(0);">{{item.title}}</a></li>
                </ul>
            </nav>
            <div class="home-item-wrap" @click="itemClick(it)" v-for="it in $store.state.home.lists" :key="it._id">
                <div class="home-item-left">
                    <div class="home-item-info">
                        <span>{{it.userName}}</span>&nbsp;-&nbsp;
                        <span>{{dealTime(it.createTime)}}</span>&nbsp;-&nbsp;
                        <span class="home-item-category"><span v-for="cg in it.category">{{cg.title}}</span></span>
                    </div>
                    <div class="home-item-title">
                        <h3>{{it.title}}</h3>
                    </div>
                    <div class="home-item-bottom">
                        <a href="javascript:void(0);">点赞 {{it.likeNum}}</a><a
                            href="javascript:void(0);">评论 {{it.commentNum}}</a>
                    </div>
                </div>
                <div class="home-item-right" :style="'background-image: url('+it.cover+')'">

                </div>
            </div>
        </div>
        <div class="home-sidebar">

        </div>

    </div>
</template>

<script>
    import moment from 'moment'
    moment.locale("zh-cn")
    export default {
        name: 'home-view',

        computed: {
        },
        methods: {
            dealTime(time){
                return moment(Number(time)).fromNow()
            },
            itemClick({_id}){
                this.$router.push(`/article/${_id}`)
            }
        },


        asyncData ({store}) {
            return store.dispatch('GET_HOME_DATA')
        },

//  title () {
//    return this.user
//      ? this.user.id
//      : 'User not found'
//  }
    }
</script>

<style lang="less">
    @import "../theme/var";

    .home-view {
        .home-content-nav {
            height: 58px;
            border-bottom: 1px solid @main-border-color;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 24px;
            ul {
                display: flex;
                li {
                    margin-right: 15px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        margin-top: @main-margin;
        display: flex;
        .home-content {
            border-radius: 4px;
            background: #fff;
            flex: 1;
            border: 1px solid @main-border-color;
        }
        .home-sidebar {
            background: #fff;
            width: 240px;
            margin-left: @main-margin;
        }
        .home-item-wrap {
            cursor:pointer;
            border-bottom: 1px solid @main-border-color;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 18px 24px;
            .home-item-right{
                background-size: cover;
                width: 100px;
                background-position: center;
                background-repeat: no-repeat;
            }

            .home-item-category{
                span{
                    &:after{
                        content: "/";
                    }
                    &:last-child{
                        &:after{
                            content: "";
                        }
                        margin-right: 0;

                    }
                }
            }
            .home-item-title {
                h3 {
                    margin: 6px 0 16px 0;
                }
            }
            .home-item-bottom {
                font-size: 12px;
                a {
                    margin-right: 15px;
                    border: 1px solid @main-border-color;
                    padding: 2px 6px;
                }
            }
            .home-item-info {
                span {
                    font-size: 12px;
                    color: #909090;
                }
            }


        }
    }
</style>
