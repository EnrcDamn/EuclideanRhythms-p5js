class CircleSequencer {
    constructor(centreX, centreY, color, sequence, radius, sound) {
        this.centreX = centreX;
        this.centreY = centreY;
        this.color = color;
        this.sequence = sequence;
        this.radius = radius;
        this.sound = sound;

        this.isSoundPlayed = false;
        this.currentTick = true;
        this.vibration = false;
        this.offStep;
        this.onStep;
        this.tick;
    }

    clockFace() {
        rotate(-PI);
        for(let step in this.sequence) {
            if(this.sequence[step] === 0){
                fill(this.color);
                noStroke();
                this.offStep = rect(0, this.radius, this.radius / 10, this.radius / 5);
            }
            else if (this.sequence[step] === 1) {
                fill(100);
                noStroke();
                this.onStep = rect(0, this.radius, this.radius / 6, this.radius / 3);
                if (this.vibration) {
                    this.onStep.rotate(random(-5/360, 5/360));
                }
            }
            let angle = map(1, 0, this.sequence.length, 0, 2*PI);
            rotate(angle);
        }
    }

    smallRect() {

    }

    hand() {
        rotate(PI / 2);
        stroke(this.color, 20, 100);
        strokeWeight(2.5);
        line(0, 0, this.radius + this.radius / 6, 0);
    }

    playPattern(tick) {
        if (tick != this.currentTick){
            this.isSoundPlayed = false;
            if (this.sequence[tick] == 1 &&this.isSoundPlayed == false && !this.vibration) {
                this.sound.play();
                this.isSoundPlayed == true;
                this.vibration = true;
            }
            this.vibration = false;
        }
        this.currentTick = tick;
    }

    updateTick(stepTime) {
        if (stepTime <= 0) {
            if (this.tick < this.sequence.length - 1)
                this.tick++;
            else this.tick = 0;
        }
        return this.tick;
    }

    render() {
        // Set up circle starting position
        
        translate(this.centreX, this.centreY);
        //rotate(-PI / 2);
        noFill();

        this.clockFace();

        // Rotation
        push();
        rotate(map(this.updateTick(stepTime), 0, this.sequence.length, 0, 2* PI));
        this.hand();
        pop();

        fill(100);
        noStroke();
        ellipse(0, 0, 10, 10);
    }
}