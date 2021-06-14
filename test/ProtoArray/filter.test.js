const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#filter()', function(){
    it('Filter operates with simple, one-line callbacks', function() {
      const result = new ProtoArray('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present').filter(word => word.length > 6);
      const result2 = new ProtoArray(12, 5, 8, 130, 44).filter(value => value >= 10);

      expect(result).to.eql({ length: 3, 0: 'exuberant', 1: 'destruction', 2: 'present' });
      expect(result2).to.eql({ length: 3, 0: 12, 1: 130, 2: 44 });      
    });

    it('Filter operates with complex callbacks', function() {
      // Filter for Prime Numbers
      const isPrime = new ProtoArray(-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13).filter(num => {
        for (let i = 2; num > i; i++) {
          if (num % i == 0) {
            return false;
          }
        }
        return num > 1;
      });

      // Filtering Id's from JSON
      let invalidEntries = 0;
      const filteredIds = new ProtoArray({id:-1},{id:0},{id:3},{id:12.2},{},{id:null},{id:NaN},{id:'undefined'}).filter(item => {
        if (Number.isFinite(item.id) && item.id !== 0) {
          return true
        }
        invalidEntries++
        return false;
      });

      expect(isPrime).to.eql({ length: 6, 0: 2, 1: 3, 2: 5, 3: 7, 4: 11, 5: 13 }); 
      expect(filteredIds).to.eql({ length: 3, 0: {id: -1}, 1: {id: 3}, 2: {id: 12.2} }); 
    });

    it('MDN Test #1 - Modifying Origin Values', function() {
      const original = new ProtoArray('spray', 'limit', 'exuberant', 'destruction', 'elite', 'present');
      const result = original.filter((word, index, arr) => {
        arr[index + 1] += ' extra';
        return word.length < 6;
      });

      expect(result).to.eql({ length: 1, 0: 'spray' });     
    });

    it('MDN Test #2 - Appending Origin Values', function() {
      const original = new ProtoArray('spray', 'limit', 'exuberant', 'destruction','elite', 'present');
      const result = original.filter((word, index, arr) => {
        arr.push('new');
        return word.length < 6;
      });

      expect(result).to.eql({ length: 3, 0: 'spray', 1: 'limit', 2: 'elite' });     
    });

    it('MDN Test #3 - Deleting Origin Values', function() {
      const original = new ProtoArray('spray', 'limit', 'exuberant', 'destruction', 'elite', 'present');
      const result = original.filter((word, index, arr) => {
        arr.pop();
        return word.length < 6;
      });

      expect(result).to.eql({ length: 2, 0: 'spray', 1: 'limit' });     
    });
  }); // End describe
}  // End wrapper function