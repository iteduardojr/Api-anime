import React, { useEffect, useState } from 'react';
import Cabecalho from '../../components/Cabecalho';
import { Button, Container, Table } from 'react-bootstrap';
import Link from 'next/link';
import { RxArrowBottomLeft } from 'react-icons/Rx';
import { BsFillTrash3Fill, BsFillPencilFill } from 'react-icons/Bs';
import axios from 'axios';
import Swal from 'sweetalert2';

const Index = () => {
  const [registro, setRegistro] = useState([]);

  useEffect(() => {
    getALL();
  }, []);

  function getALL() {
    axios.get('/api/registros/').then((resultado) => {
      setRegistro(resultado.data);
    });
    console.log(registro);
  }

  function excluir(id) {
    const swalWithBootstrapButtons = Swal.mixin({

      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
      confirmButtonColor: '#228B22',
      cancelButtonColor: '#FF0000',
      padding: '3em',
    });
  
    swalWithBootstrapButtons.fire({
      text: "Essa ação é irreversível",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim eu quero!',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/registros/${id}`).then(() => {

          getALL();
          swalWithBootstrapButtons.fire(
            'Sumiu!',
            'Seu arquivo foi deletado.',
            'success'
          );
        }).catch((error) => {

          console.log(error);
          swalWithBootstrapButtons.fire(
            'Error',
            'An error occurred while deleting the file.',
            'error'
          );
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelou',
          'Ainda bem em!  ',
          'error'
        );
      }
    });
  }
  console.log(registro);

  return (
    <>
      <Cabecalho />
      <Container>
        <Link href="/registro/form" className="btn btn-primary mb-2 mt-5">
          <RxArrowBottomLeft />
          Novo
        </Link>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Editar</th>
              <th>Excluir</th>
              <th>Nome</th>
              <th>Senha</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Cep</th>
              <th>Rua</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Estado</th>

            </tr>
          </thead>
          <tbody>
            {registro ? (
              registro.map((item, i) => (
                <tr key={item.id}>
                  <td>
                    <Link href={'/registro/' + item.id} className="btn btn-warning">
                      <BsFillPencilFill className="text-danger" />
                    </Link>
                  </td>
                  <td>
                    <Button className="btn-warning" onClick={() => excluir(item.id)}>
                      <BsFillTrash3Fill className="text-danger" />
                    </Button>
                  </td>
                  <td>{item.nome}</td>
                  <td>{item.senha}</td>
                  <td>{item.email}</td>
                  <td>{item.cpf}</td>
                  <td>{item.telefone}</td>
                  <td>{item.cep}</td>
                  <td>{item.rua}</td>
                  <td>{item.bairro}</td>
                  <td>{item.cidade}</td>
                  <td>{item.uf}</td>
                </tr>
              ))
            ) : (
              ''
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Index;
