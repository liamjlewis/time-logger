import { ResponsiveLine } from '@nivo/line'

const theData = [{"id":"japan","color":"hsl(1, 70%, 50%)","data":[{"x":"plane","y":200},{"x":"helicopter","y":177},{"x":"boat","y":142},{"x":"train","y":112},{"x":"subway","y":3},{"x":"bus","y":41},{"x":"car","y":50},{"x":"moto","y":51},{"x":"bicycle","y":234},{"x":"horse","y":9},{"x":"skateboard","y":274},{"x":"others","y":55}]},{"id":"france","color":"hsl(198, 70%, 50%)","data":[{"x":"plane","y":55},{"x":"helicopter","y":222},{"x":"boat","y":151},{"x":"train","y":234},{"x":"subway","y":190},{"x":"bus","y":238},{"x":"car","y":256},{"x":"moto","y":175},{"x":"bicycle","y":28},{"x":"horse","y":44},{"x":"skateboard","y":95},{"x":"others","y":266}]},{"id":"us","color":"hsl(98, 70%, 50%)","data":[{"x":"plane","y":265},{"x":"helicopter","y":159},{"x":"boat","y":0},{"x":"train","y":112},{"x":"subway","y":203},{"x":"bus","y":288},{"x":"car","y":99},{"x":"moto","y":288},{"x":"bicycle","y":166},{"x":"horse","y":229},{"x":"skateboard","y":223},{"x":"others","y":132}]},{"id":"germany","color":"hsl(165, 70%, 50%)","data":[{"x":"plane","y":285},{"x":"helicopter","y":37},{"x":"boat","y":2},{"x":"train","y":168},{"x":"subway","y":109},{"x":"bus","y":150},{"x":"car","y":296},{"x":"moto","y":299},{"x":"bicycle","y":252},{"x":"horse","y":71},{"x":"skateboard","y":8},{"x":"others","y":198}]},{"id":"norway","color":"hsl(84, 70%, 50%)","data":[{"x":"plane","y":186},{"x":"helicopter","y":278},{"x":"boat","y":174},{"x":"train","y":149},{"x":"subway","y":183},{"x":"bus","y":152},{"x":"car","y":187},{"x":"moto","y":266},{"x":"bicycle","y":70},{"x":"horse","y":259},{"x":"skateboard","y":18},{"x":"others","y":199}]}];

export interface ChartProps {
    fullscreen?: boolean;
}

function LineChart(props: ChartProps) {
  return (
    <div className={props.fullscreen ? "chart--fullscreen" : "chart"}>
        <ResponsiveLine data={theData}/>
    </div>
  );
}

export default LineChart;
