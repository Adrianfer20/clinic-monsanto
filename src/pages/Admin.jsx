//Context
import { useAuth } from "../context/AuthContext.jsx";
//Icons
import {
  IconDollar,
  IconSave,
  IconUser,
} from "../componets/Icons.jsx";
//Firebase
import {
  readColletion,
  saveAppointment,
  saveUser,
  updateUserAppointments,
} from "../firebase/firebase.db.js";
//Componets
import { Btn } from "../componets/Btn.jsx";
import { Input } from "../componets/Input.jsx";

import { CardHistory } from "../componets/CardHP.jsx";
import { updatePriceAppointment } from "../firebase/firebase.db.js";

import { useState, useEffect } from "react";
import {
  obtenerFechaActual,
  ordenarHistoryPorFecha,
  getDate,
} from "../js/admin.js";
import { Toaster, toast } from "react-hot-toast";

//Requerimientos del Formulario de Citas;
//Mostrar y Validar si el Paciente ya esta registrador por su CI
//Si existe el paciente verificar si ya tiene una cita justo para ese dia.
//Si existe ya una cita justo para ese dia preguntar si editarla.

import { InputSearchIdentity } from "../componets/InputSearchIdentity.jsx";

export function Admin() {
  //firebase;
  const auth = useAuth();
  const { displayName } = auth.user;

  const [datos, setDatos] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointmets, setAppointments] = useState([]);

  const getData = async () => {
    const collectionUsers = await readColletion("Users");
    const collectionAppointments = await readColletion("Appointments");
    setUsers(collectionUsers);
    setAppointments(collectionAppointments);
    const history = ordenarHistoryPorFecha(
      collectionUsers,
      collectionAppointments
    );
    setDatos(history);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFormAppointment = async (e) => {
    try {
      e.preventDefault();
      const toastId = toast.loading("Espere un momento...");
      const $form = document.getElementById("form-Appointment");
      const identity = $form.querySelector("#identity").value;
      const fullName = $form.querySelector("#fullName").value;
      const price = Number($form.querySelector("#price").value);

      //Verifica si existe algun input vacio;
      if (!identity || !fullName || !price)
        return toast.error("Asegurate de ingresar los datos requeridos.");
      let message;

      const isUpdatePrice = $form.dataset.appointment;
      if (isUpdatePrice) {
        console.log("Actualizando precio de la cita.");
        const response = await updatePriceAppointment(isUpdatePrice, { price });
        if (response.success) {
          $form.removeAttribute("data-appointment");
          message = "Se ah actualizado la cita con su paciente corespondiente.";
        }
      } else {
        //Hay que guardar una nueva cita pero primero verificar si el usuario ya tiene una cita para ese dia.
        //si exite un usuario verificar si ya tiene una cita para ese dia
        //sino; guardar nueva cita
        //sino existe el usuriorio registrar uno nuevo

        const User = users.filter((user) =>
          user.identity.includes(identity)
        )[0];
        if (User) {
          const date = getDate();
          // const date = "10/07/2023";
          //Buscar todas las citas de ese dia.
          const isAppointments = appointmets.filter((appointment) =>
          appointment.date.includes(date)
          );
          console.log(date);
          console.log(isAppointments);
          //Buscar si entre las citas de ese dia esta el usuario.
          const isIdUser = isAppointments.filter((appointment) =>
            appointment.idUser.includes(User.id)
          );
          //Si exite una cita acualizarla.
          if (isIdUser.length > 0)
            return console.log(
              "Este usuario tiene una cita. puede actalizarla."
            );
          //Si el usuario no tiene cita asignarle una nueva
          console.log("asignando cita al usuario");
          const newAppointment = await saveAppointment(User.id, {
            price,
            date: getDate(),
          });
          //actualizar citas del usuario;
          // eslint-disable-next-line no-unused-vars
          const updateUser = await updateUserAppointments(
            User,
            newAppointment.id
          );
          message = "Se le ah asigando una cita a este paciente"
        }
        //Si el usuario no existe crear un usuario y asignarle una cita;
        else {
          const newUser = await saveUser({ identity, fullName });
          const newAppointment = await saveAppointment(newUser.id, {
            price,
            date: getDate(),
          });
          // eslint-disable-next-line no-unused-vars
          const updateUser = await updateUserAppointments(
            newUser,
            newAppointment.id
          );
          message = "Se a registrado un nuevo paciente y se le ah asigando una cita."
        }
      }
      $form.reset();
      getData();
      toast.dismiss(toastId);
      return toast(message);
    } catch (error) {
      toast.error("Ah ocurrido un error: " + error);
    }
  };

  return (
    <header className="flex flex-col">
      <h1 className="text-2xl font-black uppercase py-8">
        ¡Bienvenido, {displayName ? displayName : "Administrador"}!
      </h1>
      <div className="flex flex-wrap justify-around gap-6 p-4">
        <h2 className="w-full text-lg text-center font-light mb-4">
          Control de Pacientes
        </h2>

        <form
          id="form-Appointment"
          className="w-full md:w-5/12 max-w-md h-72 bg-slate-100 text-slate-900 rounded-md shadow-md py-8 px-6"
          data-user=""
          data-appointment=""
        >
          <div className="flex flex-col justify-center gap-4">
            <h3 className="text-center font-semibold">
              {obtenerFechaActual()}
            </h3>
            <InputSearchIdentity users={users} />

            <Input id="fullName" type="text" text="Ingresar Nombre...">
              <IconUser />
            </Input>

            <Input id="price" type="text" text="Ingresar Monto...">
              <IconDollar />
            </Input>
            <Btn type={true} handleClick={handleFormAppointment} text="Guardar">
              <IconSave />
            </Btn>
          </div>
        </form>

        <form className="w-full md:w-6/12 px-6 ">
          <h3 className="text-center font-semibold mb-4">Historial</h3>
          <div className="grid gap-4">
            <CardHistory datos={datos} />
          </div>
        </form>
      </div>
      <Toaster />
    </header>
  );
}
