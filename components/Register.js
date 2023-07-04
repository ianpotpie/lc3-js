class Register {
    constructor() {
        this.load = false;
        this.input = null;
        this.state = null;
        this.connections = [];
    }

    set_load(load) {
        this.load = load;
    }

    connect(connection) {
        if (!this.connections.includes(connection)) {
            this.connections.push(connection);
        }
    }

    clk_up() {
        // The state of the register is only updated if it receives a "load" signal from the FSM.
        if (this.load) {
            this.state = this.input;
        }

        // No matter whether the state is changed, the register tries to propagate its state.
        for (i = 0; i < this.connections.length; i++) {
            connection = this.connection[i];
            if (connection.state != new_state) {
                connection.set(input);
            }
        }
    }

    set(input) {
        // Calling "set" on a register does not change the state until the register detects
        // a rising clock edge. Instead, "set" primes the register by setting the input value.
        this.input = input;
    }
}