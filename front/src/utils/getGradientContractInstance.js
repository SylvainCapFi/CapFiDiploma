import contract from "truffle-contract";
import getProvider from "utils/getProvider";
import CapFiDiplomaArtifact from "contracts/CapFiDiploma.json";
import addresses from "../addresses.json";

const { tokenAddress } = addresses;

export default async function getGradientContractInstance() {
  const CapFiDiplomaContract = contract(CapFiDiplomaArtifact);
  CapFiDiplomaContract.setProvider(getProvider());
  const CapFiDiplomaInstance = await CapFiDiplomaContract.at(tokenAddress);
  return CapFiDiplomaInstance;
}
