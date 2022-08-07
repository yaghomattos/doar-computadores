import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import data from '../service/institutions.json';

export default function Institutions() {
  const orgs = data.orgs;

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-200">
      <Head>
        <title>Instituições</title>
      </Head>

      <div className="w-min sm:w-7/12 mx-auto my-5 px-5 bg-white rounded-md">
        <header className="mb-5 mt-5 pb-6">
          <Link href={'/'}>
            <div className="w-fit flex mb-8 mt-4 py-2 px-4 gap-2 items-center bg-green-500 rounded-md cursor-pointer">
              <BiArrowBack size="24" color="white" />
              <a className="font-bold text-lg text-white">Fazer doação</a>
            </div>
          </Link>

          <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-zinc-700">
            Instituições que podem receber doações
          </h1>
        </header>

        {orgs.map((org, index) => {
          return (
            <div key={index} className="mb-5 pt-8 border-t-2">
              <div className="text-zinc-400">
                <h2 className="mb-5 text-center text-xl font-bold text-zinc-600">
                  {org.name}
                </h2>
                <div className="w-full flex flex-wrap gap-1 items-center text-lg">
                  <h3 className="font-bold text-zinc-500">Cidade:</h3>
                  <p className="font-normal text-zinc-400">{org.city}</p>
                </div>
                <div className="w-full flex flex-wrap gap-1 items-center text-lg">
                  <h3 className="font-bold text-zinc-500">Bairro:</h3>
                  <p className="font-normal text-zinc-400">{org.neighboor}</p>
                </div>
                <div className="flex flex-wrap text-justify text-lg">
                  <h3 className="font-bold text-zinc-500">Descrição:</h3>
                  <p className="font-normal text-zinc-400">
                    {org.presentation}
                  </p>
                </div>
              </div>

              <footer className="grid grid-cols-2 md:grid-cols-4 mt-4 text-center text-lg font-bold text-zinc-400">
                <Link href={'https://www.appmasters.io/'}>
                  <a target="_blank">Site</a>
                </Link>
                <Link href={'https://www.appmasters.io/'}>
                  <a target="_blank">Instagram</a>
                </Link>
                <Link href={'https://www.appmasters.io/'}>
                  <a target="_blank">Facebook</a>
                </Link>
                <Link href={'https://www.appmasters.io/'}>
                  <a target="_blank">Whatsapp</a>
                </Link>
              </footer>
            </div>
          );
        })}
      </div>
    </div>
  );
}
