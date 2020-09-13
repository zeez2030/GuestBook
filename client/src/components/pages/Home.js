import React, { useContext, useEffect } from "react";
import Messages from "../messages/Messages";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Messages />
    </div>
  );
};

export default Home;
