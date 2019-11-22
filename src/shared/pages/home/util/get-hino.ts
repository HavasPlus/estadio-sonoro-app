export const getAudio = async (url: string): Promise<Blob | null> => {
  const options = {
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*"
    })
  };
  const urlAudio = fetch(url, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(resp => resp.blob())
    // .then(blob => URL.createObjectURL(blob))
    .catch(() => null);

  return urlAudio;
};
