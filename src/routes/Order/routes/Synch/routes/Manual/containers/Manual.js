import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ManualView from '../components/ManualView'
import Panel from 'components/Panel'
import {appList, modifyItem} from '../modules/ManualReducer'

class Manual extends Component {
  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
      //同步结果
      isVisible: false,
      item: {}
    }
  }

  componentDidMount() {
    /**
     * 获取该企业的所有店铺
     */
    this.props.appList()
  }

  componentWillReceiveProps(nextProps, preProps) {
    this.setState({
      item: nextProps.result
    })
    if (nextProps.isJump) {
      this.setState({
        isVisible: true
      });
      setTimeout(()=> {
        this.setState({
          isVisible: false
        });
      }, 10000)
    }
  }

  getFormOptions() {
    const context = this;
    const {modifyItem}=context.props;
    return {
      handleSubmit(value, key) {
        console.log(value)
        context.setState({
          params: value
        });
        key == 'save' ? modifyItem({...value}) : '';
      },
      handleReset() {
      }
    }
  }

  render() {
    const {params, isVisible, item} = this.state;
    const {loading, result, appResult} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    /**
     * 店铺列表
     * @type {Array}
     */
    let shopList = [];
    if (appResult) {
      shopList = appResult.map(c=> {
        return {
          value: c.shopId,
          title: c.name,
          disabled: (c.status != 'use' || c.enabled == false) ? true : false
        }
      });
    } else {
      shopList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    return <Panel title=""><ManualView shopList={shopList} item={item} isVisible={isVisible} {...formOptions}/></Panel>
  }
}

Manual.propTypes = {
  result: React.PropTypes.object,
  modifyItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  appList,
  modifyItem
}

const mapStateToProps = (state) => {
  const {result, loading, appResult, isJump} = state.manual;
  return {'result': result, loading, appResult, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(Manual)
