import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FiPaperclip } from "react-icons/fi";
import { showModalAction } from "../../redux/actions/toolsActions";
import { uniqueId } from "../../utils";
import { firestore, generateMarker, storage } from "../../firebase";
import ImagePreview from "./ImagePreview";
import ProgressBar from "./../ProgressBar/ProgressBar";
import "./Modal.css";

function Modal({
  showModal,
  isModalVisible,
  markerLocation,
  currentUser,
  activeMarker,
}) {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [imagesSize, setImagesSize] = useState(0);
  const [bytesTransferred, setBytesTransferred] = useState([0, 0, 0]);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let size = images.reduce((acc, el) => {
      return acc + el.imageUrl.size;
    }, 0);
    setImagesSize(size);
  }, [images]);

  useEffect(() => {
    let bytes = bytesTransferred.reduce((acc, el) => {
      return acc + el;
    }, 0);
    let progressPercentage = bytes !== 0 ? (bytes / imagesSize) * 100 : 0;
    setProgress(progressPercentage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bytesTransferred]);

  const closeModal = (ev) => {
    if (ev.target === ev.currentTarget) {
      showModal(false);
    }
  };

  const handleImageUpload = (image, id) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(`images/${Date.now()}`);
      const uploadImage = storageRef.put(image);
      uploadImage.on(
        "state_change",
        (snapshot) => {
          setBytesTransferred((prevState) => {
            let newState = prevState.map((el, idx) => {
              if (idx === id) {
                return snapshot.bytesTransferred;
              }
              return el;
            });
            return newState;
          });
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error(error);
        },
        () => {
          // Handle successful uploads on complete
          uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageSelect = (e) => {
    const images = Array.from(e.target.files, (el) => {
      return {
        id: uniqueId("url_"),
        previewUrl: URL.createObjectURL(el),
        imageUrl: el,
      };
    });
    const selectedImages = images.slice(0, 3);
    setImages((prevImages) => {
      //prettier-ignore
      return prevImages ? [...prevImages, ...selectedImages].slice(0, 3) : selectedImages;
    });
  };

  const handleImageDelete = (id) => {
    const filteredImages = images.filter((el) => {
      if (el.id !== id) {
        return true;
      } else {
        URL.revokeObjectURL(el.url);
        return false;
      }
    });
    setImages(filteredImages);
  };

  const handleMarkerUpload = () => {
    const { location = { lat: 1, lng: 1 } } = markerLocation;
    console.log(location);

    const promiseArr = images.map((el, idx) => {
      return handleImageUpload(el.imageUrl, idx);
    });
    Promise.all(promiseArr).then((res) => {
      generateMarker(currentUser, location, res, description);
    });
  };

  const handleMarkerUpdate = () => {
    const promiseArr = images.map((el, idx) => {
      return handleImageUpload(el.imageUrl, idx);
    });
    Promise.all(promiseArr).then((res) => {
      firestore
        .collection("markers")
        .doc(`${activeMarker}`)
        .update({
          cleaned: true,
          "images.data.after": res,
        })
        .then(() => {
          console.log("successfully updated");
        });
    });
  };

  return !isModalVisible ? null : (
    <div className='modal__bg' onClick={closeModal}>
      <div className='modal'>
        <ProgressBar progress={progress} />
        <h1 className='modal__header'>Make our city cleaner!</h1>
        <span className='modal__close' onClick={closeModal}>
          &#10006;
        </span>

        <div className='modal__input'>
          <label htmlFor='test' className='modal__input__label'>
            <span className='modal__input__label-left'>
              <FiPaperclip />
            </span>
            <input
              id='test'
              className='modal__input__file'
              type='file'
              accept='image/*'
              multiple
              onChange={handleImageSelect}
            />
            <h6 className='modal__input__label-right'>
              Please upload up to 3 clear images of the place...
            </h6>
          </label>
        </div>
        <textarea
          className='modal__textarea'
          name=''
          id=''
          placeholder='Please insert a 140 letter info about this place...'
          cols='20'
          rows='5'
          maxLength='140'
          onChange={(ev) => {
            setDescription(ev.target.value);
          }}
        ></textarea>
        <div className='modal__imagePreview'>
          {images.length > 0 ? (
            images.map((image) => {
              const { previewUrl, id } = image;
              return (
                <ImagePreview
                  src={previewUrl}
                  key={id}
                  handleImageDelete={() => {
                    handleImageDelete(id);
                  }}
                />
              );
            })
          ) : (
            <p className='modal__noImage'>
              Take some pictures and share with us...{" "}
            </p>
          )}
        </div>
        <div className='modal__actions'>
          <input
            className='modal__button modal__button-submit'
            type='submit'
            value='Report'
            onClick={handleMarkerUpdate}
          />
          <input
            className='modal__button modal__button-cancel'
            type='button'
            value='Cancel'
            onClick={closeModal}
          />
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  showModal: (status) => dispatch(showModalAction(status)),
});

const mapStateToProps = (state) => ({
  isModalVisible: state.tools.isModalVisible,
  currentUser: state.user.currentUser,
  activeMarker: state.marker.activeMarker,
});
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
