export async function validateDevices(form) {
  var value = true;

  form.devices.forEach((device) => {
    if (device.type == undefined || device.condition == undefined)
      value = false;
    else value = true;
  });

  return { value };
}
