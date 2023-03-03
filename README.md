# Vue笔记

## 数据绑定
    Vue中有两种数据绑定的方式：
        1. 单向绑定(v-bind)：数据只能从data流向页面。
        2. 双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
        备注：
            1. 双向绑定一般都应用在表单类元素上，如input、select等。
            2. v-model:value 可以简写为：v-model，因为v-model默认收集的就是value的值。

## ref 属性

    1. 被用来给元素或子组件注册引用信息(id的替代者)
    2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上获取的是实例对象(vc)
    3. 使用方式
        - 打标识:<h1 ref="xxx">...</h1> 或 <School ref="xxx"><School>
        - 获取:this.$refs.xxx

## 配置项 props

    功能：让组件接收外部传过来的数据
        1. 传递数据
            <Demo name="xxx" />
        2. 接收数据
            第一种方式(只接收)：
                props:['name']
            第二种方式(限制类型)：
                props:{
                    name: String
                }
            第三种方式(限制类型、限制必要性、指定默认值)：
                props: {
                    name: {
                        type: String, // 类型
                        required: true, // 必要性
                        default: '老王' // 默认值
                    }
                }
    备注：
        props是只读的，Vue底层会监测程序员对props的修改，如果进行了修改，将会发生警告，
        若业务需求确实需要将数据进行修改，那么请复制props的内容到 data中一份，然后去修改data中的数据

## 总结 TodoList 案例

    1. 组件化编码流程

        - 拆分静态组件
            组件要按照功能点进行拆分，命名不要与html已有元素冲突

        - 实现动态组件
            考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用
                - 一个组件在用：放在组件自身即可
                - 一些组件在用：放在他们共同的父组件上(<span style="color:red">状态提升</span>)

        - 实现交互：从绑定事件开始
    
    2. props适用于：
        
        - 父组件 ===> 子组件 通信
        - 子组件 ===> 父组件 通信 (要求父先给子一个函数)

    3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以进行修改的！

    4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做

## webStorage

    1. 存储内容大小一般支持5MB左右(不同浏览器可能被不一样)

    2. 浏览器端通过Window.sessionStorage 和 Window.lacalStorage 属性来实现本地存储机制

    3. 相关API：
        
        - xxxStorage.setItem('key', 'value')
            该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
        
        - xxxStorage.getItem('key')
            该方法接受一个键名作为参数，返回键名对应的值

        - xxxStorage.removeItem('key')
            该方法接受一个键名作为参数，并把该键名从存储中删除

        - xxxStorage.clear()
            该方法会清空存储中的所有数据

    4. 备注：
        
        - SessionStorage存储的内容会随着浏览器窗口关闭而消失

        - LocalStorage存储的内容，需要手动清除才会消失

        - xxxStorage.getItem(xxx)如果xxx对应的value获取不到，那么该方法的返回值是null

        - JSON.parse(null)的结果依然是null

## 组件的自定义事件

    1. 一种组件间的通信方式，适用于： 子组件 ===> 父组件

    2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调函数在A中）

    3. 绑定自定义事件

        - 第一种方式，在父组件中<Demo @something="test"/> 或
            <Demo v-on:something="test"/>
        - 第二种当时，在父组件中：
            <Demo ref="demo"/>
            ....
            mounted() {
                this.$refs.xxx.$on('something', this.test)
            }
        - 若想让自定义事件只能够触发一次，可以使用once修饰符，或$once方法

    4. 触发自定义事件

        this.$emit('something', 数据)

    5. 解绑自定义事件

        this.$off('something')

    6. 组件上也可以绑定原生DOM事件，需要使用native修饰符

    7. 注意：
        通过this.$refs.xxx.$on('something', 回调函数)绑定自定义事件时，回调函数要么配置在methods中，要么用箭头函数，否则this指向会出问题

## 全局事件总线 (GlobalEventBus)

    1. 一种组件间通信的方式，适用于任意组件间通信

    2. 安装全局事件总线(main.js):
        new Vue({
            ...
            beforeCreate() {
                // 安装全局事件总线，$bus就是当前应用的vm
                Vue.propotype.$bus = this 
            },
            ...
        })

    3. 使用事件总线:

        - 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调函数留在A组件自身
            methods() {
                demo(data) {
                    ...
                }
            }
            mounted() {
                this.$bus.$on('xxx', this.demo)
            }
        - 提供数据：
            this.$bus.$emit('xxx', demo)

    4. 最好早beforeDestroy钩子中，用$off去解绑当前组件所用到的事件


## 消息订阅与发布(pubsub)

    1. 一种组件间通信的方式，适用于任意组件间通信

    2. 使用步骤：

        - 安装pubsub: npm i pubsub-js

        - 引入: import pubsub from 'pubsub-js'

        - 接收数据：A组件想要接收数据，则在A组件中订阅消息，消息的回调函数留在A组件自身
            methods() {
                demo(data) {
                    ...
                }
            }
            ...
            mounted() {
                // 订阅消息
                this.pid = pubsub.subscribe('xxx', this.demo)
            }
            
        - 提供数据：pubsub.publish('xxx', 数据)

        - 最好在beforeDestroy钩子中，用Pubsub>unsubscribe(pid)去
            <span style="color:red">取消订阅</span>

## nextTick

    1. 语法：this.$nextTick(回调函数)

    2. 作用：在下一次DOM更新结束之后执行其指定的回调函数

    3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行

## Vue封装的过度与动画

    1. 作用：在插入、更新或移除DOM元素时，再合适的时候给元素添加样式类名

    2. 图示。。。

    3. 写法：
        
        - 准备好样式
            - 元素进入的样式
                - v-enter:进入的起点
                - v-enter-active:进入过程中
                - v-enter-to:进入的终点

## Vue脚手架配置代理
### 方法一
    在vue.config.js中添加如下配置

    devServer: {
        proxy: "http://localhost:5000"
    }

    说明：
        1. 优点：配置简单，请求资源时直接发给前端即可。
        2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
        3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求 会转发给服务器(优先匹配前端资源)

### 方法二
    编写vue.config.js配置具体的代理规则：
    
    module.exports = {
        decServer: {
            proxy: {
                '/api1': {// 匹配所有以/api1开头的请求路径
                    target: 'http://localhost:5000',// 代理目标的基础路径
                    changeOrigin: true,
                    pathRewrite: {'^/api1';''}
                },
                '/api2': {// 匹配所有以/api2开头的请求路径
                    target: 'http://localhost:5000',// 代理目标的基础路径
                    changeOrigin: true,
                    pathRewrite: {'^/api2';''}
                }
            }
        }
    }
    /**
        changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
        changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
        changOrigin默认值为true
     */

     说明：
        1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理
        2. 缺点：配置略微繁琐，请求资源时必须加前缀
