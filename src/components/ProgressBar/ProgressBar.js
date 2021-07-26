import { progressPercentage } from "../../utils";
import "./ProgressBar.css";

function ProgressBar({ progress }) {
  return (
    <div
      className='progress'
      style={{ width: `${progressPercentage(progress)}%` }}
    >
      <span className='progress__percentage'>
        {progressPercentage(progress)}%
      </span>
    </div>
  );
}

export default ProgressBar;
