const sense = require('sense-hat-led');
const colours = require('./colours');

const pixels = (c) => [
    c,c,c,c,c,c,c,c,
    c,c,c,c,c,c,c,c,
    c,c,c,c,c,c,c,c,
    c,c,c,c,c,c,c,c,
    c,c,c,c,c,c,c,c,
    c,c,c,c,c,c,c,c,
    c,c,c,c,c,c,c,c,
    c,c,c,c,c,c,c,c
]

module.exports = {
    go(colour) {
        if (colour) {
            const p = pixels(colours[colour]);
            sense.setPixels(p);
        }
        else {
            sense.clear();
        }
    },
    clear() {
        sense.clear();
    }
}
