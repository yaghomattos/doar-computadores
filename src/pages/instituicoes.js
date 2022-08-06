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

      <div className="w-8/12 mx-auto my-5 px-5 bg-white rounded-md">
        <header className="mb-5 mt-5 pb-6">
          <Link href={'/'}>
            <div className="w-fit flex mb-8 mt-4 py-2 px-4 gap-2 items-center bg-green-500 rounded-md cursor-pointer">
              <BiArrowBack size="24" />
              <span className="font-bold text-lg">Fazer doação</span>
            </div>
          </Link>

          <h1 className="text-center text-5xl font-extrabold text-zinc-700">
            Instituições que podem receber doações
          </h1>
        </header>

        {orgs.map((org, index) => {
          return (
            <div key={index} className="mb-5 pt-8 border-t-2">
              <div className="text-zinc-400">
                <h2 className="text-center text-xl font-bold text-zinc-600">
                  {orgs[index].name}
                </h2>
                <div className="w-full flex flex-wrap gap-1 items-center">
                  <h3 className="text-lg font-bold text-zinc-500">Cidade:</h3>
                  <p className="text-lg font-normal text-zinc-400">
                    {orgs[index].city}
                  </p>
                </div>
                <div className="w-full flex flex-wrap gap-1 items-center">
                  <h3 className="text-lg font-bold text-zinc-500">Bairro:</h3>
                  <p className="text-lg font-normal text-zinc-400">
                    {orgs[index].neighboor}
                  </p>
                </div>
                <div className="flex flex-wrap text-justify">
                  <h3 className="text-lg font-bold text-zinc-500">
                    Descrição:
                  </h3>
                  <p className="text-lg font-normal text-zinc-400">
                    {orgs[index].presentation}
                  </p>
                </div>
              </div>

              <footer className="w-full flex flex-row gap-10 mt-4 text-zinc-400">
                <Link href={`${orgs[index].links.site}`}>
                  <a className="text-lg font-bold text-zinc-400">Site</a>
                </Link>
                <Link href={`${orgs[index].links.instagram}`}>
                  <a className="text-lg font-bold text-zinc-400">Instagram</a>
                </Link>
                <Link href={`${orgs[index].links.facebook}`}>
                  <a className="text-lg font-bold text-zinc-400">Facebook</a>
                </Link>
                <Link href={`${orgs[index].links.whatsapp}`}>
                  <a className="text-lg font-bold text-zinc-400">Whatsapp</a>
                </Link>
              </footer>
            </div>
          );
        })}
      </div>
    </div>
  );
}
