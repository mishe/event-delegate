
# 类似JQuery的on

## 默认只支持$(selector)

## 可以使用的api

### 事件绑定 $(selector).on(evt,[selector,]fn)

* $(selector).on(evt,fn) 给当前的元素集合绑定事件
* $(selector).on(evt,selector,fn) 给当前的元素集合下的selector元素绑定事件

### 事件解绑 $(selector).off([event][,fn])

* $(selector).off() 解绑所有事件
* $(selector).off(event) 解绑所有的event事件* 
* $(selector).off(event,fn) 解绑指定的事件和handle，目前还有bug
 
