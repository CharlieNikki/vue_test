<template>
    <div class="school">
        <h1 v-text="msg"></h1>
        <h2>学生姓名：{{ name }}</h2>
        <h2>学生年龄：{{ age }}</h2>
        <button @click="showName()">点我提示名称</button>
    </div>
</template>

<script>
    export default {
        name: 'School',
        data() {
            return {
                msg: '欢迎学习Vue',
                name: '张三',
                age: '18',
            }
        },
        methods: {
            showName() {
                console.log(this. 
                name)
            },
        },
    }
</script>

<style>
    .school {
        background-color: aqua;
    }
</style>
