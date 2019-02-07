import oGrid from 'o-grid';
import cookieStore from './js/cookies';

// TODO: Should this be moved to the n-ui "app initializer"?
oGrid.setMinSupportedIeVersion(11);

export function $(sel, ctx) {
	return (ctx || document).querySelector(sel);
}

export function $$(sel, ctx) {
	return [].slice.call((ctx || document).querySelectorAll(sel));
}

export function uuid(a){
	return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid);
}

export function getSpoorNumber() {
	let spoorId = cookieStore.get('spoor-id').replace(/-/g, '');
	spoorId = spoorId.substring(spoorId.length - 12, spoorId.length); // Don't overflow the int
	return parseInt(spoorId, 16);
}

export function broadcast(name, data, bubbles = true) {
	const rootEl = Element.prototype.isPrototypeOf(this) ? this : document.body;
	let event;

	try {
		event = new CustomEvent(name, {bubbles: bubbles, cancelable: true, detail: data});
	} catch (e) {
		event = CustomEvent.initCustomEvent(name, true, true, data);
	}
	rootEl.dispatchEvent(event);
}

export function sampleUsers(pct, seed)  {
	if (!seed) {
		throw new Error('sampleUsers needs a seed string to be passed in as the second parameter');
	}
	const seedAsNumber = seed.split('').reduce((num, str, i) => num + Math.pow(2, i) * str.charCodeAt(0), 0);
	return (getSpoorNumber() + seedAsNumber) % 100 < pct;
}

// TODO: This is undocumented so remove it?
export function createToggler({ flag = true, callback }) {
	return () => {
		if (typeof callback === 'function') {
			callback({ flag });
		}
		flag = !flag;
		return flag;
	};
}

export { default as cookieStore } from './js/cookies';

export { default as perfMark } from './js/perf-mark';

export { default as ascii } from './js/to-ascii';

export { debounce, throttle } from 'o-utils/main';
