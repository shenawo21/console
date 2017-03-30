import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ApartView from '../components/ApartView'
import Panel from 'components/Panel'
import {view, splitOrders, unlock} from '../modules/ApartReducer'
import {message} from 'hen';
class Apart extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
      item: {},
      selectList: []
    }
  }

  componentDidMount() {
    const {view, params} = this.props;
    const id = params.id;
    if (id) {
      view({tid: id})
    }
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
        nextProps.history.go(-1);
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
    const {splitOrders, params, unlock} = context.props;
    const {selectList} = context.state;
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value, key) {
        context.setState({
          params: value
        })
        if (key == 'ok') {
          if (selectList.length == 0) {
            message.error('请选择需要拆单发货的商品！');
            return false;
          }
          splitOrders({
            ...value,
            tradesOrders: selectList,
            tid: params.id
          })
        } else {
          unlock({
            tids: params.id.split(",")
          })
        }
      },

      /**
       * (筛选表单重置)
       */
      handleReset() {

      }
    }
  }

  handleRowSelection() {
    return {
      onSelect: (record, selected, selectedRows) => {
        let selectList = selectedRows.map(c => {
          return {
            orderId: c.orderId,
            quantity: c.quantity ? c.quantity : c.num
          }
        });
        this.setState({selectList});
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        let selectList = selectedRows.map(c => {
          return {
            orderId: c.orderId,
            quantity: c.quantity ? c.quantity : c.num
          }
        });
        this.setState({selectList});
      },
      getCheckboxProps: record => ({
           disabled: record.splitNum,    // Column configuration not to be checked
      }),
    }
  }

  render() {
    const {params, item, selectList} = this.state;
    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><ApartView item={item}
                                      handleRowSelection={this.handleRowSelection()} {...formOptions} /></Panel>
  }
}


Apart.propTypes = {

  result: React.PropTypes.object,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  splitOrders,
  unlock
}


const mapStateToProps = (state) => {
  const {result, loading, isJump, lResult, sResult} = state.apart;

  return {'result': result, loading, isJump, lResult, sResult};
}
export default connect(mapStateToProps, mapActionCreators)(Apart)

