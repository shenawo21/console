import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import AddView from '../components/AddView'
import Panel from 'components/Panel'
import {queryList, getListLogistic, addLogistic} from '../modules/AddReducer'

class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const {getListLogistic, queryList} = this.props;
        getListLogistic();
        queryList();
    }

    render() {
        const {listResult, queryResult,addLogistic} = this.props;
        const options = {
            sourceData: listResult,
            distData: queryResult,
            addLogistic
        }

        return <Panel title=""><AddView {...options}/></Panel>
    }
}


Add.propTypes = {
    queryList: React.PropTypes.func,
    getListLogistic: React.PropTypes.func,
    addLogistic : React.PropTypes.func,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    getListLogistic,
    queryList,
    addLogistic
}

const mapStateToProps = (state) => {
    const {listResult, queryResult} = state.addLogistics;
    console.log(state.addLogistics,121221212)
    return { listResult, queryResult};
}

export default connect(mapStateToProps, mapActionCreators)(Add)

