import { useState, useEffect, useContext } from "react";
import { ThemeContext } from '../../store/theme-context';

import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { FiPlus, FiMinus } from "react-icons/fi";

import BatteryStatus from "./components/battery-status/battery-status";
import BatteryChart from "./components/battery-chart/battery-chart";
import BatteryInfo from "./components/battery-info/battery-info";
import BatteryBars from "./components/battery-bars/battery-bars";
import ChartSelector from "./components/chart-selector/chart-selector";

import useBatteryStatus from "../../hooks/useBatteryStatus";

Modal.setAppElement("#root");

const BatteryCard = () => {
  const { theme } = useContext(ThemeContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chartType, setChartType] = useState("line");
  const batteryData = useBatteryStatus();

  return (
    <div className={`${theme === 'light' ? 'light' : 'dark'}`}>
      <motion.div
        className={`bg-white ${theme === "dark" ? "dark:bg-gray-800" : ""} rounded-2xl shadow-md p-6 cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative`}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`absolute top-4 right-4 cursor-pointer rounded-lg p-2 ${theme === "dark" ? "dark:text-white" : "hover:bg-gray-200"}`} onClick={() => setModalIsOpen(true)}>
          <FiPlus size={24} className={`${theme === "dark" ? "dark" : "text-gray-700"}`} />
        </div>
        <div className="text-center flex gap-y-6 flex-col">
          <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-700"}`}>Battery Details</h2>
          <BatteryStatus batteryData={batteryData} />
          <BatteryBars chargeLevel={batteryData.chargeLevel} />
          <BatteryInfo batteryData={batteryData} />
        </div>
      </motion.div>

      <AnimatePresence>
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                transition: "opacity 0.1s ease-in-out",
              },
              content: {
                width: "fitContent",
                maxWidth: "800px",
                height: "auto",
                maxHeight: "70vh",
                margin: "auto",
                borderRadius: "12px",
                padding: "0",
                border: "none",
                transition: "transform 0.3s ease-in-out",
                backgroundColor: theme === "dark" ? "#1E2938" : "#F3F4F6"
              },
            }}
            key="modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 1, scale: 0.99 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col h-full ${theme === "dark" ? "dark:bg-gray-800 bg-gray-100" : "bg-gray-100"} p-5 rounded-xl`}
              style={{ height: "100%" }}
            >
              <div className="flex justify-between items-center pb-3 mb-4">
                <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-700"}`}>Battery Analysis</h3>
                <button onClick={() => setModalIsOpen(false)} className={`p-2 ${theme === "dark" ? "dark:text-white" : "hover:bg-gray-200"} rounded-lg`}>
                  <FiMinus size={24} className={`${theme === "dark" ? "dark:text-white" : "text-gray-900"}`} />
                </button>
              </div>
              <div className="flex flex-col flex-grow mt-4">
                <ChartSelector chartType={chartType} setChartType={setChartType} />
                <div className="w-full min-h-[250px] md:min-h-[350px] flex justify-center">
                  {batteryData.history.length > 0 ? (
                    <BatteryChart chartType={chartType} history={batteryData.history} />
                  ) : (
                    <p className="text-gray-500">No data available</p>
                  )}
                </div>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BatteryCard;
