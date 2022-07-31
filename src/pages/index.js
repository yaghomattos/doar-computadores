import { Form } from '@unform/web';
import Head from 'next/head';
import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormDevices } from '../components/form/devices';
import { FormPersonal } from '../components/form/personal';
import api from '../service/api';
import { fetchZip } from '../utils/fetchZip';

export default function Home() {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([{ value: '', label: '' }]);
  const [devicesError, setDevicesError] = useState(false);

  const setAddress = useCallback((value) => {
    setLoading(true);

    fetchZip(value).then((response) => {
      if (response.city !== undefined) {
        formRef.current.setFieldValue('state', response.state);
        formRef.current.setFieldValue('city', response.city);
        formRef.current.setFieldValue('streetAddress', response.streetAddress);
        formRef.current.setFieldValue('neighborhood', response.neighborhood);
      }

      setLoading(false);

      formRef.current.getFieldRef('number').focus();
    });
  }, []);

  async function handleCreateDevice(deviceCount) {
    var newDevice = { value: '', label: '' };
    for (var i = devices.length; i < deviceCount; i++) {
      setDevices((prevState) => [...prevState, newDevice]);
    }
    formRef.current.setFieldValue('devices', devices);
  }

  async function handleDeleteDevice(deviceCount) {
    for (var i = devices.length; i >= deviceCount; i--) {
      setDevices((prevState) => prevState.filter((_, index) => index !== i));
    }
    formRef.current.setFieldValue('devices', devices);
  }

  async function handleFormSubmit(form) {
    form.deviceCount = parseInt(form.deviceCount);

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('*O nome é obrigatório'),
        email: Yup.string(),
        phone: Yup.string().min(11).required('*O telefone é obrigatório'),
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
          .moreThan(0, 'O número de dispositivos é obrigatório'),
      });

      form.devices.forEach((device) => {
        if (device.type == undefined || device.condition == undefined) {
          setDevicesError(true);
        } else setDevicesError(false);
      });

      await schema.validate(form, {
        abortEarly: false,
      });

      const data = JSON.stringify(form);

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
    } catch (err) {
      var validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }
      formRef.current.setErrors(validationErrors);
    }
  }

  return (
    <div className="flex flex-col min-h-screen h-full items-center bg-gray-200">
      <Head>
        <title>Doar Computadores</title>
      </Head>
      <div className=" flex flex-col px-8 my-5 items-center bg-white rounded-md">
        <Form
          className="flex flex-col items-center "
          initialData={{ deviceCount: 1 }}
          ref={formRef}
          onSubmit={handleFormSubmit}
        >
          <h1 className="mt-12 mb-8 text-5xl font-extrabold text-zinc-700">
            Doação de Computadores
          </h1>

          <section className="flex flex-wrap justify-center">
            <FormPersonal
              setAddress={setAddress}
              isLoading={loading}
              handleCreateDevice={handleCreateDevice}
              handleDeleteDevice={handleDeleteDevice}
            />
          </section>

          <div className="w-full relative "></div>

          <section className="flex flex-col justify-center">
            <h2 className="pl-6 text-2xl font-bold text-zinc-500">
              Equipamentos
            </h2>
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
