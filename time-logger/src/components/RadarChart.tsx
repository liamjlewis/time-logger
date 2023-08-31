import { Radar, RadarChart as RadarChartRC, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { chartColours } from "../constants";
import { RadarChartDataType, RadarChartDataKey } from "../utilities";

export interface ChartProps {
    fullscreen?: boolean;
    data: RadarChartDataType;
}

function RadarChart(props: ChartProps) {
  const theData = props.data.hasOwnProperty("data") ? props.data.data : [];
  const theKeys = props.data.hasOwnProperty("keys") ? props.data.keys : [];

  const dataX = [
    {
      subject: 'Math',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Chinese',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'English',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Geography',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Physics',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'History',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  return (
    <div className={props.fullscreen ? "chart--fullscreen" : "chart"}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChartRC cx="50%" cy="50%" outerRadius="80%" data={dataX}>
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
