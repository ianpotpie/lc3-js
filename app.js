import { draw_path, draw_arrow, draw_dbl_arrow, draw_circle, draw_polygon, transform_points, draw_line } from "./js/utils.js";
import * as draw_lc3 from "./js/draw_lc3.js";

// canvas related variables

const UNIT_STROKESTYLE = "black";
const UNIT_LINEWIDTH = 1.0;
const UNIT_FILLSTYLE = "grey";

const WIRE_STROKESTYLE = "black";
const WIRE_LINEWIDTH = 2.0;
const WIRE_FILLSTYLE = "black";
const WIRE_HEADSZ = 0.3;

const BUS_STROKESTYLE = "black";
const BUS_LINEWIDTH = 10.0;
const BUS_FILLSTYLE = "black";
const BUS_HEADSZ = 0.15;

let lc3_img = new Image();
lc3_img.onload = () => {
    var canvas = document.getElementById("LC3");
    canvas.setAttribute("height", 1024);
    canvas.setAttribute("width", 815);
    var ctx = canvas.getContext("2d");
    // ctx.drawImage(lc3_img, 0, 0);

    // Render the Bus

    let path = [[32, 25], [793, 25], [793, 762], [32, 762]];
    draw_dbl_arrow(ctx, path, BUS_STROKESTYLE, BUS_LINEWIDTH, BUS_FILLSTYLE, BUS_HEADSZ); // Bus

    // Render Memory

    path = [[366, 762], [366, 833]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Bus -> MAR

    draw_lc3.mar(ctx, 364, 846, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    path = [[366, 856], [366, 930], [327, 930]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // MAR -> Memory

    draw_lc3.memory(ctx, 253, 930, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    path = [[157, 762], [157, 833]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Bus -> MDR

    draw_lc3.mdr(ctx, 142, 846, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    path = [[157, 856], [157, 910], [180, 910]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // MDR -> Memory

    path = [[181, 950], [127, 950], [127, 859]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // MDR -> Memory

    // Render Register File + SR2MUX + ALU

    path = [[657, 25], [657, 112]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Bus -> Reg File

    draw_lc3.reg_file(ctx, 657, 195, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    path = [[625, 275], [625, 489]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Reg File -> SR2MUX

    draw_lc3.sr2mux(ctx, 610, 506, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    path = [[610, 521], [610, 560]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // SR2MUX -> ALU

    path = [[689, 275], [689, 560]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Reg File -> ALU

    draw_lc3.alu(ctx, 650, 592, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    // Render ADDR2MUX + ADDR1MUX + Adder

    draw_circle(ctx, 689, 442, 4, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE); // Reg Hub
    path = [[689, 442], [330, 442], [330, 390]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Reg Hub -> ADDR1MUX

    draw_circle(ctx, 393, 81, 4, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE); // PC Hub
    path = [[393, 81], [513, 81], [513, 416], [404, 416], [404, 390]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // PC Hub -> ADDR1MUX

    draw_lc3.addr1mux(ctx, 367, 375, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    path = [[367, 361], [367, 350], [324, 350], [324, 331]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // ADDR1MUX -> Adder

    draw_lc3.addr2mux(ctx, 210, 375, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    path = [[210, 361], [210, 350], [270, 350], [270, 331]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // ADDR2MUX -> Adder

    draw_lc3.adder(ctx, 297, 304, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    path = [[297, 288], [297, 258]];
    draw_path(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE); // Adder -> Adder hub
    draw_circle(ctx, 297, 258, 4, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE); // Adder hub
    path = [[297, 258], [393, 258], [393, 203]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Adder hub -> PCMUX
    path = [[297, 258], [201, 258], [201, 139]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Adder hub -> MARMUX

    draw_lc3.marmux(ctx, 177, 122, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    draw_line(ctx, 177, 107, 177, 61, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_LINEWIDTH); // MARMUX -> GateMARMUX
    draw_lc3.gate(ctx, 177, 45, 8); // GateMARMUX
    draw_line(ctx, 177, 45, 177, 25, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_LINEWIDTH); // GateMARMUX -> Bus

    path = [[282, 25], [282, 233], [361, 233], [361, 203]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Bus -> PCMUX

    draw_lc3.pcmux(ctx, 393, 186, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    path = [[393, 171], [393, 131]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // PCMUX -> PC

    draw_lc3.pc(ctx, 393, 117, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    draw_line(ctx, 393, 105, 393, 61, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_LINEWIDTH); // PC -> GatePC
    draw_lc3.gate(ctx, 393, 45, 8); // GatePC
    draw_line(ctx, 393, 45, 393, 25, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_LINEWIDTH); // GatePC -> Bus

    draw_circle(ctx, 473, 81, 4, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE); // +1 hub
    path = [[473, 81], [473, 136]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // +1 hub -> +1

    draw_lc3.incrementor(ctx, 473, 153, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

    path = [[473, 168], [473, 258], [425, 258], [425, 203]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // +1 -> PCMUX

    draw_lc3.ir(ctx, 186, 662, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);
    draw_lc3.sext(ctx, 125, 466, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);
    draw_lc3.sext(ctx, 125, 515, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);
    draw_lc3.sext(ctx, 125, 564, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);
    path = [[185, 762], [185, 676]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Bus -> IR
    path = [[185, 650], [185, 626]];
    draw_path(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // IR -> IR hub
    draw_circle(ctx, 185, 626, 4, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE); // IR hub

    path = [[185, 626], [185, 594], [258, 594], [258, 467], [296, 467]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // IR hub -> [4:0] SEXT
    draw_lc3.sext(ctx, 328, 466, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);
    path = [[358, 467], [593, 467], [593, 489]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // [4:0] SEXT -> SR2MUX

    path = [[185, 626], [289, 626], [289, 536], [424, 536]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // IR hub -> FSM

    path = [[185, 626], [57, 626], [57, 279]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // IR hub -> [7:0] ZEXT
    draw_lc3.zext(ctx, 57, 262, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);
    path = [[57, 246], [57, 194], [153, 194], [153, 139]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // [7:0] ZEXT -> MARMUX

    draw_circle(ctx, 57, 466, 4, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE); // [5:0] SEXT hub
    path = [[57, 466], [93, 466]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // [5:0] SEXT hub ->  [5:0] SEXT
    path = [[155, 466], [161, 466], [161, 390]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // [5:0] SEXT -> ADDR2 MUX

    draw_circle(ctx, 57, 515, 4, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE); // [8:0] SEXT hub
    path = [[57, 515], [93, 515]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // [8:0] SEXT hub ->  [8:0] SEXT
    path = [[155, 515], [193, 515], [193, 390]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // [8:0] SEXT -> ADDR2 MUX

    draw_circle(ctx, 57, 564, 4, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE); // [10:0] SEXT hub
    path = [[57, 564], [93, 564]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // [10:0] SEXT hub ->  [10:0] SEXT
    path = [[155, 564], [226, 564], [226, 390]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // [10:0] SEXT -> ADDR2 MUX

    path = [[258, 430], [258, 390]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // 0 -> ADDR2 MUX

    path = [[322, 762], [322, 725]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // Bus -> LOGIC
    draw_lc3.logic(ctx, 322, 708, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);
    path = [[322, 692], [322, 666]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // LOGIC -> NZP
    draw_lc3.nzp(ctx, 322, 654, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);
    path = [[322, 644], [322, 603], [424, 603]];
    draw_arrow(ctx, path, WIRE_STROKESTYLE, WIRE_LINEWIDTH, WIRE_FILLSTYLE, WIRE_HEADSZ); // NZP -> FSM
    draw_lc3.fsm(ctx, 462, 590, UNIT_STROKESTYLE, UNIT_LINEWIDTH, UNIT_FILLSTYLE);

};
lc3_img.src = "img/lc3_datapath.png";
