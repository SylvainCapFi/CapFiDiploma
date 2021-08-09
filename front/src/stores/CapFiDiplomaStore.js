import { observable, action, decorate, when } from "mobx";
import randomColor from "utils/randomColor";

class CapFiDiplomaStore {
  tokens = [];
  owner = null;
  isLoading = true;
  tokenIndex = 0;

  constructor(contractsStore) {
    this.contractsStore = contractsStore;
    when(() => this.contractsStore.capFiDiplomaInstance, this.setup);
  }

  setup = async () => {
    const { capFiDiplomaInstance } = this.contractsStore;
    const owner = await capFiDiplomaInstance.owner();
    this.setOwner(owner);
    this.fetchTokens();
  };

  fetchTokens = async () => {
    const { capFiDiplomaInstance } = this.contractsStore;
    const tokens = await capFiDiplomaInstance.tokensOf(this.owner);
    const gradients = await Promise.all(
      tokens.map(async token => {
        return capFiDiplomaInstance.getDiploma(token);
      })
    );
    this.setIsLoading(false);
    if (!gradients.length) {
      return;
    }
    this.setTokens(this.indexedTokens(gradients));
  };

  indexedTokens(gradients) {
    return gradients.map(gradient => {
      return {
        gradient,
        index: this.tokenIndex++
      };
    });
  }

  mintToken = async () => {
    const { capFiDiplomaInstance } = this.contractsStore;
    const gradient = ['Prenom', 'Nom'];
    await capFiDiplomaInstance.mint(gradient[0], gradient[1], {
      from: this.owner,
      gas: 170000
    });
    this.appendToken({ gradient, index: this.tokenIndex++ });
  };

  setTokens(tokens) {
    this.tokens.replace(tokens);
  }

  appendToken(token) {
    this.tokens.push(token);
  }

  setOwner(owner) {
    this.owner = owner;
  }

  setIsLoading(value) {
    this.isLoading = value;
  }
}

export default decorate(CapFiDiplomaStore, {
  owner: observable,
  tokens: observable,
  isLoading: observable,
  setOwner: action,
  setTokens: action,
  setIsLoading: action,
  appendToken: action
});
