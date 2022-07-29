import { Form } from '@unform/web';
import { useRef } from 'react';
import * as Yup from 'yup';
import InputMask from '../components/input';
import Select from '../components/select';
import api from '../service/api';

export default function Home() {
  const formRef = useRef();

  async function handleFormSubmit(form, { reset }) {
    var array = [];
    var data = '';

    form.deviceCount = parseInt(form.deviceCount);
    array.push(form.devices);

    form.devices = array;

    data = JSON.stringify(form);

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email('teste'),
        phone: Yup.string().min(11).required('O telefone é obrigatório'),
        zip: Yup.string().required('O cep é obrigatório'),
        city: Yup.string().required('A cidade é obrigatória'),
        state: Yup.string().required('O estado é obrigatório'),
        streetAddress: Yup.string().required('O endereço é obrigatório'),
        number: Yup.string().required('O número é obrigatório'),
        complement: Yup.string(),
        neighborhood: Yup.string().required(
          'O ponto de referência é obrigatório'
        ),
        deviceCount: Yup.number()
          .required()
          .integer()
          .moreThan(0, 'O número de dispositivos é obrigatório'),
      });

      await schema.validate(form, {
        abortEarly: false,
      });

      console.log('tudo certo');
    } catch (err) {
      var validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          console.log(error);
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }

    api
      .post('/donation', data)
      .then((response) => {
        alert('Envio concluído com exito! ' + response.status);
        console.log(data);
      })
      .catch((error) => {
        if (error.response.status == 400) {
          alert('erro 400');
        } else {
          alert(
            'Falha em obter resposta do servidor. Tente novamente mais tarde. \nStatus ' +
              error.response.status
          );
        }
      });
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
