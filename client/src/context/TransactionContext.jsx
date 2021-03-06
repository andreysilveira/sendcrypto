import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constants'

export const TransactionContext = React.createContext()

// const ifEthereum = if (typeof window !== 'undefined') {
//   const { ethereum } = window
// }

const ifEthereum = typeof window !== 'undefined' ? ({ ethereum } = window) : ''

const storageLocal =
  typeof window !== 'undefined' ? localStorage.getItem('transactionCount') : ''

// const { ethereum } = window

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  return transactionsContract
}

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({
    addressTo: '',
    amount: '',
  })
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(
    storageLocal
    //localStorage.getItem('transactionCount')
  )
  const [transactions, setTransactions] = useState([])

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }))
  }

  const getAllTransactions = async () => {
    try {
      if (ifEthereum) {
        const transactionsContract = createEthereumContract()

        const availableTransactions =
          await transactionsContract.getAllTransactions()

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        )

        console.log(structuredTransactions)

        setTransactions(structuredTransactions)
      } else {
        console.log('Ethereum is not present')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ifEthereum) return alert('Please install MetaMask.')

      const accounts = await ifEthereum.request({ method: 'eth_accounts' })
      console.log(accounts)

      if (accounts.length) {
        setCurrentAccount(accounts[0])

        getAllTransactions()
      } else {
        console.log('No accounts found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfTransactionsExists = async () => {
    try {
      if (ifEthereum) {
        const transactionsContract = createEthereumContract()
        const currentTransactionCount =
          await transactionsContract.getTransactionCount()

        window.localStorage.setItem('transactionCount', currentTransactionCount)
      }
    } catch (error) {
      console.log(error)

      //throw new Error('No ethereum object')
    }
  }

  const connectWallet = async () => {
    try {
      if (!ifEthereum) return alert('Please install MetaMask.')

      const accounts = await ifEthereum.request({
        method: 'eth_requestAccounts',
      })

      setCurrentAccount(accounts[0])
      window.location.reload()
    } catch (error) {
      console.log(error)

      // throw new Error('No ethereum object')
    }
  }

  const sendTransaction = async () => {
    try {
      if (ifEthereum) {
        const { addressTo, amount, keyword, message } = formData
        const transactionsContract = createEthereumContract()
        const parsedAmount = ethers.utils.parseEther(amount)

        await ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: '0x5208', // 21000 GWEI
              value: parsedAmount._hex, // 0.00001
            },
          ],
        })

        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmount
        )

        setIsLoading(true)
        console.log(`Loading - ${transactionHash.hash}`)
        await transactionHash.wait()
        console.log(`Success - ${transactionHash.hash}`)
        setIsLoading(false)

        const transactionsCount =
          await transactionsContract.getTransactionCount()

        setTransactionCount(transactionsCount.toNumber())
        window.location.reload()
      } else {
        console.log('No ethereum object')
      }
    } catch (error) {
      console.log(error)

      // throw new Error('No ethereum object')
    }
  }

  useEffect(() => {
    checkIfWalletIsConnect()
    checkIfTransactionsExists()
  }, [transactionCount])

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
