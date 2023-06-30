import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function NewStudent() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createStudent(event) {
    setLoading(true);
    event.preventDefault();
    console.log(name, email);
    // what now?

    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email }),
    });

    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      router.push(`/students/${data.id}`);
      // if they stay on the same page -> setState (show them what happened)
    } else {
      setError(data.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <Link href="/">Go back</Link>
          <h1>NEW STUDENT</h1>
          <div>
            <form onSubmit={createStudent}>
              <p style={{ color: "red" }}>{error}</p>
              <label>name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                name="name"
                placeholder="new name here"
              />
              <label>email</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                name="email"
                placeholder="bla@bla.com"
              />
              <button type="submit" disabled={loading}>
                {loading ? "LOADING" : "CREATE"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
