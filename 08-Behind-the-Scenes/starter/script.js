'use strict';

// Scoping in Practice

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     let output = `${firstName}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       // Creating NEW variable with same name as outer scope's variable
//       const firstName = 'Steven';

//       // Reassigning outer scope's variable
//       output = 'NEW OUTPUT!';

//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//     }
//     // console.log(str);
//     console.log(millenial);
//     // console.log(add(2, 3));
//     console.log(output);
//   }
//   printAge();
//   return age;
// }

// const firstName = 'Jonas';
// calcAge(1991);
// // console.log(age);
// // printAge();

// Hoisting and TDZ in Practice

// Variables
// console.log(me);
// console.log(job);
// console.log(year);

// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;

// // Functions

// // console.log(addDecl(2, 3));
// // console.log(addExpr(2, 3));
// // console.log(addArrow(2, 3));

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// // Example
// console.log(undefined);
// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log('All products deleted!');
// }

// // let, const & var
// // variables declared with var will create a property on the global window object
// // and that can have some implications in some cases
// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === windbirtow.x);
// console.log(y === window.y);
// console.log(z === window.z);

// The this Keyword in Practice

// // window object
// console.log(this);

// // undefined
// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   // console.log(this);
// };
// calcAge(1991);

// // window object
// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   // console.log(this);
// };
// calcAgeArrow(1980);

// const jonas = {
//   birthYear: 1975,
//   job: 'teacher',
//   calcAge: function () {
//     // console.log(this);
//     console.log(2037 - this.birthYear);
//   },
// };

// jonas.calcAge();

// const matilda = {
//   birthYear: 2017,
// };

// matilda.calcAge = jonas.calcAge;
// matilda.calcAge();

// const f = jonas.calcAge;
// f();

// Regular Functions vs. Arrow Functions

// // var firstName = 'Matilda';

// const jonas = {
//   firstName: 'Jonas',
//   birthYear: 1991,
//   job: 'teacher',
//   calcAge: function () {
//     // console.log(this);
//     console.log(2037 - this.birthYear);

//     // Solution 1
//     // const self = this; // self or that
//     // const isMillenial = function () {
//     //   console.log(self);
//     //   console.log(self.birthYear >= 1981 && self.birthYear <= 1996);
//     // };

//     // Solution 2
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.birthYear >= 1981 && this.birthYear <= 1996);
//       // console.log(this.birthYear >= 1981 && this.birthYear <= 1996);
//     };

//     isMillenial();
//   },

//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };
// jonas.greet();
// jonas.calcAge();
// // console.log(this.firstName);

// // Arguments keyword
// // Just like the this keyword, the arguments keyword
// // is only available in regular functions - function declarations and function expressions

// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12);

// var addArrow = (a, b) => {
//   // arguments is not defined
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 8);

// Primitives vs. Objects (Primitive vs. Reference Types)

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log(friend);
// console.log(me);

// Primitive types
// Primitives
//- Number
//- String
//- Boolean
//- Undefined
//- null
//- Symbol
//- BigInt

// Reference types
// Objects
//- Object literal
//- Arrays
//- Functions
//- Many more...

// Next, we need to remember about JS Engine.
// So, the engine has two components: the Call stack,
// where functions are executed, and the Heap, where Objects are stored in memory.
// And that's right, all Objects or in other words,
// Reference types, will get stored right in the Heap.
// On the other hand, primitives or Primitive types are stored in the Call stack,
// and with that I mean that primitive types are executed in the Execution contexts
// in which they are declared.

// It's a misconception that all variables declared with const are immutable.
// In fact, it is only true for Primitive values, but not for Reference values.

// Primitives vs. Objects in Practice

// // Primitive types
// let lastName = 'Williams';
// let oldLastName = lastName;
// lastName = 'Davis';
// console.log(lastName, oldLastName);

// // Reference types
// const jessica = {
//   firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
// };

// const marriedJessica = jessica;
// marriedJessica.lastName = 'Davis';
// console.log('Before marriage:', jessica);
// console.log('After marriage:', marriedJessica);

// // marriedJessica = {};

// // Copying Objects
// const jessica2 = {
//   firstName: 'Jessica',
//   lastName: 'Williams',
//   age: 27,
//   family: ['Alice', 'Bob'],
// };

// const jessicaCopy = Object.assign({}, jessica2);
// jessicaCopy.lastName = 'Davis';

// jessicaCopy.family.push('Mary');
// jessicaCopy.family.push('John');

// console.log('Before marriage:', jessica2);
// console.log('After marriage:', jessicaCopy);
