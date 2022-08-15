import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack, Row } from "react-bootstrap";
import { truncateAddress } from "../../../utils";
import Identicon from "../../ui/Identicon";


const NftCard = ({ nft, isOwner, removeNFT}) => {
  const { description, owner, name, index } = nft;

  return (
    <Col key={index}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <Identicon address={owner} size={28} />
            <span className="font-monospace text-secondary">
              {truncateAddress(owner)}
            </span>
            <Badge bg="secondary" className="ms-auto">
              {index} ID
            </Badge>

            
          </Stack>
        </Card.Header>

        <div className=" ratio ratio-4x3">
          <img src="https://soboconcepts.com/wp-content/uploads/2020/01/go-green-cover.jpg" alt={description} style={{ objectFit: "cover" }} />
        </div>

        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1">{description}</Card.Text>
          {isOwner === true && (
            <div className="d-flex m-2 justify-content-center">
              <button onClick={removeNFT} className= "btn btn-primary"
            >
              Remove this Nft
              </button>
              
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

NftCard.propTypes = {
  // props passed into this component
  nft: PropTypes.instanceOf(Object).isRequired,
};

export default NftCard;
