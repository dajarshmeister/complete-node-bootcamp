const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 1;

fs.readFile('test-file.txt', () => {
	console.log('i/o finished');
	setTimeout(() => {
		console.log('timer 2 finished');
	}, 0);
	setTimeout(() => {
		console.log('timer 3 finished');
	}, 3000);
	setImmediate(() => {
		console.log('Immediate 1 finished');
	});
	process.nextTick(() => {
		console.log('process next ticket');
	});
	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(Date.now() - start, 'password encrypted');
	});
	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(Date.now() - start, 'password encrypted');
	});
	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(Date.now() - start, 'password encrypted');
	});
	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(Date.now() - start, 'password encrypted');
	});
});

console.log('top level code');
