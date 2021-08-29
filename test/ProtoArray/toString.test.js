const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#toString()", function () {
    it("toString() method returns a string representing the specified array and its elements", function () {
      const myArray = new ProtoArray(1, 2, "a", "1a");
      const result = myArray.toString();

      expect(result).to.eql("1,2,a,1a");
    });
  }); // End describe
}; // End wrapper function
