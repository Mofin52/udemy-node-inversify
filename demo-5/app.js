// // const start = performance.now();
// // setTimeout(() => {
// // 	console.log(performance.now() - start);
// // 	console.log('Second passed');
// // }, 1000);

// function myFunc(arg) {
// 	console.log(`Argument => ${arg}`);
// }

// setTimeout(myFunc, 1500, 'Cool');

// const timerId = setTimeout(() => {
// 	console.log('Boom');
// }, 5000);

// setTimeout(() => {
// 	clearTimeout(timerId);
// 	console.log('Boom defused');
// }, 1000);

// const intervalId = setInterval(() => {
// 	console.log(performance.now());
// }, 1000);

// setTimeout(() => {
// 	clearInterval(intervalId);
// }, 5000)

// console.log('Before');
// setImmediate(() => {
// 	console.log('After all');
// })
// console.log('After');

const timerId = setTimeout(() => {
	console.log('Boom');
}, 5000);

timerId.unref();

setImmediate(() => {
	timerId.ref();
})