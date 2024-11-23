import { useState } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  const [buttonColor, setButtonColor] = useState('blue');

  const handleButtonClick = () => {
    setButtonColor(buttonColor === 'blue' ? 'red' : 'blue');
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <button
          style={{ backgroundColor: buttonColor, color: 'white' }}
          onClick={handleButtonClick}
        >
          Click me
        </button>
      </main>

      <Footer />
    </div>
  );
}
