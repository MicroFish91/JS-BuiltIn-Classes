class ProtoArray {
  constructor(...args){
    this.length = this._assignLen(args);
    this.values = this._assignVals(args);
  }
  _assignLen(args){
    switch(args.length){
      case undefined: return 0;
      case 1: return args[0];
      default: return args.length;
    }
  }
  _assignVals(args){
    let values = {};
    if(args.length !== 1){
      for(let index = 0; index < args.length; index++){
        values[index] = args[index];
      }
    } else {
      for(let index = 0; index < args[0]; index++){
        values[index] = undefined;
      }
    }
    return values;
  }
  _display(){
    console.log(this._getValues());
  }
  _getValues(){
    return Object.values(this.values);
  }
  every(callbackFn) {
    const array = this._getValues();
    for(let index = 0; index < this.length; index++) {
      // every((element, index, array) => { ... } )
      if( !callbackFn(this.values[index], index, array) ) { return false }
    }
    return true;
  }
  fill(value, start = 0, end = this.length) {
    (start < 0) && (start += this.length);  // edge-cases defined by MDN
    (end < 0) && (end += this.length);  //edge-cases defined by MDN
    for(let index = start; index < end; index++) {
      this.values[index] = value;
    }
    return this.values;
  }
  filter(callbackFn){
    let filteredArray = new ProtoArray();
    const array = this._getValues();
    for(let index = 0; index < this.length; index++){
      // MDN: filter((element, index, array) => { ... } )
      callbackFn(this.values[index], index, array) && filteredArray.push(this.values[index]);
    }
    return filteredArray;
  }
  find(callbackFn){
    const array = this._getValues();
    for(let index = 0; index < this.length; index++){
      // find((element, index, array) => { ... } )
     if(callbackFn(this.values[index], index, array)) { return (this.values[index]) }
    }
    return undefined;
  }
  findIndex(callbackFn){
    const array = this._getValues();
    for(let index = 0; index < this.length; index++){
      // findIndex((element, index, array) => { ... } )
      if(callbackFn(this.values[index], index, array)) { return index }
    }
    return -1;
  }
  forEach(callbackFn){
    const array = this._getValues();
    for (let index = 0; index < this.length; index++){
      // MDN: forEach((element, index, array) => { ... } )
      callbackFn(this.values[index], index, array);
    }
  }
  map(callbackFn){
    let mappedArray = new ProtoArray();
    const array = this._getValues();
    for(let index = 0; index < this.length; index++){
      // MDN: map((element, index, array) => { ... } )
      mappedArray.push(callbackFn(this.values[index], index, array));
    }
    return mappedArray;
  }
  push(val){
    this.values[this.length] = val;
    this.length++;
  }
  pop(){
    this.length--;
    const val = this.values[this.length];
    delete this.values[this.length];
    return val;
  }
  reduce(callbackFn, initValue){
    let accumulated = initValue;
    const array = this._getValues();
    for(let index = 0; index < this.length; index++){
      // MDN: reduce((accumulator, currentValue, index, array) => { ... } )
      accumulated = callbackFn(accumulated, this.values[index], index, array);
    }
    return accumulated;
  }
}

let array = new ProtoArray(1, 1, 2, 5, 7, 9, 10);

console.log(array.findIndex(el => el === 7));
