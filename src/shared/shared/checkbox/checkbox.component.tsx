import * as React from "react";
import styles from "./checkbox-component.module.scss";
import Checked from "@assets/images/checked.png";
import Unchecked from "@assets/images/unchecked.png";
interface ICheckboxProps {
  count?: number;
  id?: any;
  isChecked?: any;
  children?: any;
  name?: any;
  onChange?: any;
  value?: any;
}

const Checkbox = ({ name, children, id, onChange, isChecked, count, value }: ICheckboxProps) => {
  const [isCheckedInternal, setIsCheckedInternal] = React.useState(isChecked);

  return (
    <React.Fragment>
      <label
        onClick={() => {
          if (onChange) {
            onChange(!isCheckedInternal);
          }
          setIsCheckedInternal(!isCheckedInternal);
        }}
        role="button"
        htmlFor={name}
        className={styles["checkbox-label"]}
      >
        <div className={styles["checkbox"]}>
          <img src={Unchecked} role="checkbox" alt="Checkbox termos de uso" aria-checked="false" />
          {isCheckedInternal && <img src={Checked} role="checkbox" alt="Checkbox termos de uso" aria-checked="false" />}
        </div>

        {children}
      </label>
    </React.Fragment>
  );
};

export { Checkbox };
