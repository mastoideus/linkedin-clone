import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";

const AdjustComponent = ({
  onAdjustTypeBack,
  adjustType,
  maxRange,
  onChangeRange,
  step,
  range,
  minRot,
  minLight,
}) => {
  const [rangeValue, setRangeValue] = useState(range);

  const rangeValueHandler = (e) => {
    setRangeValue(e.target.value);

    onChangeRange(e.target.value);
  };

  return (
    <div className="flex items-center gap-x-4 pt-6">
      <ArrowBack onClick={onAdjustTypeBack} />
      <div className="flex flex-col flex-grow ">
        <div className="flex items-center justify-between">
          <p>{adjustType}</p>
          <p>{rangeValue}</p>
        </div>
        <input
          type="range"
          min={minLight || minRot ? 0 : 1}
          max={maxRange}
          onChange={rangeValueHandler}
          value={rangeValue}
          step={step && 0.1}
        />
      </div>
    </div>
  );
};

export default AdjustComponent;
