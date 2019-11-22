import { CONFIG } from "../../constants/config";
export const getRecordInfoThunk = async (
  hashId?: string
): Promise<{
  code: number;
  count?: number;
  name?: string;
  response: string;
}> => {
  // const token = await getToken();
  const fetchOption: RequestInit = {
    // signal,
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*"
    })
  };

  try {
    const response = await fetch(`${CONFIG.BASE_URL}/record/${hashId}`, fetchOption);
    const text = await response.text();
    console.log(response.status);
    if (response.status == 200 || response.status == 201) {
      const objParsed = JSON.parse(text);
      const { name, count } = objParsed;

      return {
        code: 200,
        response: "Sucesso",
        name,
        count
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
