import { useEffect, useRef, useState } from "react";

export const Slider = () => {
  const [referralPercent, setReferralPercent] = useState(10);
  const [earnings, setEarnings] = useState(2500);
  const [sliderTwoDeg, setSliderTwoDeg] = useState((49 * 360) / 100);
  const [sliderOneDeg, setSliderOneDeg] = useState(
    sliderTwoDeg + (9 * 360) / 100
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
      // if (X > 0) {
      //   X -= 8;
      // } else {
      //   X += 8;
      // }

      // if (Y > 0) {
      //   Y -= 8;
      // } else {
      //   Y += 8;
      // }
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

      circleRef.current.addEventListener("mousedown", function (e) {
        mouseDownOnCircle = true;
      });
      circleRef.current.addEventListener("mouseup", function (e) {
        mouseDownOnCircle = false;
      });

      sliderOneRef.current.addEventListener("mousedown", function (e) {
        mouseDownOnSliderOne = true;
      });
      sliderOneRef.current.addEventListener("mouseup", function (e) {
        mouseDownOnSliderOne = false;
      });

      sliderTwoRef.current.addEventListener("mousedown", function (e) {
        mouseDownOnSliderTwo = true;
      });
      sliderTwoRef.current.addEventListener("mouseup", function (e) {
        mouseDownOnSliderTwo = false;
      });

      circleRef.current.addEventListener("mousemove", function (e) {
        if (mouseDownOnCircle && mouseDownOnSliderOne) {
          handleSliderMove(
            e,
            sliderOneDeg,
            (deg: number, pos: { x: number; y: number }) => {
              if (deg > 180 && deg < 360 - (referralPercent * 360) / 100) {
                setSliderOneDeg(deg);
                setSliderOnePos(pos);
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
              }
            }
          );
        }
      });
    }
  }, [sliderOneDeg, sliderTwoDeg, sliderOnePos, sliderTwoPos, referralPercent]);

  const dalalEarningsDeg = sliderTwoDeg;
  const miscFeesDeg = sliderOneDeg;
  const traderEarningsDeg = 360 - (referralPercent * 360) / 100;

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-fields">
          <div>
            <label htmlFor="earnings">Gross Earnings: </label>
            <input
              id="earnings"
              value={earnings}
              type="number"
              onChange={(e) => setEarnings(Number(e.target.value))}
            />
          </div>
          <div style={{ marginTop: "16px" }}>
            <label htmlFor="referral">Referral %: </label>
            <input
              id="referral"
              value={referralPercent}
              type="number"
              onChange={(e) => setReferralPercent(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="slider-container">
        <div
          id="circle"
          ref={circleRef}
          style={{
            backgroundImage: `conic-gradient(blue 0deg, blue ${dalalEarningsDeg}deg, orange ${dalalEarningsDeg}deg, orange ${miscFeesDeg}deg, gray ${miscFeesDeg}deg, gray ${traderEarningsDeg}deg, yellow ${traderEarningsDeg}deg`,
          }}
        >
          <div id="inner-circle"></div>
          <div
            id="slider-one"
            ref={sliderOneRef}
            style={{ left: `${sliderOnePos.x}px`, top: `${sliderOnePos.y}px` }}
          ></div>
          <div
            id="slider-two"
            ref={sliderTwoRef}
            style={{ left: `${sliderTwoPos.x}px`, top: `${sliderTwoPos.y}px` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
