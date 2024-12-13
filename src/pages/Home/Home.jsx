import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // Importa a API para fazer requisições

function Home() {
  const [agendamentos, setAgendamentos] = useState([]);
  const navigate = useNavigate();

  // Buscar agendamentos da API quando o componente for montado
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await api.get("/agendamentos");
        setAgendamentos(response.data); // Armazenar os agendamentos
      } catch (error) {
        console.error("Erro ao buscar agendamentos", error);
      }
    };

    fetchAgendamentos();
  }, []); // [] garante que a busca seja feita apenas uma vez após o primeiro render

  // Função para navegar para a página de adição de agendamento
  const navigateToAddAgendamento = () => {
    navigate("/add-agendamento");
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <Button variant="primary" onClick={navigateToAddAgendamento}>
            Adicionar Novo Agendamento
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Agendamentos</h3>
          <ListGroup>
            {agendamentos.map((agendamento) => (
              <ListGroup.Item key={agendamento.id}>
                {agendamento.nome} - {agendamento.data} - {agendamento.hora}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
