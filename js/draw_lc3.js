import { draw_path, draw_arrow, draw_dbl_arrow, draw_circle, draw_polygon, transform_points } from "./utils.js";

export function gate(ctx, x, y, sz, angle) {
    let ref_points = [[], [], []];
}

export function bus(ctx, x, y, strokeStyle = "black", lineWidth = 10.0, fillStyle = null, sz = 1.0, angle = 0.0) {
    let path = [[32, 25], [793, 25], [793, 762], [32, 762]];
    path = transform_points(path, x, y, sz, angle);
    draw_dbl_arrow(ctx, path, strokeStyle, lineWidth, fillStyle, 0.15);
}

export function ir(ctx, x, y, strokeStyle = "black", lineWidth = 1.0, fillStyle = null, sz = 12.0, angle = 0.0) {
    let ref_points = [[-3.5, 1], [-3.5, -1], [3.5, -1], [3.5, 1]];
    let points = transform_points(ref_points, x, y, sz, angle);
    draw_polygon(ctx, points, strokeStyle, lineWidth, fillStyle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = String(1.5 * sz) + "px" + " arial";
    ctx.fillText("IR", x, y);
}

export function logic(ctx, x, y, strokeStyle = "black", lineWidth = 1.0, fillStyle = null, sz = 15.0, angle = 0.0) {
    let ref_points = [[-2, 1], [-2, -1], [2, -1], [2, 1]];
    let points = transform_points(ref_points, x, y, sz, angle);
    draw_polygon(ctx, points, strokeStyle, lineWidth, fillStyle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = String(1.2 * sz) + "px" + " arial";
    ctx.fillText("LOGIC", x, y);
}

export function sext(ctx, x, y, strokeStyle = "black", lineWidth = 1.0, fillStyle = null, sz = 15.0, angle = 0.0) {
    let ref_points = [[-2, 1], [-2, -1], [2, -1], [2, 1]];
    let points = transform_points(ref_points, x, y, sz, angle);
    draw_polygon(ctx, points, strokeStyle, lineWidth, fillStyle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = String(1.3 * sz) + "px" + " arial";
    ctx.fillText("SEXT", x, y);
}

export function zext(ctx, x, y, strokeStyle = "black", lineWidth = 1.0, fillStyle = null, sz = 15.0, angle = 0.0) {
    let ref_points = [[-2, 1], [-2, -1], [2, -1], [2, 1]];
    let points = transform_points(ref_points, x, y, sz, angle);
    draw_polygon(ctx, points, strokeStyle, lineWidth, fillStyle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = String(1.3 * sz) + "px" + " arial";
    ctx.fillText("ZEXT", x, y);
}

export function pcmux(ctx, x, y, strokeStyle = "black", lineWidth = 1.0, fillStyle = null, sz = 15.0, angle = 0.0) {
    let ref_points = [[-3.077, 1], [-1.923, -1], [1.923, -1], [3.077, 1]];
    let points = transform_points(ref_points, x, y, sz, angle);
    draw_polygon(ctx, points, strokeStyle, lineWidth, fillStyle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = String(1.1 * sz) + "px" + " arial";
    ctx.fillText("PCMUX", x, y);
}

export function marmux(ctx, x, y, strokeStyle = "black", lineWidth = 1.0, fillStyle = null, sz = 15.0, angle = 0.0) {
    let ref_points = [[-3.077, 1], [-1.923, -1], [1.923, -1], [3.077, 1]];
    let points = transform_points(ref_points, x, y, sz, angle);
    draw_polygon(ctx, points, strokeStyle, lineWidth, fillStyle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = String(0.9 * sz) + "px" + " arial";
    ctx.fillText("MARMUX", x, y);
}

export function addr2mux(ctx, x, y, strokeStyle = "black", lineWidth = 1.0, fillStyle = null, sz = 13.0, angle = 0.0) {
    let ref_points = [[-5.077, 1], [-3.923, -1], [3.923, -1], [5.077, 1]];
    let points = transform_points(ref_points, x, y, sz, angle);
    draw_polygon(ctx, points, strokeStyle, lineWidth, fillStyle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = String(1.3 * sz) + "px" + " arial";
    ctx.fillText("ADDR2 MUX", x, y);
}

export function addr1mux(ctx, x, y, strokeStyle = "black", lineWidth = 1.0, fillStyle = null, sz = 13.0, angle = 0.0) {
    let ref_points = [[-5.077, 1], [-3.923, -1], [3.923, -1], [5.077, 1]];
    let points = transform_points(ref_points, x, y, sz, angle);
    draw_polygon(ctx, points, strokeStyle, lineWidth, fillStyle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = String(1.3 * sz) + "px" + " arial";
    ctx.fillText("ADDR1 MUX", x, y);
}

export function adder(ctx, x, y, strokeStyle = "black", lineWidth = 1.0, fillStyle = null, sz = 20.0, angle = 0.0) {
    let ref_points = [[0, 0.75], [-0.289, 1.25], [-2.577, 1.25], [-1.423, -0.75], [1.423, -0.75], [2.577, 1.25], [0.289, 1.25]];
    let points = transform_points(ref_points, x, y, sz, angle);
    draw_polygon(ctx, points, strokeStyle, lineWidth, fillStyle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = String(sz) + "px" + " arial";
    ctx.fillText("+", x, y);
}

export function alu(ctx, x, y, strokeStyle = null, lineWidth = 1.0, fillStyle = null, sz = 24.0, angle = 0.0) {
    let ref_points = [[0, -0.75], [-0.289, -1.25], [-2.577, -1.25], [-1.423, 0.75], [1.423, 0.75], [2.577, -1.25], [0.289, -1.25]];
    let points = transform_points(ref_points, x, y, sz, angle);
    draw_polygon(ctx, points, strokeStyle, lineWidth, fillStyle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = String(1.0 * sz) + "px" + " arial";
    ctx.fillText("ALU", x, y);
}