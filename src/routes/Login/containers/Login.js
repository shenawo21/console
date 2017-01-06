import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import LoginComponent from '../components/Login'
import {login, vCode} from 'store/auth'
import Cookie from 'js-cookie';
import store from 'store2';


const sessionId = 'sessionId';
const imgUrl = __PROD__ ? 'imageServlet' : 'suneee-cloud-ep/imageServlet';

export class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.uptVcode = this.uptVcode.bind(this);
    
    this.state = {
      vcodeUrl: imgUrl
    }
  }

  componentDidMount() {
    this.uptVcode();
    // setTimeout(() => {
    //   alert(1);
    //   this.uptVcode();
    // }, 6000)
    
  }

  getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;
    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  } 

  handleReset(e, form) {
    e.preventDefault();
    form.resetFields();
  }

  handleSubmit(e, form) {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      store.clearAll();
      Cookie.remove(sessionId);
      this.props.login(values);
      // .then((res) => {
      //   if(res.message == "验证码错误!"){
      //     this.uptVcode()
      //   }
      // });
    });
  }
  
  uptVcode() {
      this.setState({
          vcodeUrl : imgUrl+'?t='+new Date().getTime()
      });
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null && nextProps.user !== undefined && nextProps.user !== false) {
      let pathname = '/';
      this.context.router.replace(pathname);
    }
  }

  componentWillUnmount() {
    document.onkeydown = () => { }
  }

  render() {
    const {loading} = this.props;
    const {vcodeUrl} = this.state;
    return (
      <LoginComponent handleSubmit={this.handleSubmit} handleReset={this.handleReset} vCode={this.uptVcode} vcodeUrl={vcodeUrl} isLoading={loading}/>
    )
  }
}

Login.propsTypes = {
  user: React.PropTypes.object.isRequired,
  vCode: React.PropTypes.object.func,
  loading: React.PropTypes.bool.isRequired
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const {auth} = state;
  const {user, loading} = auth;
  if (user && user.sessionId) {
      Cookie.set(sessionId, user.sessionId);
  }
  return {
    user,
    loading
  }
}

const mapDispatchToProps = {
  login,
  vCode
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
