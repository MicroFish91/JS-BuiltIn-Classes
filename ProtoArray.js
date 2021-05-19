class ProtoArray {
  constructor(...args){
    this.length = args.length || 0;
    this.values = this._assignArgs(args);
  }
  _assignArgs(args){
    let values = {};
    for(let index = 0; index < args.length; index++){
      values[index] = args[index];
    }
    return values;
  }
  _display(){
    console.log(this._getValues());
  }
  _getValues(){
    return Object.values(this.values);
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