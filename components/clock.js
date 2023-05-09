let clock = {
    state: 0, // the state can either be 0 or 1
    running: false,
    speed: 1, // this is measured in cycles per second
    advance: (n = 1) => {
        for (let i = 0; i < n; i++) {
            clock.state = (clock.state == 0) ? 1 : 0;
            if (clock.state == 1) {
                clock.up_hook();
            } else {
                clock.down_hook();
            }
        }
    },
    run: async () => {
        clock.running = true;
        while (clock.running) {
            await new Promise(r => setTimeout(r, 500 / clock.speed));
            clock.advance();
        }
    },
    stop: () => {
        clock.running = false;
    },
    up_hook: () => {
        console.log(1); // this is by default but should be replaced
    },
    down_hook: () => {
        console.log(0); // this is by default but should be replaced
    },
};