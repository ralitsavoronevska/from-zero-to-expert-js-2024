'use strict';

// Default Parameters

// const bookings = [];

// // ES6
// // Something really cool about the default values is
// // that they can contain any expression => price = 199 * 1.2.
// // But what even more usefull is that we can, actually,
// // use the values of the other parameters that we've set before it.
// // => price - 199 * numPassenders
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // ES5
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// // And this is how we, basically skip adefault value
// // that we want to leave at it's default.
// createBooking('LH123', undefined, 1000);

// How Passing Arguments Works: Value vs. Reference

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 24739479284,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 24739479284) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// // Is the same as doing...
// // When we are trying to copy an Object like this
// // we are really copying the reference to that Object
// // in the Memory Heap, but they both point to the same
// // Object in memory.

// // In summary: passing a Primitive Type to a function
// // is, really, just the same as creating a copy like this:
// const flightNum = flight;
// // but outside of the function. So, the value is simply copied.

// // On the other hand, when pass an Onject to a function
// // it is, really, just copying an Object, like this:
// const passenger = jonas;
// // And so, whatever we change in the copy
// // will also happen in the original.

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };

// newPassport(jonas);
// checkIn(flight, passenger);

// // In programming there are 2 terms that are used
// // all the time when dealing with functions,
// // which are: passing by value and passing by reference.
// // JavaScript doesn't have passing by reference,
// // only passing by value, even thought it looks like
// // passing by value. so, basically, we pass a reference
// // TO the function, but we do not pass BY reference.
// // this is an important distingtion.

// First-Class and Higher-Order Functions

// Let's now talk about the fundamental property of the JavaScript Language,
// which is the fact that it has First-Class Functions.
// This enables us to write Higher-Order Functions.

// JavaSript is a language that has First-Class Functions,
// which in technical terms, means that Functions are,
// so called, First Class Citizens. In practice that means that
// Functions are simply treated as values.

// It's simply, because Functions are, really, just another type of Object
// in JavaScript and since Objects are values, Functions are values too.
// And since Functions are values too, there are a bunch of interesting things
// that we can do with them. Like:

// Example: const add = (a, b) => a + b;
// Example:
// const counter = {
// value: 23,
// inc: function() { this.value++; }
//}
//- Store Functions in variables or Object properties;

// Example: const greet() = () => console.log('Hey Jonas');
// btnClose.addEventListener('click', greet);
//- Pass Functions as arguments to OTHER Function;

//- Return Functions FROM Functions;

// Finally, remember that Functions are Objects and many types of Objects
// in JavaScript have methods, right? Like Array methods, for example.
// And, actually, there are also Function methods, so, methods that
// we can called on Functions.
// Example: counter.inc.bind(someOtherObject);

// Higher-Order Functions is eighter a Function that receives
// another Function as an argument, that returns a new Function, or both.
// This is possible because of First-Class Functions.

//- Function that receives another Function.
//- Function that returns a new Function.

// So, First-Class Functions is just e feature that a programming langueage
// eighter has or does not have. All it means is that all Functions are values.
// There are NO First-Class Functions in practice. It's just a concept.
// There are, however, Higher-Order Functions in practice, which are possible,
// because the language supports First-Class Functions. So, there is a dufference.

// Functions Accepting Callback Functions

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...other] = str.split(' ');
//   return [first.toUpperCase(), ...other].join(' ');
// };

// // Higher-Order Function
// const transformer = function (str, fn) {
//   console.log(`Original String: ${str}`);
//   console.log(`Transformed String: ${fn(str)}`);
//   // We spoke about that Functions even have methods.
//   // Besides methods, Functions can even have properties.
//   // And one of them is the name property.
//   console.log(`Transformed by: ${fn.name}`);
// };
// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// // JS uses Callbaks all the time
// const high5 = function () {
//   console.log('👋');
// };

// // Using the addEventListener() Higher-Order function
// // Just like in the transformer Function, here we
// // pass in a Callback function, which is high5.
// // It is also called the Event Handler or the Event Listener.
// // We don't call the Callback Functions, because the Higher-Order Function
// // will call them on the happening on the Event, in this case, on click.
// document.body.addEventListener('click', high5);

// // There are many many many examples in the JavaScript language
// // and this concept of Callback Functions is used all the time
// // in built-in JavaScript Functions. So there are many many many
// // examples. For example, the forEach() Function that we call
// // on Arrays:

// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// // Why do Callbaks so much used in JS and why are they so helpfull?
// // The first big advange of this is that it makes it easy to split our code
// // into more reusable and interconnected parts. But there is a second and
// // way more important advantage, which is the fact that Callback Functions allow us
// // to create Abstraction.

// // Abstraction is something really important in Programming.
// // Abstractions means that we hide the details of some code implementation,
// // because we don't, really, care about all that detail. And this allows us to think
// // about promblems at a higher, more Abstract level. So that's why it is called an Abstraction.

// // We abstracted the code away into other Functions.
// // So, again, we created another level of Abstraction.
// // So, the transformer Function is, basically, delegating
// // the String transformation to the other, lower level Functions,
// // which are oneWord and upperFirstWord.

// Functions Returning Functions

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// // In case you are wondering "Why that actually works?"
// // it is because of something called Closure.
// // Closures are very complex and difficult to understand mechanisms
// // that's part of JavaScript. Closures is one of the most missunderstood // topics in JavaScript.

// // And, of course we can do it all in one go:
// greet('Hello')('Jonas');

// // What's the poin of having Functions calling other functions?
// // This is extremely useful is some situations and, especially
// // if we are using a very important programming paradigm called
// // Functional Programming.

// // Challenge:
// // Try to rewrite this greet() function using Arrow functions
// const greetArr = greeting => name =>
//   console.log(`greeting2 ${greeting} ${name}`);
// greetArr('Howdy')('Ralitsa');

// The .call() and .apply() Methods

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   // Enhanced Object Literal Syntax (ES6)
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Jonas Schmedtmann');
// lufthansa.book(635, 'John Smith');
// // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(2), book: ƒ}
// // airline: "Lufthansa"
// // book: ƒ book(flightNum, name)
// // bookings: Array(3)
// // 0: {flight: 'LH239', name: 'Jonas Schmedtmann'}
// // 1: {flight: 'LH635', name: 'John Smith'}
// // 2: {flight: 'LH239', name: 'Mary Cooper'}
// // length: 3
// // [[Prototype]]: Array(0)
// // iataCode: "LH"
// // [[Prototype]]: Object
// console.log(lufthansa);

// const euroWings = {
//   airline: 'EuroWings',
//   iataCode: 'EW',
//   bookings: [],
// };

// // Uncaught TypeError: Cannot read properties of undefined (reading 'airline')
// // It's because this function here, the book() Function
// // is now a Regular Function Call. As we learned in one
// // of the previous sections, in a Regular Function Call
// // the this keyword points to undefined, at least in
// // 'use strict'; mode.

// // Once more, this book() Function is NOT this book() method.
// // It is now this separated Function here.
// // It's a copy of the above one, but it's NOT a method any more.
// // It's now a Function. And so here, it's a Regular function Call.
// // Therefore, the this keyword inside of it now points to undefined.
// // The this keyword depends on how the function is actually called.
// const book = lufthansa.book;

// // If we want to book an euroWings flight, then the this keyword
// // should point to euroWings. So, how do we do that?

// // There are 3 Function Methods to do that.
// // They are: .call(), .apply() and .bind()

// // Does NOT work
// // book(23, 'Sarah Williams');

// // .call() Method

// // A Function is really just an Object and Objects have methods
// // and, therefore, Functions can have methods too.
// // And the .call() method is one of them.
// // And in the .call() method the first argument is exactly what we
// // want the this keyword to point to.

// // This allows us  manually and explicitly to set the this keyword
// // of any Function that we want to call. And all the arguments after
// // the first one are simply the arguments of the original Function.

// // Sarah Williams booked a seat on undefined flight EW23
// book.call(euroWings, 23, 'Sarah Williams');
// // {airline: 'EuroWings', iataCode: 'EW', bookings: Array(1)}
// // airline: "EuroWings"
// // bookings: Array(1)
// // 0: {flight: 'EW23', name: 'Sarah Williams'}
// // length: 1
// // [[Prototype]]: Array(0)
// // iataCode: "EW"
// // [[Prototype]]: Object
// console.log(euroWings);

// // Mary Cooper booked a seat on Lufthansa flight LH239
// book.call(lufthansa, 239, 'Mary Cooper');
// // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(3), book: ƒ}
// // airline: "Lufthansa"
// // book: ƒ book(flightNum, name)
// // bookings: Array(3)
// // 0: {flight: 'LH239', name: 'Jonas Schmedtmann'}
// // 1: {flight: 'LH635', name: 'John Smith'}
// // 2: {flight: 'LH239', name: 'Mary Cooper'}
// // length: 3
// // [[Prototype]]: Array(0)
// // iataCode: "LH"
// // [[Prototype]]: Object
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// // Mary Cooper booked a seat on undefined flight LX583
// book.call(swiss, 583, 'Mary Cooper');
// // {airline: 'Swiss air Lines', iataCode: 'LX', bookings: Array(1)}
// // airline: "Swiss air Lines"
// // bookings: Array(1)
// // 0: {flight: 'LX583', name: 'Mary Cooper'}
// // length: 1
// // [[Prototype]]: Array(0)
// // iataCode: "LX"
// // [[Prototype]]: Object
// console.log(swiss);

// // .apply() Method
// // And the .apply() method does, basically, exactly the same thing.
// // The only difference is that the .apply() method does not receive
// // a list of arguments after the this keyword, but instead it's going to
// // take an Array of the arguments. And so, it will then take the elements
// // from that Array and pass it into the Function.

// const flighhtData = [583, 'George Cooper'];
// // George Cooper booked a seat on Swiss air Lines flight LX583
// book.apply(swiss, flighhtData);
// // {airline: 'Swiss air Lines', iataCode: 'LX', bookings: Array(2)}
// // airline: "Swiss air Lines"
// // bookings: Array(2)
// // 0: {flight: 'LX583', name: 'Mary Cooper'}
// // 1: {flight: 'LX583', name: 'George Cooper'}
// // length: 2
// // [[Prototype]]: Array(0)
// // iataCode: "LX"
// // [[Prototype]]: Object
// console.log(swiss);

// // This .apply() method is NOT used any more in modern JavaScript.
// // Because now we actually have a better way of doing the exact same thing.
// // This here:
// book.call(swiss, ...flighhtData);
// // is the same as this:
// // book.apply(swiss, flighhtData);

// // The .call() method allows us to explicitly define the this keyword
// // in any Function that we want. But there is, actually, yet another method,
// // which allows us to do the same thing. And that's the .bind() method.
// // It's more important, actually, than the .call() and .apply() methods.

// // The .bind() Method

// // And just like the .call() method, .bind() also allows us to manually
// // set the this keyword for any Function Call. Now, the diffenece is that
// // .bind() does NOT immediately call the Function. Instead, it returns a
// // new Function where the this keyword is bound. So, it's set to whatever value
// // we pass into .bind();

// // In the .call() method we can pass multiple arguments here,
// // besides the this keyword, right? And so, in the .bind() method
// // we can do the same. And then all of those arguments, basically,
// // will be set in stone. So, they will be defined and then, the Function
// // will always be called with these same arguments.
// // book.call(euroWings, 23, 'Sarah Williams')

// const bookEW = book.bind(euroWings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);
// // Steven Williams booked a seat on EuroWings flight EW23
// bookEW(23, 'Steven Williams');
// // {airline: 'EuroWings', iataCode: 'EW', bookings: Array(2)}
// // airline: "EuroWings"
// // bookings: Array(2)
// // 0: {flight: 'EW23', name: 'Sarah Williams'}
// // 1: {flight: 'EW23', name: 'Steven Williams'}
// // length: 2
// // [[Prototype]]: Array(0)
// // iataCode: "EW"
// // [[Prototype]]: Object
// console.log(euroWings);

// // The flightNum is alreay preset here, in the .bind() method.
// // So, this allows us to set in stone certain arguments and so,
// // the resulting Function, then becomes even simpler.
// // So, all we need to do now, is to pass the passenger name.
// const bookEW23 = book.bind(euroWings, 23);
// // Jonas Schmedtmann booked a seat on EuroWings flight EW23
// // Martha Cooper booked a seat on EuroWings flight EW23
// bookEW23('Jonas Schmedtmann');
// bookEW23('Martha Cooper');

// // Specifying parts of the arguments beforehand is, actually,
// // a common patern called Partial Application.
// // So, essentially, Partial Application means that a part
// // of the arguments of the original Function are already applied.

// // With Event Listeners
// // There are also other situations, in which we can use the .bind()
// // method and where it is very usefull. And one example for that is when
// // we use Objects together with Event Listeners.
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };
// // 301
// // lufthansa.buyPlane();

// // In an Event Handler Function the this keyword always points to the
// // element, on which that Handler is attached to.

// // <button class=​"buy">​Buy new plane 🛩​</button>​
// // undefined
// // document
// //   .querySelector('.buy')
// //   .addEventListener('click', lufthansa.buyPlane);

// // We need to pass in Function here, and NOT to call it.
// // And we already know that the .call() method calles a Function.
// // And so, that's not what we need, so therefore, we use the .bind()
// // method, because we alredy know that the .bind() method will return
// // a new Function. And so, the this keyword should be lufthansa and so,
// // that's exactly what we define.

// // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(3), planes: 300, book: ƒ, …}
// // airline: "Lufthansa"
// // book: ƒ book(flightNum, name)
// // bookings: Array(3)
// // 0: {flight: 'LH239', name: 'Jonas Schmedtmann'}
// // 1: {flight: 'LH635', name: 'John Smith'}
// // 2: {flight: 'LH239', name: 'Mary Cooper'}
// // length: 3[[Prototype]]: Array(0)
// // buyPlane: ƒ ()
// // iataCode: "LH"
// // planes: 301
// //[[Prototype]]: Object

// // 301
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// // Partial Application
// // And in this case of Partial Application many times we are not even
// // interested in the this keyword, but we still use the .bind() method
// // for this.

// const addTax = (rate, value) => value + value * rate;
// // 220
// console.log(addTax(0.1, 200));

// // But now, let's  say, we are using one tax all the time,
// // and so, let's create a Function for that.
// // And the first argument of the method .bind() is the this keyword.
// // But, in this case, we don't care about the this keyword at all.
// // It's not even here in the Function. So, we just say null.
// // It could be any other value, because nothing will happen with it,
// // but it's kind of a standard to just use null.
// // And so, this sets the rate value here in stone.
// // So, essentially, this would be the same as writing
// // addVAT = value => value + value * 0.23;
// const addVAT = addTax.bind(null, 0.23);

// // 123
// console.log(addVAT(100));
// // 28.29
// console.log(addVAT(23));

// // The order of the arguments is important.
// // If you wanted to preset the rate, then it has to be the first argument
// // in this Function, otherwise this will NOT work here.

// // Challenge:
// // Rewrite this example here, but using the technique of
// // one Function returning another Function.

// // const greet = function (greeting) {
// //   return function (name) {
// //     console.log(`${greeting} ${name}`);
// //   };
// // };

// const addTaxNew = rate => value => value + value * rate;
// const addVATNew = addTaxNew(0.23);
// // 123
// console.log(addVATNew(100));
// // 28.29
// console.log(addVATNew(23));

// Coding Challenge #1

// Let's build a simple poll app!
// A poll has a question, an array of options from which people can choose, and an
// array with the number of replies for each option. This data is stored in the starter
// 'poll' object below.
// Your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The
// method does 2 things:
// 1.1. Display a prompt window for the user to input the number of the
// selected option. The prompt should look like this:
// What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)
// 1.2. Based on the input number, update the 'answers' array property. For
// example, if the option is 3, increase the value at position 3 of the array by
// 1. Make sure to check if the input is a number and if the number makes
// sense (e.g. answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The
// method takes a string as an input (called 'type'), which can be either 'string'
// or 'array'. If type is 'array', simply display the results array as it is, using
// console.log(). This should be the default option. If type is 'string', display a
// string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each
// 'registerNewAnswer' method call.
// 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
// data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
// object! So what should the this keyword look like in this situation?
// The Complete JavaScript Course 21
// Test data for bonus:
// § Data 1: [5, 2, 3]
// § Data 2: [1, 5, 3, 9, 6, 1]
// Hints: Use many of the tools you learned about in this and the last section �
// GOOD LUCK �

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),
//   // 1.
//   registerNewAnswer() {
//     // 1.1
//     // Get answer
//     const answer = Number(
//       prompt(
//         `${this.answer}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );
//     console.log(answer);
//     // 1.2
//     // Register answer
//     typeof answer === 'number' &&
//       answer >= 0 &&
//       answer < this.answers.length &&
//       this.answers[answer]++;
//     console.log(this.answers);

//     // 4.
//     this.displayResults();
//     this.displayResults('string');
//   },
//   // 3.
//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       // Poll results are 13, 2, 4, 1
//       console.log(`Poll results are ${this.answers.join(', ')}.`);
//     }
//   },
// };
// // poll.registerNewAnswer();

// // 2.
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// // 5.
// // [5, 2, 3]
// // [1, 5, 3, 9, 6, 1]

// // Poll results are 5, 2, 3.
// // Poll results are 1, 5, 3, 9, 6, 1.
// // (6) [1, 5, 3, 9, 6, 1]
// // 0: 1
// // 1: 5
// // 2: 3
// // 3: 9
// // 4: 6
// // 5: 1
// // length: 6
// // [[Prototype]]: Array(0)
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// // To recap, this works, because the displayResults Function here is looking for
// // this.answers, but our Test Arrays are simply out here. so, we need to way to make this.answers
// // equal to this Array. And that's why used the .call() method here, so we could manually set the
// // this keyword to new Object, which as the answers property has this new Array.

// Immediately Invoked Function Expressions (IIFE)

// So, sometimes in JavaScript we need a Function that is only executed
// once and then, never again. So, basically, a Function that disappears
// right after it's called once.

// And might not apper to make much sense right now,
// but we'll actually need this technique later, for example,
// with something called async/await.

// const runOnce = function () {
//   console.log('This will never run again.');
// };
// runOnce();

// // IIFE
// (function () {
//   console.log('This will never run again.');
//   const isPrivate = 23;
// })();

// // Why was this pattern actually invented? Well, we already know that functions create scopes.
// // What is important here is that one scope does NOT have acces to variables from an inner scope.

// // Uncaught ReferenceError: isPrivate is not defined
// // And that's, because the Scope Chain only works the other way around.
// // So, the inner scope would have access to anything defined outside, here in the global scope,
// // but the other way around, the global scope, does NOt have access to anything that is inside
// // of a scope. So, in this case, the scope created by the IIFE Function above.
// // Therefore, we say that all data defined inside of a scope, is Private.
// // We also say that this data is Encapsulated. And Data Encapsulation and Data Privacy
// // are extremely important concepts in Programming. So, many times we need to protect
// // our variables from being accidentally overriten by some other parts of the program
// // or even with external scripts ot libraries. Keep in mind that it is important to hide
// // variables and it's scopes are a good tool for doing this. And this is also the reason why
// // the IIFE were invented. It's not a feature, it's more of a pattern taht some developers
// // came up with and that then started to be used by many other developers.
// // console.log(isPrivate);

// // IIFE with Arrow Function
// (() => console.log('This will ALSO never run again.'))();

// // Do you remeber what also creates a scope in ES6?
// // That's right - variables declared with let or const create their own scope
// // inside a block. And we learned that in Section 8: How JavaScropt Works Behind the Scenes.

// {
//   const isPrivate = 23;
//   var notPrivate = 46;
// }
// // And once again, we cannot access this variable.
// // Uncaught ReferenceError: isPrivate is not defined
// // console.log(isPrivate);
// // On the other hand, this notPrivate variable would, of course, be accessable.
// // 46
// console.log(notPrivate);

// // This is the reason why now inn Modern JavaScript,
// // IIFE are not that used any more. Because if all we want is to create a new scope
// // for Data Privacy all we need to do is to just create a block like this:
// // {
// //   const isPrivate = 23;
// //   var notPrivate = 46;
// // }
// // There is no need to create a Function to create a new scope.
// // Unless, of course, we need to use var for our variables, but
// // we already know, we probably shouldn't do that.

// // Now, on the other hand, if what you really need is to
// // execute a Function just once, then the IIFE patterns is till the way to go.
// // Even now, with Modern JavaScript.

// Closures

// Remember what we learned before in this course about:

//- Execution contexts
// Each Execution Context has a Variable Environment,
// which contains all it's local variables.
// This Variable Environment is also the Scope of the Function.

//- the Call Stack (order in which Functions are Called)

//- the Scope Chain (order, which Functions are Written in the Code)
//?

// Closures kind of bring all of those concepts together
// in a beautifull, almost magical way.

// A Closure is NOT a feature that we explicitly use.
// So, we don't create Closures manually, like we create a new Array,
// or a new Function. So, a Closure simply happens automatically,
// in certain situations. We just need to recognize those situations.

// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();

// booker();
// booker();
// booker();

// // A Closure makes a Function remember all the variables that existed
// // at the Function's birthplace by the time it was created.
// // The Secret of the Closure: Any function always has access to the
// // Variable Environment (VE) of the Execution Context, in which the Function was created,
// // even after that Execution Context is gone. The Closure is then this VE attached to the
// // Function, exactly as it was at the time and place the Function was created.
// // The Scope Chain is actually preserved through the Closure. Even when the Scope is already
// // been destroyed, because it's Execution Context is gone. The VE somehow keeps living
// // somewhere in the Engine. Thanks to the Closure, a Function does NOT loose connection to
// // variables that existed at the Fucntion's birthplace.
// // The Closure has priority over the Scope Chain.

// // Closures Summary:

// //- A Closure is the closed-over VE of the Execution Context in which a Function was created,
// // even after that Execution Context is gone.

// //- A Closure gives a Function access to all the variables of it's parent Function,
// // the Function in which it was defined, even after that parent Function has returned.
// // The Function keeps a reference to it's scope, which preserves the Scope Chain throughout time.

// //- A Closure makes sure that a Function doesn't loose connection to variables
// // that existed at the Function's birthplace. It remembers the variables,
// // even after the birthplace is gone.

// //- A Closure is like a backpack that a Function carries around wherever it goes.
// // This backpack has all the variables that were present in the Evnironment
// // where the Function was created.

// //- We do NOT have to manually create Closures, this is a JavaScript feature
// // that happens automatically. We can't access alosed-over variables explicitly.
// // A Closure is NOT a tangible JavaScript Object.
// // A Closure is just an internal property of a Function.

// // However, what we can do is to, actually, take a look
// // at this internal property. In the console.

// // ƒ anonymous()
// // length: 0
// // name: ""
// // prototype: {constructor: ƒ}
// // arguments: (...)
// // caller: (...)
// // [[FunctionLocation]]: script.js:730
// // [[Prototype]]: ƒ ()
// // [[Scopes]]: Scopes[3] => VE of the booker() Function
// //  0: Closure (secureBooking)
// //     passengerCount: 3
// //  [[Prototype]]: Object
// //  1: Script {secureBooking: ƒ, booker: ƒ}
// //  2: Global {window: Window, self: Window, document: document, name: '', location: Location, …}

// // [[FunctionLocation]], [[Prototype]], [[Scopes]] => Everythi in [[ ]] is an internal property,
// // which we can NOT access from our code.
// console.dir(booker);

// // Closures are a feature that is used all the time in JavaScript
// // and many times even without us realizing that Closures are happening.

// More Closure Examples

// Let's now create 2 more situations, in which Closures
// are going to appear. Both the examples will demonstrate that we don't
// need to return a Function from another Function in order to create
// a Closure.

//  Example 1
// let f;

// const g = function () {
//   // closed-over VE
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   };
// };

// const h = function () {
//   // closed-over VE
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f();

// // f f()
// // length: 0
// // name: "f"
// // prototype: {constructor: ƒ}
// // arguments: (...)
// // caller: (...)
// // [[FunctionLocation]]:
// // [[Prototype]]: ƒ ()
// // [[Scopes]]: Scopes[3]
// //  0: Closure (g)
// //    a: 23
// // [[Prototype]]: Object
// //  1: Script {f: ƒ, g: ƒ, h: ƒ}
// //  2: Global {window: Window, self: Window, document: document, name: '', location: Location, …}
// console.dir(f);

// // Re-assigning f Function
// h();
// f();

// // f f()
// // length: 0
// // name: "f"
// // prototype: {constructor: ƒ}
// // arguments: (...)
// // caller: (...)
// // [[FunctionLocation]]:
// // [[Prototype]]: ƒ ()
// // [[Scopes]]: Scopes[3]
// //  0: Closure (h)
// //    b: 777
// // [[Prototype]]: Object
// //  1: Script {f: ƒ, g: ƒ, h: ƒ}
// //  2: Global {window: Window, self: Window, document: document, name: '', location: Location, …}
// console.dir(f);

// //  Example 2
// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3;
//   setTimeout(function () {
//     console.log(`We are now boarding ${n} passengers.`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers.`);
//   }, wait * 1000);
//   console.log(`Will start boarding in ${wait} seconds.`);
// };

// // Let's now also prove that the Closure does, in fact,
// // a priority over the Scope Chain.
// const perGroup = 1000;
// boardPassengers(180, 3);

// Coding Challenge #2
// This is more of a thinking challenge than a coding challenge �
// Your tasks:
// 1. Take the IIFE below and at the end of the function, attach an event listener that
// changes the color of the selected h1 element ('header') to blue, each time
// the body element is clicked. Do not select the h1 element again!
// 2. And now explain to yourself (or someone around you) why this worked! Take all
// the time you need. Think about when exactly the callback function is executed,
// and what that means for the variables involved in this example.
//  (function () {
//  const header = document.querySelector('h1');
//  header.style.color = 'red';
//  })();
// GOOD LUCK �

// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   document.querySelector('body').addEventListener('click', function () {
//     header.style.color = 'blue';
//   });
// })();
