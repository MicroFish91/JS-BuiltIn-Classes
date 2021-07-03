const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#join()", function () {
    it("join() returns the correct string when passed no params", function () {
      const elements = new ProtoArray("Wind", "Water", "Fire");
      const result = elements.join();

      expect(result).to.eql("Wind,Water,Fire");
    });

    it("join() returns the correct string when passed params", function () {
      const elements = new ProtoArray("Wind", "Water", "Fire");
      const result = elements.join(", ");
      const result1 = elements.join(" + ");
      const result2 = elements.join("");

      expect(result).to.eql("Wind, Water, Fire");
      expect(result1).to.eql("Wind + Water + Fire");
      expect(result2).to.eql("WindWaterFire");
    });

    it("join() converts undefined, null or an empty array to empty strings", function () {
      const elements = new ProtoArray(
        "Wind",
        "Water",
        undefined,
        null,
        [],
        "Fire"
      );
      const result = elements.join(", ");

      expect(result).to.eql("Wind, Water, , , , Fire");
    });
  }); // End describe
}; // End wrapper function
