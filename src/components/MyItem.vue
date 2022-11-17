<template>
    <li>
        <label>
            <input
                type="checkbox"
                :checked="todo.done"
                @change="handleCheck(todo.id)"
            />
            <span v-show="!todo.isEdit">{{ todo.title }}</span>
            <input
                type="text"
                ref="inputTitle"
                v-show="todo.isEdit"
                :value="todo.title"
                @blur="handleBlur(todo, $event)"
            />
        </label>
        <button
            class="btn btn-danger"
            @click="deleteOne(todo.id)"
        >
            删除
        </button>
        <button
            class="btn btn-edit"
            v-show="!todo.isEdit"
            @click="handleEdit(todo)"
        >
            编辑
        </button>
    </li>
</template>

<script>
    import pubsub from 'pubsub-js'
    import {computed} from 'vue'
    export default {
        name: 'MyItem',
        // 声明接收todo对象
        props: ['todo'],
        methods: {
            deleteOne(id) {
                if (confirm('确认删除吗')) pubsub.publish('deleteTodo', id)
            },
            handleCheck(id) {
                this.$bus.$emit('checkTodo', id)
            },
            // 编辑
            handleEdit(todo) {
                if (todo.hasOwnProperty('isEdit')) {
                    todo.isEdit = true
                } else {
                    this.$set(todo, 'isEdit', true)
                }
                this.$nextTick(function() {
                    this.$refs.inputTitle.focus()
                })
            },
            // 失去焦点回调，真正执行数据的修改
            handleBlur(todo, e) {
                todo.isEdit = false
                let title = e.target.value
                // 将数据传递给App
                if(!title.trim()) return alert('请输入数据！')
                this.$bus.$emit('updateTodo', todo.id, title)
            }
        },
    }
</script>

<style scoped>
    /*item */
    li {
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }
    li label {
        float: left;
        cursor: pointer;
    }
    li label li input {
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }
    li button {
        float: right;
        display: none;
        margin-top: 3px;
    }
    li:before {
        content: initial;
    }
    li:last-child {
        border-bottom: none;
    }
    li:hover {
        background-color: #ddd;
    }
    li:hover button {
        display: block;
    }
</style>
