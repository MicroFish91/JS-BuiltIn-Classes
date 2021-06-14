const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#fill()', function(){
    it('Fill operates with a single param', function() {
      const result = new ProtoArray(4).fill(5);
      const result2 = new ProtoArray(5).fill('hello');
      const result3 = new ProtoArray(6).fill(null);

      expect(result).to.eql({ length: 4, 0: 5, 1: 5, 2: 5, 3: 5 });
      expect(result2).to.eql({ length: 5, 0: 'hello', 1: 'hello', 2: 'hello', 3: 'hello', 4: 'hello' });
      expect(result3).to.eql({ length: 6, 0: null, 1: null, 2: null, 3: null, 4: null, 5: null });
    });
    it('Fill operates with two params', function() {
      const result = new ProtoArray(1, 2, 3, 4).fill(0, 2);
      const result2 = new ProtoArray(1, 2, 3, 4).fill(5, 1);

      expect(result).to.eql({ length: 4, 0: 1, 1: 2, 2: 0, 3: 0 });
      expect(result2).to.eql({ length: 4, 0: 1, 1: 5, 2: 5, 3: 5 });
    });
    it('Fill operates with three params', function() {
      const result = new ProtoArray(1, 2, 3).fill(4, 1, 2);
      const result2 = new ProtoArray(1, 2, 3).fill(4, 1, 1);
      const result3 = new ProtoArray(1, 2, 3).fill(4, 3, 3);
      const result4 = new ProtoArray(1, 2, 3).fill(4, -3, -2);
      const result5 = new ProtoArray(1, 2, 3).fill(4, NaN, NaN);
      const result6 = new ProtoArray(1, 2, 3).fill(4, 3, 5);
      
      expect(result).to.eql({ length: 3, 0: 1, 1: 4, 2: 3 });
      expect(result2).to.eql({ length: 3, 0: 1, 1: 2, 2: 3 });
      expect(result3).to.eql({ length: 3, 0: 1, 1: 2, 2: 3 });
      expect(result4).to.eql({ length: 3, 0: 4, 1: 2, 2: 3 });
      expect(result5).to.eql({ length: 3, 0: 1, 1: 2, 2: 3 });
      expect(result6).to.eql({ length: 3, 0: 1, 1: 2, 2: 3 });
      expect(result6).to.eql({ length: 3, 0: 1, 1: 2, 2: 3 });
    });
  }); // End describe
}  // End wrapper function