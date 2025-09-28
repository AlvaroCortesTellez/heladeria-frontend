<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import IngredienteForm from './IngredienteForm';
=======
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import IngredienteForm from "./IngredienteForm";
>>>>>>> f3601b207ea0add1c759beb397192741f5012458

const IngredientesList = () => {
  const [ingredientes, setIngredientes] = useState([]);

  const fetchIngredientes = async () => {
<<<<<<< HEAD
    try {
      const { data, error } = await supabase.from('ingredientes').select('*');
      if (error) throw error;
      setIngredientes(data);
    } catch (err) {
      console.error(err.message);
    }
=======
    const { data } = await supabase.from("ingredientes").select("*");
    setIngredientes(data || []);
>>>>>>> f3601b207ea0add1c759beb397192741f5012458
  };

  useEffect(() => { fetchIngredientes(); }, []);

  return (
    <div>
<<<<<<< HEAD
      <div className="row">
        {ingredientes.map(i => (
          <div className="col-md-4" key={i.id}>
            <div className="card m-2 p-2">
              <h5>{i.nombre}</h5>
              <p>Precio: ${i.precio}</p>
              <p>Inventario: {i.inventario}</p>
            </div>
          </div>
        ))}
      </div>
      <IngredienteForm refresh={fetchIngredientes} />
=======
      <IngredienteForm refresh={fetchIngredientes} />
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Calorías</th>
            <th>Inventario</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((i) => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>{i.precio}</td>
              <td>{i.calorias}</td>
              <td>{i.inventario}</td>
              <td>{i.tipo}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={async () => {
                  await supabase.from("ingredientes").delete().eq("id", i.id);
                  fetchIngredientes();
                }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
>>>>>>> f3601b207ea0add1c759beb397192741f5012458
    </div>
  );
};

export default IngredientesList;
