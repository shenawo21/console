import React, {Component, PropTypes} from 'react';
import {Button, Icon} from 'hen';
import classes from './collapse.less'

class Collapse extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            show : true
        } 
    }

    toggle(key) {
        console.log(key)
    }

    render() {
        const {btns = [], titles = [], hasArrow = false, uKey, children} = this.props;
        const {show} = this.state;
        return <div className={classes.collapse} id={uKey}>
            <div className={classes.header}>
                <Icon type='anticon-right' className={`fr ${hasArrow ? classes.show : classes.hide}`} onClick={this.toggle}></Icon>
                {
                    btns.map((val) => {
                        const {className, name, ...other} = val;
                        return <Button className="fr" {...other}>{name}</Button>
                    })
                }
                <ul className={classes.tit}>
                    {
                        titles.map((val) => {
                            const {className, name} = val;
                            return <li className={classes.listwidth} className={className}>{name}</li>
                        })
                    }
                </ul>
            </div>
            <div className={classes.content}>
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