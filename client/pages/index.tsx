import type { NextPage } from 'next'
import { Header } from '../src/components/Header'
import { Card } from '../src/components/Card'
import { Services } from '../src/components/Services'
import { Transactions } from '../src/components/Transactions'
import { Footer } from '../src/components/Footer'
import { TransactionsProvider } from '../src/context/TransactionContext'

const Home = () => {
  return (
    <>
      <TransactionsProvider>
        <Header />
        <Card />
        <Services />
        <Transactions />
        <Footer />
      </TransactionsProvider>
    </>
  )
}

export default Home
