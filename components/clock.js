class Clock {
    constructor() {
        this.state = 0; // the state can either be 0 or 1
        this.interval = null;
        this.speed = 1.0; // this is measured in cycles per second
        this.up_hook = () => {
            console.log(1); // this is by default but should be replaced
        };
        this.down_hook = () => {
            console.log(0); // this is by default but should be replaced
        };
    }

    advance(n = 1) {
        for (let i = 0; i < n; i++) {
            if (this.state == 0) {
                this.state = 1;
                this.up_hook();
            } else {
                this.state = 0;
                this.down_hook();
            }
        }
    }

    run() {
        if (this.interval != null) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => this.advance(), 1000 / this.speed);
    }

    stop() {
        if (this.interval != null) {
            clearInterval(this.interval);
        }
    }

}