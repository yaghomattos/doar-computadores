import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import data from '../service/institutions.json';

export default function Institutions() {
  const orgs = data.orgs;

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-200">
      <Head>
        <title>Instituições</title>
      </Head>

      <div className="shadow-xl mx-auto max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-2xl px-8 my-5 bg-white rounded-md">
        <header className="my-5">
          <Link href={'/'}>
            <div className="text-zinc-800 cursor-pointer">
              <span className="font-bold text-lg">Fazer Doação</span>
            </div>
          </Link>
        </header>

        <h1 className="mb-5 text-zinc-600">
          Instituições que podem receber doações:
        </h1>
        {orgs.map((org, index) => {
          return (
            <div key={index} className="border border-1 mb-2">
              <div className="text-zinc-400">
                <h1>{orgs[index].name}</h1>
                <div className="w-full flex flex-wrap">
                  <h2>Cidade:</h2>
                  <p>{orgs[index].city}</p>
                </div>
                <div className="w-full flex flex-wrap">
                  <h2>Bairro:</h2>
                  <p>{orgs[index].neighboor}</p>
                </div>
                <div className="flex flex-wrap text-justify">
                  <h2>Descrição:</h2>
                  <p>{orgs[index].presentation}</p>
                </div>
              </div>

              <footer className="mt-4 text-zinc-400">
                <Link href={''}>
                  <a>{orgs[index].links.site}</a>
                </Link>
                <Link href={''}>
                  <a className="flex flex-wrap">
                    {orgs[index].links.instagram}
                  </a>
                </Link>
                <Link href={''}>
                  <a>{orgs[index].links.facebook}</a>
                </Link>
                <Link href={''}>
                  <a>{orgs[index].links.whatsapp}</a>
                </Link>
              </footer>
            </div>
          );
        })}
      </div>
    </div>
  );
}
