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
      <main className={`${styles.main} ${styles.bgColor}`}>
        <h1 className={styles.primaryColor}>Vinci URL Shortener</h1>
        <p className={styles.textColor}>
          Make Long URLs look nicer with Vinci URL Shortener.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="URL"
            className={`${styles.input} ${styles.inputBorderColor} ${styles.borderRadius} ${styles.inputBgColor}`}
          />
          <button
            type="submit"
            className={`${styles.button} ${styles.buttonBgColor} ${styles.buttonTextColor} ${styles.borderRadius}`}
          >
            Shorten
          </button>
          <span className={`${styles.input} ${styles.shortUrl}`}>
            <a href={`https://localhost:3000/${shortUrl}`} target="_blank" rel="noreferrer">vinci-url.com/{shortUrl}</a>
          </span>
          {errorMsg && <p className={`${styles.error} ${styles.errorColor}`}>{errorMsg}</p>}
        </form>
      </main>
    </>
  );
}
