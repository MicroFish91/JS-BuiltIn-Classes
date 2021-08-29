const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#slice()", function () {
    it("slice() method returns a shallow copy of a portion of an array into a new array object", function () {
      const animals = new ProtoArray(
        "ant",
        "bison",
        "camel",
        "duck",
        "elephant"
      );

      const result = animals.slice(2);
      const resultTwo = animals.slice(1, 5);

      expect(result).to.eql(new ProtoArray("camel", "duck", "elephant"));
      expect(resultTwo).to.eql(
        new ProtoArray("bison", "camel", "duck", "elephant")
      );
      expect(animals).to.eql(
        new ProtoArray("ant", "bison", "camel", "duck", "elephant")
      );
    });
    it("slice() method works with negative edge-cases", function () {
      const animals = new ProtoArray(
        "ant",
        "bison",
        "camel",
        "duck",
        "elephant"
      );

      const resultThree = animals.slice(-2);
      const resultFour = animals.slice(2, -1);

      expect(resultThree).to.eql(new ProtoArray("duck", "elephant"));
      expect(resultFour).to.eql(new ProtoArray("camel", "duck"));
    });
  }); // End describe
}; // End wrapper function
