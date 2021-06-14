const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#findIndex()', function(){
    it('FindIndex returns the index of the first value in a simple, one-line callback', function() {
      const result = new ProtoArray(5, 12, 8, 130, 44).findIndex(element => element > 13);
      const result2 = new ProtoArray('hello', 'world', '!').findIndex(word => word === 'world');
      
      expect(result).to.eql(3);
      expect(result2).to.eql(1);
    });

    it('FindIndex returns the index of the first value in a complex, multi-line callback', function() {
      function isPrime(num) {
        for (let i = 2; num > i; i++) {
          if (num % i == 0) {
            return false;
          }
        }
        return num > 1;
      }
      const result = new ProtoArray(4, 6, 7, 9, 12).findIndex(isPrime);
      
      expect(result).to.eql(2);
    });

    it('FindIndex returns -1 if no values satisfy the given condition', function() {
      const result = new ProtoArray(4, 6, 7, 9, 12).findIndex(num => num > 13);
      const result2 = new ProtoArray("hello", "world", "!").findIndex(word => word === "hi");
      
      expect(result).to.eql(-1);
      expect(result2).to.eql(-1);
    });
  }); // End describe
}  // End wrapper function