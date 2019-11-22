import * as React from "react";
import styles from "./share-component.module.scss";
import Instagram from "@assets/images/instagram.png";
import Facebook from "@assets/images/facebook.png";
import Whatsapp from "@assets/images/whatsapp.png";
import Twitter from "@assets/images/twitter.png";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  EmailShareButton,
  TwitterIcon
} from "react-share";

interface IShareComponentProps {}

const ShareComponent = () => {
  const { useState } = React;
  const [] = useState(false);
  const [] = useState<Blob | undefined>(undefined);
  const [] = useState("");
  const [] = useState("");
  // const getAudioBlob = async () => {
  //   setIsLoading(true);
  //   const url = `https://estadio-sonoro.s3-sa-east-1.amazonaws.com/${hashId}.mp3`;
  //   const newInternalBlob = await getAudio(url);
  //   console.log("blob", newInternalBlob);
  //   setIsLoading(false);
  //   if (newInternalBlob) {
  //     setInternalBlob(newInternalBlob);
  //   } else {
  //     setErrMessage("Gravação não encontrada :(");
  //   }
  // };

  React.useEffect(() => {}, []);

  return (
    <div className={styles["share"]}>
      <div className={styles["share-title"]}>
        <span>Compartilhe e convoque mais torcedores!</span>
      </div>
      <div className={styles["share-social"]}>
        <WhatsappShareButton
          title="Acabei de juntar o meu grito de torcida a milhões de vozes rubro-negras no Estádio Sonoro TIM. Participe também e leve sua torcida até os jogadores! #EstádioSonoroTIM #CRF http://www.estadiosonoro.com.br"
          url="https://estadiosonoro.com.br"
        >
          <img alt="Whatsapp Ícone Ícone" src={Whatsapp} />
        </WhatsappShareButton>
        <FacebookShareButton
          quote="Estádio Sonoro. O estádio virtual da TIM para o Flamengo. Grave seu grito de torcida. A TIM vai levar a sua voz junto com a de milhões de torcedores rubro-negros até os jogadores. Participe!"
          url="https://estadiosonoro.com.br"
        >
          <img alt="Facebook Ícone" src={Facebook} />
        </FacebookShareButton>

        <TwitterShareButton title="Estádio Sonoro" url="https://estadiosonoro.com.br">
          <img alt="Twitter Ícone" src={Twitter} />
        </TwitterShareButton>
      </div>
    </div>
  );
};

export { ShareComponent };
