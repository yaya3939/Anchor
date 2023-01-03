**1**

- 装了两个 css 包，react-boostrap 和 material

**2**

- √ navibar 的背景色改成黑色，点击后的颜色改成白色

**12/31**

- 待办事项：把 input 框做好
- 实际上需要输入有：title 选颜色 时间
- 可输入的 title，选一个颜色。
- 时间段选择框：点击 time，跳出日历框，选择最终日期，自动从当日开始计算天数，不选择就会无限重复，选择的话显示剩余天数
- 1/1 做完

**1/1**

- color 的值要在 picker，anchor table，progress 三个组件里使用
- 把 title，color，days 传输到 parent component
- 组建 anchorItem，anchorItems
- 1/3 finish

**1/3**

- 需要的 array：
  √ 1、在 home list 的 anchor table 里显示的，anchorItems：记录每个 anchor 的 title，颜色，日期。
  2、在 anchor list 里显示的，anchorDetails：记录每日进度（包含颜色），每日具体情况。
- 怎么根据日期显示 anchor：
  if (from=to){return all}
  else(from!==to){
  if(current<=to){
  return all
  }else{
  return !==item
  }
  }
  这个似乎是需要数据库才能完成的事项，先拖着吧
- √ 把不填完不能提交的限制做好。
  用 if 函数做的，可能有更简单的方法。
  复习了 required 的用法，在本例中不适用。
  复习了 object 的比较方法。不能直接用===/==，对顺序、键值一致的函数可以用：
  JSON.stringify(object1) === JSON.stringify(object2);  
  或者是  Object.entries(object1).toString() === Object.entries(object2).toString(); （es6 语法）。
  不一样的只能历遍内容来比较了。
- component tree 做好
- 学 react-router，组建 anchor 页面
