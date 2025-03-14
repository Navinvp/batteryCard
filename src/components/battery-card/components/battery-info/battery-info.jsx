import { useContext } from "react";
import { ThemeContext } from '../../../../store/theme-context';

const BatteryInfo = ({ batteryData }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`flex justify-between items-center ${theme === "dark" ? "text-white" : "text-gray-700"}`}>
      <div className="text-center w-1/2">
        <p className="text-2xl font-bold">{batteryData.capacity.slice(0, -3)}</p>
        <p className="text-sm text-gray-500">Capacity(mAH)</p>
      </div>
      <div className="text-center w-1/2">
        <p className="text-2xl font-bold">{batteryData.chargeLevel}%</p>
        <p className="text-sm text-gray-500">Charge Level</p>
      </div>
    </div>
  );
};

export default BatteryInfo;
