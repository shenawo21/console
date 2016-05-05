import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CoreLayoutView from '../CoreLayout';
import {logout} from '../../store/auth';
import {Modal} from 'hen';

class CoreLayout extends Component {
    
    componentWillReceiveProps(nextProps) {
        //登录超时
        if (nextProps.TIMEOUT_SESSION) {
            const _context = this;
            Modal.info({
                title: '警告!!!',
                content : nextProps.TIMEOUT_SESSION.message,
                onOk(){
                    _context.goToLogin();
                }
            });
        }
        //正常登出
        if(nextProps.logoutResult){
            this.goToLogin();
        }
    }
    
    goToLogin(){
        let pathname = '/login';
        this.context.router.replace(pathname);
    }
    
    doLogout(e){
        this.props.logout();
    }
    
    render(){
        const {children} = this.props;
        return <CoreLayoutView handleLogout={this.doLogout.bind(this)}>{children}</CoreLayoutView>
    }
}

CoreLayout.propTypes = {
    children : React.PropTypes.object.isRequired
}

CoreLayout.contextTypes = {
    router : React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    const {TIMEOUT_SESSION, logoutResult} = state.auth;
    if(TIMEOUT_SESSION && TIMEOUT_SESSION.data){
        return {
            TIMEOUT_SESSION : TIMEOUT_SESSION.data
        }
    }
    
    return {
        TIMEOUT_SESSION,
        logoutResult
    }
}

const mapDispatchToProps = {
    logout
}



export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
