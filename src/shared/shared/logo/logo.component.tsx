import * as React from "react";
import styles from "./logo-component.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
interface ILogoComponentProps {
  children?: any;
  defaultMargin?: number;
  isPlaying?: boolean;
  showText?: boolean;
  style?: object;
  zIndex?: number;
}

const STATIC_LOGO = "https://estadio-sonoro.s3-sa-east-1.amazonaws.com/midia/logo-text2.jpg";
const STATIC_LOGO_TEXT = "https://i.imgur.com/6vjcm3C.jpg";
// const GIF_LOGO = "https://i.giphy.com/W2R4o67Qmi54boqYR7.gif";
const GIF_LOGO = "https://estadio-sonoro.s3-sa-east-1.amazonaws.com/midia/ondas.gif"; //high res
//  const GIF_LOGO = "https://estadio-sonoro.s3-sa-east-1.amazonaws.com/midia/karaoke.gif"; //high res
//
const LogoComponent = ({ showText, style, defaultMargin, zIndex, isPlaying, children }: ILogoComponentProps) => {
  const [marginLeft, setMarginLeft] = React.useState(defaultMargin);

  const handleResize = () => {
    if (window) {
      getWidthSetMargin(window.innerWidth);
    }
  };
  React.useEffect(() => {
    if (window) {
      window.addEventListener("resize", handleResize);
      getWidthSetMargin(window.innerWidth);
    }
    handleResize();
    return () => {
      if (window) window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getWidthSetMargin = (innerWidth: number): void => {
    const widthBreakPoint = 500;
    if (innerWidth < widthBreakPoint) {
      let marginCalculated = innerWidth - widthBreakPoint;
      // const (newMargin) = 0;
      marginCalculated = marginCalculated / 2;
      if (marginLeft) marginCalculated += marginLeft;
      setMarginLeft(marginCalculated);
    } else setMarginLeft(marginLeft ? marginLeft : 0);
  };

  return (
    <div style={{ ...style, width: "100%", zIndex: zIndex !== undefined ? zIndex : -1 }} className={styles["logo"]}>
      {/* <img
        style={{ marginLeft }}
        className={styles["waves"]}
        src={showText ? WavesText : Waves}
        alt="Logo Estádio Sonoro"
      /> */}
      <div style={{ marginLeft }}>
        <LazyLoadImage
          alt="Logo Estádio Sonoro"
          placeholderSrc={STATIC_LOGO}
          src={isPlaying ? GIF_LOGO : showText ? STATIC_LOGO_TEXT : STATIC_LOGO} // use normal <img> attributes as props
          height="550px"
          width="500px"
        />
      </div>

      {children && <div className={styles["logo-children"]}>{children}</div>}
    </div>
  );
};

export { LogoComponent };
