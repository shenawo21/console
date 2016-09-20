import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import JointView from '../components/JointView'
import Panel from 'components/Panel'
import {view, modifyItem} from '../modules/JointReducer'

class Joint extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {}
  }

  componentDidMount() {
    const {params, view} = this.props;
    if (params.id) {
      view({shopId: params.id})
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(()=> {
        nextProps.history.replace('/applic');
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
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value) {
        value.name ? delete value.name : '';
        const {params, modifyItem} = context.props;
        modifyItem({
         ruleInfo: JSON.stringify(value),
         shopId: params.id
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
    const {loading, result, params} = this.props;
    let jsonList = [], vList = [], kList = [], sName;
    if (result) {
      sName = result.name;
      if (result.ruleJson) {
        jsonList = eval('(' + result.ruleJson + ')').map(c=> {
          return {
            label: c.displayName + "：",
            name: c.ruleCode,
            rules: [{required: true, message: c.displayName+'为必填'}],
            input: {}
          }
        })
        //获取name
        vList = eval('(' + result.ruleJson + ')').map(c=> {
          return c.displayName
        })
      }
      if (result.ruleInfo) {
        //获取ruleCode
        kList = eval('(' + result.ruleInfo + ')');
      }
    }
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><JointView sName={sName} jsonList={jsonList} vList={vList} kList={kList}
                                      params={params} {...formOptions} /></Panel>
  }
}

Joint.propTypes = {
  modifyItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  modifyItem,
}

const mapStateToProps = (state) => {
  const {result, loading, isJump} = state.joint;
  return {'result': result, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(Joint)

