import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import Map from "../../components/Map/Map";
import User from "../../components/User/User";
import Tools from "../../components/Tools/Tools";
import Modal from "../../components/Modal/Modal";
import { showModalAction } from "../../redux/actions/toolsAction";
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
    setMarkers(MarkersData);

    firestore
      .collection("markers")
      .get()
      .then((querySnapshot) => {
        const markerData = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        console.log(markerData);
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
      // this.setState((prevState) => ({
      //   markers: prevState.markers.concat({
      //     id: uniqueId("id_"),
      //     author: {
      //       id: "ewbqJmJvrOO52zcOYySjuvyTFSa2",
      //       displayName: "Kridi Ramilli",
      //     },
      //     images: [
      //       "https://api.time.com/wp-content/uploads/2021/03/trash-pandemic-covid-19-01.jpg",
      //       "https://image.shutterstock.com/image-photo/closeup-portrait-yong-woman-casual-260nw-1554086789.jpg",
      //       "https://api.time.com/wp-content/uploads/2021/03/trash-pandemic-covid-19-01.jpg",
      //     ],
      //     location: {
      //       lat,
      //       lng,
      //     },
      //     cleaned: false,
      //   }),
      // }));
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
