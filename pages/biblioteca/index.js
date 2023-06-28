import React, { useEffect, useState } from 'react'
import Cabecalho from '../../components/Cabecalho'
import { Button, Container, Table } from 'react-bootstrap'
import Link from 'next/link'
import { RxArrowBottomLeft } from "react-icons/Rx";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/Bs";
import axios from 'axios'
import Swal from 'sweetalert2';

const index = () => {

  const [registro, setBiblioteca] = useState([])

  useEffect(() => {
    getALL()
  }, [])

  function getALL() {
    axios.get('/api/bibliotecas/').then(resultado => {
      setBiblioteca(resultado.data);
    })
    console.log(registro)
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
        axios.delete(`/api/bibliotecas/${id}`).then(() => {

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
  console.log(registro)

  return (
    <>
      <Cabecalho />
      <Container>
        <Link href='/biblioteca/form' className="btn btn-primary mb-2 mt-5" ><RxArrowBottomLeft />Novo</Link>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Editar</th>
              <th>Excluir</th>
              <th>Estudio</th>
              <th>Produção</th>
              <th>Lançamento</th>
            </tr>
          </thead>
          <tbody>
            {registro ? (registro.map((item, i) => (
              <tr key={item.id}>
                <td>
                  <Link href={'/biblioteca/' + item.id} className='btn btn-warning'>
                    <BsFillPencilFill className='text-danger' />
                  </Link>
                </td>
                <td>
                  <Button className='btn-warning' onClick={() => excluir(item.id)}>
                    <BsFillTrash3Fill className='text-danger' />
                  </Button>
                </td>
                <td>{item.estudio}</td>
                <td>{item.producao}</td>
                <td>{item.lancamento}</td>
              </tr>
            ))) : ''}

          </tbody>
        </Table>
      </Container>
    </>
  )

}
export default index