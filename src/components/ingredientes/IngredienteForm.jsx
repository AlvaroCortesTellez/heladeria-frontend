import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function IngredienteForm({ onSaved }) {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    calorias: "",
    inventario: "",
    es_vegetariano: false,
    es_sano: true,
    tipo: "base",
    sabor: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("ingredientes").insert([form]);
    onSaved();
    setForm({
      nombre: "",
      precio: "",
      calorias: "",
      inventario: "",
      es_vegetariano: false,
      es_sano: true,
      tipo: "base",
      sabor: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mt-3">
      <h5>Nuevo Ingrediente</h5>
      <div className="row">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-2">
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            className="form-control"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-2">
          <input
            type="number"
            name="calorias"
            placeholder="Calorías"
            className="form-control"
            value={form.calorias}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-2">
          <input
            type="number"
            name="inventario"
            placeholder="Inventario"
            className="form-control"
            value={form.inventario}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-2 form-check">
          <input
            type="checkbox"
            name="es_vegetariano"
            checked={form.es_vegetariano}
            onChange={handleChange}
            className="form-check-input"
          />
          <label className="form-check-label">Vegetariano</label>
        </div>
        <div className="col-md-6 mb-2 form-check">
          <input
            type="checkbox"
            name="es_sano"
            checked={form.es_sano}
            onChange={handleChange}
            className="form-check-input"
          />
          <label className="form-check-label">Sano</label>
        </div>
        <div className="col-md-6 mb-2">
          <select
            name="tipo"
            className="form-select"
            value={form.tipo}
            onChange={handleChange}
          >
            <option value="base">Base</option>
            <option value="complemento">Complemento</option>
          </select>
        </div>
        <div className="col-md-6 mb-2">
          <input
            type="text"
            name="sabor"
            placeholder="Sabor (solo para bases)"
            className="form-control"
            value={form.sabor}
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success mt-2">
        Guardar
      </button>
    </form>
  );
}
