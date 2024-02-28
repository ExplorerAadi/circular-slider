import { useEffect, useRef, useState } from "react";

type DataType = {
  name: string;
  percent: number;
  color: string;
};

export const CircularSliderChart = ({
  sliderOne,
  sliderTwo,
  onChange,
  styles,
  fixedData,
}: {
  sliderOne: DataType;
  sliderTwo: DataType;
  onChange: ({
    slider,
    deg,
    pos,
  }: {
    slider: string;
    deg: number;
    pos: { x: number; y: number };
  }) => void;
  styles: { chartSize: number; sliderSize: number };
  fixedData: DataType;
}) => {
  const [sliderTwoDeg, setSliderTwoDeg] = useState(
    (sliderTwo.percent * 360) / 100
  );
  const [sliderOneDeg, setSliderOneDeg] = useState(
    sliderTwoDeg + (sliderOne.percent * 360) / 100
  );
  const [sliderOnePos, setSliderOnePos] = useState({ x: 0, y: 0 });
  const [sliderTwoPos, setSliderTwoPos] = useState({ x: 0, y: 0 });
  const circleRef = useRef<HTMLDivElement | null>(null);
  const sliderOneRef = useRef<HTMLDivElement | null>(null);
  const sliderTwoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleSliderPos = (
      radius: number,
      theta: number,
      setSliderPos: (pos: { x: number; y: number }) => void
    ) => {
      const X = radius * Math.cos(theta);
      const Y = radius * Math.sin(theta);
      setSliderPos({ x: X + radius, y: Y + radius });
    };

    const handleSliderMove = (
      event: MouseEvent,
      deg: number,
      setSliderValues: (deg: number, pos: { x: number; y: number }) => void
    ) => {
      let degCopy = deg;
      let radius = (circleRef.current?.clientWidth || 0) / 2;
      let circlePos = {
        x: circleRef.current?.offsetLeft || 0,
        y: circleRef.current?.offsetTop || 0,
      };
      let theta = (degCopy * Math.PI) / 180;

      let mousePos = {
        x: event.clientX - (circlePos.x + radius),
        y: event.clientY - (circlePos.y + radius),
      };
      theta = Math.atan(mousePos.y / mousePos.x);

      // quadrant 2
      if (mousePos.x < 0 && mousePos.y > 0) {
        theta += Math.PI;
        // quadrant 3
      } else if (mousePos.x < 0 && mousePos.y <= 0) {
        theta += Math.PI;
        // quadrant 4
      } else if (mousePos.x > 0 && mousePos.y <= 0) {
        theta += 2 * Math.PI;
      }

      degCopy = (theta * 180) / Math.PI + 90;
      if (degCopy > 360) {
        degCopy = degCopy - 360;
      }
      handleSliderPos(radius, theta, (pos) => setSliderValues(degCopy, pos));
    };

    if (circleRef.current && sliderOneRef.current && sliderTwoRef.current) {
      if (
        !sliderOnePos.x &&
        !sliderOnePos.y &&
        !sliderTwoPos.x &&
        !sliderTwoPos.y
      ) {
        const radius = circleRef.current.clientWidth / 2;
        const thetaOne = ((sliderOneDeg - 90) * Math.PI) / 180;
        handleSliderPos(radius, thetaOne, setSliderOnePos);

        const thetaTwo = ((sliderTwoDeg - 90) * Math.PI) / 180;
        handleSliderPos(radius, thetaTwo, setSliderTwoPos);
      }

      let mouseDownOnCircle = false,
        mouseDownOnSliderOne = false,
        mouseDownOnSliderTwo = false;

      circleRef.current.addEventListener("mousedown", function (_e) {
        mouseDownOnCircle = true;
      });
      circleRef.current.addEventListener("mouseup", function (_e) {
        mouseDownOnCircle = false;
      });

      sliderOneRef.current.addEventListener("mousedown", function (_e) {
        mouseDownOnSliderOne = true;
      });
      sliderOneRef.current.addEventListener("mouseup", function (_e) {
        mouseDownOnSliderOne = false;
      });

      sliderTwoRef.current.addEventListener("mousedown", function (_e) {
        mouseDownOnSliderTwo = true;
      });
      sliderTwoRef.current.addEventListener("mouseup", function (_e) {
        mouseDownOnSliderTwo = false;
      });

      circleRef.current.addEventListener("mousemove", function (e) {
        if (mouseDownOnCircle && mouseDownOnSliderOne) {
          handleSliderMove(
            e,
            sliderOneDeg,
            (deg: number, pos: { x: number; y: number }) => {
              if (deg > 180 && deg < 360 - (fixedData.percent * 360) / 100) {
                setSliderOneDeg(deg);
                setSliderOnePos(pos);
                onChange({ slider: "sliderOne", deg, pos });
              }
            }
          );
        } else if (mouseDownOnCircle && mouseDownOnSliderTwo) {
          handleSliderMove(
            e,
            sliderTwoDeg,
            (deg: number, pos: { x: number; y: number }) => {
              if (deg < 180) {
                setSliderTwoDeg(deg);
                setSliderTwoPos(pos);
                onChange({ slider: "sliderTwo", deg, pos });
              }
            }
          );
        }
      });
    }
  }, [sliderOneDeg, sliderTwoDeg, sliderOnePos, sliderTwoPos, fixedData]);

  const dependentData = 360 - (fixedData.percent * 360) / 100;

  return (
    <div className="container">
      <div
        id="circle"
        ref={circleRef}
        style={{
          backgroundImage: `conic-gradient(red 0deg, red ${sliderTwoDeg}deg, ${sliderTwo.color} ${sliderTwoDeg}deg, ${sliderTwo.color} ${sliderOneDeg}deg, ${sliderOne.color} ${sliderOneDeg}deg, ${sliderOne.color} ${dependentData}deg, ${fixedData.color} ${dependentData}deg`,
          width: `${styles.chartSize}px`,
          height: `${styles.chartSize}px`,
        }}
      >
        <div
          id="inner-circle"
          style={{
            width: `${(70 * styles.chartSize) / 100}px`,
            height: `${(70 * styles.chartSize) / 100}px`,
          }}
        ></div>
        <div
          id="slider-one"
          ref={sliderOneRef}
          style={{
            left: `${sliderOnePos.x}px`,
            top: `${sliderOnePos.y}px`,
            width: `${styles.sliderSize}px`,
            height: `${styles.sliderSize}px`,
          }}
        ></div>
        <div
          id="slider-two"
          ref={sliderTwoRef}
          style={{
            left: `${sliderTwoPos.x}px`,
            top: `${sliderTwoPos.y}px`,
            width: `${styles.sliderSize}px`,
            height: `${styles.sliderSize}px`,
          }}
        ></div>
      </div>
    </div>
  );
};
