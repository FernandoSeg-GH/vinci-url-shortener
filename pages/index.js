import Form from "@/components/Form";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function Home() {
  
  return (
    <Layout>
      <Head>
        <title>Vinci URL Shortener</title>
        <meta
          name="description"
          content="Make Long URLs look nicer with Vinci URL Shortener"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-teal-900 h-screen w-screen fixed">
        <Form />
      </main>
    </Layout>
  );
}
