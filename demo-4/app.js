const EventEmmiter = require('events');

const myEmmiter = new EventEmmiter();

const logDbConnection = () => {
	console.log('DB connected');
}

const logMessage = (data) => {
	console.log(`Message received: ${data}`)

}

myEmmiter.addListener('connected', logDbConnection);
myEmmiter.emit('connected');

myEmmiter.off('connected', logDbConnection);
// myEmmiter.removeListener('connected', logDbConnection);
// myEmmiter.removeAllListeners('connected');
myEmmiter.emit('connected');



myEmmiter.on('message', logMessage);
myEmmiter.prependListener('message', () => {
	console.log('Message loading...');
});
myEmmiter.emit('message', 'Hello, this is your message');



myEmmiter.once('off', () => {
	console.log('DB Disconnected. Listener removed');
})
myEmmiter.emit('off');
myEmmiter.emit('off');
myEmmiter.emit('off');


console.log(myEmmiter.getMaxListeners());
myEmmiter.setMaxListeners(1);
console.log(myEmmiter.getMaxListeners());
console.log(myEmmiter.listenerCount('message'));
console.log(myEmmiter.listenerCount('off'));


console.log(myEmmiter.listeners('message'));

console.log(myEmmiter.eventNames());

myEmmiter.on('error', (err) => {
	console.log(`Caught error: ${err.message}`);
});

myEmmiter.emit('error', new Error('Boom!'));






const target = new EventTarget();

const logTarget = () => {
	console.log('Connected to EventTarget');
};

target.addEventListener('connected', logTarget);
target.dispatchEvent(new Event('connected'));