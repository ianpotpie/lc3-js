
// on/off macros
const OFF = 0;
const ON = 1;

// MARMUX
const ZEXT_MARMUX = 0;
const ADD_MARMUX = 1;

// PCMUX
const INC_PCMUX = 0;
const BUS_PCMUX = 1;
const ADD_PCMUX = 2;

// ADDR1MUX
const PC_ADDR1MUX = 0;
const SR1_ADDR1MUX = 1;

// ADDR2MUX
const SEXT10_ADDR2MUX = 0;
const SEXT8_ADDR2MUX = 1;
const SEXT5_ADDR2MUX = 2;
const ZEROS_ADDR2MUX = 3;

// SR2MUX
const SEXT_SR2MUX = 0;
const SR2_SR2MUX = 1;

// ALUK
const ADD_ALUK = 0;
const AND_ALUK = 1;
const NOT_ALUK = 2;
const PASS_ALUK = 3;

// Registers
const R0 = 0;
const R1 = 1;
const R2 = 2;
const R3 = 3;
const R4 = 4;
const R5 = 5;
const R6 = 6;

// RW
const READ = 0;
const WRITE = 1;

// states
const FETCH_S0 = 0;
const FETCH_S1 = 1;
const FETCH_S2 = 2;
const LDBEN_S0 = 3;
const ADD_S0 = 4;
const AND_S0 = 5;
const BR_S0 = 6;
const BR_S1 = 7;
const JMP_S0 = 8;
const JSR_S0 = 9;
const JSR_S1 = 10;
const JSR_S2 = 11;
const LD_S0 = 12;
const LD_S1 = 13;
const LD_S2 = 14;
const LDI_S0 = 15;
const LDI_S1 = 16;
const LDI_S2 = 17;
const LDR_S0 = 18;
const LEA_S0 = 19;
const NOT_S0 = 20;
const RTI_S0 = 16;
const ST_S0 = 17;
const STI_S0 = 18;
const STR_S0 = 19;
const TRAP_S0 = 20;
const RES_S0 = 21;

// instructions
const ADD = 0b0001;
const AND = 0b0101;
const BR = 0b0000;
const JMP = 0b1100;
const JSR = 0b0100;
const LD = 0b0010;
const LDI = 0b1010;
const LDR = 0b0110;
const LEA = 0b1110;
const NOT = 0b1001;
const RTI = 0b1000;
const ST = 0b0011;
const STI = 0b1011;
const STR = 0b0111;
const TRAP = 0b1111;

export class Controller {
    constructor(components) {
        this.state = FETCH0;
        this.ben = 0;

        // Gates
        this.gate_marmux = components.gate_marmux; // 1
        this.gate_pc = components.gate_pc; // 1
        this.gate_alu = components.gate_alu; // 1
        this.gate_mdr = components.gate_mdr; // 1

        // MUX Controllers
        this.marmux = components.marmux; // 1
        this.pcmux = components.pcmux; // 2
        this.addr1mux = components.addr1mux; // 1
        this.addr2mux = components.addr2mux; // 2
        this.sr2mux = components.sr2mux; // 1

        this.drmux = components.drmux; // 3
        this.sr1mux = components.sr1mux; // 3
        this.sr2mux = components.sr2mux; // 3

        this.aluk = components.aluk; // 2

        // Registers
        this.mar = components.mar; // 1
        this.mdr = components.mdr; // 1
        this.ir = components.ir; // 1
        this.reg = components.reg; // 1
        this.cc = components.cc; // 1
        this.pc = components.pc; // 1

        // Memory Controllers
        this.memory = components.memory; // 2 (MEM.EN, RW)

    }

    reset() {
        // Gates
        this.gate_marmux.close();
        this.gate_pc.close();
        this.gate_alu.close();
        this.gate_mdr.close();

        // Register Controllers
        this.mar.lock();
        this.mdr.lock();
        this.ir.lock();
        this.ben.lock();
        this.reg.lock();
        this.cc.lock();
        this.pc.lock();

        // Memory Controllers
        this.memory.off();
    }

    clk_down() {

        this.reset();
        switch (this.state) {
            case FETCH0:
                // MAR <- PC
                this.gate_pc.open();
                this.mar.load();
                // PC <- PC+1
                this.pcmux.set(0b00);
                this.state = FETCH1;
                break;
            case FETCH1:
                // MDR <- MEM
                this.memory.on();
                this.memory.write();
                this.mdr.load();
                if (this.memory.ready()) {
                    this.state = FETCH2;
                }
                break;
            case FETCH2:
                // IR <- MDR
                this.gate_mdr.open();
                this.ir.load();
                this.state = LDBEN;
                break;
            case LDBEN:
                // BEN <- (IR[11] & N) || (IR[10] & Z) || (IR[9] & P)
                let nzp = (this.ir.state >> 9) % 0b1000;
                let NZP = this.cc.state;
                this.ben = (nzp & NZP) ? 1 : 0;

                let instruction = (this.ir.state >> 12);
                switch (instruction) {
                    case 
                }
        }

    }


}