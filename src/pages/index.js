import { Form } from '@unform/web';
import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormDevices } from '../components/form/devices';
import { FormPersonal } from '../components/form/personal';
import api from '../service/api';
import { fetchZip } from '../utils/fetchZip';

export default function Home() {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);

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
    });
  }, []);

  function handleCreateSelect() {
    console.log(formRef.current.getFieldValue('deviceCount'));
  }

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
    } catch (err) {
      var validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
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
      <section id="section1">
        <FormPersonal
          setAddress={setAddress}
          handleCreateSelect={handleCreateSelect}
          isLoading={loading}
        />
      </section>
      <section id="section2">
        <div>
          <FormDevices />
          <button type="submit">Enviar</button>
        </div>
      </section>
    </Form>
  );
}
