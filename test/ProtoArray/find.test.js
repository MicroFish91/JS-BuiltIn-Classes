const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('ProtoArray .find()', function(){
    it('Filter operates with simple, one-line callbacks', function() {
      const result = new ProtoArray('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present').filter(word => word.length > 6);
      const result2 = new ProtoArray(12, 5, 8, 130, 44).filter(value => value >= 10);

      expect(result).to.eql({ length: 3, 0: 'exuberant', 1: 'destruction', 2: 'present' });
      expect(result2).to.eql({ length: 3, 0: 12, 1: 130, 2: 44 });      
    });

  }); // End describe
}  // End wrapper function