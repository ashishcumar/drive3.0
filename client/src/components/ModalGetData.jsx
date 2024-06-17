import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useShowToast from "../customHooks/useShowToast";

function ModalGetData({ setRadioBtnValue, radioBtnValue, contract, account }) {
  const { showToast } = useShowToast();
  const [images, setImages] = useState([]);
  const [getImageAccId, setGetImageAccId] = useState("");

  const getImages = async (accId) => {
    try {
      const result = await contract.display(accId ? accId : account);
      let temp = { ...result };
      if (Object.values(temp)?.length) {
        let imgString = Object.values(temp).map((item) => {
          return `https://gateway.pinata.cloud/ipfs/${item}`;
        });
        setImages(imgString);
        setGetImageAccId("");
      } else {
        showToast({
          title: "Error!",
          description: "You have not uploaded any images yet.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e) {
      showToast({
        title: "Error!",
        description: "You don't have access to this file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setGetImageAccId("");
    }
  };

  useEffect(() => {
    if (radioBtnValue === "2") {
      getImages();
    }
  }, [radioBtnValue]);

  return (
    <ModalContent>
      <ModalHeader>Access User Images</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>
          <RadioGroup
            onChange={(e) => {
              setRadioBtnValue(e);
              setImages([]);
            }}
            value={radioBtnValue}
          >
            <Stack direction="row">
              <Radio value="1">Search by User ID</Radio>
              <Radio value="2">Fetch My Images</Radio>
            </Stack>
          </RadioGroup>
          {radioBtnValue === "1" ? (
            <Flex sx={{ gap: "12px", padding: "12px" }}>
              <Input
                placeholder="Enter User ID"
                value={getImageAccId}
                onChange={(e) => setGetImageAccId(e.target.value)}
              />
              <Button
                sx={{
                  background: "rgba(48,42,95,1)",
                  color: "white",
                  "&:hover": { background: "rgba(48,42,95,1)" },
                  padding: "8px 20px",
                }}
                onClick={() => getImages(getImageAccId)}
              >
                Fetch
              </Button>
            </Flex>
          ) : null}
        </Box>

        <Box
          sx={{
            margin: "24px 0",
            height: radioBtnValue ? "500px" : "",
            overflowY: "scroll",
          }}
        >
          {images.length ? (
            <Grid sx={{ gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Box>
                {images.slice(0, Math.floor(images.length / 2)).map((src) => {
                  return (
                    <img
                      key={src}
                      src={src}
                      alt={src}
                      style={{
                        width: "100%",
                        objectFit: "contain",
                        margin: "12px 0",
                      }}
                    />
                  );
                })}
              </Box>
              <Box>
                {images.slice(Math.floor(images.length / 2)).map((src) => {
                  return (
                    <img
                      key={src}
                      src={src}
                      alt={src}
                      style={{
                        width: "100%",
                        objectFit: "contain",
                        margin: "12px 0",
                      }}
                    />
                  );
                })}
              </Box>
            </Grid>
          ) : radioBtnValue ? (
            <Stack sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <Skeleton height={"120px"} />
              <Skeleton height={"120px"} />
              <Skeleton height={"120px"} />
              <Skeleton height={"120px"} />
              <Skeleton height={"120px"} />
              <Skeleton height={"120px"} />
              <Skeleton height={"120px"} />
              <Skeleton height={"120px"} />
              <Skeleton height={"120px"} />
            </Stack>
          ) : null}
        </Box>
      </ModalBody>
    </ModalContent>
  );
}

export default ModalGetData;
