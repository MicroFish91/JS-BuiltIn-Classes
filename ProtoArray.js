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
    console.log(Object.values(this.values));
  }
  forEach(callback){
    const array = Object.values(this.values);
    for (let index = 0; index < this.length; index++){
      // MDN: forEach((element, index, array) => { ... } )
      callback(this.values[index], index, array);
    }
  }
  map(callback){
    let newArray = new ProtoArray();
    const array = Object.values(this.values);
    for(let index = 0; index < this.length; index++){
      // MDN: map((element, index, array) => { ... } )
      newArray.push(callback(this.values[index], index, array));
    }
    return newArray;
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
}