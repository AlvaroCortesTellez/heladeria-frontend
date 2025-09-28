import React, { useState, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { supabase } from "../../lib/supabaseClient";
import { AuthContext } from "../auth/AuthProvider";

const SellProductModal = ({ show, onHide, producto, onSold }) => {
  const { user, userRole } = useContext(AuthContext);
  const [cantidad, setCantidad] = useState(1);
  const [ingredientes, setIngredientes] = useState([]);
  const [error, setError] = useState("");

  const isAdmin = userRole === "admin";
  const isEmpleado = userRole === "empleado";
  const isCliente = userRole === "cliente";
  const isPublic = !user;

  useEffect(() => {
    if (producto) {
      fetchIngredientes();
    }
  }, [producto]);

  const fetchIngredientes = async () => {
    const { data, error } = await supabase
      .from("producto_ingrediente")
      .select("ingrediente_id, ingredientes(nombre, inventario, tipo)")
      .eq("producto_id", producto.id);

    if (error) {
      console.error(error);
    } else {
      setIngredientes(data.map((pi) => pi.ingredientes));
    }
  };

  const handleSell = async () => {
    setError("");

    // Verificar inventario
    const outOfStock = ingredientes.some((ing) => ing.inventario < cantidad);
    if (outOfStock) {
      setError("No hay suficiente inventario para realizar la venta.");
      return;
    }

    // Calcular total
    const total = producto.precio_publico * cantidad;

    // Insertar venta
    const { error: ventaError } = await supabase.from("ventas").insert([
      {
        producto_id: producto.id,
        user_id: user ? user.id : null,
        cantidad,
        total,
      },
    ]);

    if (ventaError) {
      setError("Error al registrar la venta.");
      console.error(ventaError);
      return;
    }

    // Actualizar inventario de ingredientes
    for (let ing of ingredientes) {
      let nuevoInventario = ing.inventario - cantidad;
      if (ing.tipo === "complemento" && nuevoInventario < 0) nuevoInventario = 0;

      const { error: updateError } = await supabase
        .from("ingredientes")
        .update({ inventario: nuevoInventario })
        .eq("id", ing.id);

      if (updateError) {
        console.error(updateError);
      }
    }

    // Notificar venta exitosa
    onSold();
    onHide();
  };

  if (!producto) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Vender Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Producto:</strong> {producto.nombre}
        </p>
        <p>
          <strong>Precio público:</strong> ${producto.precio_publico}
        </p>
        {(isCliente || isEmpleado || isAdmin) && producto.total_calorias && (
          <p>
            <strong>Calorías:</strong> {producto.total_calorias}
          </p>
        )}
        {(isEmpleado || isAdmin) && producto.costo && (
          <p>
            <strong>Costo:</strong> ${producto.costo}
          </p>
        )}
        {isAdmin && producto.rentabilidad && (
          <p>
            <strong>Rentabilidad:</strong> ${producto.rentabilidad}
          </p>
        )}

        <div className="mb-3">
          <label className="form-label">Cantidad:</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSell} disabled={isPublic}>
          Vender
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SellProductModal;
