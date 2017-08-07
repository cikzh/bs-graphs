function drawRectangle(x, y, width, height, color): void
{
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function drawColumn(x, y, width, height, color): void
{
    context.beginPath();
    context.rect(x, y - height, width, height);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function drawCircle(x, y, radius, color, beginDegs, endDegs): void
{
    let beginRads = beginDegs * (Math.PI/180);
    let endRads = endDegs * (Math.PI/180);

    context.beginPath();
    context.arc(x, y, radius, beginRads, endRads);
    context.lineTo(x, y);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function drawLine(beginX, beginY, endX, endY): void
{
    context.beginPath();
    context.moveTo(beginX, beginY);
    context.lineTo(endX, endY);
    context.stroke();
    context.closePath();
}

function drawText(text: string, x: number, y: number, color: string = "#000000", size: number = 25, font: string = "Arial"): void
{
    //context.beginPath();
    context.font = size+"px " + font;
    context.fillStyle = color;
    context.fillText(text, x, y);
    //context.closePath();
}
