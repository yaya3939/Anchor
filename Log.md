**可能性**

- progress 可以提供三个选择：量，时间，评分
  评分最简单，五星制，即现有程序。量和时间的逻辑是一致的：自定义五个程度代表的具体数值，在总结页面可以看到所有的量的总和，还可以显示本月，本周的 detail，还有历史 detail
  另一个选择：保留 progress 新增一个记录量/时间的模块，自定义数量 自定义单位
- 给 anchor 分组
- 把 todo list 的模型加入 record 的输入和记录
- todo list content editable
- record text editable
- cal heat map in anchor page
- another kind of cal heatmap for anchors:
  last 21 days heatmap, hightlight from

  **DONE**

  - [x] 完成的 anchor 自动排序到未完成的下面

**12/31**

- [x] (1/1 做完) 把 input 框做好:
      实际上需要输入有：title 选颜色 时间
      可输入的 title，选一个颜色。
      时间段选择框：点击 time，跳出日历框，选择最终日期，自动从当日开始计算天数，不选择就默认 everyday，选择的话显示剩余天数

**1/1**

- color 的值要在 picker，anchor table，progress 三个组件里使用
- 把 title，color，days 传输到 parent component
- 组建 anchorItem，anchorItems
- 1/3 finish

**1/3**

- 需要的 array：
  - [x] 在 home list 的 anchor table 里显示的，anchorItems：记录每个 anchor 的 title，颜色，日期。
  - [x] 把不填完不能提交的限制做好:
        用 if 函数做的，可能有更简单的方法。
        复习了 required 的用法，在本例中不适用。
        复习了 object 的比较方法。不能直接用===/==，对顺序、键值一致的函数可以用：
        `JSON.stringify(object1) === JSON.stringify(object2);  `
        或者是  `Object.entries(object1).toString() === Object.entries(object2).toString();` （es6）。
        不一样的只能历遍内容来比较了。
  - [x] (1/4) component tree 做好
  - [x] 试着把一些 props 改成 render props
  - [x] react-router，组建 anchor 页面

**1/10**

router 开始。anchors page 进行中。

- [x] navi bar 没有按照当前页面标识点亮，加载时的 ux 极差
- anchors page：
  - [x] 没有任何 item 的时候：你还没有任何 anchor 记录，快去创建一个吧！
        cause anchorForm display forever, so don't need it now.
  - [ ] 进行时：显示当月全部记录，颜色，灰色+四个等级差， 0 和未评价显示灰色。一行八个，四行。
        未开始（暂时不做，必要性不强）
  - [x] 已完成：放在一个 toggle 栏里，显示最后一个月，其余显示与进行时一致
- 内置两个 item，
  设置当月月份的颜色表，每个格子要和日期对应，然后加上 object 里的 rate，color 去显示 color
  颜色，利用 date 确认位置，rate 和 color，rbga 来控制颜色
  鼠标悬浮出现日期和 comment
  把这两个 item 的显示做好。加一个已完成的 toggle，加两个内置 item 测试
  item：id，name，range，
- 每个 anchor item 的详细页面。/anchors/:anchorId
  - [ ] 一个颜色显示区域：限制长宽，超出部分内部滑动。最后有一个每个等级有多少天的总结
  - [x] 一个每日记录显示区域：日期+内容。参考 ui：事线

**1/12**

- 整理依赖包：把 navbar 用的 bootstrap 改成 material-ui/react router
- 重新整理 css，改成全页面双栏，随着页面缩进，双栏纵向叠加
- 1/13 完成

**1/13**

- 把 react-calendar-heatmap 的源码学一下，ds.js 学一下，把 anchor 的每日数据可视化做出来
- [x] anchors 页面的两个页面要怎么做呢？
      ~~1、grid 分栏+click 显示/conditional rendering，但是缩页面以后的显示的上下栏形式,所以 NG~~
      2、anchors route 里嵌套新的 router 就好了，之前想到过的，忘了 hhh。
      像 contact 一样，左边是 navibar 的感觉，右边 child 显示
      但是还是会有屏幕缩进带来的显示问题
      直接建了新的页面
- [x] 不要忘记最后为了 ux，要加上 loading 状况怎么做

**1/17**

- [x] 用 api 把 anchors 页面做了，还剩 records 的颜色问题。
      在 element 指代的 rect 里是可以用 style="fill:red" 进行更改的，但是不知道怎么在 js 里完成
      试试到时候自己改造一下 api？
      试了两个 api 都无法满足需求，打算自己做了
- [x] 页面缩进后需要把每个 item 的 table 居中。试试 flex 布局？
- [x] list 的 responsibility 也要改进，试试改成%
- [x] 把 keydown 改成 keyup

**3/4**

- [x] 数据库：以 user 为单位，还是以 anchor 为单位，建立 anchors。anchor 单位了。
- [x] 先不加入 client，要不然测试后端的时候会因为无法重复 set header 出问题

**3/5**

- backend update username, anchor, record
- [x] 时间差问题：date object 是世界时间，比东八少 8h，但是 localString 只会在 string 的时候改成 local，推到 database 还是会变成 object date，然后变成世界时间.
      浏览器自动转换

**3/6**

- start anchorReducer, import localforage & update TodoList
- 复习了 useState, 因为 set local items 老是不成功，是因为 items 的更新的原因，在没有重新渲染 TodoList 的时候，items 其实还没有更新，最新值储存在 setItems 里，等到再渲染之后 items 才变成最新值，所以在 setItems 之后在渲染之前储存到本地的 items 还是旧版本的 items
- [x] solution：用 useEffect 来 set local 的值

**3/7**

- [x] todoList 不够响应式，li element 会影响 block 的宽度。
      而且 mui 的 grid 下面的那个不知道为什么不占整个 vw，而是随着 todoList 的大小改变，导致 todoList 无法居中
      感觉还是 width/max-width/min-width 的组合问题

**3/8**

- 复习了 array.filter&array.some&array.find。
  filter：callback 需要给 boolean 结果，输出值为 array，所以不能 filter 套 filter；
  find：返回满足条件的第一个值，或者 undefine
  some：返回 boolean
  这些函数里面的参数一样是可以 deconstruction 的

**3/13**

- [x] 把 dashboard 的 anchor table 和 anchor page 的 record block 都从 flex 布局改成 grid。
- [x] update anchorInfo
- [ ] update record text
- [ ] 看情况，把 createAsyncThunk 改成 RTK query

**3/14**

- [x] 改善 deleteAnchor confirm 取消也跳转回 dashboard
      move window.confirm from reducer to page component
- [x] improve auto close of colorPicker&datePicker
      lifting state up
- [x] change Flex into Grid
      dashboard anchorList recordList
- [x] improve wrong days shown when to is null(click datePicker ? no to : to === null)
      conditional syntax
- [x] improve diffDays, smt it will be 1 day more than needed
      date-fns

**3/16**
cal heatmap:

- [x] get dates [from,...,today].
      in anchors page, only show last 21 days,
      in anchor page, now: show all, past: show [from,...,to]
- [x] combine dates with records. get full data
      how to compare date : getTime()比较，Date 相减==0. Date 不能直接比较
- [x] according data, use d3 to create map
      学了 d3 但最后还是用的 api，没有自己做
- [ ] 在已有 heatmap 且 data 不改变时，只渲染一次 heatmap
