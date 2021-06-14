const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#forEach()', function(){
    it('forEach() loops through all the array elements', function() {
      const result = new ProtoArray();
      const array1 = new ProtoArray('a', 'b', 'c');
      array1.forEach(element => result.push(element));
      
      expect(result).to.eql({ length: 3, 0: 'a', 1: 'b', 2: 'c' });
    });

    it('MDN #1: forEach() does not make a copy of the array before iterating', function() {
      const result = new ProtoArray('one', 'two', 'three', 'four');

      result.forEach((word, index) => {
        if (word === 'two') {
          result.shift();
        }
      });
      
      expect(result).to.eql({ length: 3, 0: 'two', 1: 'three', 2: 'four' });
    });
  }); // End describe
}  // End wrapper function