import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function AddEditAgendamento() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Para editar, usamos o id

  useEffect(() => {
    if (id) {
      // Se o id existir, significa que estamos editando um agendamento
      const fetchAgendamento = async () => {
        try {
          const response = await api.get(`/agendamentos/${id}`);
          const agendamento = response.data;
          setNome(agendamento.nome);
          setData(agendamento.data);
          setHora(agendamento.hora);
          setDescricao(agendamento.descricao);
        } catch (error) {
          console.error("Erro ao buscar agendamento", error);
        }
      };

      fetchAgendamento();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const agendamentoData = { nome, data, hora, descricao };

    try {
      if (id) {
        await api.put(`/agendamentos/${id}`, agendamentoData); // Se houver id, atualiza o agendamento
      } else {
        await api.post("/agendamentos", agendamentoData); // Se não houver id, cria um novo agendamento
      }
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h3>{id ? "Editar Agendamento" : "Adicionar Novo Agendamento"}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="data" className="mt-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="hora" className="mt-3">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="descricao" className="mt-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              disabled={loading}
            >
              {loading
                ? "Salvando..."
                : id
                ? "Salvar Alterações"
                : "Adicionar Agendamento"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddEditAgendamento;
