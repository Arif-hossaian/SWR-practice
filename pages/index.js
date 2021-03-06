import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useUsers } from '../actions/users';
import PageContent from '../components/displayPageContent/PageContent';
import styles from '../styles/Home.module.css';
import GetQueryUrl from '../utils/getQueryURL';

export default function Home() {
  const { page, limit, search } = GetQueryUrl();
  console.log({ page, limit, search });
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     const res = await axios.get('/users?_sort=createdAt&_order=desc');
  //     //console.log(res);
  //     setUsers(res.data);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>SWR practice</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PageContent page={page} limit={limit} search={search} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
