'use strict';

// Section Intro
// Let's now continue learning important JS features.
// And one topic that we haven't yet touched yet is Asynchronous JS.
// So, the goal of Asynchronous JS is basically to deal with long-running tasks,
// that basically run in the background. And the most common use case of Asynchronous JS
// is to fetch Data from Remote Servers, in so-called "AJAX Calls". And so, that's what we'll
// do in this Section while learning everything there is to learn about Promises, the Fetch Function,
// async await and error handling.

// Asynchronous JS, AJAX and APIs
// Let's start this Section by understanding what Asynchronous JS actually is,
// and also learn about the most popular use cases of Asynchronous JS. Which is, basically,
// to make so-called AJAX Calls to APIs.

// Now to understand what Asynchronous JS code actually is, we first need to understand
// what Synchronous code is. So, basically, the opposite of Asynchronous. So, most of the code that we've
// been writting so far in the course, has been Synchronous code, and Synchronous simply means that the code
// is executed line by line, in the exact order of execution that we defined in our code.

// So, as the first line of code is reached in the execution, it is simply executed in the Execution Thread.
// All you need to know is that the Execution Thread is part of the Exection Context, which does actually execute the code
// in the Computer's Processor (CPU).

// But anyway, then the next line of code is executed, and then the next one, all in sequence.
// So, each line of code always waits the previous line to finish execution. Now, this can create problems
// when one line of code takes a long time to run. And so, the alert() statement is a perfect example, of a long
// running operation, which blocks execution of the code. Only after we click "Ok", the window disapperas and the
// next line can run. So, this is hopefully a nice illustration of the problem with Synchronous code.

// Now, most of the time Synchronous code is fine and makes perfect sense, but imagine that execution will have to wait
// for example, for a 5 second timer to finish. Meanwhile, nothing on the page would workduring these 5 seconds.
// And so that's where Asynchronous code comes into play.

// Asynchronous code is executed after a task that runs in the "background" finishes.
// Asynchronous code is NON-blocking.
// Execution does NOT wait for an Asynchronous task to finish it's work.

// And that's the big difference between Synchronous and Asynchronous code.
// So, in summary, Asynchronous Programming is all about coordinating the behaviour of our Program
// over a certain period of time. And this is essential to understand. So, Asynchronous literally means
// NOT occuring at the same time. And so, that's what Asynchronous Programming is all about.

// As we saw in the example, we need a Callback Function to implement this asynchronous behaviour, right?
// However, that does NOT mean that Callback Functions automatically make code asynchronous.
// Only certain Functions, such as setTimeout() work in an asynchronous way.
// We just have to know which ones do and which ones do NOT, okay?

// EventListener-s alone do NOT make code asynchronous, just like Callback Functions alone
// do also NOT make code asynchronous.

// So, what matters is the Asynchronous behaviour of a task, like running a timer or loading an image.
// Other examples: Geolocation API or AJAX Calls.
// And AJAX Calls are probably the most important use case of Asynchronous JS.
// And so, let's see what AJAX is all about.

// Asynchronous JavaScript And XML (AJAX): Allows us to communicate with remote Web Servers in an Asynchronous way.
// With AJAX Calls we can requst Data from Web Servers dynamically.
// So, without reloading the page, so that we can use that Data in our Application dynamically.

// Let's quickly understand how AJAX works. So, let's say that we have our JavaScript Application running in the browser,
// which is also called the "Client". And we want the Application to get some Data from a Web Sever.
// And let's say the Data about countries. So, with AJAX we can do a HTTP request to the Server, which has this Data.
// And the Server will then set back a response containing that Data that we requested.
// And this back and forth between Client and Server all happens Asynchronously in the background.
// And there can even be different types of requests:
// - GET => To receive Data
// - POST => To send Data to the Server
// - etc.
// But there is a whole lecture about this a bit later to really show you how it all works in detail.

// Now, when we are asking the Server to send us some Data, the Server usually contains a Web API.
// And this API is the one that has the Data that we are asking for. So, an API is something pretty important,
// and so, let's now see what an API and Web APIs actually are.

// Application Programming Interface: Now, in general terms, and on a very high level of Abstraction,
// API is a piece of Software that can be used by another piece of Software,
// in order to allow Application to talk to each other and exchange information.
// And that's true NOT only for Web Development and JavaScript, but for Programming in general.

// Now, in Web Development and JavaScript there are countless types of APIs, like
// - DOM API;
// - Geolocation API that we have been using.
// These are called APIs, because they are a self-contained piece of Software that allow other
// pieces of Software to interact with them.
// - Own Class API - Also, we can always implement a small and simple API in a Class where we make some Methods
// available as a Public Interface. Remember?
// So, again, Objects made from a Class can be seen as self-container, Encapsulated pieces of Software,
// that other pieces of Software can interact with. And so, that fits the definition of an API, okay?

// But now, let's talk about the important type of API that we are actually interested in when we use AJAX.
// And that are APIs that I like to call
// - Onlinne APIs - An Online API is essentially an Application running on a Web Server, which receives
// requests for Data, then retrieves this Data from some DataBase and then sends it back to the Client.

// Now, of course, we can build our own Online API, but that requires Back-end Development.
// So, Development with Servers and DataBases and all that.
// For now, we are interested in using 3rd Party APIs.
// So, APIs that other Developers make available for us, mosts of the times for free.
// And there are really APIs for everything. The possibilities are really endless with APIs.
// And we can even say that APIs is what made the Modern Web as you know it possibly in the first place.
// So, using APIs in JS is super popular and everyone dos it all the time.

// Let's quickly talk about API Data Formats.
// So, AJAX stands for Asynchronous JavaScript And XML.
// XML is a Data Format, which used to be widely used to transmit Data on the Web.
// However, these days basically no API uses XML Data anymore. The term AJAX
// is just an old name that got very popular back in the day, and so it's used today,
// even though we do NOT use XML anymore. So, instead, most APIs these days use the Data JSON Format.
// So, JSON is the most popular Data Format today, because it's basically just a JavaScript Object,
// but converted to a String. And so, therefore, it's very easy to send across the Web and also to use in JS
// once the Data arrives.

// Our first AJAX Call: XMLHttpRequest
// So now that we know about AJAX and APIs, let's actually make our first API Call.

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// const renderCountry = function (data, className = '') {
//   // console.log(data);
//   // debugger;
//   const html = `
//   <article class="country ${className}">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${Object.values(
//           data.languages
//         )}</p>
//         <p class="country__row"><span>💰</span>${
//           Object.values(data.currencies).name
//         }</p>
//     </div>
//   </article>
//     `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const getCountryData = function (country) {
// Now, in JS there are actually multiple ways of doing AJAX Calls, but we're gonna start with the most old school one.
// And that's called XMLHttpRequest function.
// const request = new XMLHttpRequest();

// I'm showing it to you for 2 reasons:
// 1) I want you to know that XMLHttpRequest exists, because you might actually need it in the future.
// 2) I want to show you how AJAX Calls used to be handled with events and Callback Functions.
// And so, only after that we should move on to a more modern way of handling Asynchronous JS,
// which is going to be a feature called "Promises".

// But anyway, next we need the URL to which we will make the AJAX call.
// We need to provide 2 parameters. The first parameter is the HTTP Request type, the one to get Data is simply called 'GET'.
// And second, we need a String, containing the URL to which the AJAX Call should actually be made.
// This URL is also called "API Endpoint".
// CROS (Cross Origin Resource Sharing) - yes
// Without CORS we can NOT access a 3rd Party API from our own code.
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// Ok, and so this will now send off the request to this URL here.
// Now, in order to get the result, we could NOT simply do maybe something like this.
// So, set some variable simple to this result here:
// data = request.send();
// And the reason why we can NOT do this is because the result is simply NOT there yet, right?
// So, this AJAX Call that we send off here, is being done in the background, while the rest of the code keeps running.
// And so, this is the Asynchronous, non-blocking behaviour that we've talked about in the last lecture.
// And instead, what we need to do is to register a Callback on the Request Object for the load Event.
// request.send();

// request.addEventListener('load', function () {
// And again, this Property here is, of course, only going to be set once the Data has actually arrived, right?
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     console.log(typeof data);
//     console.log(typeof data.currencies[0]);
//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${Object.values(
//           data.languages
//         )}</p>
//         <p class="country__row"><span>💰</span>${
//           Object.values(data.currencies).name
//         }</p>
//     </div>
//   </article>
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// And by Calling these Functions here, we will basically have multiple AJAX Calls happening at the same time.
// So, in parallel, so to say.
// getCountryData('bulgaria');
// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('poland');
// getCountryData('serbia');

// Now, if we actually wanted these requests to be made in a specific, like predefined order,
// then, we would basically have to chain the requests. Which means to make the second request
// only after the first request has finished. And that's actually what we are going to do in the next lecture
// so that I can show you something that we developers call "Callback Hell".

// How the Web works: Requests and Responses
// If you want to go really deep and really understand how Requests and Responses work on the Web, then this video is for you.
// So, this is basically a high-level overview of how the Web actually works behind the scenes in regards to Requests and Responses.
// Whenever we try to access a Web Server, the browser, which is the Client, sends a Request to the Server and the Server
// will then send back a Response and that Response contains that Data or the Web page that we Requested.
// And this whole process actually has a name and it's called the "Request-Response Model" or also the "Client-Server Architecture".

// So, let's use the example of the URL that we actually accessed in the last video to get our Country Data:
// https://restcountries.com/v3.1/name/${country}
// Now, every URL gets an HTTP or HTTPS, which is for the Protocol that will be used on this connection.
// Then, we have the Domain name, which is restcountries.com in this case.
// And also, after a slash we have the so-called "Resource", that we want to access.
// And in this case that is /v3.1/name/ and so on.
// Now, this domain name restcountries.com is actually NOT the real address of the Server that we're trying to access.
// It's really just a nice name that is easy for us to memorize. But what this means is that we need a way to kind of
// convert the domain name to the real address of the Server. And that happens through a so-called DNS.
// So, DNS stands for Domain Name Server and Domain Name Servers are a special kind of Server. So, they are basically
// like the phone books of the Internet. So, the first step that happens when we access any Web Server is that the browser
// makes a Request to a DNS and this special Server will then simply match the Web address of the URL to the Server's
// real IP address, all right? And then after the real IP address has been send back to the browser, we can finally call it.
// So, this is how the real address looks like: https://104.27.142.889:443
// So, it still has the Protocol, but then comes the IP address. And also the port that we access on the Serve.
// And this port number is really just to identify a specific service that's running on the Server.
// So, you can think of it like a subaddress, okay. This port number has nothing to do with the with the /v3.1/name/ resource
// that we are trying to access. So that resource will actually be sent over in the HTTP requst as we will see in a moment.
// Once we have the real IP address, a TCP Socket connection is established between the browser and the Server.
// And so they are now finally coonected. And this connection is typically kept alive for the entire time that it takes
// to transfer all files of the Website or all the Data.
// Now, what are TCI an IP? Well, TCP is the Transmission Control Protocol and IP is the Internet Protocol.
// And together they are Communication Protocols that define exactly how Data travels across the Web.
// They are basically the Internet's Fundamental Control System, because, again, they are the ones who set the rules about
// how Data moves on the Internet.
// HTTP stands for Hypertext Transfer Protocol. So, after TCP/IP, HTTP is another Communication Protocol.
// A Communication Protocol is simply a system of rules that allows two or more parties to communicate.
// Now, in the case of HTTP, it's just a Protocol that allows Clients and Web Seervers to communicate.
// And that works by sending Request and Response Messages from Client to Server an back.
// So, about the HTTP Methods. There are many available, but the most important ones are:
// - GET => for simply getting Data;
// - POST => for sending Data;
// - PUT and PATCH => to basically modify Data;

// HTTP Response
// Starting line: HTTP Method + request target + HTTP version
// Now, if this target was empty, so, if it was just a slash, basically, then we would be accessing the website's route.
// Then the next part of the request are the HTTP Request Headers, which is just some information that we sent about the
// Request itself. There are tons of standard different Headers, like what browser is used to make the Request,
// at what time, the User's language and many, many more. Now, finally, in the case we are sending Data to the Server (POST MEthod),
// there will also be a Request Body. And that Request Body will contain the Data that we are sending.
// For example, coming from the HTML form. So, that is the HTTP Request.

// The main difference between HTTP and HTTPS is that HTTPS is encrypted using TLS or SSL, which are yet some more Protocols.
// So, our Request is formed and now it hits the Server, which will then be working on it untill it has our Data or Web page
// ready to send back. And once it's ready, it will send it back using, as you can guess, HTTP Response.
// And the HTTP Response actually looks quite similar to the Request.
// So, also with a start line, Headers and a Body. Now, in this case the start line has, besides the version also a Status Code
// and a message. And these are used to let the Client know wheter the Request has been Successful or a Failed.
// For example, 200 means Okay. And the Status Code that everyone knows is 404, which means "Page not found".
// Then the Response Headers are information about the Response itself and there are a ton available.
// And w can also make up oour own actually. And finally, the last part of the Response is, again, the Body.
// which is present in most Responses and this Body usually contains the JSON Data coming back from an API
// or the HTML of the Web Page that we requested or something like that.

// So, firts, the job of the TCP Protocol is to break the Requests and Responses into thousands of small chunks,
// called packets before they are sent. Once the small packets arrive at their final destination,
// TCP will reassemble all the packets into the original Request or Response. And this is necessary so that each packet
// can take a different route through the Internet, because this way the message arrives at the destination
// as quick as possible, which will NOT be possible if we send the entire Data simply as a big chunk.
// Now, as the second part, the job of the IP Protocol is to actually send and route these packets through the Internet.
// So, it insures that they arrive at the destination they should go, using IP addresses on each packet.

// Welcome to a Callback Hell
// So, in the last lecture we did a simple AJAX Call to fetch Data from a Country's API.
// So, we created a Function for that and as we call the Function multiple times, multiple AJAX Calls were made at the same time.
// So, they were basically running in parallel and we could NOT control which one finished first, remember that?

// However, in this lecture let's create a sequence of AJAX Calls, so that the second one runs only after the first one has finished.

// const getCountryAndNeighbour = function (country) {
//   // AJAX Call Country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // And again, this Property here is, of course, only going to be set once the Data has actually arrived, right?
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     console.log(typeof data);
//     console.log(typeof data.currencies[0]);
//     // Render Country 1
//     renderCountry(data);

//     // Get Neightbour Country (2)
//     // Use Optional Chaining to account for countries with no borders Property
//     const neightbour = data.borders?.[0];

//     // Guard Clause
//     if (!neightbour) return;

//     // AJAX Call Country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neightbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// And by Calling these Functions here, we will basically have multiple AJAX Calls happening at the same time.
// So, in parallel, so to say.
// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');

// So, in other words, here we have nested Callbacks.
// But now imagine  that we wanted to do more requests in sequence, like the neighbour of the neighbour, and like 10 times over.
// So, in that case, we would end up with Callbacks inside of Callbacks inside of Callbacks, like 10 times.
// And actually, for that kind of structure and for that kind of behaviour, we have a special name.
// And that special name is Callbacl Hell.

// So, basically, Callback Hell is when we have a lot of nested Callbacks in order to execute Asynchronous Tasks in sequence.
// And in fact, this happens for all Asynchronous Tasks, which are handled by Callbacks. And NOT just AJAX Calls.
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Code that is hard to understand is basically bad code, because it will have more bugs, because the harder it is to understand
// code and to reason about the code, the more difficult it will be to add new features and to add more functionality
// to the Application. But anyway, given all these problems with Callback Hell, we of course need a way to solve Callback Hell.
// And fortunately for us, since ES6, there is actually a way of escaping Callback Hell, by using something called "Promises".

// Promises and Fetch API
// So, in this lecture, let's learn about a modern JS feature called "Promises", so that we can escape Callback Hell.
// However, before we learn about Promises, we should actually see one. And so, let's now replace the old XMLHttpRequest Function
// with the modern way of making AJAX Calls. And that is by using the Fetch API.

// This is how we used to do it:
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);
// For more complex AJAX Calls, the Fetch Function can take in like an Object of options as well.
// But, again, for now, we do NOT need that.

// So, the formal definition of a Promise is that it's an Object that is used, basically, as a placeholder for the
// future result of an Asynchronous Operation. We can also say that a Promise is like a container for Asynchronously delivered value.
// Or even less formal - let's say that a Promise is a container for a future value. So, there you go, that's the most destilled
// down definition of what a Promise is. And the perfect exaxmple of a future value is the Response coming from an AJAX Call.
// So, when we start the AJAX Call, there is NO value yet, but we know that there will be some value in the future.
// And so, we can use a Promise to handle this future value.

// So, a Promise is just like a lottery ticket. So, when I buy a lottery ticket I essentially buy the Promise that I will
// receive some amount of money if I guess the correct outcome, right? So, I buy the ticket now with the Prospect
// of winning money in the future and the lottery draw which determines if I get the money or NOT happens Asynchronously.
// So, of course, I do NOT have to drop everything and keep waiting untill the lottery draw happens, right?
// Now, in case I did get the correct outcome, then I will receive my money, becau se I have my lottery ticke,
// which is the Promise that I bought.

// Now, what's the big advantage of using Promises? Well, there ae 2 of the actually:
// 1) By using Promises, we NO longer need to rely on events and Callback Functions to handle Asynchronous Results;
// *** Events and Callback Functions can sometimes cause unpredictable results and so, this is a big win already.
// 2) Even better! With Promises insatead of nesting Callbacks, we can chain Promises for a sequence of
// Asynchronous Operations. and with this we can finally escape Caallback Hell, which was our initial goal all along.

// And BTW, Promises are ES6 Feature, so, they became available in JS in 2015. And so, by now, they are widely used by everyone.

// Now, since Promises work with Asynchronous Operations, they are time sensitive. So, they change over time.
// And so, Promises can be in different States and this is what we call "The Cycle of a Promise".
// So, in the very beginning, we say that a Promise is Pending. And so, this is before any value resulting from the
// Asynchronous task is vailable. Now, during this time, the Asynchronous Task is still doing it's work in the background.
// Then, when tha task finally finishes, we say that the Promise is Settled. And there 2 different types of Settled Promises:
// 1) Fulfilled Promises
// 2) Rejected Promises

// So, a Fulfilled Promise is a Promise that has successfully resulted in a value just as we expect it.
// for example, when we use a Promise to Fetch Data from an API, a Fulfilled Promise successfully got that Data and it's now
// available to being used.

// On the other hand, a Rejected Promise means that there has been an error during the Asynchronous Task.
// In the example of Fetching Data from an API, an error would be for example, when the user is offline and can NOT connect
// to the API Server.

// Now, going back to the analogy of our lottery ticket, the lottery draw is basically the Asynhronous Task, which determines the result.
// Then, once the result is available - the ticket will be Settled. Then if we guessed the correct outcome, the lottery ticket will be
// Fulfilled and we get our money. However, if we guessed wrong, then the ticked basically gets Rejected. And all we did was
// waste our money.

// Now, these different States are very important to understand, because when we use Promises in our code, we will be able to handle
// these different states in order to do somethihng as a result of either a successful Promise or a Rejected one.
// Another imporant thing about Promises is that is that a Promise is only Settled once. and so, fron there the state will remain
// unchanged forever. So, the Promise is either Fulfilled or Rejected, but it's imposible to change that State.
// Now, these different States that I showed you here are relevant and useful when we use a Promise to get a result, which
// is called to "consume a Promise". So, we consume a Promise when we already have a Promise, for example, the Promise that was
// returned from the Fetch Function right at the beginning of this video, remember? But in order a Promise to exist in the first place
// it must first be built. In the case of the Fetch API, it's the Fetch Function that builds the Promise and returns it for us
// to consume. So, in this case, we do NOT have to built the Promise ourselves in order to consume it.

// Now, most of the time we will just consume Promises, which is also the easier and more useful part.
// And so, that's what we will do in the next couple of videos. But sometimes we also need to build a Promise and
// NOT just consume it. And, of course, we will also learn how to that a bit later.
// And so, now let's actually start using Promises in the next video.

// Consuming Promises
// In this lecture we will learn how to consume a Promise. In this case, we will consume the Promise that was returned by the
// Fetch Function. So, let's now implement the getCountryData Function from the very first lecture. But, of course, this one
// using a Promise. Andb as we already know, calling the Fetch Function like this, will then immediately return a Promise.
// So, as soon as we start the Request. And, in the beginning this Promise is, of course, still Pending, because the Asynchronous Task
// of getting the Data is still running in the background. So, just as we learned in the last lecture.
// To handle the Fulfilled State, we can use the .then() Method that is available on all Promises.
// Now, into the .then() Method, we need to pass a Callback Function that we want to be executed as soon as the Promise
// is actually Fulfilled. So, as soon as the result is available.

// JSON is a Method that is available on all Responses of the Fetch Method.

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       // Now, the problem here is that this .json() Function itself ia actually also an Asynchronous function.
//       // And so, what that means is that it will also return a new Promise.
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       response => {
//         console.log(response);

//         if (!response.ok)
//           throw new Error(`Country not found (${response.status})`);
//         return response.json();
//       }
//       //, err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       const neightbour = data[0].borders?.[0];

//       if (!neightbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neightbour}`);
//       // And so, by doing this, so, by returning this Promise here, then the Fulfilled Value of the next .then() Method
//       // will be the Fulfilled Value of this previous Promise.
//     })
//     .then(
//       response => response.json()
//       //, err => alert(err)
//     )
//     // And so, here again, teh Fulfilled Value of the Promise will become that Body.
//     // So, the Data that is stored in the Body.
//     .then(data => renderCountry(data[0], 'neighbour'))
//     // And then, instead of using the commented Callback Functions in the first .then() Method after a Fetch,
//     // we can handle all the errors, no matter where they appear in the Chain, right at the end of the Chain,
//     // by adding a .catch() Method. And then here we can actually use the same Callback Function.
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       // So, that's the only way this here can work.
//       // So, of course, this only works on Promises.
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neightbour = data[0].borders?.[0];

//       if (!neightbour) throw new Error('No neighbour found!');

//       // Country 2
//       getJSON(
//         `https://restcountries.com/v3.1/alpha/${neightbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('germany');
// });

// getCountryData('australia');

// Promises do NOT get rid of Callbacks, but they do get rid of Callback Hell.

// Chaining Promises
// Let's now learn how to chain Promises in order to also render the neighbouring country of the initial country
// that we give to the Function. And, actually, we already have a small chain of Promises, because of this .json() Function.
// In this lecture, we will now take chaining to a new level and actually chain together 2 sequential AJAX Calls.

// So, actually, the .then() Method always returns a Promise, no matter if we actually return anything or NOT.
// But, if we return a value, then that value will become the Fulfilment Value of the return Promise.

// So, here, instead of the Callback Hell we have what we call a Flat Chain of Promises.

// As a conclusion from this video and the previous one, Priomises are an incredibly powerful and elegant solution
// to handle Asynchronous code. Let's now move on and actually handle errors, because that is also a pretty common scenario
// when we work with Promises and especially with AJAX Calls.

// Handling Rejected Promises
// So, untill now we've always assumed that everything went well with our AJAX Calls,
// so, we never handled any errors. However, an important part of Web Development
// is to actually handle errors. Because it's very common that errors happen in Web Applications.
// So, in this lecture let's talk about how to handle errors in Promises.

// And to start, remember that a Promise in which an error happend is a Rejected Promise.
// And so, in this video we're going to learn how to handle Promise Rejections.
// Now, actually the only way in which the Fetch Promise Rejects is when the user loses his internet connection.
// And so, for now, that's going to be the only error that we will handle here.

// There is one more quick Method that I want to show you and that is also available on all Promises.
// So, besides .then() and .catch() there is also the .finally() Method.
// So, no matter if the Promise is Fulfilled or Rejected, this Callback Function that we define here
// is going to be called always. So, that's the difference between the other 2.
// So, the .then() Method is only called when the Promise is Fulfilled, while the .catch() Method
// is called when the Promise is Rejected.

// Now, the .finally() Method is NOT always useful, but sometimes it actually is.
// So, we use this Method for something that always needs to happen, no matter the result of the Promise.
// And one good example of that is to hide a loading spinner.

// Throwing Errors Manually
// So, in this lecture we are going to fix the Rquest 404 error that we saw happening in the last lecture.
// And so, as we saw in the last video, the problem here is that during the Fetch there was a 404 error,
// which is because our API could NOT find any country with this name.

// But still, even though obviously there was a big problem with this Request the Fetch Function still
// did NOT Reject in this case. And btw, many people, and that includes myself, think that in his case
// the Promise should actually be Rejected right away. But again, it just doe NOT,
// so we will have to do it manually.

// Now, the effect of creating and throwing an error in any of these .then() Methods is that the Promise
// will immediatelly Reject. So, basically the Promise returned by the first .then() handler here will be
// a Rejected Promise. And that Rejection will then propagate all the way down to the .catch() handler.

// Again, any error that happens in any of the Callbaks here, so, in any .then() handler, will immediatelly
// terminate that .then() handler and will propagate down to the .catch() Method here.
// An then in there we handle that error, and so, therefore, that's why we then see this error here displayed.

// Even more important, it's really just a bad practice to leave these Rejected Promises hanging around
// without handling them. So, do NOT do that. Always use .catch() and if necessary, you can always use
// .finally().

// Whenever we want to create some error that we want to handle down here in the .catch() handler
// all we need to do is to throw and create a new error. And remember, this works, because throwing an error
// inside this Callback Function of this .then() Method will immediatelly Reject this Promise and so then
// this Rejected Promise will travel down the Chain untill it is eventually caught somewhere. And so,
// in this case it is right here, in this .catch() handler.

// So, when working with real Applications in the real world really make sure to keep this technique in mind,
// because it is really important.

// Coding Challenge #1
// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time �
// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' function we created, that
// is cheating �
// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message
// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.
// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code)
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK �

// const whereAmI = function (lat, lng) {
//   let requestOptions = {
//     method: 'GET',
//   };

//   fetch(
//     `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=f3c731f175b74bce80645199751576c5`,
//     requestOptions
//   )
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding (${res.status})`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(
//         `You are in ${data.features[0].properties.city}, ${data.features[0].properties.country}.`
//       );
//       return fetch(
//         `https://restcountries.com/v3.1/name/${data.features[0].properties.country}`,
//         requestOptions
//       );
//     })
//     .then(res => res.json())
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => console.error(`${err.message} 💥`));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// Asynchronous Behind the Scenes: The Event Loop
// So, we've learned what AJAX and API's are, we used a bunch of Asynchronous code already
// and we've learned all about Promises, but what's missing is to finally understand
// how all of it really works behind the scenes of JS.

// So, the Event Loop is the essential piece that makes Asynchronous behaviour possible in JS.
// It's the reason why we can have a non-blocking concurrency model in JS. And a concurrency model
// is simply how a language hadles multiple things happening at the same time.
// But now, how does this non-blocking concurrency model actually work?
// And why is the Event Loop so important?

// So, as you know by now a JS Engine is built around the idea of a single thread.
// But if there is only one thread of execution in the Engine then how can Asynchronous code be
// executed in an non-blocking way?

// So, as you aleady know, everything related to the DOM is NOT really part of JS,
// but of the Web APIs. And so, it's in the Web APIs Environment where the Asynchronous Tasks
// related to the DOM will run. And, in fact, the same is true for Timers, AJAX calls
// and really, all other Asynchronous Tasks. So, again, these Asynchronous Tasks will all run in the
// Web APIs Environment of the browser.

// With this we have now executed all the Top Level code, so, all the code that is NOT inside any
// Callback Function, in an Asynchronous way.

// The Callback Queue is basically an ordered list of all the Callback Functions that are in line to be executes.
// And you can think of this Callback Queue like as a TODO list that you would write for youself with all
// the tasks that you have to complete. So, the Callback Queue is also a TODO list of a kind, but with the tasks
// the Callback Queue will eventually have to complete.

// What's important to mention here is that the Callback Queue also contains Callbacks coming from DOM Evenets
// like clicks or key presses or whatever. Now, we've learned before that DOM Events are NOT Asynchronous behaviour,
// but they still use the Callback Queue to run their attached Callbacks.

// Here is what the Event Loop does: it looks into the Call Stack and determines whether it's empty or NOT
// exept, of course, for the Global Context.And if the Call Stack is indeed empty, which means there is
// currently no code being executed, then it will take the first Callback from the Callback Queue and
// put it on the Call Stack to be executed. And this is called an "Event Loop take". So, each time
// the Event Loop takes a Callback from the Callback Queue, we say that there was an "Event Loop take".

// So, as we can see here, the Event Loop has the extremely important task of doing coordination
// between the Call Stack and the Callbacks in the Callback Queue. So, the Event Loop is basically
// who decides exactly when each Callback is executed. We can also say that the Event Loops does the orchestration
// of this entire JS Runtime. Another thing that becomes clear from this whole explanation is that JS language itself
// is actually NO sense of time. That's because everything that is Asynchronous does NOT happen in the Engine.
// It's the Runtime that manages all the Asynchronous behaviour and it's Event Loop who decides which code
// will be executed next. But the Engine itself simply executes whatever code it is given.

// In a nutshell, the Web APIs Environment, the Callback Queue and the Event Loop all together make possible
// that Asynchronous code can be executed in a non-blocking way even with only one thread of execution in the Engine.

// Now, with Promises things work in a slightly different way, which is why I included this Promise example as well.
// This Callback that we still have, which is coming from a Prom ise, will NOT be moved into the Callback Queue.
// Instead, Callbacks from Promises have a special queue for themselves, which is the so-called "Microtasks Queue".
// Now, what is special about the "Microtasks Queue" is that it basically has priority over Callbacks Queue.
// So, at the end of an "Event Loop take", so, after a Callback has been taken from the Callback Queue, the Event Loop
// will check if there are any Callbacks in the "Microtasks Queue" and if there are it will run all of them before it will
// run any more Callbacks from the Regular Callback Queue. And btw, we call these Callbacks from Promises "Microtasks".
// And therefore the name - "Microtasks Queue". And there are actually other Microtasks, but that is NOT relevant here.

// The Event Loop in Practice
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

// Output
// Test start
// Test end
// Resolved promise 1
// Resolved promise 2
// 0 sec timer

// Building a Simple Promise
// So, at this point of the Section you know all about consuming Promises, but we have never actually built
// our own Promise. So, let's do that in this lecture.

// Essentially, Promises are just a special kind of Object in JS. Now, the Promise Constructor takes exactly 1 argument
// and that is the so-called "Executor" Function. Now, as soon as the Promise Constructor runs it will automatically execute
// this "Executor" Function that we pass in and as it executes this Function here it will do so by passing in 2 other arguments
// and those arguments are the Resolve and Reject Functions.

// So, basically, calling the Resolved Function like this will mark this Promise as a Fulfilled Promise, which we can also say
// Resolved Promise and that's the reason why this Method here is called Resolve. Now, into the Resolved Function here
// we pass in the Fulfilled Value of the Promise so that it can later be consumed with the .then() Method.

// Into the Reject Function we pass in the Error Message that we later want to be able to use in the .catch() Handler, the .catch() Method.

// And so, with this we made this whole Promise here make a little bit more sense, because now by using this timer
// we did actually Encasulate some Asynchronous behaviour into this Promise. And that's the whole point of Promises in the first place.

// In practice, most of the time, all we actually do is to consume Promises and we usually only built Promises to basically
// wrap old Callback based Functions into Promises. And this is process that we call Promisifying. So, basically Promisifying means to
// convert Callback based Asynchronous behaviour to Promise based.

// And now, inside of this Function we will actually create and return a Promise. So, usually that is always what we do.
// So, creating a Function and then from there returning a Promise and so this will then Encapsulate the Asynchronous Operation
// even further. So, essentiially, that is also what the Fetch Function does. So, it's a Function that returns a Promise and that
// is exactly what we are going to do with this wait Function.

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res).catch(err => console.error(err)));

// Promisifying setTimeout
// And in this case we actually do NOT even need the Reject Function. And that's because it's actually imposible for the Timer
// to fail and so, therefore, we will never mark this Promise as Rejected and so here we do NOT even need to specify that Reject parameter.

// const wait = function(seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   })
// }

// wait(1).then(() => {
//   console.log('I waited for 1 second')
//   return wait(1);
// }).then(() => {
//   console.log('I waited for 2 seconds')
//   return wait(1);
// }).then(() => {
//   console.log('I waited for 3 seconds')
//   return wait(1);
// }).then(() => console.log('I waited for 4 second'))

// Output
// I waited for 1 second
// I waited for 2 seconds
// I waited for 3 seconds
// I waited for 4 seconds

// And so, with this we have once again a nice Chain of Asynchronous behaviour that happens nicely in a sequence.
// And all without the "Callback Hell".
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// There is also actually a way to very easyly create a Fulfilled or Rejected Promise immediatelly.
// So, basically this is a Static Method on the Promise Constructor.
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// Promisifying the Geololcation API
// Let's now keep Promisifying things. And this time around we are going to Promisify the Geolocation API.
// This is going to be really cool, because it will allows us to take the small App that we've built in
// the last coding challenge to the next level.

// And then this Function here accepts 2 Callbacks where the first is for the Success and the second one is for the Error.
// And this first Callback Function gets actually gets access to the Position Object. So, let's pass it as an argument to this
// Callback Function and then let's simply log that to the console. So, this is our first Callback. And now let's create the second
// Callback with the Error.
// navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.error(err));

// console.log('Getting position');

// And so, this is another great opportunity to Promisify a Callback basd API to a Promise based API.
// So, let's do that. It's actually very simple.

// And just like before we are going to return a new Promise, which we then can handle later on. So, here we pass in
// the Executor Function, which gets access to the Resolved Function and the Reject Function. Which, remember, we can use to mark
// the Promise as eighter Rejected or Fulfilled
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(position => resolved(position), err => reject(err));
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(position));

// const whereAmI = function () {
//   let requestOptions = {
//     method: 'GET',
//   };

//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=f3c731f175b74bce80645199751576c5`,
//         requestOptions
//       );
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding (${res.status})`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(
//         `You are in ${data.features[0].properties.city}, ${data.features[0].properties.country}.`
//       );
//       return fetch(
//         `https://restcountries.com/v3.1/name/${data.features[0].properties.country}`,
//         requestOptions
//       );
//     })
//     .then(res => res.json())
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => console.error(`${err.message} 💥`));
// };

// btn.addEventListener('click', whereAmI);

// With this we saw that we can Promisify all kinds of Asynchronous stuff in JS.
// For example we can also Promisify the old XMLHttpRequest Function that we used in the beginning to make AJAX Calls.
// Or we can also Promisify the image loading example that we have seen a couple of times in ourr slides and actually
// that is exactly what we are going to do in the next Coding Challenge.

// Coding Challenge #2
// For this challenge you will actually have to watch the video! Then, build the image
// loading functionality that I just showed you on the screen.
// Your tasks:
// Tasks are not super-descriptive this time, so that you can figure out some stuff by
// yourself. Pretend you're working on your own �
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input.
// This function returns a promise which creates a new image (use
// document.createElement('img')) and sets the .src attribute to the
// provided image path
// 2. When the image is done loading, append it to the DOM element with the
// 'images' class, and resolve the promise. The fulfilled value should be the
// image element itself. In case there is an error loading the image (listen for
// the'error' event), reject the promise
// 3. If this part is too tricky for you, just watch the first part of the solution
// PART 2
// 4. Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set display CSS
// property to 'none'), and load a second image (Hint: Use the image element
// returned by the 'createImage' promise to hide the current image. You will
// need a global variable for that �)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data: Images in the img folder. Test the error handler by passing a wrong
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// otherwise images load too fast
// GOOD LUCK �

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', () => {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', () => {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImage;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// Consuming Promises with Async/Await
// So, now that you are super comfortable with Consuming Promises and also Building Promises,
// let's turn our attention back to actually Consuming Promises. That's because since ES2017
// there is now an even better and easier way to Consume Promises, which is called "Async/Await".
// So, let me show you how it works.

// And so, this Function is now an Asynchronous Function. So, a Function that will basically keep running
// in the background, while performing the code that is inside of it. Then, when this Function is done
// it automatically returns a Promise, but more on that in the next video. For now, what is important
// is that inside an Async Function we can have 1 or more Await statements.

// And so, in an Async Function like this one, we can use the Await keyword to basically await for the
// result of this Promise. So, basically Await will stop code execution at this point of the Function
// untill the Promise is Fulfilled. And so, untill the Data has been fetched in this case.

// Isn't stopping the code blocking the execution? Well, that is a really a good question, but the answer is actually
// no, in this case, because stopping the execution in a Async Function is actually NOT a problem, because this
// Function is running Asynchronously in the background. And so, therefore it is NOT blocking the main thread
// of execution. So, it's NOT blocking the Call Stack. And in fact, that's what is so special about Async/Await.
// So, it's the fact that it makes our code look like Regular Synchronous Code while behind the scenes
// everything is in fact Asynchronous.

// As soon as the Promise here is Resolved, then the value of this whole Await Expression that we have here
// is going to be the Resolved value of the Promise.

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// const renderCountry = function (data, className = '') {
//   // console.log(data);
//   // debugger;
//   const html = `
//   <article class="country ${className}">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${Object.values(
//           data.languages
//         )}</p>
//         <p class="country__row"><span>💰</span>${
//           Object.values(data.currencies)[0].name
//         }</p>
//     </div>
//   </article>
//     `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const whereAmI = async function (country) {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     console.log(pos);
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse Geocoding
//     const resGeo = await fetch(
//       `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=f3c731f175b74bce80645199751576c5`
//     );
//     if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();

//     // Country Data
//     // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res))
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.features[0].properties.country}`
//     );
//     if (!res.ok) throw new Error('Problem getting country');
//     const data = await res.json();
//     renderCountry(data[0]);
//     return `You are in ${dataGeo.features[0].properties.city}, ${dataGeo.features[0].properties.country}.`;
//   } catch (err) {
//     console.log(`${err} 💥`);
//     renderError(`Something went wrong 💥 ${err.message}`);
//     // Reject a Promise returned from Async Function
//     // Rethrowing the error means to basically throw the error again so then we can propagate it down.
//     // And so, with that we will manually Reject a Promise that's returned from the Async Function.
//     throw err;
//   }
// };

// whereAmI('portugal');
// whereAmI();
// whereAmI();
// console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);
// this one didn't work, but here on the next line it is going to work.
// Because, again, in the .then() handler this argument that will be passed
// into the Callback Function is going to be the resolved value of the Promise.
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

// So, you see here that by using async/await our asynchronous code here really looks and feels like synchronous code.
// So, we can simply await untill the value of the Promise is returned basically and then just assign that value to a variable.
// Now, that is something that wasn't possible before. So, before we had to mess with Callback Functions and that was truelly a Callback Hell,
// but also by consuming Promises with the .then() Method. But now with the async/await that is just completely gone, right?
// So, again, this looks now like normal synchronous code wehere we simply assign values to a variable and that makes it so much easier
// and more clean.

// Now, before you start using async/await all over the place you need to first understand that async/await is in fact simply syntactic sugar over
// the .then() Method in Promises. So, of course, behind the scenes we are still using Promises. We are simply using a different way of
// consuming them here in this case.

// Also, Async/Await is actually used a lot together with the traditional .then() Method of consuming Promises as we will see in the next video.

// When we reload the page too fast, then we should get that same error as before from the reverse GeoCoding where we can only do
// 3 requests per second or something like that. We have that 403, 404 and other errors. The reason for these cascading errors here is because
// actually right now we do not have any error handling here. And so, let's fix that in the next video.

// Error handling with try...catch
// In this lesson we're going to learn how error handling works with Async/Await.
// So, with Async/Await we can NOT use the .catch() Method that we used before, because we can NOT really attach it anywhere, right?
// So, instead, we'll use something called a "try...catch" statement. And the "try...catch" statement is actually used in
// regular JS as well. So, it's been in the language probably since the begginning.

// So, the "try...catch" statement has nothing to do with Async/Await, but we can still use it to catch errors in Async Functions.

// But before we do that let's look at a more simple example just to see how "try...catch" works.
// So, we can basically, wrap all our code into a "try" block and so JS will then basically try to execute this code.
// So, just as normal code.

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

// The Promise coming from a .fetch() Method only gets rejected when the user has no internet connection.
// But in a case of an 403 error or a 404 error the .fetch() Promise does NOT reject so, again, we need to do that manually.

// Returning values from Async Functions
// At this point we have a pretty good idea of how to work with Async/Await, right?
// However, there is one important thing missing. So, right now it might still be a little bit unclear what an Asunc Function
// actually is and how it works. And so, let's now fix that.

// The value that we return from an Asunc Function will become the Fulfilled value of the Promise that is returned by the Function.

// The .finally() Method will always be executed, no matter what.

// There is still a problem here. And that problem is the fact that using .then(), .catch() and .finally() Methods in a sequence as above
// kind of mixes the philosophy of Async/Await with handling Promises using both the old and the new way of working with Promises here.
// And so, let's now go a head and convert this .then(), .catch() and .finally() Methods Example to Async/Await as well.
// We can do that, because, of course, we can treat the Promise here that has returned just like any other Promise.
// and so, of course, we are able to handle it using Async/Await. So, that's what we are going to do next.

// Now it would be great if we could simply use Await without the Async Function,
// but that does NOT really work, at leat for now, because there is actually a Proposal in the works to make this happen,
// but for now, Await can only be used inside an Async Function.

// However, we do NOT really a new complete Function here and so instead we can use an IIFE (Immediately-invoked Function Expressions).
// So, we write Function, then here the Function body, and then, in the end we simply call it:

// Of course, we can easily create a Async IIFE as well, all right?
// And, actually this pattern here is one of the last remaining cases for IIFEs, all right?
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     err => console.error(`2: ${err.message} 💥`);
//   }
//   console.log('3: Finished getting location');
// })();

// Now we know how to basically return data from an Async Function and how to properly receive and handle that returned data.
// And actually in the real life this is something that happens all the time. So, it's pretty common thet we have
// Async Functions calling other Async Functions and returning values between them.

// Returning Promises in Parallel
// Let's now imagine that we wanted to get some data about three countries at the same time,
// but in which the order that the data arrives does NOT matter at all.

// So, let's now implement an Async Function, using everything that we know at this point.
// And this Function will simply take in three countries and we will log the capital cities
// of those three countries as an Array.

// We really always need to wrap or coat our Async Functions into "try...catch" block, okay?
// So, never work an Async Function without this.

// And again, ain a real world scenario, you would do real world handling and NOT just log it to the console.

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // We already know that the result of this going to be an Array with one Object.
//     // So, let's use Distructuring to take the first element there.
//     // So, creating three variables there for three countries.
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

//     // console.log([data1.capital, data2.capital, data3.capital]);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(data);
//     // (3) ['Lisbon', 'Ottawa', 'Dodoma']
//     console.log(data.map(d => d[0].capital[0]));
//   } catch (err) {}
// };
// get3Countries('portugal', 'canada', 'tanzania');

// So, instead of running these Promises in sequence, we can actually run them in Parallel, so, all at the same time.
// And so, then we can save some valuable loading time, making these three Requests, basically load at the same time.
// And each of them takes half a second. And so, with that, we will basically save one second, which is actually
// a lot of time when loading a website. So, let's do that, and for doing that, we use the Promise.all() combinator Function.
// This is once again, kind of a helper Function on this Promise Constructor. So, it's a Static Method, right?

// Now, this Function here takes an Array of Promises and it will return a new Promise, which will then run all the Promises
// in the Array, at the same time. So, Promise.all() receives an Array and and it also returns an Array.

// Now, just one thing that's also very important to mention here is that if one of the Promises rejects,
// then, the whole Promise.all() actually rejects as well. So, we say that Promise.all() short circuits when one Promise rejects.
// So, again, because one rejected Promise is enough for the entire thing to reject as well.

// So, whenever you have a situation in which you need to do multiple Asynchronous Operations at the same time,
// and operations that do NOT depend on one another, then you should always, always run them in Parallel,
// just like we did here using Promise.all(). And this is actually more common than you might think.
// And so, please, keep this technique in mind, because your users will thank you.

// And, of course, just in case you are not using Async/Await, you can, of course, also
// take this result here (Promise.all()) and then handle it with a .then() Method.
// So, that's going to work just exactly the same as here with Async/Await.

// Okay, and that's the Promise.all() Combinator. So, it's called a Combinator Function, because it allows us to combine
// multiple Promises. And there are actually other combinator Functions and so, let's take a look at them right in the next video.

// Other Promise Combinators: race, allSettled and any
// Let's now quickly talk about the other three Promise Combinators, which are race, allSettled and any.

// Promise.race
// And Promise.race(), just like all other combinators, receives an Array of Promises and it also returns a Promise.
// Now, this Promise returned by Promise.race() is settled as soon as one of the input Promises settles.
// And remember that settled simply means that a value is available, but it does NOT matter if the Promise got Rejected or Fulfilled.
// And so, in Promise.race() basically the first settled Promise wins the race. But let's now actually see this in action.
// I will create a quick IIFE so that I can use Async/Await without like creating a whole new Function with a name.

// (async function () {
//   // And so, as always then we use await Promise and in this case .race() too.
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// And so, now these three Promises will basically race against each other, like in a real race.
// Now, if the winning Promise is then a Fulfilled Promise, then the Fulfillment value of this whole race Promise
// is going to be the Fulfillment value of the winning Promise.

// Okay, so again, just keep in mind that here in Promise.race() we only get one result and NOT an Array of all the three.

// Now, a Promise that gets Rejected can actually also win the race. And so, we say that Promise.race() short circuits
// whenever one of the Promises gets settled. And so, again, that means no matter if Fulfilled or Rejected.

// Promise.race() is actually very useful to prevent against never ending Promises or also
// very long running Promises. For example, if your user has a very bad internet connection,
// then a .fetch() request in your application might take way too long to actually be useful.
// And so, we can create a special time out Promise, which automatically Reject after a certain time has passed.
// And so, let's do that. And it's going to be similar to the wait Function that we've created earlier.
// But the difference is that this one is actually going to Reject and NOT going to Resolve.

// const timeout = function (sec) {
//   // And so, here for the Resolve Function, which is always the first one, we can once again
//   // use this throw away variable "_", so, using this convention.
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(0.15),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// And so this Promise here is the result of Promise.race().
// So, that's pretty useful. In the real world you will use a larger number.
// Let's say, like 5 seconds.

// Promise.race() and Promise.all() are by far the two most important Promise Combinators.

// Promise.allSettled()
// And this one is a pretty new one. It's from ES2020 and it's actually a very simple one.
// So, it takes in an Array of Promises again, and it will simply return all the Settled Promises.
// And so, again, no matter if the Promises got Rejected or NOT.
// So, it's similar to Promise.all() in regard that it also returns an Array of all the results.
// The difference is that Promise.all() will short circuit as soon as one Promise Rejects,
// but Promise.allSettled() simply never short circuits. So, it will simply return all the results
// of all the Promises.
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// Promise.all()
// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// Promise.any()
// Now, Promise.any() is even more modern. It is ES2021 and actually at the time of recording this one doesn't work
// in my browser, but probably by the time I'm releasing this course, it will work in the latest version of
// Google Chrome. But again, in your case, it might already work.

// As always Promise.any() takes in an Array of multiple Promises and this one will then return the first Fulfilled Promise
// and it will simply ignore Rejected Promises. So, basically Promise.any() is very similar to Promise.race() with the
// difference that Rejected Promises are ignored. And so, therefore the results of Promise.any() is always going to be a Fulfilled
// Promise, unless of course, all of them Reject, okay?
// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// Coding Challenge #3
// Your tasks:
// PART 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time
// using async/await (only the part where the promise is consumed, reuse the
// 'createImage' function from before)
// 2. Compare the two versions, think about the big differences, and see which one
// you like more
// 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
// in the dev tools Network tab
// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths
// 'imgArr'
// 2. Use .map to loop over the array, to load all the images with the
// 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
// 3.jpg']. To test, turn off the 'loadNPause' function
// GOOD LUCK 😀

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

let currentImage;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// PART 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

// PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach(img => img.classList.add('parallel'));
    console.log(imgsEl);
  } catch (err) {
    console.log(err);
  }
};

// (3) [Promise, Promise, Promise]
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
// And so, what we got here are actually three Promises.
// So, we have an Array of Promises and NOT the images themselves.
// And this is actually a big source of confusion for most Async/Await begginers.

// So, once you need to use Async/Await in a .map() Method like this, which, believe me, is pretty common,
// then you end up with an Array of Promises that you can then, as a next step handle like this.
// So, with the Promise.all() Combinator Function. And so now the next step is actually pretty easy.
// All we have to do is to loop over this Array and add the .parallel class to it.
