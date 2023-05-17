// function to draw the line
export function draw_line(ctx, x0, y0, x1, y1, strokeStyle = "black", lineWidth = 1.0) {
    // save the previous styles
    let prev_lineWidth = ctx.lineWidth;
    let prev_strokeStyle = ctx.strokeStyle;
    // apply styles
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    // draw the line
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.stroke();
    // reset the styles
    ctx.lineWidth = prev_lineWidth;
    ctx.strokeStyle = prev_strokeStyle;
}

export function draw_circle(ctx, x, y, r, strokeStyle = "black", lineWidth = 1.0, fillStyle = "black") {
    // save the previous styles
    let prev_strokeStyle = ctx.strokeStyle;
    let prev_lineWidth = ctx.lineWidth;
    let prev_fillStyle = ctx.fillStyle;
    // apply the styles
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillStyle;
    // draw the circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    // reset the styles
    ctx.strokeStyle = prev_strokeStyle;
    ctx.lineWidth = prev_lineWidth;
    ctx.fillStyle = prev_fillStyle;
}

// function to draw a polygon on canvas defined by a set of points
export function draw_polygon(ctx, points, strokeStyle = "black", lineWidth = 1.0, fillStyle = "black") {
    // save the previous styles
    let prev_strokeStyle = ctx.strokeStyle;
    let prev_lineWidth = ctx.lineWidth;
    let prev_fillStyle = ctx.fillStyle;
    // apply the styles
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillStyle;
    // draw the lines of the polygon
    let x_start = points[0][0];
    let y_start = points[0][1];
    ctx.beginPath();
    ctx.moveTo(x_start, y_start);
    for (let i = 0; i < points.length; i++) {
        let x = points[i][0];
        let y = points[i][1];
        ctx.lineTo(x, y);
    }
    ctx.lineTo(x_start, y_start);
    ctx.closePath();
    if (fillStyle != null) {
        ctx.fill();
    }
    ctx.stroke();
    // reset the styles
    ctx.strokeStyle = prev_strokeStyle;
    ctx.lineWidth = prev_lineWidth;
    ctx.fillStyle = prev_fillStyle;
}

// checks whether the given point is inside the polygon (defined by a set of points)
export function inside_polygon(point, polygon) {
    let x = point[0], y = point[1];
    let inside = false;
    for (let j = 0, i = polygon.length - 1; j < polygon.length; i = j++) {
        let xi = polygon[i][0], yi = polygon[i][1];
        let xj = polygon[j][0], yj = polygon[j][1];
        let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside != inside;
    }
    return inside;
}

export function transform_points(points, x = 0, y = 0, scale = 1, rotation = 0) {
    let new_points = [];
    for (let i = 0; i < points.length; i++) {
        let px = points[i][0];
        let py = points[i][1];
        let radius = Math.sqrt(px ** 2 + py ** 2);
        let angle = Math.atan2(py, px);
        angle = angle + rotation;
        px = scale * radius * Math.cos(angle);
        py = scale * radius * Math.sin(angle);
        new_points.push([px + x, py + y]);
    }
    return new_points;
}

export function draw_path(ctx, path, strokeStyle = "black", lineWidth = 1.0, fillStyle = "black") {
    // save the previous styles
    let prev_strokeStyle = ctx.strokeStyle;
    let prev_lineWidth = ctx.lineWidth;
    let prev_fillStyle = ctx.fillStyle;
    // apply the styles
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillStyle;
    // draw the tail of the arrow
    let x_start = path[0][0];
    let y_start = path[0][1];
    ctx.beginPath();
    ctx.moveTo(x_start, y_start);
    for (let i = 0; i < path.length; i++) {
        let x = path[i][0];
        let y = path[i][1];
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    // reset the styles
    ctx.strokeStyle = prev_strokeStyle;
    ctx.lineWidth = prev_lineWidth;
    ctx.fillStyle = prev_fillStyle;
}

export function draw_arrow(ctx, path, strokeStyle = "black", lineWidth = 1.0, fillStyle = "black", head_sz = 1.0) {
    // draw the tail of the arrow
    draw_path(ctx, path, strokeStyle, lineWidth, fillStyle);
    // draw the head of the arrow
    let x_end = path[path.length - 1][0], y_end = path[path.length - 1][1];
    let x_prv = path[path.length - 2][0], y_prv = path[path.length - 2][1];
    let angle = Math.atan2(y_end - y_prv, x_end - x_prv);
    let triangle = [[0, 0], [-1, -0.5], [-1, 0.5]];
    triangle = transform_points(triangle, x_end, y_end, head_sz * 10 * lineWidth, angle);
    draw_polygon(ctx, triangle, strokeStyle, lineWidth, fillStyle);
}

export function draw_dbl_arrow(ctx, path, strokeStyle = "black", lineWidth = 1.0, fillStyle = "black", head_sz = 1.0) {
    // draw the forward arrow
    draw_arrow(ctx, path, strokeStyle, lineWidth, fillStyle, head_sz);
    // draw the 2nd head of the arrow
    let x1 = path[0][0], y1 = path[0][1];
    let x2 = path[1][0], y2 = path[1][1];
    let angle = Math.atan2(y1 - y2, x1 - x2);
    let triangle = [[0, 0], [-1, -0.5], [-1, 0.5]];
    triangle = transform_points(triangle, x1, y1, head_sz * 10 * lineWidth, angle);
    draw_polygon(ctx, triangle, strokeStyle, lineWidth, fillStyle);
}
