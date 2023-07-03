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

    update_state(new_state) {
        this.state = new_state;
        for (i = 0; i < this.state.length; i++) {
            connection = this.connection[i];
            if (connection.state != new_state) {
                connection.update_state(new_state);
            }
        }
    }
}