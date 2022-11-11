# 笔记

## 脚手架文件结构

## 关于不同版本的 vue

## vue.config.js 配置文件

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

