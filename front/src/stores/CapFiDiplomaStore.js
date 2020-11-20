import { observable, action, decorate, when } from "mobx";
import randomColor from "utils/randomColor";

class CapFiDiplomaStore {
  tokens = [];
  owner = null;
  isLoading = true;
  tokenIndex = 0;

  constructor(contractsStore) {
    this.contractsStore = contractsStore;
    when(() => this.contractsStore.CapFiDiplomaInstance, this.setup);
  }

  setup = async () => {
    const { CapFiDiplomaInstance } = this.contractsStore;
    const owner = await CapFiDiplomaInstance.owner();
    this.setOwner(owner);
    this.fetchTokens();
  };

  fetchTokens = async () => {
    const { CapFiDiplomaInstance } = this.contractsStore;
    const tokens = await CapFiDiplomaInstance.tokensOf(this.owner);
    const gradients = await Promise.all(
      tokens.map(async token => {
        return CapFiDiplomaInstance.getGradient(token);
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
    const { CapFiDiplomaInstance } = this.contractsStore;
    const gradient = [randomColor(), randomColor()];
    await CapFiDiplomaInstance.mint(gradient[0], gradient[1], {
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
