import React, { Component, PropTypes }  from 'react';

import { Select, Input, Radio, Button, DatePicker, Checkbox, InputNumber, Icon, Form, Cascader, Row, Col } from 'hen';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const createForm = Form.create;
const FormItem = Form.Item;
import formless from './form.less';

import Panel from 'components/Panel'

class Forms extends Component {
    /**
     * 重置表单
     * @param  {any} e
     */
    handleReset(key, e) {
        e.preventDefault();

        const {form, onReset, submitAfterReset, onSubmit, resetNumber} = this.props;
        form.resetFields();
        let values = form.getFieldsValue();
        onReset && onReset(e);

        if (resetNumber) {
            values = {...values, ...resetNumber };
        }
        //如果需要在重置后提交表单，可以通过此属性配置： 例如 搜索的时候
        submitAfterReset && onSubmit(values, key);

    }
    /**
     * 提交表单
     * 执行属性里面的onSubmit方法
     * @param  {any} e
     * @param  {any} key  button标识
     */
    handleSubmit(key, e) {
        e.preventDefault();
        const {form, onSubmit, resetNumber} = this.props;
        form.validateFields((errors, values) => {
            if (!!errors) {
                if (__DEV__) {
                    console.log('Errors in form!!!', errors, form.getFieldsValue());
                }
                return;
            }
            //   TODO： 建议在datepicker里面自己处理
            Object.keys(values).forEach((name) => {
                if (values[name] instanceof Date) {
                    if (/date/ig.test(name)) { //需要显示日期时间
                        values[name] = this.formatDate(values[name], true);
                    } else {
                        values[name] = this.formatDate(values[name]);
                    }
                }
                
                if(values[name] === 'true' || values[name] === 'false'){
                    values[name] = Boolean(values[name]);
                }
            });
            if (resetNumber) {
                values = {...values, ...resetNumber}
            }
            onSubmit(values, ...arguments);
        });
    }
    /**
     * 日期格式化
     * @param  {any} value
     * @param  {any} showTime 是否显示time
     */
    formatDate(value, showTime) {
        if (!value) return null;
        let _date = new Date(value),
            year = _date.getFullYear(),
            month = _date.getMonth() + 1,
            date = _date.getDate(),
            hours = _date.getHours(),
            mins = _date.getMinutes(),
            second = _date.getSeconds(),
            _dateTime = null;

        month < 10 && (month = "0" + month);
        date < 10 && (date = "0" + date);
        hours < 10 && (hours = "0" + hours);
        mins < 10 && (mins = "0" + mins);
        second < 10 && (second = "0" + second);
        _dateTime = year + "-" + month + "-" + date;
        if (showTime) {
            _dateTime += " " + hours + ":" + mins + ":" + second;
        }
        return _dateTime;
    }
    /**
     * 获取验证状态信息
     * @param  {any} field
     */
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
    /**
     * 渲染buttons
     * 如果设置了 buttonOption 则根据buttonOption进行相关配置
     */
    renderButton() {
        let {horizontal, buttonOption = {}} = this.props, context = this;
        let {col = true, ok, cal, okIcon, calIcon, span, cancel = true, loading = false, buttons = []} = buttonOption;
        let cols = col ? (horizontal ? { span: 22, offset: 2 } : { span: 8, offset: 5 }) : null;
        let colSpan = horizontal ? "24" : span || '8';
        
        return (<Col span={colSpan}>
            <FormItem wrapperCol={cols}>
            {
                buttons.length ? buttons.map((btn, index)=>{
                        let {className = '', type='default', key, icon, name, handle, loading = false} = btn;
                        if(key === 'reset'){
                            return <Button key={index} key={index} htmlType="reset" loading={loading} className={formless.btn+' '+`${className}`} type={type} onClick={handle || context.handleReset.bind(context, key)}>{icon ? <Icon type={icon} /> : ''} {name}</Button>
                        }
                        return <Button key={index} className={formless.btn+' '+`${className}`} loading={loading} type={type} onClick={handle || context.handleSubmit.bind(context, key)}>{icon ? <Icon type={icon} /> : ''} {name}</Button>
                    }) : <div>
                    <Button className={formless.btn} type="primary" onClick={this.handleSubmit.bind(this,'ok')} loading={loading}>{okIcon ? <Icon type={okIcon} /> : '' } {ok || '提交'}</Button> 
                    {cancel ? <Button htmlType="reset" onClick={this.handleReset.bind(this, 'reset')}>{calIcon ? <Icon type={calIcon} /> : ''}{cal || '重置'}</Button> : ''}
                </div>
            }
            </FormItem>
        </Col>)
    }
    /**
     * 渲染FormItem
     * @param  {any} item 配置项
     */
    renderFormItem(item) {
        const {form, items, allDisabled} = this.props;

        const { getFieldProps } = form;
        const {initValue} = items;

        let {name, disabled, fieldOptions} = item;
        /**
         * 获取field相关的信息
         * @param  {any} name antd form 会根据这个name生成相关的信息
         * @param  {any} options 选项具体参考网站
         */
        let getCustomFieldProps = (name, options) => {
            //TODO: 解决校验中validator 需要form的问题
            if(item.rules && Object.prototype.toString.call(item.rules) === '[object Function]'){
              item.rules = item.rules(form);
            }
            let option = {
                id:`fm-${name}`,
                rules: item.rules || [],
                initialValue: item.select && typeof initValue[name] ==='boolean' ? initValue[name] + '' : initValue[name],
                valuePropName: item.checkbox ? 'checked': 'value',
			    ...options
            }
            return {...getFieldProps(name, option), name, disabled : disabled || allDisabled }
        }

    let fieldProps = name ? getCustomFieldProps(name, fieldOptions) : {};
    
    //input输入框
    if (item.input) {
        return <Input {...fieldProps} {...item.input} />
    }
    //下拉选择
    if (item.select) {
        let {optionValue, tipValue, placeholder, onSelect, ...other} = item.select;
        let options = Object.assign([], optionValue);//防止直接修改引用类型数据
        !placeholder && tipValue && options.unshift({
            value: null, title: tipValue
        })
        return <Select size='large' defaultValue={fieldProps.value} style={{ width: 190 }} placeholder={placeholder} onSelect={(value) => {onSelect && onSelect(value, name, form)}} {...fieldProps} {...other} >
            {
                options.map((val, i) => {
                    typeof val.value === 'boolean' && (val.value = '' + val.value);
                    return <Option key={i} {...val}>{val.title}</Option>
                })
            }
        </Select>
    }
    //单选框元素
    if (item.radio) {
        let {radioValue} = item.radio;
        return <RadioGroup {...fieldProps} {...item.radio} >
            {
                radioValue.map((val, i) => {
                    return <Radio key={i} disabled={disabled} {...val}>{val.title}</Radio>
                })
            }
        </RadioGroup>
    }

    if (item.checkbox) {
        let {groups = [], title = ''} = item.checkbox;
        return groups.length ? groups.map((v, i) => {
                let {name, title, ...other} = v;
                return <Checkbox key={`box-${i}`} {...getCustomFieldProps(name)} {...other} > {title}</Checkbox>
            }) : <Checkbox {...fieldProps} {...item.checkbox} > {title}</Checkbox>
    }
    
    //  checkboxGroup 复选框
    if (item.checkboxGroup) {
        return <CheckboxGroup {...fieldProps} {...item.checkboxGroup}  />
    }
    
    //数值文本框
    if (item.inputNumber) {
        return <InputNumber min={1} max={10} {...fieldProps} {...item.inputNumber} />
    }
    //日期元素
    if (item.datepicker) {
        return <DatePicker  {...fieldProps} {...item.datepicker}/>
    }
    //级联选择
    if(item.cascader){
        return <Cascader expandTrigger="hover" {...fieldProps} {...item.cascader} />
    }
    //业务传入自定义元素
    return item.custom && item.custom(getCustomFieldProps, this);
    }
    /**
     * 渲染form
     */
    renderForm(){
        const {prefixCls, horizontal = false, items, button, children, form} = this.props;

        // 配置项开始
        const inline = horizontal ? false : true;
        const formClassName = prefixCls || 'form';

        const span6 = inline ? '6' : '';
        const span8 = horizontal ? 2 : 8;

        const {panels} = items;

        const {getFieldProps, getFieldError, isFieldValidating} = form;

        const setFormPanel = (formItems) => {
            return formItems.map((item, index) => {
                let {name, infoLabel = ''} = item;

                return <Col key={index} span={span6} {...item}>
                    <FormItem id={`fm-${item.name}`}
                        labelCol={{ span: span8 }}
                        wrapperCol={{ span: 6 }}
                        help={isFieldValidating(item.name) ? '校验中...' : (getFieldError(item.name) || []).join(', ')}
                        {...item} >
                        {
                            this.renderFormItem(item)
                        }
                        {infoLabel}
                    </FormItem>
                </Col>
            })
        }

        let showItems = null;

        if (panels && panels.length) {
            showItems = panels.map(function(items, idx) {
                const {formItems, ...other} = items;
                return <Panel key={`panel-${idx}`} {...other}>
                                {setFormPanel(formItems)}
                       </Panel>
            });
        } else {
            showItems = setFormPanel(items.formItems);
        }

        return <div className={formClassName}>
            <Form inline={inline}  horizontal={horizontal} form={form}>
                <Row>
                    {showItems}
                    {children}
                    {button ? button : this.renderButton()}
                </Row>
            </Form>
        </div>
    }
    render() {
        return this.renderForm();
    }
}

Forms.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    prefixCls: PropTypes.string,
    button: PropTypes.object,
    panels : PropTypes.array,
    items: PropTypes.shape({
        initValue: PropTypes.object,
        formItems: PropTypes.array
    })
};

const onFieldsChange = (props) => {
   // console.log(props)
}

const mapPropsToFields = (props) => {
   // console.log(props)
}

/**
 * 使用High Order Component 创建form
 * @param  {any} (Forms)
 */
export default createForm({onFieldsChange, mapPropsToFields})(Forms)
