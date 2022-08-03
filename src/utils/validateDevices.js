/**
 * Função auxiliar para verificação da quantidade de equipamentos
 * @param form -> formulário com as informações de equipamentos
 */

export async function validateDevices(devices) {
  var value = true;

  for (var i = 0; i < devices.length; i++) {
    if (devices[i].type == undefined || devices[i].condition == undefined) {
      value = false;
      break;
    }
  }

  return { value };
}
