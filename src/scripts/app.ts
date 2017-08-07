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

setInterval(GUAR, FRAME_INTERVAL);

let counter: number = 0;

function GUAR(): void
{
    //NOTE: Clear Background
    context.clearRect(0, 0, canvas.width, canvas.height);

    //drawPieChart(pieChart);
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
        drawColumn(columnX, chartBaseLine - 1, chart.columnWidth, columnHeight, chart.colors[itemIndex]);
    }
}

function drawPieChart(chart: PieChart)
{
    let lastSliceDeg: number = 0;
    let total:number = getArraySum(chart.data);
    
    
    for(let itemIndex in chart.data)
    {
        let beginDeg = lastSliceDeg;
        let endDeg = (beginDeg + (360 * chart.data[itemIndex]) / total);

        //TODO: wrap around color array
        drawCircle(chart.x, chart.y, chart.size, chart.colors[itemIndex], beginDeg - chart.rotation, endDeg - chart.rotation);

        lastSliceDeg = endDeg;
    }
    
}
