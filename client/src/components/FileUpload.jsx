import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  background,
  border,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { shades } from "../helper/theme";
import { FileUploader } from "react-drag-drop-files";
import useShowToast from "../customHooks/useShowToast";
import useApi from "../customHooks/UseApi";
import FileUploadingAnimation from "./fileUploadingAnimation/FileUploadingAnimation";
import successIcon from "../assets/successIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";

function FileUpload({ contract, account }) {
  const { showToast } = useShowToast();
  const { loading, pinFileToIPFS } = useApi();
  const fileTypes = ["JPEG", "PNG", "JPG"];
  const [file, setFile] = useState(null);

  const handleFileSubmit = (file) => {
    setFile(file);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "grid",
        placeContent: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: loading ? "grid" : "none",
          placeContent: "center",
          position: "absolute",
          inset: 0,
        }}
      >
        <FileUploadingAnimation animationText={"Uploading files..."} />
      </Box>
      <Box
        sx={{
          opacity: loading ? 0 : 1,
        }}
      >
        {!file?.name ? (
          <FileUploader
            multiple={false}
            handleChange={handleFileSubmit}
            name="file"
            types={fileTypes}
            maxSize={4}
            onSizeError={() =>
              showToast({
                title: "Error",
                description: "File size is more than 4 MB",
                status: "error",
                duration: 3000,
              })
            }
          >
            <div style={{ border: "none", outline: "none", width: "100%" }}>
              <Text sx={{ fontSize: "18px" }}>
                Drag and drop your file here
              </Text>
              <Text sx={{ margin: "12px 0", fontSize: "18px" }}> or </Text>

              <Button
                variant={"solid"}
                sx={{
                  background: "#3e6397",
                  color: "white",
                  "&:hover": { background: "#3e6397" },
                }}
              >
                Browse Files
              </Button>
            </div>
          </FileUploader>
        ) : (
          <Box>
            <Text sx={{ fontSize: "18px", margin: "12px 0",fontWeight:'bold' }}>
              Uploaded File
            </Text>
            <Box
              sx={{
                padding: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "48px",
                background: "white",
                borderRadius: "8px",
              }}
            >
              <Flex sx={{ gap: "8px", alignItems: "center" }}>
                <Text
                  sx={{
                    border: "2px solid #40c057",
                    fontSize: "10px",
                    fontWeight: "bold",
                    display: "grid",
                    placeContent: "center",
                    padding: "4px",
                    color: "#40c057",
                  }}
                >
                  {file?.type.split("/")[1]}
                </Text>
                <Text fontSize={"14px"}> {file?.name?.split(".")[0]}</Text>
              </Flex>
              <Flex sx={{ gap: "8px", alignItems: "end" }}>
                <Text sx={{ fontSize: "14px", color: shades.primary_dark }}>
                  {`${Number(file.size / 1048576).toPrecision(2)}MB`}
                </Text>
                <img
                  src={successIcon}
                  alt="successIcon"
                  style={{ height: "24px", objectFit: "contain" }}
                />
                <img
                  src={deleteIcon}
                  alt="deleteIcon"
                  style={{ height: "24px", objectFit: "contain" }}
                  onClick={() => setFile(null)}
                />
              </Flex>
            </Box>
            <Button
              variant={"solid"}
              onClick={() =>
                pinFileToIPFS(file, contract, account).then(() => setFile(null))
              }
              disabled={!file?.name}
              loading={loading}
              style={{
                background: shades.primary_dark,
                "&:hover": { background: shades.primary_dark },
                color: "white",
                padding: "8px 24px",
                borderRadius: "24px",
                margin: "24px 0",
              }}
            >
              Upload
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default FileUpload;
