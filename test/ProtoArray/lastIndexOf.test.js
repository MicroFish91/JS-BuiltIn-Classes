const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#lastIndexOf()", function () {
    it("lastIndexOf() Correctly returns the index number when given only 1 parameter.", function () {
      const numbers = new ProtoArray(2, 5, 9, 2);
      const result = numbers.lastIndexOf(2);
      const result2 = numbers.lastIndexOf(7);

      expect(result).to.eql(3);
      expect(result2).to.eql(-1);
    });

    it("lastIndexOf() Correctly returns the index number when given 2 parameters.", function () {
      const numbers = new ProtoArray(2, 5, 9, 2);
      const result = numbers.lastIndexOf(2, 3); // 3
      const result2 = numbers.lastIndexOf(2, 2); // 0
      const result3 = numbers.lastIndexOf(2, -2); // 0
      const result4 = numbers.lastIndexOf(2, -1); // 3

      expect(result).to.eql(3);
      expect(result2).to.eql(0);
      expect(result3).to.eql(0);
      expect(result4).to.eql(3);
    });
  }); // End describe
}; // End wrapper function
