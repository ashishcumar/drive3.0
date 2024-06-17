import { useState } from "react";
import useShowToast from "./useShowToast";
import axios from "axios";

const useApi = () => {
  const { showToast } = useShowToast();
  const [loading, setLoading] = useState(false);
  const pinFileToIPFS = async (file, contract, account) => {
    console.log({ file, contract, account });
    if (!file?.name) {
      return showToast({
        title: "Error!",
        description: "no file selected",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file, file.name);
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);
    try {
      const resJson = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZGVhNjVlZi05ZGQ4LTQ2MTEtODA5My00ODg5ZWQwMDYyNWUiLCJlbWFpbCI6Imt1bWFyYXNoaXNoODc5OThAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI5NGZlODgxZjQxMjcyNWI1Njg4Iiwic2NvcGVkS2V5U2VjcmV0IjoiYThhYjBjZmNlYTkxYTc4MTM2ZTIyNTVmNDc3YTM1NWQ0NDRjZTg5NmEzZWU1M2Q1ZjI3NDk1M2VmNGM4N2NkMCIsImlhdCI6MTcxODQzNTAyOX0.bnaFMqrmojBPTuymp0-F3CCHO5AwiIXrksMH1rNZPxQ`,
        },
      });
      if (resJson.data.IpfsHash) {
        showToast({
          title: "Success",
          description: "File uploaded successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log("point 1");
        contract.addUrl(account, resJson.data.IpfsHash);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      showToast({
        title: "Error!",
        description: "Failed to upload file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      console.log("point 4");
      setLoading(false);
    }
  };

  return { loading, pinFileToIPFS };
};

export default useApi;
