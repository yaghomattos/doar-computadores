import React from 'react';
import InputMask from '../input';

export function FormPersonal({
  setAddress,
  handleCreateDevice,
  isLoading,
  handleDeleteDevice,
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold text-zinc-500">Dados Pessoais</h2>
      <div className="flex flex-wrap w-full pb-2 gap-1">
        <InputMask name="name" placeholder="nome" />
        <InputMask name="email" placeholder="email" />
        <InputMask name="phone" placeholder="telefone" mask="99 999999999" />
      </div>
      <h3 className="text-1xl font-bold text-zinc-500">Endereço</h3>

      <div className="flex flex-wrap w-full gap-1">
        <InputMask
          name="zip"
          placeholder="cep"
          mask="99999999"
          onChange={({ target }) => {
            const length = target.value.replaceAll('_', '').length;
            if (length === 8) setAddress(target.value);
          }}
        />
        {isLoading && <span>pesquisando cep...</span>}
        <InputMask name="city" placeholder="cidade" />
        <InputMask name="state" placeholder="estado" />
      </div>
      <div className="w-full">
        <InputMask
          className="w-full h-12 px-2 py-2 my-1 font-normal text-xl text-zinc-600 bg-white placeholder:text-zinc-400 border border-zinc-300 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
          name="streetAddress"
          placeholder="rua"
        />
      </div>
      <div className="flex flex-wrap w-full gap-1">
        <InputMask name="number" placeholder="número" />
        <InputMask name="complement" placeholder="complemento" />
        <InputMask name="neighborhood" placeholder="ponto de referência" />
      </div>

      <div className="flex pt-1 pb-5 items-center jusitfy-center">
        <h3 className="mr-2 text-xl font-bold text-zinc-400">
          Quantos equipamentos serão doados ?
        </h3>
        <InputMask
          className="w-24 h-12 px-2 py-2 my-0.5 font-normal text-xl text-zinc-600 bg-white placeholder:text-zinc-400 border border-zinc-300 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
          min="1"
          type="number"
          name="deviceCount"
          onChange={({ target }) => {
            handleCreateDevice(target.value);
            handleDeleteDevice(target.value);
          }}
        />
      </div>
    </div>
  );
}
