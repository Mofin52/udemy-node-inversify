const fs = require('fs');

console.log('init');

setTimeout(() => {
	console.log(performance.now(), 'Timer 0');
}, 100);

setImmediate(() => {
	console.log('Immediate');
})

fs.readFile(__filename, () => {
	console.log('File readed');
});

setTimeout(() => {
	for(let i = 0; i < 1000000000; i++) {

	}
	console.log('Loop finished');
	Promise.resolve().then(() => console.log('Inner promise'));
	process.nextTick(() => console.log('Inner next tick'));
}, 0);

Promise.resolve().then(() => console.log('Promise'));

process.nextTick(() => console.log('Next tick'));

console.log('fin');