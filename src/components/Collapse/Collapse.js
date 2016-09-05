import React, {Component, PropTypes} from 'react';
import {Button, Icon} from 'hen';
import classes from './collapse.less'

class Collapse extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            toggleFlag : false
        } 
    }

    toggle(e) {
        const {toggleFlag} = this.state
        this.setState({
            toggleFlag : toggleFlag ? false : true
        })
    }

    render() {
        const {btns = [], titles = [], hasArrow = false, children} = this.props;
        const {toggleFlag} = this.state;
        return <div className={classes.collapse}> 
            <div className={classes.header} onClick={this.toggle}>
                <Icon type={!toggleFlag ? 'right' : 'down'} className={`fr ${hasArrow ? classes.show : classes.hide}`}></Icon>
                {
                    btns.map((val, index) => {
                        const {className, name, handle, ...other} = val;
                        return <Button key={index} className="fr" onClick={(e)=>{
                            e.cancelBubble = true
                            e.stopPropagation && e.stopPropagation();
                            handle(e)
                        }} {...other}>{name}</Button>
                    })
                }
                <ul className={classes.tit}>
                    {
                        titles.map((val,index) => {
                            const {className, name} = val;
                            return <li key={index} className={classes.listwidth} className={className}>{name}</li>
                        })
                    }
                </ul>
            </div>
            <div className={toggleFlag ? classes.content : classes.content +' '+classes.hide}>
                {children}
            </div>
        </div>
    }
}

Collapse.propTypes = {
    btnOptions: React.PropTypes.array,
    titleOptions: React.PropTypes.array,
    isShow : React.PropTypes.bool,
    uKey : React.PropTypes.number
}

export default Collapse;