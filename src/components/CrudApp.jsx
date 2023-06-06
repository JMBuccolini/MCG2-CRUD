import React, { useEffect, useState } from "react";
import axios from "axios";
import CrudForm from "./CrudForm";
import Loader from "./Loader";
import CrudTable from "./CrudTable";

function CrudApp() {
  const [db, setDb] = useState(); //generamos un estado llamado db donde guardaremos la info de la base de datos
  const [dataToEdit, setDataToEdit] = useState(); //este estado permite manejar algunas funcionalidades de la página
  const [loading, setLoading] = useState(); //este estado nos permite controlar cuándo aparece el componente <Loader/> en pantalla

  //Función que busca toda la información en la base de datos y la aloja en el hook correspondiente

  const getData = async () => {
    const res = await axios.get("http://localhost:5000/personajes"); //le pido a axios que me traiga la info de ese endpoint
    const json = res.data; //guardo la info que está en res.data en json
    setDb(json); //guardo la info traída por axios en el estado "db"
  };

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  //Función que crea información en la base de datos
  //{name:'Juan',lastname:'Buccolini', id:1234}

  const createData = async (data) => {
    data.id = Date.now(); //creamos una propiedad nueva al objeto recibido, llamada id y le damos un valor con Date.now()
    axios.post("http://localhost:5000/personajes", data); //posteo en el endpoint de mi base de datos la informacion que le paso como 2do parámetro
    getData(); //cuando el usuario agrega información, disparo nuevamente getData para que se actualicen mis componentes y se muestre todo lo agregado
  };

  //Función que actualiza información que ya está en la DB

  const updateData = async (data) => {
    let endpoint = `http://localhost:5000/personajes/${data.id}`; //el endpoint se modifica dependiendo de la información que recibe en data

    let options = {
      method: "PUT", //este request lo que hace es actualizar información
      headers: { "content-type": "application/json" },
      data: JSON.stringify(data),
    };

    await axios(endpoint, options);

    getData();
  };

  //Función que elimina información de la DB

  const deleteData = async (id, name) => {
    let isDelete = window.confirm(
      //si se acepta este mensaje, isDelete pasará a tener un valor de "true", caso contrario "false"
      `Estás seguro de que deseas eliminar el personaje ${name}?`
    );

    if (isDelete) {
      //nos preguntamos si isDelete está en "true"
      let endpoint = `http://localhost:5000/personajes/${id}`;
      let options = {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      };

      await axios(endpoint, options);

      getData();
    } else {
      return; //corto la ejecución de deleteData y no pasa nada
    }
  };

  return (
    <div>
      <h2>CRUD App</h2>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />

      {loading && <Loader />}

      {db && (
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      )}
    </div>
  );
}

export default CrudApp;
