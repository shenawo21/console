
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
// import {  } from '../modules/docs'
import {Link} from 'react-router';
import DocsComponent from '../components/Docs'
import Panel from 'components/Panel'
import {message} from 'hen';

class Docs extends Component {
    constructor(props) {
        super(props);
        this.state = {count: props.initialCount};  //定义初始状态
    }
    componentDidMount() {
        
    }
      /**
   * handle submit
   * @param  {any} formData
   * @param  {any} e
   */
    handleSubmit(value, key){
        if(key === 'review'){
            console.log("=====review    校验通过=====");
        }else if(key === 'commit'){
            console.log(' =====commit    校验通过=====');
        }
        message.success(' =====校验通过=====   ' + value);
    }
    
    render() {
        console.log('======props=====',this.props);
        console.log('======state=====',this.state.count);
        return <Panel title="Form 表单"><Link to='/docs/table'>table</Link><DocsComponent handleSubmit={this.handleSubmit.bind(this)} /></Panel> 
    }
}

//数据限制类型
Docs.propTypes = {
    
}

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
    
}

const mapStateToProps = (state) => ({
    
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(Docs)
