import { Radar, RadarChart as RadarChartRC, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { RadarChartDataType } from "../utilities";

export interface ChartProps {
    fullscreen?: boolean;
    data: RadarChartDataType;
}

function RadarChart(props: ChartProps) {
  const theData = props.data.hasOwnProperty("data") ? props.data.data : [];

  return (
    <div className={props.fullscreen ? "chart--fullscreen" : "chart"}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChartRC cx="50%" cy="50%" outerRadius="80%" data={theData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChartRC>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarChart;
