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
      <h2 className="text-2xl font-bold text-zinc-400">Dados Pessoais</h2>
      <div className="flex flex-wrap w-full pb-1 gap-1">
        <InputMask name="name" placeholder="nome" />
        <InputMask type="email" name="email" placeholder="email" />
        <InputMask name="phone" placeholder="telefone" mask="(99) 99999-9999" />
      </div>

      <h3 className="text-xl font-bold text-zinc-400">Endereço</h3>

      <div className="flex flex-wrap w-full gap-1">
        <InputMask
          name="zip"
          placeholder="cep"
          mask="99999-999"
          onChange={({ target }) => {
            const value = target.value.replaceAll('-', '');
            const length = value.replaceAll('_', '').length;
            if (length === 8) setAddress(value);
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
        <InputMask name="neighborhood" placeholder="bairro" />
        <InputMask name="number" placeholder="número" />
        <InputMask name="complement" placeholder="complemento" />
      </div>

      <div className="flex mt-6 pt-10 pb-2 items-center jusitfy-center border-t-2 border-zinc-200 gap-2">
        <h3 className="text-2xl font-bold text-zinc-400">
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
