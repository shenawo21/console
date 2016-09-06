import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'

import Usercomponent from '../components/AddressAdd'
import Panel from 'components/Panel'
import {getUserInfo, addUser} from '../modules/addressadd'

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.hedleSubmit = this.hedleSubmit.bind(this);
    }
    componentDidMount() {

    }
    hedleSubmit(value) {
        var that = this; 
        this.props.addUser(value).then(function(res){
            if(res.code == 200){
                setTimeout(() => {
                    let pathname = '/user/manage';
                    that.context.router.replace(pathname);
                }, 2000);
            }
        })
    }

    render() {

        return <Panel>
            <Usercomponent hedleSubmit={this.hedleSubmit}></Usercomponent>
        </Panel>
    }
}


Container.contextTypes = {
    router: React.PropTypes.object.isRequired,
};


const mapActionCreators = {
    getUserInfo,
    addUser
}

const mapStateToProps = (state) => {
    //const {result, loading} = state.userAdd;
    // const {lists = [], pages = {}} = result || {};
    return {
        // lists,
        // loading,
        // pages
    }
}

export default connect(mapStateToProps, mapActionCreators)(Container)