import { useContext } from "react";
import { ThemeContext } from "../../../../store/theme-context";

import { FiZap } from "react-icons/fi";

const BatteryStatus = ({ batteryData }) => {
  const { theme } = useContext(ThemeContext);

  const getBatteryStatus = () => {
    if (batteryData.charging) {
      return { status: "Charging", color: "bg-green-500" };
    } else if (batteryData.chargeLevel < 20) {
      return { status: "Low Battery", color: "bg-red-500" };
    } else {
      return { status: "Idle", color: "bg-gray-500" };
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`border ${theme === "dark" ? "dark:border-gray-600" : "border-gray-300"} rounded-full px-2 py-1 flex items-center gap-1`}>
        <div className={`w-2 h-2 rounded-full ${getBatteryStatus().color}`}></div>
        <span className={`text-xs ${theme === "dark" ? "text-white" : "text-gray-700"}`}>{getBatteryStatus().status}</span>
      </div>
      {batteryData.charging && (
        <FiZap
          size={24}
          className="text-orange-400 absolute top-27 z-2 right-6 m-1 drop-shadow-md"
          style={{ fill: "lightsalmon" }}
        />
      )}
    </div>
  );
};

export default BatteryStatus;
