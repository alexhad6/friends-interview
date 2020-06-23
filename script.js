$(() => {
    const lines = [];
    const canvas = $('#canvas');
    const ctx = canvas[0].getContext('2d');
    
    let p = {x: 0, y: 0}
    let draw = false;
    
    const setCanvas = () => {
        ctx.canvas.width = $('body').width();
        ctx.canvas.height = $('body').height();
        ctx.lineWidth = '5';
        ctx.lineCap = 'round';
    }

    $(window).resize(() => {
        setCanvas();
        for (const line of lines) {
            ctx.beginPath();
            ctx.moveTo(line[0][0], line[0][1]);
            ctx.lineTo(line[1][0], line[1][1]);
            ctx.stroke();
        }
    });

    $('#circle').draggable({containment: 'body'});

    canvas.mousedown((e) => {
        p.x = e.clientX;
        p.y = e.clientY;
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
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            lines.push([[p.x, p.y], [e.clientX, e.clientY]]);
            p.x = e.clientX;
            p.y = e.clientY;
        }
    });

    setCanvas();
});
