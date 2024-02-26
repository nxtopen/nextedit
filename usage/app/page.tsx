"use client"
import NextEdit from 'nextedit';
import { useState } from 'react';

export default function Home() {
  const [receivedHtml, setReceivedHtml] = useState<string>('');

  const handleChange = (html: string) => {
    setReceivedHtml(html);
  };
  return (
    <div>
      <NextEdit onChange={handleChange} />
      <div>
        <h4>Received HTML:</h4>
        <div >{receivedHtml}</div>
      </div>
    </div>
  );
}