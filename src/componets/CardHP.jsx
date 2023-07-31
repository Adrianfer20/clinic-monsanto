/* eslint-disable react/prop-types */
//React
import { useState } from "react";
//Components
import { CardHPDetails } from "./CardHP-Details.jsx";
import { CardHPFooter } from "./CardHP-Footer.jsx";
import { CardHPHeader } from "./CardHP-Header.jsx";

// eslint-disable-next-line react/prop-types
export function CardHistory({ datos }) {
  const countAllMount = (arr) => {
    const total = arr.reduce((accumulator, current) => {
      if (current.price) {
        return accumulator + current.price;
      }
      return accumulator;
    }, 0);

    return total;
  };

  const [visibleComponents, setVisibleComponents] = useState([]);

  const toggleVisibility = (index) => {
    setVisibleComponents((prevVisibleComponents) => {
      const updatedVisibleComponents = [...prevVisibleComponents];
      updatedVisibleComponents[index] = !updatedVisibleComponents[index];
      return updatedVisibleComponents;
    });
  };
  return (
    <>
      {/* // eslint-disable-next-line react/prop-types */}
      {datos &&
        datos.map((medicalRecord, index) => (
          <div key={index} className="grid gap-1">
            <CardHPHeader
              date={medicalRecord.fecha}
              i={index}
              toggleVisibility={toggleVisibility}
            />
            {visibleComponents[index] && (
              <div>
                {medicalRecord.citas.map((cita) => (
                  <div key={cita.citaId}>
                    {cita.pacientes.map((paciente) => (
                      <div key={paciente.id}>
                        {paciente && (
                          <CardHPDetails
                            id={paciente.id}
                            citaId={cita.citaId}
                            today={medicalRecord.fecha}
                            identity={paciente.identity}
                            fullName={paciente.fullName}
                            price={cita.price}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <CardHPFooter
                  usersAll={medicalRecord.citas.length}
                  mountAll={countAllMount(medicalRecord.citas)}
                />
              </div>
            )}
          </div>
        ))}
    </>
  );
}

// {cita.paciente && (
//   <CardHPDetails
//     citaId={cita.citaId}
//     identity={cita.paciente.identity}
//     fullName={cita.paciente.fullName}
//     price={cita.price}
//   />
// )}
