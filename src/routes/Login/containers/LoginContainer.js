import React,{Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginComponent from '../components/Login'

export class Login extends Component {
  constructor(props){
    super(props)
    this.onLogin = this.onLogin.bind(this)
  }
  onLogin(){

  }
  render() {
    return (
      <LoginComponent login={this.onLogin}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
