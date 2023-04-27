import "./App.css";
import { CircularSliderChart } from "./CircularSliderChart";

function App() {
  return (
    <CircularSliderChart
      sliders={[
        { name: "A", initialPercent: 20, color: "red" },
        { name: "B", initialPercent: 40, color: "blue" },
      ]}
      totalValue={500}
      onChange={(value) => console.log(value)}
      styles={{ chartSize: 300, sliderSize: 20 }}
      dependentData={[
        { name: "C", percent: 70, color: "green" },
        { name: "D", percent: 160, color: "yellow" },
      ]}
    />
  );
}

export default App;
