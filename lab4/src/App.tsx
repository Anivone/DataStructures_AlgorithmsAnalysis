import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { grahamScan, parseInput } from "./utils/grahamScan";

import "antd/dist/antd.css";
import "./App.css";

// (3; 6), (5; 4), (0; 3), (7; 3), (1.5; 2.5), (5.5; 2), (5; 1), (2; 0)

function App() {
  const [expression, setExpression] = useState<string>("");
  const [calculator, setCalculator] = useState<Desmos.Calculator>();

  useEffect(() => {
    const calculatorContainer = document.getElementById("desmos-calculator");
    const calculatorWrappers = document.getElementsByClassName("dcg-wrapper");

    if (calculatorContainer && !calculatorWrappers.length) {
      setCalculator(Desmos.GraphingCalculator(calculatorContainer));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(event.target.value);
  };

  const handleSubmit = () => {
    if (expression && calculator) {
      const points = parseInput(expression);

      calculator.setExpression({
        id: "input",
        latex: expression.replaceAll(";", ","),
        showLabel: true,
        pointSize: 15,
        pointStyle: 'CROSS',
        color: "#000000"
      });

      const grahamPoints = grahamScan(points) || [];
      grahamPoints.push(grahamPoints[0]);

      calculator.setExpression({
        id: "output",
        type: "table",
        columns: [
          { latex: "x", values: grahamPoints.map(({ x }) => String(x)) },
          {
            latex: "y",
            values: grahamPoints.map(({ y }) => String(y)),
            color: "red",
            lines: true,
          },
        ],
      });
    }
  };

  return (
    <div className="container">
      <Form
        layout={"inline"}
        style={{ width: "50%", margin: "0 auto 25px auto" }}
      >
        <Form.Item required label={"Введіть точки"} style={{ width: "70%" }}>
          <Input
            value={expression}
            placeholder={"Введіть точки у форматі: (Х; Х), (...)"}
            onPressEnter={handleSubmit}
            onChange={handleChange}
          />
        </Form.Item>
        <Button
          onClick={handleSubmit}
          type={"primary"}
          style={{ width: 150 }}
          htmlType={"submit"}
        >
          Задати
        </Button>
      </Form>
      <div className="calculator-container">
        <div id="desmos-calculator" />
      </div>
    </div>
  );
}

export default App;
