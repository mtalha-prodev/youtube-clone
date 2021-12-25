import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";

import "./_header.scss";

const Header = ({ sidebarToggle }) => {
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

      <form>
        <input type="text" placeholder="Search" />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src="http://user.dobe3.com/2be3/assets/global/images/avatars/avatar1.png"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Header;
