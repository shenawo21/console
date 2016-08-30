import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ApartView from '../components/ApartView'
import Panel from 'components/Panel'
import {view, splitOrders} from '../modules/ApartReducer'
import { message } from 'hen';
class Apart extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
      selectList: []
    }
  }

  componentDidMount() {
    const {view,params} = this.props;
    const id = params.id;
    if (id) {
      view({tId: id})
    }
  }

  /**
   * (表格功能配置项)
   *
   * @returns (description)
   */
  getFormOptions() {
    const context = this;
    const {splitOrders,params} = context.props;
    const {selectList} = context.state;
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value) {
        console.log(value)
        context.setState({
          params: value
        })
        if(selectList==null){
          message.error('请选择需要发货的商品！');
          return false;
        }
        splitOrders({
          ...value,
          TradesOrder:selectList,
          tid: params.id
        })
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
            quantity: c.quantity
          }
        });
        this.setState({selectList});
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        let selectList = selectedRows.map(c => {
          return {
            orderId: c.orderId,
            quantity: c.quantity
          }
        });
        this.setState({selectList});
      }
    }
  }

  render() {
    const {params} = this.state;

    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><ApartView handleRowSelection={this.handleRowSelection.bind(this)} {...formOptions} /></Panel>
  }
}


Apart.propTypes = {

  result: React.PropTypes.object,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  splitOrders
}


const mapStateToProps = (state) => {
  const {result, loading} = state.apart;

  return {'result': result, loading};
}
export default connect(mapStateToProps, mapActionCreators)(Apart)

