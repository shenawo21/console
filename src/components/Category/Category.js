import React, {Component, PropTypes} from 'react';
import {findBy, treeTransformer} from 'common/util';
import {Select,Tabs,Row,Col, Popover,Tag, Icon,Button,Tooltip,Spin,Cascader  } from 'hen';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
import "./category.less";

class Category extends Component {
    constructor(props){
        super(props);
        this.state ={
            // tab pane 当前选中key
            activeKey: '0',
            category:[]
        }
    }
  
    componentDidMount() {
        
    },

  _onChange(res) {
        const {selected} = this.props;
		const data = treeTransformer(res.data)
		const dumpState = {
			category:data,
			noData:!data.length,
			tabs:[{
                name:'商品分类：',
                id:0,
                children:data
	        }]
		};
		this.setState({...dumpState,dumpState})

      const {defaultValue, cascader} = this.props;

      // <Category defaultValue="02010101"/>
      if(defaultValue && !cascader && this.state.category){
         this._generateTabs(defaultValue);
      }
      
    // 默认选中第几个
      if( selected !== undefined && !defaultValue && !cascader && this.state.category){
            const selectedData = data[selected] || null;
            if(selectedData){
                this._generateTabs(selectedData.id);
            }
      }
  },

  componentWillUnmount() {

  },

  componentWillReceiveProps(nextProps) {
	 if(nextProps.hasOwnProperty('value')){
		 if(nextProps.value === null){
			 this.reset();
		 }
	 }
  },

  reset(){
	 const {dumpState} = this.state;
	 if(dumpState){
		this.setState(dumpState)
	 }

  },

  _getSelectedTab(){

    let content =  this.state.tabs.map((tab,i)=>{
        return tab.id ? <span key={i}>{tab.name} &nbsp;</span> : ''
    });

    return content.length == 1  ? '请选择' : content;

  },
  // get components
  _getCategory(){
    const {tabs,activeKey} = this.state;

    const filterTabs = tabs.filter((tab)=>{
        return !!tab.children
    })
	let key = 0;
    return <div className="category-tab-content">
      <Tabs activeKey={activeKey} onTabClick={(index)=>{
		  this.setState({
			  activeKey:index
		  })
	  }}>
        {
          filterTabs.map((tab,pane)=>{
                const next = tabs[pane+1];
                return  <TabPane tab={tab.name} key={pane}>

                    <Row>
                    {
                        tab.children.map(t=>{
                            return <Col  span="8" key={key++} onClick={this._getCategoryById.bind(this,t,pane)}>
                                    <span className={`category-item ${next && next.id === t.id  ? " selected " : ''}`}>{t.name}</span>
                                </Col>
                            })
                    }
                    </Row>
                </TabPane>
          })
        }
      </Tabs>
   </div>

  },


  /**
   * 根据用户选择生成tabs
   * @param  {any} t 当前tab数据
   * @param  {any} pane 当前pane索引
   */
  _getCategoryById(t,pane){

    let childrenCategory = t.children;
    let tabs = this.state.tabs;
    let totalTab = tabs.length;
    let isTopCategory = t.id.length == 2;

    // 这里做个兼容
    // 当顶级分类没有子分类的时候也要给他显示。
    if(isTopCategory && !childrenCategory){
        childrenCategory = t.children = [];
    }

     // 下一个分类索引
      let nextIndex = pane+1;
      // 下一个分类元素(array|object)
      let next = tabs[nextIndex];

      // 如果总数大于1 并且有子分类，则从当前索引处删除多余数据(refresh tabs)
      if(totalTab > 1 && next){
        tabs.splice(nextIndex)
      }

      // 更新状态
      this._updateTabs(tabs.concat([t]),childrenCategory ? nextIndex : pane);

  },
  /**
   * 获取最后一个tab
   */
  _getLastTab(){
    const {tabs} = this.state;
    const totalTab = tabs.length;
    const lastTab = tabs[totalTab - 1];
    return lastTab
  },

  /**
   * 更新tab数据
   * @param  {any} tabs
   * @param  {any} activeKey
   */
  _updateTabs(tabs,activeKey){
      const {onChange,onSelect} = this.props;

      activeKey = ''+ activeKey;


      // 更新状态
      this.setState({
        tabs:  tabs,
        //key  string
        activeKey: activeKey
      });

      if(onChange){
        setTimeout(()=>{
			const id = this.get();
            onChange(id);
			onSelect && onSelect(id)
        },0)
      }


  },
  get(){
	  const tab = this._getLastTab();
	  const {id} = tab;

	  return id
  },
  /**
   * 根据id生成tabs,这里的id是有规则的 01 01 01 两位分割
   * @param  {any} id
   */
  _generateTabs(id){

     const reg = /(\d\d)/g;
     const ids = id.match(reg);
     
     const totalIds = ids.length;

     let idToFind = '';


     const {tabs} = this.state;


     if(ids && totalIds){

       let root = [];
       // 默认使用第一个
       let prev = tabs[0];
       let cache = [];


       ids.map(d=>{

          // get ids
          idToFind+=d;

          const result = findBy(prev.children,idToFind);

            // 没有 children 的不靠谱 - -。
            cache.push(result)
            prev = result;

       })

        // update state
        this._updateTabs(this.state.tabs.concat(cache),totalIds - 1);


     }



  },

  //获取提示信息
  _getTip(){


    const tip = this._getSelectedTab();

    const lastTab = this._getLastTab();

    return this.state.tabs.length == 1 ? <span>{tip}</span>:   <Tooltip title={tip}>
                <span>{lastTab.name}</span>
            </Tooltip>

  },

  render() {
	const {category,noData} = this.state;
	let {cascader,onChange,defaultValue} = this.props;


    if(!category.length){
		return <div style={{width:180}}>{ noData ? <Button type="ghost">暂无数据</Button> : <Spin /> } </div>
    }

	if(cascader){
		defaultValue = Array.isArray(defaultValue) ? defaultValue : defaultValue.split(',');
	}

	return  cascader ? <Cascader options={category} {...this.props} defaultValue={defaultValue} onChange={(value)=>{
		onChange(value[value.length - 1])
	}} />　:
    <Popover overlay={this._getCategory()} trigger="click"  placement="bottomLeft" >
        <Button type="ghost" className="category-select" {...this.props}>
            {this._getTip()}
            <Icon type="down" />
        </Button>
    </Popover >
  }
}

Category.propTypes = {
   
}

Category.contextTypes = {
    props:React.PropTypes.object
}

Category.defaultProps = {
   
}

export default Category;
