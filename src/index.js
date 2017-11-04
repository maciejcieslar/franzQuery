import $ from './franzquery';

const p = $($('a'), 'p', 'div');

console.log('p');
console.log(p);

const c = $('div').merge(p);

console.log(c.parent());

console.log(c.prev());
console.log(c.next());
