import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import HomeView from '../components/HomeView'
import Panel from 'components/Panel'
import {view} from '../modules/HomeReducer'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {}
        }
    }

    componentDidMount() {
      this.props.view()
    }

    render() {
        const {result} = this.props;
        return <HomeView item={result} />
    }
}


Home.propTypes = {

    result: React.PropTypes.object,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
  view
}

const mapStateToProps = (state) => {
    const {result, loading} = state.home;
    return { 'result' : result, loading };
}

export default connect(mapStateToProps, mapActionCreators)(Home)

