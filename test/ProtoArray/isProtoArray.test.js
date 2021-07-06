const { expect } = require("chai");
const ProtoArray = require("../../ProtoArray/ProtoArray.js");

module.exports = function () {
  describe("#isProtoArray()", function () {
    it("isProtoArray() MDN tests that should return true", function () {
      const result = ProtoArray.isProtoArray(new ProtoArray());
      const result2 = ProtoArray.isProtoArray(
        new ProtoArray("a", "b", "c", "d")
      );
      const result3 = ProtoArray.isProtoArray(new ProtoArray(3));
      const result4 = ProtoArray.isProtoArray(ProtoArray.prototype);

      expect(result).to.eql(true);
      expect(result2).to.eql(true);
      expect(result3).to.eql(true);
      expect(result4).to.eql(true);
    });

    it("isProtoArray() MDN tests that should return false", function () {
      const result = ProtoArray.isProtoArray();
      const result2 = ProtoArray.isProtoArray({});
      const result3 = ProtoArray.isProtoArray(null);
      const result4 = ProtoArray.isProtoArray(undefined);
      const result5 = ProtoArray.isProtoArray(17);
      const result6 = ProtoArray.isProtoArray("ProtoArray");
      const result7 = ProtoArray.isProtoArray(true);
      const result8 = ProtoArray.isProtoArray(false);

      expect(result).to.eql(false);
      expect(result2).to.eql(false);
      expect(result3).to.eql(false);
      expect(result4).to.eql(false);
      expect(result5).to.eql(false);
      expect(result6).to.eql(false);
      expect(result7).to.eql(false);
      expect(result8).to.eql(false);
    });
  }); // End describe
}; // End wrapper function
