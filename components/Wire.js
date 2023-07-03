class Wire {
    constructor() {
        this.state = 0;
        this.connections = [];
    }

    connect(connection) {
        if (!this.connections.includes(connection)) {
            this.connections.push(connection);
        }
    }

    set(input) {
        this.state = input;
        for (i = 0; i < this.state.length; i++) {
            connection = this.connection[i];
            if (connection.state != new_state) {
                connection.set(input);
            }
        }
    }
}