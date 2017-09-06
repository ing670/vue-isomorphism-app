<template>
    <div class="editor-wrap">
        <MarkdownEditor v-model="value" :options="options" :upload="upload"height="100%">    </MarkdownEditor>
    </div>
</template>
<script>
    import { MarkdownEditor } from './markdown-editor/main'
    import hljs from 'highlightjs' // have to npm install highlight
    import 'highlightjs/styles/github.css'

    export default {
        data() {
            return {
                value: '@[toc]   \n# 2  \n # 3  \n# 1  \n# 2  \n # 3  \n# 1  \n# 2  \n # 3  \n',
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
                    url:host+'/api/upload'
                }
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
