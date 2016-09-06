import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'

import Usercomponent from '../components/AddressEdit'
import Panel from 'components/Panel'
import {getUserInfo, editUser} from '../modules/addressEdit'

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.hedleSubmit = this.hedleSubmit.bind(this);
    }
    componentDidMount() {
        const {params, getUserInfo} = this.props;
        if (params.id) {
            getUserInfo({ uid: params.id })
        }
       

    }

    hedleSubmit(value) {
        const {params, editUser} = this.props;
        delete value.username;
        value.uid = params.id;

        var that = this;
        editUser(value).then(function (res) {
            if (res.code == 200) {
                setTimeout(() => {
                    let pathname = '/user/manage';
                    that.context.router.replace(pathname);
                }, 2000);
            }
        })
    }

    render() {
        const {result} = this.props;
        return <Panel>
            <Usercomponent hedleSubmit={this.hedleSubmit} item={result}></Usercomponent>
        </Panel>
    }
}


Container.contextTypes = {
    router: React.PropTypes.object.isRequired,
};


const mapActionCreators = {
    getUserInfo,
    editUser
}

const mapStateToProps = (state) => {
    const {result = {}, loading} = state.addressEdit;
   
    return {
        result
        // loading,
        // pages
    }
}

export default connect(mapStateToProps, mapActionCreators)(Container)