export class Memory {
    constructor(n_bits = 16) {
        this.length = 2 ** n_bits;
        this.mem = Array(this.length).fill(0);
    }

    get_word(addr) {
        return this.mem[addr];
    }

    set_word(addr, val) {
        this.mem[addr] = val;
    }
}