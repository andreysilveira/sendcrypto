import React, { useContext } from 'react'
import Image from 'next/image'
import ethLogo from '../../../public/images/ethCurrency.png'
import { TransactionContext } from '../../context/TransactionContext'
import { FiArrowUpRight } from 'react-icons/fi'
import fakeData from '../../utils/fakeData'
import shortenAddress from '../../utils/shortenAddress'

export function TransactionsCard({
  addressTo,
  addressFrom,
  timestamp,
  amount,
}: any) {
  return (
    <div
      className="m-4 flex min-w-full flex-1
      flex-col
      rounded-md
      bg-[#181918]
      p-3
      hover:shadow-2xl
      sm:min-w-[270px] sm:max-w-[300px] 2xl:min-w-[450px] 2xl:max-w-[500px]"
    >
      <div className="mt-3 flex w-full flex-col items-center">
        <div className="display-flex mb-6 w-full justify-start p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-base text-white">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-base text-white">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-base text-white">Amount: {amount} ETH</p>)
        </div>
        <div className="-mt-5 w-max rounded-3xl bg-black p-3 px-5 shadow-2xl">
          <p className="font-bold text-[#37c7da]">{timestamp}</p>
        </div>
      </div>
    </div>
  )
}

<>
<div className="h-full text-white select-none w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll px-8">
  <div>
        <div className="bg-[#191a1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end" key={""}>
          <div className="flex items-center">
            <Image src={ethLogo} height={20} width={15} alt="eth" />
            {/* {amount} Ξ sent to{' '} */}
            2222
            <span className="text-[#f48706] mx-2">
              {/* {addressTo.substring(0, 6)}... */}
              3333
            </span>
          </div>{' '}
          on{' '}
          <div className='mx-2'>
            {/* {new Date().toLocaleString('en-US', {
              timeZone: 'PST',
              hour12: true,
              timeStyle: 'short',
              dateStyle: 'long',
            })} */}
          </div>
          <div className="flex items-center text-[#2172e5]">
            <a
              href={`https://ropsten.etherscan.io/address/`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-[#2172e5]"
            >
              View on Etherscan
              <FiArrowUpRight />
            </a>
          </div>
        </div>
  </div>
</div>
</>
export function Transactions() {
  const { transactions, currentAccount } = useContext(TransactionContext)

  return (
    <div className="gradient-bg-transactions flex w-full items-center justify-center 2xl:px-20">
      <div className="flex flex-col py-12 px-4 md:p-12">
        {currentAccount ? (
          <h3 className="my-2 text-center text-3xl text-white">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="my-2 text-center text-3xl text-white">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center">
          {[...fakeData, ...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  )
}
