import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Pusher from 'pusher-js';

export default function Home() {
  const [color, setColor] = useState('blue');

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher('a19f60e40d10cf02b0d1', {
      cluster: 'us3'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('changeColor', function(data) {
      setColor(data.color);
    });

    return () => {
      pusher.unsubscribe('my-channel');
    };
  }, []);

  const handleClick = () => {
    const newColor = color === 'blue' ? 'red' : 'blue';
    setColor(newColor);

    fetch('/api/pusher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ color: newColor })
    });
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
