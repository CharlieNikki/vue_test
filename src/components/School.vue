<template>
    <div class="school">
        <h1 v-text="msg"></h1>
        <h2>学校名称：{{ name }}</h2>
        <h2>学校地址：{{ address }}</h2>
        <button @click="showInfo()">点我会有好事发生</button>
    </div>
</template>

<script>
    export default {
        name: 'School',
        data() {
            return {
                msg: '欢迎学习Vue',
                name: '中国地质大学(武汉)',
                address: '湖北武汉市洪山区',
            }
        },
        methods: {
            showInfo() {
                console.log('1111')
            },
        },
    }
</script>

<style>
    .school {
        background-color: aqua;
    }
</style>
