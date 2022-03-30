const { fork } = require('child_process');

const forkProcess = fork('fork.js');

forkProcess.on('message', (msg) => {
	console.log(`Fork got a message: ${msg}`);
});

forkProcess.on('close', (code) => {
	console.log(`Fork closed with code ${code}`);
});

forkProcess.send('Ping');
forkProcess.send('disconnect');