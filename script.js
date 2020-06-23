$(() => {
    // Define variables for drawing on canvas
    const lines = [];
    const canvas = $('#canvas');
    const ctx = canvas[0].getContext('2d');
    let p = {x: 0, y: 0}
    let draw = false;
    const initCanvas = () => {
        ctx.canvas.width = $('body').width();
        ctx.canvas.height = $('body').height();
        ctx.lineWidth = '5';
        ctx.lineCap = 'round';
    }

    // Make the circle draggable
    $('#circle').draggable({containment: 'body'});

    // Update canvas when resized
    $(window).resize(() => {
        initCanvas();
        for (const line of lines) {
            ctx.beginPath();
            ctx.moveTo(line[0][0], line[0][1]);
            ctx.lineTo(line[1][0], line[1][1]);
            ctx.stroke();
        }
    });

    // Update draw variable when mouse is pressed
    canvas.mousedown((e) => { p.x = e.clientX; p.y = e.clientY; draw = true; });
    canvas.mouseup((e) => { draw = false; });
    canvas.mouseleave((e) => { draw = false; });

    // Draw a line when the mouse is moved
    canvas.mousemove((e) => {
        if (draw) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            lines.push([[p.x, p.y], [e.clientX, e.clientY]]);
            p.x = e.clientX;
            p.y = e.clientY;
        }
    });

    // Initialize canvas
    initCanvas();
});
