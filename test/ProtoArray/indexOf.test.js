const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#indexOf()', function(){
    it('indexOf() returns the correct value when passed only one parameter', function() {
      const beasts = new ProtoArray('ant', 'bison', 'camel', 'duck', 'bison');
      const result = beasts.indexOf('bison');
      const result2 = beasts.indexOf('giraffe');
      
      expect(result).to.eql(1);
      expect(result2).to.eql(-1);
    });

    it('indexOf() returns the correct value when passed two parameter', function() {
      const numbers = new ProtoArray(2, 9, 9);
      const result = numbers.indexOf(9, 2);
      const result2 = numbers.indexOf(2, -1);
      const result3 = numbers.indexOf(2, -3);
      const result4 = numbers.indexOf(2, -7);
      
      expect(result).to.eql(2);
      expect(result2).to.eql(-1);
      expect(result3).to.eql(0);
      expect(result4).to.eql(0);
    });
  }); // End describe
}  // End wrapper function