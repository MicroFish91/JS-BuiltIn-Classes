const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('ProtoArray .concat()', function(){
    it('ProtoArray should be able to concat another Array', function() {
      const letters = new ProtoArray('a', 'b', 'c');
      const numbers = new Array(1, 2, 3);
      const result = letters.concat(numbers);

      expect(result).to.eql({
        length: 6,
        values: { 0:'a', 1:'b', 2:'c', 3:1, 4:2, 5:3 }
      })
    });

    it('ProtoArray should be able to concat another ProtoArray', function() {
      const letters = new ProtoArray('a', 'b', 'c');
      const numbers = new ProtoArray(1, 2, 3);
      const result = letters.concat(numbers);

      expect(result).to.eql({
        length: 6,
        values: { 0:'a', 1:'b', 2:'c', 3:1, 4:2, 5:3 }
      })
    });

    it('ProtoArray should be able to concat multiple Arrays/ProtoArrays at once', function() {
      const arrayOne = new ProtoArray(1, 2, 3);
      const arrayTwo = new ProtoArray(4, 5, 6);
      const arrayThree = new Array(7, 8, 9);
      const result = arrayOne.concat(arrayTwo, arrayThree);

      expect(result).to.eql({
        length: 9,
        values: { 0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9 }
      })
    });

    it('ProtoArray should be able to concat nested Arrays/ProtoArrays', function() {
      const arrayOne = new ProtoArray([1]);
      const arrayTwo = new Array(new Array(1).fill(2));
      const arrayThree = new Array(2, [3]);
      const result = arrayOne.concat(arrayTwo, arrayThree);

      expect(result).to.eql({
        length: 4,
        values: { 
          0: [1],
          1: [2],
          2: 2,
          3: [3]
        }
      })
    });
  }); // End describe
}  // End wrapper function