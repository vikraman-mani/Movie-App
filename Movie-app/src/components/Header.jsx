import React from "react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TbPhotoSearch } from "react-icons/tb";
import { useEffect } from "react";
import { IoIosHome } from "react-icons/io";
import { MdLiveTv } from "react-icons/md";
import { SiThemoviedatabase } from "react-icons/si";

export const navigation = [
  {
    label: "TV shows",
    href: "tv",
    icon: <MdLiveTv />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <SiThemoviedatabase />,
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <IoIosHome />,
  },
  ...navigation,
  {
    label: "Search",
    href: "/search",
    icon: <TbPhotoSearch />,
  },
];

const Header = () => {
  const naviagate = useNavigate();
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    if (search) {
      naviagate(`/search?q=${search}`);
    }
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full bg-black/70 h-25 z-40 text-white p-4">
      <div className="container mx-auto px-3 flex items-center h-full ">
        <Link to="/">
          <img src={logo} alt="logo" width={120}></img>
        </Link>

        <nav className=" hidden lg:flex space-x-4 ml-5">
          {navigation.map((item, index) => {
            return (
              <div key={item.label}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-gray-500 ${isActive && "text-gray-500"}`
                  }
                >
                  {item.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-7">
          <form className="flex items-center gap-1" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Item here..."
              className="bg-transparent text-white px-4 py-2 outline-none hidden lg:block"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button className="text-2xl">
              <TbPhotoSearch />
            </button>
          </form>

          <div className="w-14 h-14 rounded-full overflow-hidden cursor-pointer bg-gray-400 transition-all ">
            <img src={user} alt="user" width={50}></img>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
