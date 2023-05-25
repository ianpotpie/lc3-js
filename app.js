import { draw_path, draw_arrow, draw_dbl_arrow, draw_circle, draw_polygon, transform_points } from "./js/utils.js";
import * as draw_lc3 from "./js/draw_lc3.js";

// canvas related variables

var unit_strokeStyle = "black";
var unit_lineWidth = 1.0;
var unit_fillStyle = "grey";

var wire_strokeStyle = "black";
var wire_lineWidth = 2.0;
var wire_fillStyle = "black";
var wire_head_sz = 0.3;

let lc3_img = new Image();
lc3_img.onload = () => {
    var canvas = document.getElementById("LC3");
    canvas.setAttribute("height", 1024);
    canvas.setAttribute("width", 815);
    var ctx = canvas.getContext("2d");
    // ctx.drawImage(lc3_img, 0, 0);

    // these are the large components related to addition
    draw_lc3.adder(ctx, 297, 304, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.addr2mux(ctx, 210, 375, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    let path = [[210, 361], [210, 350], [270, 350], [270, 331]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz);
    draw_lc3.addr1mux(ctx, 367, 375, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    path = [[367, 361], [367, 350], [324, 350], [324, 331]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz);

    draw_lc3.reg_file(ctx, 657, 195, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.sr2mux(ctx, 610, 506, unit_strokeStyle, unit_lineWidth, unit_fillStyle);

    draw_lc3.marmux(ctx, 177, 122, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.pcmux(ctx, 393, 186, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.pc(ctx, 393, 117, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.incrementor(ctx, 473, 153, unit_strokeStyle, unit_lineWidth, unit_fillStyle);

    draw_lc3.alu(ctx, 650, 592, unit_strokeStyle, unit_lineWidth, unit_fillStyle);

    // these are the wires coming out of the Instruction Register
    draw_lc3.ir(ctx, 186, 662, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.sext(ctx, 125, 466, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.sext(ctx, 125, 515, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.sext(ctx, 125, 564, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    path = [[185, 762], [185, 676]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // Bus -> IR
    path = [[185, 650], [185, 626]];
    draw_path(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // IR -> IR hub
    draw_circle(ctx, 185, 626, 4, wire_strokeStyle, wire_lineWidth, wire_fillStyle); // IR hub

    path = [[185, 626], [185, 594], [258, 594], [258, 467], [296, 467]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // IR hub -> [4:0] SEXT
    draw_lc3.sext(ctx, 328, 466, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    path = [[358, 467], [593, 467], [593, 489]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // [4:0] SEXT -> SR2MUX

    path = [[185, 626], [289, 626], [289, 536], [424, 536]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // IR hub -> FSM

    path = [[185, 626], [57, 626], [57, 279]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // IR hub -> [7:0] ZEXT
    draw_lc3.zext(ctx, 57, 262, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    path = [[57, 246], [57, 194], [153, 194], [153, 139]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // [7:0] ZEXT -> MARMUX

    draw_circle(ctx, 57, 466, 4, wire_strokeStyle, wire_lineWidth, wire_fillStyle); // [5:0] SEXT hub
    path = [[57, 466], [93, 466]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // [5:0] SEXT hub ->  [5:0] SEXT
    path = [[155, 466], [161, 466], [161, 390]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // [5:0] SEXT -> ADDR2 MUX

    draw_circle(ctx, 57, 515, 4, wire_strokeStyle, wire_lineWidth, wire_fillStyle); // [8:0] SEXT hub
    path = [[57, 515], [93, 515]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // [8:0] SEXT hub ->  [8:0] SEXT
    path = [[155, 515], [193, 515], [193, 390]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // [8:0] SEXT -> ADDR2 MUX

    draw_circle(ctx, 57, 564, 4, wire_strokeStyle, wire_lineWidth, wire_fillStyle); // [10:0] SEXT hub
    path = [[57, 564], [93, 564]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // [10:0] SEXT hub ->  [10:0] SEXT
    path = [[155, 564], [226, 564], [226, 390]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // [10:0] SEXT -> ADDR2 MUX

    path = [[258, 430], [258, 390]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // 0 -> ADDR2 MUX

    // here we draw the components related to the logic/nzp/FSM
    draw_lc3.logic(ctx, 322, 708, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.nzp(ctx, 322, 654, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.fsm(ctx, 462, 590, unit_strokeStyle, unit_lineWidth, unit_fillStyle);

    path = [[322, 762], [322, 725]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // Bus -> LOGIC
    path = [[322, 692], [322, 666]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // LOGIC -> NZP
    path = [[322, 644], [322, 603], [424, 603]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz); // NZP -> FSM

    // we draw the components related to memory
    draw_lc3.mar(ctx, 364, 846, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.memory(ctx, 253, 930, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.mdr(ctx, 142, 846, unit_strokeStyle, unit_lineWidth, unit_fillStyle);

    // this is the bus and wires coming out of the bus
    draw_lc3.bus(ctx, 0, 0, wire_strokeStyle);
};
lc3_img.src = "img/lc3_datapath.png";
