# Circular Slider Chart

Circular Slider Chart is a simple and customizable circular slider component for React. It allows you to create circular sliders with a range of values, and customize the appearance and behavior of the slider to suit your needs.

## Features

- Customizable appearance: You can customize the size, colors, and other visual aspects of the slider to match your design requirements.
- Sliders: You can define values for two sliders, and the user can change them by dragging each of the slider handles and the rest of values will change along with them.
- Callback function: You can define a callback function to be called whenever the values of the sliders change.

## Usage

To use the Circular Slider Chart component in your React application, follow these steps:

1. Install the circular-slider-chart package using yarn or npm:

```bash
yarn add circular-slider-chart

npm install circular-slider-chart
```

2. Import the CircularSliderChart component into your React component:

```jsx
import CircularSliderChart from 'circular-slider-chart';
```

3. Use the CircularSliderChart component in your component, passing in the required props:

```jsx
<CircularSliderChart
  sliderOne={"A"}
  sliderTwo={"B"}
  total={500}
  onChange={(value) => console.log(value)}
  size={200}
  data={[{ name: "A", value: 120, color: "red" }, { name: "B", value: 150, color: "blue" }, { name: "C", value: 70, color: "green" }, { name: "D", value: 160, color: "yellow" }]}
/>
```
