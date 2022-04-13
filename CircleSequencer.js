class CircleSequencer {
    constructor(centreX, centreY, color, radius, initPulses, initSteps, sound) {
        this.centreX = centreX;
        this.centreY = centreY;
        this.color = color;
        this.radius = radius;
        this.sound = sound;

        this.isSoundPlayed = false;
        this.currentTick = 0;
        this.tick = 0;
        this.maxPulses;
        this.pulsesSlider = createSlider(0, 16, initPulses, 1);
        this.stepsSlider = createSlider(0, 16, initSteps, 1);
    }


    getSequence() {
        let pulsesValue = this.pulsesSlider.value();
        let stepsValue = this.stepsSlider.value();
        if (pulsesValue > stepsValue) pulsesValue = stepsValue;
        if (stepsValue < pulsesValue) stepsValue = pulsesValue;
        return bjorklund(pulsesValue, stepsValue);
    }

    drawClockFace() {
        translate(this.centreX, this.centreY);
        noFill();
        rotate(-PI);
        for(let step in this.getSequence()) {
            if(this.getSequence()[step] === 0){
                fill(100); // grey
                noStroke();
                rect(0, this.radius, this.radius / 10, this.radius / 5, this.radius / 13);
            }
            else if (this.getSequence()[step] === 1) {
                fill(this.color); // color
                noStroke();
                rect(0, this.radius, this.radius / 6, this.radius / 3, this.radius / 10);
            }
            let angle = map(1, 0, this.getSequence().length, 0, 2*PI);
            rotate(angle);
        }
    }

    drawHand(tick) {
        rotate(PI / 2);
        stroke(255); // white
        strokeWeight(3);
        push();
        rotate(map(tick, 0, this.getSequence().length, 0, 2* PI));
        line(0, 0, this.radius + this.radius / 6, 0);
        pop();

        fill(255); // white
        noStroke();
        ellipse(0, 0, 10, 10);
    }

    drawSliders() {
        this.pulsesSlider.position(this.centreX - this.radius, this.centreY + 2 * this.radius);
        this.stepsSlider.position(this.centreX - this.radius, this.centreY + 2 * this.radius + 50);
    }

    playPattern(tick) {
        if (tick != this.currentTick){
            this.isSoundPlayed = false;
            if (this.getSequence()[tick] == 1 && this.isSoundPlayed == false) {
                this.sound.play();
                this.isSoundPlayed == true;
            }
        }
        this.currentTick = tick;
    }

    updateTick(stepTime) {
        if (stepTime <= 0) {
            if (this.tick < this.getSequence().length - 1)
                this.tick++;
            else this.tick = 0;
        }
        return this.tick;
    }
}