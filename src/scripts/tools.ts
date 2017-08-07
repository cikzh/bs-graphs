function componentToHex(c) {
    var hex = (c*255).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHexColor(r, g, b)
{
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getHighestValue(input: number[]): number
{
    let arr = input.slice();
    return arr.sort(function(a, b){return b-a})[0];
}

function getLowestValue(input: number[]): number
{
    return input.sort()[0];
}

function getArraySum(input: number[]): number
{
    return input.reduce(function (a,b){
        return a + b;
    }, 0);
}
