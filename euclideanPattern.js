// Declarations
const framerate = 32;
let radius;
let stepTime;
let initPulses;
let initSteps;

// Objects declaration
let circleSeq1;
let circleSeq2;
let circleSeq3;
let circleSeq4;

// Pattern update variables
let tick1;
let tick2;
let tick3;
let tick4;

// Sound variables
let e3Sound;
let fs3Sound;
let a3Sound;
let cs4Sound;

function preload() {
	soundFormats('mp3');
	e3Sound = loadSound('sounds/eucl-e3');
	fs3Sound = loadSound('sounds/eucl-fs3');
	a3Sound = loadSound('sounds/eucl-a3');
	cs4Sound = loadSound('sounds/eucl-cs4');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(framerate);
	angleMode(RADIANS);
	rectMode(CENTER);
	colorMode(RGB);
	noFill();
	// preload();
	init();
}

function init() {
	color = (234, 222, 101);
	radius = height / 8;
	stepTime = framerate / 8;

	circleSeq1 = new CircleSequencer (
		windowWidth / 5,
		windowHeight / 2,
		[204, 23, 204],
		radius,
		4,
		7,
		e3Sound
	);
	circleSeq2 = new CircleSequencer (
		windowWidth / 5 * 2,
		windowHeight / 2,
		[255, 102, 0],
		radius,
		4,
		11,
		fs3Sound
	);
	circleSeq3 = new CircleSequencer (
		windowWidth / 5 * 3,
		windowHeight / 2,
		[22, 212, 0],
		radius,
		3,
		6,
		a3Sound
	);
	circleSeq4 = new CircleSequencer (
		windowWidth / 5 * 4,
		windowHeight / 2,
		[56, 128, 255],
		radius,
		2,
		8,
		cs4Sound
	);
}

function draw() {
	background(20);

	stepTime--;
	if (stepTime < 0) {
		stepTime = framerate / 8;
	}

	push();
	tick1 = circleSeq1.updateTick(stepTime);
	circleSeq1.playPattern(tick1);
	circleSeq1.drawClockFace();
	circleSeq1.drawHand(tick1);
	circleSeq1.drawSliders();
	pop();

	push();
	tick2 = circleSeq2.updateTick(stepTime);
	circleSeq2.playPattern(tick2);
	circleSeq2.drawClockFace();
	circleSeq2.drawHand(tick2);
	circleSeq2.drawSliders();
	pop();

	push();
	tick3 = circleSeq3.updateTick(stepTime);
	circleSeq3.playPattern(tick3);
	circleSeq3.drawClockFace();
	circleSeq3.drawHand(tick3);
	circleSeq3.drawSliders();
	pop();

	push();
	tick4 = circleSeq4.updateTick(stepTime);
	circleSeq4.playPattern(tick4);
	circleSeq4.drawClockFace();
	circleSeq4.drawHand(tick4);
	circleSeq4.drawSliders();
	pop();
}