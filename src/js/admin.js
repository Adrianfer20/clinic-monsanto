export function obtenerFechaActual() {
    // Obtenemos la fecha actual
    const fecha = new Date();
  
    // Definimos los nombres de los días de la semana en español
    const nombresDias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
    // Obtenemos el día de la semana, el día, el mes y el año
    const diaSemana = nombresDias[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses comienzan en 0, por lo que se suma 1
    const año = fecha.getFullYear();
  
    // Formateamos la fecha en el formato deseado: "DíaDeLaSemana día/mes/año"
    const fechaFormateada = `${diaSemana} ${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;
  
    // Retornamos la fecha formateada
    return fechaFormateada;
  }

  export const ordenarHistoryPorFecha = (usuarios, citas) => {
    const citasPorFecha = {};
    // console.log(usuarios);
    // citas.forEach(obj => {
    //   console.log("id citas: ", obj.id);
    // });
    // usuarios.forEach(obj => {
    //   console.log("array id user appoin: ", obj.appointments);
    // });
    citas.forEach((cita) => {
      const fecha = cita.date.substring(0, 10);
      const usuario = usuarios.find((user) => user.id === cita.idUser);
      if (!usuario) return; // Si no se encuentra el usuario, se omite la cita
  
      const pacientes = usuario.appointments
        .filter((appointment) => appointment === cita.id)
        .map(() => ({ ...usuario }));
  
      if (!citasPorFecha[fecha]) {
        citasPorFecha[fecha] = [];
      }
  
      citasPorFecha[fecha].push({ citaId: cita.id, price: cita.price, pacientes });
    });
  
    const fechasOrdenadas = Object.keys(citasPorFecha).sort();
  
    const citasOrdenadas = fechasOrdenadas.map((fecha) => {
      return { fecha, citas: citasPorFecha[fecha] };
    });
    return citasOrdenadas;
  };
export function getDate() {
    var fecha = new Date();
    
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // Los meses van de 0 a 11
    var anio = fecha.getFullYear();
    
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    
    // Agrega un cero inicial si el día, mes, hora o minutos tienen un solo dígito
    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }
    if (hora < 10) {
      hora = "0" + hora;
    }
    if (minutos < 10) {
      minutos = "0" + minutos;
    }
    
    var fechaHora = ""+dia + "/" + mes + "/" + anio;
    return fechaHora;
  }
  
   //Functions
//   export const ordenarHistoryPorFecha = (usuarios, citas) => {
//     // Crear un objeto para almacenar las citas agrupadas por fecha
//     const citasPorFecha = {};
  
//     // Recorrer las citas y agruparlas por fecha
//     let usuario;
//     citas.forEach((cita) => {
//       const fecha = cita.date.substring(0, 10);
//       usuarios.forEach((user) => {
//         if (user.id === cita.idUser) return (usuario = user);
//       });
//       let paciente;
//       usuario.appointments.forEach((appointment) => {
//         if (appointment === cita.id) return (paciente = { ...usuario });
//       });
//       console.log(paciente);
//       if (!citasPorFecha[fecha]) {
//         citasPorFecha[fecha] = [];
//       }
  
//       citasPorFecha[fecha].push({ citaId: cita.id, price: cita.price, paciente });
//     });
  
//     // Ordenar las fechas de forma ascendente
//     const fechasOrdenadas = Object.keys(citasPorFecha).sort();
  
//     // Crear un array de objetos ordenados por fecha con las citas y los pacientes
//     const citasOrdenadas = fechasOrdenadas.map((fecha) => {
//       return { fecha, citas: citasPorFecha[fecha] };
//     });
  
//     return citasOrdenadas;
//   };

// export const ordenarHistoryPorFecha = (usuarios, citas) => {
//     const citasPorFecha = {};
//     console.log(usuarios);
  
//     for (let i = 0; i < citas.length; i++) {
//       const cita = citas[i];
//       const fecha = cita.date.substring(0, 10);
//       let usuario = null;
  
//       for (let j = 0; j < usuarios.length; j++) {
//         if (usuarios[j].id === cita.idUser) {
//           usuario = usuarios[j];
//           break;
//         }
//       }
  
//       if (!usuario) continue;
  
//       const pacientes = [];
  
//       for (let k = 0; k < usuario.appointments.length; k++) {
//         if (usuario.appointments[k] === cita.id) {
//           pacientes.push({ ...usuario });
//         }
//       }
  
//       if (!citasPorFecha[fecha]) {
//         citasPorFecha[fecha] = [];
//       }
  
//       citasPorFecha[fecha].push({ citaId: cita.id, price: cita.price, pacientes });
//     }
  
//     const fechasOrdenadas = Object.keys(citasPorFecha).sort();
//     const citasOrdenadas = fechasOrdenadas.map((fecha) => {
//       return { fecha, citas: citasPorFecha[fecha] };
//     });
  
//     return citasOrdenadas;
//   };
  