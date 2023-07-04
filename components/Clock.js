class Clock {
    constructor() {
        this.state = 0; // the state can either be 0 or 1
        this.interval = null;
        this.speed = 1.0; // this is measured in cycles per second
    }

    advance(clk_up = () => console.log(1), clk_down = () => console.log(0)) {
        if (this.state == 0) {
            this.state = 1;
            clk_up();
        } else {
            this.state = 0;
            clk_down();
        }
    }

    run(clk_up = () => console.log(1), clk_down = () => console.log(0)) {
        if (this.interval != null) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => this.advance(clk_up, clk_down), 1000 / this.speed);
    }

    stop() {
        if (this.interval != null) {
            clearInterval(this.interval);
        }
    }

}

clk = new Clock();
clk.run();