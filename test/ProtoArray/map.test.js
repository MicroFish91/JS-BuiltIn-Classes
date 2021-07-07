const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#map()", function () {
    it("map() Correctly maps return values for the new array.", function () {
      const numbers = new ProtoArray(1, 4, 9, 16);
      const result = numbers.map((number) => number * 2);
      const result2 = numbers.map((number) => Math.sqrt(number));

      expect(result).to.eql(new ProtoArray(2, 8, 18, 32));
      expect(result2).to.eql(new ProtoArray(1, 2, 3, 4));
    });

    it("map() MDN using map to reformat objects in an array.", function () {
      const kvArray = new ProtoArray(
        { key: 1, value: 10 },
        { key: 2, value: 20 },
        { key: 3, value: 30 }
      );

      const result = kvArray.map((obj) => {
        const rObj = {};
        rObj[obj.key] = obj.value;
        return rObj;
      });

      expect(result).to.eql(new ProtoArray({ 1: 10 }, { 2: 20 }, { 3: 30 }));
    });

    it("map() Tricky MDN Use Case involving NaN.", function () {
      const numbers = new ProtoArray("1", "2", "3");
      const result = numbers.map(parseInt);

      expect(result).to.eql(new ProtoArray(1, NaN, NaN));
    });

    it("map() Mapped array contains undefined.", function () {
      const numbers = new ProtoArray(1, 2, 3, 4);
      const result = numbers.map((num, index) => {
        if (index < 3) {
          return num;
        }
      });

      expect(result).to.eql(new ProtoArray(1, 2, 3, undefined));
    });
  }); // End describe
}; // End wrapper function
