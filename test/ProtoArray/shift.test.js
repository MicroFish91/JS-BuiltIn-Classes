const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#shift()", function () {
    it("shift() method removes the first element from an array and returns that removed element", function () {
      const myArray = new ProtoArray(1, 2, 3);
      const firstElement = myArray.shift();

      expect(myArray).to.eql(new ProtoArray(2, 3));
      expect(firstElement).to.eql(1);
    });
    it("MDN Test case with while loop", function () {
      const names = new ProtoArray("Andrew", "Edward", "Paul", "Chris", "John");
      while (typeof names.shift() !== "undefined") {}

      expect(names).to.eql(new ProtoArray());
    });
  }); // End describe
}; // End wrapper function
