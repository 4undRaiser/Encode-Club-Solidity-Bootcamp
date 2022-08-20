/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";




const AddNfts = ({ save }) => {
  const [metaData, setMetaData] = useState("");

  
  const [show, setShow] = useState(false);


  // check if all form data has been filled
  const isFormFilled = () =>
      metaData;

  // close the popup modal
  const handleClose = () => {
    setShow(false);
 
  };

  // display the popup modal
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-3 py-3"
      >
         <h1 className="fs-4 fw-bold mb-0 text-white">{"Mint"}</h1> 
        
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mint</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="inputUri"
              label="url"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter token URI"
                onChange={(e) => {
                  setMetaData(e.target.value);
                }}
              />
            </FloatingLabel>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save(
                metaData,
              );
              handleClose();
            }}
          >
            Create NFT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddNfts.propTypes = {

  // props passed into this component
  save: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};

export default AddNfts;
