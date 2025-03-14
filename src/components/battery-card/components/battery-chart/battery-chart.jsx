import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";

const BatteryChart = ({ chartType, history }) => {
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={history}>
            <XAxis dataKey="time" stroke="#8884d8" />
            <YAxis domain={[0, 100]} stroke="#8884d8" />
            <Tooltip />
            <Bar dataKey="level" fill="#8884d8" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={history}>
            <XAxis dataKey="time" stroke="#8884d8" />
            <YAxis domain={[0, 100]} stroke="#8884d8" />
            <Tooltip />
            <Area type="monotone" dataKey="level" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        );
      case "line":
      default:
        return (
          <LineChart data={history}>
            <XAxis dataKey="time" stroke="#8884d8" />
            <YAxis domain={[0, 100]} stroke="#8884d8" />
            <Tooltip />
            <Line type="monotone" dataKey="level" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        );
    }
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default BatteryChart;
