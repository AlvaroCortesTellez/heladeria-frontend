import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import IngredienteForm from './IngredienteForm';

const IngredientesList = () => {
  const [ingredientes, setIngredientes] = useState([]);

  const fetchIngredientes = async () => {

    try {
      const { data, error } = await supabase.from('ingredientes').select('*');
      if (error) throw error;
      setIngredientes(data);
    } catch (err) {
      console.error(err.message);
    }

    const { data } = await supabase.from("ingredientes").select("*");
    setIngredientes(data || []);

  };

  useEffect(() => { fetchIngredientes(); }, []);

  return (
    <div>
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
    </div>
  );
};

export default IngredientesList;
