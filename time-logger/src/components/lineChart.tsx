import { ResponsiveLine } from '@nivo/line'

const theData = [{"id":"dd643729-0d8c-4a32-a9d7-9aa291cf5021","data":[{"x":"27-02-23","y":3}]},{"id":"50d4df9a-e12b-40b9-9693-cf596fbdc713","data":[{"x":"26-02-23","y":1},{"x":"27-02-23","y":1}]}];

export interface ChartProps {
    fullscreen?: boolean;
}

function LineChart(props: ChartProps) {
  return (
    <div className={props.fullscreen ? "chart--fullscreen" : "chart"}>
        <ResponsiveLine
          data={theData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        />
    </div>
  );
}

export default LineChart;
