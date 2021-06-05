const protoConstructorTest = require('./constructor.spec.js');
const protoConcatTest = require('./concat.spec.js');
const protoEveryTest = require('./every.spec.js');

describe('ProtoArray', function(){
  protoConstructorTest();
  protoConcatTest();
  protoEveryTest();
});
