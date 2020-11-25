import { observable, decorate, action } from "mobx";
import getGradientContractInstance from "utils/getGradientContractInstance";

class ContractsStore {
  capFiDiplomaInstance = null;

  async setup() {
    this.setCapFiDiplomaInstance(await getGradientContractInstance());
  }

  setCapFiDiplomaInstance(capFiDiplomaInstance) {
    this.capFiDiplomaInstance = capFiDiplomaInstance;
  }
}

export default decorate(ContractsStore, {
  capFiDiplomaInstance: observable,
  setCapFiDiplomaInstance: action
});
