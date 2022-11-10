<template>
    <div>
        <School />
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
    }
</script>
