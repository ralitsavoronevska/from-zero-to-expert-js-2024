// An Overview fo Modules in JS
// Modules are a super important part of Software Development.
// So, essentially a Module is a reusable piece of code that encapsulates implementation details
// of a certain part of our Project. Now, that sounds a bit like a function or even a Class,
// but the difference is that a module is usually a standalone file. Now, that's not always the case
// but normally when we think of a Module, we think of a separate file. So, of course, a Module,
// always contains some code, but it can also have imports and exports.

// So, with exports, as the name says, we can export values out of a Module.
// For example, simple values or entire Functions. And whenever we export from a Module
// is called Public API. So, this is just like Classes, where we can also expose a Public API
// for other codes to consume.

// Now, in the case of Modules, this Public API is actually consumed by importing values into a Module.
// So, just like we can export values, in Modules we can usually also import values from other Modules.
// And these other Modules from which we import are then called Dependencies of the importing Module,
// because the code that is in the Module that is importing can NOT work without the code that it's
// importing from the External Module, right?

// And this entire logic that I just described is true for all Modules in all Programming Languages.
// So, this is NOT specific to only JS. In fact Modules are a pattern that developers have been using in
// all languages for decades.

// Now, of course, we can write code without Modules, and actually we've been doing that up untill this point.
// But that's because our applications have been very simple. However, when a Codebase grows bigger and bigger,
// there start to be many advantages of using Modules:

// - Compose software: Modules are small building blocks that we can then put together in order to build really complex applications.
// - Isolate components: Modules can be developeed in Isolation without thinking about the entire Codebase.
// - Abstract code: Implement low-level code in Modules and import these abstractions into other Modules.
// - Organized code: Modules naturally lead to a more organized Codebase.
// - Reuse code: Modules allow us to easily reuse the same code, even accross multiple Projects.

// So, this is how Modules work in Software Design in general.
// But now, let's take a look at Moules, specifically in JS.

// So, as of ES6 JS has a Native Built-in Module System.
// Now, we did have Modules before ES6, but we had to implement them ourselves or use external libraries.

// So, ES6 Modules are Modules that are actually stored in files and each file is one Module.
// So, there is exactly one Module per file.

// But now you might be thinking, well, scripts are usually also files, right? And that's, of course, true.
// And so, let's now compare these two types of files in order to understand that there are actually huge differences
// between old school scripts and modern ES6 Modules:

// The first difference is that in Modules all top-level variables are scoped to the Module.
// So, basically variables are Private to the Module by default.
// And the only way an outside Module can access a value that's inside of a Module is by exporting that value.
// But if we don NOT export, then no one from the outside can see the variable.

// Now, in scripts, on the other hand all top-level variables are always Global.
// And this can lead to problems like Global NameSpace Pollution, where multiple scripts try to declare variables
// with the same name and then these variables collide.

// So, Private variables are the solution to this problem.
// And that's why ES6 Modules implemented it like this.

// Next ES Modules are always executed in Strict Mode while scripts, on the other hand, are executed in "Sloppy" Mode by default.
// So, with Modules there is no more need to manually declare Strict Mode.

// Also, the "this" keyword is always undefined at the top level, while in scripts it points to the window Object, right?
// What's really special about Modules is that we can export and import values between them using this ES6 import and export syntax.

// In regular scripts, importing and exporting values is just completely impossible.

// Now, there is something really important to note about imports and exports, which is the fact that they can only happen at the top level.
// So, as you know, outside of any Function or any "if" block. Also, all imports are hoisted. So, no matter where in the code you are importing
// values, it's like the import statement will be moved to the top of the file. So, in practice, importing values is always the first thing that
// happens in a Module.

// Now, in order to link a Module to an HTML file, we need to use the script tag with a "type" attribute set to "module",
// instead of just a plain script tag.

// And finally, about downloading the Module files themselves. This always automatically happens in an Asynchronous way.
// And this is true for a Module loaded from HTML as well as for Modules that are loaded by importing one Module into another
// using the import syntax.

// Now, regular scripts, on the other hand, are downloaded by default in a blocking Synchronous way, unless we use the
// "async" or "differ" attributes on the script tag.

// So, that's a great overview of ES6 Modules, but now let's dig a bit deeper and really understand how Modules
// actually import other Modules behind the scenes.

// Now, as always, when a piece of code is executed, the first step is to parse that code.
// But remember that parsing basically means to just read the code, but without executing it.
// And this is the moment in which imports are hoisted. And, in fact, the whole process of importing Modules
// happens before the code in the main Module is actually executed. What that means is that only after
// all imported Modules have been downloaded and executed the main index.js Module will finally be executed as well.

// Now, this is only possible because of top level imports and exports. That's because if we only export and import values
// outside of any code that needs to be executed, then the engine can know all the imports and exports during the parsing phase.
// So, while the code is still being read before beign executed.

// Now, if we were allowed to import a Module inside of a Function, then that Function would first have to be executed
// before the import code happened. And so, in that case, Modules could NOT be imported in a Synchronous way.
// So, the importing Module would have to be executed first.

// But you might ask: "Why do we actually want Modules to be loaded in a Synchronous way?".
// Isn't synchronous bad? Well, the answer is that this is the easieat way in which we can do things like bundling
// and dead code elimination. So, basically deleting code that is actually NOT even necessary. And, trust me,
// this is very important in large projects with hundreds of Modules and that includes third party Modules from which
// we usually only want a small piece and NOT the entire Module. So, by knowing all Dependencies between
// Modules before execution, bundlers like WebPack and Parcel can then join multiple Modules together
// and eliminate that code. And so, essentially, this is the reason why we can only import and export outside of any code
// that needs to be executed. So, like a Function or an "if" block.

// After the parsing process has figured out which Modules it needs to import, then these Modules are actually downloaded
// from the Server. And, remember, downloading actually happens in an Asynchronous way. It is only the importing operation itself that
// happens Synchronously. Then after a Modules arrives it's also parsed and the Modules exports are linkedto the imports in index.js.
// And this connection is actually a live connection. So, exported values are not copied to imports.
// Instead, the import is basically just a reference to the export at value, like a pointer.
// So, when the value changes in the exporting Module, then the same value also changes in the importing Module.
// And this is quite important to understand, because it's unique for ES6 Modules.

// Other Module Systems do NOT work like this, but JS Modules do. And so, you need to keep this in mind.
// But, anyway, next up, the code in the imported Modules is executed. And with this the process of importing
// is finally finished. And so now, as I already said, it's time for the importing Module to be finally executed as well.
// So, index.js in this example.

// Exporting and Importing in ES6 Modules
// Let's now use Modules and practice, to make sure we really understand how they work,
// and to Import and Export values between them. And let's start with the simplest scenario of all,
// which is to simply Import a Module, but without Importing any value. And so, that is also possible,
// and so let's use that as a starting point here.

// And in Module names it's also a convention to use camelCase names.

// Importing Module
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

// When we want to connect a Module to the HTML file, we actually need to specify the type attribute.
// <script defer src="script.js"></script>
// <script type="module" defer src="script.js"></script>

// Exporting Module
// Importing Module

// As so this means that in fact, this code here is executed before any code in the Importing Module.
// All the Importing statements are basically hoisted to the top and that's why we write them, as they should be, at the top of the file.
// All Modules are executed in Strict Mode by default.

// Now, variables that are declared inside of a Module are actually sculpt to this Module.
// So, basically, inside a Module, the Module itself is like a Top Level Scope.
// And so, by default, this means that all Top Level Variables are Private inside of this Variable.
// So, unlike traditional Scripts, which we would put all of these variables here in the Global Scope,
// but again, NOT in Modules.

// And so, that's why right here we can NOT do this:
// undefiined
// console.log(shippingCost);

// So, the shippingCost and the cart variables are scoped to the current Module, basically,
// and so, we can only use them in shoppingCart.js. Now, if we wanted to use them in script.js Module,
// then we would have to use Exports. And in ES Modules there are 2 types of Exports: Named Exports and Default Exports.

// And Named Exports is actually the simplest way of Exporting something from a Module, because all we have to do is
// to put "export" in front of anything we might want to Export. And so this then creates a Named Export from this Module.
// And so now we can Import this variable here. We just have to write it with the same exact name here too.

// Now, keep in mind that Exports always need to happen in Top Level Code.
// And, of course, we can also eport multiple things from a Module using Named Exports.
// And, actually, that is the main use case of Named Exports. Now, we can also export multiple things
// at the same time, using Named Exports.

// And, actually, we can take this Importing even further, because we can also Import all the Exports of a Module at the same time.

console.log('Importing Module');

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);

// And so, basically, when you think about this, this Module here is now basically exporting a Public API, just like a Class.
// So it's as if this Object here was an Object, created from a Class, which now has these Methods, and also, for example,
// these Properties:
// console.log(ShoppingCart.totalPrice);
// So, that's the other Named Export from this Module.

// And that's how, basically, Named Imports and Exports work.
// So, we saw how we can Export just one value and also how we can Export Multiple Values at once,
// and also, how we can change the name of the Named Exports and also, of the Named Import.
// Then we learned how we can Import everything at the same time, so, all the Named Imports at once.

// And so, now it's time to talk about Default Exports.
// So, usually we use Default Exports to Export one thing per Module, and so, that's the reason why they are called Default.

// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);

import add, { cart } from './shoppingCart.js';

add('pizza', 2);

// And we could even mix all of the them in the same Import Statement.
// So, if we wanted we could have Default and Named Imports all at the same time.

// However, in practice, we usually never mix Named and Default Exports in the same Module.
// So, this is NOT really desirable here.

// So, the preferred style is actually to just use one Default Export per Module, and then Import that here like we did.
// And, in fact, that's the reason why it is easier to Import a Default Export. So, here we do NOT even need to use the curly braces,
// and the designers of this specification did that on purpose.

// Imports are, in fact, a life connection to Exports.

add('bread', 5);
add('apples', 4);

// (3) [{…}, {…}, {…}]
// 0: {product: 'pizza', quantity: 2}
// 1: {product: 'bread', quantity: 5}
// 2: {product: 'apples', quantity: 4}
// length: 3[[Prototype]]: Array(0)
console.log(cart);
// And so, this proves that this Default Import here is, in fact, NOt simply a copy of the value that we Exported
// from the Exporting Module ([]), but a life connection.

// Top Level Await (ES2022)
// Let's now shortly go back to Asynchronous JS, because there has been an important change in ES2022.
// So, starting from this new ES2022 version we can now use the await keyword outside of Async Functions,
// at least in Modules. So, that's why this is here in the Module Section. So again, as I just said, because this is really important,
// we can now basically use the await keyword outside of an Async Function, which we call "Top Level Await".

// Just remember that this only works in modules. If we were gonna try this in a normal script, like we have been using before this section,
// then Top Level Await would still fail, so it would not work at all.

// But here in our HTML file, we can still see that we have our type set to module.
// So this is what is required in order to make Top Level Await actually work.
// <script defer src="script.js"></script>
// <script type="module" defer src="script.js"></script>

// console.log('Start fetching');

// So to show you Top Level Await, let's simply do a simple fetch request.
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

// Now, what's really, really important to understand here is that while this is all great and very useful,
// this actually blocks the execution of the entire module now.

// And as we learned in the previous section, that is sometimes not exactly what we want.
// So let me actually demonstrate that to you by logging something else here afterwards. So just something really.
// console.log('Something');

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// const lastPost = getLastPost();

// Promise {<pending>}
// console.log(lastPost);

// NOT very clean
// lastPost.then(last => console.log(last));

// const lastPost2 = await getLastPost();
// {title: 'at nam consequatur ea labore ea harum', text: 'cupiditate quo est a modi nesciunt soluta\nipsa vol…nam et distinctio eum\naccusamus ratione error aut'}
// console.log(lastPost2);

// And it's in situations like this where Top Level Await actually can get quite useful. All right.
// Now to finish, I just want to show you one more important implication of using Top Level Await.
// And that is the fact that if one module imports a module which has a Top Level Await,
// then the importing module will wait for the imported module to finish the blocking code.
// So that sounds a bit complicated, and it sounds more complicated than it actually is.

// The Module Pattern
// So, now that you know how ES6 Modules work, I just wanna quickly show you the Module Pattern
// that we used to use before in order to implement Modules in JS.

// And I believe that it's important that you understand this Module Pattern, because you will still see it around,
// and it's also a very good Application of many of the stuff that we have been learning throughout the course.
// Now, of course, just like in Regular Modules that we just learned about,
// the main goal of the Module Pattern is to Encapsulate Functionality, to have Private Data, and to expose a Public API.

// So, let's see how the Module Pattern is implemented. So, we start by writing a Function, okay?
// And usually we write an IIFE, actually. So, an Immediately Invoked Function Expression.

// And the reason for that is because this way we don't have to call it separately
// and we can also ensure that it's only called once, right? And so for that, we wrap it like this and create an IIFE.

// So it's very important that this Function is only created once because the goal of this Function
// is NOT to reuse code by running it multiple times, the only purpose of this Function
// is to create a new scope and return data just once.

// const shoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to the cart (shipping cost is ${shippingCost})`
//     );
//   };

//   const orderStock = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// So, right now, of course, all of this data here is private, because it is inside of the Scope of the Function.
// And so now all we have to do is to return some of this stuff in order to basically return a Public API.
// And so to do that, we simply return an Object, which contains the stuff that we want to make public here.

// shoppingCart2.addToCart('apples', 4);
// shoppingCart2.addToCart('pizza', 2);

// And indeed, if we take a look at shopping cart, so shopping cart. Now, of course, now it's NOT available here
// because we are still inside of a Module, and everything that is in a Module is Private to that very Module.
// And so therefore we can now NOT access anything from this Module here, here in the console,
// because this is your basically the Global Scope, but in the Global Scope, we are NOT creating any of this,
// so NOT even shopping carts too, right?

// {cart: Array(2), totalPrice: 237, totalQuantity: 23, addToCart: ƒ}
// addToCart: ƒ (product, quantity)
// cart: (2) [{…}, {…}]
// totalPrice: 237
// totalQuantity: 23
// [[Prototype]]: Object
// console.log(shoppingCart2);

// So again, that's because it is Scoped only to this Module, but let's still take a look edit here in the console,
// so of course this we can do. And so here we see that indeed, we only exported these four things.
// Now, of course our cart now got manipulated, so that one that we defined here in the Function, okay?

// undefined
// console.log(shoppingCart2.shippingCost);
// But of course, on the other hand, the Properties that we basically wanted to make Private,
// they are not accessible. So we can NOT do this, right? So they are undefined.
// All right, and that's actually it. That's the implementation of the module pattern.
// Now, do you understand exactly how and why this works?

// I mean, how do we, for example, have access to the cart variable here
// and even are able to manipulate it, so we see that it was changed, indeed.

// So how are we able to do that, even if this IIFE here, so this Function has already returned long ago, right?

// So this function, of course, was only executed once in the beginning,
// and then all it did was to return this Object and assigned it to this variable, right?

// But then we are able to use all of this and to also manipulate the data that is inside of this Function,
// which is the Function that returned this Object.

// And the answer to how all of this works like this is one more time, Closures.
// So closures, remember, allow a Function to have access to all the variables that were present
// at it's birthplace, basically.

// And for an even deeper explanation of why this works, you can, of course, always go back and revisit
// that lecture about Closures.

// Okay, but in essence, again, this is how the Module Pattern works and it works very well,
// and it has been working for a long time for developers, so long before ES6 Modules even existed in JS.

// Now, the problem is that if we wanted one module per file, like we have with ES6 Modules,
// then we would have to create different scripts and link all of them in the HTML file.

// And that then creates a couple of problems, like we have to be careful with the order
// in which we declare them in HTML, and we would have all of the variables
// living in the Global Scope, and finally, we also couldn't bundle them together
// using a Module Bundler.

// And so as you learned at the beginning of this section, using a Module Bundler is very important in modern JS.

// So the Module Pattern that we just learned about does indeed work quite good, but it has some limitations.
// And so that's exactly the reason why Native mModules were added to the language in ES6.

// CommonJs Modules
// Besides Native ES Modules, and the Module Pattern, there are also other Module Systems,
// that have been used by JS in the past.

// But again, they were NOT Native JS, so they relied on some External Implementations.

// And two examples are:
// - AMD Modules,
// - CommonJS Modules.

// And in fact, CommonJS Modules, are worth taking a look at. And so let's do that now.
// Now CommonJS Modules are important for us, because they have been used in Node.js,
// for almost all of its existence.

// So only very recently, ES Modules have actually been implemented, in Node.js.
// And remember, Node.js is a way of running JS on a web server, outside of a browser.

// Now the big consequence of this, is that almost all the Modules in the NPM repository,
// that we talked about in the beginning of this section, remember?
// So all these modules that we can use in our own code, still use the CommonJS Module system.
// And the reason for that, is that NPM was originally only intended for Node.
// Which as they said, uses CommonJS. Only later NPM became the standard repository,
// for the whole JS world. And so now we are basically stuck, with CommonJS.

// And so therefore, you will see probably, a lot of CommonJS still around.
// And so let's take a quick second to see what it looks like.
// So let's just pretend that we want to export something from this Module.

// And so let's get this Function here again, like this.
// All right? And so, just like ES6 Modules, in CommonJS, one file, is one Module.

// And we export something from a Module, using export.dot, and then the name of the export.
// So let's say, export.dot, and then, whatever we want to export there.

// Now of course, this is NOT going to work in the browser, but it would work in Node.js.
// So this export keyword here, is basically an Object that again, is of course NOT defined here
// in our code, and also NOT in the browser. But in Node.js, it is an Important Object, that is used.

// Export
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product} added to the cart (shipping cost is ${shippingCost})`
//   );
// };

// Import
// const { addToCart } = require('./shoppingCart.js');

// And so this code is NOT for you to write. I just want to show this to you.
// So if we didn't want it to import this, would be pretty similar, to ES Modules actually,
// but then from here, we will call a Require Function. So just like this.

// So again, Require is of course NOT defined, here in our browser environment,
// but it is defined in Node.js, because this is part of the CommonJS specification.

// And that's actually all I had to show you, even though this is, of course,
// just scratching the surface. But all I wanted to do here, is to just let you know,
// that there are different Module Systems, and that CommonJS, is particularly important,
// in the world of JS.

// Now in the long run, ES6 Modules, will hopefully, and probably, replace all of these different Module Systems.
// But it's still gonna be a long way until you're there. And so it's good that at least you know,
// what is, when you stumble upon the syntax in the future, in your work.

// And with this, let's move on, to the rest of the section, where we will learn
// how to use Third Party Packages from npm, how to bundle all Modules together,
// and also how to Transpile or code back to ES5 for old browsers.

// A Brief Introduction to the Command Line
// Now before we can use a tool like parcel, we first need to learn a little bit about the Command Line.
// Yeah, you heard that right. All of these build tools that are available on NPM only work in the Command Line.
// And so, now comes that time where you finally have to learn a little bit about the basics at least of the Command Line.

// So in this short video, all I want to do is to give you the foundation of the Command Line.
// So, stuff like moving around in the file system, creating files and folders, copying files
// and so on and so forth. Because as a web developer, it's really quite important
// that you know at least how to do these basic things using a terminal or a command prompt.

// Now, the first command that I'm going to show you is 'ls' which on Windows is called 'dir', which stands for Directory.

// Then the next command is 'cd' which stands for Change Directory, and with this, we can go up and down the file tree.
// For now, let's just go up, and for that, we use dot dot.

// Then we can also 'clear' the console like this, and so then everything disappears.

// And so now let's actually here create a folder, so that's 'mkdir' and then let's simply call this Test.

// And now here let's just create some files. So for that, I'm using 'touch' on the Mac and on windows, it is 'edit' ('touch edit') like this.

// So let's take a look again at the files we have and we could also add multiple files all at once.
// And this is actually something pretty useful, and that I do all the time when I need to create
// like multiple modules at once. So let's say 'touch jonas.js bankers.js mapt.js'.
// And so now it created these three files all at once.

// So we have all these files now, but we're not really interested in them, and so let's delete them,
// and for that, we can use 'rm' on the Mac and 'del' on Windows. So, 'del script.js jonas.js'. Let's take a look.

// And now we only have these three left and let's say that we actually wanted to move one of them to the parent folder.
// So for that, we can use 'mv', let's say we want mapty.js ('mv mapty.js') and once again, I hit Tab,
// and so we need to specify first the name of the file that should be moved, and then the location into which that file should be moved.
// Example: 'mv mapty.js ../' => Moving the file to the parent folder, one level up.

// So let's delete that as well, and for that, we can use 'rmdir'. So this stands for Remove Directory
// while the opposite of that remember was MKDAR (Make a Directory)
// And so now we just need to specify that test and the directory is not empty.
// So rmdir' only works for empty directories, at least on the Mac.
// On windows, I'm not sure how it works, but apparently on the Mac only for empty directories.

// Introduction to NPM
// All right. So, let's now finally use NPM for the first time. And remember, NPM stands for Node Package Manager,
// and it's both a software on our computer and a package repository.

// And now let's actually install the leaflet library that we used before, but this time using NPM.
// npm install leaflet

// Let me show you how we can install and import one of the most popular JS libraries,
// which is Lodash. Lodash is essentially a collection of a ton of useful Functions for erase,
// objects, Functions, dates, and more. So, it's a lot of like Functions that could
// or should be included in JS, but are not. And so people simply implemented them in Lodash, and so now we can use them.
// npm i lodash-es

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);

// And so this is a good solution for a deep clone that we just got from NPM.
// And that's great, right? So, we just used a piece of open source software to solve
// a problem that we have sometimes in JS. Great, that's just awesome.
// So again, you're now one step closer to working like a real JS developer,
// because this is just what everyone does all the time.

// And so with this, you now have a basic, but I think good understanding of how to work
// with NPM downloading packages and also include them in your code.
// However, importing packages like we did here, for example,
// by specifying this entire path is not practical at all.

// And so in the next video, it's time to finally use Parcel to fix this.

// Bundling with Parcel and NPM Scripts
// So the module bundler that we're gonna use in this course is called Parcel.
// And it's super fast and easy to use, and, even more importantly,
// it works out of the box without any configuration.

// Now you might've heard of Webpack as well, which is probably the most popular bundler and especially in react world.

// However, it's way too complex to use in a course like this. And so let's now learn how to use Parcel.
// So Parcel is basically just another build tool, which is also on NPM. And so we will use NPM to install it.

// npm i parcel --save-dev

// So a devDependency is basically like a tool that we need to build our application.
// But it's not a dependency that we actually include in our code.

// And so that's why it's called a devDependency because we can use it to develop our project.
// And so therefore it appears here in a new field, in our package.json file.

// So let's clear the console here and actually use Parcel. So we do it here in the terminal,
// because Parcel is basically just another command line interface.
// However, we cannot simply run Parcel like this.

// So this is not going to work, because the command is not found.
// And the reason for that is simply that this doesn't work with locally installed packages.
// And Parcel was indeed installed locally.

// So basically only on this project and that's why it showed up in the package.json file
// of this exact project. So there are also global installations, but more about that by the end of this video.

// Now, in order to still be able to use Parcel here in the console, we have two options.
// So we can use something called NPX or we can use NPM scripts.

// So let's start with NPX, which is basically an application built into a NPM.
// So the details don't matter. But what does matter is that we can simply use NPX
// to now run the same command as we did before, but this time it is going to work.

// npx parcel index.html

// And so this is the normal command, and the option that we pass into Parcel
// basically is this entry point. So the entry point is index.html, because that is where we include our script.js.

// So basically the file that we want to bundle up. So in our script.js, we are currently including
// this cloneDeep deep module from Lodash, and also let's actually put back
// this code from the beginning so that we are also importing our shoppingCart module from before.

// And so basically in this example, the goal of using Parcel is to bundle these three modules together.
// So script.js together with shoppingCart.js and together with this cloneDeep.
// And so let's actually try this now.

// So I'm hitting enter here and now it's going to take some time
// and do some magic behind the scenes, but now it is actually done.

// So a Parcel actually then also starts a new development server on this URL.
// So let's click that. And so you'll see it opened a new tab right here.

// So basically besides only bundling, it also does exactly the same job as our live server.
// So remember that we started this development server using the live server package, right?

// And so this one here does exactly the same.
// The difference is that this one is on port 8080, and this one is on port 1234.

// And here we also have local hosts, but that is exactly the same as the writing 127001.
// So this is just the raw IP address and local host is the nicer name.
// All right.

// What Parcel does is that it basically, simply, creates a script.
// And so now we are actually no longer using a module, but we are back to using a regular script.
// And that is important because modules do not work in older browsers.
// So let's comment this one out just so we can also keep it.
// Then I'm deleting this part and then let's give it a save so that Parcel can rebuild this application.
// And great, the error is gone. Okay.

// But now let's actually take a look at what Parcel did here.
// So what it did was to create this dist folder, which stands for distribution,
// because it is essentially gonna be this folder that we will send for production.
// So basically it's the code in this folder that we will send to our final users.
// So you'll see it created a new index.html here and also a bunch of JS files.

// However, I mentioned that there is a second way, which is to use NPM script.
// And so that's the way we actually use it in practice. So NPM scripts are basically another way
// of running a locally installed packages in the command line.
// They also allow us to basically automate repetitive tasks.

// And so therefore we then don't have to write NPX Parcel and all of that, every time that we want to use it.
// So we can simply create a script here, and let me delete this one here,
// let me just delete all of it and create a new one.

// So we need to double quote and then the name of the script and the default is start here,
// and then here comes the script itself. And so the script is going to
// be simply Parcel index.html.

// So again, we can't write this command directly in the command line, but we can write it in the NPM script.

// And so let's now go back to our console and try it out and actually run this command.
// NPM run and then start. And so start is the name of the NPM script that we defined here.
// So let's try that. And here we go.

// So it's doing the same thing as before, but now we have the simple command
// that we can execute whenever we want to start Parcel and whenever we want to start developing, basically.
// All right.

// And so again, that is mainly how we do it in development. Okay.
// And speaking of development, whenever we are done developing our project,
// it is time to build the final bundle.

// So the bundle that is compressed and has dead code elimination and all of that.
// And so for that, we need another Parcel command. And so let's add that as another script here.

// So we need to come up and then this one will be called build.
// And so Parcel, build, and then again, index.html.
// So let's stop this one here actually, and now let's run NPM run build.

// So this might take some more time this time because it's doing a lot more work behind the scenes,
// but let's just wait for it. All right.

// And so now we even get this nice output with the sizes of everything.
// And so let's now take a look at our dist folder, and you see immediately
// that this HTML looks different, right? It is compressed now.

// So the script that we can then ship to the browser and ship to our users is this one.

// So ending in FD3. So this one, all right.
// And again, you see that it looks quite different.
// Everything is compressed into this unreadable mess, but it is, of course, a lot more performance
// than the script that we had before. And so that's why Parcel does this for us.

// And we will, again, come back to all of this in the real world
// once we actually move to our next more real project in which we're going to use all of this.

// Now, just to finish this lecture, I also wanted to mention
// that we can also install packages globally.

// So NPM install Parcel, and then G which stands for global.
// And this is actually the way that we installed the live server package before.
// And so, because of that, we were then simply able to use live server in every directory on our computer.

// So basically the big difference between globally and locally installed packages
// and especially these tools like Parcel or live server, is that we can use the global tools
// directly in the command line without the intermediate step of an NPM script.

// However, most of these tools actually advise developers to always install the tools locally
// so that they can always stay on the latest version. And so usually I follow that approach as well.

// And so I'm not going to install Parcel globally like this. Okay.
// And that's the fundamentals of bundling with Parcel and of using build tools with NPM.

// So I introduced a lot of different concepts here. So to make sure to review this,
// especially this part about the NPM scripts, maybe that might be confusing
// and also take a look at the output files that Parcel gives us.
// So just take some time to review all that we did in this video.

// And if after that, this is all still very confusing to you, then don't worry.
// I'm sure that it will make total sense once we actually use this in our next big project.

if (module.hot) {
  module.hot.accept();
}

// Configuring Babel and Polyfilling
// Now that we activated bundling it's time to configure Babel to transpile our super modern code back to ES5 code.
// And this is still important right now even many years after the new ES6 standard has been introduced.
// And the reason for that is simply that there are still many people out there who are stuck on like a Windows XP
// or Windows 7 computer and two cannot upgrade their old internet explorers, but we want our applications to work for everyone.
// And so we need to keep everyone in mind. Now, the good news is that Parcel actually automatically uses Babel to transpile or code.

// And we can configure Babel a lot if we want to, for example, defining exactly what browsers should be supported,
// but as always, that's a ton of work. And so we don't want that. And instead Parcel makes some very good default decisions for us.
// And so we will simply mainly just go with these defaults. Now just so you get a very broad and very general overview of how Babel works.

// Let's just take a look at their website. So that's Babeljs.io and then here in the documentation, let's take a look here at Plugins.
// Okay. So basically Babel works with Plugins and Presets that can both be configured. Now, a Plugin is basically a specific
// JS feature that we want to transpile. So to convert. So, for example, let's say we only wanted to convert arrow functions back to ES5,
// but leave everything else in ES6, for example, const and var declarations.

// Now usually that doesn't make a lot of sense, because basically we will want to transpile everything at the same time.
// And so usually instead of using Single Plugins for each of these features, Babel actually uses Presets.
// And so a Preset is basically a bunch of Plugins bundled together. And its by default Parcel is going to use this Preset and Preset here.
// And this Preset will automatically select, which JS features should be compiled based on browser support.

// And again that will all happen automatically and out of the box Babel will convert all features
// So only browsers that are barely used anymore with the market share of less than 0.25%
// are not going to be supported by the transpiling with this preset here. So, that's a very brief overview
// and we will come back here in a second, but for now let's start on NPM run start script again
// just so we can take a look again at our final output.

// So everything that we used from ES6 is now gone, but now let me show you something important.
// So let's write some code here, which is basically not part of this preset here, because this preset ENF
// does actually only include final features. So features that are already part of the language
// after passing the four stages of the AGMA process. However, previously we used class fields,
// which at the time of recording are only at stage three. And so let me show you how we could
// transpile a class fields as well. So let's just write a simple example here.

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const ralitsa = new Person('Ralitsa');

console.log('Jonas' ?? null);
console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

// Babel can actually only transpile ES6 Syntax. So data things like Arrow Functions, Classes, const, or the Spread Operator.
// So these are basically things that have an equivalent way of writing them in ES5. So, for example, the Arrow Functions,
// it is simply a different syntax. And so Babel can simply write Function instead of data.
// And the same goes with const. So it's very easy to simply convert that to VAR, but the same is not true for real new features
// that were added to the language like find() and Promise.

// So these new additions to the language, so these new features, they can simply not be transpiled.
// It's simply not possible. Only syntax is easy to convert, so easy to compile. However, all hope is not lost.
// So for these added features again, such as Promises or all the Array Methods like find() and really a bunch of other stuff,
// we can polyfill them.

// Now Babel used to do polyfilling out of the box some time ago, but recently they started to simply
// recommending another library. And so we now have to manually import data as well.

import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// And so if we wanted we could cherry pick basically just the features that we actually want to polyfill.
// Now that of course is a lot of work, but it will also greatly reduce the bundle size.
// And so it might be worth it if that's really a concern.

// Finally, just to finish there is still one feature that is not polyfilled by this one here.
// And so we always need to install just one more package, which is called NPM install regenerator-runtime.

// Polifilling Async Functions
import 'regenerator-runtime/runtime';

// So again, it probably looks a bit confusing that we have to do all of this, but yeah, don't worry.
// It's just a recipe that you have to follow. Okay. And usually you would put these imports here right at the top of your file,
// but in this case, we can just leave them here, because they will be hosted anyway, right?

// Also keep in mind that all of this might change. And so if you're watching this video
// like in two years from now, then things might be different and things might not work the same.
// And so once again make sure that you then install exactly the same versions as I have here
// especially this core-js and regenerator-runtime. And of course, also parcel.
// So just as I told you in the last video. Now okay.

// And with this, we're actually done with this video and also with learning about Modern JS Development.
// So, basically with learning about Tooling, such as Parcel and Babel and also about Modules.

// Now in the remainder of this section, so the next two videos we will just quickly also talk
// about modern JS coding. So, more on the actual programming side of things.
// And so there we will learn or actually more review how to write clean and modern JS code.

// Review: Writting Clean and Modern JS
// So in this section, we have talked about modern JS development practices, such as Tooling and Modules.
// Now since this is the section about how to write modern JS, let's actually finish the section
// by reviewing clean and modern JS coding style, and also take a brief look
// at some functional JS principles, in the next video.

// And this lecture is actually mostly going to be a review lecture.
// So, a lecture where I'm gonna bring together all the clean and modern JS techniques and practices
// that I've been showing you throughout the course.

// And so with this, you will then have all this information in one place.
// Then, in the next lecture, we will actually bring some of these topics to practice
// by fixing a bad coding example that does not follow these practices.
// But anyway, let's now get started.

// Readable Code:
// - Write code so others can understand it
// - Write code so you can understand it in 1 year
// - Avoid too "clever" and overcomplicated solutiions
// - Use descriptive variable names: what they contain
// - Use descriptive Function names: what they do

// General:
// - Use DRY (Do Not Repeat Yourself) principle (refactor your code)
// - Don't pollute global namespace, encapsulate instead
// - Don't use var
// And so by now you already know that you should always use const and only if you want to change any variable, then use let, but never var.
// - Use strong type checks (=== and !===)

// Functions
// - Generally, Functions should do only one thing
// Now many times of course we will want to break that rule, but in general it's good to keep this rule in mind,
// so that you always write like small Functions, which only do one thing, but do it really well. All right?
// - Don't use more than 3 Function parameters
// - Use default parameters whenever possible
// - Generally, return same data type as received
// - Use Arrow Functions when they make code more readable
// And one great use case in my opinion is in the Callback Functions of Array Methods.

// OOP
// - Use ES6 Classes
// - Encapsulate data and don't mutate it from outside the Class
// - Implement Method Chaining
// - Do not use Arrow Functions as Methods (in Regular Objects)
// Because by doing that, you will not get access to the "this" keywords of that Object.
// Remember, and so always avoid Arrow Functions, even if you're not even using the "this" keyword in a Method.
// Because simply by getting into the habit of avoiding Arrow Functions as Methods in this situation,
// you'll then not commit any mistakes ever.

// Avoid Nested Code
// So writing nested code, which basically means writing code inside of blocks
// inside of other blocks is really really bad for readable code.
// And so we should avoid nested code at all costs.
// - Use early return (guard clauses)
// - Use ternary (conditional) or logical operators instead of if
// - Use multiple if instead of if/else-if
// - Avoid for and for of loops, use Arrow Methods instead
// - Avoid Callback-based Asynchoronous APIs

// Asynchronous Code
// - Consume Promises with async/await for best readability
// So for best readability, always consume Promises using async/await and not using the .then() and the .catch() Methods.
// Because these Methods actually require Callback Functions, which will then introduce even more nested code.
// So, these two go kind of together. So, avoiding callback based asynchronous API's,,and instead opting for using Promises
// and then consume these Promises with async/await.
// - Whenever possible, run Promises in parallel (Promise.all())
// - Handle errors and Promise Rejections

// So these are the main best practices for writing modern and clean JS code that I can think of.
// And so let's now put some of these guidelines that I gave you for clean and modern code in practice.

// Declarative and Functional JS Principles
// So, we just reviewed and also implemented some clean and modern JS practices.
// However, there is currently a major trend and shift to something called Declarative Code and Functional Programming in JS.
// And so, let's now take some time to look at what Declarative and Functional Programming actually are.

// So, there are two fundamentally different ways of writing code in Programming, which we also call Paradigms.
// And these two Paradigms, are Imperative Code and Declarative Code.

// Imperative Code
// - Programmer explains "how to do things"
// - We explaint the computer ecevry singl step it has to follow to achieve a result
// Example: Step-by-step recipe of a cake

// const arr = [2, 4, 6, 8];
// const doubled = [];
// for (let i = 0; i < arr.length; i++) {
//   doubled[i] = arr[i] * 2;
// }

// Declarative Code
// - Programmer tells "what to do"
// - We simply describe the way the computer should achieve the result
// - The HOW (step-by-step instructions) gets abstracted away
// Example: Description of a cake

// const arr = [2, 4, 6, 8];
// const doubled = arr.map(n => n * 2);

// And this is pretty important to understand, because more and more this is how modern JS code
// is actually written. So, the difference between Imperative and Declarative is not just some theoretical difference.
// So, the Declarative Paradigm is actually a really big and popular programming paradigm, which has even given rise to a sub paradigm called,
// Functional Programming.

// Functional Programming
// Declarative Programming Paradigm
// Based on the idea of writing software by combining multiple Pure Functions, avoiding side effects and mutating data
// Side Effect: Modification (mutation) of any data outside of the Function (mutating external variables, logging console, writting to DOM, etc.)
// Pure Function: Function without Side Effects. Does NOT depend on external variables. Given the same inputs, always returns the same output.
// Immutability: State (data) is never modified! Instead state is copied and the copy is mutated and returned.

// And finally, if we look again, at our definition here, we also see that Functional Programming is about avoiding mutating data,
// and we do that by using something called Immutability. So, in Functional Programming state, which also means basically data, is never modified.
// So, let's say that we have some application, and we have an Object there to keep track of all the data that we need in an application.

// And so that we usually called state, and so again, in Functional Programming, that state is never modified.
// Instead, what we will do is to copy that Object, so that state, and then it is that copy that is mutated, and can then be returned,
// but the original state is never touched, okay? So, that's what it means for the state being Immutable,
// and the big upside of Immutability is that, it makes it so much easier to keep track
// of how the data flows through our entire application.

// And so, ultimately, that will allow us to write better code with less bugs, and code that is also more readable,
// which overall, is the entire goal of using Functional Programming in the first place.

// Functional Programming Techniques
// - Try to avoid data mutations
// - Use built-in Methods that do NOT produce Side Effects
// - Do data transformations with Methods such as .map(), .filter() and .reduce()
// - Try to avoid Side Effects in Functions: this is of course NOT always possible!

// Declarative Syntax
// - Use Array and Object Destructuring
// - Use the Spread Operator (...)
// - Use the Ternary (Conditional) Operator
// - Use Template Literals
