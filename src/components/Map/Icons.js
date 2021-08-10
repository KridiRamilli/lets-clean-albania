import L from "leaflet";
import RedIcon from "../../assets/garbbage.png";
import GreenIcon from "../../assets/cleaned.png";

const redIcon = L.icon({
  iconUrl: RedIcon,
  iconSize: [45, 49],
  iconAnchor: [22.5, 49],
  popupAnchor: [0, -75],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});
const greenIcon = L.icon({
  iconUrl: GreenIcon,
  iconSize: [60, 56],
  iconAnchor: [30, 56],
  popupAnchor: [20, -110],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

export { redIcon, greenIcon };
