const { expect } = require('chai');
const ProtoArray = require('../../ProtoArray/ProtoArray.js');

module.exports = function() {
  describe('#every()', function(){
    it('Every returns true when all values are in range', function() {
      const arrayOne = new ProtoArray(1, 30, 39, 29, 10, 13);
      const result = arrayOne.every(num => num < 40);

      expect(result).to.eql(true);
    });
    it('Every returns false when a value is out of range', function() {
      const arrayOne = new ProtoArray(12, 5, 8, 130, 44);
      const result = arrayOne.every(num => num >= 10);

      expect(result).to.eql(false);
    });
    it('MDN Test #1 - Value Alteration', function() {
      const arrayOne = new ProtoArray(1, 2, 3, 4);
      const elements = [];
      const result = arrayOne.every((elem, index, arr) => {
        arr[index + 1] -= 1
        elements.push(elem);
        return elem < 2;
      });

      expect({ result, elements }).to.eql({ result: false, elements: [1, 1, 2] });
    });
    it('MDN Test #2 - Appending Items', function() {
      const arrayOne = new ProtoArray(1, 2, 3);
      const elements = [];
      const result = arrayOne.every((elem, index, arr) => {
        arr.push('new');
        elements.push(elem);
        return elem < 4;
      });

      expect({ result, elements }).to.eql({ result: true, elements: [1, 2, 3] });
    });
    it('MDN Test #3 - Deleting Items', function() {
      const arrayOne = new ProtoArray(1, 2, 3, 4);
      const elements = [];
      const result = arrayOne.every((elem, index, arr) => {
        arr.pop();
        elements.push(elem);
        return elem < 4;
      });

      expect({ result, elements }).to.eql({ result: true, elements: [1, 2] });
    });
  }); // End describe
}  // End wrapper function