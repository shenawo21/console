import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import LogisticsView from '../components/LogisticsView'
import Panel from 'components/Panel'
import {queryList, getListLogistic, addLogistic, setDefault} from '../modules/LogisticsReducer'

class Logistics extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    //设为默认
    _isDefault(id) {
        const { setDefault } = this.props;
        setDefault({ configId: id });
    }

    componentDidMount() {
        const {getListLogistic, queryList} = this.props;
        getListLogistic();
        queryList();
    }

    render() {
        const {listResult, queryResult, loading, addLogistic } = this.props;
        const options = {
            sourceData: listResult,
            distData: queryResult,                //加载组件时，表格从容器里获取初始值
            setDefault: this._isDefault.bind(this),
            addLogistic
        }

        return <Panel title=""><LogisticsView {...options}/></Panel>
    }
}


Logistics.propTypes = {
    queryList: React.PropTypes.func,
    setDefault: React.PropTypes.func,
    getListLogistic: React.PropTypes.func,
    addLogistic : React.PropTypes.func,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    getListLogistic,
    queryList,
    setDefault,
    addLogistic
}

const mapStateToProps = (state) => {
    const {listResult, queryResult, loading} = state.logistics;
    return { listResult, queryResult, loading };
}

export default connect(mapStateToProps, mapActionCreators)(Logistics)

