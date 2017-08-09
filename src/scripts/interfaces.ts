interface PieChart {
    x: number;
    y: number;
    size: number;
    sliceMargin: number;
    rotation: number;
    stroke?: Stroke;
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

interface Stroke {
    color: string;
    thickness: number;
}
