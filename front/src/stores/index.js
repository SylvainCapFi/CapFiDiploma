import ContractsStore from "./ContractsStore";
import CapFiDiplomaStore from "./CapFiDiplomaStore";
import ModalStore from "./ModalStore";

const modalStore = new ModalStore();

const contractsStore = new ContractsStore();
contractsStore.setup();

const capFiDiplomaStore = new CapFiDiplomaStore(contractsStore);

export default {
  modalStore,
  contractsStore,
  capFiDiplomaStore
};
