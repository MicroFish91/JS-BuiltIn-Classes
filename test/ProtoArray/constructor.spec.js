const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('ProtoArray Constructor', function(){
    it('ProtoArray should process multiple parameters and all data types', function() {
      const result = new ProtoArray(13.5, true, "hello", [1, 2, 3], new ProtoArray(1, 2, 3), {key1: 'hello'});
      expect(result).to.eql({
        length: 6,
        values: {
          0: 13.5, 1: true, 2: "hello", 3: [1, 2, 3], 4: new ProtoArray(1, 2, 3), 5: {key1: 'hello'}
        }
      });
    });

    it('ProtoArray should process a single parameter as length', function(){
      const result = new ProtoArray(5);
      expect(result).to.eql({
        length: 5,
        values: { 0: undefined, 1: undefined, 2: undefined, 3: undefined, 4: undefined }
      });
    });

    it('ProtoArray should process no parameters as no values with length 0', function() {
      const result = new ProtoArray();
      expect(result).to.eql({
        length: 0,
        values: {}
      });
    });
  }); // End describe
}  // End wrapper function