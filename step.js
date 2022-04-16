class Step {
    constructor(centreX, radius, isPulse, angle, scale,
                pulseColor, sound, wasPlayed){
        this.centreX = centreX;
        this.radius = radius;
        this.isPulse = isPulse; // 0 or 1
        this.angle = angle;
        this.scale = scale;
        this.pulseColor = pulseColor;
        this.sound = sound;
        // To keep track if the note was played:
        this.isPlayed = wasPlayed;

        this.color;
        this.k_w; // width divider
        this.k_h; // height divider
        this.k_r; // edge radius divider
        this.animationCount = 0;
        this.initStep();
    }

    initStep() {
        if (this.isPulse == 1) {
            this.color = this.pulseColor;
            this.k_w = 6;
            this.k_h = 3;
            this.k_r = 10;
        }
        else {
            this.color = "#aaaaaa";
            this.k_w = 10;
            this.k_h = 5;
            this.k_r = 13;
        }
    }

    // Replace current step value ( this ) with new sequence value
    activatePulse(isPulse) {
        if (this.isPulse == isPulse) return;
        this.isPulse = isPulse;
        // Re-init step with new pulses
        this.initStep();
    }
    
    checkNote() {
        if (this.isPlayed == false) {
            this.isPlayed = true;
            if (this.isPulse == 0) return;
            this.playNote();
            this.playAnimation();
        }
    }

    resetStatus(){
        this.isPlayed = false;
    }

    draw() {
        fill(this.color);
        noStroke();
        push();
        // if animation -> animate step
        this.updateAnimation();
        rect(
            0,
            this.radius,
            this.radius / this.k_w,
            this.radius / this.k_h,
            this.radius / this.k_r
        );
        pop();
    }

    playNote() {
        this.sound.pan(map(this.centreX, 0, WIDTH, -1.0, 1.0));
        this.sound.play();
    }

    playAnimation() {
        this.animationCount = 15;
    }

    updateAnimation() {
        if (this.animationCount <= 0) return;
        this.animationCount--;
        rotate(cos(this.animationCount/2) * 
              (PI / 360) * 
              (this.animationCount / 2));
    }
}