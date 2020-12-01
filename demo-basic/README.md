### vue3

#### Vue2与 Vue3 的对比

* Vue2与Vue3对响应式数据的设置不同。Vue2对于已经创建的实例，Vue2不允许动态添加根级别的响应式 `property`。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式。还可使用 `vm.$set` 实例方法；而Vue3采用Es6的 **`Proxy`** 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。
    
```
Object.defineProperty(data, "count", {
    get() {},
    set() {}
 })
     
new Proxy(data, {
    get(key) {},
    set(key, value) {}
})
```
* 对TypeScript支持不友好（所有属性都放在了this对象上，难以推断组件的数据类型）
* 大量的API挂载在Vue对象的原型上，难以实现TreeShaking。
* 架构层面对跨平台dom渲染开发支持不友好
* 更方便的支持了 jsx
* 对虚拟DOM进行了重写、对模板的编译进行了优化操作
* Vue 3 的 Template 支持多个根标签，Vue 2 不支持。。。

#### setup 函数

**setup() 函数**是 vue3 中，专门为组件提供的新属性。它为我们使用 vue3 的 Composition API 新特性提供了`统一的入口`, **setup 函数会在 beforeCreate 、created 之前执行, vue3也是取消了这两个钩子，统一用setup代替, 该函数相当于一个生命周期函数**，vue中过去的data，methods，watch等全部都用对应的新增api写在setup()函数中。

```python
setup(props, context) {
    context.attrs
    context.slots
    context.emit
    
    return {
        
    }
  }
```

* props: 用来接收props数据
* context：用来定义上下文，上下文对象中包含了一些有用的属性，这些属性在vue2中需要通过`this`才能访问到，在`setup()`函数中无法访问到this，是个undefind
* 返回值: return {}, 返回响应式数据, 模版中需要使用的函数


#### ref() 函数

**ref() 函数**用来根据给定的值创建一个 **`响应式的数据对象`**，ref() 函数调用的返回值是一个对象，这个对象上只包含一个 value 属性, 只在setup函数内部访问ref函数需要加 **`.value`**

```python
import { defineComponent, ref, computed, reactive } from "vue";

setup() {
    const count = ref(0);
    const double = computed(() => {
      return count.value * 2;
    });
    const increase = () => {
      count.value++;
    };
    return {
      count,
      increase,
      double,
    };
  },
  
 显示时直接调用即可。

基本类型值（String 、Nmuber 、Boolean 等）或单值对象（类似像 {count: 3} 这样只有一个属性值的对象）使用 ref

引用类型值（Object 、Array）使用 reactive
```

#### reactive 函数

**reactive() 函数**接收一个 **`普通对象`** ，返回一个简单的数据对象, 想要使用创建的响应式数据也很简单，创建出来之后，在setup中return出去，直接在template中调用即可。（**`一般结合toRefs() 函数搭配使用`**）


#### toRefs() 函数

**toRefs() 函数**可以将 reactive() 创建出来的响应式对象，转换为普通的对象，只不过，这个对象上的每个属性节点，都是 **ref() 类型的响应式数据**

```python
const data: DataProps = reactive({
  count: 0,
  double: computed(() => data.count * 2),
  increase: () => {
    data.count++;
  },
});

const refData = toRefs(data);

return {
  ...refData,
};
```

#### isRef() 函数

isRef() 用来判断某个值是否为 ref() 创建出来的对象

```python
setup(props, context) {
    const name: string = 'vue'
    const age = ref<number>(18)
    console.log(isRef(age)); // true 
    console.log(isRef(name)); // false
    return { 
        age, 
        name 
    }
 }
```

#### 生命周期函数

可以直接导入 onXXX 一族的函数来注册生命周期钩子：

```python
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  },}
```

##### 与 2.x 版本生命周期相对应的组合式 API

1. ~~beforeCreate~~ -> 使用 setup()
2. ~~created~~ -> 使用 setup()
3. beforeMount -> onBeforeMount
4. mounted -> onMounted
5. beforeUpdate -> onBeforeUpdate
6. updated -> onUpdated
7. beforeDestroy -> onBeforeUnmount
8. destroyed -> onUnmounted
9. errorCaptured -> onErrorCaptured


#### watch() 函数

**watch 函数**用来侦听特定的数据源，并在回调函数中执行副作用。**默认情况是懒执行的**，也就是说仅在侦听的源数据变更时才执行回调。

##### 1、监听单个值

```python
const age = ref<number>(18);

// 修改age 时会触发watch 的回调, 打印变更后的值

watch(age, (newVal, oldVal) => {
  console.log("newVal", newVal, "oldVal", oldVal);
});
```

##### 2、监听多个值

修改age 时会触发watch 的回调, 打印变更前后的值, 此时需要注意, 更改其中一个值, **都会执行watch的回调**

```python

const state = reactive<Person>({ name: "vue", age: 10 });

watch(
  [() => state.age, () => state.name],
  ([newName, newAge], [oldName, oldAge]) => {
    console.log(newName);
    console.log(newAge);
    console.log(oldName);
    console.log(oldAge);
  }
);
```

##### 3、stop() 停止监听

```python
setTimeout(() => {
  stop(); // 此时修改时, 不会触发watch 回调
  state.age = 1000;
  state.name = "vue3-";
}, 1000); // 1秒之后讲取消watch的监听
```


#### teleport属性

`teleport` 是一种能够将我模板移动到 DOM 中 Vue app 之外的其他位置的属性，就有点像哆啦A梦的“任意门”。

**场景**：像 `Modals`, `Toast` 等这样的元素，很多情况下，需要将它完全的和 Vue 应用的 `DOM` 完全剥离，管理起来反而会方便容易很多。原因在于如果将其嵌套在 Vue 的某个组件内部，那么处理嵌套组件的`定位`、`z-index` 和`样式`就会变得很困难。

另外，像 `Modals`, `Toast`  等这样的元素需要使用到 Vue 组件的状态（data 或者 props）的值，然后在 Vue 应用的范围之外渲染它。

运用：

```python
// 子组件 Modals.vue

<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2><slot>teleport运用</slot></h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

// 父组件
<modals :isOpen="modalisOpen" @close-modal="handleCloseModal"></modals>

// 根文件 index.html


<div id="app"></div>
<div id="modal"></div>
```