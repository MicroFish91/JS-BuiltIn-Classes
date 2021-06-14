const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#concat()', function(){
    it ('Concat works with raw values', function() {
      const result = new ProtoArray('a', 'b', 'c').concat(3);
      const result2 = new ProtoArray().concat(1).concat(2).concat(3);

      expect(result).to.eql({ length: 4, 0:'a', 1:'b', 2:'c', 3: 3 });
      expect(result2).to.eql({ length: 3, 0: 1, 1: 2, 2: 3 });
    });

    it('Concats another Array without mutating original', function() {
      const original = new ProtoArray('a', 'b', 'c');
      const numbers = new Array(1, 2, 3);
      const result = original.concat(numbers);

      expect(original).to.eql({ length: 3, 0:'a', 1:'b', 2:'c' });
      expect(result).to.eql({ length: 6, 0:'a', 1:'b', 2:'c', 3:1, 4:2, 5:3 });
    });

    it('Concats another ProtoArray without mutating original', function() {
      const original = new ProtoArray('a', 'b', 'c');
      const numbers = new ProtoArray(1, 2, 3);
      const result = original.concat(numbers);


      expect(original).to.eql({ length: 3, 0:'a', 1:'b', 2:'c' });
      expect(result).to.eql({ length: 6, 0:'a', 1:'b', 2:'c', 3:1, 4:2, 5:3 });
    });

    it('Concats multiple Arrays/ProtoArrays at once', function() {
      const arrayOne = new ProtoArray(1, 2, 3);
      const arrayTwo = new ProtoArray(4, 5, 6);
      const arrayThree = new Array(7, 8, 9);
      const result = arrayOne.concat(arrayTwo, arrayThree);

      expect(result).to.eql({
        length: 9,
        0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9
      })
    });

    it('Concats nested Arrays/ProtoArrays', function() {
      const arrayOne = new ProtoArray(new ProtoArray(2, 3));
      const arrayTwo = new Array(new Array(1));
      const arrayThree = new Array(2, new ProtoArray(1));
      const arrayFour = new ProtoArray(3, [2, 1]);
      const result = arrayOne.concat(arrayTwo, arrayThree, arrayFour);

      expect(result).to.eql({
        length: 6,
        0: { length: 2, 0: 2, 1: 3 },
        1: [ undefined ],
        2: 2,
        3: { length: 1, 0: undefined },
        4: 3,
        5: [2, 1]
      });
    });
  }); // End describe
}  // End wrapper function