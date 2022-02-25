require('@nomiclabs/hardhat-waffle');


module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/PfmkpSw_jFAvST1DF_r6TVD3WzXbCM-3',
      accounts: ['26b76c572ab2e12185847e38db622f2ae27f3d9fdb7024d89a680c03e222f149'],
    },
  },
};