const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#some()", function () {
    it("some() method returns true if it finds an element for which the provided function returns true, else false", function () {
      const myArray = new ProtoArray(1, 2, 3, 4, 5);
      const even = (element) => element % 2 === 0;
      const result = myArray.some(even);

      expect(result).to.eql(true);
    });
  }); // End describe
}; // End wrapper function
