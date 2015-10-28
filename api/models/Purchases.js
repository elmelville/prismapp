/**
* Purchases.js
*
* @description :: Purchases model, contains a list of all unprocessed purchase order.
*/

module.exports = {

  attributes: {
    user  : { type: 'string', required:true },
    orderPlaced : {type: 'datetime', required:true},
    purchaseAmount : {type: 'integer', required: true}
  }
};

