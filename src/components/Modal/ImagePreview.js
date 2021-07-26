import "./ImagePreview.css";
import { FiTrash2 } from "react-icons/fi";

function ImagePreview({ src, handleImageDelete }) {
  return (
    <div className='preview'>
      <img className='preview__image' src={src} alt='' />
      <span className='preview__close' onClick={handleImageDelete}>
        <FiTrash2 />
      </span>
    </div>
  );
}

export default ImagePreview;
