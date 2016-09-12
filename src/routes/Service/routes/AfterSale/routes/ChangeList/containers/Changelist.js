import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ChangeListView from '../components/ChangeListView'
import Panel from 'components/Panel'
import {message} from 'hen';
import {getSearch } from '../modules/changeslist'


class ChangeView extends Component {
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);
        this.handleOk = this.handleOk.bind(this);       
        this.state = {
            visible: false,
        }
    }
    
    componentDidMount() {
        const {getSearch, location,params } = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        getSearch(params)
    }
    getFormOptions() {
          const context = this;
          return {
            search(formObj){
                formObj && formObj.resetFields()
                context.setState({
                    visible: true,
                })
            },
            handleCancel() {
                context.setState({
                    visible: false,
                });
            }   
          }
      }
      handleOk (values,fresh) {
        const {getSearch} = this.props
        const context = this;
        getSearch(values).then(function(res) {
            if (res && res.data) {
                context.setState({
                    visible: false,
                });
            } else {
                message.error('无查询结果')
               
            }
        })
    }
    render() {
        const {visible} = this.state;
        const {tabelData, loading} = this.props;
        const formOptions = {
            'formOptions' : this.getFormOptions()
        }
        return <Panel title="">
                    <ChangeListView {...formOptions} tabelData = {tabelData} visible = {visible} handleOk = {this.handleOk}  />
                </Panel>
    }
}


const mapActionCreators = {
    getSearch
}
const mapStateToProps = (state) => {
    const {result, loading} = state.changeslist;
    let tabelData =[];
    tabelData.push(result);
    return {tabelData, loading };  
}
export default connect(mapStateToProps, mapActionCreators)(ChangeView)

