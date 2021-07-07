const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#push()", function () {
    it("push() method adds one or more elements to the end of a ProtoArray and returns the new length of the array.", function () {
      const animals = new ProtoArray("pigs", "goats", "sheep");
      const animalsCount = animals.push("cows");
      const sports = new ProtoArray("soccer", "baseball");
      const sportsCount = sports.push("football", "swimming");

      expect(animals).to.eql(new ProtoArray("pigs", "goats", "sheep", "cows"));
      expect(animalsCount).to.eql(4);
      expect(sports).to.eql(
        new ProtoArray("soccer", "baseball", "football", "swimming")
      );
      expect(sportsCount).to.eql(4);
    });

    it("push() method adds one or more ProtoArrays to the end of a ProtoArray and returns the new length of the array.", function () {
      const animals = new ProtoArray("pigs", "goats", "sheep");
      const sports = new ProtoArray("soccer", "baseball");
      const result = new ProtoArray();
      const count = result.push(animals, sports);

      expect(result).to.eql({
        0: new ProtoArray("pigs", "goats", "sheep"),
        1: new ProtoArray("soccer", "baseball"),
        length: 2,
      });
      expect(count).to.eql(2);
    });
  }); // End describe
}; // End wrapper function
