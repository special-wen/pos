'use strict';

describe('pos', () => {
  let inputs;

  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', () => {

    spyOn(console, 'log');

    printReceipt(inputs);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});

//测试buildItem
describe('unit test',()=> {
  describe('buildItems', ()=> {
    let inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
    it('should return correct items', ()=> {
      const countedItems = [
        {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,

          },
          count: 5
        },
        {
          item:{
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00,

          },
          count: 2
        },
        {
          item:{
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5,
          },
          count: 3

        }
      ];
      expect(buildItems(inputs)).toEqual(countedItems);
    });
  });
});

//测试allItemCount
describe('item',()=> {
  let items;
  beforeEach(() => {

    items = [
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00,
        count: 0
      },
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        count: 5
      },
      {
        barcode: 'ITEM000002',
        name: '苹果',
        unit: '斤',
        price: 5.50,
        count: 0
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        count: 2
      },
      {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00,
        count: 0
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50,
        count: 3
      }
    ]
  });

  it('shoule print correct item message', () => {


    const countedAllItems = [
      ({ barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, count: 0, countSave: 0, newCount: 0 }),
      ({ barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, count: 5, countSave: 1, newCount: 4 }),
      ({ barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5, count: 0, countSave: 0, newCount: 0 }),
      ({ barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, count: 2, countSave: 0, newCount: 2 }),
      ({ barcode: 'ITEM000004', name: '电池', unit: '个', price: 2, count: 0, countSave: 0, newCount: 0 }),
      ({ barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, count: 3, countSave: 1, newCount: 2 })
    ];
    expect(allItemCount(items)).toEqual(countedAllItems);
  });
});


