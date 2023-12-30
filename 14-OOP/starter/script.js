'use strict';

// In modern JS there are 2 major paradigms - OOP and Functional Programming.
// And so, in this Section you will learn everything that you need to know about OOP in JS.

// What is Object-Oriented Programming?
// This Section is about OOP and this lecture is going to be very general high level overview
// of this programming paradigm. So, we are going to talk abaout what OOP is,
// how it works in general and about it's 4 fundamental principles.

// OOP and Functional Programming allows us to achieve the exact same goal of basically avoiding "spagetti code".
// We will talk about Functional programming later in the course and compare it with OOP.

// In OOP we actually need a way to generate, so, to create new Objects from our code.
// And to do that in traditional OOP we use something called "Classes".

// You can think of a Class as a blueprint, which can then be used to create new Objects
// based on the rules described in the Class. So, it's just like an architure where
// the architect develops a blueprint to exactly plan and describe a house.
// But the blueprint really is just an abstract plan. Like a set of rules, but nothing tangible
// that we can actually touch. However, from that blueprint many real houses can then be build
// in the real world. And with Classes it's just the same.

// Conceptual overview: it works a bit differently in JS. Still, important to understand!
// An instance is a real Object that we can use in our code, which was created from a Class.
// The Class itself is NOT an Object.

// To create a new Object from the Class is like to build a real house out of an abstract blueprint.
// And all of those instances, so, those Objects, of course, can have different data in them,
// but they all share the same functionality, which is to log in and to send messages
// (the user and admin example).

// How do we actually design Classes?
// How do we model real-world data into classes?
// Answer: NOT straight forward.
// So, there is NOT a single correct way of designing Classes.

// There are, however, 4 Fundamental Principles of OOP that can guide us towards a good Class implementation.
// These are actually techniques that can also be used outside of OOP,
// but they are especially relevant in this context.
// So, let's now have a more detailed look at each of them:

// 1) Abstraction: Ignoring or hiding details that do NOT matter, allowing us to get an overview perspective
// of the thing we are implementing, instead of messing with details that do NOT really matter to our implementation.
// So, that's Abstraction, which actually blends in with the next principle, which is Encapsulation.

// 2) Encapsulation: Keeping properties and methods private inside the Class, so they are NOT accessible from
// outside the Class. Some methods can be exposed as a public interface (API).

// Interaction between Objects happen through a public interface.
// The "private" keyword from the examples in the slides actually does NOT exist in JS.

// And by having these critical properties nicely encapsulated like this,
// we prevent external code from accidentally manipulating this internal state.
// And btw, the term state simply refers to an Object's data.
// Allowing external code to manipulate internal state directly
// can cause many kinds of bugs, especially in large code basis and developer teams.

// The public interface is essentially all the methods that are NOT private,
// so that are NOT encapsulated. So, making methods private makes it easier for us
// to change our code without breaking code from the outside, which might rely on some
// of these methods. This helps avoiding bugs and also spagetti code. So, there is a real reason
// why encapsulation and private methods and properties exist.

// In summary, we should always have the goal to nicely encapsulate most of our state and methods
// and only leaving essential methods public.

// 3) Inheritance: In OOP when we have 2 Classes that are closely related, like the user and admin example,
// we can have 1 Class inherit from the other. So, we will have 1 parent Class and 1 child Class.
// And the child Class then extends the parent Class. A child Class inherits all the properties
// and methods from it's parent Class. Now, in more formal terms, inheritance makes all properties and methods
// of a certain Class available to a child Class, which, of course, then forms a hierarchy between these 2 Classes.
// And the goal of this is to reuse logic that is common to both of the Classes.

// Now, of course, a child Class can then also have it's own methods and properties. So, at the end of the day
// the child Class ends up with some methods and properties from it's parent and some of it's own.

// 4) Polymorphism: It comes from Greek where it literally means "many shapes".
// In the context of OOP in simple terms, polymorphism means that a child Class can override a method
// that it inherited from a parent Class.

// OOP in JS
// And in this lecture we will learn about OOP specifically in JS.
// So, how it's different from the more traditional OOP and also different ways
// of implementing this paradigm in JS.

// "Classical" OOP: Classes
// The process of creating an Instance is called "Instantiation".
// In JS things work a bit differently. We do have similar concepts in JS.
// It's very useful to first understand the Class Instance Model.
// Plus, many people also just use this terminology in the context of JS.

// And, finally, JS syntax itself uses also some of these terms, for example, Instances.
// And so, you really need to know what a Class is and what an Instance is.

// Now, anyway, how does OOP actually work in JS?
// Well, in JS we have something called "Prototypes" and all Objects in JS are linked
// to a certain Prototype Object. So, we say that each Object has a Prototype.
// So, the Prototype Object contains methods and properties that all the Objects
// that are linked to that Prototype ca access and use.
// And this behaviour is usually called Prototypal Inheritance.
// So, again, Prototypal Inheritance means that all Objects that are linked to a
// certain Prototype Object can use the methods and properties that are defined on that Prototype.
// So, basically Objects inherit methods and properties from the Prototype,
// which is the reason why this mechanism is called Ptototypal Inheritance.

// Just note that this Inheritance is actually different from the Inheritance
// that we've talked about in the last lecture. So, that was one Class inheriting
// from another Class. But in this case is basically an Instance inheriting from a Class.
// So, that's very different and so keep that in mind.

// Now, we can also say that Objects delegate behaviour to the linked Prototype Object.
// And behaviour is just another term for methods here. So, besides Prototypal Inheritance,
// we also call this mechanism, delegation.

// On the other hand, in Classical OOP with Classes, the behaviour, so the methods,
// are actually copied from the Class to the Object and so that is completely different.

// Example: Array.prototype.map()
// const num = [1, 2, 3];
// num.map(v => v * 2)
// Array.prototype is the Prototype of all Array Objects that we create in JS.
// Therefore, all Arrays have access to the .map() method.
// So, in a sense, our Array inherits the .map() method.
// Or, again, we can also say that the Array delegated the behaviour of mapping to it's Prototype.
// The .map() method is actually NOT defined on the num Array itself, but on it's Prototype.

// How do we actually create Prototypes?
// And how do we link Objects to Prototypes?
// How can we create new Objects, without having Classes?

// So, in summary, the question is how do we implement OOP in JS in practice?
// Well, in JS there are actually 3 different ways of doing this:

// 1) The Constructor Function Technique:
//    - A way of creating Objects programmatically from a Function, which will also set the new Object's Prototype;
//    - This is how built-in Objects like Arrays, Maps or Sets are actually implemented;
//    - Also, this is how OOP has been done in JS, basically, since the beginning.

// 2) ES6 Classes:
//    - Modern alternative to Constructor Function Syntax, modern way of doing OOP in JS;
//    - "Syntactic sugar": behind the scenes, ES6 classes work exactly like Constructor Functions;
//    - ES6 Classes do NOT behave like Classes in "Classical OOP" (last lecture)
// However, keep in mind that these are actually NOT the kind of Classes that we talked about
// in the last lecture and in the last slide. They are instaed just so called "synthetic sugar"
// over Constructor Functions. So, this means that ES6 Classes are basically just a layer of
// abstraction over Constructor Functions. So, it's really just a nicer syntax that makes it
// easier for newcomers to do OOP in JS. but Behind the scenes, ES6 Classes are actually
// implemented with Constructor Functions. And so, they also use Prototypal Inheritance
// just like we learnt in the last slide.

// 3) Object.create():
//    - The easiest and the most straight forward way of linkeng an Object to a Prototype Object.
// However, it is NOT as used as the other 2 methods as we will see over the next couple of
// lectures.

// Now, to finish, one important thing to keep in mind is that the 4 Principles of OOP
// that we learnt in the last lecture:
// 1) Abstraction;
// 2) Encapsulation;
// 3) Inheritance;
// 4) Polymorphism;
// are still valid and important with Prototypal Inheritance. And throughout this Section
// we will, of course, learn how to use and implement these 4 Principles of OOP in JS.

// Constructor Functions and the new Operator
// Let's finally implement OOP now. And starting with Constructor Functions.
// So, we can use Contructor Functions to build an Object using a Function.
// Now, a Constructor Function is actually a completely normal Function.
// The only difference between a Regular Function and a Function that we call
// Constructor Function, is that we call a Constructor Function with the "new" Operator.

// In OOP there is this convention that Constructor Functions always start with a capital letter.
// And so we should always follow that convention too. And, in fact, other built-in Constructors
// like Array or Map, follow that convention as well.

// Now, here I am using a Function Expression, but, of course, a Function Declaration will also work.
// Now, an Arrow Function will actually not work as a Function Constructor. And that's because it does NOT have
// it's own 'this' keyword and we need that, ok? So, only Function Declarations and Function Expressions.
// Now, remember that this Function is basically ganna produce an Object and in this case for a Person.

// This 'new' Operator here is actually a very special Operator, because what is does is to call this Function here,
// but it does a whole lot more than just that.

// const Person = function (firstName, birthYear) {
// And since we are talking about Instances here, we can also say
// that these properties here will be the Instance properties.
// And that's because the properties firstName and birthYear
// will be available on all the Instances that are created
// through this Constructor Function.
// this.firstName = firstName;
// this.birthYear = birthYear;

// So, that's for properties, but now what about methods?
// So, what if we wanted to add a method to our Objects?
// Well, just like we added properties, we can,
// of course, also add methods. And so, this will then
// basically become a method, right?
// So, this should work just fine here,
// but this is actually a really bad practice.
// So, you should never do this.
// Never create a method insidde of a Constructor Function.
// That's because, imagine that we are going to create a hundred
// or thousands or even tens of thousands of Person Objects
// using this Constructor Function. Then what would happen is that
// each of these Objects wouls carry around this Function here.
// So, if we had a thousand Objects we would essentially create
// a thousand copies of this Function and so that would be terrible
// for the performance of our code. Again, so NOT do this.
//   this.calcAge = function () {
//     console.log(2037 - this.birthYear);
//   };

// But instaed, to solve this problem, we are going to use Prototypes
// and Prototype Inheritance just like we discusses in the last video.
// };
// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// So, let's see what exactly happens when we call a Function with the new Operator like this.
// So, behind the scenes, there have been 4 steps:
// 1) New {} is created
// 2) Function is called, this = {}
// 3) {} linked to Prototype => It creates this jonas.__proto__ property and it sets it's value
// to the Prototype Property of the Function that is being called.
// 4) Function automatically return {}
// But actually at this point, the Object no longer needs to be empty.
// And this actually is the trick of making the Constructor Function work.

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);
// Now, each of them is it's own new Object that we created programmatically, using a Function Constructor.
// console.log(matilda, jack);

// Now, remember from one of the previous lectures, that in Classical OOP,
// an Object created from a Class is called Instance, right?
// Now, we did NOT technically create a Class here, because, as discussed before,
// JS does NOT really have Classes in the sense of traditional OOP.
// However, we did create an Object from a Constructor Function.
// And actually 3 Objects, right?

// And Constructor Functions have been used since the beginning of JS
// to kind of simulate Classes. And so, therefore, we can still say
// that Jonas here is an instance of person and the same goes for
// Matilda and Jack here. And, in fact, there is even an Operator
// that we can use to test for that:

// true
// console.log(jonas instanceof Person);

// Example of Static Method
// Person.hey = function () {
//   console.log('Hey there! 👋');
// And so, that's essentially, the entire Constructor Function here.
// And the reason for that is because that is exactly the Object that is calling the Method.
// And so, as always, that is basically the rule. So, whatever Object is calling the method,
// will be the 'this' keyword inside of that Function. And so here the 'this' keyword is simply
// that entire Constructor Function.
// ƒ (firstName, birthYear) {
// And since we are talking about Instances here, we can also say
// that these properties here will be the Instance properties.
// And that's because the properties…
//   console.log(this);
// };

// Person.hey();

// But, of course, this one is NOT inherited. So, just like we can NOT call the .from() Method on an Array.
// The same way we can NOT say:
// script.js:260 Uncaught TypeError: jonas.hey is not a function
// "jonas.hey();",
// because it is simply NOT in the Prototype of the Jonas Object.
// So, there is no way that the Jonas Object could inherit it.

// const jay = 'Jay';
// false
// console.log(jay instanceof Person);

// So, this is the basics of Constructor Functions. Just note that
// Function Constructors are NOT really a feature of the JS language.
// Instead, they are simply a pattern that has been developed by other developers.
// And now everyone simply uses this. So, the real magic here is this 'new' Operator.

// Prototypes

// Now it's time to finally start using Prototypes.
// So actually, we talked about Prototypes,
// Prototypal Inheritance and Delegation earlier already.
// But how does that actually work?
// Well, it can be summarized like this. So, first each and every Function in JS
// automatically has a property called Prototype. And that, includes, of course,
// Constructor Functions. Now, every Object that is created by a certain Constructor Function
// will get all the access to all the methods and properties that we define on the
// Constructors Prototype Property (Person.prototype => this is actually an Object).

// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// 46
// jonas.calcAge();
// 20
// matilda.calcAge();
// 62
// jack.calcAge();

// So, that effectively solves this problem that we had before when we added the .calcAge() method
// directly to each of the Object, remember that? Because now, there exists only one copy of this Function.
// So, only one of them exists, but then all of the Objects that are created using this constructor Function
// can basically reuse this Function on themselves. And so, the 'this' keyword, of course, in each of them
// is as always, set to the Object that is calling the method. So, in a nutshell, this is how we implement
// very basic Protopytal Inheritance in JS in practice.

// Each Object has a special property called ".__proto__".
// And so, this is the Prototype of Jonas.
// It's NOT a Prototype Property, but it is simply the Prototype, ok?
// {calcAge: ƒ, constructor: ƒ}
// calcAge: ƒ ()
// constructor: ƒ (firstName, birthYear)
// [[Prototype]]: Object
// console.log(jonas.__proto__);

// So, the Prototype of the Jonas Object is essentially the Prototype Property of the Constructor Function.
// So, again, it sets the .__proto__ property on the Object to the Prototype Property of the Constructor Function.
// true
// console.log(jonas.__proto__ === Person.prototype);

// So, shouldn't Person.prototype be the Prototype of Person?
// Should this Prototype Property here NOT be the Prototype of Person?
// Well, actually NO.
// So, Person.prototype here is actually NOT the Prototype of Person.
// But instead, it's what's gonna be used as the Prototype of all the Objects
// that are created with the Person Constructor Function.
// So, that's a subtle, but important difference that you need to keep in mind.

// true
// console.log(Person.prototype.isPrototypeOf(jonas));
// true
// console.log(Person.prototype.isPrototypeOf(matilda));
// false
// console.log(Person.prototype.isPrototypeOf(Person));
// .prototypeOfLinkedObjects

// We can also set properties on the Prototype. And so, NOT just methods.
// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas, matilda);
// Homo Sapiens Homo Sapiens
// console.log(jonas.species, matilda.species);

// Now, however since we take a look at these Objects, well, as we just saw,
// this property is NOT really directly in the Object, so it's NOT
// it's own property. So, own properties the ones that are declared directly
// on the Object itself. So, NOT including the inherited properties.
// And, actually in JS there is a way of checking for that:
// true
// console.log(jonas.hasOwnProperty('firstName'));

// And, again, that's because this property is NOT really inside of the Jonas Object.
// It simply has access to it, because of it's Prototype. So, because it's in
// the Prototype Property of Person.
// false
// console.log(jonas.hasOwnProperty('species'));

// Prototypal Inheritance and Prototype Chain

// Now, this Constructor Function has a Prototype Property (Person.prototype), which is an Object
// and inside that Object, we defined the .calcAge() method and Person.prototype itself
// actually also has a reference back to Person, which is the Constructor Property (Person.prototype.constructor).

//  Now, remember, Person.prototype is actually NOT the Prototype of Person,
// but of all the Objects that are created through the Person Function.

// So, when we call a Function, any Function with the 'new' Operator:
// 1) New {} is created, instantly;
// 2) Function is called, this = {}
// 3) The new Object is linked (.__proto__ property) to the Constructor Function's Prototype Property (Person.prototype).
// So, Person.prototype is now the new Object's Prototype, which is denoted in .__proto__ property of Jonas.
// So, again .__proto__ property always points to an Object's Prototype and that is true for all Objects in JS.
// 4) And finally, the new Object is automatically returned from the Function unless we explicitly return something else.
// But in a Constructor Function like Person, we usually never do that.

// Okay, and with this the result of the 'new' Operator and the Person Constructor Function is a new Object
// that we just created programmatically and it is now stored in the Jonas variable.

// And this whole process that I just explained is how it works with Function Constructors and also with ES6 Classes,
// but NOT with the Object.create() syntax that we are going to use later.

// But, anyway, why does this work this way and why is this technique so powerful and useful?
// jonas.calcAge();
// If a property or a method can NOT be found in a certain Object, JS will look into it's Prototype
// and there it is. And so, JS will simply use this one. And the behaviour that we just described
// is what we already called Prototypal Inheritance or Delegation.
// So, the Jonas Object inherited the .calcAge() Function from it's Prototype or,
// in other words, it Delegated the .calcAge() functionality to it's Prototype.

// Now, the beauty of this is that we can create as many Person Objects as we like.
// And all of them will inherit this method. So, we can call this .calcAge() method
// on all the Person Objects without the method being directly attached to all the Objects themselves.
// And this is essential to code performance.

// Now, the fact that Jonas is connected to a Prototype and the ability of looking up methods and properties
// in a Prototype is what we call the Prototype Chain. So, the Jonas Object and the Prototype basically form
// a Prototype Chain, but actually the Prototype Chain does NOt end here.

// Now, let's remember that Person.prototype itself is also an Object. And all Objects in JS have Prototype, right?
// Therefore, Person.prototype itself must also have a Prototype. And the Prototype of Person.prototype
// is Object.Prototype. Why is that? Well, Person.prototype is just a simple Object, which means that is has been built
// by the built-in Object Constructor Function and this is actually the Function that is called behind the scenes
// whenever we create an Object literal. So, just an Object, simply with curly braces. So, essentially the
// curly braces are just like a shortcut to writing new Objects, okay? It's the same logic as with the Jonas Object.
// So, since Jonas has been built by Person, Person.prototype is the Prototype of Jonas, all right?
// Now, these entire series of links between the Objects is what is called the Prototype Chain.
// And Object.prototype is usually the top of the Prototype Chain, which means that it's Prototype is null.
// So, it's .__proto__ property will simply point to null, which then marks the end of the Prototype Chain.
// So, in a certain way, the Prototype Chain is very similar to the Scope Chain, but with Prototypes.
// So, in the Scope Chain whenever JS can NOT find a certain variable in a certain scope,
// it looks up to the next scope in the Scope Chain and tries to find the variable there.
// On the other hand, in the Prototype Chain whenevr JS can NOT find a certain property or method
// in a certain Object, it's gonna look up into the next Prototype in the Prototype Chain and see
// if it can find it there, okay?

// Prototypal Inheritance on Built-in Objects

// Let's now check out Prototypal Inheritance and the Prototype Chain on Built-in Objects
// such as Arrays.
// The Prototype of the Jonas Object
// console.log(jonas.__proto__);
// And it is indeed the Prototype Property of Object (Object.prototype - top of the Prototype Chain)
// console.log(jonas.__proto__.__proto__);
// null
// console.log(jonas.__proto__.__proto__.__proto__);
// Person.prototype itself has a Constructor Property, which as we said, will point back to the Person itself.
// We get the Function itself.
// ƒ (firstName, birthYear) {
// And since we are talking about Instances here, we can also say
// that these properties here will be the Instance properties.
// And that's because the properties…
// console.log(Person.prototype.constructor);
// Now, if we want to inspect that Function here we need to use console.dir():
// ƒ Person(firstName, birthYear)
// length: 2
// name: "Person"
// prototype: {species: 'Homo Sapiens', calcAge: ƒ, constructor: ƒ}
// arguments: (...)
// caller: (...)
// [[FunctionLocation]]: script.js:185
// [[Prototype]]: ƒ ()
// [[Scopes]]: Scopes[2]`
// And so, here indeed we see that the Constructor Property points back at Person.
// console.dir(Person.prototype.constructor);

// Now, to make things a bit more complicated even,
// let's now take a look at the prototype of a Function.
// So, any Function, of course, is also an Object.
// And so, therefore, it also has a Prototype.

// new Array = []
// Just like an Object using this shorthand, basically, is the same as using new Array.
// And so, therefore, whenever we create an Array like this, it is indeed created by
// the Array Constructor. And so that's why all of this works behind the scenes
// const arr = [3, 6, 4, 5, 6, 9, 3];
// const arr = [3, 6, 6, 5, 6, 9, 9];

// [constructor: ƒ, at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, …]
// at: ƒ at()
// concat: ƒ concat()
// constructor: ƒ Array()
// copyWithin: ƒ copyWithin()
// entries: ƒ entries()
// every: ƒ every()
// fill: ƒ fill()
// ...
// console.log(arr.__proto__);
// true
// console.log(arr.__proto__ === Array.prototype);

// So, each Array does, of course, NOT contain all opf these methods,
// but instaed, each array will inherit these methods from it's Prototype.

// But, of course, this is NOT yet the end of the Prototype Chain as we saw in the last video.
// And so, we are back to having Object.prototype. So, this again now has on property
// and then all of these methods here taht are available for Objects.
// And one more time, that is simply because the Prototype itself here is an Object.
// And so, any Object has access to all of these methods.
// console.log(arr.__proto__.__proto__);

// So, one more time, you can see that the Prototypal Inheritance is really a mechanism
// for reusing code. So, all of these built-in methods here have to exist only once
// somewhere in the JS engine and then all the Arrays in our code get access to the Functions
// through the Prototype Chain and Prototypal Inheritance.

// So, we know at this point that any Array inherits all their methods from it's Prototype.
// And therefore, we can use that knowledge to extend the functionality of Arrays even further.

// And then here we can add any new method to this Prototype and all the Arrays will then inherit it.
// So, let's say that we wanted to create a method which returns all unique Elements on an Array.
// So, let's add a method called 'unique':
// Array.prototype.unique = function () {
// And the 'this' keyword is going to be the Array on which this method will be called.
// And so now, we just need to put this into an Array and sprea it like this:
//   return [...new Set(this)];
// };

// (4) [3, 6, 5, 9]
// console.log(arr.unique());

// So, just to recap: we added a new method to the Prototype Property of the Array Constructor.
// And so, therefore, all Arrays will inherit this method. And so, we can then call that method
// on any Array that we want. However, what we just did here, so, extending the Prototype
// of a built-in Object is generally NOT a good idea. I mean, if you are working
// just on a small project on your own, then, I guess, you could do this,
// but really, do NOt get into the habit of doing this for multiple reasons.
// The first reason is that the next version of JS might add a method with the same name
// that we are adding, for example, this 'unique' one here, but it might work in a different way.
// And so, your code will then use that new method, which, remember, works differently.
// And then, that will probably break your code. And the second reason why you should NOT
// do this is, is because when you work on a team of developers,
// then this is really going to be a bad idea. Because if multiple developers
// implement the same method with a different name, then that's just going to create
// so many bugs that it's just NOT worth doing this. So, it's just a nice and fun experiment,
// but in practice, you should probably NOT do it.

// Now, for a little bit of fun, to finish this video, let's take a look at some more
// built-in Objects here in the console.

// And we already know that all the DOM Elements are behind the scenes Objects.
// And so, let's take a look at this Object.
// const h1 = document.querySelector('h1');

// Well, that does NOT really work. So, that just gives us the Object.
// <h1>Object Oriented Programming (OOP) With JavaScript</h1>
// console.log(h1);

// So, let's try with console.dir(). And so, now we get the actual Object.
// The Prototype is an HTMLHeadingElement. And so, that itself will contain
// a lot of different stuff. So, let's scroll all the way down. And so,
// this is now an HTMLElement. And so, behind the scenes these different
// Elements are really different like Constructor Functions.
// So, if we go down here, we should now see Element. And indeed,
// here it is. HTMLElement is a child Element of Element.
// And Element itself was a child of Node, right?
// And so, therefore, the Prototype of Element is going to be Node.
// So, if we scroll all the way down here then you see indeed Node
// and now this one is EventTarget. And so, you see, this is a huge, huge
// Prototype Chain. And only now we are at the end. And so, the end is then Object.
// So, this Prototype Chain has easily six or seven levels. And so, you see,
// it can go really, really deep.
// h1 Object
// console.dir(h1);
// anonymous() Object
// console.dir(x => x + 1);

// The Function itself is also an Object. And so, therefore, it also has a Prototype.
// And in this case, the Prototype will then contain the methods that we have used previously
// on Functions. So, that's .apply(), .bind() and .call(), remember?
// And so, once again, this is the reason why we can actually call methods on Functions.
// It's because they are Objects and Objects have Properties. And in this case, this Function Prototype.

// Coding Challenge #1

// Your tasks:
// 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
// 'speed' property. The 'speed' property is the current speed of the car in
// km/h
// 2. Implement an 'accelerate' method that will increase the car's speed by 10,
// and log the new speed to the console
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log
// the new speed to the console
// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and
// 'brake' multiple times on each of them
// Test data:
// § Data car 1: 'BMW' going at 120 km/h
// § Data car 2: 'Mercedes' going at 95 km/h
// GOOD LUCK �

// // 1.
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);
// console.log(bmw, mercedes);

// // 2.
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is going in ${this.speed} km/h`);
// };
// // 3.
// Car.prototype.break = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going in ${this.speed} km/h`);
// };

// console.log(bmw.speed, mercedes.speed);
// bmw.accelerate();
// bmw.accelerate();
// bmw.break();
// bmw.accelerate();
// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.break();
// mercedes.accelerate();
// console.log(bmw.speed, mercedes.speed);

// May be with this example you can start to see the advantages of OOP in action.
// So, all the advantages we talked about right in the first lecture of the Section,
// and essentially the part where we learned that in OOP, we pack both
// the functionality and the data into Objects. And so, that is exactly what we have here.
// So, each of these Objects, so bmw and mercedes, contains the state of the Car,
// so, the current speed and the make, and it also contains the functionality
// to manipulate it's own data, so, the .accelerate() and .break() methods, in this case,
// are able to manipulate the speed, right? And at the same time, these 2 methods also
// form the Public Interface of this Object, right? So, right now the rest of our code
// can interact with these Objects by calling the .accelerate() and .break() methods.

// ES6 Classes
// So, we learned how to implement Prototypal Inheritance with Constructor Functions
// and then manually setting methods on the Constructor Function's Prototype Property.
// But now, it's time to turn our attention to ES6 Classes, which essentially allow us
// to do the exact same thing, but using a nicer and modedrn syntax.

// Classes in JS are just syntactic sugar over what we've learned in the last few videos.
// So, they still implement Prototypal Inheritance behind the scenes, but with a syntax
// that makes more sense to people coming from other programming languages.
// And so, that basically that was the goal of adding Classes to JS.

// Let's now implement Person using a Class.
// And so, this is actually a Class Declaration, but just like in Functions,
// we also have Class Expressions. And that is because, in fact,
// Classes are just a special type of Functions. So, although we use the 'class' keyword here,
// behind the scenes, Classes are still Functions and, therefore, we have Class Expressions
// and Class Declarations.

// Class Expression
// const PersonClExpr = class {}

// Class Declaration
// This Constructor actually works in a pretty similar way as a Constructor Function,
// so, as we studied previously, but this one is actually a method of this Class.
// And, in fact, it needs to be called 'constructor'. So, that is the rule.
// But just like in Constructor Functions, we pass in arguments basically for the
// properties that we want the Object to have: firstName and the birthYear.
// Now, the act of creating new Object actually also works in the exact same way
// as before. So, using the 'new' Operator. And so, therefore, whenever we create a new Object,
// so, like a new Instance using the 'new' Operator, this Constructor will automatically be called.
// And so, therefore, just like before, the 'this' keyword here inside of the Constructor will also
// be set to the newly created empty Object. And so, just like before, we set the properties of the
// Object like this:
// class PersonClDecl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // Instance Methods - these are methods that will be added to the Prototype Property,
//   // so that all Instances can have access to them. And, therefore the name, Instance Methods.
//   // And the methods we simply add them here and all we have to do is
//   // to write their name. So, just like a regular Function in here:
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }
//   // Now, what's important to understand here is that all of these methods
//   // that we write in the Class, so, outside of the Constructor,
//   // will be on the Prototype of the Object. And not on the Objects themselves.
//   // So, this is really just before, Prototypal Inheritance. And, in fact,
//   // we'll be able to confirm that here. As we inspect this Jessica Object
//   // when we look into it's Prototype, then we will once again see the .calcAge() Function here.

//   // So, here we can can, for example, add a Getter for the age Property.
//   // All right, so you see that the Getter is indeed just like any Regular Method that we set on the Prototype.
//   // So, taht's very simple use case of a Getter, but Getters and Setter s can actually be very useful for
//   // data validation and, as an example, let's try some validation with name
//   get age() {
//     return 2037 - this.birthYear;
//   }
//   // Set a Property that already exists:
//   // We are creating a Setter for a Property Name that already exists.
//   // And os now, what's going to happen is that each time this code is executed,
//   // so, whenever we set the fullName on the 'this' keyword, then actually,
//   // this method here, so, this Setter, is going to be executed.
//   // And so, that name that we pass in as fullname will then become this name.
//   set fullName(name) {
//     console.log(name);
//     // .includes() exists for Arrays and for Strings too.
//     // When we have a Setter, which is trying to set a Property that does already exist,
//     // then here, as a convention, we add an underscore. So, again, this is just a convention,
//     // it's NOT a JS feature. So, it's just a different variable name to avoid that naming conflict.
//     // However, when we  do this, we are actually creating a new variable, so a '_fullName' variable.
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }
//   // Static Method
//   // Here to create a Static Method, all we need to do is to add the 'static' keyword:
//   static hey() {
//     console.log('Hey there! 👋');
//     console.log(this);
//   }
// }

// const jessica = new PersonClDecl('Jessica Davis', 1996);
// // PersonClDeclbirthYear: 1996
// // firstName: "Jessica"
// // [[Prototype]]: Object
// console.log(jessica);
// So, basically, when we create a new Instance here, then it is this Constructor that is
// going to be called and it will return a new Object and then that will be stored here into Jessica.

// 41
// jessica.calcAge();
// 41
// console.log(jessica.age);
// TRUE
// console.log(jessica.__proto__ === PersonClDecl.prototype);

// And so, as you see, PersonClDecl acts just like any other Function Constructor,
// but the only difference is that this looksa little bit nicer. So, with this syntax
// we do NOT have to manually mess with the Prototype Property. All we have to do is
// to write the methods here, so, inside the Class, but outside of the Constructor,
// and then they will be automatically added to the Prototype Property of the
// Class basically. So, they will be added to the Prototype Property of the Person Class,
// which once again is going to be the Prototype of the Objects created by that Class.

// We can take this demonstration even further by also adding a method manually to the Prototype.
// PersonClDecl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

// This proves, one more time, that the Class really just hides the true nature of Prototypal Inheritance in JS.

// Hey Jessica
// jessica.greet();

// Now, to finish I just need to say a couple more thing about Classes that are important to keep
// 1) Classes are NOT hoisted. And so, even if they are Class Declarations.
// So, Function Declarations, remember are hoisted, which means we can use
// them before they are declared in the code. But with Classes that does NOT work.

// MDN Reference
// Hoisting is not a term normatively defined in the ECMAScript specification.
// The spec does define a group of declarations as HoistableDeclaration,
// but this only includes function, function*, async function, and async function* declarations.
// Hoisting is often considered a feature of var declarations as well, although in a different way.

// The four function declarations above are hoisted with type 1 behavior;
// var declaration is hoisted with type 2 behavior;
// let, const, and class declarations (also collectively called lexical declarations) are hoisted with type 3 behavior.

// Some prefer to see let, const, and class as non-hoisting,
// because the temporal dead zone strictly forbids any use of the variable before its declaration.

// 2) Just like Functions Classes are also First-Class Citizens.
// And so, what that means is that we can pass them into Functions and also return them from Functions.
// Tha is because Classes are really just a special kind of Function behind the scenes.

// 3) The body of a Class is always executed in 'strict mode'.
// And so, even if we did NOT activate it for our entire script, all the code that is in the Class
// will be executed in 'strict mode'.

// Should we use Constructor Functions, like we have been doing, or, insted, it's better to use Classes?
// Construction Functions are NOT like old or deprecated syntax. So, it is 100& fine to keep using them.
// So, one more time. This is more a question of personal preference. Now, if you are asking if you should use Classes
// without understanding Prototypal Inheritance, well then the reply is definitely NO.
// Some people say tha Classes are really bad in general and that no one should ever be using them,
// simply because they hide the true nature of JS. But I actually do NOT agree with that,
// and I think it's absolutely okay to use classes in your code as long as you understand everything
// that I showed you previously about the Prototype and Prototypal Inheritance.
// So, you can NOT just skip that part, because you want to become expert in JS, right?

// const walter = new PersonClDecl('Walter White', 1965);

// And this time the 'this' keyword points to the entire Class. So, keep in mind that these Static Methods
// are NOT available on the Instances and sometimes they are still usefull to implement somekind of Helper Function
// about a Class or about a Constructor Function.
// class PersonClDecl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
// Instance Methods - these are methods that will be added to the Prototyp…
// PersonClDecl.hey();

// Setters and Getters

// Let's now talk about a feature that is actually common to all Objects in JS,
// and that's Setters and Getters. So, every Object in JS can have Setter and Getter Properties.
// Ans we call these Special Properties Assessor Properties, while the more normal Properties
// are called Data Properties. So, Getters and Setters are basically Functions that get and set value
// so, just as the name says, but on the outside they still look like Regular Properties.

// And so, let's first take a look at Setters and Getters in a simple Object Literal,
// and for that I am going to use the Bank Account Example from the Bankist Application.
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],
  // And then, to transform this into a Getter we simply prepend the keyword get.
  get latest() {
    // This is actually going to return an Array, so, an Array with the last position
    // and so, we can simply take out using the .pop() method. And we could have used
    // Destructuring as well, but I did NOT want to save this into an external variable first.
    return this.movements.slice(-1).pop();
  },
  // And now, we can do the same also as a Setter:
  set latest(mov) {
    this.movements.push(mov);
  },
};

// And so, now we can use this Getter like this. So, account and then we sy latest,
// but we simply use it as a Property. All right, so, we do NOt call the method,
// but instead, we write it as if it was just a Property.

// so, this can be very useful when we want to read something as a Property,
// but still need to do some calculations before.
// 300
console.log(account.latest);

// Now, it is NOT mandatory to specify a Setter
// when we have a Getter for the same Property, okay, so,
// just a Getter or just a Setter would be enough.
// And so, how do we use the Setter now?
// Array(5)
// 0: 200
// 1: 530
// 2: 120
// 3: 300
// 4: 50
// length: 5
// [[Prototype]]: Array(0)

account.latest = 50;
console.log(account.movements);

// And so, in a nutshell, this is how Getters and Setters work for any Regular Object in JS.
// Now, however, classes do also have Getters and Setters, and they do indeed work in the
// exact same way.

// Now, we do NOT need to use Getters or Setters, and many people actually do NOT, but yeah,
// as I just said, sometimes it's nice to be able to use these features and especially when we need
// like a validation like this by the time we are creating a new Object. So, that's essentially what
// this Setter here does.

// Next up, we are going to take a look at yet another feature of classes, which is Static Methods.

// Static Methods

// In this short video, let's quickly talk about Static Methods.
// Now, a good example to understand what a Static Method actually is,
// is the build-in Array.from() Method.
// The Array.from() converts any Array-like structure to a 'real' Array.
// We get an Array here. But that's NOT really the point. What's the point is that
// this .from() Method here is really a Method that is attached to the Array Constructor.
// So, we could NOT use the .from() Method on an Array.
// So this: [1,2,3].from() is NOT going to work. So, .from() is NOT a Function.
// And so, that is, because this .from() Method here is really attached to the entire Constructor,
// so, the Array Constructor, and NOT to the Prototype Property of the Constructor.
// And so, therefore all the Arrays do NOT inherit this Method. Again, because, it is NOT on their Prototype.
// It's simply attached to the Constructor itself. So, Array.from() here is basically just a simple Function,
// but it's a Function that's attached to the Array Constructor. And the reason for that is simply so that
// developers know that it is related to Arrays. We also say that the .from() Method is in the Array Name Space.
// And we actually used that term before for some methods in the Number and in the Internalization Name Space.
// [h1]
console.log(Array.from(document.querySelectorAll('h1')));

// So, that's the same thing:
Number.parseFloat(12);
// So, this Method is another Static Method and it's Static on the Number Constructor.
// So, it's NOT available on Numbers, but only on this very Constructor. So, these are some good examples
// that we understand what a Static Method means. And we usually use these kind of as helpers that should be related
// to certain Constructor.

// And so, maybe you can imagine that it should be pretty easy to implement Static Methods ourselves.
// And let's do that that for both of our Constructor Function and also for the Class.

// Object.create()

// So, we learned about Constructor Functions and ES6 Classes, but there is actually, a third way of implementing
// Prototypal Inheritance or Delegation, as we can also call it. And that third way is to use a Function called
// Object.create(), which works in a pretty different way than Constructor Functions and Classes.

// Now, with Object.create(), there is still the idea of Prototypal Inheritance.
// However, there are no Prototype Properties involved. And also, no Constructor Function, and no 'new' Operator.
// So, instead, we can use Object.create() to essentially manually set the Prototype of an Object,
// to any other Object that we want. Okay, so, if can set the Prototype to any Object, let's actually create an Object
// that we want to be the Prototype of all the Person Objects. So, essentially, let's recreate the Person Class
// from earlier:
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
//   // So, let's create a new Method here, and this can have any name.
//   // This is going to be a little bit similar to the Constructor, that we have in Classes.
//   // So, you see that this looks a bit like the Constructor Function that we created earlier.
//   // However, this has actually nothing to do with any Constructor Function, because we are
//   // NOT using the 'new' Operator to call this.
//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// And now, all we need to do is to actually create a Person Object with this Object here as the Prototype.
// And for that, we can use Object.create(). And here we pass in the Object that we want to be the Prototype of the new Object.
// And so, this will now return a brand new Object, that is linked to the Prototype that we passed in here.
// So, Steven here is right now an empty Object. And it will be linked to this PersonProto Object,
// which will be it's Prototype.
// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = 'Steven';
// steven.birthYear = 2002;
// // 35
// steven.calcAge();

// And so, you see that we just like before, implemented Prototypal Inheritance,
// but in a completely different way. And now, just to make sure that we are all on the same page here,
// let's make sure that we really understand this big difference.
// true
// console.log(steven.__proto__ === PersonProto);

// const sarah = Object.create(PersonProto);

// So, if we are serious about using Object.create(), we should implement a Function that basically will set Properties
// on this Object, but programmatically.

// We will simply do:
// sarah.init('Sarah', 1979);
// // 58
// sarah.calcAge();

// This is just a manual way of basically initializing the Object.
// And this here could be any name. And, indeed we could have a Method like this
// in any other Object Literal. So, essentially, this is how Object.create() works.
// So, the big takeaway is that Object.create() creates a new Object and the Prototype
// of that Object will be the Object that we passed in. And that is very important to understand
// in the future, when we will implement True Class Inheritance, because for that we are going to
// need Object.create().

// Coding Challenge #2
// Your tasks:
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
// by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)
// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter.
// Test data:
// § Data car 1: 'Ford' going at 120 km/h
// GOOD LUCK �

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going in ${this.speed} km/h`);
  }
  break() {
    this.speed -= 5;
    console.log(`${this.make} is going in ${this.speed} km/h`);
  }
  // So, we basically transformed a Method here into a Property,
  // so that we read like this, by using a Getter.
  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.break();
ford.speedUS = 50;
console.log(ford);

// Inheritance between "Classes": Constructor Functions

// So, over the last couple of lectures, we explored how Prototypal Inheritance works in JS.
// And we did that using a couple of different techniques. So, we used Contructor Functions, ES6 Classes,
// and Object.create(). Now, all of these techniques basically allow Objects to inherit Methods from it's Prototype.
// So, to Delegate their behaviour to their Prototype.

// So, in this lecture, we will inherit between Classes using Constructor Functions,
// and this is going to be a bit of work, but it will allow you to understand exactly
// how we set up the Prototype Chain in order to allow Inheritance between the Prototype Properties
// of 2 different Constructor Functions.

// Then, in the next lecture, we are going to do the same thing using ES6 Classes,
// which as you would expect is a lot easier.

// And finally, of course, we will go back to using Object.create() as well.

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// So, this is just a copy of what we already did.
// And so now let's continue by building a Constructor Function for the Student.

// Now, usually we want a Child Class to have the same functionality as the Parent Class,
// but with some additional functionality. And so, usually we pass in the same arguments,
// but then also some additional ones.
// const Student = function (firstName, birthYear, course) {
//   // this.firstName = firstName;
//   // this.birthYear = birthYear;
//   // Uncaught TypeError: Cannot set properties of undefined (setting 'firstName')
//   // Person.call(firstName, birthYear);
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// And with this the Student.prototype Object is now an Object that inherits from Person.prototype.
// Now, we have to create this connection here before we add any more Methods to the Prototype Object of Student.
// And that's because Object.create() will return an empty Object. And so, at this point, Student.prototype is empty.
// And so then onto that empty Object we can add Methods like the Introduce Method. If we did it the other way around,
// so if we used Object.create() after we created this Method here - then Object.create() will basically overwrite these Methods
// that we already added to the Prototype Object of Student.

// Linking Prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}.`);
// };

// const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
// mike.introduce();

// However, there is one thing that we can and should improve here in our Student Constructor Function.
// So, right now, this part of the code here is basically a simple copy of the Person Function Constructor.
// So, of this one that we want to be the Parent Class, right? And as we know, having duplicate code is never
// a good idea. First, because it violates the "Don't repeat yourself" principle, but second and even worse,
// in this case, is that, imagine that the implementation of Person here changes in the future, then
// that change will not be reflected in the Student. So, instead of having this duplicate code here,
// let's simply call the Person Function.

// The problem here is that we are now actually calling this Person Constructor Function as a
// Regular Function Call. So, we are not using this 'new' Operator to call this Person Function Constructor.
// And so, therefore, this Function Call here is simply a Regular function Call.
// And remember that in a Regular Function Call the this keyword is set to undefined.
// And so, therefore, that's why we get this Error here that we can NOT set firstName on 'undefined'.
// So, instead of simply calling the Person Function here, we need to manually set the this keyword as well.

// So, do you remember how we can call a Function and at the same time set the this keyword inside that Function?
// Well, we can simply use the .call() Method. So, the .call() Method will indeed call this Function,
// but we will be able to specify the this keyword here as the first argument in this Function.

// And so, in this case, we want the 'this' keyword inside the Person Function to simply be the 'this' keyword
// inside the Person.call() Function here, right? Because, as you know, the this keyword is gonna be in teh beginning,
// this empty Object that is being created by the 'new' Operator. And so, it is on that new Object where we want to set
// the firstName and the birthYear Property. So, if we check this now, then it is back to working.
// And so, this is a much better and more robust solution.

// The whole idea of Inheritance is that the Child Classes can share behaviour from their Parent Classes.
// Basically what we want to do is to make Person.prototype the Prototype of Student.prototype.
// Or in other words, we want to set the .__proto__ Property of Student.prototype to Person.prototype.

// We are gonna to have to create this connection manually. And to do this, so, to link these two
// Prototype Objects, we are gonna use Object.create(). Because defining Prototypes manually
// is exactly what Object.create() does.

// And so now, with all of this in place we should be able to do:
// 17
// mike.calcAge();

// And we already know that this worked, because of the Prototype Chain, but let's see exactly how.
// So, when we do mike.calcAge() we are effectively doing a property or a method look up.
// So, that is JS trying to find the requested Property or Method. Now, in this case, as we know,
// the .calcAge() Method is of course NOT directly on the Mike Object. It's also NOT in Mike's
// Prototype. That's where we defined the .introduce() Method, but NOT .calcAge().
// So, just like before, whenever we try to access a Method that's NOT on the Object's Prototype,
// then JS will look up even further in the Prototype Chain and see if it can find a Method,
// so, in the Parent Prototype. And that's exactly what happens here. So, JS will finally
// find the .calcAge() Method in Person.prototype, which is exactly where we defined it.
// And that's the whole reason why we set up the Prototype Chain like this. So that the Mike Object
// can inherit whatever methods are in it's Parent Class, basically.
// So, in summary, we are now able to call a Method that is on a Person's Prototype Property,
// on a Student Object, and it still works. So, that's the power of Inheritance.

// And since we are already here, let's also quickly complete the Prototype Chain.
// So, just like before Object.prototype will sit on top of the Prototype Chain.
// So, of course, we could still call a method like the .hasOwnProperty() Method
// on Mike too. It does NOT matter how far away in the Prototype Chain a Method is.
// And with this we now have the full picture of how Inheritance between Classes
// works with Function Constructors. And, of course, with ES6 Classes, it works
// exactly the same internally. All that changes is the syntax.

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// Remember that ideally this should point back to the Student, right?
// But here it points back apparently to Person.
// ƒ (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// }
// console.log(Student.prototype.constructor);

// true
// console.log(mike instanceof Student);
// true
// console.log(mike instanceof Person);
// true
// console.log(mike instanceof Object);
// And so, again, it's because we linked the Prototypes together.
// So, here we just proved that the Prototype Chain is in fact set up
// the way that we intended it to be.

// ƒ Person(firstName, birthYear)
// Student.prototype.constructor = Student;
// ƒ Student(firstName, birthYear, course)
// console.dir(Student.prototype.constructor);

// And so, you see, that JS now, thinks that the Constructor of Student.prototype is Person here.
// And the reason for that is that we set the Prototype Property of the Student using Object.create().
// And so, this makes it so that the Constructor of Student.prototype is still Person.
// So, we need to fix this, because sometimes it's important to rely on this Constructor Property.
// And so, if we want to rely on that, it should indeed be correct. But, that's easy to fix.

// Coding Challenge #3

// Your tasks:
// 1. Use a constructor function to implement an Electric Car (called 'EV') as a child
// "class" of 'Car'. Besides a make and current speed, the 'EV' also has the
// current battery charge in % ('charge' property)
// 2. Implement a 'chargeBattery' method which takes an argument
// 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implement an 'accelerate' method that will increase the car's speed by 20,
// and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
// km/h, with a charge of 22%'
// 4. Create an electric car object and experiment with calling 'accelerate',
// 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
// you 'accelerate'! Hint: Review the definiton of polymorphism �
// Test data:
// § Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
// GOOD LUCK �

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going in ${this.speed} km/h.`);
};

Car.prototype.break = function () {
  this.speed -= 5;
  console.log(`${this.make} is going in ${this.speed} km/h.`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the Prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%.`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.break();
tesla.accelerate();

// So, when there are 2 Methods or Properties with the same name in the Prototype Chain,
// then the first one that appers in the Chain is the one that is going to be used.
// So, the same is true also for the Scope Chain. And this is the beviour that makes sense.
// So, with this basically a Child Method can override a Method that it inherited from the Parent Class.
// This is exactly the definition of Polymorphism that we've talked about in the beginning of this Section.
// Next of, we will see how we can implement the exact same thing using ES6 Classes.

// Inheritance Bewteen "Classes": ES6 Classes

class PersonClDecl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }
  get age() {
    return 2037 - this.birthYear;
  }
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
  static hey() {
    console.log('Hey there! 👋');
    console.log(this);
  }
}

// So, to implement inheritance between ES6 Classes we only need 2 ingredients: the 'extends' keyword and the 'super' Function.
// So, this 'extends' keyword alone here will link the Prototypes behind the scenes without us having to think about it.
class StudentClDecl extends PersonClDecl {
  constructor(fullName, birthYear, course) {
    // Instead of calling PersonCLDecl.call(this, fullName, birthYear) in the Constructor Function.
    // What we will do instead is to call the Super function.
    // And so this is basically the Constructor Function of the Parent Class.
    // So, the idea is still similar to the Constructor Function, but here it all happens automatically.
    // We don't need to specify the name of the Parent Class again, because that already happens up there where we use the 'extends' keyword.
    // So, here now all we do is to pass in the arguments for the Constructor of the Parent Class.
    // This always needs to happen first!
    // And that's because this call to the Super Function is responsible for creating the 'this' keyword in this subclass.
    super(fullName, birthYear);
    // And so, therefore, without doing this we will NOT be able to access the 'this' keyword to do this:
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}.`);
  }
  // Override the Parent Class's calcAge() Method.
  // That's because this new calcAge() Method here appears first in the Prototype Chain and so, therefore,
  // it is essentially overriding the Method coming from the Parent Class.
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }.`
    );
  }
}

const martha = new StudentClDecl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
console.log(martha);

// Inheritance Between "Classes": Object.create()

// And now, finally, let's look at how we can use Object.create() in order to implement a complex Prototype Chain,
// so, similar to what we implemented before with Classes and Constructor Functions.

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.indroduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const jay = Object.create(StudentProto);

jay.init('Jay', 2010, 'Computer Science');
jay.indroduce();
jay.calcAge();

// Another Class Example

// There are a few more things that we need to learn about Classes.
// And so, let's actually create a new Class now.

// And as an example, we are going to use the Bank Account that we implemented before in the Bankist App.

class Account {
  // 1) Public Fields (Instances)

  // Basically, in our example here the 2 Fields could be the movements and the locale.
  // Because, these are, basically, 2 Properties that are going to be on all Objects that
  // we create with this Class, because we do NOT pass any of the value here as arguments in,
  // so, into the Constructor. This [] and this navigator.language - they will always be set for all Instances.
  // And so, let's now add them as Public Fields, so, they are NOT on the Prototype, they are Instances.
  // Those Public Fields are also referenceable by the 'this' keywords and they are referenceable via the 'this' keyword.
  locale = navigator.language;
  // _movements = [];

  // 2) Private Fields (Instances)

  // with Private Fields we can now make it so that Properties are really, truelly NOT accessible from the outside.
  // So, just like in the last lecture, let's start by now finally making the movements Array Private.
  // And so, this is the syntax that makes a Field Private in this new Class Proposal.

  // Now, the next candidate to make Private is this pin. So, in the last lecture we've protected it,
  // but now, just like the movements, we want to convert it to a truelly Private Field. However, this
  // time the situation is a bit different, because now we are actually setting the pin based on this input value
  // to the Constructor Function. However, we can NOT define a Field in the Constructor. So, the Fields,
  // they really have to be out here, outside of any method. So, what we have to do is to create the Field out here:
  #movements = [];
  // And then, do NOT set it to anything.
  // And so, this is, essentially, just like creating an empty variable.
  // So, in the beginning this will be set to 'undefined', and then in the Constructor we can redefine that value, basically.

  // And, again, the Private Fields will be available on the Instances themselves and NOT on the Prototype.
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // So, this is also something that does NOT make much sense to be accessible from the outside.
    // And, in fact, we could make everything protected here, but I think that like this, we are good to go.
    this.#pin = pin;
    // We can create even more Properties on any Instance and Properties that are NOt based on any input.
    // Protected Property
    // this._movements = [];
    // this.locale = navigator.language;
    // And in fact, we can even execute any code here in this constructor that we want.
    console.log(`Thanks for opening an account, ${owner}.`);
  }

  // 3) Public Methods

  // So, all these Methods now that we have been using here are indeed Public Methods.
  // So, in this case there is NOT a lot to talk about. In fact, we have already written here,
  // so, saying that all of these Methods together are basically the Public Interface of our Class.

  // Public Interface

  // And, of course, we could also create a getter here instead of this Method, but let's just keep it simple.
  // So, its very common to actually have a Method that is called getSomething or setSomething instead of
  // using a real getter or a real setter.
  getMovements() {
    return this.#movements;
  }

  // So, let's now create a Deposit and a Withdrawal Method here:
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdrawal(val) {
    // And so here we can actually call this method, because it's actually going to work basically the same way.
    // As you can see here, we can actually call other Methods inside in a certain Method.
    this.deposit(-val);
    return this;
  }
  // So, basically, these methods here are the Public Interface of our Objects
  // and we also call this API, remember?
  // So, this Method that is only supposted to be internally accessible, by the bank, let's say.
  // Basically, just to check if a loan should be approved. So, essentially, this Method here should NOT be part
  // of the Public API, but all the others should be. So, wright now we are protecting this Method and so,
  // our Public API wright now consists of these other 4 remaining Methods.
  // _approveLoan(val) {
  //   return true;
  // }
  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }

  // 4) Private Methods

  // Private Methods are very useful to hide the implementation details from the outside.
  // And that's why in the pervious lecture we already made this Method protected with this _,
  // _approveLoan().

  // And now, to make a Private Method the syntax is exactly the same as Private Fields.
  // So, just like with the #:
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
  // Now, the big problem is that right now NO browser actually supports this, so, I can just
  // show you how it works in the code, but unfortunately I can NOT show you how it works.

  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1.movements.push(250);
// acc1.movements.push(-140);

// Now, if we wanted to get the movements outside here we could, of course, still do this:
// acc1._movements.push(250);
// acc1._movements.push(-140);
// The data here is still accessible if you use this underscore outside here as well.
// But at least now everyone on your team, and that includes yourself, will know that
// this Property is NOT supposed to be touched outside of the Class.
// So, you can still do it, but at least you will know that this is wrong.

// However, it's not a good idea at all to do this.
// So, instead of interacting with a Property like this,
// it's a lot better to create methods that interact with these Properties.
// And that is especially true for important Properties such as these movements here.
// So, this will for sure avoid bugs in the future as your application grows.

acc1.deposit(250);
acc1.withdrawal(140);
acc1.requestLoan(1000);
// This, of course, doesn't do anything, but in the real world we should NOT be able to access
// this kind of method. So, this is kind of a Internal Method that only the requestLoan() Method
// should be able to use. And so, the reason I am telling you all this is basically just to justify
// that we really need Data Encapsulation and Data Privacy.

// In the next video we will finally start implementing Data Encapsulation and Data Privacy.
acc1._approveLoan(1000);
// acc1.#approveLoan(1000);
console.log(acc1);

// So, of course we can access the Pin from outside of the Account,
// but probably it shouldn't be accessible from outside of the Class.
// But, of course, right now it is accessible. And this is actually a very real
// and very important concern. So, it's NOT just something theoretical that I am telling you here.
// And the same, of course, goes for Methods.
console.log(acc1.pin);

// Encapsulation: Protected Properties and Methods

// Encapsulation: Keeping Properties and Methods private inside the Class, so they are NOT accessible from
// outside the Class. Some Methods can be exposed as a Public Interface (API).

// Interaction between Objects happen through a Public Interface (API).
// The "private" keyword from the examples in the slides actually does NOT exist in JS.

// And by having these critical properties nicely encapsulated like this,
// we prevent external code from accidentally manipulating this internal state.
// And btw, the term state simply refers to an Object's data.
// Allowing external code to manipulate internal state directly
// can cause many kinds of bugs, especially in large code basis and developer teams.

// The Public Interface (API) is essentially all the Methods that are NOT private,
// so that are NOT encapsulated. So, making Methods private makes it easier for us
// to change our code without breaking code from the outside, which might rely on some
// of these Methods. This helps avoiding bugs and also spagetti code. So, there is a real reason
// why Encapsulation and private Methods and Properties exist.

// In summary, we should always have the goal to nicely Encapsulate most of our state and Methods
// and only leaving essential methods public.

// In the last lecture we've implemented a new Class, which showed us the need for Encapsulation and Data Privacy
// So, let's now have a look at this very important principle of OOP.

// Now, there are 2 big reasons why we need Encapsulation and Data Privacy:

// 1) It is to prevent code from outside of a Class to accidently manipulate our data inside the Class.
// And that's exactly what we did by the end of the last lecture here:

// acc1.deposit(250);
// acc1.withdrawal(140);
// acc1.requestLoan(1000);

// So, this is also the reason why we implement a Public Interface (API).
// So, we are NOT supposed to manually mess with this Property and therefore we should Encapsulate it.

// 2) When we expose only a small Interface, so a small API consisting only of a few Public Methods,
// then we can change all the other Internal Methods with more confidence. Because, in this case
// we can be sure that external code does NOT rely on these private Methods.
// And so, therefore our code will NOT break when we do internal changes.

// So, that's what Encapsulation and Data Privacy are and the reasons for it.
// And so, let's now actually implement it.

// However, JS Classes actually do NOT yet support real Data Privacy and Encapsulation.
// Now, there is a proposal to add truely private Class fields and Methods to the language, but it's NOT completely ready yet.
// I will still show it to you in the next lecture, because it's really cool, but even when this feature ships in the browser
// it will take some time untill you can use it with confidence.

// And so, in this lecture we will basically fake Encapsulation by simply using a convention.
// So, the first candidate to protect here is, again, this movements Array that we have been talking about.
// So, our movements are mission-critical-data and so here we will protect thiis data so that no one can accidentally
// manipulate it. And for now all we will do is to add this underscore in front of the property name and that's it.
// Now we need to then go ahead and change it everywhere. Again, this does NOT make a Property truely private, because
// this is just a convention. It's something that developers agreed to use and then everyone does it this way.
// But since it is NOT truely private, we call this "Protected".

// If we still wanted to give access to the movements Array from the outside, then we would have to implement
// a Public Method for that.

// And so now, this will be the correct way to get the movements:
// Array(3)
// 0: 250
// 1: -140
// 2: 1000
// length: 3
// [[Prototype]]: Array(0)
console.log(acc1.getMovements());
// Everyone can still at least access the movements, but they can NOT override them.
// So, they can NOT set the movements. Unless, of course, they use the underscore with the convention, but then
// at least they will know it's wrong to access the Property.

// Next, we could also protect the pin.

// So, this is how we protect fields from unwanted access. Now, as I said,
// of course, developers need to know about this convention and need to follow it.
// Because otherwise everything will still be Public.

// Now, in the next lecture we are actually going to talk about truely Private Fields and Methods.
// And so, with that, we will then fix this problem for good.

// Encapsulation: Private Class Fields and Methods

// Alright, so let's now implement truelly Private Class Fields and Methods.
// So, Private Class Fields and Methods are actually part of a bigger proposal
// for improving and changing JS Classes, which is simply called "Class Fields".
// Now, this "Class Fields" Proposal is actually at stage 3 and so right now is
// actually NOT yet part of the JS language. However, being at stage 3, means that
// is very likely that at some point it will move forward to stage 4 and then it will
// actually become a part of the JS language. And that is probably going to happen some
// point soon in the future. And that's why I decided to already include "Class Fields"
// in this course. And in fact, some parts of this Proposal actually already work in Google Chrome,
// but other parts do NOT. At least NOT at the time of recording this video. Now, for starters,
// why is this Proposal actually called "Class Fields"? Well, in traditional OOP languages,
// like Java and C++, Properties are usually called "Fields". So, what this means is that with
// this new Proposal JS is moving away from the idea that Classes are just syntactic sugar
// over Constructor Functions, because with this new Class Features Classes actually start
// to have abilities that they did NOT previously have with Constructor Functions.
// And many developers consider this to be a big problem, but personally I'm NOT sure if it's
// such a big deal for the average JS Developer. So, as long as you still understand
// how Prototypal Inheritance and Function Constructors work, then I believe that you will be fine.

// But, anyway, no matter if you end up using these new Class Features. Let's now start exploring them.
// So, in this Proposal there are actually 4 different types of Fields and Methods. And actually, they are
// even 8, but in this video I will just focus on these 4:
// 1) Public Fields
// 2) Private Fields
// 3) Public Methods
// 4) Private Methods
// (there is also a Static version of the same 4)

// So, essentially, there is a Public and a Private version of both Fields and Methods.
// And let's now start with Public Fields. We can think of a Field as a Property that will
// be on all Instances. So, that's why we can also call this a Public Instance Field.

// Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class (at script.js:1539:17)
// console.log(acc1.#movements);
// So, basically JS thinks that I am trying to implement this Private Class Field out here and that's the reason
// for this error. But what matters is that in fact we can NOT access this variable outside here.
// And, of course, the movement Property from before does now NO longer exist.
// I believe that right now only Google chrome actually supports these Private Class Fields.
// And so, make sure to also test you code in Google Chrome.

// But anyway, the movements are now truelly Private and NO longer accessible ouside here,
// at least NOT by their Property. We do still have of course the .getMovements() Method here in
// our Public API. And so, this one we can still use to get the movements and that was the whole point
// of creating this Method in the first place in the last lecture.

// And so, one more time we can see that these Class Fields are really just like any other Property.
// That's why later down there in the Constructor we can access it on the 'this' keyword and set it
// to the value that we received. And so, pin is also a Private Field now. And so, when we try to
// access it we will NO longer be able to do that. So, that is truelly Private Class Fields:
//Uncaught SyntaxError: Private field '#pin' must be declared in an enclosing class (at script.js:1566:17)
// console.log(acc1.#pin);

// So, I guess that rigt now Google Chrome simply madde this Method like a Private Class Field and so that's why
// it NO longer appears in the Prototype, but now it's instead on the Instance. So, that's NOT
// really what we want.

// So, we've talked about those 4 features here: Public Fields, Private Fields, Public Methods and Private Methods.
// Now, besides these 4 there also is the Static version of the same 4. And that's why I said in the beginning
// that actually we have 8 new features.

// And actually, we already the Static Public Method before and so that worked by simply adding the 'static' keyword
// in front of it. So, usually we use this for helper Functions. Because these Static Methods will NOT be available
// on all the Instances, but only on the Class itself.

Account.helper();

// Chaining Methods

// Do you remember how we chained Methods one after another?
// For example, .filter(), .map() and .reduce()? So, by chaining these Methods we could
// first .filter() an Array, then .map() the result and finally - .reduce() the result of the .map()
// all in one line of code. And we can actually implement the same ability of Chaining Methods in the Methods
// of our Class. And so, let's go do that now.

// And actually, this is extremely easy to do. So, all we have to do is to return the Object itself at the
// end of a Method that we want to be Chainable.

// So, let's say that we wanted to do this:
acc1
  .deposit(300)
  .deposit(500)
  .withdrawal(35)
  .requestLoan(25000)
  .withdrawal(4000);
// (8) [250, -140, 1000, 300, 500, -35, 25000, -4000]
console.log(acc1.getMovements());

// And so, indeed, all the deposits and withdrawals that we did are now in this movements Array.
// Great! So, with this you have yet another tool in your toolbox now.
// With this one I actually showed you all there is to show about OOP in JS.

// ES6 Classes Summary

// So, as we reach the end of this Section, let's quickly review all the terminology around Classes,
// because there is so much different stuff going on, so, a lot of different features that you can use.

// And, since Classes are probably the way you are going to implement OOP by yourself,
// it's always good to have a nice overview of everything that we can do with them.

// And remember that the 'extends' keyword will also automatically set up the Prototype Chain
// for us. So, we do NOT have to do anything manually.

// Remember that a Public Field is very similar to just a Property that we defined in the Constructor.
// So, it is available on every created Object. So, on every Instance, created by this Class.

// Then, of course, we also have Private Fields, and they are almoost the same as the Publuc Fields,
// but they are NOT accessible outside of the Class. So, therefore, this is perfect for implementing
// Data Privacy and Encapsulation.

// We also have Static Public Fields and so, these are Fields or like Properties that are availeble
// only on the Class itself. So, just like Static Methods, we use the 'static' keyword to make
// any Field Static as well.

// And here this is the Constructor Method and it's automatically called by the 'new' Operator
// whenever we create a new Instance of the Class. So, basically, a new Object.
// And this Constructor Object is basically mandatory in any regular Class, but it might be omitted
// in a child Class if we wanted to have the exact same number and the exact same name of paramerters.

// Then inside of the Constructor there is the Call to the Parent Class, and so, that is the super Class
// and this, of course, is neccessary whenever we are writting a child Class. So, when we are using the
// 'extends' keyword. And remember that this one need to happen before we can access the 'this' keyword
// in the Constructor Function.

// Then here we have an Instance Property and so, just like Public Fields, the Property is also available
// on each created Object. But the difference between this one and the Public Field is that we set these
// Instance Properties based on input Data of the Constructor. So, basically, these Properties are more
// personalized and unique for each Object, while the Fields are usually that is common to all of the Objects.

// For example, here, the university for all of the Students is the 'University of lisbon'.
// And so, that is NOT unique to each Object.

// And here we are rdefining a Private Field. And so, this is what we did with the #pin in the Bank Account example.
// So, this Privaate Field should be unique for each Student and so, we created the Private Field out there,
// without any value. And then, here, we are simply redefining it to the value that is coming into the Constructor.

// In here, as we already know, is a normal Public Method.

// Here, we are referencing a Private Field and also a Private Method. And so, about the Private Methods -
// this is how they look like, but as I mentioned - they might NOT yet work in your browser. So,
// as an alternative you can "fake" Private Methods by using the "_"-convention instead of the "#"-convention.

// Next off, this is what a getter Method looks like. And remember that a getter Method is basically so that we can get
// a value out of an Object by simply writting a Property instead of writting a Method.

// And the same for the setter Method. So, in this case we can simply define the testScore by setting it to some value
// instead of calling a testScore Method. And keep in mind that if you have a Setter for a Property that is already defined
// in the Constructor, then you'll need to create, basically, a new Property with the "_" in front of it. So, again,
// this is a kind of a convention that you should use in this case. And then, in the Getter with the same name you will
// also need to then return that new Property.

// Next, this is how you write a Static Method. And a Static Method is available only on the Class itself.
// So, it can NOT access the Instance Properties nor the Methods, but only the Static ones. So, for example,
// that Static Field, that we defined there in the top, will, of course, be accessible in the Static Method.
// And usually we use these Static Methods as helper Methods for the Class.

// Finally, this is how you then create a new Object using the 'new' Operator. And so this should be nothing new at this
// point for you. Now, here are just a couple of things that we need to remember about Classes and that I actually already mentioned
// before as well. So, keep in mind that Classes are really just syntactic sugar over Constructor Functions.

// Also, Classes are NOT Hoisted, they are Firct-Class Citizens and the Class body is always executed in 'strict mode'.

// And there you have it. This is an overview and also a summary of the entire syntax of Classes in JS.

// Coding Challenge #4
// Your tasks:
// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
// child class of the 'CarCl' class
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
// methods of this class, and also update the 'brake' method in the 'CarCl'
// class. Then experiment with chaining!
// Test data:
// § Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
// GOOD LUCK �

class CarCL {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going in ${this.speed} km/h.`);
  }
  break() {
    this.speed -= 5;
    console.log(`${this.make} is going in ${this.speed} km/h.`);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCL extends CarCL {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%.`
    );
    return this;
  }
}

const rivian = new EVCL('Rivian', 120, 23);
console.log(rivian);
// This only proves that the Field i Private, since it can NOT be access from outsidde the Class.
// Uncaught SyntaxError: Private field '#charge' must be declared in an enclosing class (at script.js:1774:19)
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .break()
  .chargeBattery(50)
  .accelerate();
console.log(rivian);

// And what is also interesting here to see here is that our child Class will also inherit
// the getters and setters from the Parent Class. So, we can also do this:
console.log(rivian.speedUS);
