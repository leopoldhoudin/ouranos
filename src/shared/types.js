const types = new Object();

const makeType = type => types[type.replace('-', '_')] = `ouranos:${type}`;

makeType('init');
makeType('clear-requests');
makeType('frames-request');
makeType('frame-response');

export default types;
