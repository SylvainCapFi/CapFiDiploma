const CapFiDiploma = artifacts.require("CapFiDiploma");
const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);

module.exports = async function(deployer) {
  const capFiDiploma = await deployer.deploy(CapFiDiploma);
  const addresses = {
    tokenAddress: CapFiDiploma.address
  };

  await writeFile(
    path.join(__dirname, "..", "front", "src", "addresses.json"),
    JSON.stringify(addresses)
  );
};
