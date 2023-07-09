import React from "react";
import { useNavigate } from "react-router-dom";

import AuthStore from "../../Stores/Auth";

export default function UserTag({ userData }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    AuthStore.update((s) => {
      s.token = null;
    });
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center font-bold cursor-pointer" onClick={logout}>
      <img src={userData.images[1].url} className="w-8 h-auto mr-2 rounded-full" alt="user profile" />
      <p>{userData.display_name}</p>
    </div>
  );
}
