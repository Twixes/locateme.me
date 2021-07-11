import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>LocateMe</title>
        <meta name="description" content="Wherever you are, find out where you are." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          You are
        </h1>
        <Image src="/point.png" width={300} height={300}/>
        <h1 className={styles.title}>
            right there
        </h1>
      </main>
    </div>
  )
}
