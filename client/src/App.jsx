import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import "./App.css";
import useShowToast from "./customHooks/useShowToast";
import { Box, Button, Flex, Grid, Image, Input, Text } from "@chakra-ui/react";
import FileUpload from "./components/FileUpload";
import bgImage from "./assets/bgImage.png";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ModalGetData from "./components/ModalGetData";
function App() {
  const { showToast } = useShowToast();
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [accessAccountId, setAccessAccountId] = useState("");
  const [removeAccountId, setRemoveAccountId] = useState("");
  const [modalOpenFor, setModalOpenFor] = useState("");
  const [radioBtnValue, setRadioBtnValue] = useState("");

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window?.ethereum);
    const wallet = async () => {
      if (provider) {
        await provider.send("eth_requestAccounts", []);
        window?.ethereum?.on("chainChanged", (chainId) => {
          window.location.reload();
        });
        window?.ethereum?.on("accountsChanged", (accounts) => {
          window.location.reload();
        });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contractAddress = "0x70A40446159d8eb788e1e3781Fb744777D249888";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
      } else {
        showToast({
          title: "Error!",
          description: "MetaMask is not installed.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    if (provider) {
      wallet();
    } else {
      showToast({
        title: "Error!",
        description: "MetaMask is not installed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, []);

  const allowAccess = async () => {
    if (accessAccountId === "") {
      return showToast({
        title: "Error!",
        description: "Please enter account id",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (accessAccountId?.length < 42) {
      return showToast({
        title: "Error!",
        description: "Please enter valid account id",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const result = await contract.allowAccess(accessAccountId);
    if (result) {
      setAccessAccountId("");
      showToast({
        title: "Success!",
        description: "Access granted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setModalOpenFor("");
    }
  };
  const removeAccess = async () => {
    if (removeAccountId === "") {
      return showToast({
        title: "Error!",
        description: "Please enter account id",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if (removeAccountId?.length < 42) {
      return showToast({
        title: "Error!",
        description: "Please enter valid account id",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const result = await contract.disallowAccess(removeAccountId);
    if (result) {
      setRemoveAccountId("");
      setModalOpenFor("");
      return showToast({
        title: "Success!",
        description: "Access removed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid
      sx={{
        minHeight: "100vh",
        width: "100vw",
        placeContent: "center",
        background: "#423881",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Modal isOpen={modalOpenFor} onClose={() => setModalOpenFor("")}>
        <ModalOverlay backdropFilter={"blur(10px)"} />
        {modalOpenFor === "getImages" ? (
          <ModalGetData
            radioBtnValue={radioBtnValue}
            setRadioBtnValue={setRadioBtnValue}
            account={account}
            contract={contract}
          />
        ) : null}
        {modalOpenFor === "allowAccess" ? (
          <ModalContent>
            <ModalHeader>Allow Image Access</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex sx={{ gap: "12px" }}>
                <Input
                  placeholder="Enter User ID"
                  value={accessAccountId}
                  onChange={(e) => setAccessAccountId(e.target.value)}
                />
                <Button
                  sx={{
                    background: "rgba(48,42,95,1)",
                    color: "white",
                    "&:hover": { background: "rgba(48,42,95,1)" },
                    padding: "8px 20px",
                    fontSize: "14px",
                  }}
                  onClick={allowAccess}
                >
                  Allow Access
                </Button>
              </Flex>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        ) : null}
        {modalOpenFor === "removeAccess" ? (
          <ModalContent>
            <ModalHeader>Remove Image Access </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex sx={{ gap: "12px" }}>
                <Input
                  placeholder="Enter User ID"
                  value={removeAccountId}
                  onChange={(e) => setRemoveAccountId(e.target.value)}
                />
                <Button
                  sx={{
                    background: "rgba(48,42,95,1)",
                    color: "white",
                    "&:hover": { background: "rgba(48,42,95,1)" },
                    padding: "8px 28px",
                  }}
                  onClick={removeAccess}
                >
                  Remove Access
                </Button>
              </Flex>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        ) : null}
      </Modal>
      <Image
        src={bgImage}
        alt="bgImage"
        sx={{
          display: ["none", "block"],
          height: "750px",
          width: "900px",
          position: "absolute",
          opacity: "0.5",
          top: "-4%",
          right: "-4%",
          transform: ["", "rotate(-5deg)"],
        }}
      />
      <Flex
        sx={{
          position: "absolute",
          top: "24px",
          left: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <Button
          sx={{
            fontSize: ["14px", "16px"],
            background: "white",
            color: "rgba(48,42,95,1)",
          }}
          onClick={() => setModalOpenFor("allowAccess")}
        >
          Allow Access
        </Button>
        <Button
          sx={{
            background: "white",
            fontSize: ["14px", "16px"],
            color: "rgba(48,42,95,1)",
          }}
          onClick={() => setModalOpenFor("removeAccess")}
        >
          Remove Access
        </Button>
        <Button
          variant={"solid"}
          sx={{
            background: "white",
            fontSize: ["14px", "16px"],
            color: "rgba(48,42,95,1)",
          }}
          onClick={() => setModalOpenFor("getImages")}
        >
          Get Uploaded Images
        </Button>
      </Flex>
      <Box
        sx={{
          minHeight: ["400px", "500px"],
          width: ["350px", "700px"],
          display: "grid",
          justifyContent: "center",
          alignItems: "space-between",
          padding: ["8px", ""],
          borderRadius: "8px",
          background: "white",
          transform: ["", "rotate(-5deg)"],
          boxShadow: ["", "-36px 36px 0px 4px rgba(48,42,95,0.4)"],
        }}
      >
        <Box sx={{ marginBottom: ["12px", ""] }}>
          <Text
            sx={{
              fontSize: ["24px", "44px"],
              fontWeight: "bold",
              margin: ["12px 0 0 0 ", "24px 0 0 0"],
              textAlign: "center",
            }}
          >
            Select your file
          </Text>
          <Flex
            sx={{
              gap: "12px",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Text sx={{ fontSize: ["14px", "18px"], fontWeight: "bold" }}>
              {" "}
              Connected Account :-{" "}
            </Text>
            <Text
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                display: ["none", "block"],
              }}
            >
              {" "}
              {account?.slice(0, 10) + "....." + account?.slice(-10)}{" "}
            </Text>
            <Text
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                display: ["block", "none"],
              }}
            >
              {" "}
              {account?.slice(0, 4) + "....." + account?.slice(-4)}{" "}
            </Text>
          </Flex>
        </Box>

        <Box
          sx={{
            border: "1px dashed black",
            background: "#f8f8f8",
            padding: ["12px", "24px"],
            height: "280px",
            width: "100%",
            borderRadius: "12px",
            margin: ["auto", ""],
          }}
        >
          <FileUpload contract={contract} account={account} />
        </Box>
        <Text
          sx={{
            fontSize: ["12px", "14px"],
            fontWeight: "bold",
            margin: ["12px 0", "0"],
            textAlign: "left",
          }}
        >
          *You can upload images ("JPEG", "PNG", "JPG"), with a maximum size of
          4MB.
        </Text>
      </Box>
    </Grid>
  );
}

export default App;

// 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
// 0x5fbdb2315678afecb367f032d93f642f64180aa3
// after chaning in contract
// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// after removing view from function 0x5FbDB2315678afecb367f032d93F642f64180aa3
// after again addding view
