// Declarations
const framerate = 60;
let radius;
let sixteenthNoteCount;
let bpmSlider;
let stopPlaying;
let button;

// Objects declaration
let circleSeq1;
let circleSeq2;
let circleSeq3;
let circleSeq4;

// Pattern update variables
let note1;
let note2;
let note3;
let note4;

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
	// preload();
	init();
}

function init() {
	color = (234, 222, 101);
	radius = windowWidth / 16;
	bpmSlider = createSlider(2, 12, 7, 1);
	bpmSlider.addClass("mySliders");
	bpmSlider.position(windowWidth / 2 - radius, windowHeight / 2 - 3*radius);
	sixteenthNoteCount = int(framerate / bpmSlider.value());
	
	stopPlaying = true;
	button = createButton("play");
	button.position(50, 20);
	button.mousePressed(togglePlaying);

	circleSeq1 = new CircleSequencer (
		windowWidth / 5,
		windowHeight / 2,
		"#FF64FF",
		radius,
		2,
		8,
		e3Sound
	);
	circleSeq2 = new CircleSequencer (
		windowWidth / 5 * 2,
		windowHeight / 2,
		"#ff8000",
		radius,
		2,
		9,
		fs3Sound
	);
	circleSeq3 = new CircleSequencer (
		windowWidth / 5 * 3,
		windowHeight / 2,
		"#00cc00",
		radius,
		3,
		8,
		a3Sound
	);
	circleSeq4 = new CircleSequencer (
		windowWidth / 5 * 4,
		windowHeight / 2,
		"#00c6ee",
		radius,
		5,
		11,
		cs4Sound
	);
}

function draw() {
	background("#4D7092");

	if (stopPlaying == false)
		sixteenthNoteCount--;

	if (sixteenthNoteCount < 0)
		sixteenthNoteCount = int(framerate / bpmSlider.value());
	else if (sixteenthNoteCount == 0 && stopPlaying == true)
		// to avoid 0-pulse loop
		sixteenthNoteCount = int(framerate / bpmSlider.value());	

	push();
	circleSeq1.setRenderPosition();
	note1 = circleSeq1.updateNote(sixteenthNoteCount);
	circleSeq1.playPattern(note1);
	circleSeq1.drawClockFace();
	circleSeq1.drawHand(note1);
	pop();

	push();
	circleSeq2.setRenderPosition();
	note2 = circleSeq2.updateNote(sixteenthNoteCount);
	circleSeq2.playPattern(note2);
	circleSeq2.drawClockFace();
	circleSeq2.drawHand(note2);
	pop();

	push();
	circleSeq3.setRenderPosition();
	note3 = circleSeq3.updateNote(sixteenthNoteCount);
	circleSeq3.playPattern(note3);
	circleSeq3.drawClockFace();
	circleSeq3.drawHand(note3);
	pop();

	push();
	circleSeq4.setRenderPosition();
	note4 = circleSeq4.updateNote(sixteenthNoteCount);
	circleSeq4.playPattern(note4);
	circleSeq4.drawClockFace();
	circleSeq4.drawHand(note4);
	pop();
}

function togglePlaying(){
	if (stopPlaying == false){
		button.html("play");
		stopPlaying = true;
	}
	else {
		button.html("pause");
		stopPlaying = false;
	}
}


// TODO: 
// *) add continuous hand rotation
// *) implement pulses hit