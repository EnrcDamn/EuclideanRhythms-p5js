class CircleSequencer {
    constructor(centreX, centreY, color, radius,
                initPulses, initSteps, sound, framesPerNote) {
        this.centreX = centreX;
        this.centreY = centreY;
        this.color = color;
        this.radius = radius;
        this.sound = sound;
        this.framesPerNote = framesPerNote;
        
        // Sliders for setting pulse and step number
        this.pulsesSlider = createSlider(0, 16, initPulses, 1);
        this.pulsesSlider.addClass("mySliders");
        this.pulsesSlider.position(
            this.centreX - this.radius,
            this.centreY + 2 * this.radius);

        this.stepsSlider = createSlider(1, 16, initSteps, 1);
        this.stepsSlider.addClass("mySliders");
        this.stepsSlider.position(
            this.centreX - this.radius,
            this.centreY + 2 * this.radius + 50);
        
        this.sequence = [];
        this.pulsesCount = 0;
        this.handAngle = 0;
        this.frameCounter = 0;
        this.steps = []; // array for step objects
        this.getSequence();
    }


    // ( centreX, centreY )
    setRenderPosition() {
        translate(this.centreX, this.centreY);
        noFill();
        rotate(-PI);
    }


    getSequence() {
        let pulsesValue = this.pulsesSlider.value();
        let stepsValue = this.stepsSlider.value();
        if (pulsesValue > stepsValue) pulsesValue = stepsValue;
        if (stepsValue < pulsesValue) stepsValue = pulsesValue;
        let sequenceLength = this.sequence.length;
        this.sequence = bjorklund(pulsesValue, stepsValue);
        // re-init steps and pulses when slider value changes
        if (sequenceLength !== stepsValue)
            this.initSteps(pulsesValue);
        else if (pulsesValue !== this.pulsesCount)
            this.updatePulses(pulsesValue);
    }


    initSteps(pulsesValue) {
        this.pulsesCount = pulsesValue;
        let previousCounter = this.frameCounter;
        this.steps = [];
        // update frame counter value to fit new steps length
        let newCounter = this.framesPerNote * 
                        (int(previousCounter / this.framesPerNote) % 
                        this.sequence.length) + 
                        (previousCounter % this.framesPerNote);
        for (let index in this.sequence) {
            this.steps.push(
                new Step(
                    this.centreX,
                    this.radius,
                    this.sequence[index],
                    2*PI / this.sequence.length * index,
                    1,
                    this.color,
                    this.sound,
                    (newCounter / this.framesPerNote) >= index
                )
            )
        }
        this.frameCounter = newCounter;
    }


    updatePulses(pulsesValue) {
        this.pulsesCount = pulsesValue;
        for (let index in this.sequence){
            this.steps[index].activatePulse(this.sequence[index]);
        }
    }


    drawSequencer() {
        let angle = 2*PI / this.sequence.length;
        for (let index in this.steps) {
            this.steps[index].draw();
            rotate(angle);
        }
        this.drawHand();
    }


    // Update frame counter and rotation angle 
    update() {
        let frameAngle = 2*PI / (this.sequence.length * this.framesPerNote);
        this.handAngle = frameAngle * this.frameCounter;
        // Reset after a full cycle
        if (this.frameCounter >= this.sequence.length * this.framesPerNote) {
            this.handAngle = 0;
            this.frameCounter = 0;
            for (let index in this.steps){
                this.steps[index].resetStatus();
            }
        }
        // Check if note is played at every step
        this.steps[int(this.frameCounter / this.framesPerNote)].checkNote();
        this.frameCounter++;
    }


    // Global clock callback
    setFramesPerNote(framesPerNote){
        this.frameCounter = int(this.frameCounter / this.framesPerNote) * framesPerNote;
        this.framesPerNote = framesPerNote;
    }


    drawHand(){
        rotate(PI/2);
        stroke("#ffffff"); // white
        strokeWeight(this.radius / 25);
        rotate(this.handAngle);
        line(0, 0, this.radius + this.radius / 6, 0);
        fill("#ffffff");
        noStroke();
        ellipse(0, 0, this.radius / 10, this.radius / 10);
    }


    updateFrame(stopPlaying){
        this.getSequence();
        this.setRenderPosition();
        if (stopPlaying == false)
            this.update();
        this.drawSequencer();
    }
}