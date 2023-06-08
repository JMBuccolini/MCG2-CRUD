import React, { useEffect, useState } from "react";

const initialForm = {
  name: "",
  lastname: "",
  id: null,
};

function CrudForm({ createData, updateData, dataToEdit, setDataToEdit }) {
  const [form, setForm] = useState(initialForm);

  //Funciones manejadoras ( Handlers )
  const handleChange = (e) => {
    //el usuario escribe name: 'Pepito' lastname: 'Perez'
    setForm({
      ...form, //me traigo una copia exacta de mi estado form //{name:,lastname:,id:}
      [e.target.name]: e.target.value, //e.target.name = "name" e.target.value = "Pepito"
    });
  };

  const handleSubmit = (e) => { //Esta función se dispara cuando el usuario hace click en "Enviar"
    e.preventDefault();//Detiene el comportamiento por defecto del evento, en este caso sería el "submit"

    const dataRegEx = /^[A-Z][a-z]+$/ //Esta expresión regular, acepta solamente caracteres de la "a" a la "z" siendo solamente la 1ra mayúscula.


    if (!form.name || !form.lastname) { //Previene que algún input se envíe vacío
      alert("Datos incompletos");
      return;//corta la ejecución de la función 
    }

    //dataRegEx.test(form.name)---> da true o false. Si el usuario ingresa un caracter erróneo, esto da "false". !false === true
    if(!dataRegEx.test(form.name) || !dataRegEx.test(form.lastname)){
      //instrucciones
      alert('Debes colocar solamente letras.Ten en cuenta que solo la 1ra debe ser mayúscula.');
      return;
    }
  

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  useEffect(() => {
    if (dataToEdit) {
      //si esto es true, significa que el usuario hizo click en editar
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]); //cada vez que dataToEdit cambie, useEffect accionará las instrucciones nuevamente

  //form = {name: Padme, lastname:Amidala, id:1686095240000}

  return (
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={form.name}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Apellido"
          onChange={handleChange}
          value={form.lastname}
        />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
}

export default CrudForm;
