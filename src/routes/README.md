### 通过`redux-cli` 创建路由一级路由文件

> 创建名称为`product`含有`table、search`路由组件

```
redux g routes product --type=table --search=true --quick=true
```

- 不需要search检索时，`--search=false`
- 不需要表格快捷按钮时，`--quick=false`


> 创建名称为`product`含有的`form`路由组件

```
redux g routes product --type=form 
```

> 注意

- 创建路由组件仅为基础模版，里面里面布局和字段还须根据业务需求进行填充
- 配置routes文件中index.js文件下, 路由配置product
```
    getChildRoutes(location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./Repo').default(store),
          require('./Docs').default(store),
          require('./Product').default(store)   
        ])
      })
    }
```
- 配置common中menu文件（若菜单是后台数据动态加载，则不用配置）
```配置product菜单
{
    title: 'product',
    url: '/product',
    icon: 'user',
    when: '',
    children: [
      {
        title: 'product',
        url: '/product',
        icon: 'wb-dashboard',
        when: '',
      }
    ]
  }
```

### 查看帮助

```
redux g -h
```