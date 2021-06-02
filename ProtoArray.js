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
  _standardizeForeignValues(values) {
    return (ProtoArray.isProtoArray(values)) ? Object.values(values.values) : values;
  }
  _getValues(){
    return Object.values(this.values);
  }
  concat(...values){
    let newArray = new ProtoArray( ...this._getValues() );
    let standardizedVal;
    for(let index = 0; index < values.length; index++){
      // Could have skipped standardizing and checked only "ProtoArray" but decided to make it compatible for both
      standardizedVal = this._standardizeForeignValues(values[index]);
      if(standardizedVal?.constructor?.name === "Array"){
        for(let indexTwo = 0; indexTwo < standardizedVal.length; indexTwo++){
          newArray.push(standardizedVal[indexTwo]);
        }
      } else {
        newArray.push(standardizedVal);
      }
    }
    return newArray;
  }
  every(callbackFn) {
    const array = this._getValues();
    for(let index = 0; index < this.length; index++) {
      // every((element, index, array) => { ... } )
      if(!callbackFn(this.values[index], index, array)) { 
        return false; 
      }
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