// Exporting Module
console.log('Exporting Module');

// Blocking Code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');

// So this Top Level Await that we have here is in fact blocking the execution, not only in this Module,
// but also in the Module that is importing it.

// So again, it's very important to remember that using Top Level Await, so await outside of any Async Function
// will block the entire Module in a way that we really couldn't block code execution before.
// And so this is not only a really helpful tool, but also one that we need to use with great care.
// But anyway, let's now deactivate this code here so that it's not going to block when we start going to the next lectures.

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart.`);
};

const totalPrice = 237;
const totalQuantity = 23;

// https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
export { totalPrice, totalQuantity as tq };
// So this is a little bit like Exporting an Object from this Module.

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart.`);
}
// And here you see that no name is involved at all.
// We are simply exporting this value. And so then, when we Import it we can, basically, give it any name that we want.

// And as we call this Function, that we called as in the other Module, we keep pushing Objects to that Array.
// So, we are mutating that Array here, and so then in the Importing Module, of course, we see that manipulating the Array,
// in the console, as we logged the cart here. And so, they are, in fact, the exact same Object behind the scenes, basically.
// And so, what that means is that they point to the exact same place in memory, because, again, otherwise, it it was a copy,
// then here we would NOT get anything in the Array.

// This is the foundation of how we organize a modern JS code base.
