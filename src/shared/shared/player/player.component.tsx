// tslint:disable

import * as React from "react";
import styles from "./player-component.module.scss";
import { ProgressCircleComponent } from "@app/shared/progress-circle";
import { PAUSE_ICON, PLAY_ICON } from "@app/constants/icons";
import { IconComponent } from "../icon";
import { LogoComponent } from "../logo";
const isBrowser = typeof window !== "undefined";
interface IPlayerComponentProps {
  song: string;
  onChange: (isPlaying: boolean) => void;
}

const PlayerComponent = ({ song, onChange }: IPlayerComponentProps) => {
  const { useState } = React;
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<HTMLAudioElement | undefined>(undefined);

  React.useEffect(() => {
    if (isBrowser) {
      const newPlayer = new Audio(song);
      newPlayer.loop = true;
      setPlayer(newPlayer);
    }
    return () => {
      if (player) player.pause();
    };
  }, []);

  return (
    <ProgressCircleComponent
      pressed={isPlaying}
      blackBorder
      percentage={0}
      onClick={() => {
        setIsPlaying(!isPlaying);
        onChange(!isPlaying);
        if (player)
          if (isPlaying) player.pause();
          else player.play();
      }}
      disabled={false}
      icon={isPlaying ? PAUSE_ICON : PLAY_ICON}
    />
  );
};

export { PlayerComponent };
