import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { chartColours } from '../constants';
import { LineChartDataType } from '../utilities';

export interface ChartProps {
    fullscreen?: boolean;
    data: LineChartDataType;
}

function StackedBarChart(props: ChartProps) {
  const theData = props.data.hasOwnProperty("data") ? props.data.data : [];
  const theKeys = props.data.hasOwnProperty("keys") ? props.data.keys : [];

  return (
    <div className={props.fullscreen ? "chart--fullscreen" : "chart"}>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
            width={500}
            height={300}
            data={theData}
            margin={{
            top: 20,
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
            {theKeys.map((key) => (
                <Bar type="monotone" stackId="a" key={key.id} dataKey={key.id} name={key.name} fill={key.colour ? chartColours[key.colour] : ""} />
            ))}
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
}

export default StackedBarChart;
