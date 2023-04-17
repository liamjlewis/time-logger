import { LineChart as LineChartRC, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { chartColours } from "../constants";
import { LineChartDataType, LineChartDataKey } from "../utilities";

export interface ChartProps {
    fullscreen?: boolean;
    data: LineChartDataType;
}

function LineChart(props: ChartProps) {
  const theData = props.data.hasOwnProperty("data") ? props.data.data : [];
  const theKeys = props.data.hasOwnProperty("keys") ? props.data.keys : [];

  return (
    <div className={props.fullscreen ? "chart--fullscreen" : "chart"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChartRC
          width={500}
          height={300}
          data={theData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {theKeys.length && theKeys.map((key: LineChartDataKey) => (
            <Line connectNulls type="monotone" key={key.id} dataKey={key.id} name={key.name} stroke={key.colour ? chartColours[key.colour] : ""} />
          ))}
        </LineChartRC>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;
