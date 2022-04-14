class CircleSequencer {
    constructor(centreX, centreY, color, radius,
                initPulses, initSteps, sound) {
        this.centreX = centreX;
        this.centreY = centreY;
        this.color = color;
        this.radius = radius;
        this.sound = sound;

        this.currentNote = 0;
        this.note = 0;
        this.triggered = false;
        this.animationTime = 20;
        this.a = 0.0;

        this.pulsesSlider = createSlider(0, 16, initPulses, 1);
        this.stepsSlider = createSlider(0, 16, initSteps, 1);
        this.pulsesSlider.addClass("mySliders");
        this.stepsSlider.addClass("mySliders");
        this.pulsesSlider.position(
            this.centreX - this.radius,
            this.centreY + 2 * this.radius);
        this.stepsSlider.position(
            this.centreX - this.radius,
            this.centreY + 2 * this.radius + 50);
    }

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
        return bjorklund(pulsesValue, stepsValue);
    }

    drawClockFace(note) {
        for(let step in this.getSequence()) {
            // draw the off steps of the sequence
            if(this.getSequence()[step] === 0){
                fill("#aaaaaa"); // grey
                noStroke();
                rect(
                    0,
                    this.radius,
                    this.radius / 10,
                    this.radius / 5,
                    this.radius / 13
                );
            }
            else if (this.getSequence()[step] === 1 && note!==step) {
                // draw the on steps of the sequence
                fill(this.color); // color
                noStroke();
                rect(
                    0,
                    this.radius,
                    this.radius / 6,
                    this.radius / 3,
                    this.radius / 10
                );
            }
            if (note == step && this.getSequence()[step] === 1 && this.triggered) {
                // animate the current pulse playing
                fill(this.color); // color
                noStroke();
                push();
                this.animateRect();
                rect(
                    0,
                    this.radius,
                    this.radius / 6,
                    this.radius / 3,
                    this.radius / 10
                );
                pop();
            }
            let angle = map(1, 0, this.getSequence().length, 0, 2*PI);
            rotate(angle);
        }
    }

    drawHand(note) {
        rotate(PI / 2);
        stroke("#ffffff"); // white
        strokeWeight(3);
        push();
        rotate(map(note, 0, this.getSequence().length, 0, 2* PI));
        line(0, 0, this.radius + this.radius / 6, 0);
        pop();

        fill("#ffffff"); // white
        noStroke();
        ellipse(0, 0, 10, 10);
    }

    animateRect(){
        //rotate(random(-20/360, 20/360));
        //translate(0, this.radius / 6);
        this.animationTime--;
        this.a += 0.5;
        rotate(cos(this.a)*(8*PI / 360));
        if (this.animationTime < 0){
            this.triggered = false;
            this.animationTime = 10;
            this.a = 0.0;
        }
    }

    playPattern(note) {
        if (note != this.currentNote){
            if (this.getSequence()[note] == 1) {
                this.sound.pan(map(this.centreX, 0, windowWidth, -1.0, 1.0))
                this.sound.play();
                this.triggered = true;
            }
        }
        this.currentNote = note;
    }

    updateNote(sixteenthNoteCount) {
        if (sixteenthNoteCount <= 0) {
            if (this.note < this.getSequence().length - 1)
                this.note++;
            else this.note = 0;
        }
        return this.note;
    }
}