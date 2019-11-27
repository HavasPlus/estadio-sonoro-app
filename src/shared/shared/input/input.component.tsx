import * as React from "react";
import styles from "./input-component.module.scss";
import { IconComponent } from "../icon";
interface IInputProps {
  error?: string;
  icon: any;
  onBlur?: ()=> void;
  onChangeText: (text: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}

export const Input = (props: IInputProps) => {
  const { placeholder, onChangeText, type, value, icon, error, onBlur } = props;
  const [localPlaceholder, setLocalPlaceholder] = React.useState(placeholder);

  return (
    <div>
      <div className={styles["input-container"]}>
        <div className={styles["input-container-icon"]}>
          <IconComponent icon={icon} size={"24px"} fillColor="#a9a9a9" />
        </div>
        <input
        
          type={type}
          onFocus={() => {
            setLocalPlaceholder("");
          }}
          onBlur={() => {
            setLocalPlaceholder(placeholder);
            if (onBlur){
              onBlur();
            }
          }}
          value={value}
          onChange={e => {
            const inputValue = e.target.value;
            if (onChangeText) {
              onChangeText(inputValue);
            }
          }}
          placeholder={localPlaceholder}
        />
      </div>
      {error && <span className={styles["error"]}> {error} </span>}
    </div>
  );
};
