import { Form } from '@unform/web';
import { useRef } from 'react';
import InputMask from '../components/input';
import Select from '../components/select';

export default function Home() {
  const formRef = useRef();

  async function handleFormSubmit(form, { reset }) {
    var array = [];

    form.deviceCount = parseInt(form.deviceCount);
    array.push(form.devices);

    form.devices = array;

    console.log(JSON.stringify(form));
  }

  return (
    <Form
      initialData={{ deviceCount: 0 }}
      ref={formRef}
      onSubmit={handleFormSubmit}
    >
      <h1>Dados Pessoais</h1>
      <InputMask name="name" placeholder="nome" />
      <InputMask type="email" name="email" placeholder="email" />
      <InputMask name="phone" placeholder="telefone" mask="99 999999999" />
      <h3>Endereço</h3>
      <InputMask name="zip" placeholder="cep" mask="99999 999" />
      <InputMask name="city" placeholder="cidade" />
      <InputMask name="state" placeholder="estado" />
      <InputMask name="streetAddress" placeholder="rua" />
      <InputMask name="number" placeholder="número" />
      <InputMask name="complement" placeholder="complemento" />
      <InputMask name="neighborhood" placeholder="ponto de referência" />

      <InputMask type="number" name="deviceCount" />

      <h1>Equipamentos</h1>
      <Select
        name="devices.type"
        placeholder="Tipo de equipamento"
        instanceId="selectType"
        options={[
          { value: 'notebook', label: 'Notebook' },
          { value: 'desktop', label: 'Desktop' },
          { value: 'netbook', label: 'Netbook ' },
          { value: 'screen', label: 'Monitor ' },
          { value: 'printer', label: 'Impressora' },
          { value: 'scanner', label: 'Scanner ' },
        ]}
      />
      <Select
        name="devices.condition"
        placeholder="Estado de conservação"
        instanceId="selectCondition"
        options={[
          {
            value: 'working',
            label: 'Tem todas as partes, liga e funciona normalmente',
          },
          {
            value: 'notWorking',
            label: 'Tem todas as partes, mas não liga mais',
          },
          {
            value: 'broken',
            label: 'Faltam peças, funciona só as vezes ou está quebrado',
          },
        ]}
      />
      <button type="submit">Enviar</button>
    </Form>
  );
}
