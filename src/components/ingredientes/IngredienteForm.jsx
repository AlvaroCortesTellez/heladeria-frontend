import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient.js";

const IngredienteForm = ({ ingrediente, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    calorias: "",
    inventario: "",
    es_vegetariano: false,
    es_sano: true,
    tipo: "base",
    sabor: "",
  });

  useEffect(() => {
    if (ingrediente) setFormData(ingrediente);
  }, [ingrediente]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error;
    if (ingrediente) {
      // Update
      const { data, error: err } = await supabase
        .from("ingredientes")
        .update(formData)
        .eq("id", ingrediente.id);
      error = err;
    } else {
      // Insert
      const { data, error: err } = await supabase.from("ingredientes").insert([formData]);
      error = err;
    }
    if (error) alert("Error: " + error.message);
    else {
      onSave();
      setFormData({
        nombre: "",
        precio: "",
        calorias: "",
        inventario: "",
        es_vegetariano: false,
        es_sano: true,
        tipo: "base",
        sabor: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded">
      <h5>{ingrediente ? "Editar" : "Nuevo"} Ingrediente</h5>
      <div className="mb-2">
        <label className="form-label">Nombre</label>
        <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Precio</label>
        <input type="number" name="precio" className="form-control" value={formData.precio} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Calorías</label>
        <input type="number" name="calorias" className="form-control" value={formData.calorias} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Inventario</label>
        <input type="number" name="inventario" className="form-control" value={formData.inventario} onChange={handleChange} required />
      </div>
      <div className="form-check mb-2">
        <input type="checkbox" name="es_vegetariano" className="form-check-input" checked={formData.es_vegetariano} onChange={handleChange} />
        <label className="form-check-label">Vegetariano</label>
      </div>
      <div className="form-check mb-2">
        <input type="checkbox" name="es_sano" className="form-check-input" checked={formData.es_sano} onChange={handleChange} />
        <label className="form-check-label">Sano</label>
      </div>
      <div className="mb-2">
        <label className="form-label">Tipo</label>
        <select name="tipo" className="form-select" value={formData.tipo} onChange={handleChange}>
          <option value="base">Base</option>
          <option value="complemento">Complemento</option>
        </select>
      </div>
      {formData.tipo === "base" && (
        <div className="mb-2">
          <label className="form-label">Sabor</label>
          <input type="text" name="sabor" className="form-control" value={formData.sabor} onChange={handleChange} />
        </div>
      )}
      <button type="submit" className="btn btn-primary">{ingrediente ? "Actualizar" : "Crear"}</button>
    </form>
  );
};

export default IngredienteForm;
