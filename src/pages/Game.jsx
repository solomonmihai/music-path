import React from "react";
import AuthStore from "../Stores/Auth";

export default function Game() {
  const token = AuthStore.useState((s) => s.token);

  console.log(token);

  return <h1>Game</h1>;
}
