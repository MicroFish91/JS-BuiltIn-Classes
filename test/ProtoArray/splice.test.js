const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#splice()", function () {
    it("splice() method changes the contents of an array by removing or replacing existing elements in place", function () {
      const months = new ProtoArray("Jan", "March", "April", "June");
      months.splice(1, 0, "Feb");

      expect(months).to.eql(
        new ProtoArray("Jan", "Feb", "March", "April", "June")
      );
    });
    it("splice() generic remove and insert", function () {
      const myFish = new ProtoArray(
        "angel",
        "clown",
        "drum",
        "mandarin",
        "sturgeon"
      );
      const removed = myFish.splice(3, 1);
      const removedRef = new ProtoArray();
      removedRef.push("mandarin");

      expect(myFish).to.eql(
        new ProtoArray("angel", "clown", "drum", "sturgeon")
      );
      expect(removed).to.eql(removedRef);
    });
    it("splice() understands how to handle negative inputs", function () {
      const myFish = new ProtoArray("angel", "clown", "mandarin", "sturgeon");
      const removed = myFish.splice(-2, 1);
      const removedRef = new ProtoArray();
      removedRef.push("mandarin");

      expect(myFish).to.eql(new ProtoArray("angel", "clown", "sturgeon"));
      expect(removed).to.eql(removedRef);
    });
  }); // End describe
}; // End wrapper function
