const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#find()', function(){
    it('Find returns the first value in a simple, one-line callback', function() {
      const result = new ProtoArray(5, 12, 8, 130, 44).find(element => element > 10);
      const result2 = new ProtoArray({name: 'apples', quantity: 2}, {name: 'bananas', quantity: 0}, {name: 'cherries', quantity: 5})
                                      .find(fruit => fruit.name === 'cherries');
      expect(result).to.eql(12);
      expect(result2).to.eql({ name: 'cherries', quantity: 5 });  
    });

    it('Find returns the first value in complex, multi-line callbacks', function() {
      const isPrime = (element, index, array) => {
         start = 2;
        while (start <= Math.sqrt(element)) {
          if (element % start++ < 1) {
            return false;
          }
        }
        return element > 1;
      }
      const result = new ProtoArray(4, 6, 8, 12).find(isPrime);
      const result2 = new ProtoArray(4, 5, 8, 12).find(isPrime);

      expect(result).to.eql(undefined);
      expect(result2).to.eql(5);  
    });

    it('Find returns undefined if no value satisfies the given condition', function() {
      const result = new ProtoArray(4, 6, 8, 12).find(num => num > 13);

      expect(result).to.eql(undefined);
    });


    it('MDN #1: Deleted origin elements are still visited', function() {
      const original = new ProtoArray(0, 1, 2, 3, 4, 5, 6);
      const result = original.find((value, index, array) => {
        if (index === 0) {
          delete array[5];
        }
        if (index === 5) {
          return true;
        }
        return false;
      });
      
      expect(result).to.eql(undefined);
    });
  }); // End describe
}  // End wrapper function