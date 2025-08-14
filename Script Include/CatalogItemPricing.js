/*
In this code I calculate the total price of a catalog item by getting its price 

To execute it, go to Scripts - Background in ServiceNow, paste this code, and run it:

var pricing = new CatalogItemPricing();
var total = pricing.getTotalCost('sysof your catalog item');
gs.print("Total cost: " + total);


*/


var CatalogItemPricing = Class.create();
CatalogItemPricing.prototype = {
    initialize: function() {},

    // Recursive function to calculate total cost
    getTotalCost: function(itemSysId) {
        var totalCost = 0;

        // 1. Get the base price of the current item
        var item = new GlideRecord('sc_cat_item');
        if (item.get(itemSysId)) {
            var price = parseFloat(item.price || 0);
            gs.print("Item: " + item.name + " | Price: " + price);
            totalCost += price;
        }

        return totalCost;
    },

    type: 'CatalogItemPricing'
};
