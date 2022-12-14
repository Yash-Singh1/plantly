import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Typer from "../components/Typer";
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(function () {
    fetch("/api/plants")
      .then((response) => response.json())
      .then((json) => {
        setPlants(json);
      });
  }, []);

  useEffect(function () {
    fetch("/api/username")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUsername(json);
      });
  }, []);

  return (
    <div
      className={`min-w-screen max-w-screen min-h-screen max-h-screen ${styles["bg"]} grid grid-rows-[max-content_1fr]`}
    >
      <img
        src="/backround.png"
        className="-z-20 top-0 left-0 opacity-75 fixed h-screen w-screen"
      />
      <Head>
        <title>Uber for Plants</title>
        <meta name="description" content="Uber For Plants!!" />
      </Head>

      <header className="pl-10 text-white bg-[#3D7921]">
        <nav className="uppercase">
          <ul className="flex flex-wrap py-6 flex-row gap-5">
            <li className="w-max inline-block">
              <a href="/">Home</a>
            </li>
            <li className="w-max inline-block">
              <a href="/login">LOGIN</a>
            </li>
            <li className="w-max inline-block">
              <a href="/register">REGISTER</a>
            </li>
            <li className="w-max inline-block">
              <a href="/dashboard">DASHBOARD</a>
            </li>
            {username ? (
              <li className="w-max hidden sm:inline-block absolute right-12 max-w-[25ch] overflow-hidden text-ellipsis whitespace-nowrap">
                Welcome, {username}
              </li>
            ) : null}
          </ul>
        </nav>
      </header>

      <main className="flex flex-col justify-center align-middle text-gray-200 pl-10 min-h-screen bg-black/40">
        <h1 className="text-6xl"> Plantify</h1>
        <p className="text-2xl text-white mt-5">
          Sign in or register to{" "}
          <Typer
            typeSpeed={50}
            backSpeed={40}
            backDelay={1000}
            loop
            strings={[
              "rent out plants!",
              "donate extra flowers.",
              "earn money off gardening!",
            ]}
            smartBackspace
          />
        </p>
        <div className="flex flex-row flex-nowrap mt-5">
          <button
            onClick={() => {
              location.pathname = "/login";
            }}
            className="w-40 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
          >
            <a href="/login">LOGIN</a>
          </button>
          <button
            onClick={() => {
              location.pathname = "/register";
            }}
            className="w-40 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
          >
            <a href="/register">REGISTER</a>
          </button>
        </div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="absolute bottom-4 left-[calc(50%-1rem)] w-8 cursor-pointer"
          onClick={() => {
            document
              .getElementById("plants")!
              .scrollIntoView({ behavior: "smooth" });
          }}
        />
      </main>

      <section id="plants" className="min-h-screen bg-black/40">
        <h2 className="text-center text-4xl font-bold text-white mb-6">
          Marketplace
        </h2>
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Sign in or register to post!
        </h2>
        <div className="justify-center flex flex-wrap gap-5 p-6">
          {plants.length > 0 ? (
            plants.map((plant, index) => {
              return (
                <div
                  key={index}
                  className="text-black relative block p-6 pb-16 basis-[240px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
                >
                  <img className="w-[130px] h-[130px] mb-2" src={plant.image} />
                  <h2 className="text-2xl">{plant.name}</h2>
                  <p className="text-lg mt-2 line-clamp-3">
                    {plant.description}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="text-2xl -mt-8 font-medium">No posts found</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
