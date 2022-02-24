import React, { useContext } from 'react'

import ethLogo from '../../../public/images/eth.png'
import Image from 'next/image'
import { TransactionContext } from '../../context/TransactionContext'

export function Navbar() {
  const { connectWallet, currentAccount, formData, handleChange, sendTransaction, isLoading } = useContext(TransactionContext)
  return (
    <>
      <nav className="flex w-full items-center  p-4 md:justify-center">
        <div className="flex w-screen items-center justify-around justify-items-center self-center pb-5">
          <div className="">
            <Image src={ethLogo} alt="uniswap" height={40} width={40} />
          </div>
          {!currentAccount && (
            <div className="mx-2 cursor-pointer rounded-2xl bg-zinc-900 p-2 text-[0.9rem] font-semibold">
              <button
                onClick={connectWallet}
                className="flex h-full items-center justify-center rounded-2xl border border-[#163256] bg-[#172A42] p-2 text-[#4F90EA] hover:border-[#234169]"
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
