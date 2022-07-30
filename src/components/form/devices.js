import React from 'react';
import Select from '../select';

export function FormDevices() {
  return (
    <div>
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
    </div>
  );
}
