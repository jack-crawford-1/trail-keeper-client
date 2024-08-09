import React from 'react';

export function SliderOverlay({
  sliderValue,
  setSliderValue,
}: {
  sliderValue: number;
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="pt-5">
      <label htmlFor="opacity-slider" className="block text-slate-200 pb-3">
        Satellite / NZ Topo50 Overlay
      </label>
      <input
        id="opacity-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={sliderValue}
        onChange={(e) => setSliderValue(parseFloat(e.target.value))}
        className="w-1/2 appearance-none bg-white rounded-lg overflow-hidden"
      />
    </div>
  );
}
