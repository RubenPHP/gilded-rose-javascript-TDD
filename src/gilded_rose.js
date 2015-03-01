function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

function initItems(){
  items = [];
  items.push(new Item('+5 Dexterity Vest', 10, 20));
  items.push(new Item('Aged Brie', 2, 0));
  items.push(new Item('Elixir of the Mongoose', 5, 7));
  items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
  items.push(new Item('Conjured Mana Cake', 3, 6));  
}


function update_quality() {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
          item.quality = item.quality - 1
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sell_in < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
          if (item.sell_in < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
        }
      }
    }
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sell_in = item.sell_in - 1;
    }
    if (item.sell_in < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
              item.quality = item.quality - 1
            }
          }
        } else {
          item.quality = item.quality - item.quality
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
        }
      }
    }
  }
}

function updateQuality(itemName){
  items.forEach(function(item){
    if (item.name!='Sulfuras, Hand of Ragnaros') {
      if (increaseQuality(item.name)) {
        item.quality += qualityToIncrease(item);
      }
      else{
        item.quality -= 1;
      }      
      if (item.sell_in < 0){
        item.quality -= 1;
      }      
      item.quality = qualityLessThan0(item.quality) ? 0 : item.quality;
      item.quality = qualityMoreThan50(item.quality) ? 50 : item.quality;  
      
      item.sell_in -= 1;
      
    }
  });
}

function qualityLessThan0(itemQuality){
  return itemQuality < 0;
}

function qualityMoreThan50(itemQuality){
  return itemQuality > 50;
}

function increaseQuality(itemName){
  return (itemName=='Aged Brie'||itemName=='Backstage passes to a TAFKAL80ETC concert');
}

function qualityToIncrease(item){
  var quality = 1;
  if (item.name=='Backstage passes to a TAFKAL80ETC concert'&&item.sell_in<=10) {
    quality +=1;
  }
  return quality;
}

