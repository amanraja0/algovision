const ArrayBars = ({ array, activeIndices = [], sorted }) => {
  return (
    <div className="flex items-end justify-center h-[400px] w-full bg-gray-100 rounded-lg p-2">
      {array.map((value, idx) => {
        const isActive = activeIndices.includes(idx);

        let color = "bg-blue-500";
        if (sorted) color = "bg-green-500";
        else if (isActive) color = "bg-red-500";

        return (
          <div
            key={idx}
            className={`mx-[2px] transition-all duration-200 ${color}`}
            style={{
              height: `${value * 3}px`,
              width: `${Math.max(100 / array.length - 1, 2)}%`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ArrayBars;
