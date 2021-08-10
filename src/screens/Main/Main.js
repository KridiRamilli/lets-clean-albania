import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import Map from "../../components/Map/Map";
import User from "../../components/User/User";
import Tools from "../../components/Tools/Tools";
import Modal from "../../components/Modal/Modal";
import { showModalAction } from "../../redux/actions/toolsActions";
import { firestore } from "../../firebase";
import MarkersData from "../../data";

import "./Main.css";

function Main({ user, history, showModal, addGarbage }) {
  const [markers, setMarkers] = useState([]);
  const [markerLocation, setMarkerLocation] = useState({
    location: {
      lat: 0,
      lng: 0,
    },
  });
  useEffect(() => {
    firestore
      .collection("markers")
      .get()
      .then((querySnapshot) => {
        const markerData = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setMarkers(markerData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    // console.log(locationClicked);
  }, []);

  const handleMapClick = (e) => {
    console.log("From main", markerLocation);
    if (addGarbage) {
      const {
        latlng: { lat, lng },
      } = e;
      setMarkerLocation({ location: { lat, lng } });
      showModal(true);
    } else {
      return null;
    }
  };

  return (
    <div className='main'>
      <User user={user} />
      <Tools />
      <Map handleMapClick={handleMapClick} markers={markers} />
      <Modal markerLocation={markerLocation} />
    </div>
  );
}

//TODO remove unnecessary
const mapStateToProps = (state) => ({
  isModalVisible: state.tools.isModalVisible,
  addGarbage: state.tools.addGarbage,
});
const mapDispatchToProps = (dispatch) => ({
  showModal: (status) => dispatch(showModalAction(status)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Main);
