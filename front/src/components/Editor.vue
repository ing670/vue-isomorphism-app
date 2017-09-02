<template>
    <div>
        <textarea id="editor"/>
        <MavonEditor ></MavonEditor>
    </div>
</template>
<script>
    //    import  SimpleMDE from "../../vendor/simplemde/src/js/simplemde"
//    import  "simplemde/dist/simplemde.min.css"
    import 'mavon-editor/dist/css/index.css'

//    import SimpleMDE from "simplemde"
    import {mavonEditor} from 'mavon-editor'
//    import SimpleMDE from "simplemde"

    import Icon from './icon/index.vue'

    export default {
        data() {
            return {}
        },
        mounted() {
//            this.$nextTick(() => {
//                let mde = new SimpleMDE({element: window.document.querySelector('#editor')})
//
//            })
        },
        components: {
            Icon,
            "MavonEditor":mavonEditor
        }
    }
</script>
<style lang="less">

</style>
