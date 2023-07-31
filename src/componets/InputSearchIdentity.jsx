import { useState } from "react";
import {
    IconDNI
  } from "../componets/Icons.jsx";
// eslint-disable-next-line react/prop-types
export const InputSearchIdentity = ({ users }) => {
    const [searchIdentity, setSearchIdentity] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
  
    const handleInputChange = (e) => {
      const identity = e.target.value;
      setSearchIdentity(identity);
      // eslint-disable-next-line react/prop-types
      const filteredResults = users.filter((user) =>
        user.identity.includes(identity)
      );
      setFilteredUsers(filteredResults);
    };
  
    const handleClick = (e) => {
      e.preventDefault();
      const identity = e.target.dataset.identity
      const fullName = e.target.dataset.name
      document.getElementById("identity").value = identity;
      document.getElementById("fullName").value = fullName;
      setSearchIdentity(false)
    };
  
    return (
      <div className="relative w-full flex gap-2 border-2 border-yellow-400 text-slate-900 rounded-full px-3 py-1 focus-within:border-yellow-900">
        <IconDNI/>
        <input
        id="identity"
          className="w-full bg-transparent border-none focus:border-none focus-visible:outline-none"
          type="text"
          placeholder="Ingresar Cedula"
          onChange={handleInputChange}
        />
        <ul className="absolute top-full w-full bg-slate-100 text-900 mt-2">
          {searchIdentity &&
            filteredUsers.map((user) => (
              <li
                onClick={(e) => handleClick(e)}
                data-identity={user.identity}
                data-name={user.fullName}
                key={user.id}
                className="hover:bg-slate-200 cursor-pointer"
              >
                {user.identity}
              </li>
            ))}
        </ul>
      </div>
    );
  };