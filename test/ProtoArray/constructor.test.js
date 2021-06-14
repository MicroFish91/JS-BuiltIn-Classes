const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#constructor()', function(){
    it('Constructs multiple parameters and all data types', function() {
      const result = new ProtoArray(13.5, true, "hello", [1, 2, 3], new ProtoArray(1, 2, 3), {key1: 'hello'});
      expect(result).to.eql({
        length: 6,
        0: 13.5, 1: true, 2: "hello", 3: [1, 2, 3], 4: { length: 3, 0:1, 1:2, 2:3 }, 5: {key1: 'hello'}
      });
    });

    it('Constructs a single parameter as length', function(){
      const result = new ProtoArray(5);
      expect(result).to.eql({
        length: 5,
        0: undefined, 1: undefined, 2: undefined, 3: undefined, 4: undefined
      });
    });

    it('Constructs when passed a single parameter as an Array', function(){
      const result = new ProtoArray(new Array(1).fill(1));
      expect(result).to.eql({
        length: 1,
        0: [1]
      });
    });

    it('Constructs when passed a single parameter as a ProtoArray', function(){
      const result = new ProtoArray(new ProtoArray(1).fill(1));
      expect(result).to.eql({
        length: 1,
        0: { length: 1, 0:1 }
      });
    });

    it('Constructs no parameters as no values with length 0', function() {
      const result = new ProtoArray();
      expect(result).to.eql({
        length: 0
      });
    });
  }); // End describe
}  // End wrapper function