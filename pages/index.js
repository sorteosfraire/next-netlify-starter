import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

const socket = new WebSocket('ws://localhost:3000');

export default function Home() {
  const [color, setColor] = useState('blue');

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'changeColor') {
        setColor(data.color);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleClick = () => {
    const newColor = color === 'blue' ? 'red' : 'blue';
    setColor(newColor);
    socket.send(JSON.stringify({ type: 'changeColor', color: newColor }));
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
