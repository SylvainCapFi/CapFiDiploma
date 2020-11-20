import { observable, decorate, action } from "mobx";
import getGradientContractInstance from "utils/getGradientContractInstance";

class ContractsStore {
  CapFiDiplomaInstance = null;

  async setup() {
    this.setCapFiDiplomaInstance(await getGradientContractInstance());
  }

  setCapFiDiplomaInstance(CapFiDiplomaInstance) {
    this.CapFiDiplomaInstance = CapFiDiplomaInstance;
  }
}

export default decorate(ContractsStore, {
  CapFiDiplomaInstance: observable,
  setCapFiDiplomaInstance: action
});
