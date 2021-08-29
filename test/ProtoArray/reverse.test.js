const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#reverse()", function () {
    it("reverse() method reverses an array in place", function () {
      const myArrayOdd = new ProtoArray("one", "two", "three");
      const myArrayEven = new ProtoArray("one", "two", "three", "four");
      const result = myArrayOdd.reverse();
      const resultTwo = myArrayEven.reverse();

      expect(myArrayOdd).to.eql(new ProtoArray("three", "two", "one"));
      expect(result).to.eql(new ProtoArray("three", "two", "one"));
      expect(resultTwo).to.eql(new ProtoArray("four", "three", "two", "one"));
    });
  }); // End describe
}; // End wrapper function
