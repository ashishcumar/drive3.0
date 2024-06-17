const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Upload", (m) => {
  const upload = m.contract("Upload", []);
  console.log("upload details",{upload})
  return { upload };
});


