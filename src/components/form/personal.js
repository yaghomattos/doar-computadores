import React from 'react';
import InputMask from '../input';

export function FormPersonal({ setAddress, handleCreateSelect }) {
  return (
    <div>
      <h1>Dados Pessoais</h1>
      <InputMask name="name" placeholder="nome" />
      <InputMask type="email" name="email" placeholder="email" />
      <InputMask name="phone" placeholder="telefone" mask="99 999999999" />
      <h3>Endereço</h3>
      <InputMask
        name="zip"
        placeholder="cep"
        mask="99999999"
        onChange={({ target }) => {
          const length = target.value.replaceAll('_', '').length;
          if (length === 8) setAddress(target.value);
        }}
      />
      <InputMask name="city" placeholder="cidade" />
      <InputMask name="state" placeholder="estado" />
      <InputMask name="streetAddress" placeholder="rua" />
      <InputMask name="number" placeholder="número" />
      <InputMask name="complement" placeholder="complemento" />
      <InputMask name="neighborhood" placeholder="ponto de referência" />
      <InputMask
        type="number"
        name="deviceCount"
        onChange={handleCreateSelect}
      />
    </div>
  );
}
