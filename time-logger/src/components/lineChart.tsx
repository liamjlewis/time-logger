import { ResponsiveLine } from '@nivo/line'

export interface ChartProps {
    fullscreen?: boolean;
    data: Array<any>
}

function LineChart(props: ChartProps) {
  return (
    <div className={props.fullscreen ? "chart--fullscreen" : "chart"}>
        <ResponsiveLine
          data={props.data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        />
    </div>
  );
}

export default LineChart;
