<template>
    <div class="editor-wrap">
        <MarkdownEditor @change-toc="tocChange" @input="input" :value="value" :options="options" :upload="upload" height="100%">    </MarkdownEditor>
    </div>
</template>
<script>
    import { MarkdownEditor } from './markdown-editor/main'
    import hljs from 'highlightjs' // have to npm install highlight
    import 'highlightjs/styles/github.css'

    export default {
        props:{
            value:{
                default:"",
                type:String
            }
        },

        data() {
            return {
                options: {
                    highlight (str, lang) { // you can add highlightjs plugin to highlight your code
                        if (lang && hljs.getLanguage(lang)) {
                            try {
                                return hljs.highlight(lang, str).value
                            } catch (__) {}
                        }
                        return ''
                    },

                },
                upload:{
                    name:'cover',
                    url:host+'/api/upload'
                }
            }
        },
        methods:{
            tocChange(val){
                this.$emit('toc-change',val)
            },
            input(val){
               this.$emit("valueChange",val)
            }
        },
        components: {
            MarkdownEditor
        }
    }
</script>
<style lang="less">
    .editor-wrap{
        height: 100%;

    }
    .editor {
        height: 680px;
    }
</style>
