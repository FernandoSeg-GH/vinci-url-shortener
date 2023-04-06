import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const inputRef = useRef();
  const [shortUrl, setShortUrl] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const isValidUrl = (url) => {
    const urlPattern =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return urlPattern.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = inputRef.current.value;

    if (!isValidUrl(url)) {
      setErrorMsg("Please include http or https in your URL.");
      return;
    }

    setErrorMsg("");

    fetch("/api/shortenUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShortUrl(data.shortUrl);
      });
  };

  return (
    <>
      <Head>
        <title>Vinci URL Shortener</title>
        <meta
          name="description"
          content="Make Long URLs look nicer with Vinci URL Shortener"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Vinci URL Shortener</h1>
        <p>Make Long URLs look nicer with Vinci URL Shortener.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="URL"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Shorten
          </button>
          <span className={styles.input}>{shortUrl}</span>
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        </form>
      </main>
      <style>{`
      .error {
        color: red;
        font-size: 14px;
        margin-top: 8px;
      }
      
      `}</style>
    </>
  );
}
