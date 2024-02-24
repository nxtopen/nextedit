# WYSIWYG Editor For NextJS

## About NextEdit

NextEdit is an WYSIWYG Editor built for NextJS. It can be widely used in react/nextjs admin panels, dashboard or wherever you want. The project is open-source and open for new features.

## Usage

```
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
```
## Demo

#### [View Demo On Stackblitz](https://stackblitz.com/edit/nextedit?file=app%2Fpage.tsx)