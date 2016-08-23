import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {view, addItem, modifyItem, channelList, industryList} from '../modules/EditReducer'

class Edit extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
      item: {}
    }
  }

  componentDidMount() {
    const {industryList, channelList, view, params} = this.props;
    if (params.id) {
      view({shopId: params.id})
    }
    /**
     * 行业列表
     */
    channelList();
    /**
     * 店铺列表
     */
    industryList()
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (!nextProps.params.id) {
      this.setState({
        item: {}
      })
    } else {
      this.setState({
        item: nextProps.result
      })
    }
    if (nextProps.isJump) {
      setTimeout(()=> {
        const pathname = '/applic/joint/' + nextProps.result.shopId;
        nextProps.history.replace(pathname);
      }, 800);
    }
  }

  /**
   * (表格功能配置项)
   *
   * @returns (description)
   */
  getFormOptions() {
    const context = this;
    const {addItem} = context.props;
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value) {
        const {addItem, params, modifyItem} = context.props;
        console.log(value)
        context.setState({
          params: value
        })
        params.id ? modifyItem({
          ...value,
          shopId: params.id
        }) : addItem({
          ...value
        })
      },

      /**
       * (筛选表单重置)
       */
      handleReset() {
      }
    }
  }


  render() {
    const {item} = this.state;
    const {loading, result, chResult, inResult, params} = this.props;
    /**
     * 行业列表
     * @type {Array}
     */
    let inList = [];
    if (inResult) {
      inList = inResult.items.map(c=> {
        return {
          value: c.industryId,
          title: c.name
        }
      });
    } else {
      inList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    ;
    /**
     * 店铺列表
     * @type {Array}
     */
    let chList = [];
    if (chResult) {
      chList = chResult.map(c=> {
        return {
          value: c.channelCode,
          title: c.name
        }
      });
    } else {
      chList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><EditView item={item} params={params} inList={inList}
                                     chList={chList}  {...formOptions} /></Panel>
  }
}


Edit.propTypes = {

  result: React.PropTypes.object,
  channelList: React.PropTypes.func,
  industryList: React.PropTypes.func,
  addItem: React.PropTypes.func,

  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  addItem,
  modifyItem,
  channelList,
  industryList
}

const mapStateToProps = (state) => {
  const {result, loading, isJump, chResult, inResult} = state.edit;
  return {'result': result, loading, isJump, chResult, inResult};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)

