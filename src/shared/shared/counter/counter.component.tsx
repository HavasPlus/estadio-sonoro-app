import * as React from "react";
import styles from "./counter-component.module.scss";
import { IconComponent } from "../icon";
interface ICountProps {
  count: number;
  title?: string;
  subTitle?: string;
}

export const CounterComponent = (props: ICountProps) => {
  const { count } = props;
  const [finalNumber, setFinalNumber] = React.useState<string[]>([]);
  const [fillWith0, setFillWith0] = React.useState(0);
  React.useEffect(() => {
    const numberStr = count.toString();
    const difference = 6 - numberStr.length;
    let finalStr = [];
    for (let i = 0; i < difference; i += 1) {
      finalStr.push("0");
    }
    for (let i = 0; i < numberStr.length; i += 1) {
      finalStr.push(numberStr.charAt(i));
    }
    setFinalNumber(finalStr);
  });

  return (
    <div style={{ marginTop: -48, textAlign: "center" }}>
      {props.title && <span className={`${styles["counter-title"]}`}>{props.title}</span>}
      <div className={`${styles["counter"]}`}>
        {finalNumber.map((item, key) => (
          <span key={key} className={`${styles["counter-number"]}`}>
            {item}
          </span>
        ))}
      </div>
      {props.subTitle && <span className={`${styles["counter-subtitle"]}`}>{props.subTitle}</span>}
    </div>
  );
};
