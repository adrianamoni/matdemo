import React, { useState, useEffect } from "react";
import { Header, Form } from "semantic-ui-react";

const EditOrderForm = ({ order, setModifiedOrder }) => {
  const [localDuration, setLocalDuration] = useState(order.Duracion);
  const [localQty, setLocalQty] = useState(order.QtyReqd);
  const [localOperators, setLocalOperators] = useState(order.Personas);
  const [operatorSpeed, setOperatorSpeed] = useState(undefined);

  useEffect(() => {
    if (order) {
      setLocalQty(order.QtyReqd);
      setLocalOperators(order.Personas);
      setLocalDuration(order.Duracion);
    }
  }, [order]);
  //calcular duracion con cambio de qty o cambio de operadores asignados
  useEffect(() => {
    if (operatorSpeed && localQty && localOperators) {
      let totalOperatorSpeed = operatorSpeed * localOperators;
      setLocalDuration(localQty / totalOperatorSpeed);
    }
    //eslint-disable-next-line
  }, [localQty, localOperators]);

  useEffect(() => {
    if (localDuration) {
      // find WoId
      setModifiedOrder({
        id: order.WoId,
        newDuration: localDuration,
        newQty: localQty,
        newOperators: localOperators,
      });
    }
    //eslint-disable-next-line
  }, [localDuration]);

  const handleChange = ({ value }, root) => {
    switch (root) {
      case "qty":
        setLocalQty(value);
        break;
      case "operators":
        setLocalOperators(value);
        break;
      default:
        break;
    }
  };

  /**Metodo para calcular la velocidad por operador en esa orden */
  const operatorSpeedCalc = (operators, duration) => {
    let speed = localQty / (operators * duration);
    setOperatorSpeed(speed);
    return speed;
  };

  useEffect(() => {
    if (order) {
      operatorSpeedCalc(order.Personas, order.Duracion, 1);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Form style={{ padding: "20px 0" }}>
      <Header>Detalle de la orden {order.WoId}</Header>
      <Form.Group>
        <Form.Input
          label="Cantidad"
          value={localQty}
          width={6}
          type={"number"}
          onChange={(e, d) => handleChange(d, "qty")}
        />
        <Form.Input
          label="Número de personas asignadas"
          value={localOperators}
          width={6}
          type={"number"}
          onChange={(e, d) => handleChange(d, "operators")}
        />
        <Form.Input
          label="Duración"
          readOnly
          value={`${localDuration} minutos`}
          width={6}
        />
        {/* LIBERAR CHECKBOX ? */}
        {/*                 <Form.Input
          label="Duración"
          readOnly
          value={`${localDuration} minutos`}
          width={6}
        /> */}
      </Form.Group>
    </Form>
  );
};

export default EditOrderForm;
