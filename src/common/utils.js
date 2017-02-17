/**
 * 递归获取当前页面权限
 * @param  {any} url 字符串
 * @return {func}
 */
import store from 'store2';

export function getPermissions(url) {
    const menuData = store.get('USER') && store.get('USER').menuList;
    let arr = []
    const getMenu = (menuData) => {
        menuData.map((menu, index) => {
            if (url == menu.uri) {
                menu.children && menu.children.map((item) => {
                    arr.push(item.name)
                })
                return arr
            } else {
                menu.children && getMenu(menu.children)
            }
        })
    }

    getMenu(menuData);
    
    return (permission) => {
        return arr.indexOf(permission) > -1
    }
}


/**
 * 把数组格式转换成树形（移植自之前的项目）
 * @param  {any} arr 数组
 * @param  {any} transformer 自定义返回数据的函数
 * @param  {any} openId
 * @return {object}
 */
export function tree(arr, transformer, openId) {
    if (!arr || !Array.isArray(arr)) return [];
    var a, stack = [], list = {};
    arr.forEach(function (v, i) {
        var parentId = v.id.substring(0, v.id.length - 2);
        if (parentId == '') {
            a = stack;
        } else {
            var parent = list[parentId];
            if (!parent) return true;
            a = parent.children ? parent.children : parent.children = [];
            // parent.isFolder = true;

        }
        list[v.id] = v;
        a.push(transformer ? transformer(v, openId) : v);
    });
    console.log(stack);
    return stack;
}


/**
 * 查找元素
 *
 * @param  {any} arr
 * @param  {any} value
 * @param  {any} prop='id'
 *
 * @return {object | null}
 *
 */
export function findBy(arr, value, prop = 'id') {
    let result = null;

    for (var index = 0; index < arr.length; index++) {
        var element = arr[index];

        if (element[prop] === value) {
            result = element;
            continue;
        }

    }
    return result
}

/**
 * 1.数据整理，添加lable是给antd的组件使用
 * 2.最后一层没有数据的children设置为null，是为了正确显示
 * @param  {Array} items
 */
export function treeTransformer(items) {

    const loop = (input) => {
        input.label = input.name
        input.value = input.id
        input.children = input.children && input.children.map(t => {
            t.label = t.name
            t.value = t.id
            if (t.children && t.children.length) {
                t = loop(t)
            } else {
                t.children = null
            }
            return t
        })
        return input
    }

    const data = items.map(d => loop(d))

    return data;
}


/**
 * 判断两个对象是否相等
 * @param  {any} a
 * @param  {any} b
 * @return boolean
 */
export function isEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * object to list 主要是把旧版的数据结构转换为select列表的数据结构
 * key:value => {title:value,value:key}
 * @param  {any} o
 */
export function toList(o) {
    let result = [];
    for (let item in o) {
        item !== '_value' && result.push({ title: o[item], value: item })
    }
    return result
}
/**
 * 删除children，antd table有点问题
 * @param  {any} input
 * @return []
 */
export function normalizeCategory(input) {
    let output = [];
    input && input.forEach(item => {
        let a = {...item, children:null}
        output.push(a)
    });
    return output
}

const numberReg = /^\d*(\,|\.)?\d+$/;

/**
 * 验证是否是数字 可以是小数点 不是必填
 * @param  {any} rule
 * @param  {any} value
 * @param  {any} callback
 */
export function validatorFloat(rule, value, callback) {

    if (numberReg.test(value)) {
        callback()
    } else {
        callback(new Error('请填写有效数字'))
    }

}

/**
 * 验证是否是数字 不是必填
 * @param  {any} rule
 * @param  {any} value
 * @param  {any} callback
 */
export function validatorNumber(rule, value, callback) {

    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        numberReg.test(value) ? callback() : callback(new Error('请填写有效数字'))
    }

}

/**
 * (检查是否为数字，用法再rules写transform:toNumber)
 * 
 * @param v (description)
 * @returns (description)
 */
export function toNumber(v) {
    if (!v || !v.trim()) {
        return undefined;
    }
    let num = Number(v);
    // num === ' '
    if (!isNaN(num)) {
        num = parseInt(v, 10);
    }
    return isNaN(num) ? v : num;
}

/**
 * 验证是否是数字 必填
 * @param  {any} rule
 * @param  {any} value
 * @param  {any} callback
 */
export function validatorRequiredNumber(rule, value, callback) {

    if (numberReg.test(value)) {
        callback()
    } else {
        callback(new Error('请填写有效数字'))
    }
}

/**
 * 输入文字中英文字符长度校验
 * 
 * @param value 输入内容
 * @param callback 校验回调
 * @param msg 提示信息
 * @param num 长度
 */
export function validatorContent(value, callback, msg, num) {
    if (value) {
        let textValue = value.replace(/(^\s*)|(\s*$)/g, ''), length = -1;
        if (textValue) {
            length = textValue.replace(/[\u4e00-\u9fa5]/g, '**').length;
            if (length > num || length < 0) {
                callback(new Error(msg + '长度不能超过' + num + '个字符!'));
            } else {
                callback()
            }
        } else {
            callback(new Error(msg + '不能为空!'));
        }
    } else {
        callback();
    }
}

const specType = ['One', 'Two', 'Three', 'Four']

/**
 * 列表中将规格值转换成  specOneValue/specTowValue/specThreeValue/specFourValue
 * 
 * @export
 * @param {any} row 列表单行数据
 * @returns
 */
export function getSpecValue(row) {
    let curSpec = []
    specType.forEach((val) => {
        if (row['spec' + val + 'Value']) {
            curSpec.push(row['spec' + val + 'Value'])
        }
    })
    return curSpec.join('/')
}

/**
 * 获取时间戳
 *  
 *  example:
 *  new Date('2012-01-11 12:30:00').getTime()   =>   1326256200000
 * 
 * @export
 * @param {any} value  传入时刻，没有时返回当前时间戳
 * @returns
 */
export function getTimeStamp(value){
    if(value && typeof value === 'string'){
        return new Date(value).getTime()
    }else{
        return new Date().getTime()
    }
}

/**
 * 将时间戳转换成时间格式
 * example:
 *   1326256200000  =>  '2012-01-11 12:30:00'
 * 
 * @export
 * @param {any} value
 * @param {any} showTime 是否显示time
 * @returns
 */
export function formatDate(value, showTime) {
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