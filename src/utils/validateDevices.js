/**
 * Função auxiliar para verificação da quantidade de equipamentos
 * @param form -> formulário com as informações de equipamentos
 */

export async function validateDevices(form) {
  var value = true;

  form.devices.forEach((device) => {
    if (device.type == undefined || device.condition == undefined)
      value = false;
    else value = true;
  });

  return { value };
}
