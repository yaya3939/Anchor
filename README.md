**待解决**

- 需要的 array2：
  在 anchor list 里显示的，anchorDetails：记录每日进度（包含颜色），每日具体情况。
  A、直接并进 anchorItem 里，多加两个 key，progress&comment、类型 array，然后在 anchor 页面按照索引一一对应显示
  B、新建一个每个 anchor 的 db，每天的 progress 和 comment 在一个 object 里储存
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

**1**

- 装了两个 css 包，react-boostrap 和 material

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
- √ 把不填完不能提交的限制做好。
  用 if 函数做的，可能有更简单的方法。
  复习了 required 的用法，在本例中不适用。
  复习了 object 的比较方法。不能直接用===/==，对顺序、键值一致的函数可以用：
  JSON.stringify(object1) === JSON.stringify(object2);  
  或者是  Object.entries(object1).toString() === Object.entries(object2).toString(); （es6 语法）。
  不一样的只能历遍内容来比较了。
- √1/4 component tree 做好
- 试着把一些 props 改成 render props
- 学 react-router，组建 anchor 页面

**1/10**

- router 开始。anchors page 进行中。
- navi bar 没有按照当前页面标识点亮，加载时的 ux 极差
- anchors：三个区块：
  没有任何 item 的时候：你还没有任何 anchor 记录，快去创建一个吧！
  进行时：显示当月全部记录，颜色，灰色+四个等级差， 0 和未评价显示灰色。一行八个，四行。
  未开始（暂时不做，必要性不强）
  已完成：放在一个 toggle 栏里，显示最后一个月，其余显示与进行时一致
- 内置两个 item，
  设置当月月份的颜色表，每个格子要和日期对应，然后加上 object 里的 rate，color 去显示 color
  颜色，利用 date 确认位置，rate 和 color，rbga 来控制颜色
  鼠标悬浮出现日期和 comment
  把这两个 item 的显示做好。加一个已完成的 toggle，加两个内置 item 测试
  item：id，name，range，
- 每个 anchor item 的详细页面。/anchors/:anchorId
  一个颜色显示区域：限制长宽，超出部分内部滑动。最后有一个每个等级有多少天的总结
  一个每日记录显示区域：日期+内容

**1/12**

- 整理依赖包：把 navbar 用的 bootstrap 改成 material-ui/react router
- 重新整理 css，改成全页面双栏，随着页面缩进，双栏纵向叠加
- 1/13 完成
