<template lang="jade">
    .markdown__editor-preview.markdown-body(v-html="html")
</template>

<script>
    import markdownIt from 'markdown-it'
    import markdownItTocAndAnchor from "../../markdown-it-toc-and-anchor"
    export default {
        props: ['content', 'options'],
        data () {
            return {
                html: '',
                dir:'',
            }
        },
        watch: {
            content () {
                this.renderIt()
            },
            options: {
                deep: true,
                handler () {
                    this.initMarkdown()
                }
            }
        },
        methods: {
            getText () {
                return this.$el.innerText
            },
            renderIt () {
                this.html = this.markdownit.render(this.content)
//      this.$nextTick(() => {
//        this.$el.querySelectorAll('a').forEach((a) => {
//          a.setAttribute('target', '_blank')
//        })
//      })
            },
            initMarkdown () {
                let options = {
                    html: false,
                    breaks: true,
                    linkify: true,
                    typography: false,
                    ...this.options
                }
                this.markdownit = markdownIt(options).use(markdownItTocAndAnchor, {
                    anchorLink: false,
                    toc:false,
                    tocCallback:  (tocMarkdown, tocArray, tocHtml)=>{
                       this.$emit('change-toc',tocHtml)  ;
                    }
                })
                this.renderIt()
            }
        },
        created () {
            this.initMarkdown()
        }
    }
</script>

<style lang="css">
    @import "styles/github-markdown.css";

    .markdown__editor-preview {
        min-width: 20%;
        padding: 10px;
        font-size: 16px;
        overflow: auto;
    }
</style>
