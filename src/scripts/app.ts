//Constants
const CANVAS_WIDTH: number = 600;
const CANVAS_HEIGHT: number = 600;

const FRAME_INTERVAL: number = 33;  // 33 milliseconds = ~30 frames per sec

var canvas: any = document.createElement('canvas');
var context: any = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

document.body.appendChild(canvas);

interface Rectangle {
    width: number;
    height: number;
    r: number;
    g: number;
    b: number;
}

interface PieChart {
    x: number;
    y: number;
    size: number;
    rotation: number;
    colors: string[];
    data: any[];
}

interface ColumnChart {
    x: number;
    y: number;
    width: number;
    height: number;
    columnWidth: number;
    data: number[];
    colors: string[];
}

interface Button {
    x: number;
    y: number;
    width: number;
    height: number;
}

setInterval(GUAR, FRAME_INTERVAL);

let counter: number = 0;

function GUAR(): void
{
    //NOTE: Clear Background
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRectangle(btnPieChart.x, btnPieChart.y, btnPieChart.width, btnPieChart.height, "#aaaaaa");
    drawText("Pie Chart", btnPieChart.x + 16, 21, "#000000", 18);
    drawRectangle(btnColumnChart.x, btnColumnChart.y, btnColumnChart.width, btnColumnChart.height, "#aaaaaa");
    drawText("Column Chart", btnColumnChart.x + 16, 21, "#000000", 18);

    if(shouldDrawPieChart)
        drawPieChart(pieChart);
    if(shouldDrawColumnChart)
        drawColumnChart(columnChart);

}

function drawColumnChart(chart: ColumnChart)
{
    let highestValue = getHighestValue(chart.data);
    
    drawText(highestValue.toString(), chart.x - 35, chart.y, "#000000", 25, "Courier New");

    // Draw axis
    drawLine(chart.x, chart.y, chart.x, chart.y + chart.height);
    drawLine(chart.x, chart.y + chart.height, chart.x + chart.width, chart.y + chart.height);

    let chartBaseLine = chart.y + chart.height;

    let margin:number = chart.width / chart.data.length;
    for(let itemIndex in chart.data)
    {        
        let columnX: number = chart.x + 10 + (margin * +itemIndex);
        let columnHeight = (chart.data[itemIndex] / highestValue) * chart.height;

        //TODO: wrap around color array
        drawColumn(columnX, chartBaseLine - 1, chart.columnWidth, columnHeight, chart.colors[+itemIndex % chart.colors.length]);
    }
}

function drawPieChart(chart: PieChart)
{
    let lastSliceDeg: number = 0;
    let total:number = getArraySum(chart.data);
    
    
    for(let itemIndex in chart.data)
    {
        let beginDeg:number = lastSliceDeg;
        let endDeg:number = (beginDeg + (360 * chart.data[itemIndex]) / total);

        //TODO: wrap around color array
        drawCircle(chart.x, chart.y, chart.size, chart.colors[+itemIndex % chart.colors.length], beginDeg - chart.rotation, endDeg - chart.rotation);

        lastSliceDeg = endDeg;
    }
    
}

var shouldDrawPieChart = true;
var shouldDrawColumnChart = false;

function getMousePos(canvas, event) {
    var canvasRect = canvas.getBoundingClientRect();
    return {
	x: event.clientX - canvasRect.left,
	y: event.clientY - canvasRect.top
    };
}

canvas.addEventListener(
    'click',
    function(event)
    {
	var mousePos = getMousePos(canvas, event);
        if (isInside(mousePos, btnPieChart))
        {
            btnPieChartClicked();
        }
        else if(isInside(mousePos, btnColumnChart))
        {
            btnColumnChartClicked();    
        }
    }, false);

var btnPieChart: Button = {
    x: 0,
    y: 0,
    width: 110,
    height: 30    
};

var btnColumnChart: Button = {
    x: 120,
    y: 0,
    width: 140,
    height: 30    
};

function isInside(pos, rect)
{
    return pos.x > rect.x &&
        pos.x < rect.x + rect.width
        && pos.y < rect.y + rect.height
        && pos.y > rect.y
}

function btnPieChartClicked()
{
    shouldDrawPieChart = true;
    shouldDrawColumnChart = false;
}

function btnColumnChartClicked()
{
    shouldDrawPieChart = false;
    shouldDrawColumnChart = true;
}
