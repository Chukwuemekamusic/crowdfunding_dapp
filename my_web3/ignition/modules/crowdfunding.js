const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const {items} = require("../../campaigns.json");

module.exports = buildModule("CrowdFunding", (m) => {
  const crowdFunding = m.contract("CrowdFunding", []);
  return { crowdFunding };
});