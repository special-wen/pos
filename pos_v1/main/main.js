'use strict';

//商品统计
function printReceipt(inputs) {
  let cartItems = buildItems(inputs);
  let cartItem = allItemCount(cartItems);
  let item = earchItemPrice(cartItem);
  allItemPrice(item);
}

//统计商品的数量
function buildItems(inputs) {
  let cartItems = [];
  let allItems = loadAllItems();

  for(let input of inputs){
    let splitInput = input.split('-');
    let barcode = splitInput[0];
    let itemCount = parseFloat(splitInput[1] ||1);

    let cartItem = cartItems.find((cartItems)=>cartItems.item.barcode === barcode);
    if(cartItem){
      cartItem.count += itemCount;
    }else{
      let item = allItems.find((item)=>item.barcode === barcode);
      cartItems.push({item:item,count:itemCount});
    }
  }
  //console.log(cartItems);
  return cartItems;
}

//统计商品需要支付的数量以及优惠的数量
function allItemCount(cartItem) {
  for(let i = 0;i<cartItem.length;i++){
    cartItem[i].countSave = 0;
    cartItem[i].newCount = 0;
  }
  for(let i = 0;i<cartItem.length;i++){
    if(cartItem[i].count >0){
      if(cartItem[i].count >=3){
        cartItem[i].newCount = cartItem[i].count-1;
        cartItem[i].countSave = 1;
      }
      if(cartItem[i].count <3){
        cartItem[i].newCount = cartItem[i].count;
        cartItem[i].countSave = 0;
      }
    }
  }
  //console.log(cartItem);
  return cartItem;
  //console.log(item)
}

//统计每个商品所需要支付的价格及优惠了的价格
function earchItemPrice(item) {
  for(let i = 0;i<item.length;i++){
    item[i].priceSave = 1;
    item[i].newPrice = 1;
  }
  for(let i = 0;i<item.length;i++){
    if(item[i].count > 0){
      item[i].priceSave = item[i].countSave * item[i].item.price;
      item[i].newPrice = item[i].newCount *item[i].item.price;
    }
  }
  console.log(item);
  return item;

}

//统计所有商品的支付价格总和以及优惠了的价格
function allItemPrice(item) {
  var total ={};
  total.totlePrice = 0;
  total.totleServe = 0;
  for(let i = 0; i<item.length;i++){
    if(item[i].count > 0){
      total.totlePrice = item[i].newPrice+total.totlePrice;
      total.totleServe = total.totleServe+item[i].priceSave;
    }
  }

  // 在计算出总价之后回调输出所有内容
  outputItemPrice(item,total);
}

//输出所有商品的价格
function outputItemPrice(item,total) {
  var str ='';
  for(let i = 0;i<item.length;i++){
    if(item[i].count>0){
      str+= "名称：" + item[i].item.name +"，"+
        "数量："+item[i].count+item[i].item.unit+"，"+
        "单价："+item[i].item.price.toFixed(2)+"(元)"+"，"+
        "小计："+item[i].newPrice.toFixed(2)+"(元)\n";
    }
  }
  console.log('***<没钱赚商店>收据***\n'+
    str+"----------------------"+"\n"+
    "总计："+total.totlePrice.toFixed(2)+"(元)\n"+
    "节省："+total.totleServe.toFixed(2)+"(元)\n"+
    "**********************");
}




