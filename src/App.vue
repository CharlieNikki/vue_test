<template>
    <div id="root">
        <div class="todo-container">
            <div class="todo-wrap">
                <MyHeader />
                <MyList />
                <MyFooter/>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * 组件化编码流程
     *      1. 实现静态组件：抽取组件，使用组件实现静态页面效果
     *      2. 展示动态数据
     *          - 数据的类型、名称是什么？
     *          - 数据保存在哪个组件？
     *      3. 交互——从绑定事件监听开始
     */
    // 汇总所有的组件
    import MyHeader from './components/MyHeader'
    import MyList from './components/MyList'
    import MyFooter from './components/MyFooter'

    export default {
        name: 'App',
        // 组件标签
        components: {
            MyHeader,
            MyList,
            MyFooter,
        },
    }
</script>

<style>
    /* base */
    body {
        background: #fff;
    }
    .btn {
        display: inline-block;
        padding: 4px 12px;
        margin-bottom: 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 1px 2px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
    }
    .btn-danger {
        color: #fff;
        background-color: #da4f49;
        border: 1px solid #bd362f;
    }
    .btn-danger:hover {
        color: #fff;
        background-color: #bd362f;
    }
    .btn-focus {
        outline: none;
    }
    .todo-container {
        width: 600px;
        margin: 0 auto;
    }
    .todo-container .todo-wrap {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    
    
</style>
