const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#reduce()", function () {
    it("reduce() method correctly sums multiple integers", function () {
      const myArray = new ProtoArray(1, 2, 3, 4);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      const result = myArray.reduce(reducer);
      const resultTwo = myArray.reduce(reducer, 5);

      expect(result).to.eql(10);
      expect(resultTwo).to.eql(15);
    });
    it("reduce() method sums values in an object array", function () {
      const myArray = new ProtoArray({ x: 1 }, { x: 2 }, { x: 3 });
      const sum = myArray.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.x;
      }, 0);

      expect(sum).to.eql(6);
    });
  }); // End describe
}; // End wrapper function
