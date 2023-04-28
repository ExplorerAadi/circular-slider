import "./App.css";
import { CircularSliderChart } from "./CircularSliderChart";

function App() {
  return (
    <CircularSliderChart
      sliderOne={{ name: "A", percent: 20, color: "blue" }}
      sliderTwo={{ name: "B", percent: 40, color: "orange" }}
      onChange={(value) => console.log(value)}
      styles={{ chartSize: 300, sliderSize: 20 }}
      fixedData={{ name: "D", percent: 15, color: "gray" }}
    />
  );
}

export default App;
