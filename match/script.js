$(() => {
    // Define variables for drawing on canvas
    const lines = [];
    const canvas = $('#canvas');
    const ctx = canvas[0].getContext('2d');
    let p = {x: 0, y: 0}
    let draw = false;
    const initCanvas = () => {
        const width = $('body').width();
        const height = $('body').height();
        const scale = window.devicePixelRatio;
        canvas.width(width);
        canvas.height(height);
        canvas[0].width = Math.floor(width * scale);
        canvas[0].height = Math.floor(height * scale);
        ctx.scale(scale, scale);
        ctx.lineWidth = '5';
        ctx.lineCap = 'round';
    }

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

    canvas.on('touchstart', (e) => { console.log("start"); p.x = e.clientX; p.y = e.clientY; draw = true; });
    canvas.on('touchend', (e) => { console.log("stop"); draw = false; });
    canvas.on('touchcancel', (e) => { console.log("cancel"); draw = false; });
    

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

    canvas.on('touchmove', (e) => {
        const touch = e.originalEvent.touches[0];
        if (draw) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(touch.clientX, touch.clientY);
            ctx.stroke();
            lines.push([[p.x, p.y], [touch.clientX, touch.clientY]]);
            p.x = touch.clientX;
            p.y = touch.clientY;
        }
    });

    // Initialize canvas
    initCanvas();
});
