function bjorklund(pulses, steps) {
	if (pulses < 0 || steps < 0 || steps < pulses) {
		return [];
	}
	if (steps < pulses) steps = pulses;
	if (pulses > steps) pulses = steps;
	// Create the two arrays
	let head = new Array(pulses).fill([1]);
	let remainders = new Array(steps - pulses).fill([0]);
	// Pick the shortest one
	let minLength = Math.min(head.length, remainders.length);
	let loopThreshold = 0;

	while (minLength > loopThreshold) {
	// Allow only loopThreshold to be zero on the first loop
	if (loopThreshold === 0) {
		loopThreshold = 1;
	}
		for (let i = 0; i < minLength; i++) {
			head[i] = Array.prototype.concat.call(head[i], remainders[i]);
		}

		if (minLength === head.length) {
			// remainders[minLength -> end]
			remainders = Array.prototype.slice.call(remainders, minLength); 
		}
		else {
			remainders = Array.prototype.slice.call(head, minLength);
			head = Array.prototype.slice.call(head, 0, minLength);
		}
		minLength = Math.min(head.length, remainders.length);
	}
	
	let sequence = [];
	sequence = Array.prototype.concat.call(head, remainders).flat();
	return sequence;
}