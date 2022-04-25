// Declarations
const framerate = 60;
let WIDTH;
let HEIGHT;
let radius;
let bpmSlider;
let stopPlaying;
let button;
let framesPerNote;
let framesCount;

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

function initialise() {
	radius = WIDTH / 16;

	// Initialise bpm slider and global frame clock
	bpmSlider = createSlider(2, 12, 7, 1);
	bpmSlider.addClass("mySliders");
	bpmSlider.position(WIDTH / 2 - radius, HEIGHT / 8);
	framesCount = 0;
	framesPerNote = int(framerate / bpmSlider.value());
	
	// Play-pause button
	stopPlaying = true;
	button = createButton("play");
	button.position(50, 20);
	button.mousePressed(togglePlaying);

	// Init sequencer objects
	circleSeq1 = new CircleSequencer (
		WIDTH / 5,
		HEIGHT / 2,
		"#FF64FF",
		radius,
		2,
		8,
		e3Sound,
		framesPerNote
	);
	circleSeq2 = new CircleSequencer (
		WIDTH / 5 * 2,
		HEIGHT / 2,
		"#ff8000",
		radius,
		2,
		9,
		fs3Sound,
		framesPerNote
	);
	circleSeq3 = new CircleSequencer (
		WIDTH / 5 * 3,
		HEIGHT / 2,
		"#00cc00",
		radius,
		3,
		8,
		a3Sound,
		framesPerNote
	);
	circleSeq4 = new CircleSequencer (
		WIDTH / 5 * 4,
		HEIGHT / 2,
		"#00c6ee",
		radius,
		5,
		11,
		cs4Sound,
		framesPerNote
	);
}

function setup() {
	WIDTH = windowWidth;
	HEIGHT = windowHeight;
	createCanvas(WIDTH, HEIGHT);
	frameRate(framerate);
	angleMode(RADIANS);
	rectMode(CENTER);
	colorMode(RGB);
	// preload();
	initialise();
}

function draw() {
	background("#4D7092");

	// Update clock ( bpmSlider.value() )
	if (framesCount == framesPerNote) {
		framesCount = 0;
		let temp = int(framerate / bpmSlider.value());
		if (temp != framesPerNote){
			framesPerNote = temp;
			// circleSeq -> new clock rate
			circleSeq1.setFramesPerNote(framesPerNote);
			circleSeq2.setFramesPerNote(framesPerNote);
			circleSeq3.setFramesPerNote(framesPerNote);
			circleSeq4.setFramesPerNote(framesPerNote);
		}
	}
	framesCount++;
	
	push();
	circleSeq1.updateFrame(stopPlaying);
	pop();

	push();
	circleSeq2.updateFrame(stopPlaying);
	pop();

	push();
	circleSeq3.updateFrame(stopPlaying);
	pop();

	push();
	circleSeq4.updateFrame(stopPlaying);
	pop();
}

// play - stop
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
// Rotation
// Fix Firefox audio issues