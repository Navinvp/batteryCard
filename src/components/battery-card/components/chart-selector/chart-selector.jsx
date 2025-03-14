import { useContext } from "react";
import { ThemeContext } from "../../../../store/theme-context";

const ChartSelector = ({ chartType, setChartType }) => {
    const { theme } = useContext(ThemeContext);

  return (
    <div className="flex justify-between items-center text-gray-700 dark:text-white mb-2">
      <h3 className={`${theme === "dark" ? "text-white" : "text-gray-700"} text-md font-semibold`}>Charge History</h3>
      <div className="relative w-40">
        <select
          className={`${theme === "dark" ? "text-white dark:bg-gray-800" : "text-gray-700 bg-white"} w-full p-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none`}
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="area">Area Chart</option>
        </select>
        <div className={`${theme === "dark" ? "text-white" : "text-black"} absolute inset-y-0 right-3 flex items-center pointer-events-none`}>⏷</div>
      </div>
    </div>
  );
};

export default ChartSelector;
