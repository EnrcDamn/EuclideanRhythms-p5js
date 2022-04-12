let radius;
let sequence;
const framerate = 32;
let stepTime;
let color = (23,55,33);
let circleSeq1;
let circleSeq2;
let circleSeq3;
let circleSeq4;
let angle;

let e3Sound;
let fs3Sound;
let a3Sound;
let cs4Sound;


function bjorklund(pulses, steps) {
	if (pulses < 0 || steps < 0 || steps < pulses) {
		return [];
	}
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
	// console.log(head, remainders);
	return sequence;
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(framerate);
	colorMode(RGB);
	angleMode(RADIANS);
	rectMode(CENTER);
	noFill();
	preload();
	init();
}

function preload() {
	soundFormats('mp3');
	e3Sound = loadSound('sounds/eucl-e3-2');
	fs3Sound = loadSound('sounds/eucl-fs3-2');
	a3Sound = loadSound('sounds/eucl-a3-1');
	cs4Sound = loadSound('sounds/eucl-cs4-4');
  }

function init() {
	// color = color(234, 222, 101);
	radius = height / 8;
	angle = 0;
	stepTime = framerate / 8;
	circleSeq1 = new CircleSequencer (
		windowWidth / 5,
		windowHeight / 2,
		color,
		bjorklund(7, 12),
		radius,
		e3Sound);
	// circleSeq2 = new CircleSequencer (
	// 	windowWidth / 5 * 2,
	// 	windowHeight / 2,
	// 	color,
	// 	bjorklund(7, 11),
	// 	radius,
	// 	fs3Sound);
	// circleSeq3 = new CircleSequencer (
	// 	windowWidth / 5 * 3,
	// 	windowHeight / 2,
	// 	color,
	// 	bjorklund(5, 8),
	// 	radius,
	// 	a3Sound);
	// circleSeq4 = new CircleSequencer (
	// 	windowWidth / 5 * 4,
	// 	windowHeight / 2,
	// 	color,
	// 	bjorklund(3, 6),
	// 	radius,
	// 	cs4Sound);
}

function draw() {
	background(20);

	stepTime --;
	if (stepTime <= 0) {
		stepTime = framerate / 8;
	}
	circleSeq1.playPattern(circleSeq1.updateTick(stepTime));
	circleSeq1.render();

	// circleSeq2.playPattern(circleSeq2.updateTick());
	// circleSeq2.render();

	// circleSeq3.playPattern(circleSeq3.updateTick());
	// circleSeq3.render();

	// circleSeq4.playPattern(circleSeq4.updateTick());
	// circleSeq4.render();
}