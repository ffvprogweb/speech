import React, { useState } from "react";
import axios from "axios";

const QueryComponent = () => {
  const [queryText, setQueryText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Monta o objeto JSON com base no texto de consulta
    const jsonData = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: queryText,
        },
      ],
    };

    try {
      // Envia a solicitação para o endpoint localhost:8080/sendJson
      const response = await axios.post(
        "http://localhost:8080/sendJson",
        jsonData
      );
      // Atualiza o estado com o conteúdo retornado pela API
      setResult(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Erro ao enviar consulta:", error);
      setResult("Ocorreu um erro ao enviar a consulta.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Consulta:
          <input
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <div>
        <h2>Resultado:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default QueryComponent;
