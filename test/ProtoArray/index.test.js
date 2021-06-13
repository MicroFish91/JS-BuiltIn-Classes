const protoConstructorTest = require('./constructor.test.js');
const protoConcatTest = require('./concat.test.js');
const protoEveryTest = require('./every.test.js');
const protoFillTest = require('./fill.test.js');
const protoFilterTest = require('./filter.test.js');
const protoFindTest = require('./find.test.js');
const protoFindIndexTest = require('./findIndex.test.js');
const protoFlatTest = require('./flat.test.js');
const protoForEachTest = require('./forEach.test.js');

describe('ProtoArray', function(){
  protoConstructorTest();
  protoConcatTest();
  protoEveryTest();
  protoFillTest();
  protoFilterTest();
  protoFindTest();
  protoFindIndexTest();
  protoFlatTest();
  protoForEachTest();
});