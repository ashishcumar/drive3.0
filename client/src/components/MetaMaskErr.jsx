import { Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import metamaskIcon from "../assets/metamaskIcon.png";

function MetaMaskErr() {
  return (
    <Grid
      sx={{
        height: "100vh",
        width: "100vw",
        placeContent: "center",
        background: "#423881",
        backdropFilter: "blur(10px)",
      }}
    >
      <Grid
        sx={{
          width: "350px",
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <img
          src={metamaskIcon}
          alt="metamaskIcon"
          style={{
            height: "80px",
            objectFit: "contain",
            mixBlendMode: "multiply",
            margin: "12px auto",
          }}
        />
        <Flex sx={{ justifyContent: "center", gap: "8px" }}>
          <Text sx={{ fontSize: "18px", textAlign: "center" }}>
            Error:- MetaMask Extension Not Detected
          </Text>
        </Flex>
        <Text sx={{ fontSize: "14px", textAlign: "center", margin: "8px 0" }}>
          {" "}
          *We could not detect the MetaMask extension in your browser. To use
          our Web3 application, please ensure that MetaMask is installed and
          enabled.
        </Text>
      </Grid>
    </Grid>
  );
}

export default MetaMaskErr;
