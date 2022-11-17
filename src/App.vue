<template>
    <div id="root">
        <div class="todo-container">
            <div class="todo-wrap">
                <!-- 给MyHeader绑定自定义事件：addTodo -->
                <MyHeader @addTodo="addTodo" />
                <MyList
                    :todos="todos"
                />
                <!-- 只需将完成数量和总数量传过去，无需传递整个对象 -->
                <MyFooter
                    :todos="todos"
                    @checkAllTodo="checkAllTodo"
                    @clearDoneTodo="clearDoneTodo"
                />
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
    import pubsub from 'pubsub-js'
    import MyHeader from './components/MyHeader.vue'
    import MyFooter from './components/MyFooter.vue'
    import MyList from './components/MyList.vue'
    
    export default {
        name: 'App',
        // 组件标签
        components: {
            MyHeader,
            MyList,
            MyFooter,
        },
        data() {
            return {
                // todos: [
                //     {id: '001', title: '抽烟', done: true},
                //     {id: '002', title: '喝酒', done: false},
                //     {id: '003', title: '烫头', done: true},
                // ],
                todos: JSON.parse(localStorage.getItem('todos')) || []
            }
        },
        methods: {
            addTodo(todoObj) {
                this.todos.unshift(todoObj)
            },
            deleteTodo(_,id) {
                this.todos = this.todos.filter((todo) => todo.id !== id)
            },
            checkTodo(id) {
                this.todos.forEach((todo) => {
                    if (todo.id === id) {
                        todo.done = !todo.done
                    }
                })
            },
            // 全选
            checkAllTodo(isAllChecked) {
                this.todos.forEach((todo)=> {
                    todo.done = isAllChecked
                })
            },
            clearDoneTodo() {
                this.todos = this.todos.filter((todo) => {
                    return !todo.done
                })
            },
            // 更新一个todo
            updateTodo(id, title) {
                this.todos.forEach((todo) => {
                    if(todo.id === id) todo.title = title
                })
            }
        },
        watch: {
            todos: {
                deep: true,
                handler(value) {
                    localStorage.setItem('todos', JSON.stringify(value))
                }
            }
        },
        mounted() {
            // 绑定事件
            this.$bus.$on('checkTodo', this.checkTodo)
            this.pubId = pubsub.subscribe('deleteTodo', this.deleteTodo)
            this.$bus.$on('updateTodo', this.updateTodo)
        },
        beforeDestroy() {
            this.$bus.$off(['checkTodo', 'updateTodo'])
            // 取消订阅消息
            pubsub.unsubscribe(this.pubId)
        }
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
    .btn-edit {
        color: #fff;
        background-color: skyblue;
        border: 1px solid rgb(77, 127, 146);
        margin-right: 10px;
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
