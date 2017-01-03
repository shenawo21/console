import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {addItem, view, modifyItem, queryList} from '../modules/EditReducer'


class Edit extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.imageImg = this.imageImg.bind(this);
    this.state = {
      item: null,
      imageList: []
    };
  }

  imageImg(files) {
    this.setState({
      imageList: files
    })
  }

  componentDidMount() {
    const {params, view, queryList} = this.props;
    if (params.id) {
      view({categoryCode: params.id})
    }
    /**
     * 类目列表
     */
    queryList()
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.params.type !== 'modify') {
      this.setState({
        item: null
      })
    } else {
      this.setState({
        item: nextProps.result,
        imageList: nextProps.result ? nextProps.result.image : [],
      })
    }
    if (nextProps.isJump) {
      setTimeout(()=> {
        this.context.router.push('/goods/category')
      }, 600);
    }
  }

  /**
   * handle submit
   * @param  {any} formData
   * @param  {any} e
   */
  getFormOptions() {
    const context = this;
    return {
      /**
       * (表单提交)
       *
       * @param value (description)
       */

      handleSubmit(value) {
        const {addItem, params, modifyItem} = context.props;
        if (context.state.imageList) {
          value.image = (typeof context.state.imageList) === 'string' ? context.state.imageList : context.state.imageList.length ? context.state.imageList[0].name : '';
        }
	      ////去掉分类名称中所有空格
        if(value.name){
          value.name = value.name.replace(/\s+/g, "")
        }
        /**
         * 判断 params.type是否存在
         */
        params.type == 'modify' ? modifyItem({
          ...value,
          categoryCode: params.id
        }) : params.type == 'add' ?
          addItem({
            ...value,
            parentCode: params.id
          }) : addItem({
          ...value,
          parentCode: value.parentCode ? value.parentCode[value.parentCode.length - 1] : ''
        })
      },

      /**
       * (重置)表单
       */

      handleReset(){
        context.setState({
          imageList: []
        })
      }

    }
  }

  render() {
    const {item, imageList} = this.state;
    const {loading, result, cResult, params} = this.props;
    const loop = (lists) => {
      return lists && lists.map(a => {
          let children = a.level < 2 ? loop(a.children) : '';
          if (children) {
            return {
              value: a.categoryCode + '',
              label: a.name,
              children
            }
          } else {
            return {
              value: a.categoryCode + '',
              label: a.name
            }
          }
        })
    }
    console.log(loop(cResult),'result');
    const formOptions = {
      loading,
      result,
      ...this.getFormOptions()
    };

    return <Panel title=""><EditView params={params} item={item} cList={loop(cResult)} imageList={imageList}
                                     imageImg={this.imageImg} formOptions={formOptions} /></Panel>
  }
}

//数据限制类型
Edit.propTypes = {
  addItem: React.PropTypes.func,
  view: React.PropTypes.func,
  queryList: React.PropTypes.func,
  modifyItem: React.PropTypes.func,
  loading: React.PropTypes.bool,
  result: React.PropTypes.object,
}

Edit.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapActionCreators = {
  addItem,
  view,
  modifyItem,
  queryList
}

const mapStateToProps = (state) => {
  const {result, loading, isJump, cResult,addResult,mResult} = state.edit;
  return {'result': result, loading, isJump, cResult,addResult,mResult};

}
export default connect(mapStateToProps, mapActionCreators)(Edit)
