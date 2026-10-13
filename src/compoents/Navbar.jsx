
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faUtensils,
  faHeart,
  faCircleInfo,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="border-b bg-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <FontAwesomeIcon icon={faUtensils} />
          RecipeBook
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faHouse} />
            Home
          </Link>

          <Link
            to="/recipes"
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faUtensils} />
            Recipes
          </Link>

          <Link
            to="/favorites"
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faHeart} />
            Favorites
          </Link>

          <Link
            to="/about"
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            About
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            Contact
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;

