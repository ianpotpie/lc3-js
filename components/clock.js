export class Clock {
    constructor() {
        this.state = 0; // the state can either be 0 or 1
        this.running = false;
        this.speed = 1.0; // this is measured in cycles per second
        this.up_hook = () => {
            console.log(1); // this is by default but should be replaced
        };
        this.down_hook = () => {
            console.log(0); // this is by default but should be replaced
        },
    }

    advance(n = 1) {
        for (let i = 0; i < n; i++) {
            this.state = (this.state == 0) ? 1 : 0;
            if (this.state == 1) {
                this.up_hook();
            } else {
                this.down_hook();
            }
        }
    }

    async run() {
        this.running = true;
        while (this.running) {
            await new Promise(r => setTimeout(r, 500 / this.speed));
            this.advance();
        }
    }

    stop() {
        this.running = false;
    }

};