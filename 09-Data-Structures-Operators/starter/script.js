'use strict';

// Data needed for first part of the section
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 enhanced object literals
  openingHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// Destructuring Arrays
// Destructuring is a ES6 feature and it's basicaly a way of unpacking values from
// Array or an Object into separate values. In other words, detructuring is to break
// a complex data structure down into a smaller data structure like a variable.

// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr;
// console.log(x, y, z);
// console.log(arr);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // Switching variables
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// // Mutating variables
// [secondary, main] = [main, secondary];
// console.log(main, secondary);

// // Receive 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// // console.log(i, j);
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

// Destructuring Objects

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;

// console.log(restaurantName, hours, tags);

// // Default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };

// ({ a, b } = obj);
// console.log(a, b);

// // Nested Objects
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1,
// });

// The Spread Operator (...)

// const arr = [7, 8, 9];
// const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArray);

// const newArr = [1, 2, ...arr];
// console.log(newArr);
// console.log(...newArr);
// console.log(1, 2, 7, 8, 9);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // The spread operator is a bit similar to destructuring,
// // because it also helps us get elements out of Arrays, right?
// // Now, the big difference is that the spreat operator
// // takes all the elements from the Array and it also
// // doesn't create new variables. And as a consequence,
// // we can only use it in the places where we otherwise
// // write values separated by commas.

// // Copy Array
// const mainMenuCopy = [...restaurant.mainMenu];
// console.log('mainMenuCopy', mainMenuCopy);

// // Join 2 Arrays or more
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log('menu', menu);

// // Actually, the spread operator works on all so called iterables.
// // Itarables: Arrays, Strings, Maps, Sets, but NOT Objects.
// // Basically, most of the build-in structures in JS are now iterables, but except Objects.
// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);

// // This is not going to work, and that's because
// // this isn't a place that expects multiple values separated by a comma.
// // Multiple values separated by a comma are usually only expected when we pass arguments into a function or when we build a new Array.
// // console.log(`${...str} Schmedtman`);

// // A real world example
// const ingredients = [
//   // prompt("Let's make pasta! Ingredient 1?"),
//   // prompt('Ingredient 2?'),
//   // prompt('Ingredient 3?'),
// ];
// console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

// // Since 2018 the spread operator actually also works on Objects, even though Objects are not iterables.

// // Objects

// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);

// // Shallow copy of Object using the spread operator
// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log('restaurantCopy.name', restaurantCopy.name);
// console.log('restaurant.name', restaurant.name);

// Rest Pattern and Parameters

// The Rest Pattern looks exactly like the Spread Operator
// and so, it has the same syntax with the (...),
// but it actually does exactly the opposite of the Spread Operator.

// We used the Spread operator to build new Arrays or pass multiple values (argument) into a function.
// So, those are the use cases of the Spread Operator and in both cases we used the Spread Operator to expand an Array into individual elements.

// Now, the Rest Pattern uses the exact same syntax, however, to collect multiple elements and condent them into an Array. So, that's really the opposite of Spread.

// The Spread operator is to unpack an Array, while the Rest Pattern is to pack elements into Array.

// // 1) Desctructuring
// // Arrays

// // SPREAD, because on RIGHT side of =
// const arra = [1, 2, ...[3, 4]];
// // REST, because on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// // Objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// // 2) Functions
// // using the Rest Header
// // or in this case - Rest Parameter
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// // What we see here is 3 Arrays with all parameters that we passed into the functions, but they are indeed Arrays.
// // The Rest syntax is taking multiple numbers or multiple values and then packs them all into 1 Array. So, once more, it's doing the opposite of the Spread Operator.
// // So, with the Spread syntax we expand, with the Rest syntax we compress.
// // So, here it's called Rest arguments.

// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');

// // The Rest Patter is basically used when we therwise multiple variables names separated by commas and NOT values separated by commas.

// Short Circuiting (&& and ||)

// 3 properties about Logical Operators
// They can use ANY data type
// They can return ANY data type
// And they can do something called 'Short Circuiting',
// a.k.a 'Short Circuit Evaluation'

// console.log('---- OR ----');
// // In the case of the || Operator,
// // 'Short Circuiting' means that if the first value is a truthy value
// // it will immediately return that first value and will not
// // look at the second value at all.

// console.log(3 || 'Jonas'); // 3
// console.log('' || 'Jonas'); // 'Jonas'
// console.log(true || 0); // true
// console.log(undefined || null); // null

// console.log(undefined || 0 || '' || 'Hello' || 23 || null); // 'Hello'

// restaurant.numGuests = 0;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log('---- AND ----');
// // The && Operator Short Circuits when the first value is falsy.
// // And then immediately returns this falsy value without even evaluating the second operand.
// console.log(0 && 'Jonas'); // 0
// // So when the first value is truthy it means that the evaluation continues
// // and then simply the last value is returned.
// console.log('Hello' && 23 && null && 'Jonas'); // null

// // Practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// // The || Operator will return the first truthy value
// // of all the operands or simply the last value if all of them are falsy.
// // On the other hand, the && Operator will return the first falsy value
// // or the last value if all of them are truthy.

// // And as for Practical applications we can use the || Operator to set default values
// // and we can use the && Operator to execute code in the second operand if the first one is true.

// The Nullish Coalescing Operator (??)

// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// // Nullish values: null and undefined (NOT 0 or '')
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// // Basically, for the Nullish Coalescing Operator
// // it is as if the 0 and the '' are NOT falsy values
// // and they aren't truthy values as well.
// // But again, that operator works with the principal of Nullish values.
// // And so, only nullish values will short circuit the evaluation here.
// // So, only if restaurant.numGuests is null or undefined, only then
// // the second operand, after the ?? Operator, will be executed and returned.
// // Else, the first non nullish value will be immediately short circuited and returned.

// Logical Assignment Operators

// const rest1 = {
//   name: 'Capri',
//   // numGuests: 20,
//   numGuests: 0,
// };

// const rest2 = {
//   name: 'La Pizza',
//   owner: 'Giovanni Rossi',
// };

// // OR assignment operator
// // rest1.numGuests = rest1.numGuests || 10;
// // rest2.numGuests = rest2.numGuests || 10;

// // The Logical OR assignment operator will assign a value to a variable if that exact value is falsy right now.

// // rest1.numGuests ||= 10; // 20, 10
// // rest2.numGuests ||= 10; // 10

// // Nullish assignment operator (null or undefined)
// // The Nullish assignment operator will assign a value to a variable if that exact variable is currently nullish.
// rest1.numGuests ??= 10; // 0
// rest2.numGuests ??= 10; // 10

// // AND assignment operator
// // The && operator short circuits when the first value is falsy, well, then that is the value that is immediately returned.
// // rest1.owner = rest1.owner && '<ANONYMOUS>';
// // rest2.owner = rest2.owner && '<ANONYMOUS>';

// // What the && assignment operator does is to assign a value to a variable if it's currently truthy.
// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

// Coding Challenge #1
// We're building a football betting app (soccer for my American friends �)!
// Suppose we get data from a web service about a certain game ('game' variable on
// next page). In this challenge we're gonna work with that data.
// Your tasks:
// 1. Create one player array for each team (variables 'players1' and
// 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field
// players. For Bayern Munich (team 1) create one variable ('gk') with the
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
// field players
// 3. Create an array 'allPlayers' containing all players of both teams (22
// players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
// new array ('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called
// 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player
// names (not an array) and prints each of them to the console, along with the
// number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which
// team is more likely to win, without using an if/else statement or the ternary
// operator.
// Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
// Then, call the function again with players from game.scored
// GOOD LUCK �

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// // 1.
// const [players1, players2] = game.players;
// console.log(players1, players2);

// // 2.
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // 3.
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4.
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// // 5.
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// // 6.
// const printGoals = function (...players) {
//   console.log(`${players.length} goals were scored.`);
//   for (let i = 0; i < players.length; i++) {
//     console.log(players[i]);
//   }
// };
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals('Davies', 'Muller');
// printGoals(...game.scored);

// // 7.
// team1 < team2 && console.log('Team 1 is more likely to win.');
// team1 > team2 && console.log('Team 2 is more likely to win.');

// Looping Arrays: The for-of Loop

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);
// for (const [i, el] of menu.entries()) console.log(`${i + 1}: ${el}`);

// // console.log([...menu.entries()]);

// Optional Chaining (?.) Operator

// if (restaurant.openingHours && restaurant.openingHours.mon)
//   console.log(restaurant.openingHours.mon.open);

// // WITH Optional Chaining
// // Only the property that is before '?' exist, then the property after the '.' will be read from there.
// // But if not, immediately undefined will be returned.
// // And exist here means the knowledge concept that we already talked before.
// // So, a property exists if it's not null and it's not undefined.
// // If it's 0 or '', it still exists, of course.
// // And, of course, we can have multiple Optional Chainings (?.).

// // console.log(restaurant.openingHours.mon.open);
// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

// // Example
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open}.`);
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist.');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist.');

// // Arrays
// const users = [
//   {
//     name: 'Jonas',
//     email: 'hello@jonas.io',
//   },
// ];
// // const users = [];
// console.log(users[0]?.name ?? 'User array empty.');

// if (users.length > 0) {
//   console.log(users[0].name);
// } else {
//   console.log('User array empty.');
// }

// Looping Objects: Object Keys, Values and Entries

// // Property NAMES
// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open on ${properties.length} days: `;

// for (const day of Object.keys(openingHours)) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// // Property Values
// const values = Object.values(openingHours);
// console.log(values);

// const entries = Object.entries(openingHours);
// console.log(entries);

// // [key, value]
// for (const [day, { open, close }] of entries) {
//   console.log(`On ${day} we open at ${open} and close at ${close}`);
// }

// Coding Challenge #2
// Let's continue with our football betting app! Keep using the 'game' variable from
// before.
// Your tasks:
// 1. Loop over the game.scored array and print each player name to the console,
// along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already
// studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names �
// 4. Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this
// game, it will look like this:
// {
//  Gnarby: 1,
//  Hummels: 1,
//  Lewandowski: 2
// }
// GOOD LUCK �

// // 1.
// for (const [i, player] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${player}`);
// }

// // 2.
// const odds = Object.values(game.odds);
// let average = 0;
// for (const odd of odds) average += odd;
// average /= odds.length;
// console.log(`Average odd: ${average}`);

// // 3.
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr}: ${odd}`);
// }

// // 4.
// // const scorers = {};
// // for (let i = 0; i < game.scored.length; ++i) {
// //   if (!scorers[game.scored[i]]) scorers[game.scored[i]] = 0;
// //   ++scorers[game.scored[i]];
// // }
// // console.log(scorers);

// // So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

// Sets
// // In the past JavaScript has had very little built-in data structures.
// // So, basically, we had Objects and Arrays. But with ES6 2 more data structures were
// // introduced, and that are Sets and Maps. So, these are pretty common data structures
// // that already exist in other programming languages and now they also exist in JavaScript.

// // And the Set is, basically, just a collection of unique values, so that means that a Set can never have any duplicates and that property makes them usefull in certain situations.

// // We need to pass an iterable to a Set and the most common iterable here is an Array.
// // But, of course they could be different data types here. So, Set can hold mixed data types, that's not a problem at all.

// const orderSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// // Set(3) {"Pasta", "Pizza", "Risotto"}
// // All the duplicates are actually gone.
// // We can also see that a Set kind of looks like an Array.
// console.log(orderSet);

// // So, there are no key-value pairs, it's just a bunch of values, grouped together,
// // in this case - into a Set.

// // Just like Arrays, Sets are iterables. Keep in mind that Strings are also iterables.
// // And, of course, a Set is still very different from an Array.

// // So, first, because his elements are unique, and second - because the order of the elements is irrelevant.
// // Set(5) {'J', 'o', 'n', 'a', 's'}
// console.log(new Set('Jonas'));
// // 3
// console.log(orderSet.size);

// // Comparing again to Arrays, this has() method is similar to the includes() method in Arrays, right?
// console.log(orderSet.has('Pizza')); // true
// console.log(orderSet.has('Bread')); // false

// // We can also add new elements to a Set
// orderSet.add('Garlic Bread');
// orderSet.add('Garlic Bread');
// // Set(4) {"Pasta", "Pizza", "Risotto", "Garlic Bread"}
// // So, "Garlic Bread" was added, but, of course, only one of them,
// // because again, the Set has to be unique. And so, the second one got ignored.
// console.log(orderSet);

// // Finally, we can also delete elements
// orderSet.delete('Risotto');
// // Set(4) {"Pasta", "Pizza", "Garlic Bread"}
// console.log(orderSet);

// // How do we, actually, retrieve values from a Set?
// // Can we, may be, use an index, like in Arrays. => Answer: No!
// // That is because in Sets, actually, there are No indexes.
// // And, in fact, there is No way of getting values out of a Set.
// // There is NO NEED for getting data out of a Set. That's because,
// // if all values are unique, and their order doesn't matter,
// // then, there is no point in retrieving values out of a Set.

// // All we need to know is if certain value IS in the Set or NOT
// // and that's why we have the has() method.

// // If your goal is actually to store values in order and then retrieve them,
// // then the best use case is to just use an Array. You wouldn't use a Set for that.

// // delete all the elements of the Set
// // orderSet.clear();
// // Set(0) {size: 0}
// // console.log(orderSet);

// // Sets are also iterables and therefore, we can loop over them.
// // So, looping is possible, just like in any other iterable.
// for (const order of orderSet) {
//   console.log(order);
// }

// // In a normal code base, the best use case of Sets, is actually,
// // to remove duplicate values of Arrays.

// // Example
// // Let's say that for some reason we are interested in knowing only
// // which different positions there are in our restaurant.
// // In other words, we would like, basically, to have a unique Array
// // without all the duplicates. That will solve the problem.
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = new Set(staff);
// // Set(3) {'Waiter', 'Chef', 'Manager'}
// console.log(staffUnique);

// // But now we actually want this to be an Array. The conversion from a Set to an Array
// // is pretty easy, because they are both iterables. So, remember from earlier,
// // that the Spread Operator works on all iterables, right?
// // So that inclues Sets. The Spread Operator here works just like on an Array.
// const staffUniqueArray = [...new Set(staff)];
// // (3) ['Waiter', 'Chef', 'Manager']
// console.log(staffUniqueArray);

// // If we only needed to know how many different positions there are
// // then the size property is very usefull.
// // 3
// // Then you wouldn't need to create the Array, at all.
// // So, if we didn't need the uniqe Array.
// console.log(
//   new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
// );

// // The same could be done with counting how many letters there are in a String
// // 11
// console.log(new Set('jonasschmedtmann').size);

// // As a conclusion, Sets are not intended to replace Arrays at all.
// // So whenever you need to store values in order and that might contan duplicates -
// // always, just use Arrays.

// // That's also true if you need to manipulate data,
// // because Arrays have acces to a lot of Array methods.

// // Now, Sets have this very usefull property of being unique and it's also very
// // easy to interact with Sets by using their all-straight-forward methods.
// // However, they aren't nearly as important as Arrays.
// // So, keep Sets in mind when you need to work with unique values,
// // but besides that you can just continue using Arrays.

// Maps: Fundamentals

// // Maps are a lot more usefull than Sets.
// // So what exactly is a Map?
// // In JavaScript a Map is a data structure that we can use to map values to keys. So,
// // just like an Object data is stored in key-value pairs in Maps. Now, the big difference // // between Objects and Maps is that in Maps the keys can have any type and this can be
// // huge! So, in an Object the keys are always Strings, but in Maps we can have any type
// // of key. It can even be Objects or Arrays, or other Maps. That can leave to really
// // great and advanced stuff.

// const rest = new Map();
// // Filling up the Map
// // This set() method is pretty similar to the add() method that we have in Sets.
// // So, both allow us to add a new element to the data structure.

// rest.set('name', 'Classico Italiano');

// // Let's say that the resturant has 2 locations
// // And calling the set() method like this
// // doesn't only update the Map that it's called on, but it also returns the Map.
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal'));
// // Now, the fact that the set() method returns the updated Map allows us to chain the
// // set() method like this (calling again set() on the updated Map):
// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :(');

// // Now, in order to read data from a Map
// // we use the get() method. And so, that get() method
// // is available on all the Maps. All we need to do
// // is to pass in the name of the key.

// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(1);

// const time = 8;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// // So, we already have methods to set() and get(),
// // now we can also check if a Map contains a certain key.
// // Actually, Objects also have a method, which is called hasOwnProperty(),
// // but we are going to talk about that in the Object Oriented Programming Section.
// console.log(rest.has('categories'));

// // Then, we can also delete elements from the Map,
// // and again, that happens based on the key.
// rest.delete(2);
// console.log(rest);

// // Now, comparing this to Objects,
// // we can also delete properties from Objects
// // using something called the Delete Operator, but
// // that is a really slow process and usually it's encouraged NOT to do that.

// // Next, Maps also have the size property
// // 7
// console.log(rest.size);

// // delete all elements in a Map
// // rest.clear();
// // Map(0) {size: 0}
// // console.log(rest);

// // as you can see now, there is some overlap in the way that we work with
// // Masp and Sets and that's because they were both introduced in ES6.
// const arr = [1, 2];
// rest.set(arr, 'Test');

// // Great! And with this we proved that we can, indeed,
// // use Objects as Map keys. And this can be very usefull with DOM elements,
// // which, in fact, are also nothing more than just a special type of Object.
// rest.set(document.querySelector('h1'), 'Heading');
// // Sounds crazy, but it's possible and it can enable some advanced functionality.

// console.log(rest);
// // Test
// console.log(rest.get(arr));

// Maps: Iteration

// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'],
// ]);

// // Does this kind of structure, so, this Array of Arrays, seem similar to you?
// // This is exactly the same Array structure that is returned from calling Object.entries();

// // Map(7) {'question' => 'What is the best programming language in the world?', 1 => 'C', 2 => 'Java', 3 => 'JavaScript', 'correct' => 3, …}
// // [[Entries]]
// // 0: {"question" => "What is the best programming language in the world?"}
// // 1: {1 => "C"}
// // 2: {2 => "Java"}
// // 3: {3 => "JavaScript"}
// // 4: {"correct" => 3}
// // 5: {true => "Correct 🎉"}
// // 6: {false => "Try again!"}
// // size: 7
// // [[Prototype]]: Map
// console.log(question);

// // (3) [Array(2), Array(2), Array(2)]
// // 0: Array(2)
// // 0: "thu"
// // 1: {open: 12, close: 22}
// // length: 2
// // [[Prototype]]: Array(0)
// // 1: Array(2)
// // 0: "fri"
// // 1: {open: 11, close: 23}
// // length: 2
// // [[Prototype]]: Array(0)
// // 2: Array(2)
// // 0: "sat"
// // 1: {open: 0, close: 24}
// // length: 2
// // [[Prototype]]: Array(0)
// // length: 3
// // [[Prototype]]: Array(0)
// console.log(Object.entries(openingHours));

// // And so, what this means is that there is an easy way to convert from Objects to Maps
// // Convert Object to Map

// // So again, because this structure that results from Object.entries()
// // is exactly the same as the new Map question that we created,
// // so, an Array of Arrays, we can easily convert from Object to Map.
// // So, keep this small trick in mind, whenever you need a Map
// // when you already have an Object.
// const hoursMap = new Map(Object.entries(openingHours));
// // Map(3) {'thu' => {…}, 'fri' => {…}, 'sat' => {…}}
// // [[Entries]]
// // 0: {"thu" => Object}
// // key: "thu"
// // value: {open: 12, close: 22}
// // 1: {"fri" => Object}
// // key: "fri"
// // value: {open: 11, close: 23}
// // 2: {"sat" => Object}
// // key: "sat"
// // value: {open: 0, close: 24}
// // size: 3
// // [[Prototype]]: Map
// console.log(hoursMap);

// // Iteration is posible on Maps, because, as we already know,
// // Maps are also iterables. And so the for loop is also available for them.

// // Quizz app
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }

// // const answer = Number(prompt('Your answer'));
// const answer = 3;
// console.log(answer);
// console.log(question.get(question.get('correct') === answer));

// // Sometimes we also need to convert a Map back to an Array
// // Convert Map to Array
// console.log([...question]);
// // There are the methods that we had on Arrays, which are .entries(), .keys(), values()
// // that we can use in case we need them.
// // console.log([...question.entries()]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

// // When should I use Maps and when should I use Sets?

// Summary: Which Data Structure to Use?

// Data Structures Overview

// Sources of Data:
//- From the program itself: Data written directly in source code (e.g. status messages)
//- From the UI: Data input from the user or data written in DOM (e.g tasks in todo app)
//- From external sources: Data fetched for example from web API (e.g. recipe objects)
// API => Application Programming Interface

// => Collection of Data => Data Structure =>
// => isSimpleList ? (Arrays || Sets) : (keyValuePairs ? (Objects || Maps) : (Arrays || Sets))

// Other Built-in Data Structures:
//- WeakMap
//- Weak Set

// Non-built-in Data Structures:
//- Stacks
//- Queues
//- Linked lists
//- Trees
//- Hash tables

// Arrays vs. Sets AND Objects vs. Maps

// Arrays vs. Sets
// We should use them for simple lists of values
// when we do not need to describe the values.

// Arrays:
// Use when you need ordered list of values (might contain duplicates)
// Use when you need to manipulate data

// Sets:
// Use when you need to work with unique values
// Use when high-performance is really important
// Use to remove duplicates from arrays

// Objects vs. Maps
// We should use these key-values Data Structures
// whenever we need to describe the values using keys.

// Objects:
// - More “traditional” key/value store (“abused” objects)
// - Easier to write and access values with . and []
// - Use when you need to include functions (methods)
// - Use when working with JSON (can convert to map)

// Maps:
// - Better performance
// - Keys can have any data type
// - Easy to iterate
// - Easy to compute size
// - More “traditional” key/value store (“abused” objects)
// - Easier to write and access values with . and []
// - Use when you simply need to map key to values
// - Use when you need keys that are not strings

// In fact, we still use Objects all the time,
// but Maps is also a very important Data Structure
// right now and waaaay more important than Sets.

// Coding Challenge #3

// Let's continue with our football betting app! This time, we have a map called
// 'gameEvents' (see below) with a log of the events that happened during the
// game. The values are the events themselves, and the keys are the minutes in which
// each event happened (a football game has 90 minutes plus some extra time).
// Your tasks:
// 1. Create an array 'events' of the different game events that happened (no
// duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log.
// 3. Compute and log the following string to the console: "An event happened, on
// average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽ GOAL
// GOOD LUCK

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);

// // 1.
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// // 2.
// gameEvents.delete(64);
// console.log(gameEvents);

// // 3.
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );
// const time = [...gameEvents.keys()].pop();
// console.log(time);
// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes`
// );

// // 4.
// for (const [minute, event] of gameEvents) {
//   const half = minute <= 45 ? 'FIRST' : 'SECOND';
//   console.log(`[${half} HALF] ${minute}: ${event}`);
// }

// Working with Strings - Part 1

// const airLine = 'TAP Air Portugal';
// const plane = 'A320';

// // A
// console.log(plane[0]);
// // 3
// console.log(plane[1]);
// // 2
// console.log(plane[2]);
// // B
// console.log('B737'[0]);
// // 16
// console.log(airLine.length);
// // 10
// console.log(plane.length);

// // Methods
// // So, again, comparing Strings to Arrays here,
// // Strings also have methods and some of them are
// // quite similar to the Array methods.
// // Strings are also 0-based.
// // 6
// console.log(airLine.indexOf('r'));
// // 10
// console.log(airLine.lastIndexOf('r'));
// // Then, we can also search for entire words
// // 8
// console.log(airLine.indexOf('Portugal'));
// // And this one is actually case-sensitive
// // and it gives us -1, because this can now
// // not be found in this airLine String.
// // -1
// console.log(airLine.indexOf('portugal'));

// // One use case of using these index methods is
// // to extract of a String using the slice() method.
// // And the slice() method need indexes as arguments
// // and so, therefore, sometimes it can be very usefull
// // to first figure out the index of a part of a String
// // to, then, extract it.

// // The output is this as we are now passing only the begin parameter
// // from which the extraction will start, basically, till the end of the String.
// // This here is called a 'sub String', because it's just a part of the original String.
// // This does not change the airLine String, just keep that in mind.
// // That's because, it's actually impossible to mutate Strings.
// // They are Primitive values, right?

// // If we wanted to use this String now, we would have to store into some variable
// // or some Data Structure.

// // So these method here and all the others that we a re going to talk about
// // always return a new String. And so, that why then we can then
// // log the result to the console like this.
// // Air Portugal
// console.log(airLine.slice(4));

// // Now, besides the begin parameter, that we already specified,
// // we can also specify and end parameter.
// // It stopes extracting before reaching index number 7.
// // The length of the extracted String is always going to be
// // the end pamater index - the end pamater index.
// // So, in that case 7 - 4 = 3.
// // Air
// console.log(airLine.slice(4, 7));

// // Let's try to extract the first word of a String,
// // starting from the first index untill the first space.
// // TAP
// console.log(airLine.slice(0, airLine.indexOf(' ')));

// // Let's do the opposite, try to extract the last word of a String.
// // Portugal
// console.log(airLine.slice(airLine.lastIndexOf(' ') + 1));

// // We can define even a negative begin argument.
// // It will start extracting from the end.
// console.log(airLine.slice(-2));

// // We can also specify a negative end parameter.
// // We start at position 1, that's why the 'T' is cut off,
// // and the the negative end parameter, basically, cut's off the last 2 characters,
// // 'al' in Portugal.
// // AP Air Portug
// console.log(airLine.slice(1, -1));

// const checkMiddleSeat = function (seat) {
//   // B and E are middle seats
//   const s = seat.slice(-1);
//   if (s === 'B' || s === 'C') console.log('You got the middle seat 😬');
//   else console.log('You got lucky 😎');
// };
// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');

// // Whenever we call a method on a String,
// // JavaScript, automatically befind the scenes,
// // will convert that Primitive to a String Object
// // with the same content. And then, it's on that Object,
// // where the methods are called.

// // And this process is called 'boxing', because, basically,
// // it takes our String and it puts it into a box, which is the Object.

// // This String here looks a little bit more like an Object.
// // It has all of these methods, in [[Prototype]], like slice() that we just used.
// // String {'jonas'}
// // 0: "j"
// // 1: "o"
// // 2: "n"
// // 3: "a"
// // 4: "s"
// // length: 5
// // [[Prototype]]: String
// // [[PrimitiveValue]]: "jonas"
// console.log(new String('jonas'));

// // This conversion here is what JavaScript does whenever
// // we call a method on a String. It converts the String to an String Object.
// // object
// console.log(typeof new String('jonas'));
// // And then, when the operation is done, the Object
// // is converted back to a regular String Primitive.
// // In fact, all String methods return Primitives,
// // even if called on a String Object.
// // string
// console.log(typeof new String('jonas').slice(1));

// Working with Strings - Part 2

// const airLine = 'TAP Air Portugal';

// // tap air portugal
// console.log(airLine.toLowerCase());
// // TAP AIR PORTUGAL
// console.log(airLine.toUpperCase());

// // Fix capitalization in name
// const passenger = 'jOnAS'; // Jonas
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// // Jonas
// console.log(passengerCorrect);

// // Create a function that takes any passenger name,
// // and then, returns the correct one.
// // So, with fixed capitalization.
// const correctPassengerName = function (passengerName) {
//   const passengerLower = passengerName.toLowerCase();
//   const passengerCorrect =
//     passengerLower[0].toUpperCase() + passengerLower.slice(1);
//   console.log(passengerCorrect);
// };
// correctPassengerName('rALitsa');

// // Another real life example
// // Comparing emails
// const email = 'hello@jonas.io';
// const loginEmail = '  Hello@Jonas.Io \n';

// // This here will return a new String.
// // And on Strings we can call String methods.
// // const lowerEmail = loginEmail.toLowerCase();
// // const trimmedEmail = lowerEmail.trim();
// // hello@jonas.io
// // console.log(trimmedEmail);

// // And therehore, right here we can call the trim() method.
// const normalizedEmail = loginEmail.toLowerCase().trim();
// // hello@jonas.io
// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// // And once again, you could do this in a separate function for this behavour,
// // where you can pass in two emails. One, which is the correct one, and one,
// // which is the one to check, and then, you could return eighten true or false from that.
// const emailNormalizer = function (correctEmail, emailToCheck) {
//   return correctEmail === emailToCheck.toLowerCase().trim() ? true : false;
// };
// emailNormalizer(' ralitsa.voronevska@gmail.com', ' \n raliTSa @ gMaIL . coM ');

// // And, btw here, since 2019, there is also trimStart() and trimEnd(),
// // which, as their name say, you can use to trim() whitespace
// // only from the start of the String or only from the end.

// // Replace parts of Strings
// const priceGB = '288,97£';
// // .replace() returns a new String. It doesn't mutate the original one.
// // On that String we will immediately call the next .replace() method.
// const priceUS = priceGB.replace('£', '$').replace(',', '.');
// // 288.97$
// console.log(priceUS);

// // But, indeed, we can also replace whole words, not just single characters
// const announcement =
//   'All passengers come to boarding door 23. Boarding door 23!';
// // All passengers come to boarding gate 23. Boarding door 23!
// console.log(announcement.replace('door', 'gate'));
// // All passengers come to boarding gate 23. Boarding gate 23!
// console.log(announcement.replaceAll('door', 'gate'));

// // Another solution will be to use something called a Regular Expression.
// // Regular Expressions are one of the most complex and confusing topics
// // in programming, but we will still take a look at them at some point.
// // We are going to use a very simple Regular Expression to tell the replace()
// // method to target all the occurences of 'door' here and not just the firts one.

// // To create a Regular Expression we need to write the String between //-es,
// // so not netween ''-s. In this case, all we want to do with that Regular Expression
// // is to add this 'g' flag after the closing /. This stands for global.

// // All passengers come to boarding gate 23. Boarding gate 23!
// console.log(announcement.replaceAll(/door/g, 'gate'));

// // There are 3 simple methods that return Booleans
// // and these methods are: includes(), startsWith() and endsWith().
// const plane = 'Airbus A320neo';
// // And we simply use includes(), just like on Arrays.
// // true
// console.log(plane.includes('A320'));
// // false
// console.log(plane.includes('Boeing'));
// // true
// console.log(plane.startsWith('Airb'));

// if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
//   console.log('Part of the NEW Airbus family');
// }

// // Practice Excercise
// // Here we want to check if the baggage of a certain passenger is,
// // basically, allowed to be checked in. So, to be allowed on a plane.
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();
//   if (baggage.includes('knife') || baggage.includes('gun'))
//     console.log('You are NOT allowed on board!');
//   else console.log('Welcome aboard!');
// };
// checkBaggage('I have a laptop, some Food and a pocket Knife.');
// checkBaggage('Some socka and a camera.');
// checkBaggage('Got some snacks and a gun for protection.');

// Working with Strings - Part 3

// split() and join()

// // One of the most powerfull String methods,
// // which is split(). So, split() allows us
// // to split a String into multiple parts,
// // based on a divider String and it will then
// // store the results into elements of a new Array.
// // (4) ['a', 'very', 'nice', 'string']
// // 0: "a"
// // 1: "very"
// // 2: "nice"
// // 3: "string"
// // length: 4
// // [[Prototype]]: Array(0)
// console.log('a+very+nice+string'.split('+'));

// // (2) ['Jonas', 'Schmedtmann']
// // 0: "Jonas"
// // 1: "Schmedtmann"
// // length: 2
// // [[Prototype]]: Array(0)
// console.log('Jonas Schmedtmann'.split(' '));

// // Indeed, we can now use the power of destructuring
// // to create variables directly like this:
// const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

// // The .join() method, which is, essentially,
// // the opposite of split(). And again, we can
// // specify a divider String.
// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);

// // This combination of split() and join() is really powerfull
// // and, actually, we will use this all the time.

// const capitalizeName = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];
//   for (const n of names) {
//     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(' '));
// };
// capitalizeName('jessica ann smith davis');
// capitalizeName('jonas schmedtmann');
// capitalizeName('ralitsa voronevska');

// // Padding a String
// // Means to add a number of characters to the String
// // untill the String has a certain desired length.
// const message = 'Go to gate 23!';
// // The first argument here is the length that we want for the String,
// // and the, the second argument is the character that we want to pad the String with.
// console.log(message.padStart(20, '+').padEnd(30, '+'));
// console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

// const maskCreditCard = function (number) {
//   // to convert a Numer to a string
//   // const str = String();

//   const str = number + '';
//   // This gives us the same result and it works,
//   // because when one of the operands of the '+'
//   // is a String, it will convert all the operands
//   // to a String.
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// };
// console.log(maskCreditCard(67437836));
// console.log(maskCreditCard(74390120921799792213));
// console.log(maskCreditCard('3234328709534908642378432'));

// // Repeat method
// const message2 = 'Bad weather... All Departures Delayed...';
// console.log(message2.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
// };

// planesInLine(5);
// planesInLine(3);
// planesInLine(12);

// Coding Challenge #4

// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.
// Test data (pasted to textarea, including spaces):
// underscore_case;
// first_name;
// Some_Variable;
// calculate_AGE;
// delayed_departure;
// Should produce this output (5 separate console.log outputs):
// underscoreCase ✅
// firstName ✅✅
// someVariable ✅✅✅
// calculateAge ✅✅✅✅
// delayedDeparture ✅✅✅✅✅
// Hints:
// § Remember which character defines a new line in the textarea �
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable
// name conversion working �
// § This challenge is difficult on purpose, so start watching the solution in case
// you're stuck. Then pause and continue!
// Afterwards, test with your own test data!
// GOOD LUCK �

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   console.log(text);
//   const rows = text.split('\n');
//   for (const [i, row] of rows.entries()) {
//     const [first, second] = row.toLowerCase().trim().split('_');
//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(`${output.padEnd(20, ' ')}${'✅'.repeat(i + 1)}`);
//   }
// });

// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// const getCode = str => str.slice(0, 3).toUpperCase();

// for (const flight of flights.split('+')) {
//   const [type, from, to, time] = flight.split(';');
//   // replaceAll() is ES2020 method
//   console.log(
//     `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
//       '_',
//       ' '
//     )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
//       ':',
//       'h'
//     )})`.padStart(36)
//   );
// }
