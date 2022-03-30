async function main() {
	try {
		const { characters, greet } = await import('./characters.mjs');
		for (const char of characters) {
			greet(char);
		}
	} catch(err) {
		console.log('Ошибка')
	}
}
main()
// import log, { characters as heroes, greet as hello } from './characters.mjs';

// log();
// for (const char of heroes) {
// 	hello(char);
// }