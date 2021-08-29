const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#reverse()", function () {
    it("reverse() method reverses an array in place", function () {
      const myArray = new ProtoArray("one", "two", "three");
      const result = myArray.reverse();

      expect(myArray).to.eql(new ProtoArray("three", "two", "one"));
      expect(result).to.eql(new ProtoArray("three", "two", "one"));
    });
  }); // End describe
}; // End wrapper function
