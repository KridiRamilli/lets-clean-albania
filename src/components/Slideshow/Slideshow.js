import React from "react";
import { Fade } from "react-slideshow-image";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/toolsAction";
import { displayUserName, isSameUser } from "./../../utils/index";

import "./Slideshow.css";

const Slideshow = ({
  cleaned,
  order,
  showModal,
  author,
  images,
  currentUser,
}) => {
  function handleButtonClick() {
    showModal(true);
  }
  return (
    <div className={cleaned ? "slide-container-two" : "slide-container-one"}>
      <Fade
        duration={1000}
        className={order === "first" && cleaned ? "grayscale-cleaned" : null}
      >
        <div className='image-info'>
          {!cleaned ? (
            <button className='image-edit' onClick={handleButtonClick}>
              Clean
            </button>
          ) : order === "first" ? null : (
            <p>Cleaned by #kridiramilli</p>
          )}
          {isSameUser(currentUser, author) && (
            <button className='image-edit' onClick={handleButtonClick}>
              Edit
            </button>
          )}
        </div>
        {images.map((el) => {
          return (
            <>
              <div className='each-fade'>
                {order === "second" ? null : (
                  <p className='image-author'>
                    Reported by {author && displayUserName(author)}{" "}
                  </p>
                )}
                <div className='image-container'>
                  <img src={el} alt='img' />
                </div>
              </div>
            </>
          );
        })}
      </Fade>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (status) => dispatch(showModal(status)),
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
