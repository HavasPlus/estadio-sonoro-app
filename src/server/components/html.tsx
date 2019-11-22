import React from "react";
import Helmet from "react-helmet";

type Props = {
  children: any;
  css: string[];
  scripts: string[];
  state: string;
};

const HTML = ({ children, css = [], scripts = [], state = "{}" }: Props) => {
  const head = Helmet.renderStatic();

  return (
    <html lang="pt">
      <head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link href="http://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" type="text/css" /> */}
        {/*        
        <link rel="stylesheet" type="text/css" href="fonts/flaticon.css" /> */}
        <title>Estádio Sonoro - Flamengo - </title>
        <meta
          name="O estádio virtual da TIM para o Flamengo. A TIM vai juntar a sua voz com a de milhões de torcedores rubro-negros em um só canto e levar até os jogadores. Grave seu grito de torcida e participe."
          content="Estádio virtual do Flamengo. Participe e mostre seu amor pelo Flamengo no grito!"
        />
        <meta
          name="KEYWORDS"
          content="flamengo, estádio, sonoro, mengão, brasil, estadio, mengao, rio de janeiro, rio"
        />
        <meta name="RATING" content="general" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Estádio Sonoro" />
        <meta
          property="og:description"
          content="O estádio virtual da TIM para o Flamengo. Grave seu grito de torcida e participe!"
        />
        <meta property="og:image" content="https://i.imgur.com/7wui4Lk.jpg" />
        <meta property="og:url" content="https://estadiosonoro.com.br" />
        <meta name="twitter:card" content="summary_large_image" />
        {head.base.toComponent()}

        {head.link.toComponent()}
        {head.script.toComponent()}
        {css.filter(Boolean).map(href => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${state}`
          }}
        />
        <title>Flamengo - Estádio Sonoro</title>
      </head>
      <body>
        {/* eslint-disable-next-line react/no-danger */}
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.filter(Boolean).map(src => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  );
};

export default HTML;
