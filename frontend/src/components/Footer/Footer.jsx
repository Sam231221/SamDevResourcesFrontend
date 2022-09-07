import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

export default function Footer() {
  return (
    <footer>
        <Container>
            <Row>

            <div className="container ">
              <footer className="d-flex flex-wrap flex-row-reverse align-items-center py-3 my-4 border-top">
                  <div className="row align-items-end">
                        <div className="col d-flex ">
                            <a href="/" className="mb-3 me-2 mb-md-0  text-decoration-none lh-1">
                              <svg className="bi" width="30" height="24"><use xlinkHref="/bootstrap"></use></svg>
                            </a>
                            <span className="mb-3 mb-md-0 flex-end">Copyright &copy; SamDevResources</span>
                      </div>

                  </div>
              </footer>
            </div>

                <Col className='text-center py-3'>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}
