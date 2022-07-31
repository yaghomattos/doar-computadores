import React from 'react';
import Select from '../select';

export function FormDevices({ devices, devicesError }) {
  return (
    <div className="w-full px-5 ">
      {devices.map((device, index) => {
        return (
          <div key={index} className="flex flex-col items-center ">
            <h4 className="text-xl text-zinc-400 font-medium pl-4">{`Equipamento ${
              index + 1
            }:`}</h4>

            {devicesError && (
              <p className="text-red-600 pl-4">
                {'*Os campos tipo e estado de conservação são obrigatórios'}
              </p>
            )}

            <div className="flex flex-wrap w-full gap-1">
              <Select
                name={`devices.${index}.type`}
                placeholder="Tipo de equipamento"
                instanceId={`selectType${index}`}
                options={[
                  { value: 'notebook', label: 'Notebook' },
                  { value: 'desktop', label: 'Desktop' },
                  { value: 'netbook', label: 'Netbook ' },
                  { value: 'screen', label: 'Monitor ' },
                  { value: 'printer', label: 'Impressora' },
                  { value: 'scanner', label: 'Scanner ' },
                ]}
                devicesError={devicesError}
              />
              <Select
                name={`devices.${index}.condition`}
                placeholder="Estado de conservação"
                instanceId={`selectCondition${index}`}
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
                    label:
                      'Faltam peças, funciona só as vezes ou está quebrado',
                  },
                ]}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
