'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-12-24T21:31:17.178Z',
    '2022-12-21T07:42:02.383Z',
    '2022-10-11T09:15:04.904Z',
    '2022-10-13T10:17:24.185Z',
    '2022-10-15T14:11:59.604Z',
    '2022-10-17T17:01:17.194Z',
    '2022-10-19T23:36:17.929Z',
    '2022-10-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

const formatMovementDate = function (date, locale) {
  // So, let's now actually create a Function that takes 2 Dates and it's gonna return the Number of Days
  // that passed between those 2 Dates.
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log('daysPassed', daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // // And remember, this one here is 0-base, so I am going to add + 1 now.
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
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

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // This is going to be a nicely formatted Time String.
    // And so, we could use that String to create a new Date Object.
    // And we need that Object, so that then from there we can call
    // our usual methods to get the Date and the Month and the Year.
    // That is the reason that we need to convert those Strings back
    // into a JS Object. Because only then we can actually work with that data.
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    new Intl.NumberFormat(acc.locale, {
      style: 'currency',
      currency: acc.currency,
    }).format(mov);
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
    `;
    // Syntax: insertAdjacentHTML(position, text)
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  // Let's say that this bank pays out interest each time there is a deposit
  // to the bank account. And that interest is 1.2% of the deposited amount.
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);

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
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// And this Function doesn't need any arguments.
// All it does is to basically export some functionality
// into a internal Function.
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each callback call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    // When the time is at 0, after the Timer has basically expired,
    // so, when we reach 0 seconds, stop Timer and log out User.
    if (time === 0) {
      clearInterval(timer);
      // Display UI and message
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrece 1s
    time--;
  };
  // Set time to 5 minutes
  let time = 120;
  // Call the Timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Event handler
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current Date & Time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      // month: '2-digit',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'narrow',
      // weekday: 'short',
      // weekday: 'long',
    };

    // const locale = navigator.language;
    // console.log('locale', locale);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // // And remember, this one here is 0-base, so I am going to add + 1 now.
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // day/month/year

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
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

    // Add Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add Loan Date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset Timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Delete');

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
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
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Converting and Checking Numbers

// // In JS all numbers are represented internally as a floating point numbers.
// // So, basically, always has decimals no matter if we actually write them
// // as integers or as decimals.
// // true
// console.log(23 === 23.0);
// // And that's the reason that we only have 1 data type for all numbers.
// // Also, numbers are represented internally in a 64-base-2 format.
// // So, that means that numbers are always stored in a binary format.
// // So, basically, they are only composed of 0s and 1s.
// // Now, in this binary form it is very hard to represent some fractions
// // that are very easy to represent in the base-10 system that we are used to.
// // Base 10 - 0 to 9 // 1/10 = 0.1 // 3/10 = 3.33333....
// // Binary Base 2 - 0 1
// // 0.30000000000000004
// console.log(0.1 + 0.2);
// // false
// // Be aware that you can't do really precise scientific or financial calculations in JS.
// console.log(0.1 + 0.2 === 0.3);

// // Convert a String to a Number
// // 23 (Number)
// console.log(Number('23'));
// // And this works, because when JS the plus operator it will do a Type Coercion,
// // so it will automatically convert all the operand to Numbers.
// // 23 (Number)
// console.log(+'23');

// Parsing Intigers
// We can parse a Number into a String.
// So, this is like a Type Coercion, but even more advanced.
// As we saw, it tries to get rid of unneccessary symbols that are not numbers.
// Now, the .parseInt function actually accepts a second argument, which is the so called "regex".
// And the "regex" is the base of the numeral system that we are using. So, here we are simply using Base 10 numbers,
// so, numbers from 0 to 9. Most of the time we are doinf that and so we should always pass in the number 10.
// But if we were working, for example, with binary, then we would write 2 and then the result would be completely different.

// // NaN
// console.log(Number.parseInt('30px', 2));
// // 30 (Number)
// console.log(Number.parseInt('30px', 10));
// // NaN
// console.log(Number.parseInt('e23', 10));

// // Parsing Float
// console.log(Number.parseInt('  2.5rem  '));
// console.log(Number.parseFloat('  2.5rem  '));

// Btw, these 2 Functions here, they are also so called, global Functions.
// So, we would not have to call it on Number, so this here also works:
// console.log(parseFloat('  2.5rem  '));
// But is the more traditional and old school way of doing it.
// Now, in Modern JS is more encouraged to call these Functions actually on the Number Object.
// So, we say that the Number here provides something called a "Namespace".
// A "Namespace" for these different Functions like .parseFloat and .parseInt.

// Check if Value is NaN
// // This isn't Not a Number => false
// console.log(Number.isNaN(20));
// // This isn't Not a Number => false
// console.log(Number.isNaN('20'));
// // NaN => true
// console.log(Number.isNaN(+'20X'));
// // Dividing by 0 gives us Infinite. So, dividing by 0 is something that is now allowed in mathematics
// // and so it will give us Infinity. Infinity is also Not not a NaN and so therefore we get false here as well.
// // false
// console.log(Number.isNaN(23 / 0));

// Checking if a value is a Number
// // true
// console.log(Number.isFinite(20));
// // NaN => false
// console.log(Number.isFinite('20'));
// // NaN => false
// console.log(Number.isFinite(+'20X'));
// // Dividing by 0 gives us Infinite. So, dividing by 0 is something that is now allowed in mathematics
// // and so it will give us Infinity. Infinity is also Not not a NaN and so therefore we get false here as well.
// // Infinity is, of course, Not Finite => false
// console.log(Number.isFinite(23 / 0));

// Checking if a value is an Integer
// // true
// console.log(Number.isInteger(23));
// //true
// console.log(Number.isInteger(23.0));
// // false
// console.log(Number.isInteger(23 / 0));

// Math and Rounding
// Let's now learn about some more mathematical operations and also about rounding numbers.

// Math square root
// console.log(Math.sqrt(25));
// // The same can be achieved using the Exponentiation operator:
// console.log(25 ** (1 / 2));
// // And the same would work for a cubic root
// console.log(8 ** (1 / 3));

// Get Maximum value of a couple of values
// // 23
// console.log(Math.max(5, 18, 23, 11, 2));
// // 23
// console.log(Math.max(5, 18, '23', 11, 2));
// // NaN
// console.log(Math.max(5, 18, '23px', 11, 2));

// Get Minimum value of a couple of values
// console.log(Math.min(5, 18, 23, 11, 2));

// Now, besides a couple of methds there are also constants on the Math Object
// or on the Math Namespace. And so, for example, if we wanted to calculate the radius of a circle
// with 10px, we could do that.
// // 3.141592653589793
// console.log(Math.PI);
// // 314.1592653589793
// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Now, another thing that is on the Math Object is the .random Function that we already have been using a couple of times.
// And it's very important to be able to generate good random Numbers when we need them.
// So, before we have already created random dice rolls. So, that we did by:
// console.log(Math.trunc(Math.random() * 6) + 1);
// This will give us a Number between 0 and 1.
// Then we multiply this by 6, and then we removed the decimal part by using Math.trunc.
// The problem with this was that then the highest Number could be 5 and so we simply added + 1
// to offset this truncation here - so, that cutting of of the decimal part.
// And so, now we are going to get values here between, really, 1 and 6.

// But now, let's actually generalize this formula so that we can use it from now on to always generate random integers between 2 values.
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 => 0...(max - min) => min...(max - min + min) => min...max
// console.log(randomInt(10, 20));

// Rounding Integers
// What this does is to simply remove any decimal part and so we end up with 23 here
// // 23
// console.log(Math.trunc(23.3));

// // What one will always round to the nearest integer
// // 23
// console.log(Math.round(23.3));
// // 24
// console.log(Math.round(23.9));

// // 24
// console.log(Math.ceil(23.3));
// // 24
// console.log(Math.ceil(23.9));

// // 23
// console.log(Math.floor(23.3));
// // 23
// console.log(Math.floor(23.9));

// All of these methods also do Type Coercion,
// so if we do this, then it is going to work just the same:
// 23
// console.log(Math.floor('23.9'));

// Now, you might think that .trunk() and .floor() are very similar, and, indeed, they do the same
// when we are dealing with positive Numbers. So, basically, .trunk() and .floor() both cut of the
// decimal part when we are dealing with positive Numbers. However, for negative Numbers it doesn't work this way.
// console.log(Math.trunc(-23.3));
// With negative Numbers, rounding works the other way around. And so, actually, .floor() is a little bit better
// than .trunc(), because it works in allsituations, no matter if we are dealing with positive or negative Numbers.
// console.log(Math.floor(-23.3));

// Rounding decimals
// And now, with decimals works in a little bit different way.
// 3
// toFixed() will always return a String and NOT a Number.
// console.log((2.7).toFixed(0));
// // 2.700
// console.log((2.7).toFixed(3));
// // 2.35
// console.log((2.345).toFixed(2));
// // 2.35 (Number)
// console.log(+(2.345).toFixed(2));

// This here works in a similar way then the String methods. So, this is a Number, and so, it's a Primitive, right?
// A Primitives, actually, don't have methods, and so, behind the scenes JS will do "boxing".
// And "Boxing" is to transform this to a Number Object, then call the method on that Object and then once the operations has finished,
// it will converted back to a Primitive.

// The Reminder Operator (%)
// One operator that I didn't mention earlier is the Reminder Operator.
// And the reason for that is that the Reminder Operator has, actually, some specipal use cases.
// And so, it deserves a lecture on it's own. The Reminder Operator simply returns the reminder of a division.
// // 1
// console.log(5 % 2);
// // 2.5 => 5 = 2 * 2 + 1 => 1 here is the reminder
// console.log(5 / 2);
// // 2
// console.log(8 % 3);
// // 2.6666666666666665 => 8 = 2 * 3 + 2 => 2 here is the reminder
// console.log(8 / 3);

// // even numbers: 0, 2, 4, 6, 8, 10 ...
// // odd numbers: 1, 3, 5, 7, 9 ...

// // So, when is a number even? It's even if it's divisible by 2.
// // and this means that if we divide it by 2, the reminder is 0.

// // 0
// console.log(6 % 2);
// // 3
// console.log(6 / 2);

// // 1
// console.log(7 % 2);
// // 3.5
// console.log(7 / 2);

// const isEven = n => n % 2 === 0;
// // true
// console.log(isEven(8));
// // false
// console.log(isEven(23));
// // true
// console.log(isEven(514));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     // 0, 2, 4, 6
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     // 0, 3, 6, 9
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

// Numeric Separators
// Starting from ES2021, we can use a feature called "Numeric Separators"
// to form a Numbers in a way that is easier for us and for other developers to read and understand.

// So, lets say we wanted to represent a really large Number.
// For exampl, the diameter of our Solar System:
// 287, 460, 000, 000
// const diameter = 287460000000;

// // "Numeric Separators" are simply underscores that we can place anywehere that we want in our Numbers,
// // and which will make it then really easy to understand and to parse Numbers this large
// const diameter = 287_460_000_000;
// // 287460000000
// // The Engine basically ignores those underscores, so these "Numeric Separators".
// // And so, what this means is that we can actually place the underscores, so the "Numeric Separators",
// // anywhere that we want
// console.log(diameter);

// const price = 345_99;
// // So, basically we can use the underscore now to give meanings to certain parts of our Numbers.
// // So, above we used the "Numeric Separators" for thousands and here we used them for cents.
// // 34599
// console.log(price);

// const transferFee1 = 15_00;
// const transferFee2 = 1_500;

// const PI = 3.14_15;
// // 3.1415
// console.log(PI);

// // Now, just one final detail that we need to we aware of is when we try to convert Strings
// // that contain underscore to a Number that will not work as expected. The same is true for the .parseInt() Function
// // 230000
// console.log(Number('230000'));
// // NaN
// console.log(Number('230_000'));
// // 230
// console.log(parseInt('230_000'));

// Working with BigInt
// Lte's now meet one of the Primitive data types that we never talked about before.
// And that is BigInt. So, BigInt is a special type of Integers
// that was introduced in ES2020.

// So, we've learned in the first lecture of this section
// that Numbers are represented internally as 64 bits.
// And this means that there are exactly 64 1s or 0s to represent any given Number.
// Now, of these 64 bits, only 53 are used to actually store the digits themselves.
// The rest are for storing the position of the decimal point and the sign.
// Now, if there are only 53 bits to store the Number,
// that means that there is a limit of how big Numbers can be.
// 9007199254740991
// And so, that is this gigantic Number here.
// And so, this is essentially, the biggest Number that JS can safely represent.
// And it is 2, because, again, we are working with Base 2 - which is only 0s and 1s.
// console.log(2 ** 53 - 1);
// And this Number is so important that is even stored into the Number Namespace as MAX_SAFE_INTEGER
// 9007199254740991
// So, any integer that is larger than this is NOT safe and that means it cannot be represented accurately.
// console.log(Number.MAX_SAFE_INTEGER);
// If we do calculations with Numbers that are bigger than these then we might loose precision.
// So, with some Numbers it does actually work for some reason, but that's because JS behind the scenes
// uses some tricks to still represent some of the unsafe Numbers, but again - sometimes this works,
// sometimes it doesn't. And that why we call those "Unsafe Numbers".
// console.log(2 ** 53 + 1);
// console.log(2 ** 53 + 2);
// console.log(2 ** 53 + 3);
// console.log(2 ** 53 + 4);

// This can be a problem sometimes, because in some situations we might need really really big Numbers.
// Way bigger than this one here. For example, for Data Base IDs. And we might, for example, from some APIs, get a Number
// that is larger than this, and then we have no way of storing that in JS. At least NOT untill now.
// Now, starting from ES2020 a new Primitive was added, which is called BigInt.
// And BigInt stands for integer and it can be used to store Numbers as large as we want.
// So, no matter how big.
// // 4.8384302483420437e+33
// // You see this here, which probbaly doesn't have precision, because, of course, it's larger that the Numbers listed before.
// console.log(4838430248342043823408394839483204);
// // 4838430248342043823408394839483204n
// // This n here basically transforms a regular Number into a BigInt Number.
// console.log(4838430248342043823408394839483204n);
// We can also create BigInt by using the .BigInt Function
// And so, this gives us kind of the same result, well not really for some reason, but I guess
// that's because JS will first have to still represent this Number here internally before it can then transform it
// into a BigInt. And that's reason why here from a certain point on this second Number is different.
// so, this constructor Function should probably only be used with small Numbers.
// // 4838430248342043683707135006343168n
// console.log(BigInt(4838430248342043823408394839483204));
// // 48384302n
// console.log(BigInt(48384302));

// Operations
// // 2000n
// console.log(1000n + 1000n);
// // 362863726372637263762372637263726320000000n
// console.log(36286372637263726376237263726372632n * 10000000n);

// Now, what is NOT possible is to mix BigInts with regular Numbers.
// const huge = 20289830237283728378237n;
// const num = 23;
// Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
// console.log(huge * num);
// 466666095457525752699451n
// console.log(huge * BigInt(num));

// Exceptions

// There are 2 exceptions to this, which are the Comparison Operators and the Plus Operator when working with Strings:
// // true
// console.log(20n > 15);

// The === doesn't do Type Coercion and in fact those 2 values here - they have a different type -
// one is a BigInt and the other is a regular Number.
// // false
// console.log(20n === 20);
// // bigInt
// console.log(typeof 20n);
// // If we do the regular Equality Operator, so, the loose one
// // then this should still be true, right? Because then JS does
// // the Type Coercion and so it will then coerce this to a regular Number
// // and then they are both the same.
// // true
// console.log(20n == 20);
// // It will even work like this:
// // true
// console.log(20n == '20');

// Exception 1: Logical Operators
// Exception 2: When we do String concatenations.

// The Numbers are now converted to a String, even the BigInt Number.
// // 20289830237283728378237  is REALLY big!!!
// console.log(huge + '  is REALLY big!!!');

// One other thing that I didn't tell you up here,
// is that also the Math operations that we've talked about earlier
// are not gonna work here. For example, we cannot take the square root:
// Uncaught TypeError: Cannot convert a BigInt value to a number at Math.sqrt (<anonymous>)
// console.log(Math.sqrt(16n));

// Divisions
// Finally, let's have a look what happens to divisions,
// because BigInt is indeed an integer.
// With BigInt it will simply return the closest BigInt.
// It basically cuts the decimal part off.
// // 3n
// console.log(11n / 3n);
// // 3.3333333333333335
// console.log(10 / 3);

// Creating Dates
// When we build real world applications one type of data that comes up all the time is
// Dates and Times. So, lets learn the fundamentals of Dates and Times in this video
// so then in the next one we can then implement them into our application.

// Now, Dates and Time can be a little bit messy in JS.

// Create a adte
// There are exactly 4 ways of creating dates in JS.
// They all use the new Date() constructor Function,
// but they can accept different parameters

// 1. Use the new Date constructor
// const now = new Date();
// Thu Oct 20 2022 11:34:48 GMT+0300 (Eastern European Summer Time)
// console.log(now);

// 2. Parse the Date from a Day String
// Thu Oct 20 2022 11:34:48 GMT+0300 (Eastern European Summer Time)
// console.log(new Date('Oct 20 2022 11:34:48'));

// 3. We can write one Date ourselves
// And indeed, that works, and we even get the Day of the Week here.
// So JS is pretty smart in parsing out this String that we wrote.
// However, it's generally NOT a good idea to do this, bacause it can NOT be quite reliable.
// However, if this String was generated by JS itself - then, of course, it's pretty safe.
// Thu Dec 24 2015 00:00:00 GMT+0200 (Eastern European Standard Time)
// console.log(new Date('December 24, 2015'));
// Mon Nov 18 2019 23:31:17 GMT+0200 (Eastern European Standard Time)
// console.log(new Date(account1.movementsDates[0]));

// 2019-11-18T21:31:17.178Z
// This Z here means the UTC, that's the coordinated universial Time,
// which is basically the Time without any timezone in London
// and also witout daylight savings.

// So, that's based on a String, but we can also pass in a Year, Month, Day, Hour, Minute
// and even Second into this constructor.
// Thu Nov 19 2037 15:23:05 GMT+0200 (Eastern European Standard Time)
// console.log(new Date(2037, 10, 19, 15, 23, 5));

// The month here in JS is 0-based and that's a little bit weird, but we can just get used to that.
// What's cool about that is that JS actually autocorrects the Date:
// Tue Dec 01 2037 00:00:00 GMT+0200 (Eastern European Standard Time)
// console.log(new Date(2037, 10, 31));
// Thu Dec 03 2037 00:00:00 GMT+0200 (Eastern European Standard Time)
// console.log(new Date(2037, 10, 33));

// This sometimes is pretty useful.

// 4. Finally, we can also pass into the Date Constructor Function
// the amount of milliseconds passed since the beginning of the Unix time,
// which is January 1st 1970. so, lets see that:
// Thu Jan 01 1970 02:00:00 GMT+0200 (Eastern European Standard Time)
// console.log(new Date(0));
// Let's now create a Date that is 3 Days after this:
// Sun Jan 04 1970 02:00:00 GMT+0200 (Eastern European Standard Time)
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// 3 * 24 * 60 * 60 * 1000
// 259200000
// This is the Time Stamp. So, we call this a Time Stamp of the Day Number 3, essesntially.
// We will se why this is useful a little bit later.

// Now, these Dates that we've created here are in fact just another special type of Object.
// And so therefore, they have their own methods, just like Arrays or Maps or Strings.
// And so, we can use these methods to get or to set components of a Date.

// Working with Dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// Always use .getFullYear() and NOT getYear().
// 2037
// console.log(future.getFullYear());
// Remember, this one is 0-based
// 10
// console.log(future.getMonth());
// This gives us the Day. Actually, this method has a little bit of a weird name.
// It's like that, because .getDay() is actually NOT the Day of the Month,
// but the Day of the Week. And so, 0 here is Sunday, and so 4 is the Thursday.
// 19
// console.log(future.getDate());
// 15
// console.log(future.getHours());
// 23
// console.log(future.getMinutes());
// 0
// console.log(future.getSeconds());

// Besides that, we can also get a nicely formatted String,
// so, basically similar to what we have up here.

// So, this is the ISOString, which follows some kind of international standard
// and mey be you've noticed that this is actually similar to the String that we used before,
// coming from account1.
// 2037-11-19T13:23:00.000Z
// console.log(future.toISOString());

// Finally, we can also get the Time Stamp of the Date
// And, remember that hte Time Stamp is the milliosconds, which have passed since January 1st 1970.
// And now, we can take this Number and reverse this:
// 2142249780000
// console.log(future.getTime());

// So, if you want it, you can now create a new Date only based on these milliseconds
// and it will then gives this exact same Time.
// Thu Nov 19 2037 15:23:00 GMT+0200 (Eastern European Standard Time)
// console.log(new Date(2142249780000));

// And Time Stamps are actually so important that there is a special method
// that we can use to get a Time Stamp for right now.
// So, if you want simply the current Time Stamp for this exact moment
// then you don't even need to create a new Date.
// All we have to do is to call Date.now() and that gives us this Time Stamp:
// 1666258694868
// console.log(Date.now());

// Finally, there are also these set versions of all of these methods
// So, let me just show you the one for the Year.
// There also exists .setMonth(), .setDate(), .setDay(), and so on and so forth.
// And these also perform autocorrection, just like here, when we create a new Date.
// So, I'm not gonna go through all of them here:
// future.setFullYear(2040);
// Mon Nov 19 2040 15:23:00 GMT+0200 (Eastern European Standard Time)
// console.log(future);

// That's basically all the methods that you need to know about Dates
// and these last here a quite intuitive and all you need to know really
// is that there are all these different ways of creating Dates.

// Adding Dates to "Bankist" App
// Let's implement Dates into our Application.

// Operations with Dates
// Let's now pwerform some operations with Dates
// So, one cool thing that we can do with Dates is to do calculations with them.
// For example, we can substract one Date from another Date in order to calculate
// how many Days have passed between the two Dates. And this works, because whenever we
// attempt to convert a Date to another then the result is going to be the Time Stamp
// in milliseconds. And with these milliseconds we can then perform calculations.
// So, again the Time Stamps are going to be really helpful here in this situation.

// const future = new Date(2037, 10, 19, 15, 23);
// // 2142249780000
// console.log(Number(future));
// console.log(+future);

// So, if we substract one Date from another the result is going to be like the one we just saw -
// a Time Stramp in milliseconds and then we can simply convert these milliseconds back to Days or
// to Hours, or to whatever we really want.

// So, let's now actually create a Function that takes 2 Dates and it's gonna return the Number of Days
// that passed between those 2 Dates.
// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(
//   new Date(2037, 3, 4),
//   new Date(2037, 3, 14, 10, 8)
// );
// console.log(days1);

// Internationalizing Dates (Intl)
// JS has a new Internationalization API.
// Now, that sounds very fancy, but all it does
// is to allow us to easily format Numbers and Strings
// accourding to different languages. So, with this new API
// we can make our Application support different languages
// for users around the world. Which is pretty important.
// For example, currencies or Dates are represented in a completely different way in Europe or in the US or in Asia,
// for example. Now, there is a lot of language specific things
// that we can do with the Internationalization API, but in this
// Section we are just breafly going to talk about formating Dates
// and Numbers. And starting with Dates with this video.

// Internationalizing Numbers (Intl)
// In the last video we formatted Dates using the
// Internationalization API. So, now, let's actually format
// regular Numbers.

// const num = 3884764.23;
// const options = {
//   // style: 'unit',
//   style: 'currency',
//   // style: 'percent', // and then the unit is completely ignored
//   // unit: 'mile-per-hour',
//   unit: 'celsius',
//   currency: 'EUR',
//   // useGrouping: false,
// };

// console.log('US:        ', new Intl.NumberFormat('en-US', options).format(num));
// console.log(
//   'Germany:        ',
//   new Intl.NumberFormat('de-DE', options).format(num)
// );
// console.log(
//   'Syria:        ',
//   new Intl.NumberFormat('ar-SY', options).format(num)
// );
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language, options).format(num)
// );

// Timers: setTimeout and setInterval
// To finish this Section, let's quickly talk about Timers in JS.
// And we have 2 kinds of Timers:
// 1) the setTimeout Timer - runs just once after a defined time,
// while the setInterval Timer - keeps running, basically forever until we stop it.

// So, basically, we can use setTimeout to execute some code
// at some point in the future. So, let's use this to simulate
// ordering a pizza. And then this Function receives a Callback Function.
// So, just like some Array methods or DOM event handlers.

// setTimeout()
// const ingredients = ['olives', 'spinach'];
//  Here is your pizza 🍕 => 3s after Waiting...
// So, we learned that setTimeout here simply schedules a Function to run after a certain amount of time.
// But the Callback Function is only executed once.
// const pizzTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
//   3000,
//   // 'olives',
//   // 'spinach',
//   // We will spread the Array using the Spread Operator,
//   // instead of using ingredients[0] and ingredients[1].
//   // and so, this will then take the element of the Array and put them here,
//   // basically, comma separated. And so, now, this works exactly the same.
//   ...ingredients
// );
// So, this Callback Function here is the first argument of this setTimeout Function.
// and so, again, we do NOT call this Function ourselves, we simply pass in this Function
// as an argument to setTimeout. And it is this Function who will then call our Callback
// Function in the future. And when does that future arraive? Well, that what we specify here
// in the second argument. So, here, we pass in the amount of milliseconds that will pass until
// this Function is called. So, let say, we want to call this Function after 3 seconds and so we need
// to pass 3000.
// And so, with this we really delayed calling this Function here by exactly 3 seconds.
// And we can also say that we scheduled this Function call for 3 seconds later.
// Now, what's really important to realize here is that the code execution does NOT stop
// here at this point. When the execution of our code reaches this point, it will simply call the
// setTimeout Function, it will then, essentially, register this Callback Function here,
// to be called later, and then the code execution simply continues.
// Waiting...
// console.log('Waiting...');
// This mechanism is called "Asynchronous JavaScript".
// And we will talk about how exactly all of this works behind the scenes in a special Section
// just about Asynchronous JavaScript.

// What if we now needed to pass some arguments into this Function here?
// It's NOT that simple now, because we are NOT calling this Finction ourselves.
// However, the setTimeout Function here actually has a solution for that.
// And it works like this: basically all the arguments that we pass after the delay
// will be arguments to the Function

// if (ingredients.includes('spinach')) clearTimeout(pizzTimer);

// setInterval()
// Now, what if we wanted to run a Function over and over
// again, like ecery 5 seconds or every 10 min?
// Well, for that we have the setTimeout Function
// setInterval(function () {
//   const now = new Date();
//   // console.log(now);

//   // Challenge:
//   // Of course, you could print a real clock using this Function now.
//   // Like, you could get the current Hour, Minutes and Seconds from this Now.
//   // And so, I would challenge you to do it.
//   const hour = `${now.getHours()}`.padStart(2, 0);
//   const min = `${now.getMinutes()}`.padStart(2, 0);
//   const seconds = `${now.getMinutes() * 60}`.padStart(2, 0);
//   console.log(`${hour}:${min}:${seconds}`);
// }, 1000);

// Implementing a Countdown Timer
// And this is going to be last part of this project.
// So, we are almost done here. Now, for security reasons
// real bank applications will log out users after some inactive time.
// For example, after 5 minutes without doing anything. And that's what
// we will implement in this video using the setInterval() Timer.
// And let's start with one final look at our flip Chart.
