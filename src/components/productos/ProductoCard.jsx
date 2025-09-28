import React, { useState, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import SellProductModal from "./SellProductModal";
import { AuthContext } from "../auth/AuthProvider";

const ProductoCard = ({ producto }) => {
  const { userRole } = useContext(AuthContext);
  const [showSell, setShowSell] = useState(false);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>Precio: ${producto.precio_publico}</Card.Text>
          {["cliente", "empleado", "admin"].includes(userRole) && producto.total_calorias && (
            <Card.Text>Calorías: {producto.total_calorias}</Card.Text>
          )}
          {["empleado", "admin"].includes(userRole) && producto.costo && (
            <Card.Text>Costo: ${producto.costo}</Card.Text>
          )}
          {userRole === "admin" && producto.rentabilidad && (
            <Card.Text>Rentabilidad: ${producto.rentabilidad}</Card.Text>
          )}
          <Button variant="success" onClick={() => setShowSell(true)} disabled={userRole === "public"}>
            Vender
          </Button>
        </Card.Body>
      </Card>

      <SellProductModal
        show={showSell}
        onHide={() => setShowSell(false)}
        producto={producto}
        onSold={() => {}}
      />
    </>
  );
};

export default ProductoCard;
