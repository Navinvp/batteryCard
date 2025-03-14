import { useState, useEffect } from "react";
import { generateDummyHistory } from "../util/generateDummyHistory";

const useBatteryStatus = () => {
  const [batteryData, setBatteryData] = useState({
    capacity: "5000mAh",
    chargeLevel: 75,
    charging: true,
    history: generateDummyHistory(),
  });

  useEffect(() => {
    if (!navigator.getBattery) {
      console.warn("Battery API is not supported in this browser.");
      return;
    }

    let battery;
    let interval;

    const updateBatteryStatus = () => {
      if (!battery) return;

      const currentTime = new Date();
      const minutes = currentTime.getMinutes();
      const formattedTime = `${currentTime.getHours()}:${minutes < 10 ? "0" : ""}${minutes}`;

      const newEntry = {
        time: formattedTime,
        level: Math.round(battery.level * 100),
      };

      setBatteryData((prev) => ({
        ...prev,
        chargeLevel: newEntry.level,
        charging: battery.charging,
        history: updateHistory(prev.history, newEntry),
      }));
    };

    navigator.getBattery().then((b) => {
      battery = b;
      updateBatteryStatus();

      interval = setInterval(updateBatteryStatus, 60000);

      battery.addEventListener("chargingchange", updateBatteryStatus);
      battery.addEventListener("levelchange", updateBatteryStatus);
    });

    return () => {
      clearInterval(interval);
      if (battery) {
        battery.removeEventListener("chargingchange", updateBatteryStatus);
        battery.removeEventListener("levelchange", updateBatteryStatus);
      }
    };
  }, []);

  const updateHistory = (history, newEntry) => {
    if (!history.length || history[history.length - 1].time !== newEntry.time || history[history.length - 1].level !== newEntry.level) {
      return [...history.slice(-9), newEntry];
    }
    return history;
  };

  return batteryData;
};

export default useBatteryStatus;
