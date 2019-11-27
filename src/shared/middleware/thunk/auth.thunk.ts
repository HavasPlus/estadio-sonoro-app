import { CONFIG } from "../../constants/config";
export const loginRequest = async (
  email: string,
  password: string
): Promise<{
  code: number;
  countRecords?: number;
  foundRecord?: string;
  name?: string;
  response: string;
  token?: string;
  backingtrack?: string;
  crowdRecord?: string;
}> => {
  // const token = await getToken();
  const fetchOption: RequestInit = {
    // signal,
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" //TODO REMOVE
      // auth: token,
    }),
    body: JSON.stringify({
      email,
      password
    })
  };

  try {
    const response = await fetch(`${CONFIG.BASE_URL}/auth/login`, fetchOption);
    const text = await response.text();
    if (response.status === 200) {
      const objParsed = JSON.parse(text);
      const { token, name, countRecords, foundRecord, backingtrack, crowdRecord } = objParsed;

      return {
        code: 200,
        backingtrack,
        crowdRecord,
        response: "Sucesso",
        token,
        foundRecord,
        name,
        countRecords
      };
    }

    return {
      code: response.status,
      response: text
    };
  } catch (err) {
    return {
      code: 405,
      response: "Por favor, cheque a sua conexão com a internet e tente novamente."
    };
  }
};
export const FbloginRequest = async (
  token: string,
  facebookId: string
): Promise<{
  code: number;
  countRecords?: number;
  foundRecord?: string;
  name?: string;
  response: string;
  token?: string;
  backingtrack?: string;
  crowdRecord?: string;
}> => {
  // const token = await getToken();
  const fetchOption: RequestInit = {
    // signal,
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
      // auth: token,
    }),
    body: JSON.stringify({
      token,
      facebookId
    })
  };

  try {
    const response = await fetch(`${CONFIG.BASE_URL}/auth/loginfb`, fetchOption);
    const text = await response.text();

    if (response.status === 200) {
      const objParsed = JSON.parse(text);
      const { token, name, countRecords, foundRecord, backingtrack, crowdRecord } = objParsed;

      localStorage.setItem("token", token);
      localStorage.setItem("count", countRecords);
      return {
        code: 200,
        backingtrack,
        crowdRecord,
        response: "Sucesso",
        token,
        name,
        countRecords,
        foundRecord
      };
    }

    return {
      code: response.status,
      response: text
    };
  } catch (err) {
    return {
      code: 405,
      response: "Por favor, cheque a sua conexão com a internet e tente novamente."
    };
  }
};
export const googleLoginRequest = async (
  name: string,
  googleId: string
): Promise<{
  backingtrack?: string;
  code: number;
  crowdRecord?: string;
  countRecords?: number;
  foundRecord?: string;
  name?: string;
  response: string;
  token?: string;
}> => {
  // const token = await getToken();
  const fetchOption: RequestInit = {
    // signal,
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
      // auth: token,
    }),
    body: JSON.stringify({
      name,
      googleId
    })
  };

  try {
    const response = await fetch(`${CONFIG.BASE_URL}/auth/logingoogle`, fetchOption);
    const text = await response.text();
    if (response.status === 200) {
      const objParsed = JSON.parse(text);
      const { token, name, countRecords, foundRecord, backingtrack, crowdRecord } = objParsed;

      return {
        code: 200,
        backingtrack,
        crowdRecord,
        response: "Sucesso",
        token,
        name,
        countRecords,
        foundRecord
      };
    }

    return {
      code: response.status,
      response: text
    };
  } catch (err) {
    return {
      code: 405,
      response: "Por favor, cheque a sua conexão com a internet e tente novamente."
    };
  }
};
export const signupRequest = async (
  firstName: string,
  email: string,
  password: string
): Promise<{
  code: number;
  countRecords?: number;
  name?: string;
  response: string;
  token?: string;
  backingtrack?: string;
  crowdRecord?: string;
}> => {
  // const token = await getToken();
  const fetchOption: RequestInit = {
    // signal,
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
      // auth: token,
    }),
    body: JSON.stringify({
      firstName,
      email,
      password
    })
  };

  try {
    const response = await fetch(`${CONFIG.BASE_URL}/auth/signup`, fetchOption);
    const text = await response.text();
    if (response.status === 200) {
      const objParsed = JSON.parse(text);
      const { token, name, countRecords, backingtrack, crowdRecord } = objParsed;

      return {
        code: 200,
        backingtrack,
        crowdRecord,
        response: "Sucesso",
        token,
        name,
        countRecords
      };
    }

    return {
      code: response.status,
      response: text
    };
  } catch (err) {
    return {
      code: 405,
      response: "Por favor, cheque a sua conexão com a internet e tente novamente."
    };
  }
};
