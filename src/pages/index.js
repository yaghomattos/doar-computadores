import { Form } from '@unform/web';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { FormDevices } from '../components/form/devices';
import { FormPersonal } from '../components/form/personal';
import api from '../service/api';
import { fetchZip } from '../utils/fetchZip';
import { validateDevices } from '../utils/validateDevices';

import { FaRegHandshake } from 'react-icons/fa';

export default function Home() {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([{ value: '', label: '' }]);
  const [devicesError, setDevicesError] = useState(false);

  /**
   * Hook para setar as informações referentes ao cep
   * @param value -> cep
   */
  const setAddress = useCallback((value) => {
    setLoading(true);

    fetchZip(value).then((response) => {
      if (response.city !== undefined) {
        formRef.current.setFieldValue('state', response.state);
        formRef.current.setFieldValue('city', response.city);
        formRef.current.setFieldValue('streetAddress', response.streetAddress);
        formRef.current.setFieldValue('neighborhood', response.neighborhood);

        formRef.current.getFieldRef('number').focus();
      }
      setLoading(false);
    });
  }, []);

  /**
   * Função para criar equipamentos vazios, atualizando o estado para exibir a
   * quantidade de dispotivos digitados
   * @param deviceCount
   */
  async function handleCreateDevice(deviceCount) {
    var newDevice = { value: '', label: '' };
    for (var i = devices.length; i < deviceCount; i++) {
      setDevices((prevState) => [...prevState, newDevice]);
    }
    formRef.current.setFieldValue('devices', devices);
  }

  /**
   * Função para remover equipamentos, atualizando o estado para exibir apenas a
   * quantidade de equipamentos digitados
   * @param deviceCount
   */
  async function handleDeleteDevice(deviceCount) {
    for (var i = devices.length; i >= deviceCount; i--) {
      setDevices((prevState) => prevState.filter((_, index) => index !== i));
    }
    formRef.current.setFieldValue('devices', devices);
  }

  /**
   * Função para envio do formulário
   * @param form -> objeto com as informações do formulário
   */
  async function handleFormSubmit(form) {
    form.deviceCount = parseInt(form.deviceCount);
    form.phone = form.phone.replace(/[\s()-]/g, '');
    form.zip = form.zip.replace('-', '');

    const data = JSON.stringify(form);

    /**
     * Validação dos erros de preenchimento do formulário com o "try",
     * Caso ocorra algum erro é simulado status 400 ao fazer o envio
     */
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('*O nome é obrigatório'),
        email: Yup.string(),
        phone: Yup.string()
          .transform((value) => value.replaceAll('_', ''))
          .min(11, 'Telefone inválido')
          .required('*O telefone é obrigatório'),
        zip: Yup.string().required('*O cep é obrigatório'),
        city: Yup.string().required('*A cidade é obrigatória'),
        state: Yup.string().required('*O estado é obrigatório'),
        streetAddress: Yup.string().required('*A rua é obrigatória'),
        number: Yup.string().required('*O número é obrigatório'),
        complement: Yup.string(),
        neighborhood: Yup.string().required(
          '*O ponto de referência é obrigatório'
        ),
        deviceCount: Yup.number()
          .required()
          .integer()
          .moreThan(0, 'O número de equipamentos é obrigatório'),
      });

      /* Validação manual do número de equipamentos */
      for (var i = 0; i < form.devices.length; i++) {
        if (
          form.devices[i].type == undefined ||
          form.devices[i].condition == undefined
        ) {
          setDevicesError(true);
          break;
        } else if (devicesError == true) setDevicesError(false);
      }

      await schema.validate(form, {
        abortEarly: false,
      });

      const devicesPassed = await validateDevices(form.devices);

      if (devicesPassed.value === true) {
        api
          .post('/donation', data)
          .then((response) => {
            alert('Envio concluído com exito! Satus ' + response.status);
          })
          .catch((error) => {
            alert(
              'Falha em obter resposta do servidor. Tente novamente mais tarde. \nStatus ' +
                error.response.status
            );
          });
      } else
        alert(
          'Dados faltantes ou errados. Corrigir antes de enviar novamente. \nStatus 400'
        );
    } catch (err) {
      var validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }
      formRef.current.setErrors(validationErrors);

      alert(
        'Dados faltantes ou errados. Corrigir antes de enviar novamente. \nStatus 400'
      );
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-200">
      <Head>
        <title>Doar Computadores</title>
      </Head>

      <div className="mx-auto max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-max px-8 my-5 bg-white shadow-xl rounded-md">
        <header className="mx-auto mt-5 pb-6 border-b-2">
          <h1 className="mb-8 text-4xl sm:text-5xl text-center font-extrabold text-zinc-700">
            Doação de Computadores
          </h1>

          <h3 className="w-full text-xl font-normal text-zinc-700">
            Faça a doação de um computador usado e impacte positivamente na vida
            de pessoas!
          </h3>

          <Link href={'/instituicoes'}>
            <div className="w-fit mx-auto flex mt-4 py-2 px-4 gap-2 items-center bg-green-500 rounded-md cursor-pointer">
              <a className="font-bold text-lg text-white">
                Ver instituições parceiras
              </a>
              <FaRegHandshake size="24" color="white" />
            </div>
          </Link>
        </header>

        <h2 className="mt-8 mb-8 text-3xl sm:text-4xl text-center font-extrabold text-zinc-700">
          Fazer Doação
        </h2>

        <Form
          className="flex flex-col items-center "
          initialData={{ deviceCount: 1 }}
          ref={formRef}
          onSubmit={handleFormSubmit}
        >
          <section>
            <FormPersonal
              setAddress={setAddress}
              isLoading={loading}
              handleCreateDevice={handleCreateDevice}
              handleDeleteDevice={handleDeleteDevice}
            />
          </section>

          <section className="w-full">
            <h2 className=" text-2xl font-bold text-zinc-500">Equipamentos</h2>
            <FormDevices devices={devices} devicesError={devicesError} />
          </section>

          <button
            className="inline-block mt-5 mb-12 py-3 px-7 w-1/3 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 rounded-md"
            type="submit"
          >
            Enviar
          </button>
        </Form>
      </div>
    </div>
  );
}
