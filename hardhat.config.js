require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    defaultNetwork: 'goerli',
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      chainId: 280,
      zksync: true,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
    holesky: {
      url: "https://rpc.holesky.ethpandaops.io",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      ethNetwork: "holesky",
      chainId: 17000,
      zksync: true,
    },
    goerli: {
      url: `https://mainnet.infura.io/v3/${process.env.PRIVATE_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
