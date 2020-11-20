import CapFiDiplomaStore from "./CapFiDiplomaStore";

describe("CapFiDiplomaStore", () => {
  describe("setup", () => {
    it("sets owner and fetches tokens", async () => {
      const mockCapFiDiplomaInstance = {
        tokensOf: jest.fn().mockReturnValue([]),
        owner: jest.fn().mockReturnValue("test")
      };
      const mockContractsStore = {
        CapFiDiplomaInstance: mockCapFiDiplomaInstance
      };

      const CapFiDiplomaStore = new CapFiDiplomaStore(mockContractsStore);
      await CapFiDiplomaStore.setup();
      expect(CapFiDiplomaStore.owner).toEqual("test");
      expect(mockCapFiDiplomaInstance.tokensOf).toBeCalledWith("test");
    });
  });

  describe("fetchTokens", async () => {
    const mockCapFiDiplomaInstance = {
      tokensOf: jest.fn().mockReturnValue([0]),
      getGradient: jest.fn().mockReturnValue(["#000", "#fff"]),
      owner: jest.fn().mockReturnValue("test")
    };
    const mockContractsStore = {
      CapFiDiplomaInstance: mockCapFiDiplomaInstance
    };

    const CapFiDiplomaStore = new CapFiDiplomaStore(mockContractsStore);
    await CapFiDiplomaStore.fetchTokens();
    expect(CapFiDiplomaStore.tokens[0].gradient[0]).toEqual("#000");
    expect(CapFiDiplomaStore.tokens[0].gradient[1]).toEqual("#fff");
  });

  describe("mintToken", async () => {
    const mockCapFiDiplomaInstance = {
      tokensOf: jest.fn().mockReturnValue([]),
      mint: jest.fn(),
      owner: jest.fn()
    };
    const mockContractsStore = {
      CapFiDiplomaInstance: mockCapFiDiplomaInstance
    };

    const CapFiDiplomaStore = new CapFiDiplomaStore(mockContractsStore);
    await CapFiDiplomaStore.mintToken();
    expect(CapFiDiplomaStore.tokens).toHaveLength(1);
  });
});
