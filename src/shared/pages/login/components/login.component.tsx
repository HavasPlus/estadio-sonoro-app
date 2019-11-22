import * as React from "react";
import styles from "./login-component.module.scss";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { Checkbox } from "@app/shared/checkbox";
import { LoginContainerProps } from "../containers";
import { loginRequest, signupRequest, FbloginRequest, googleLoginRequest } from "@app/middleware/thunk/auth.thunk";
import { Button } from "@app/shared/button";
import { Input } from "@app/shared/input";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";
import { FACEBOOK_ICON, GOOGLE_ICON, MAIL_ICON, PASSWORD_ICON, USER_ICON } from "@app/constants/icons";
const isBrowser = typeof window !== "undefined";
import { HeaderComponent } from "@app/shared/header";
import { BackButtonComponent } from "@app/shared/back-button";
import { isEmailValid } from "../../../util/email";
import { LogoComponent } from "@app/shared/logo/logo.component";
import { BackgroundComponent } from "@app/shared/background";
import { AutoComplete } from "material-ui";

const FacebookLogin = require("react-facebook-login/dist/facebook-login-render-props").default;

const { useState } = React;
export interface ILoginComponentProps {}

const MAIN_LOGIN_PAGE = 0;
const SIGNUP_PAGE = 1;
const LOGIN_PAGE = 2;

export const LoginComponent = (props: ILoginComponentProps & RouteComponentProps & LoginContainerProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [loginState, setLoginState] = useState(0);
  const [nameSignUp, setNameSignUp] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState("");
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const HeaderTitle = () => (
    <h1 className={styles["title"]}>
      BEM VINDO AO ESTÁDIO VIRTUAL <br />
      DA TIM PARA O FLAMENGO
    </h1>
  );
  const HeaderSubtitle = () => (
    <div style={{ maxWidth: 200, margin: "auto", marginTop: 8, marginBottom: 16 }}>
      <span className={styles["subtitle"]}>Participe e mostre seu amor pelo Flamengo no grito.</span>
    </div>
  );

  const cleanFields = () => {
    setPasswordSignIn("");
    setPasswordSignUp("");
    // setIsChecked(false);
    setErrorMessage("");
    setEmailErrorMessage("");
    setPasswordErrorMessage("");

    setEmailSignUp("");
    setEmailSignIn("");
    setConfirmPasswordSignUp("");
    setNameSignUp("");
  };
  React.useEffect(cleanFields, [loginState]);

  React.useEffect(() => {
    if (isBrowser) {
      // const token = localStorage.getItem("token");
      // const records = localStorage.getItem("count");

      props.setSettings({
        token: "",
        name: "",
        backingtrack: "",
        crowdRecord: "",
        foundRecord: "",
        countRecords: 0
      });
    }
  }, []);
  const login = () => {
    if (!(emailSignIn.trim() && passwordSignIn.trim())) {
      setErrorMessage("O campo e-mail e senha são obrigatórios.");

      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    loginRequest(emailSignIn, passwordSignIn)
      .then(response => {
        if (response.code == 200) {
          //success
          //setting token
          const { token, countRecords, foundRecord, name, backingtrack, crowdRecord } = response;
          if (
            token &&
            name &&
            foundRecord !== undefined &&
            countRecords !== undefined &&
            backingtrack &&
            crowdRecord !== undefined
          ) {
            props.setSettings({
              token,
              backingtrack,
              crowdRecord,
              foundRecord,
              countRecords,
              name
            });
            props.history.push("/");
          } else {
            setErrorMessage(`Ocorreu algo errado`);
          }
        } else {
          setErrorMessage(response.response);
        }
      })
      .catch(e => {
        setErrorMessage("Cheque a sua conexão com a internet e tente novamente" + JSON.stringify(e));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const loginFb = (token: string, facebookId: string) => {
    if (!(token && facebookId)) {
      setErrorMessage("Oops");

      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    FbloginRequest(token, facebookId)
      .then(response => {
        if (response.code == 200) {
          //success
          //setting token
          const { token, countRecords, foundRecord, name, backingtrack, crowdRecord } = response;
          if (
            token &&
            name &&
            foundRecord !== undefined &&
            countRecords !== undefined &&
            backingtrack &&
            crowdRecord !== undefined
          ) {
            props.setSettings({
              token,
              backingtrack,
              crowdRecord,
              foundRecord,
              countRecords,
              name
            });
            props.history.push("/");
          } else {
            setErrorMessage(`Ocorreu algo errado`);
          }
        } else {
          setErrorMessage(response.response);
        }
      })
      .catch(e => {
        setErrorMessage("Cheque a sua conexão com a internet e tente novamente" + JSON.stringify(e));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const loginGoogle = (name: string, googleId: string) => {
    if (!(name && googleId)) {
      setErrorMessage("Oops");

      return;
    }
    setErrorMessage("");
    setIsLoading(true);
    googleLoginRequest(name, googleId)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          const { token, countRecords, foundRecord, name, backingtrack, crowdRecord } = response;
          if (
            token &&
            name &&
            foundRecord !== undefined &&
            countRecords !== undefined &&
            backingtrack &&
            crowdRecord !== undefined
          ) {
            props.setSettings({
              backingtrack,
              crowdRecord,
              token,
              foundRecord,
              countRecords,
              name
            });
            props.history.push("/");
          } else {
            setErrorMessage(`Ocorreu algo errado`);
          }
        } else {
          setErrorMessage(response.response);
        }
      })
      .catch(e => {
        setErrorMessage("Cheque a sua conexão com a internet e tente novamente" + JSON.stringify(e));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const checkEmail = (): boolean => {
    const isValid = isEmailValid(emailSignUp);
    setEmailErrorMessage(isValid ? "" : "E-mail inválido");

    return isValid;
  };
  const checkPassword = (): boolean => {
    const isValidMatch = passwordSignUp == confirmPasswordSignUp;
    const isValidLength = passwordSignUp.length >= 6;
    setPasswordErrorMessage(
      !isValidMatch ? "As senhas não se coincidem" : !isValidLength ? "A senha precisa ter pelo menos 6 caracteres" : ""
    );

    return isValidMatch && isValidLength;
  };
  const signUp = () => {
    setErrorMessage("");
    if (!(emailSignUp.trim() && passwordSignUp && nameSignUp.trim() && confirmPasswordSignUp)) {
      setErrorMessage("Todos os campos são obrigatórios.");

      return;
    }
    if (!(checkEmail() && checkPassword())) {
      setErrorMessage("Tododsadsadass os campos são obrigatórios.");
      return;
    }
    setIsLoading(true);
    signupRequest(nameSignUp, emailSignUp, passwordSignUp)
      .then(response => {
        if (response.code == 200) {
          //success
          //setting token
          const { token, countRecords, name, crowdRecord, backingtrack } = response;
          if (token && name && countRecords !== undefined && backingtrack && crowdRecord !== undefined) {
            props.setSettings({
              token,
              foundRecord: "",
              countRecords,
              backingtrack,
              crowdRecord,
              name
            });
            props.history.push("/");
          } else {
            setErrorMessage(`Ocorreu algo errado`);
          }
        } else {
          setErrorMessage(response.response);
        }
      })
      .catch(e => {
        setErrorMessage("Cheque a sua conexão com a internet e tente novamente" + JSON.stringify(e));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles["login-container"]}>
      <div>
        <HeaderComponent state={loginState === MAIN_LOGIN_PAGE ? 0 : 1} />
      </div>
      {loginState === MAIN_LOGIN_PAGE ? (
        <div
          style={{
            // marginTop: -32,
            height: 600,
            display: "flex",
            marginBottom: 32,
            flexDirection: "column",
            maxHeight: 800,

            // paddingBottom: 36,
            justifyContent: "space-between"
          }}
        >
          <LogoComponent
            style={{
              display: "block",
              maxHeight: "100px",

              top: "calc(-300px + 30vh)"
            }}
            zIndex={0}
            showText
          />
          <div
            style={{
              minWidth: 280,
              maxWidth: 360,
              margin: "auto",
              height: 280,
              paddingTop: 0,
              marginBottom: 32,
              position: "relative",
              display: "block"
            }}
          >
            <HeaderTitle />
            <HeaderSubtitle />
            {/* <FacebookLogin
              // appId="564170557489738" //dev
              appId="391583351534831" //prod
              isMobile={false}
              redirectUri="https://10.0.0.244:3000/"
              callback={(response: any) => {
                loginFb(response.accessToken, response.id);
              }}
              render={(renderProps: any) => (
                <Button
                  isLoading={isLoading}
                  onClick={() => {
                    if (!isChecked) alert("Para continuar é necessário que você aceite os termos e condições de uso");
                    else renderProps.onClick();
                  }}
                  icon={FACEBOOK_ICON}
                  fillColor="#3b5998"
                  title="ENTRAR COM FACEBOOK"
                />
              )}
            />
            {/* client secret NJhb97LtjLPbNOaR3mmhSDCx */}
            {/* <GoogleLogin
              // clientId="806425868385-b54ngpo0311a8ekses2tq76ctbgvij1k.apps.googleusercontent.com" //dev
              clientId="895580006168-7t33sgrpvv79tb7148q3h6e943gjbot7.apps.googleusercontent.com" //dev
              render={renderProps => (
                <Button
                  icon={GOOGLE_ICON}
                  onClick={() => {
                    if (!isChecked) alert("Para continuar é necessário que você aceite os termos e condições de uso");
                    else renderProps.onClick();
                  }}
                  isLoading={renderProps.disabled}
                  title="ENTRAR COM GOOGLE"
                />
              )}
              responseType="id_token"
              style={{ padding: 0 }}
              buttonText="Login"
              onSuccess={(response: any) => {
                if (response.getBasicProfile) {
                  const name = response.getBasicProfile().getName();
                  const googleId = response.getBasicProfile().getId();
                  loginGoogle(name, googleId);
                }
              }}
              onFailure={response => {
                console.log("error:", response);
              }}
              cookiePolicy={"single_host_origin"}
            /> */}

            <Button
              isLoading={isLoading}
              onClick={() => {
                if (!isChecked) alert("Para continuar é necessário que você aceite os termos e condições de uso");
                else setLoginState(SIGNUP_PAGE);
              }}
              fillColor="red"
              icon={MAIL_ICON}
              title="ENTRAR COM E-MAIL"
            />
            <div className={styles["terms"]}>
              <Checkbox
                isChecked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
              >
                <span className={styles["terms"]}>
                  Li e{" "}
                  <a
                    target="_blank"
                    style={{ zIndex: 2 }}
                    href="https://estadio-sonoro.s3-sa-east-1.amazonaws.com/termo/termo_imagem_voz.pdf"
                  >
                    aceito os termos de condições
                  </a>{" "}
                  de uso de informações
                </span>
              </Checkbox>
            </div>

            <div className={styles["footer-label"]}>
              Já é cadastrado?{" "}
              <a
                role="link"
                onClick={() => {
                  if (!isChecked) alert("Para continuar é necessário que você aceite os termos e condições de uso");
                  else setLoginState(LOGIN_PAGE);
                }}
              >
                Faça login aqui.
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "0" }}>
          <div style={{ zIndex: -1, position: "absolute", top: 0, left: 0, right: 0 }}>
            <BackgroundComponent />
          </div>
          <BackButtonComponent
            onClick={() => {
              setLoginState(0);
            }}
          />
          {loginState === SIGNUP_PAGE ? (
            <div style={{ padding: 36, paddingTop: 0, margin: "auto", maxWidth: 360 }}>
              <HeaderTitle />
              <Input key={1} icon={USER_ICON} value={nameSignUp} onChangeText={setNameSignUp} placeholder="Nome" />
              <Input
                key={2}
                error={emailErrorMessage}
                icon={MAIL_ICON}
                value={emailSignUp}
                onChangeText={setEmailSignUp}
                placeholder="E-mail"
                onBlur={() => {
                  if (emailSignUp) {
                    checkEmail();
                  }
                }}
              />
              <Input
                key={3}
                icon={PASSWORD_ICON}
                type="password"
                value={passwordSignUp}
                onChangeText={setPasswordSignUp}
                placeholder="Senha"
              />
              <Input
                key={4}
                icon={PASSWORD_ICON}
                type="password"
                value={confirmPasswordSignUp}
                onChangeText={setConfirmPasswordSignUp}
                placeholder="Confirmação de Senha"
                error={passwordErrorMessage}
                onBlur={() => {
                  if (passwordSignUp) {
                    checkPassword();
                  }
                }}
              />
              {errorMessage && <span className={styles["error-message"]}>{errorMessage}</span>}
              <Button isLoading={isLoading} onClick={signUp} title="CADASTRAR E ENTRAR" />
              <div style={{ marginTop: 8 }}>
                <div className={styles["footer-label"]}>
                  Já é cadastrado?{" "}
                  <a
                    role="link"
                    onClick={() => {
                      setLoginState(LOGIN_PAGE);
                    }}
                  >
                    Faça login aqui.
                  </a>
                </div>
              </div>
            </div>
          ) : (
            loginState === LOGIN_PAGE && (
              <div style={{ padding: 36, paddingTop: 0, margin: "auto", maxWidth: 360 }}>
                <HeaderTitle />
                <Input
                  key={5}
                  icon={MAIL_ICON}
                  value={emailSignIn}
                  onChangeText={setEmailSignIn}
                  placeholder="E-mail"
                />
                <Input
                  key={6}
                  icon={PASSWORD_ICON}
                  type="password"
                  value={passwordSignIn}
                  onChangeText={setPasswordSignIn}
                  placeholder="Senha"
                />
                {errorMessage && <span className={styles["error-message"]}>{errorMessage}</span>}
                <div className={styles["forgot-password"]}>
                  <span>Esqueceu sua senha?</span>
                </div>
                <Button isLoading={isLoading} onClick={login} title="ENTRAR" />
                <div className={styles["footer-label"]}>
                  Não é cadastrado?
                  <a
                    role="link"
                    onClick={() => {
                      setLoginState(SIGNUP_PAGE);
                    }}
                  >
                    {" "}
                    Cadastre-se aqui.
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
