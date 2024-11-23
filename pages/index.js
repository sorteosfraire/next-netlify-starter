import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import io from 'socket.io-client';

const socket = io();

export default function Home() {
  const [color, setColor] = useState('blue');

  useEffect(() => {
    socket.on('changeColor', (newColor) => {
      setColor(newColor);
    });

    return () => {
      socket.off('changeColor');
    };
  }, []);

  const handleClick = () => {
    const newColor = color === 'blue' ? 'red' : 'blue';
    setColor(newColor);
    socket.emit('changeColor', newColor);
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
          onClick={handleClick}
          style={{ backgroundColor: color }}
        >
          Click me
        </button>
      </main>

      <Footer />
    </div>
  );
}
