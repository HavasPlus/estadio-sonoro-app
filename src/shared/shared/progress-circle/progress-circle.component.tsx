import * as React from "react";
import styles from "./progress-circle.module.scss";
import { IconComponent } from "../icon";
import { MICROPHONE_ICON } from "@app/constants/icons";
interface IProgressCircle {
  disabled?: boolean;
  icon?: any;
  percentage?: number;
  pressed?: boolean;
  sqSize?: number;
  blackBorder?: boolean;
  onClick?: () => void;

  strokeWidth?: number;
}

export const ProgressCircleComponent = (props: IProgressCircle) => {
  const sqSize = props.sqSize || 120;
  const percentage = props.percentage !== undefined ? props.percentage : 50;
  const strokeWidth = props.strokeWidth || 10;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const radius = (sqSize - strokeWidth) / 2 - 10;
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  const [internalPressed, setInternalPressed] = React.useState(false);
  const getPressedBGColor = (isBorder?: boolean) => {
    if (props.disabled || (internalPressed && props.pressed)) return "#a7a7a7";
    if (internalPressed || props.pressed) return "#cacaca";

    if (isBorder) return "white";

    if (props.icon && !isBorder) return "white";

    return "black";
  };

  return (
    <div style={{ position: "relative", margin: "auto" }}>
      {props.onClick && (
        <div
          onMouseDown={() => {
            setInternalPressed(true);
          }}
          onMouseUp={() => {
            setInternalPressed(false);
          }}
          onMouseLeave={() => {
            setInternalPressed(false);
          }}
          role="button"
          onClick={() => {
            if (props.onClick) {
              props.onClick();
            }
          }}
          className={styles["clickable-content"]}
        />
      )}
      {props.icon && typeof props.icon === "string" ? (
        <div
          style={{ marginLeft: !props.pressed && props.icon !== MICROPHONE_ICON ? 4 : 0 }}
          className={styles["icon"]}
        >
          <div>
            <IconComponent icon={props.icon} size="56px" fillColor="black" />
          </div>
        </div>
      ) : (
        props.icon
      )}
      <svg fill={getPressedBGColor()} width={sqSize} height={sqSize} viewBox={viewBox}>
        <circle
          className={styles["circle-background-border"]}
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth + 5}px`}
        />
        <circle
          className={styles["circle-background"]}
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          stroke={props.disabled ? "#a7a7a7" : "white"}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className={styles["circle-progress"]}
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock

          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
        />
        <text className={styles["circle-text"]} x="50%" y="50%" dy=".3em" textAnchor="middle">
          {!props.icon && `${percentage}%`}
        </text>
      </svg>
    </div>
  );
};
