import React from "react";
import { Popup, Marker } from "react-leaflet";
import { connect } from "react-redux";
import Slideshow from "../Slideshow/Slideshow";
import { redIcon, greenIcon } from "./Icons";
import { setActiveMarkerAction } from "./../../redux/actions/markerActions";
function CustomMarker({
  center,
  reportedBy,
  cleaned,
  images,
  id,
  setActiveMarker,
}) {
  return (
    <Marker
      position={center}
      eventHandlers={{
        click: (ev) => {
          setActiveMarker(id);
        },
      }}
      icon={cleaned ? greenIcon : redIcon}
    >
      <Popup className={cleaned ? "image__popup-two" : "image__popup-one"}>
        <Slideshow
          images={images}
          reportedBy={reportedBy}
          cleaned={cleaned}
          order={"first"}
        />
        {cleaned ? (
          <Slideshow
            images={images}
            reportedBy={reportedBy}
            cleaned={cleaned}
            order={"second"}
          />
        ) : null}
      </Popup>
    </Marker>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setActiveMarker: (marker) => dispatch(setActiveMarkerAction(marker)),
});

export default connect(null, mapDispatchToProps)(CustomMarker);
