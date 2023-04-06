import { useState, useRef } from "react";

function Form() {
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://vinci-url.com/${shortUrl}`);
    setErrorMsg("Short URL copied to clipboard.");
  };

  const resetForm = () => {
    inputRef.current.value = "";
    setShortUrl("");
    setErrorMsg("");
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-52">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-200">
          Vinci URL Shortener
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Make Long URLs look nicer with Vinci URL Shortener.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-300">
                URL
              </label>
              <div className="mt-2">
                <input
                  ref={inputRef}
                  id="url"
                  type="text"
                  placeholder="URL"
                  className="block w-full bg-gray-700 rounded-md border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Shorten
            </button>
            {shortUrl && (
              <>
                <span className="text-gray-200 flex flex-col text-center mt-4">
                  <p className="mb-2">Congratulations! <br/>This is your short URL:</p>

                  <a
                    href={`https://www.vinci-url.com/${shortUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-blue-300 underline"
                  >
                    https://vinci-url.com/{shortUrl}
                  </a>
                </span>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-500 text-sm rounded-md px-2 py-1 hover:bg-gray-700 transition ease-in"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className=" bg-gray-300 hover:bg-gray-400 text-sm rounded-md px-2 py-1 text-gray-800 hover:text-gray-900 transition ease-in"
                  >
                    Copy
                  </button>
                </div>
              </>
            )}
            {errorMsg && (
              <p className="text-red-500 text-center mt-2">{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;