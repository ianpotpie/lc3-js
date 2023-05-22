import { draw_path, draw_arrow, draw_dbl_arrow, draw_circle, draw_polygon, transform_points } from "./js/utils.js";
import * as draw_lc3 from "./js/draw_lc3.js";

// canvas related variables

var unit_strokeStyle = "black";
var unit_lineWidth = 1.0;
var unit_fillStyle = "red";

var wire_strokeStyle = "orange";
var wire_lineWidth = 2.0;
var wire_fillStyle = "black";
var wire_head_sz = 0.5;

let lc3_img = new Image();
lc3_img.onload = () => {
    var canvas = document.getElementById("LC3");
    canvas.setAttribute("height", 1024);
    canvas.setAttribute("width", 815);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(lc3_img, 0, 0);

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
    draw_lc3.sext(ctx, 328, 466, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.zext(ctx, 57, 262, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_circle(ctx, 185, 626, 4, wire_strokeStyle, wire_lineWidth, wire_fillStyle);
    path = [[185, 650], [185, 626]];
    draw_path(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz);
    path = [[185, 626], [185, 594], [258, 594], [258, 467], [296, 467]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz);
    path = [[185, 626], [289, 626], [289, 536], [423, 536]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz);
    path = [[185, 626], [57, 626], [57, 277]];
    draw_arrow(ctx, path, wire_strokeStyle, wire_lineWidth, wire_fillStyle, wire_head_sz);

    // here we draw the components related to the logic/nzp/FSM
    draw_lc3.logic(ctx, 322, 708, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.nzp(ctx, 322, 654, unit_strokeStyle, unit_lineWidth, unit_fillStyle);
    draw_lc3.fsm(ctx, 462, 590, unit_strokeStyle, unit_lineWidth, unit_fillStyle);


    // this is the bus and wires coming out of the bus
    draw_lc3.bus(ctx, 0, 0, wire_strokeStyle);
};
lc3_img.src = "img/lc3_datapath.png";
