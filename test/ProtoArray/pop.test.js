const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#pop()", function () {
    it("pop() mutates the original array by removing and returning its last element", function () {
      const myFish = new ProtoArray("angel", "clown", "mandarin", "sturgeon");
      const popped = myFish.pop();

      expect(myFish).to.eql(new ProtoArray("angel", "clown", "mandarin"));
      expect(popped).to.eql("sturgeon");
    });
  }); // End describe
}; // End wrapper function
