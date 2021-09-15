# ProtoArrays

The ProtoArray class constructs list-like objects in much the same way as the JavaScript Array class. I wrote the ProtoArray class as a way to get a better understanding of what is going on under the hood for the JS built-in array class. In the sections that follow, I will add some basic notes on each of the methods that are outlined and possibly show snippets of code that I used to construct the class.

Included is a rather basic test section that I wrote using Mocha and Chai. The tests are based heavily on the ones provided by MDN. Testing these cases brought me very close to replicating the behavior of the JavaScript Array Class. These test cases were instrumental in helping me capture all the tiny nuances that the JS built-in class employs.

Note: For space complexity, we are generally referring to auxiliary space - the extra space or temporary space used by an algorithm.

Testing can be viewed [here](../test/ProtoArray).

## Table of Contents

### [ProtoArray](#ProtoArray-Methods)

1. [constructor](#constructor)
2. [.concat()](#concat)
3. [.every()](#every)
4. [.fill()](#fill)
5. [.filter()](#filter)
6. [.find()](#find)
7. [.findIndex()](#findindex)
8. [.flat()](#flat)
9. [.forEach()](#foreach)
10. [.includes()](#includes)
11. [.indexOf()](#indexof)
12. [.isProtoArray()](#isprotoarray)
13. [.join()](#join)
14. [.lastIndexOf()](#lastindexof)
15. [.map()](#map)
16. [.push()](#push)
17. [.pop()](#pop)
18. [.reduce()](#reduce)
19. [.reverse()](#reverse)
20. [.shift()](#shift)
21. [.slice()](#slice)
22. [.splice()](#splice)
23. [.some()](#some)
24. [.toString()](#tostring)
25. [.unshift()](#unshift)

## ProtoArray Methods

### constructor()

There was a lot to incorporate here as there are many ways to construct an array. These test methods illustrate this well...

```
describe('#constructor()', function(){
  it('Constructs multiple parameters and all data types', function() { //.... }
  it('Constructs a single parameter as length', function(){ //.... }
  it('Constructs when passed a single parameter as an Array', function(){ //.... }
  it('Constructs when passed a single parameter as a ProtoArray', function(){ //.... }
}
```

We can construct a ProtoArray as follows:

```
const myArray = new ProtoArray();
const anotherArray = new ProtoArray(1, 2, 3);
const andAnotherArray = new ProtoArray(5); // ProtoArray of length 5
```

### concat()

Input params: (1... => n) value0, value1, ... , valueN (optional)

The concat() method is used to merge two or more ProtoArrays. This method does not change the existing ProtoArray, but instead returns a new one.

Since this method does not change the array in-place, we use a new variable to store and return the final ProtoArray. Because of this, ProtoArray's concat
traverses both the original array and the concatted values creating both O(n+m) time and space complexity. This rounds to:

O(n) time, O(n) space

| Name   | Best | Average | Worst | Memory | In-Place |
| ------ | :--: | :-----: | :---: | :----: | -------- |
| concat |  n   |    n    |   n   |   n    | N        |

Partial sample snippet:

```
for (let index = 0; index < values.length; index++) {
  val = values[index];
  if (
    val?.constructor?.name === "Array" ||
    val?.constructor?.name === "ProtoArray"
  ) {
    for (let indexTwo = 0; indexTwo < val.length; indexTwo++) {
      newArray.push(val[indexTwo]);
    }
  } else {
    newArray.push(val);
  }
}
```

### every()

Input params - (1) callbackFn(element, index, array)

The every() method tests whether all elements in the array pass the test implemented by the provided function.

We traverse the entire length of the array at worst.

| Name  | Best | Average | Worst | Memory | In-Place |
| ----- | :--: | :-----: | :---: | :----: | -------- |
| every |  1   |    n    |   n   |   1    | N/A      |

Partial sample snippet:

```
for (let index = 0; index < length; index++) {
  if (!callbackFn(this[index], index, this)) {
    return false;
  }
}
```

### fill()

Input params - (1) value, (2) start = optional, (3) end = optional

The fill() method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length).
It returns the modified array (changed in-place).

| Name | Best | Average | Worst | Memory | In-Place |
| ---- | :--: | :-----: | :---: | :----: | -------- |
| fill |  1   |    n    |   n   |   1    | Y        |

Partial sample snippet:

```
for (let index = start; index < end; index++) {
  this[index] = value;
}
```

### filter()

Input params - (1) callbackFn(element, index, array)

The filter() method creates a new array with all elements that pass the test implemented by the provided function (not in-place).

We traverse the entire length of the array and store this in a new array so:

| Name   | Best | Average | Worst | Memory | In-Place |
| ------ | :--: | :-----: | :---: | :----: | -------- |
| filter |  n   |    n    |   n   |   n    | N        |

Partial sample snippet:

```
for (let index = 0; index < length; index++) {
  callbackFn(this[index], index, this) && filteredArray.push(this[index]);
}
return filteredArray;
```

### find()

Input params - (1) callbackFn(element, index, array)

The find() method returns the value of the first element in the provided array that satisfies the provided testing function.
If no values satisfy the testing function, undefined is returned.

At worst, we traverse the entire length of the array.

| Name | Best | Average | Worst | Memory | In-Place |
| ---- | :--: | :-----: | :---: | :----: | -------- |
| find |  1   |    n    |   n   |   1    | N/A      |

Partial sample snippet:

```
for (let index = 0; index < this.length; index++) {
  if (callbackFn(this[index], index, this)) {
    return this[index];
  }
}
```

### findIndex()

Input params - (1) callbackFn(element, index, array)

The findIndex() method returns the index of the first element in the array that satisfies the provided testing function.
Otherwise, it returns -1, indicating that no element passed the test.

At worst, we traverse the entire length of the array.

| Name      | Best | Average | Worst | Memory | In-Place |
| --------- | :--: | :-----: | :---: | :----: | :------: |
| findIndex |  1   |    n    |   n   |   1    |   N/A    |

Partial sample snippet:

```
for (let index = 0; index < this.length; index++) {
  if (callbackFn(this[index], index, this)) {
    return index;
  }
}
```

### flat()

Input params - (1) depth = optional

The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth (not in-place).

Recall our implementation of concat is roughly O(n). We recursively call concat depth number of times such that we have
O(depth \* n). Since depth does not scale with n, we remain with linear behavior.

| Name | Best | Average | Worst | Memory | In-Place |
| ---- | :--: | :-----: | :---: | :----: | :------: |
| flat |  n   |    n    |   n   |   1    |    N     |

Partial sample snippet (example uses other built-in functions, but can be written without them):

```
if (depth > 0) {
  return this.reduce((acc, val) => {
    if (Array.isArray(val) || ProtoArray.isProtoArray(val)) {
      return acc.concat(val.flat(depth - 1));
    } else {
      return acc.concat(val);
    }
  }, new ProtoArray());
} else {
  return this.slice();
}
```

### forEach()

Input params - (1) callbackFn(element, index, array)

The forEach() method executes a provided function once for each array element.

We traverse the entire length of the array each time.

| Name    | Best | Average | Worst | Memory | In-Place |
| ------- | :--: | :-----: | :---: | :----: | -------- |
| forEach |  n   |    n    |   n   |   1    | N/A      |

Partial sample snippet:

```
for (let index = 0; index < this.length; index++) {
  callbackFn(this[index], index, this);
}
```

### includes()

Input params - (1) searchElement, (2) fromIndex = optional

The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.

At worst, we will traverse the entire length of the array.

| Name     | Best | Average | Worst | Memory | In-Place |
| -------- | :--: | :-----: | :---: | :----: | -------- |
| includes |  1   |    n    |   n   |   1    | N/A      |

Partial sample snippet:

```
for (let index = fromIndex; index < this.length; index++) {
  if (this[index] === value) {
    return true;
  }
}
```

### indexOf()

Input params - (1) searchElement, (2) fromIndex = optional

The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.

At worst, we will traverse the entire length of the array.

| Name    | Best | Average | Worst | Memory | In-Place |
| ------- | :--: | :-----: | :---: | :----: | -------- |
| indexOf |  1   |    n    |   n   |   1    | N/A      |

Partial sample snippet:

```
for (let index = fromIndex; index < this.length; index++) {
  if (this[index] === value) {
    return index;
  }
}
```

### isProtoArray()

Input params - (1) value

The ProtoArray.isProtoArray() static method determines whether the passed value is a ProtoArray.

| Name         | Best | Average | Worst | Memory | In-Place |
| ------------ | :--: | :-----: | :---: | :----: | -------- |
| isProtoArray |  1   |    1    |   1   |   1    | N/A      |

Partial sample snippet:

```
static isProtoArray(value) {
  return value?.constructor?.name === "ProtoArray" ? true : false;
}
```

### join()

Input params - (1) separator = optional

The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object),
separated by commas or a specified separator string.

We will traverse the entire length of the array.

| Name | Best | Average | Worst | Memory | In-Place |
| ---- | :--: | :-----: | :---: | :----: | -------- |
| join |  n   |    n    |   n   |   n    | N/A      |

### lastIndexOf()

Input params - (1) searchElement, (2) fromIndex = optional

The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present.
The array is searched backwards, starting at fromIndex.

At worst, we will traverse the entire length of the array.

| Name        | Best | Average | Worst | Memory | In-Place |
| ----------- | :--: | :-----: | :---: | :----: | -------- |
| lastIndexOf |  1   |    n    |   n   |   1    | N/A      |

Partial sample snippet:

```
for (let index = fromIndex; index >= 0; index--) {
  if (this[index] === value) {
    return index;
  }
}
```

### map()

Input params - (1) callbackFn(element, index, array)

The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

We traverse the entire length of the array.

| Name | Best | Average | Worst | Memory | In-Place |
| ---- | :--: | :-----: | :---: | :----: | -------- |
| map  |  n   |    n    |   n   |   n    | N        |

Partial sample snippet:

```
for (let index = 0; index < this.length; index++) {
  mappedArray.push(callbackFn(this[index], index, this));
}
return mappedArray;
```

### push()

Input params - (1... => n) value0, value1, ... , valueN (optional)

The push() method adds one or more elements to the end of an array and returns the new length of the array.

The number of times we must loop proportionally increases with the number of values received.

| Name | Best | Average | Worst | Memory | In-Place |
| ---- | :--: | :-----: | :---: | :----: | -------- |
| push |  1   |    n    |   n   |   n    | Y        |

Partial sample snippet:

```
push(...val) {
  for (let index = 0; index < val.length; index++) {
    this[this.length] = val[index];
    this.length++;
  }
  return this.length;
}
```

### pop()

Input params - None

The pop() method removes the last element from an array and returns that element. This method changes the length of the array.

| Name | Best | Average | Worst | Memory | In-Place |
| ---- | :--: | :-----: | :---: | :----: | -------- |
| pop  |  1   |    1    |   1   |   1    | Y        |

Partial sample snippet:

```
this.length--;
const val = this[this.length];
delete this[this.length];
return val;
```

### reduce()

Input params - (1) callbackFn(previousValue, currentValue, currentIndex = optional, array = optional),
(2) initialValue

The reduce() method executes a user-supplied “reducer” callback function on each element of the array,
passing in the return value from the calculation on the preceding element. The final result of running
the reducer across all elements of the array is a single value.

We traverse the full length of the array and reassign the value n times.

| Name   | Best | Average | Worst | Memory | In-Place |
| ------ | :--: | :-----: | :---: | :----: | -------- |
| reduce |  n   |    n    |   n   |   n    | N/A      |

Partial sample snippet:

```
let accumulated = initValue;
//...
for (let index = startIndex; index < this.length; index++) {
  accumulated = callbackFn(accumulated, this[index], index, this);
}
return accumulated;
```

### reverse()

Input params - None

The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.

Since no new array is introduced (changes are made in place), we do not have n space complexity.

| Name    | Best | Average | Worst | Memory | In-Place |
| ------- | :--: | :-----: | :---: | :----: | -------- |
| reverse |  n   |    n    |   n   |   1    | Y        |

### shift()

Input params - None

The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.

Since we have to reshift all elements each time we shift, we have n time complexity.

| Name  | Best | Average | Worst | Memory | In-Place |
| ----- | :--: | :-----: | :---: | :----: | -------- |
| shift |  n   |    n    |   n   |   1    | Y        |

### slice()

Input params - (1) start = optional, (2) end = optional

The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included)
where start and end represent the index of items in that array. The original array will not be modified.

| Name  | Best | Average | Worst | Memory | In-Place |
| ----- | :--: | :-----: | :---: | :----: | -------- |
| slice |  1   |    n    |   n   |   n    | N        |

Partial sample snippet:

```
//....
for (let index = start; index < end; index++) {
  newArray.push(this[index]);
}
return newArray;
```

### splice()

Input params - (1) start, (2) deleteCount = optional, (3) item1....itemn

The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.

Worst case we have to traverse all of item 1 - n which affects our space and time linearly.

| Name   | Best | Average | Worst | Memory | In-Place |
| ------ | :--: | :-----: | :---: | :----: | -------- |
| splice |  1   |    n    |   n   |   n    | Y        |

Partial sample snippet:

```
const newArray = new ProtoArray(
  ...this.slice(0, start),
  ...values,
  ...this.slice(start + deleteCount, this.length)
);
```

### some()

Input params - (1) callbackFn(element, index, array)

The some() method tests whether at least one element in the array passes the test implemented by the provided function.
It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns
false. It doesn't modify the array.

| Name | Best | Average | Worst | Memory | In-Place |
| ---- | :--: | :-----: | :---: | :----: | -------- |
| some |  1   |    n    |   n   |   1    | N/A      |

```
for (let index = 0; index < this.length; index++) {
  if (callbackFn(this[index], index, array)) {
    return true;
  }
}
```

### toString()

Input params - None

The toString() method returns a string representing the specified array and its elements.

| Name     | Best | Average | Worst | Memory | In-Place |
| -------- | :--: | :-----: | :---: | :----: | -------- |
| toString |  n   |    n    |   n   |   n    | N/A      |

### unshift()

Input params - (1) element0 - elementn...

The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.

When we add elements to the front, we must also reshift the indices of the other elements.

| Name    | Best | Average | Worst | Memory | In-Place |
| ------- | :--: | :-----: | :---: | :----: | -------- |
| unshift |  n   |    n    |   n   |   n    | Y        |

## Existing Issues/Limitations

After having written almost all of the ProtoArray class code + testing, I realized there was an issue I had not properly addressed. When assigning a property like so:

```
const myArray = new ProtoArray(1, 2, 3);
myArray[5] = 6;
console.log(myArray.length);  // 3
```

In such a situation, the length property would not be updated because the new value has not been added using one of the built-in methods. I'm pretty sure I could get around this by implementing getter and setter methods. In the case of .length, I think providing a getter method that checks for the largest index key and basing the length around that would allow the length property to be captured in a scenario like the one above.
