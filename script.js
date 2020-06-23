$(() => {
    const canvas = $('#canvas');
    const ctx = canvas[0].getContext('2d');
    ctx.canvas.width = $(document).width();
    ctx.canvas.height = $(document).height();

    $(window).resize(() => {
        ctx.canvas.width = $(document).width();
        ctx.canvas.height = $(document).height();
        ctx.lineWidth = '5';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (const point of points) {
            ctx.lineTo(point[0], point[1]);
        }
        ctx.stroke();
    });

    $('#circle').draggable({containment: 'document'});

    const points = [];
    let p = {x: 0, y: 0}
    let draw = false;

    canvas.mousedown((e) => {
        p.x = e.clientX;
        p.y = e.clientY;
        points.push([p.x, p.y]);
        draw = true;
    });

    canvas.mouseup((e) => {
        draw = false;
    });

    canvas.mouseleave((e) => {
        draw = false;
    });

    canvas.mousemove((e) => {
        if (draw) {
            ctx.lineWidth = '5';
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            p.x = e.clientX;
            p.y = e.clientY;
            points.push([p.x, p.y]);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        }
    });
});
