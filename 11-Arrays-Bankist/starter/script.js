'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = 0;

  // But now we can NOT do this => movements.sort(), because .sort() will
  // the order the actual underlying Array, so, the actual movements Array as it is
  // in the accounts Object. But this is NOT what we want. All we want is to display
  // a sorted movements Array, but we do NOT want to sort the original underlying data.
  // So, we simply take a copy of the movements Array and sort that. And so that's what
  // we now use .slice() for. And this is one of the situations where ne weed to create
  // a copy using the .slice() method and NOT the Spread Operator, because here we are
  // in the middle of a Chain. And so, we want to keep going afterwords. And so, it's
  // a lot better to simply use the .slice() method here, so we can then simply chain
  // the .sort() method onto that. And now, all we need is our compare function.

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    // Syntax: insertAdjacentHTML(position, text)
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // Let's say that this bank pays out interest each time there is a deposit
  // to the bank account. And that interest is 1.2% of the deposited amount.
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;

  // Now, let's say, that the bank introduces a new rule.
  // So, now, the bank only pays interest if that interest is at least 1€ or whatever other
  // currency. So, where do we put that in our calculation?
};

// Each Function should actually receive the data that is should work with
// instead of using a global variable

// Example: 'Steven Thomas Williams' will become 'stw'
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = acc => {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  }
  // Update UI
  updateUI(currentAccount);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    receiverAcc.username &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Delete');

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Simple Array Methods

// Why Arrays do actually have methods?
// Methods are simply Functions that we can call on Objects.
// So, basically, they are Functions attached to Objects.
// So, if we have Array methods, that means that Arrays themselves are
// also Objects. And so, these Array methods are simply Functions that are
// attached to all Arrays that we create in JavaScript.

// Arrays are Objects and they get access to special built-in methods
// that we can, essentially, see as tools for Arrays.

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // .slice() method
// // This one is very similar to the one available on Strings.
// // With the .slice() method we can extract part of any Array, but
// // without changing the original Array. So, essentially, we can
// // take a slice of an Array, so that's why it's called .slice().
// // The .slice() method returns a new Array, a copy af the Array,
// // but only with the extracted parts.

// // (3) ['c', 'd', 'e']
// console.log(arr.slice(2));

// // (2) ['c', 'd']
// // What this means is that, just like in Strings
// // the end parameter here is not included in the output.
// console.log(arr.slice(2, 4));

// // Then, again, just like in Strings, we can define a negative begin parameter
// // and then it will start to copy from the end of the Array.
// // (2) ['d', 'e']
// console.log(arr.slice(-2));

// // ['e']
// // So -1 is always just the last element of any Array.
// console.log(arr.slice(-1));

// // And now, to make this complete, we can also use a negative index as the end parameter.
// // (2) ['b', 'c']
// console.log(arr.slice(1, -2));

// // Finally, we can use the .slice() method to simply create a shallow copy
// // of any Array. So, to do that we simply call the .slice() method without any
// // arguments at all.
// // (5) ['a', 'b', 'c', 'd', 'e']
// console.log(arr.slice());
// // And so, that give us the exact same result.
// // (5) ['a', 'b', 'c', 'd', 'e']
// console.log([...arr]);

// // So, the question is - should we use the Spread Operator or
// // the .slice() method in order to create a shallow copy?
// // Well, that's entirely up to you! :) It's just a matter of personal preference.
// // The only time you need to use the .slice() method here is when you want to chain multiple
// // methods together, so, calling one after the other.

// // .splice() method
// // And the .splice() method works in almost the same as .slice(),
// // but the fundamental difference is that it does, actually,
// // change the original Array. So, it mutates that Array.
// // (3) ['c', 'd', 'e']
// // console.log(arr.splice(2));

// // (2) ['a', 'b']
// // when commenting out the console.log() at 141 row => (5) ['a', 'b', 'c', 'd', 'e']

// // So, the extracted elements are actually gone from the original Array.
// // So, .splice() deleted them. The .splice() method takes a part of the Array
// // and returns it and then, the original Array itself looses this part that was extracted.
// // Now, in practice, most of the time, the value that the .splice() method returns
// // doesn't even interest us. All we are usually interested in is just to delete
// // one or more elements from the Array, using .splice().
// console.log(arr);

// // And one pretty common use case is to simply remove the last element of an Array.
// // So, the begin and end parameters work exactly the same as in the .slice() method.
// // ['b']
// // when commenting out the console.log() at 141 row => ['e']
// console.log(arr.splice(-1));
// // ['a']
// // when commenting out the console.log() at 141 row => (4) ['a', 'b', 'c', 'd']
// console.log(arr);

// // (2) ['b', 'c']
// // Actually, the second parameter of the .splice() method is called deleteCount.
// // In other words, the number of elements that we want to delete.
// console.log(arr.splice(1, 2));
// // (2) ['a', 'd']
// console.log(arr);

// // .reverse() method
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// // (5) ['f', 'g', 'h', 'i', 'j']
// console.log(arr2.reverse());
// // (5) ['f', 'g', 'h', 'i', 'j']
// // The .reverse() method, does, actually,mutate the original Array.
// // As we log the original Array, we see that it has been reversed too.
// console.log(arr2);

// // .concat() method
// // This one is use to concatenate two Arrays.
// // Here we have to specify the second Array.
// const letters = arr.concat(arr2);
// // (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// // And now we have the first 10 letters of the Alphabbet here.
// console.log(letters);
// // (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// // This gives us the exact same result and also does NOT mutate
// // any of the involved Arrays. Just like .concat(), which also
// // doesn't mutate the original Array here.
// console.log([...arr, ...arr2]);

// // Which one to use?
// // Well, that's entirely up to you! :) It's just a matter of personal preference
// // wheter you prefer to use the Spread Operator or the .concat() method.

// // .join() method
// // a - b - c - d - e - f - g - h - i - j
// console.log(letters.join(' - '));

// The new .at() Method

// // There is a new very simple Array method in ES2022, which is the .at() method.
// const arr = [23, 11, 64];
// // And then, if you wanted to take one of the values out of the Array,
// // let say, the first one, then we would traditionally do this:
// // 23
// console.log(arr[0]);
// // But now, with the new .at() method we can do the exact same thing
// // using a method.
// // 23
// console.log(arr.at(0));

// // Basically, we do what we say.
// // We want an element from that Array at position x.
// // So, basically, we can now replace the traditional Brakets Notation
// // with a more modern looking .at() method if we prefer to use Array methods like this.

// // Actually, ther is one particularity of the .at() method,
// // which makes it quite helpfull to use instead of the brackets notation.

// // So, these are the two more traditional ways of solving the problem of
// // Getting the last Array element

// // So, lets now say that we wanted to get the last element from the Array.
// // Now, supposing that we do not know the length of the Array
// // we would write something like this:
// // 64
// console.log(arr[arr.length - 1]);
// // Another way is to use the .slice() method that we just learned before.
// // So, here we get that copy of the Array only with the last element.
// // [64]
// console.log(arr.slice(-1));
// // Of course, we want the value and so then, we need to take out that first value
// // by doing:
// console.log(arr.slice(-1)[0]);

// // The new .at() method makes this process even easier.
// // And now, here we can write the exact same negative indexes
// // that we can write in the .slice() method.
// console.log(arr.at(-1));

// // The only question is - should you use this new .at() method
// // or should you keep using the Brakets Notation?
// // Well, as always, it depends. If you want to get the last element
// // of an Array or, basically, start counting from the end of an Array,
// // then you should probably start using the .at() method.
// // Also, if you want to do something called Method Chaining, which
// // we will talk about later in this section, then the .at() method
// // is also perfect for that. So, basically, combining multiple methods
// // all at the same time. Then it's quite helpfull to use the .at() method,
// // instead of the Brackets Notation.

// // Now, on the other hand, if you just want to quickly get a value from
// // an Array, so, just like the first element, then, of course,
// // you can keep using the brackets notation.

// // The .at() method also works on Strings
// // j
// console.log('jonas'.at(0));
// // s
// console.log('jonas'.at(-1));

// Looping Arrays: .forEach() method
// In this lecture we will loop over an Array, using the .forEach() method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // for (const movement of movements) {
// // And so, this is how we access the counter variable
// // in the for ... of ... loop.
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You depositetd ${movement}.`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}.`);
//   }
// }

// And then the .forEach() method actually requires a Callback Function here.
// So, .forEach() is technically a Higher-Order Function as we learned
// in the last section, which requires a Callback Function in order to tell it
// what to do. So, it's the .forEach() method here that will call this
// Callback Function, not us.

// But when exactly will .forEach() actually call this Callback Function?
// What the .forEach() method does is to loop over the Array and
// in each iteration it will execute this Callback Function.
// Also, as the .foreach() method calls this Callback Function
// in each iteration, it will pass in the current element
// of the Array as an argument.

// console.log('---- FOREACH ----');
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You depositetd ${mov}.`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}.`);
//   }
// });

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

// Which of the two versions you think is cleaner and easier to write
// and easier to read? Well, I think we can both agree that it is the
// .forEach() method.

// What if we actually needed access to a counter variable here?
// So, just like we can access the current index of the Array
// here in the for ... of ... loop.

// It is the .forEach() method who calls this Callback Function
// in each iteration and as it calls this Function it also passes in
// the current element of the Array.

// Actually, that's not all it passes in. In fact, .forEach() passes in
// the current element, the index and the entire Array that we are looping.
// And so, therefore, we can specify them here in our parameter list.
// Of course, we can just use 1 of them, like we have been doing, or we can
// just use 2, or we can use all 3 together. And, as alsway, the names here
// do not matter at all, but what does matter is the order.

// So, the first parameter always needs to be the current element,
// the second parameter - always the curretn index,
// and the third one - always the entire Array that we are looping over.
// Because that's the order in which the arguments, so, the actual values,
// are passed into our Callback Function.

// Now, when should we use .forEach() and when should we use the for ... of ... loop?
// Well, one fundamental difference between the two of them is that you can NOT break
// out of a .forEach() loop. So, the continue and break statements do NOT work
// in a .forEach() loop at all. Instead, .forEach() will loop over the entire Array.
// If you really need to break out of a loop, then you'll have to keep using
// the for ... of ... loop.

// But other than that, it really comes down to your personal preference,
// just like so many things in JavaScript.

// The .forEach() method with Maps and Sets
// So, we learned about the .forEach() method on Arrays.
// However, the .forEach() method is also available on Maps and Sets.

// Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// We can call .forEach() also on a Map.
// The Callbak Function here also has 3 parameters.
// When the .forEach() method calls it, it will call
// this Function with 3 arguments. The first one will be
// the current value in the current iteration, the second one
// is the key and the third one is the entire Map that has been
// looped over. And so, you see, this is similar to the Array. Where
// in the Array, the first parameter is the current element of the Array,
// the second one is the index and the third is the entire Array.

// USD: United States dollar
// EUR: Euro
// GBP: Pound sterling
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// What this means is the key is exactly the same as the value.
// So, why is that? Well, the Set doesn't have keys, right?
// And it doesn't have indexes eighter, and so there's no value
// that would make sense for the key. Essentially, this key here
// makes no sense at all, it wouldn't even have to be there.
// And so, the people who designed this .forEach() method,
// for Sets they simply could have omitted the second argument.
// Well, if they would have done that, then this .forEach() method
// would have been different from the others, right?
// That will then create confusion in the developers, and
// therefore it was decided to keep the same signature, so basically,
// to keep the same 3 parameters in this Callback Function and
// simply to set the second parameter to the first one.

// USD: USD
// GBP: GBP
// EUR: EUR
// Uncaught SyntaxError: Duplicate parameter name not allowed in this context (at script.js:384:43)
// currenciesUnique.forEach(function (value, value, map) {
// _ => in JavaScript means a "throw-away" variable,
// So that means, a variable that is completely unnecessary.
// So, it's just a convention, which we will see again a little bit later.
// currenciesUnique.forEach(function (value, _, map) {
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${value}: ${value}`);
// });

// Creating DOM Elements
// In this video we'll finally gonna be back to DOM manipulatio.
// And we'll gonna learn a couple of DOM manipulation techniques
// and we'll gonna use them together with the .forEach() method
// that we just learned about.

// Coding Challenge #1
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// about their dog's age, and stored the data into an array (one array for each). For
// now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function
// parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
// �
// ")
// 4. Run the function for both test datasets
// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far �
// GOOD LUCK �

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   // dogsJulia.slice(1, 3);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);

//   // "Dog number 1 is an adult, and is 5 years old" or a puppy "Dog number 2 is still a puppy"
//   dogs.forEach(function (dog, i) {
//     console.log(
//       `Dog number ${i + 1} is ${
//         dog >= 3 ? `an adult, and is ${dog} years old` : `is still a puppy`
//       }.`
//     );
//   });
//   // for (const [i, dog] of dogs.entries()) {
//   //   console.log(
//   //     `Dog number ${i + 1} is ${
//   //       dog >= 3
//   //         ? `an adult, and is ${dog} years old`
//   //         : `is still a puppy`
//   //     }.`
//   //   );
//   // }
// };
// console.log('--------------- Test Data 1 ---------------');
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log('--------------- Test Data 2 ---------------');
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Data Transformations: .map(), .filter(), .reduce()

// In JavaScript there 3 big and important Array methods that we use
// all the time to perform Data Transformations. So, basically, these
// are methods that we use to create new Arrays, based on Transforming Data
// from other Arrays. And in recent years these tools have become really
// popular and for good reasons. And therefore, you'll see them everywhere you
// look in Modern JavaScript.

// .map()

// Example Callback Function: current * 2

// The .map() method is yet another method that we can use to loop over Arrays.
// So, .map() is actually similar to the .forEach() method that we studied before,
// but the difference is that .map() creates new Array, based on the original Array.
// So, essesntially, the .map() method loops over an Array and in each iteration
// it applies a Callback Function, that we specify in our code, to the current Array element.
// We say that it maps the values of the original Array to a new Array. And that's why this
// method is called .map(). And it is extremely usefull. Usually, way more useful that
// the .forEach() method. Because, .forEach() simply allow us to work with each Array element,
// but .map() on the other hand, returns a new Array containing the results of applying
// an operation on all original Array elements.

// .filter()

// Example Condition: current > 2

// The .filter() method is used to filter for elements in the original Array, which satisfy
// a certain condition. So, only elements that pass the test that we specified will make it
// to a new filtered Array. Or in other words, elements for which the condition is true,
// will be included in a new Array that the .filter() method returns. All other elements
// will get filtered out, so, they will not be included in the new Array.

// .reduce()

// The .reduce() method is used to boil ("reduce") down all Array elements down to
// one single value (e.g. adding all elements together).

// So, for example, for adding up all numbers in the Array, we need to specify
// an operation like this: acc + current. This is know as the "snow ball effect" and
// .reduce() is pretty similar to that. There is NO new Array in this case, but only
// the reduced value.

// The .map() method

// Let's now start seeing the 3 Data Transformation methods
// in practice. Starting with the .map() method.

// And as we just learned, the .map() method is yet another way
// that we can use to loop over Arrays. But unlike .forEach(), the .map() method
// will give us a brand new Array. And this new Array will contain in each position
// the resulys of appying a Callback Function to the original Array elements.

// const euroToUsd = 1.1;

// And then, just like in the .forEach() method, we need a Callback Function.
// And this Callback Function also gets as an argument the current Array element.
// So, again, just like in the .forEach() method that we studied before.
// This is more in line with Functional Programming. In Modern JavaScript
// there is definately a push going on in the direction of Functional Programming.
// So, of a more Functional Language, and therefore, in Modern JavaScript
// this here is the way to go. So, using methods together with CallBack Functions
// like this is the new and moredn way of doing stuff.

// Using Regular Function declaration
// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUsd;
// });

// Challenge:
// Using Arrow Function
// const movementsUSD = movements.map(mov => mov * euroToUsd);
// // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements);
// // (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]
// console.log(movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
// // (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]
// console.log(movementsUSDfor);

// // So, just like the .forEach() method, the .map() method also has access
// // to the exact same 3 parameters. So, besides the current Array element,
// // we also get access to the current index, as well as the whole Array.

// const movementDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}.`
// );
// console.log(movementDescriptions);

// Computing Usernames
// Let'now use the .map() and the .forEach() methods to compute usernames
// for each account owner in our application.

// The .filter() method
// The .filter() method is used to filter for elements that satisfy a certain condition.
// And how do we specify such a condition? Well, you guessed it! We use a CallBack Function.

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function (mov, i, arr) {
//   return mov > 0;
// });
// // (5) [200, 450, 3000, 70, 1300]
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// // (5) [200, 450, 3000, 70, 1300]
// console.log(depositsFor);

// const withdrawals = movements.filter(mov => mov < 0);
// // (3) [-400, -650, -130]
// console.log(withdrawals);

// The .reduce() method
// We're going to talk about the third Data Transformations Method,
// which is the .reduce() method. We use the .reduce() method to,
// essentially, boil ("reduce") down all the elements in an Array to
// one single value. And we've talked about the example of adding up all
// numbers in one Array.

// (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements);

// And then, by adding up all those numbers, so, both the deposits and the widthdrawals,
// we end up with the global balance of the account, basically.

// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   // Iteration 0: 0
//   // Iteration 1: 200
//   // Iteration 2: 650
//   // Iteration 3: 250
//   // Iteration 4: 3250
//   // Iteration 5: 2600
//   // Iteration 6: 2470
//   // Iteration 7: 2540
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// // 3840
// console.log(balance);

// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// // 3840
// console.log(balance);

// So, the .reduce() method also gets a Callback Function, but this one is a little
// bit different from the other ones, like the one in .map() and .forEach().
// So, in these other Callbacks the first parameter is always the current element,
// the second one is the current index, the third one is the entire Array.
// But here, in the Callback Function of the .reduce() method the first parameter
// is, actually, something called the "Accumulator". This Accumulator is, essentially,
// like a snowball, that keeps accumulating the value that we ultimately want to return.
// In the case of adding all the elements or the numbers of an Array together,
// that will be the sum. As always, this Callback Functione here, will be called
// in each iteration of looping over the Array. So, .reduce() also loops over the Array
// and calls this Callback Function in each iteration.

// What we're ganna do here is to add the current value to the Accumulator. And this works,
// because in each call of the Callback Function the Accumulator will be the current sum
// of all the previous values. We will really keep adding to this Accumulator in each itaration
// of the loop. Finally, we aslo need to return this value here from the Callbak. So, this
// is how the new Accumulator can then be used in the next iteration of the loop.
// So, basically, in each loop itaration, we return the updated Accumulator, so the curent one
// plus the new value. So, like this, we can then keep adding to it in the next iteration.

// So, this Callback Function is the first argument of the .reduce() method, but the .reduce()
// method actually has another, so, a second parameter. And that is the initial value of the
// Accumulator. So, the value that we speciafy here, which in this case will be 0, is the
// initial value of the Accumulator in the first loop iteration. So, in this example we
// want to start counting or we want to start adding at 0. And so, therefore, we specify
// 0 here.

// Let's one more time do the same thing manually, basically with a for ... of ... loop.
// And so, here, you can see this common pattern that we always need an external variable
// whenever we want to use a for ... of ... loop.
// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// // 3840
// console.log(balance2);

// // Maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// // 3000
// console.log(max);

// Remember, .reduce() is for boiling ("reducing") down the Array into just one single value.
// But that value can be whatever we want. So, it doesn't have to be a sum. It could be a
// multiplication or even something completely different - like a String or an Object.
// Here, we will keep working with numbers, but this time we want the maximum value.

// Coding Challenge #2
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old).
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages �).
// 4. Run the function for both test datasets.
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK �

// *The goal of this callenge is to use the .map(), .filter() and .reduce() methods

// const calcAverageHumanAge = function (ages) {
//   // 1.
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   // (7) [36, 4, 32, 2, 76, 48, 28]
//   // (7) [80, 40, 56, 36, 40, 2, 32]
//   console.log(humanAges);
//   // 2.
//   const adults = humanAges.filter(age => age >= 18);
//   // (5) [36, 32, 76, 48, 28]
//   // (6) [80, 40, 56, 36, 40, 32]
//   console.log(adults);
//   // 3.
//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );
//   // 2 & 3
//   // (2+3)/2 = 2.5 === 2/2 + 3/2 = 2.5
//   return average;
// };

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// // 44 47.333333333333336
// console.log(avg1, avg2);

// The Magic of Chaining Methods

// So, up intill now, we have been using the .map(), .filter() and .reduce() methods
// kind of in isolation. However, we can take this one step further by chainign all of these
// methods one after another.

// For example, let's say that we wanted to take all the movement deposits,
// then convert them from EUR to USD and finally, add them all up. So, that we know
// exactly how much was deposited into the account in USD.

// const euroToUsd = 1.1;
// console.log(movements);

// // PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUsd)
//   // .map((mov, i, arr) => {
//   //   console.log(arr);
//   //   return mov * euroToUsd;
//   // })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// We could, of course, chain many other methods as well, as long as they return a new Array.
// The .reduce method, for example, will return a value, unike the .filter() and .map()
// methods, which will return a new Array. Here, after the .reduce() method we can NOT
// chain a .map() or a .filter(). We can only chain a method after another one,
// if the first one returns an Array.

// We should not overuse Chaining. We should try to optimize it, because chaining tons of
// methods, one after the other, can cause real performance issues if we have really huge
// Arrays. We should try to compress all the functionality that the chain methods do,
// into as little methods as possible.

// For example, sometimes we create way more .map() methods than we actually need
// where we can just do it all into one .map() call. So, when you chain methods like this,
// keep looking for opportunities of keeping up your code's performance.

// It is a bad practice in JavaScript to chain methods that mutate the underling original
// Array. An example of that is the .splice() method. So, again, you should not chain a
// method, like the .splice() or the .reverse() method. You CAN do that and for small
// applications, like this one, it's not a big deal and it's not going to cause problems,
// but in a large scale application it's usually always a good practice to avoid
// mutating Arrays.

// Coding Challenge #3
// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
// as an arrow function, and using chaining!
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK �

// const calcAverageHumanAge2 = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );
//   return average;
// };

// const average1 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
// const average2 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
// // 44 47.333333333333336
// console.log(average1, average2);

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// // 44 47.333333333333336
// console.log(avg1, avg2);

// The .find() method

// After the very important .map(), .filter() and .reduce() methods, we still have
// some more methods to learn, which are also super important and used all the time.

// So, as the name says, we can use the .find() method to retrieve one element of an Array,
// based on a condition. And just like the other Array methods that we've been talking
// about, the .find() method also accepts a Callback Function, which will then be called
// as the method loops over the Array. So, .find() is just another method that loops
// over the Array, but then it does something different - to retrieve an element of
// the Array.

// So, you see, just like the .filter() method, the .find() method also needs a
// Callback Function that returns a Boolean. So, the result of this is eighter true or false.
// Unlike the .filter() method, the .find() method will actually not return a new Array,
// but it will only return the first element in the Array that satisfies this condition.
// So, basically, in other words, the first element in the Array for which this operation
// here becomes true. So, basically, this here will return the first withdrawal.

// const firstWithdrawal = movements.find(mov => mov < 0);
// // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements);
// // -400
// console.log(firstWithdrawal);

// So, as you see, the .find() method is a bit similar to the .filter() method, but
// there are 2 fundamental differences. First, .filter() returns all the elements that
// match the condition, while the .find() method only returns the first one.
// And second, and even more important, the .filter() method returns a new Array,
// while .find() method only returns the element itself and NOT an Array.

// Array(4)
// 0: {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}
// 1: {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}
// 2: {owner: 'Steven Thomas Williams', movements: Array(8), interestRate: 0.7, pin: 3333, username: 'stw'}
// 3: {owner: 'Sarah Smith', movements: Array(5), interestRate: 1, pin: 4444, username: 'ss'}
// length: 4
// [[Prototype]]: Array(0)
// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}
// // interestRate: 1.5
// // movements: (8) [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
// // owner: "Jessica Davis"
// // pin: 2222
// // username: "jd"
// // [[Prototype]]: Object
// console.log(account);

// // Usually, the goal of the .find() method is just to find one element
// // and, therefore, we usually set up a condition where only one element
// // can satisfy that condition. And so, that's why we used the '==='.
// // If the owner names are unique, then '===' will ever match one account
// // with this name here, given in between the '', that we are comparing against.

// // Challenge:
// // Implement this functionality using the for ... of ... loop
// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') {
//     // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}
//     // interestRate: 1.5
//     // movements: (8) [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
//     // owner: "Jessica Davis"
//     // pin: 2222
//     // username: "jd"
//     // [[Prototype]]: Object
//     console.log(acc);
//   }
// }

// The .findIndex() Method
// And now, that we have a good grip on the .find() method,
// let me introduce you to a close cousin of the .find() method,
// which is the .findIndex() method. And the .findIndex() method
// works almost the same way as .find(). But, as the name says,
// .findIndex() returns the index of the found element and NOT
// the element itself.

// This is actually similar to the indexOf() method that we studied before.
// Now, the big difference here is that with indexOf() we can only search for
// a value that is in the Array. But on the other hand, with .findIndex(),
// we can create a complex condition like:
// accounts.findIndex(acc => acc.username === currentAccount.username);
// it can be anything that returns true or false.

// .indexOf(23) => And here we can simply check if the Array contains this value
// or not and if so, return the index of it.

// So, both return an index number, but the .indexOf() method is a lot simpler.

// Both the .find() and .findIndex() methods get access to also the current index
// and the current entire Array. So, as always, besides the current element,
// these other 2 values are also available, but in practice I nede found this useful.

// Both the .find() and .findIndex() methods were added in JavaScript in ES6.
// So they will NOT work in super old browsers.

// .some() and .every() methods

// There are still couple of Array methods left to learn. And so, in this lecture,
// we are going to look at the .some() and .every() methods.

// To start learning about the .some() method, let's look back at the .includes() method
// that we've studied earlier.
// // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// // 0: 200
// // 1: 450
// // 2: -400
// // 3: 3000
// // 4: -650
// // 5: -130
// // 6: 70
// // 7: 1300
// // length: 8
// // [[Prototype]]: Array(0)
// console.log(movements);

// EQUALITY
// // true
// console.log(movements.includes(-130));

// We can use the .includes() method to test if an Array includes a certain value.
// Now, however, we can only really test for equality, right? So, basically, .includes()
// here returns true if any value in the Array is exactly equal to -130.

// But what if we wanted to test a condition instead?
// And that's when the .some() method comes into play.

// SOME: CONDITION
// // true
// console.log(movements.some(mov => mov === -130));

// const anyDespoits = movements.some(mov => mov > 0);
// // true
// console.log(anyDespoits);

// EVERY
// So, again, the .every() method is pretty similar to the .some() method,
// but the difference between them is that .every() only returns true if all of the
// elements in the Array satisfy the condition that we pass in. So, in other words,
// if every element passes the test in our Callback Function, only then the .every()
// method returns true.
// // false
// console.log(movements.every(mov => mov > 0));
// // true
// console.log(account4.movements.every(mov => mov > 0));

// Up untill this point, we have always written the Callback function directly,
// as an argument into our Array methods. However, we could also write this function
// separately and then pass the Function as a Callback.

// Separate Callback Function
// const deposit = mov => mov > 0;
// // true
// console.log(movements.some(deposit));
// // false
// console.log(movements.every(deposit));
// // (5) [200, 450, 3000, 70, 1300]
// // 0: 200
// // 1: 450
// // 2: 3000
// // 3: 70
// // 4: 1300
// // length: 5
// // [[Prototype]]: Array(0)
// console.log(movements.filter(deposit));

// .flat() and .flatMap() methods

// The next 2 methods that we're gonna learn are the .flat() and .flatMap() methods.

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// What if you wanted to take all of these elements in the subArray and put
// all of these together in just one big Array, which contains all the nummbers
// here from 1 to 8? Well, that's pretty easy, using the new .flat() method.
// The .flat() and .flatMap() methods were introduced in ES2019, so, they are
// pretty recent and one more time, they will, therefore, NOT work in super old browsers.

// So, it removed the nested Arrays and flattened the Array, which is why the method
// is called .flat(). So, very nice, very simple, and NO Callback Function this time.
// // (8) [1, 2, 3, 4, 5, 6, 7, 8]
// // 0: 1
// // 1: 2
// // 2: 3
// // 3: 4
// // 4: 5
// // 5: 6
// // 6: 7
// // 7: 8
// // length: 8
// // [[Prototype]]: Array(0)
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

// So, this means that the .flat() method only goes one level deep when flattening the Array.s

// // (6) [Array(2), 3, 4, Array(2), 7, 8]
// // 0: (2) [1, 2]
// // 1: 3
// // 2: 4
// // 3: (2) [5, 6]
// // 4: 7
// // 5: 8
// // length: 6
// // [[Prototype]]: Array(0)
// // console.log(arrDeep.flat(1));
// console.log(arrDeep.flat());

// Now it goes even into the second level of nesting ans also takes the element out of
// that Array.

// // (8) [1, 2, 3, 4, 5, 6, 7, 8]
// // 0: 1
// // 1: 2
// // 2: 3
// // 3: 4
// // 4: 5
// // 5: 6
// // 6: 7
// // 7: 8
// // length: 8
// // [[Prototype]]: Array(0)
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// // (4) [Array(8), Array(8), Array(8), Array(5)]
// // 0: (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// // 1: (8) [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
// // 2: (8) [200, -200, 340, -300, -20, 50, 400, -460]
// // 3: (5) [430, 1000, 700, 50, 90]
// // length: 4
// // [[Prototype]]: Array(0)
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// // (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// // 17840
// console.log(overallBalance);

// // .flat()
// const overallBalance2 = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// // 17840
// console.log(overallBalance2);

// Turns out that using a .map() first and then flattening the result is a pretty common
// operation. So, that's exactly what we have here. So, to solve this there is another method
// that was also introduced at the same time, which is .flatMap().

// And so, .flatMap() essentially combines the .map() and the .flat() method into just
// one method, which is better for performance.

// // .flatMap()
// const overallBalance3 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// // 17840
// console.log(overallBalance3);

// And since .flatMap() also does mapping, it needs to receive exactly the same Callback
// as a .map() method. This is essentually a .map() method that all it does is in the end
// it then flattenes the result. The .flatMap() method only goes one level deep and
// we can NOT change it. So, if you do need to go deeper than just one level,
// you still need to use the .flat() method.

// Keep these 2 methods in mind (.flat() and .flatMap()), whenever you find yourself
// in the situation where you have nested Arrays and need to work with them.

// Sorting Arrays

// Now, sorting is a much discussed topic in computer science and there are countless
// algorithms and methods of sorting values and we might actually talk about this
// a little bit later in the course. For now, thopugh, we are simply going to use
// JavaScript's built-in method - .sort().

// // Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

// We now get our Array here, nicely sorted, alphabetically from a to z.
// This actually mutates the original Array. And so, we have to be very
// careful with that method.

// // Array(4)
// // 0: "Adam"
// // 1: "Jonas"
// // 2: "Martha"
// // 3: "Zach"
// // length: 4
// // [[Prototype]]: Array(0)
// console.log(owners.sort());

// // Array(4)
// // 0: "Adam"
// // 1: "Jonas"
// // 2: "Martha"
// // 3: "Zach"
// // length: 4
// // [[Prototype]]: Array(0)
// console.log(owners);

// Numbers
// // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// console.log(movements);

// These numbers are not at all ordered, are they? And the reason for this is that
// the .sort() method does th sorting, based on Strings. This is just how it works
// by default. So, basically, what it does is to convert everything to Strings
// and then it does the sorting itself. And if we look at the results as if they were
// Strings, then the result actually makes sense. The '-' always comes first.
// But this actually doesn't work for us.

// // (8) [-130, -400, -650, 1300, 200, 3000, 450, 70]
// console.log(movements.sort());

// And we need to give it a Callback Function. And this Callback Function is called
// with 2 arguments. These 2 parameters here are essentially, the current value
// and the next value if we image the .sort() method looping over the Array.

// Ascending order
// return < 0 A, B (keep order)
// return > 0 B, A (switch order)

// We can use this knowledge to sort our movements Array now in ascending order.
// So, ascending order means that we want to go from small to large numbers.
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

// movements.sort((a, b) => a - b);

// The Array is now indeed sorted in ascending order.

// // (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]
// console.log(movements);

// Descending order
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

// movements.sort((a, b) => b - a);
// // (8) [3000, 1300, 450, 200, 70, -130, -400, -650]
// console.log(movements);

// So, the examples for Ascending and Descending order work beautifly.
// And it's also gonna work for Strings.

// Now, if you have a mixed Array, with Strings and Numbers together,
// then, this is NOT going to work I advice you to simply NOT use this .sort()
// method in these cases anyway. And that, because there is not really a point
// in doing so.

// More ways of Creating and Filling Arrays

// // (7) [1, 2, 3, 4, 5, 6, 7]
// console.log([1, 2, 3, 4, 5, 6, 7]);
// // (7) [1, 2, 3, 4, 5, 6, 7]
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// // Empty Arrays + fill method
// const x = new Array(7);
// // It creates a new Array with 7 empty elements in there.
// // (7) [empty × 7]
// console.log(x);
// // (7) [empty × 7]
// console.log(x.map(() => 5));

// There is one method that we can call on this empty Array
// and that is the .fill() method. All we need to do is to pass in a value
// and it will then fill up the entire Array with this specific value.
// And this does actually mutate the underlying Array.
// (7) [1, 1, 1, 1, 1, 1, 1]
// x.fill(1);

// This method is actually very similar to the .slice() method.
// So, besides this value that we want to fill the Array with,
// we can also specify where we wanted to start to fill, so, a begin parameter.

// Let say, at index 3.
// (7) [empty × 3, 1, 1, 1, 1]
// x.fill(1, 3);

// So, it will then fill it up untill the end, unless we specify an end parameter,
// just like in .slice(). also, just like in .slice(), the final index here is not going
// to be included in the Array.

// // (7) [empty × 3, 1, 1, empty × 2]
// x.fill(1, 3, 5);
// console.log(x);

// // And, of course, we can use the .fill() method on other Arrays.
// // So, it doesn't have to be an empty Array.
// const arr = [1, 2, 3, 4, 5, 6, 7];
// arr.fill(23, 2, 6);
// // (7) [1, 2, 23, 23, 23, 23, 7]
// console.log(arr);

// So, what if we wanted to create this arr Array programmatically?
// For that we can use the Array.from Function. We are using the from function
// on the Array Contructor or Array Function Object on which we are calling the
// .from() method. The second arguments id a mapping function, so , it is exactly
// like the Callback Function that we pass into the .map() method.
// const y = Array.from({ length: 7 }, () => 1);
// // (7) [1, 1, 1, 1, 1, 1, 1]
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// // (7) [1, 2, 3, 4, 5, 6, 7]
// console.log(z);

// // Create an Array with 100 random dice rolls
// const a = Array.from(
//   { length: 100 },
//   (curr, i) => Math.floor(Math.random() * 6) + 1
// );
// // (100) [1, 1, 6, 1, 6, 4, 5, 2, 5, 1, 4, 2, 3, 6, 4, 1, 6, 4, 2, 1, 1, 6, 4, 3, 2, 4, 1, 1, 1, 2, 6, 3, 3, 4, 5, 2, 5, 1, 4, 6, 5, 4, 6, 6, 6, 3, 1, 2, 2, 1, 2, 4, 4, 6, 2, 4, 4, 1, 1, 4, 5, 3, 1, 6, 6, 4, 2, 3, 5, 6, 6, 1, 5, 2, 6, 5, 4, 1, 5, 5, 1, 2, 1, 2, 6, 1, 5, 2, 2, 1, 3, 6, 6, 3, 4, 1, 2, 3, 5, 5]
// console.log(a);

// Now, this Array.from() Function was initially introduced into JavaScript
// in order to create Arrays from Array-like structures. So, remember how we
// talked about Iterables before. Things like Strings, Maps or Sets,
// they are all iterables in JavaScript. And so, they can be converted to real Arrays
// using Array.from(). and that's the reason also for the name of the Function.
// Because we create Arrays from other things.

// Another example of an Array-like structure is the result of using .querySelectorAll().
// May be you remember that .querySelectorAll() returns something called a Node List,
// which is something like an Array, which contains all the selected elements.
// But it's not a real Array, so, it doesn't have methods like .map() or .reduce() for example.

// So, if we actuallyy wanted to use a real Array method like that on a Node List,
// we would first need to convert the Node List to an Array. And for that - Array.from()
// is perfect.

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   // (8) [1300, 70, -130, -650, 3000, -400, 450, 200]
//   console.log(movementsUI);
//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
//   // (8) [div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value]
//   console.log(movementsUI2);
// });

// Array Methods Practice

// To create a new Array out of the accounts Array we use the .map() method.
// Whenever we want an Array with the same length as the previous one or as the original one,
// then we use .map().

// 1. Calculate how much has been deposited in total in the bank.
// So, in all of the accounts across the bank.

// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, curr) => sum + curr, 0);

// const bankDepositSum = accounts.map(acc => acc.movements);
// (4) [Array(8), Array(8), Array(8), Array(5)]
// 0: (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// 1: (8) [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
// 2: (8) [200, -200, 340, -300, -20, 50, 400, -460]
// 3: (5) [430, 1000, 700, 50, 90]
// length: 4
// [[Prototype]]: Array(0)
// console.log(bankDepositSum);

// const bankDepositSum = accounts.map(acc => acc.movements).flat();
// (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]
// console.log(bankDepositSum);

// 25180
// console.log(bankDepositSum);

// 2. How many deposits there have been in the bank with at leats 1000 dolars?
// const numDeposts1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// // 6
// console.log(numDeposts1000);

// Do the task using .reduce()
// const numDeposts1000 = accounts
//   .flatMap(acc => acc.movements)
//   // .reduce((count, curr) => (curr >= 1000 ? count + 1 : count), 0);
//   // .reduce((count, curr) => (curr >= 1000 ? count++ : count), 0);
//   .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);
// // 6
// // 0
// // 6
// console.log(numDeposts1000);

// let a = 10;

// 10
// The ++ operator did his job here, but the thing is that when we use it like this
// it will still return the old value, which here was 10. So, the same thing happend
// with count++ above.
// console.log(a++);

// Prefixed ++ operator
// Fortunately for us, there is an easy solution. We can simply use the so called
// Prefixed ++ operator. So, we can write it before the operand.
// // 11
// console.log(++a);
// // 11
// console.log(a);

// 3. Create an Object, which countains the sum of the deposits and of the withdrawals.
// So, basically, we want to calculate these two sums at the same time, all in one go,
// using the .reduce() method.

// Create a new Object instead of just a Number or just a String, because, why not?
// Advanced usage of .reduce() method

// So, we already know that .reduce() boils down an Array to just one value, and so,
// that value might very well be an Object. It could even be a new Array as well.
// And in fact, we could use .reduce() to replace many of the other methods that we have.
// So, .reduce() really is like the swiis knife of array methods.
// We could use it for everything.

// const sums = accounts
// const { deposits, widthdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, curr) => {
//       // curr > 0 ? (sums.deposits += curr) : (sums.widthdrawals += curr);
//       sums[curr > 0 ? 'deposits' : 'widthdrawals'] += curr;
//       return sums;
//     },
//     { deposits: 0, widthdrawals: 0 }
//   );

// {deposits: 25180, widthdrawals: -7340}
// deposits: 25180
// widthdrawals: -7340
// [[Prototype]]: Object
// console.log(sums);

// 25180 -7340
// console.log(deposits, widthdrawals);

// This was really a great use case on how to use something other than a primitive value
// as the accumulator of the .reduce() method.

// Challenge
// Recreate any of the challenges that we did previously in this section
// with .map(), .filter() and .reduce() to use only the .reduce() mehod.
//

// 4. Create a simple Function to convert any String to a Title Case.
// So, Title Case basically means that all the words in a sentance are capitalized,
// except some of them. There are some exceptions.
// Example: this is a nice title -> This Is a Nce Title.

// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');
//   return capitalize(titleCase);
// };
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title, but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

// Coding Challenge #4
// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).
// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) �
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects �)
// The Complete JavaScript Course 26
// Hints:
// § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them �
// § Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended *
// 1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.
// Test data:
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// GOOD LUCK �

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// // 1.
// dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
// // (4) [{…}, {…}, {…}, {…}]
// // 0: {weight: 22, curFood: 250, owners: Array(2), recFood: 284}
// // 1: {weight: 8, curFood: 200, owners: Array(1), recFood: 133}
// // 2: {weight: 13, curFood: 275, owners: Array(2), recFood: 191}
// // 3: {weight: 32, curFood: 340, owners: Array(1), recFood: 376}
// // length: 4
// // [[Prototype]]: Array(0)
// console.log(dogs);

// // 2.
// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// // Sarah's dog eats too much.
// console.log(
//   `Sarah\'s dog eats too ${
//     dogSarah.curFood > dogSarah.recFood ? `much.` : `little.`
//   }`
// );
// // {weight: 13, curFood: 275, owners: Array(2), recFood: 191}
// console.log(dogSarah);

// // 3.
// const ownersEatTooMuch = dogs
//   .filter(dog => dog.recFood > dog.curFood)
//   .flatMap(dog => dog.owners);
// //.flat();
// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood > dog.recFood)
//   .flatMap(dog => dog.owners);
// //.flat();

// // ['Alice', 'Bob', 'Michael']
// console.log('ownersEatTooMuch', ownersEatTooMuch);
// // ['Matilda', 'Sarah', 'John']
// console.log('ownersEatTooLittle', ownersEatTooLittle);

// // 4.
// // "Matilda and Alice and Bob's dogs eat too much!"
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// // "Sarah and John and Michael's dogs eat too little!"
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// // 5.
// // false
// console.log(dogs.some(dog => dog.curFood === dog.recFood));

// // 6.
// // current > (recommended * 0.90) && current < (recommended * 1.10)

// const checkEatingOkay = dog =>
//   dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

// // true
// console.log(dogs.some(checkEatingOkay));

// // 7.
// // [{…}]
// // 0: {weight: 32, curFood: 340, owners: Array(1), recFood: 376}
// // length: 1
// // [[Prototype]]: Array(0)
// console.log(dogs.filter(checkEatingOkay));

// // 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// // portion in an ascending order (keep in mind that the portions are inside the
// // array's objects
// const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
// // (4) [{…}, {…}, {…}, {…}]
// // 0: {weight: 8, curFood: 200, owners: Array(1), recFood: 133}
// // 1: {weight: 13, curFood: 275, owners: Array(2), recFood: 191}
// // 2: {weight: 22, curFood: 250, owners: Array(2), recFood: 284}
// // 3: {weight: 32, curFood: 340, owners: Array(1), recFood: 376}
// // length: 4
// // [[Prototype]]: Array(0)
// console.log(dogsSorted);
