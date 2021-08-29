const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#unshift()", function () {
    it("unshift() method adds one or more elements to the beginning of an array and returns the new length of the array", function () {
      const myArray = new ProtoArray(1, 2, 3);
      const myArrayTwo = new ProtoArray(1, 2, 3);
      const myArrayThree = new ProtoArray(1, 2, 3);

      const length = myArray.unshift(4, 5);
      myArrayTwo.unshift(-2, -1);
      myArrayThree.unshift(new ProtoArray(-4, -3));

      expect(length).to.eql(5);
      expect(myArray).to.eql(new ProtoArray(4, 5, 1, 2, 3));
      expect(myArrayTwo).to.eql(new ProtoArray(-2, -1, 1, 2, 3));
      expect(myArrayThree).to.eql(
        new ProtoArray(new ProtoArray(-4, -3), 1, 2, 3)
      );
    });
  }); // End describe
}; // End wrapper function
