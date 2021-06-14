const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#flat()', function(){
    it('Flat operates properly with no parameters passed', function() {
      const result = new ProtoArray(0, 1, 2, new ProtoArray(3, 4)).flat();
      const result2 = new ProtoArray(1, 2, new ProtoArray(3, 4, new ProtoArray(5, 6))).flat();
      const result3 = new ProtoArray(1, 2, [3, 4, [5, 6]]).flat();

      expect(result).to.eql({ length: 5, 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 });
      expect(result2).to.eql({ length: 5, 0: 1, 1: 2, 2: 3, 3: 4, 4: {length: 2, 0: 5, 1: 6} });
      expect(result3).to.eql({ length: 5, 0: 1, 1: 2, 2: 3, 3: 4, 4: [5, 6] });
    });

    it('Flat operates properly with depth parameter passed', function() {
      // [0, 1, 2, [[[3, 4]]]]
      const toFlat = new ProtoArray(0, 1, 2, new ProtoArray(new ProtoArray(new ProtoArray(3, 4))));
      const result = toFlat.flat(2);
      const result2 = new ProtoArray(1, 2, new ProtoArray(3, 4, new ProtoArray(5, 6))).flat(2);
      const result3 = new ProtoArray(1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]).flat(Infinity);

      // [0, 1, 2, [3, 4]]
      expect(result).to.eql({ length: 4, 0: 0, 1: 1, 2: 2, 3: { length: 2, 0: 3, 1: 4 } });
      expect(result2).to.eql({ length: 6, 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 });
      expect(result3).to.eql({ length: 10, 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10 });
    });
  }); // End describe
}  // End wrapper function