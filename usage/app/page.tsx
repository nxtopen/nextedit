"use client"
import Image from "next/image";
import styles from "./page.module.css";
import NEXTEditor from 'nextedit';

export default function Home() {
  return (
    <div>
      <NEXTEditor />
    </div>
  );
}
