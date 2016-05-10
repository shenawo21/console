import React, { Component, PropTypes }  from 'react';

import { Select, Input, Radio, Button, DatePicker, Checkbox, InputNumber, Icon, Form, Cascader, Row, Col } from 'hen';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
import './Form.less';

class Forms extends Component {
    /**
     * 重置表单
     * @param  {any} e
     */
    handleReset(e) {
        e.preventDefault();

        const {form, onReset, submitAfterReset, onSubmit, resetNumber} = this.props;
        form.resetFields();
        let values = form.getFieldsValue();
        onReset && onReset(e);

        if (resetNumber) {
            values = {...values, ...resetNumber };
        }
        //如果需要在重置后提交表单，可以通过此属性配置： 例如 搜索的时候
        submitAfterReset && onSubmit(values);

    }
    /**
     * 提交表单
     * 执行属性里面的onSubmit方法
     * @param  {any} e
     */
    handleSubmit(e) {
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
        let {horizontal, buttonOption = {}} = this.props;

        const {col = true, ok, cal, okIcon, calIcon, searchSpan, cancel = true} = buttonOption;
        let cols = col ? (horizontal ? { span: 24, offset: 6 } : { span: 8, offset: 5 }) : null;

        return (<Col span={searchSpan || "8"} className="btn-bottom">
            <FormItem wrapperCol={cols}>
                <Button type="primary" onClick={this.handleSubmit.bind(this)}>{okIcon ? <Icon type={okIcon} /> : '' } {ok || '提交'}</Button>
                {
                    cancel ? <Button htmlType="reset" onClick={this.handleReset.bind(this)}>{calIcon ? <Icon type={calIcon} /> : '' }{cal || '重置'}</Button> : ''
                }

            </FormItem>
        </Col>)
    }
    /**
     * 渲染FormItem
     * @param  {any} item 配置项
     */
    renderFormItem(item) {
        const {form, items} = this.props;

        const { getFieldProps } = form;
        const {initValue} = items;

        let {name, disabled} = item;
        /**
         * 获取field相关的信息
         * @param  {any} name antd form 会根据这个name生成相关的信息
         * @param  {any} options 选项具体参考网站
         */
        let getCustomFieldProps = (name, options) => {

            return {...getFieldProps(name, {
                id:`fm-${name}`,
                rules: item.rules || [],
                initialValue: initValue[name],
                valuePropName: item.checkbox ? 'checked': 'value',
			  ...options
            }),name, disabled
        }
    }

    let fieldProps = name ? getCustomFieldProps(name) : {};

    //input输入框
    if (item.input) {
        return <Input  {...item.input} {...fieldProps} />
    }
    //下拉选择
    if (item.select) {
        let {optionValue, tipValue, defaultValue, placeholder} = item.select;
        let options = Object.assign([], optionValue);//防止直接修改引用类型数据
        !placeholder && tipValue && options.unshift({
            value: null, title: tipValue
        })
        return <Select size='large' defaultValue={fieldProps.value} style={{ width: 190 }} placeholder={placeholder} {...item.select} {...fieldProps}>
            {
                options.map((val, i) => {
                    return <Option key={i} {...val}>{val.title}</Option>
                })
            }
        </Select>
    }
    //单选框元素
    if (item.radio) {
        let {radioValue} = item.radio;
        return <RadioGroup {...item.radio} {...fieldProps}>
            {
                radioValue.map((val, i) => {
                    return <Radio key={i} disabled={disabled} {...val}>{val.title}</Radio>
                })
            }
        </RadioGroup>
    }

    //   复选框
    if (item.checkbox) {
        let {className, title = ''} = item.checkbox;
        let boxClassName = className || "ant-checkbox-inline"
        return <label className={boxClassName} htmlFor={`fm-${name}`}>
            <Checkbox  {...item.checkbox}  {...fieldProps}/> {title}
        </label>
    }
    //数值文本框
    if (item.inputNumber) {
        return <InputNumber min={1} max={10} {...item.inputNumber} {...fieldProps}/>
    }
    //日期元素
    if (item.datepicker) {
        return <DatePicker {...item.datepicker} {...fieldProps}/>
    }
    //业务传入自定义元素
    return item.custom && item.custom(getCustomFieldProps, this, disabled);
    }
    /**
     * 渲染form
     */
    renderForm(){
        const {prefixCls, horizontal = false, items, button, children, component, form} = this.props;

        // 配置项开始
        const inline = horizontal ? false : true;
        const formClassName = prefixCls || 'form';

        const span6 = inline ? '6' : '';
        const span8 = horizontal ? 3 : 8;

        const {formItems} = items;

        const {getFieldProps, getFieldError, isFieldValidating} = form;


        return <div className={formClassName}>
            <Form inline={inline}  horizontal={horizontal} form={form}>
                <Row>
                    {
                        children
                    }
                    {
                        formItems.map((item, index) => {
                            let {name} = item;

                            return <Col key={index} span={span6} {...item}>
                                <FormItem id={`fm-${item.name}`} 
                                    labelCol={{ span: span8 }}
                                    wrapperCol={{ span: 6 }}
                                    help={isFieldValidating(item.name) ? '校验中...' : (getFieldError(item.name) || []).join(', ')}
                                    {...item} >
                                    {
                                        this.renderFormItem(item)
                                    }
                                </FormItem>
                            </Col>

                        })
                    }
                    {component}
                    {button ? button : this.renderButton() }
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