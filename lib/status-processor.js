const colours = require('./colours');

const strip = (input) => {
	return input.replace(/@digsb/ig, '').replace(/#colour/ig, '');    
}

const matchColour = (input) => {
    const keys = Object.keys(colours);
    
    for(let i = 0; i < keys.length; ++i) {
        const regex = new RegExp(keys[i],'i','g');
        if (regex.test(input)) return keys[i];
    }
    
    return '';
}

module.exports = {
    process(statuses) {
    	if (statuses.length) {
            return statuses.map((s) => {
                return matchColour(strip(s.text));
            });
        }   
        
        return [];
    }
}