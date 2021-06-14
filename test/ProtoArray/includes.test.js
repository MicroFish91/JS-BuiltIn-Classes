const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#includes()', function(){
    it('includes() returns the correct boolean when passed only one parameter', function() {
      const result = new ProtoArray(1, 2, 3).includes(2);
      const result2 = new ProtoArray(1, 2, 3).includes(4);
      const result3 = new ProtoArray(1, 2, NaN).includes(NaN);
      
      expect(result).to.eql(true);
      expect(result2).to.eql(false);
      expect(result3).to.eql(true);
    });

    it('includes() returns the correct boolean when passed two parameters', function() {
      const result = new ProtoArray(1, 2, 3).includes(3, 3);
      
      expect(result).to.eql(false);
    });

    it('If fromIndex is greater than or equal to the length of the array, false is returned', function() {
      const original = new ProtoArray('a', 'b', 'c');
      const result = original.includes('c', 3);
      const result2 = original.includes('c', 100) 
      
      expect(result).to.eql(false);
      expect(result2).to.eql(false);
    });

    it('includes() operates properly when index is less than 0', function() {
      const original = new ProtoArray('a', 'b', 'c');
      const result = original.includes('a', -100); 
      const result2 = original.includes('b', -100); 
      const result3 = original.includes('c', -100); 
      const result4 = original.includes('a', -2);  
      const result5 = new ProtoArray(1, 2, 3).includes(3, -1);

      expect(result).to.eql(true);
      expect(result2).to.eql(true);
      expect(result3).to.eql(true);
      expect(result4).to.eql(false);
      expect(result5).to.eql(true);
    });
  }); // End describe
}  // End wrapper function