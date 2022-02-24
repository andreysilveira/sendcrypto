import React, { useContext } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'

import { TransactionContext } from '../../context/TransactionContext'
import { Loader } from '../Loader/index'
//import { shortenAddress } from '../utils/shortenAddress'

const companyCommonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const Input = ({ placeholder, name, type, value, handleChange }: any) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="white-glassmorphism my-2 w-full rounded-sm border-none bg-transparent p-2 text-sm text-white outline-none"
  />
)

export function Card() {
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
    isLoading,
  }: any = useContext(TransactionContext)

  const handleSubmit = (e: any) => {
    const { addressTo, amount } = formData

    e.preventDefault()

    if (!addressTo || !amount) return

    sendTransaction()
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="mf:flex-row flex flex-col items-start justify-between py-12 px-4 md:p-20">
        <div className="mf:mt-0 mt-10 flex w-full flex-1 flex-col items-center justify-start">
          <div className="eth-card .white-glassmorphism my-5 flex h-40 w-full flex-col items-start justify-end rounded-xl bg-[#172A42] p-3 sm:w-72 ">
            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-sm font-light text-white">0xabc</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          <div className="blue-glassmorphism flex w-full flex-col items-center justify-start rounded-xl bg-zinc-900	 p-5 sm:w-96">
            <Input
              placeholder="Address to"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <div className="my-2 h-[1px] w-full bg-gray-400" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-2 w-full cursor-pointer rounded-full border-[1px] border-[#fff] p-2 text-white"
              >
                Send
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
