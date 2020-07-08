import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import {
  FaRegStar,
  FaStar,
  FaCheck,
  FaRegCheckSquare,
  FaCheckSquare,
} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

import firebase from "firebase/app";

import ContactContext from "../context/Context";
import { CONTACT_TO_UPDATE, SET_SINGLE_CONTACT } from "../context/action.types";

import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

const Contact = ({ contact, contactKey }) => {
  const { dispatch } = useContext(ContactContext);

  // history hooks to get history
  const history = useHistory();

  // to delete the contact when delete contact is clicked
  const deleteContact = () => {
    firebase
      .database()
      .ref(`/contacts/${contactKey}`)
      .remove()
      .then(toast("Deleted successfully", { type: "warning" }))
      .catch((err) => console.log(err));
  };

  // update the star/important contact ,ie, star it or unstar the single contact
  const updateImpContact = () => {
    firebase
      .database()
      .ref(`/contacts/${contactKey}`)
      .update({
        star: !contact.star,
      })
      .then(
        !contact.star
          ? toast("Stared", { type: "success" })
          : toast("Unstared", { type: "info" })
      )
      .catch((err) => console.log(err));
  };

  // add as a friend
  const updateisFriend = () => {
    firebase
      .database()
      .ref(`/contacts/${contactKey}`)
      .update({
        isFriend: !contact.isFriend,
      })
      .then(
        !contact.isFriend
          ? toast("Marked as a friend", { type: "success" })
          : toast("Removed successfully", { type: "info" })
      )
      .catch((err) => console.log(err));
  };

  // when the update icon/ pen ion is clicked
  const updateContact = () => {
    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: contact,
      key: contactKey,
    });

    // and pushing to the add contact screen
    history.push("/contact/add");
  };

  // to view a single contact in the contact/view screen
  const viewSingleContact = (contact) => {
    dispatch({
      type: SET_SINGLE_CONTACT,
      payload: contact,
    });
    // sending...
    history.push("/contact/view");
  };

  return (
    <>
      <Row>
        <Col
          md="1"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="icon" onClick={() => updateImpContact()}>
            {contact.star ? (
              <FaStar className=" text-primary" />
            ) : (
              <FaRegStar className=" text-info" />
            )}
          </div>
          <div className="icon ml-2" onClick={() => updateisFriend()}>
            {contact.isFriend ? (
              <FaCheckSquare className=" text-success" />
            ) : (
              <FaRegCheckSquare className=" text-info" />
            )}
          </div>
        </Col>
        <Col
          md="2"
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={contact.picture}
            alt=""
            className="img-circle profile mb-3"
          />
        </Col>
        <Col
          md="8 text-center"
          onClick={() => viewSingleContact(contact)}
          style={{ cursor: "pointer" }}
        >
          <div className="text-primary">
            <h3>{contact.name}</h3>
          </div>

          <div className="text-secondary">
            <h5>{contact.phoneNumber}</h5>
          </div>
          <div className="text-dark">
            <h5>{contact.email}</h5>
          </div>

          <div className="text-secondary">
            <h6>{contact.address}</h6>
          </div>
          <div className="text-secondary" style={{ fontWeight: "bolder" }}>
            <h6>Created on: {contact.createdOn}</h6>
          </div>
        </Col>
        <Col
          md="1"
          className="d-flex justify-content-center align-items-center"
        >
          <MdDelete
            onClick={() => deleteContact()}
            color="danger"
            className="text-danger icon"
          />
          <MdEdit
            className="icon text-info ml-2"
            onClick={() => updateContact()}
          />
        </Col>
      </Row>
    </>
  );
};

export default Contact;
