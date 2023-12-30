'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Now, a second part that I want to fix is getting rid of this old school for-loop that we have here.
// Because now we know a better way of doing this, which is the .forEach() loop.
// So, we have this btnsOpenModal, which is a NodeList. And It's a NodeList, because it's the result of
// .querySelectorAll(). Now, remember that a NodeList is NOt an Array, but still it does have the .forEach() method.
// So, it does NOT have most of the methods that Arrays have, but .forEach() is one of the methods that a NodeList has as well.
// And so, let's use that now.

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// And so now, this is exactly the same as this, but in a lot easier way.

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Implementing Smooth Scrolling
// Let's now start working on the Bankist Website.
// And we are going to start by implementing Smooth Scrolling.

// So, we are going to see two ways of doing this.
// First, a bit more old school, which will allow me to show you a couple of interesting
// stuff and then, finally, I'll show you the more modern way, which only works in super modern browsers.

///////////////////////////////////////
// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // DOMRect {x: 0, y: 605.3333740234375, width: 1690.666748046875, height: 1824.791748046875, top: 605.3333740234375, …}
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  // So, this .getBoundingClientRect() is basically relative to this visible viewport.
  // And, in fact, we can also get the current scroll position:
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewport',
    // These are not counting with the scroll bars.
    // It's just the dimentions of the viewport, that are actually available
    // for the content. And, of course, that excludes any scroll bars.
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // So, that's a Global Function that is available on the Window Object
  // and here the first argument is the left position:
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // However, watch what happens when I click again.
  // So, now it does NOT really work, does it?
  // Well, that's because this top here that we specified is always relative to the viewport,
  // but NOT to the document, so, NOT to the top of the page basically.

  // Now, we can make this even better, because there is a way fo making this animation nice and smooth.
  // And this works by passing in an Object now instead of this one argument.
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // So, to implement "Smooth Scrolling" like this, we need to specify an Object
  // with the left, top and the behavior properties. So, this is kind of the old school way still of doing it.
  // So, manually calculating all of these values here and then saying that we want to scroll to this position.

  // But there is a more modern way and it works like this:
  // We simply take the Element that we want to scroll to
  // and on that call .scrollIntoView() with only behavior: 'smooth'
  // in the Object that we are passing in.
  // So, without any of these weird calculations here, with these weird positions and all of that.
  // It's all unnecessary if we are able to use .scrollIntoView() Function here.
  // And again, this only works in modern browsers, but you only need to support these,
  // then you are 100% fine using ony this method.

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation

// This will return a Node List. And now, we can use the .forEach() method
// in order to attach an Event Handler to each of the Elements that are in the Node List.
//
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Now, as you see, this actually works just fine, but the problem is that is not really efficient.
// So, we are adding here the exact same Callback Function, so, this Event Handler here,
// we are adding it once to each of these 3 Elements. So, the exact same Function is now attached
// to these 3 Elements. And that's kind of unnecessary. Of course, it would be fine for only 3 Elements,
// but what if we had 1.000 or 10.000? If we would attach an Event Handler to 10.000 Elements like this,
// then we would be effectively creating 1000 copies of this same Function here.
// And so, that will then certainly impact the performance and it's really NOT a clean solution and so,
// the better solution, without a doubt, is to use "Events Delegation".

// So, in Event Delegation we use the fact that Events "bubble up" and we do that by putting the Event Listener
// on a common parent of all the Elements that we are interested in. And then, we basically, catch that Event
// in this common parent Element and hadle it there, because we also know where Event actually originated.
// So, we can figure that out by looking at the e.target property.

// Event Delegation
// 1) We add an Event Listener to a common parent Element of the Elements that we are interested in
// In that Event Listener determine what Element originated the Event so that we can then work with that Element
// where the Event was actually created.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // And now, we just need to figure out where the event actually happend
  // console.log(e.target);
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Project: "Bankist" Website

// So, in this section we're going to build yet another project.
// So, let's start by taking a look at it. So, over the last 2 Sections
// we've build an Application for a fictional Bank called "Bankist".
// now, in this Section, we're going to be building the kind of marketing
// website for the same fictional Bank. So, again, that's "Bankist" here.

// So, you see, there are a lot of dynamic effects going on here
// on this page and so I  hope you are really exited about this project,
// because you will learn how to do all of them. And these are for sure some
// of the most important and commonly used effects that you will see on all
// websites and that's why I decided to include this project in the course, so
// that you can learn how to do them yourself.

// How the DOM Really Works

// Let's start this Section by learning how the DOM really works behind the scenes
// and more specifically how the DOM is organized internally. This will make it
// easier to understand everything else that is going to follow in this Section.

// So, first, remember that the DOM is basically the Interface between our JS code
// and the Browser. Or more specifically - HTML Documents that are rendered in
// and by the Browser.

// Now, we have written a ton of JS code in this course so far, but many times completely
// without interacting with the Browser, so, without using the DOM, right?
// But now, we are back to woking with Web Pages, and therefore with the DOM.
// And this time we are going to learn as much as possible for the DOM and how to create
// amazing dynamic effects. So, let's remember what we already know about the DOM.
// Which is that we can use it to make JS interact with the Browser.
// And, again, more specifically, we can create and modify and delete HTML elements,
// set styles, classes and attributes; and listen and respond to events.

// In practice this works, because a DOM Tree is generated from any HTML document,
// which we can then interact with. And a DOM tree is a tree-like structure made of Nodes.
// Now, how does that interaction actually work? Well, the DOM is a very complex
// API (Application Programming Interface) that contains lots of methods and properties to interact with the DOM tree
// (.querySelector(), .addEventListener(), .createElement(), .innerHTM(), .textContent(), .children(), etc.).
// So, it's the Interface that we can use to programatically interact with the DOM.
// In the DOM there are different types of Nodes (DOM Objects). Some Nodes are
// HTML Elements, but others are just text and this is very important to understand,
// because all those DOM methods and properties are organized each to these different
// kinds of Objects.

// What makes all of this work is something called "Inheritance".
// Inheritance of methods and properties.
// Example:
// Any HTMLElement will have access to .addEventListener(), .cloneNode() or closest() methods.

// Inheritance means that all the child types will also have access to the methods and properties
// of all their parent Node types. For example, an HTMLButtonElement will get access from the Element type:
// (.innerHTML(), .classList(), .children(), .parentElement(), .append(), .remove(), .insertAdjacentHTML(),
// .querySelector(), .closest(), .matches(), .scrollIntoView(), .setAttribute()).
// And besides that it will also get access to everything from the Node type, because that is also his parent type:
// (.textContent(), .childNodes(), parentNode(), .cloneNode()).

// The Document Node type. So, the document, which we use all the time in DOM manipulation
// is, in fact, just another type of Node. So, it contains important methods such as:
// .querySelector(), .createElement(), .getElementById().
// And note how .querySelector() is available on both the Document and the Element types.
// So, keep this in mid, because it will be important later on.
// There is just one final missing piece here, because the DOM API actually needs a way of allowing all the
// Node types to listen to events, and remeber, we usually listen for events by calling the .addEventListener() event
// on an Element or the Document.

// So why does that actually work? Well, it's because there is a special Node type called "Event Target":
// (.addEventListener(), .removeEventListener()),
// which is a parent of both the Node type and also the Window Node type
// (Window - Global Object, lots of methods and properties, many unrelated to DOM)

// And so with this, thanks to Inheritance, we can call .addEventListener() on every single type of Node
// in the DOM API. Because all Elements, as well as Document and Window, and even Text and Comment, will
// inherit this method. And, therefore, we will be able to use .addEventListener() on all of them.
// Just as it was their own method.

// Selecting, Creating and Deleting Elements
// In this lecture we are going to learn how to select, create and delete Elements with JS.

// Selecting Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// NodeList(4) [section#section--1.section, section#section--2.section, section#section--3.section, section.section.section--sign-up]
// console.log(allSections);
// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// HTMLCollection(9) [button.btn--text.btn--scroll-to, button.btn.operations__tab.operations__tab--1.operations__tab--active, button.btn.operations__tab.operations__tab--2, button.btn.operations__tab.operations__tab--3, button.slider__btn.slider__btn--left, button.slider__btn.slider__btn--right, button.btn.btn--show-modal, button.btn--close-modal, button.btn]
// console.log(allButtons);

// .getElementsByTagName() method actually returns a HTMLCollection.
// So, that's different from a NodeList. An HTMLCollection is actually
// a so called "Live Collection". And that means that if the DOM changes
// then this collection is also immediatelly updated automatically.
// But the same does NOt happen with a NodeList.

// This one will also return a "Live HTMLCollection".
// console.log(document.getElementsByClassName('btn'));

// Creating and Inserting Elements
// .insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie-message">Got it!</button>';
// being the first child
// header.prepend(message);
// being the last child
// header.append(message);
// This Element here, message, is now indeed "Live Element" living in the DOM and so thefore,
// it cannot be at multiple places at the same time. It's just like a person that also cannot be
// at two places simultaneously. So, what happend here, is that the first used .prepend() at the Element
// and then we .append()-ed it. And what this .append() did here was to basically move the Element
// from being the first child to being the last child. So, basically, it moved the Element and it did NOT really insert it,
// because it was already inserted here by .prepend(). So, what this means is that we can use the .prepend() and .append()
// methods NOT only to insert Elements, but also to move them. And, again, that is because the DOM Element is unique.
// So, it can always only exist at one place at a time.

// But now, what if we actually wanted to insert multiple copies of the same Element?
// Well, in that case we actually would have to first copy the first Element.
// So, now instead of adding the message directly, we first clone it by using .cloneNode()
// and then we need to pass "true", which simply means that all the child Elements will also
// we coppied. And so, now, we have the same cookie message in both places.
// header.append(message.cloneNode(true));

// But usually this is NOT what we want. So, let's actually only append it.
// So, having it here at the bottom where it makes most sense.
// header.append(message);

// To finish, there are actually two more methods.
// As it makes sense, this will insert the header message before the header Element, so, as a sibling.
// header.before(message);
// And this one here - after the hader Element, so, also as a sibling.
// header.after(message);

// So that is how we create and insert Elements programatically.

// Delete Elements
// document
//   .querySelector('.btn--close-cookie-message')
//   .addEventListener('click', function () {
//     // Now, this .remove() method here is actually very recent.
//     // Before this method existed all we could do is to remove child Elements.
//     // And so, back then, we had to select the parent Element first and then
//     // remove the child from there. So, that would look like this:
//     message.parentElement.removeChild(message);
//     // message.remove();
//   });
// And btw, this way of moving up and down in the DOM tree, like
// selecting the parent Element, is called "DOM Traversing" and there is
// a whole lecture about that a bit later in this Section.

// Styles, Attributes, and Classes

// Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// We get basically nothing nad that's because using the style property like this here
// only works for inline styles that we set ourselves, also using the style property.
// console.log(message.style.height);
// So, it's going to work, for example, for the backgroundColor.
// rgb(55, 56, 61)
// And we actually get the backgroundColor, and again, because it is a inline style,
// so a style that we set manually ourselves. But we cannot get style that is hidden inside
// of a class or may it does NOT even exist.
// console.log(message.style.backgroundColor);

// Now, we can get the styles if we really want to.
// All we need to do is to use the .getComputedStyle() Function.
// And so, this is the "Computed Styles", which means that is the real style as it appears here on the page
// and even if we did NOT declare it in our css.
// console.log(getComputedStyle(message).color);
// So, for example, the height - we did NOT define it ourselves:
// The result of this is a String. So, you are trying to add a Number to a String, which, of course,
// is NOT going to work, because, well, it has this 'px' here.
// console.log(getComputedStyle(message).height);
// String
// message.style.height = getComputedStyle(message).height + 40 + 'px';

// But, remember, that we've already learned about a nice Function, which can essentially
// take a Number out of a String. So, basically, parse the Number from here.
// And that is, remember, Number.parseFloat():
// message.style.height =
// Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// So, this getComputedStyle() can become really heandy.
// But now, finally, let's also work with "CSS Custom Properties", which we usually just call "CSS Variables".

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
// Bankist logo
console.log(logo.alt);
// http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter/img/logo.png
// The src is different than what we have in the HTML.
// So, this URL of this image is basically the absolute URL,
// while what I have in the HTML is just a relative URL,
// so, relative to the folder, in which the index.html file is located.
console.log(logo.src);

// If we want to have this relative URL as we have it in the index.html file,
// then we'll also have to use .getAttribute():
// img/logo.png
console.log(logo.getAttribute('src'));

// And the same is actually true for the href attribute on links

// So, this works, because on images they are suppose to have the alt and the src attributes on them.
// And so, if we specify them in HTML, then JS will automatically crerate these properties on the Object.
// But if we add some other property that is not a standard, then JS will NOT automatically create a property on the Object.

// So, if we now try to log in the designer property that is NOT going to work.
// undefined
// That is because this is NOT a standard property that is expected to be on images.
// Non-standard
console.log(logo.designer);

// Just another one that works here, and it's a bit different then you might expect, is className.
// nav__logo
console.log(logo.className);

// Of course, there is another way of reading the designer property from the DOM.
console.log(logo.getAttribute('designer'));

// Now, just as we can read these values for these attributes, we can also set them:
// For example, we can say:
logo.alt = 'Beautiful minimalist logo';

// Oh, btw, there also the opposite of .getAttribute(), which is .setAttribute():
logo.setAttribute('company', 'Bankist');

// const link = document.querySelector('.twitter-link');
const link = document.querySelector('.nav__link--btn');
// https://twitter.com/jonasschmedtman
// http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter/#
// The Absolute URL, once again
console.log(link.href);
// https://twitter.com/jonasschmedtman
// #
// Simply returns the HTML as we wrote it in the HTML.
console.log(link.getAttribute('href'));

// Data Attributes
// Finally, there is also a special type of Attributes and that's Data Attributes.
// And Data Attributes start with the word "data" and then "-" and then whatever we want.
// And what is special about this is that now this Attribute is with:
// 3.0
console.log(logo.dataset.versionNumber);
// And so here we use camelCase where in the HTML attribute we have a "-".
// So, just like property names we need to transform the Attribute to camelCase.

// So, for these special Attributes, they are always stored in the dataset Object.
// So, we use Data Attribues quite a lot when we work with the UI, specially
// when we need to store Data in the User Interface. So, basically, in the HTML code.
// And we will see how useful that can be throughout the rest of this project and of the course.

// Classes
// And keep in mind that you could add multiple classes by passing in multiple values:
// While these formatters here make it really nice to work with the classes by simply allowing us to
// add and remove classes based on their names without interfering with the classes that are already there.
//
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // NOT .includes() like it is called in Arrays

// Just as we could read the className using the .className() property,
// we can also use that to set a class:
logo.className = 'jonas';
// However, DONT use this. Because this will override all the existing classes
// and also it allows us to only put one on any Element.
// So, again, only one class and it will override whateve it is already in there.

// Types of Events and Event Handlers
// In this lecture and the next ones we are going to talk a little bit more about Events.
// Now, we already worked with Events before, of course, but now let's add some important concepts
// and also make things a little bit more clear.

// an Event is basically a signal that is generated by a certain DOM Node.
// And a signal means that something has happend. For example, we click somewhere,
// or the mouse moving, or the user triggering fullscreen mode, and really, anything of importance
// that happens on a web page geberates an Event.

// And, as we already know, we can then listen for these Events in our code using .addEventListener()s
// so that we can then handle them if we'd like.

// Now, we already worked with a couple of different Events earlier in the course,
// but now let's take a look at another type of Events, which is the Mouse Enter Event.

// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('addeventListener: Great! You are reading the heading :D');
//   // h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// Let me now show you another way of attaching an EventListener to an Element.
// And that is by using the so called "On-Event" property directly on the Element.
// So, for example, if we want to listen to mouseenter:
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// This way of listening to Events is a bit old school.
// So, it used to be done like this in the old days.
// But now, we usually always use .addEventListener().
// There are 2 ways why .addEventListener() is better and the first one is that
// 1) it allows us to add multiple EventListeners to the same Event
// and the second one, and even more important, it that we can actually
// 2) remove an Event handler in case we don't need it any more.

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// Finally, there is also a third way of handling Events,
// which is by using HTML attribute. Now, this one should actually NOT be used,
// but just for the sake of curiosity I'm gonna show it to you here.
// So this is quite similar to what we did here with the mouseenter.
// We are simply defining it directly in the HTML.
// <!-- <h1 onclick="alert('HTML alert')"> -->

// Next off you will learn abaout the most important property of Events, which is "bubbling".

// Event Propagation: Bubbling and Capturing
// JavaScript Events have very important property.
// They have a so called "Capturing phase" and their "Bubbling phase".
// So, what does that mean?
// When a click happens on the link the DOM then generates a click Event right away.
// However, this Event is actually NOT generated at the target Element, so at the Element,
// where the Event happend. Instead the Event is actually generated at the root of the Document.
// So, at the very top of the DOM tree.

// 1) And from there the so called "Capturing phase" happens.
// When the Event then travels all the way down from the Document root to the target Element.
// And as the Event travels down the tree it will pass through every single parent Element
// of the target Element.

// 2) As soon as the Event reaches the target, the "Target phase" begins,
// where Events can be handled right at the target. And as we already know, we do that with
// .addEventListener()s. So, .addEventListener()s wait for a certain Event to happen
// on a certain Element and as soon as the Event occurs it runs the attached Callback Function.

// 3) After reaching the target the Event then actually travels all the way up to the document root again
// in the so called "Bubbling phase". So, we say that Events "bubble up" from the target to the Document root.
// And just like in the "Capturing phase", the Event passes through all his parent Elements and really just the parents.
// So, NOT through any sinbling Elements. So, as an Event travels down and up the tree it will pass though all the parent
// Elements, but NOT through any sibling Element. Basically, it's as if the Event also happend in each of the parent Elements.
// So, again, as the Event "bubbles" through a parent Element it's as if the Event had happend right in that very Element.

// By default, Events can only be handled in the "Target phase" and in the "Bubbling phase".
// However, we can set .addEventListener()s in a way that they listen to Events in the "Capturing phase" instead.
// Also, actually, NOT all types of Events do have an "Capturing phase" and "Bubbling phase".
// Some of them are created right on the target Element and so, we can only handle them there.
// But really, most of the Events do "Capture phase" and "Bubble phase" such as described here in this lecture.
// We can also say that Events propagate, which is really what "Capturing" and "Bubbling" is.
// It's Events propagating from one place to another.

// Event Propagation in Practice
// So, let's now see Event Propagation in Practice and mainly - Event "Bubbling".

// rgb(255,255,255);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   // This will be the same in any Event handler
//   // true
//   console.log(e.currentTarget === this);
//   // Stop Propagation
//   // e.stopPropagation();
//   // In practice that's usually NOt a good idea to stop Propagation.
//   // Stopping the Event Propagation like this can sometimes fix problems
//   // in very complex applications with many handlers for the same Events,
//   // but in general, it's NOT a very good idea to stop the Propagation of an Events.
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

// And the target is essentially where the Event originated.
// So, where the Event first happend. So, this is NOT the Element on which
// the handler is actually attached. This is where the Event happend.
// So, in this case, where the click happend.
// It is not the Element on which the Event handler was attached.

// Now, besides the target, there is actually also the Current Target.
// And the Current Target is indeed the Element on which the Event handler is attached.

// On the other hand the "Bubbling phase" can be very useful for something called "Event Delegation".
// however, if we do want to catch Events during the "Capturing phase", we can define a third parameter
// in the Event Listener Function.

// "Capturing" is actually rarely used these days. And the only reason that both "Capturing" and "Bubbling"
// exist is only for historical reasons. So, from the time when different browsers implemented different versions
// of JavaScript.

// Event Delegation: Implementing Page Navigation
// Let's now use the power of "Event Bubbling" to implement something called "Events Delegation".
// So, what we are going to do is to implement a smooth scrolling behaviour in the navigation.
// So, that when we click one of those links it will then automatically scroll smoothly to the corresponding
// section.

// DOM Traversing
// This lecture is going to be about "Traversing" the DOM.
// So, DOM Traversing is basically wlking through the DOM,
// which means we can select an Element based on another Element.
// And this is very important, because sometimes we need select Elements
// relative to a certain other Element. For example, a direct child
// or a direct parent Element or sometimes we don't even know the structure of
// the DOM at run time. And in all those cases we need DOM Traversing.

// const h1 = document.querySelector('h1');

// Going downwards: selecting child Elements
// 1) Using .querySelector() - also works on Elements, NOT only on the document.
// NodeList(2) [span.highlight, span.highlight]
// That would work no matter how deep these child Elements would be inside of the h1 Element.
// And that is very important to notice.
// console.log(h1.querySelectorAll('.highlight'));

// Also, if there were other 'highlight' Elements on the page, so, Elements with this
// 'highlight' class, they will NOT get selected, because they will NOT be children of the h1 Element.
// So, there are 2 points that are important to note here about .querySelector() and .querySelectorAll().

// Sometimes all we need are direct children and so for that we can use:
// NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
// But many times we are interested in the Elements themselves.
// So, if we wanted the text we could use .textContent() or .innerHTML().
// console.log(h1.childNodes);

// So, .childNodes() is NOT that used, but instead we can use:
// HTMLCollection(3) [span.highlight, br, span.highlight]
// And this then gives us an HTMLCollection, which, remember, is a Live Collection,
// so, it's updated. This works only for direct children.
// console.log(h1.children);

// Finally, there is also first and last Element child
// We can actually also set these properties or use them to set something, like those style:
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'black';

// Going upwards: selecting parents Elements
// And, for direct parent it's actually pretty straight forward:
// <div class=​"header__title">​…​</div>​ grid
// console.log(h1.parentNode);
// Which is usually the one that we are interetsed in,
// but in this case, it's simply the same.
// Because this Element is also a Node in this case.
// <div class=​"header__title">​…​</div>​ grid
// console.log(h1.parentElement);

// However, most of the time, we actually need a parent Element,
// which is NOT a direct parent, or in other words,
// we might need to find a parent Element,
// no matter how far away it is in the DOM tree.
// And for that we have the .closest().
// .closest() receives a query String just like .querySelector() and .querySelectorAll().
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// This is a very important one and we are going to use it all the time, especially for Event Delegation.
// If this selector here actually matches the Element on which we are calling .closest() -
// then that's actually the Element that is going to be returned.

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// We can think of .closest() here as basically being the opposite of .querySelector().
// So, both receive a query String as an input, but .querySelector() finds children
// no matter how deep in the DOM tree, while the .closest() Method finds parents
// and also, no matter how far up in the DOM tree.

// Going sideways: selecting siblings
// For some reason in JS we can only access direct siblings.
// So, basically, only the previous and the next one.
// null
// There is nothing there. So, this is the first child of this parent Element
// and therefore it doesn't have a previous sibling, but it has a nextElementSibling().
// console.log(h1.previousElementSibling);
// <h4>A simpler banking experience for a simpler life.</h4>
// console.log(h1.nextElementSibling);

// And just like before, we actually have the same properties for Nodes.
// #text
// console.log(h1.previousSibling);
// #text
// console.log(h1.nextSibling);

// Again, most of the time we are going to be working with the Elements anyway.
// Now, if we really need all the siblings and NOT just the previous and the next one,
// then we can use the trick of moving up to the parent Element and then read all of the children from there.
// We get all the siblings and that, of course it will include itself.
// HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

// So, this is how we can work with all the sibling Elements of one Element.
// That's actually the fundamentals of DOM Traversing.
// And we are going to need them all the time and especially when we are doing
// some more complex Event Delegation, like we will do throughtout the rest of the Section.

// Building a Tabbed Component

// We shouldn't use that, because it will cause bad performance
// console.log(tabs);
// tabs.forEach(t =>
//   t.addEventListener('click', () => {
//     console.log('TAB');
//   })
// );

// And remember that for Event Delegation we need to attach the event handler on
// the common parent Element of all the Elements that we are interested in.
// And in our case that is this 'tabsContainer'.
//

tabsContainer.addEventListener('click', function (e) {
  // We need the Event, of course, so that we can figure out where the click happend.
  // And so, let's now actually work on our Matching Strategy.
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  // So, it's basically an if statement, which will return early if some condition is matched.
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate Tab
  clicked.classList.add('operations__tab--active');

  // Activate Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Passing Arguments to Event Handlers
// Let's now create a nice effect on our page navigation, where all the links fade out
// when we hover over one of them, except for the link that we atually hovered over.
// And this will teach us something really valuable, which is how to pass arguments
// into Event Handler functions.

// Menu Fade Animation
// So, keep in mind that all of this works, because Events "bubble up" from their target.
// The big difference between 'mouseover' and 'mouseenter' is that 'mouseenter' does NOT "bubble".
// But here, we need the Event to actually "bubble", so that is can then reach the navigation Element.
// And so, therefore, we use 'mouseover'.

// And there are kind of opposite events, of 'mouseover' and 'mouseenter'.
// And we use these to basically undo what we do on the hover.
// So, the opposite of 'mouseenter' is 'mouseleave' and
// the opposite of 'mouseover' is 'mouseout'.

const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// It's always good to remember that JS indeed expects here a Function
// and NOT just some regular value, which would be the result of
// calling a Function like this: handleHover(e, 0.5).

// Now, the solution to this problem would be to still have a Callback Function here,
// like a regular one. Which JS will then call for us whenever the Event happens.

// nav.addEventListener('mouseover', function (e) {
// And then, in here, we could actually call this Function with the Event,
// and then our opacity. And so, this works, because here we are basically calling
// the Function manually. So, this will only be executed as soon as JS
// executes this Function value. We are back to passing a real Function.
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// We can actually do even better and remove those anonymous Callback Functions here all together.
// We can do even better by using the .bind() Method that we already studies before.
// So, remember that the .bind() Method creates a copy of the Function that is called on
// and will set the 'this' keyword in this Function Call to whatever value we pass into .bind().

// And so, this is going to work, because this is going to be also a Function, because .bind() -
// remember, returns a new Function. Now, in this Function the 'this' variable will now be set
// to this value.

// Passing "argument" to handler Function
// And I am using quotes here, because, of course, this is NOT really an argument.
// In fact, it is imposible to pass another argument into an Event Handler Function.
// So, any Handler Function, like this one, can only ever have 1 real argument.
// And so, in this case, can only ever have 1 real parameter,
// and that is the Event. But if we want to pass additional
// values into the Handler Function, then we need to use the
// 'this' keyword, like we just did here.

// And if we wanted multiple values, then we could,
// of course, pass in here an Array or an Object instead of just one value.
// So, this is kind of a workaround into the fact that the handler Function
// can only take 1 argument.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// The 'this' keyword is now our opacity.
// And so, essentially, we use the .bind() Method here
// to pass an argument into a handler Function

// Implementing a Sticky Navigation: The Scroll Event
// Let's implement another pretty commom feature on Web Pages,
// which is that the Navigation bar becomes attached to the top of the page
// after we scroll to a certain point. And this is called a Sticky Navigation.
// And so, let's build one for our site.

// Sticky Navigation
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
// And to implement this we are going to use the Scroll Event for now.
// So, there is actually a better way of what we are going to do in this video,
// but let's start by working with the Scroll Event now, because sometimes
// that's good to know as well. Well, the Scroll Event is available on window:
window.addEventListener('scroll', function (e) {
  //Event {isTrusted: true, type: 'scroll', target: document, currentTarget: Window, eventPhase: 3, …}
  // console.log(e);
  // console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

// So, the Scroll Event - it's NOT really efficient and usually it should be avoided,
// but again for now lets use that. And let's start by getting our current Scroll position.

// A Better Way: The Intersection Observer API
// So, let's now implement the same Sticky Navigation that we implemented in the last video,
// but this time using the new Intersection Observer API.

// But what actually is the Intersection Observer API and why is it so helpful?
// Well, this API allows our code to basically observe changes to the way that
// a certain target Element intersects another Element or the way it intersects the viewport.

// So, this Callback Function here will get called each time that the observed Element,
// so, our target Element here, is intersecting the root Element at the threshold that we defined.

// const obsCallback = function (entries, observer) {
//   // IntersectionObserverEntry { time: 42610.09999999404, rootBounds: DOMRectReadOnly, boundingClientRect: DOMRectReadOnly, intersectionRect: DOMRectReadOnly, isIntersecting: true, …}
//   //   boundingClientRect: DOMRectReadOnly {x: 0, y: 350, width: 1690.671875, height: 1824.796875, top: 350, …}
//   //   intersectionRatio: 0.1001027524471283
//   //   intersectionRect: DOMRectReadOnly {x: 0, y: 350, width: 1690.671875, height: 182.671875, top: 350, …}
//   //   isIntersecting: true
//   //   isVisible: false
//   //   rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 1690.671875, height: 532.671875, top: 0, …}
//   //   target: section#section--1.section
//   //   time: 42610.09999999404
//   //   [[Prototype]]: IntersectionObserverEntry
//   entries.forEach(e => console.log(e));
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  // const [entry] = entries[0];
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  // And so the root will once again be null, because we are again interested in the entire viewport.
  root: null,
  // We are interested in showing the sticky navigation as soon as this header scrolls completely out of view
  threshold: 0,
  // A box of 90px that will be applied outside of our target element, so of the header here.
  // 90 is the height of the navigation.
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Revealing Elements on Scroll
// Let's implement another really cool and modern feature using the IntersectionObserver API.
// And this time we are going to reveal Elements as we scroll close to them.
// And this effect can give your pages a very nice touch and we can, in fact, easily implement it
// without any external library.

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  // const [entry] = entries[0];
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // That's going to be even better for your performance.
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy Loading Images
// One of the most important things when building any website is performance.
// And images have by far the biggest impact on page loading. And so, it's very important that
// images are optimized on any page. And for that we can use a strategy called
// "Lazy Loading Images".

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  // const [entry] = entries[0];
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  // Replace the src attr with the data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

// Building a Slider Component: Part 1
// Let's now build a really cool Slider Component.

// Slider
// And now, just to finish, let's actually put all of this code into a function as well.
// And so this way we do NOT polute the global namespace.
// It'a good practice to keep this kind of Functionality here maybe in it's own Function.
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
    // curSlide = 1; -100%, 0, 200%, 300%
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide === maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Building a Slider Component: Part 2
  // Let's now continue building our Slider Component.

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  // We are going to use again Event Delegation.
  // So, we are NOT going to attach 1 Event Handler to each dot,
  // but instead - to the common parent.
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// Lifecycle DOM Events
// Now, to close of this Section, let's take a quick look of a couple of different Events
// that occur in the DOM during a Web Page's Lifecycle. And when we say "Lifecycle"
// we mean right from the moment that the Page is first accessed until the user leaves it.

// Now, the first Event that we are going to talk about is called "DOMContentLoaded".
// And this Event is fired by the document as soon as the HTML is completely parsed,
// which means that the HTMl has been downloaded and been converted to the DOM tree.
// Also, all scripts must be downloaded and executed before the DOMContentLoaded Event can happen.

// Now, this Event does actually NOT wait for images and other external resources to load.
// Just HTML and JS need to be loaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// So, with this here we can now execute code that only should be executed after the DOM is available.
// And, in fact, we want all our code only to be executed after the DOM is ready.

// If you are coming to Vanilla JS from jQuery, then you are probably used to
// wrap all your code into a document.ready Function, which in jQuery would look something like this:
// A $( document ).ready() block.
// $( document ).ready(function() {
//   console.log( "ready!" );
// });
// Shorthand for $( document ).ready()
// $(function() {
//   console.log( "ready!" );
// });

// And so, this is a equivalent to the DOMContentLoaded Event in Vanilla JS.
// But again, no such thing is necessary in regular JS.

// Next off is the Load Event.
// The Load Event is fired by the window as soon as NOT only the HTML is parsed, but also
// all the images and external resources like css files are also loaded. So, basically when a
// complete page has finished loading is when this Event gets fired.

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// The beforeunload Event also gets fired on window.
// And this Event here is created immediatelly before a user is about to leave a Page.
// We can basically use this Event to ask users if they are 100% sure that they want to leave the page.
// window.addEventListener('beforeunload', function (e) {
//   // In Chrome it's not necessary, but some browsers require it.
//   e.preventDefault();
//   // And, actually, in order to display a leaving confirmation we need to set the return value on the Event to an empty String.
//   console.log(e);
//   e.returnValue = '';
// });

// Now, a long time ago developers were actually able to customize the message that was displayed here,
// but then, of course, many people started to abuse this and so now we can only see this generic message.
// So, no matter what we write here we will always get the same pop-up.

// This can of course sometimes be useful, but sometimes it's also a bit too much.
// So, the only time you should prompt the user if they really want to leave the page
// is, for example, when the user is leaving in the middle of filling up a form
// or writing a blog post or something like that. So, a situation in which data could actually be lost
// by accident. So, that's the 3 Events that can be quite helpful in some situations,
// and, especially, the beforeunload Event.

// Efficient Script Loading: defer and async
// To finish this Section, let's take a quick look at different ways of
// loading a JS script in HTML. Only Modern browsers support async and defer
// and they will basically get ignored in old browsers.
// So, if you need to support old browsers then you'll need to put your script tag
// at the end of the <body></body> and NOT in the <hedd></hedd>.
// That's because this is actually NOT a JS feature, but an HTML5 feature.
// And, so you can really work around this limitation like we can do with modern JS features
// by transpiling or polyfilling.
