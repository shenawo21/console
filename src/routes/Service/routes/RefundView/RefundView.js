import React from 'react'
import './RefundView.less'
// import Image from 'components/Image';

export default (props) => {
  const result = props.result
  const ArryStatus = props.ArryStatus
  const src = props.src
  return (
    <div className="table-box">
            <table className = 'border-table' style = {{width:'100%'}}>
                <caption>{props.title}</caption>
                <tr>
                    <th>商品编码</th>
                    <th>商品名称</th>
                    <th>原价格</th>
                    <th>数量</th>
                    <th>商品总价值</th>
                    <th>优惠金额</th>
                    {result.afterSaleType == 'CHANGE_GOODS' ?
                    <th>换货数量</th>:
                    <th>退货数量</th> }
                    {result.afterSaleType == 'CHANGE_GOODS' ?
                    <th>换后商品编码</th>:
                    <th>退货金额</th>}
                </tr>
                <tbody>
                    <tr>
                        <td>{result.outerId}</td>
                        <td>{result.title}</td>
                        <td>{result.price}</td>
                        <td>{result.goodsNum}</td>
                        <td>{result.totalFee}</td>
                        <td>{result.discountFee}</td>
                        {result.afterSaleType == 'CHANGE_GOODS' ?
                        <td>{result.tGoodsNum}</td>:
                        <td>{result.goodsNum}</td> }
                        {result.afterSaleType == 'CHANGE_GOODS' ?
                        <td>{result.refundFee}</td>:
                        <td>{result.changeSkuCode}</td>}
                    </tr>                       
                </tbody>
            </table>
            <ul className = 'form-talbe'>
                    {
                        ArryStatus && ArryStatus.map((item, index)=>{
                        return <li><b>{item.name}</b><span>{item.status}</span></li>
                        })
                    }
                    <li><b>凭证：</b>
                    <span>
                        {
                            src && src.map((item, index)=>{
                            return <img src={item} width= '80' style={{marginRight:10}} />
                            })
                        }
                    </span></li>

            </ul>
        </div>
  )
}