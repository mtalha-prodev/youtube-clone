import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPopularVideo,
  getVideosByCategories,
} from "../../redux/actions/video.action";

import "./_categories.scss";

const keyElement = [
  "All",
  "Reactjs",
  "Angular",
  "MongoDB",
  "NodeJS",
  "ExpressJS",
  "CSS",
  "Sass",
  "Deploy",
  "Firebase",
  "Heruko",
];

const Categories = () => {
  const [activeElement, setActiveElement] = useState("All");

  const dispatch = useDispatch();

  const handleClick = (val) => {
    setActiveElement(val);
    if (val === "All") {
      dispatch(getPopularVideo());
    } else {
      dispatch(getVideosByCategories(val));
    }
  };

  return (
    <div className="categories">
      {keyElement.map((item, index) => (
        <span
          className={activeElement === item ? "active" : ""}
          key={index}
          onClick={() => handleClick(item)}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default Categories;
