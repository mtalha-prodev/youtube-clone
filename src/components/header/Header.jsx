import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";

import "./_header.scss";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

const Header = ({ sidebarToggle }) => {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => sidebarToggle()}
      />

      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt=""
        className="header__logo"
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={user?.picture} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
