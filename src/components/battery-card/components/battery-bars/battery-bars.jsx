const BatteryBars = ({ chargeLevel }) => {
  const filledBars = Math.round(chargeLevel / 10);

  const getBarColor = (percentage) => {
    if (percentage < 25) {
      return "bg-red-300";
    } else if (percentage < 50) {
      return "bg-yellow-300";
    } else {
      return "bg-green-300";
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex items-center">
        {[...Array(10)].map((_, index) => {
          const isFilled = index < filledBars;
          const barColor = isFilled ? getBarColor(chargeLevel) : "bg-gray-300";
          const isLastBar = index === 9;

          return (
            <div
              key={index}
              className={`mr-1 ${barColor} ${isLastBar ? "w-2.5 h-4" : "w-5 h-8"}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BatteryBars;
