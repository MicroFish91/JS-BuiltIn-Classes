module.exports = class ProtoArray {
  constructor(...args){
    this.length = this._assignLen(args);
    this._assignVals(args);
  }
  _assignLen(args){
    switch(args.length){
      case undefined: return 0;
      case 1: 
        if(ProtoArray.isProtoArray(args[0]) || Array.isArray(args[0])){
          return 1;
        } else {
          return args[0];
        }
      default: return args.length;
    }
  }
  _assignVals(args){
    if(args.length !== 1){
      for(let index = 0; index < args.length; index++){
        this[index] = args[index];
      }
    } else if (args.length === 1 && (Array.isArray(args[0]) || ProtoArray.isProtoArray(args[0]))) {
      this[0] = args[0];
    } else {
      for(let index = 0; index < args[0]; index++){
        this[index] = undefined;
      }
    }
  }
  _display(){
    console.log(this._getValues());
  }
  _standardizeForeignValues(values) {
    return (ProtoArray.isProtoArray(values)) ? Object.values(values.values) : values;
  }
  _getValues(){
    const newProto = { ...this };
    delete newProto['length'];
    return Object.values(newProto);
  }
  concat(...values){
    const newArray = new ProtoArray(...this._getValues());
    let val;
    for(let index = 0; index < values.length; index++){
      val = values[index];
      if(val?.constructor?.name === "Array" || val?.constructor?.name === "ProtoArray"){
        for(let indexTwo = 0; indexTwo < val.length; indexTwo++){
          newArray.push(val[indexTwo]);
        }
      } else {
        newArray.push(val);
      }
    }
    return newArray;
  }
  every(callbackFn) {
    let length = this.length;
    for(let index = 0; index < length; index++) {
      // every((element, index, array) => { ... } )
      // Passed "this" instead of "this.values" to match MDN test behavior
      if(!callbackFn(this[index], index, this)) {    
        return false; 
      }
      // Added this line to match behavior shown by MDN Test Case #3
      (this.length < length) ? length = this.length : null;
    }
    return true;
  }
  fill(value, start = 0, end = this.length) {
    (start < 0) && (start += this.length);  // edge-cases defined by MDN
    (start > this.length) && (start = this.length); // edge-cases defined by MDN
    (end < 0) && (end += this.length);  //edge-cases defined by MDN
    (end > this.length) && (end = this.length); //edge-cases defined by MDN
    for(let index = start; index < end; index++) {
      this[index] = value;
    }
    return this;
  }
  filter(callbackFn){
    const filteredArray = new ProtoArray();
    let length = this.length;
    for(let index = 0; index < length; index++){
      // MDN: filter((element, index, array) => { ... } )
      callbackFn(this[index], index, this) && filteredArray.push(this[index]);
      if(length < this.length){
        length = this.length;
      }
    }
    return filteredArray;
  }
  find(callbackFn){
    const array = this._getValues();
    for(let index = 0; index < this.length; index++){
      // find((element, index, array) => { ... } )
      if(callbackFn(this.values[index], index, array)) { 
        return (this.values[index]); 
      }
    }
    return undefined;
  }
  findIndex(callbackFn){
    const array = this._getValues();
    for(let index = 0; index < this.length; index++){
      // findIndex((element, index, array) => { ... } )
      if(callbackFn(this.values[index], index, array)) { 
        return index;
      }
    }
    return -1;
  }
  flat(depth = 1){
    // To flat single level array is equivalent to
    // arr.reduce((acc, val) => acc.concat(val), [])
    // So use recursion
    return depth > 0 ? this.reduce((acc, val) => {
      if(Array.isArray(val) || ProtoArray.isProtoArray(val)) {
        return acc.concat(val.flat(depth - 1));
      }
      return acc.concat(val);
    }, []) : this.slice();
  }
  forEach(callbackFn){
    const array = this._getValues();
    for (let index = 0; index < this.length; index++){
      // MDN: forEach((element, index, array) => { ... } )
      callbackFn(this.values[index], index, array);
    }
  }
  includes(value, fromIndex = 0){
    // MDN Edge Cases
    if(fromIndex > this.length){
      return false;
    } else if (fromIndex < 0 && Math.abs(fromIndex) < this.length){
      fromIndex = this.length - fromIndex;
    } else if (fromIndex < 0 && Math.abs(fromIndex) >= this.length){
      fromIndex = 0;
    }
    // Main Solution
    for(let index = fromIndex; index < this.length; index++){
      if(this.values[index] === value) {
        return true;
      }
    }
    return false;
  }
  indexOf(value, fromIndex = 0){
    for(let index = fromIndex; index < this.length; index++){
      if(this.values[index] === value){
        return index;
      }
    }
    return -1;
  }
  // Analogous to Array.isArray()
  static isProtoArray(value){
    return (value?.constructor?.name === "ProtoArray") ? true : false;
  }
  join(separator){
    let newString = '';
    for(let index = 0; index < this.length; index++){
      newString += this.values[index] + ((index !== this.length - 1) && separator);
    }
    return newString;
  }
  lastIndexOf(value, fromIndex = (this.length - 1)){
    // MDN Edge Cases
    if(fromIndex > (this.length - 1)) {
      fromIndex = this.length - 1;
    } else if (fromIndex < 0) {
      fromIndex = this.length + fromIndex;
    }

    for(let index = fromIndex; index >= 0; index--){
      if(this.values[index] === value){
        return index;
      }
    }
    return -1;
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
    this[this.length] = val;
    this.length++;
  }
  pop(){
    this.length--;
    const val = this[this.length];
    delete this[this.length];
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
  reverse(){
    let front, back;
    for(let index = 0; index < this.length / 2 - 1; index++){
      front = this.values[index];
      back = this.values[this.length - index];
      this.values[index] = back;
      this.values[this.length - index] = front;
    }
    return this.values;
  }
  shift(){
    if(this.length === 0) { return undefined }
    const shiftedVal = this.values[0];
    delete this.values[0];
    this.length--;
    for(let index = 0; index < this.length; index++){
      this.values[index] = this.values[index + 1];
    }
    return shiftedVal;
  }
  slice(start = 0, end = this.length){
    let newArray = new ProtoArray();
    for(let index = start; index < end; index++){
      newArray.push(this.values[index]);
    }
    return newArray._getValues();
  }
  some(callbackFn){
    const array = this._getValues();
    for(let index = 0; index < this.length; index++){
      // some((element, index, array) => { ... } )
      if(callbackFn(this.values[index], index, array)){
        return true;
      }
    }
    return false;    
  }
  splice(start = 0, deleteCount = (this.length - start), ...values){
    // MDN-Defined Edge Cases
    if(start > this.length){
      start = this.length;
    } else if (start < 0) {
      start = this.length + start;
    } else if (this.length + start < 0) {
      start = 0;
    }

    if(deleteCount > this.length - start){
      deleteCount = this.length - start;
    } else if (deleteCount <= 0 && !values) {
      return [];
    }

    // Main
    const spliced = [ ...this.slice(start, start + deleteCount)];
    this.values = new ProtoArray(
      ...this.slice(0, start), 
      ...values, 
      ...this.slice(start + deleteCount, this.length)
    ).values;
    this.length = this.length + values.length - deleteCount;
    return spliced;
  }
  toString(){
    return this.join(',');
  }
  unshift(...values){
    this.length += values.length;
    this.values = new ProtoArray(...values, ...this._getValues()).values;
  }
}