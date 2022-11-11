<template>
    <div>
        <h1 v-text="msg" ref="title"></h1>
        <School />
        <button ref="btn" @click="showDOM()">点我输出DOM元素</button>
    </div>
</template>

<script>
    // 汇总所有的组件
    import School from './components/School.vue'

    export default {
        name: 'App',
        // 组件标签
        components: {
            School,
        },
        data() {
            return {
                msg: '欢迎学习Vue!',
            }
        },
        methods: {
            showDOM() {
                console.log(this.$refs.title)
            },
        },
    }
</script>
