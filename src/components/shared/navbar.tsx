import { FeedIcon, HomeIcon, SearchIcon, UserIcon } from "../icons";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-white h-16 px-8 text-gray-400">
      <HomeIcon active className=" text-gray-400" />
      <FeedIcon className="  text-gray-400" />
      <SearchIcon className="  text-gray-400" />
      <UserIcon className="  text-gray-400" />
    </nav>
  );
}
