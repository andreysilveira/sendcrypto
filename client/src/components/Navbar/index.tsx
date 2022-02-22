import React from 'react'

import ethLogo from '../../../public/images/eth.png'
import Image from 'next/image'

export function Navbar() {
  return (
    <>
      <nav className="flex w-full items-center  p-4 md:justify-center">
        <div className="flex w-screen justify-around justify-items-center items-center self-center pb-5">
          <div className="">
            <Image src={ethLogo} alt="uniswap" height={40} width={40} />
          </div>
          <div className="mx-2 cursor-pointer rounded-2xl bg-gray-900 p-2 text-[0.9rem] font-semibold">
            <div className="flex h-full items-center justify-center rounded-2xl border border-[#163256] bg-[#172A42] p-2 text-[#4F90EA] hover:border-[#234169]">
              Connect Wallet
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
