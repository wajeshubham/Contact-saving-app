import React, { useContext } from "react";

import { Container, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import Contact from "../components/Contact";
import { MdAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";
import ContactContext from "../context/Context";
import { CONTACT_TO_UPDATE } from "../context/action.types";

const Contacts = () => {
  const { state, dispatch } = useContext(ContactContext);

  // destructuring contacts and isLoading from state
  const { contacts, isLoading } = state;

  // history hooks from react router dom to get history
  const history = useHistory();

  // handle fab icon button click
  const AddContact = () => {
    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: null,
      key: null,
    });
    history.push("/contact/add");
  };

  // return loading spinner
  if (isLoading) {
    return (
      <div className="Center">
        <Spinner color="primary" />
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      {contacts.length === 0 && !isLoading ? (
        <div className="Center text-large text-primary">No contacts found</div>
      ) : (
        <ListGroup className="list">
          {Object.entries(contacts).map(([key, value]) => (
            <ListGroupItem key={key} style={{ border: "none" }}>
              <Contact contact={value} contactKey={key} />
              <hr className="mb-3"></hr>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
      <MdAdd className="fab icon bg-dark" onClick={AddContact} />
    </Container>
  );
};

export default Contacts;
