import api from '../service/api';

/**
 * Função para pesquisar e retornar as informações do cep
 * Caso o cep não exista é retornado "undefined"
 * @param zip -> cep sem caracteres especiais
 */

export async function fetchZip(zip) {
  var state = '';
  var city = '';
  var streetAddress = '';
  var neighborhood = '';

  try {
    const { data } = await api.get(`https://viacep.com.br/ws/${zip}/json/`);

    state = data.uf;
    city = data.localidade;
    streetAddress = data.logradouro;
    neighborhood = data.bairro;
  } catch {
    state = undefined;
    city = undefined;
    streetAddress = undefined;
    neighborhood = undefined;
  }

  return { state, city, streetAddress, neighborhood };
}
