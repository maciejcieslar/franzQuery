import $ from './franzquery';

const p = $([$('a'), 'p', 'div']);

const d = $('div');

console.log(p);
console.log(d);

const testDiv = document.createElement('div');

testDiv.textContent = 'asd';

d.append(testDiv);

const x = $('div');

console.log(x);

const c = $('div').merge(x, d, p);

console.log(c);

console.log(c.position());
