import React, { useEffect, useState } from 'react'
import Cabecalho from '../../components/Cabecalho'
import { Button, Container, Table } from 'react-bootstrap'
import Link from 'next/link'
import axios from 'axios'
import { IoAddOutline, IoPencilOutline, IoTrashBinSharp  } from "react-icons/io5";
import Swal from 'sweetalert2'


const index = () => {

  const [registro, setBack] = useState([])

  useEffect(() => {
    getALL()
  }, [])

  function getALL() {
    axios.get('/api/backs/').then(resultado => {
      setBack(resultado.data);
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
        axios.delete(`/api/backs/${id}`).then(() => {

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
        <Link href='/back/form' className="btn btn-primary mb-2 mt-5" ><IoAddOutline />Novo</Link>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Editar</th>
              <th>Excluir</th>
              <th>Opnião</th>
            </tr>
          </thead>
          <tbody>
            {registro ? (registro.map((item, i) => (
              <tr key={item.id}>
                <td>
                  <Link href={'/back/' + item.id} className='btn btn-warning'>
                    <IoPencilOutline className='text-danger' />
                  </Link>
                </td>
                <td>
                  <Button className='btn-warning' onClick={() => excluir(item.id)}>
                    <IoTrashBinSharp className='text-danger' />
                  </Button>
                </td>
                <td>{item.opniao}</td>
              </tr>
            ))) : ''}

          </tbody>
        </Table>
      </Container>
    </>
  )

}
export default index