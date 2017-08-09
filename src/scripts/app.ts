declare var createjs: any;

var stage, output;

function init()
{

    stage = new createjs.Stage("graph");
    
    // to get onMouseOver & onMouseOut events, we need to enable them on the stage:
    stage.enableMouseOver();
    stage.addChild(output);

    var pc = drawPieChart(pieChart);
    stage.addChild(pc);    
    // add a handler for all the events we're interested in:
    
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

function tick()
{
    console.log("tick");
}

function handleMouseEvent(event) {
    if(event.type === 'mouseover')
    {
        createjs.Tween.get(event.target).to({scaleX: 1.15}, 100);
        createjs.Tween.get(event.target).to({scaleY: 1.15}, 100);
    }
    else if (event.type === 'mouseout')
    {
        createjs.Tween.get(event.target).to({scaleX: 1.0}, 100);
        createjs.Tween.get(event.target).to({scaleY: 1.0}, 100);
    }
}

function drawPieChart(chart: PieChart): any
{
    //TODO: Beautify cide
    var container = new createjs.Container().set({x:chart.x, y:chart.y});
    let shapes: any[] = [];
    if(chart.stroke)
    {
        //shape.graphics.s(chart.stroke.color).ss(chart.stroke.thickness);
    }
    
    let total = getArraySum(chart.data);
    let lastSliceDeg = chart.rotation - 90;

    for(let itemIndex in chart.data)
    {
        //TODO: Units to degrees
        
        var beginDeg = lastSliceDeg;
        var endDeg = beginDeg + (360 * chart.data[itemIndex]) / total;//Math.min(360, angle + thisArc - chart.sliceMargin) * Math.PI / 180;
        var slice = new createjs.Shape();
        
        slice.graphics.beginFill(chart.colors[+itemIndex % chart.colors.length]);
        slice.graphics.moveTo(0, 0);
        slice.graphics.arc(0, 0, chart.size, beginDeg * Math.PI / 180, (endDeg - chart.sliceMargin) * Math.PI / 180);
        slice.graphics.lineTo(0, 0);
        container.addChild(slice);
        lastSliceDeg = endDeg;

        slice.on("click", handleMouseEvent);
        slice.on("dblclick", handleMouseEvent);
        slice.on("mouseover", handleMouseEvent);
        slice.on("mouseout", handleMouseEvent);

    }
    return container;
}
/*const FRAME_INTERVAL: number = 33;  // 33 milliseconds = ~30 frames per sec

var canvas: any = document.getElementById('canvas');
var context: any = canvas.getContext("2d");

setInterval(GUAR, FRAME_INTERVAL);

var shouldDrawPieChart = false;
var shouldDrawColumnChart = true;

let counter: number = 0;

function GUAR(): void
{
    //NOTE: Clear Background
    context.clearRect(0, 0, canvas.width, canvas.height);
    
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

        drawColumn(columnX, chartBaseLine - 1, chart.columnWidth, columnHeight, chart.colors[+itemIndex % chart.colors.length]);
    }
}
*/
