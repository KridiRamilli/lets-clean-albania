import "./Tools.css";
import image from "../../assets/bgImg.jpg";

function Tool({ handleClick }) {
  return (
    <div onClick={handleClick}>
      <img className='tool__icon' src={image} alt='img' />
    </div>
  );
}

export default Tool;
