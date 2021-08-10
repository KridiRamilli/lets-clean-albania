import React from "react";
import { Fade } from "react-slideshow-image";
import { connect } from "react-redux";
import { showModalAction } from "../../redux/actions/toolsActions";
import { displayUserName, isSameUser } from "./../../utils/index";

import "./Slideshow.css";

const Slideshow = ({
  cleaned,
  order,
  showModal,
  reportedBy,
  images: { data },
  currentUser,
}) => {
  function handleButtonClick() {
    showModal(true);
  }
  const imageData = order === "first" ? data["before"] : data["after"];
  // console.log(imageData);
  return (
    <div className={cleaned ? "slide-container-two" : "slide-container-one"}>
      <Fade
        duration={1000}
        canSwipe={true}
        arrows={false}
        pauseOnHover={true}
        className={order === "first" && cleaned ? "grayscale-cleaned" : null}
      >
        {imageData.map((el, idx) => {
          return (
            <React.Fragment key={idx}>
              <div className='each-fade'>
                <div className='description'>
                  <small className='description__text'>
                    This is a test of a description made possibly by using a
                    tool like vs studio but we need more charachters so i am
                    writing something stupid!!
                  </small>
                </div>
                <div className='image-container'>
                  <img src={el} alt='img' />
                </div>
              </div>
              <div className='image-info'>
                {order === "second" ||
                (isSameUser(currentUser, reportedBy) && !cleaned) ? null : (
                  <p className='image-author'>
                    Reported by {reportedBy && displayUserName(reportedBy)}{" "}
                  </p>
                )}
                {!cleaned ? (
                  <button className='image-edit' onClick={handleButtonClick}>
                    Cleaned?
                  </button>
                ) : order === "first" ? null : (
                  <p className='image-author__cleaned'>
                    Cleaned by #kridiramilli
                  </p>
                )}
                {isSameUser(currentUser, reportedBy) && !cleaned && (
                  <button className='image-edit' onClick={handleButtonClick}>
                    Edit
                  </button>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </Fade>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (status) => dispatch(showModalAction(status)),
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

//TODO

// FadeExample.propTypes = {
//   cleaned: PropTypes.string,
// };

export default connect(mapStateToProps, mapDispatchToProps)(Slideshow);
