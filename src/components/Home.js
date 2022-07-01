//Home page implementation

import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
       <h1>Online Banking</h1>
        <p>
          Let Connect help your life to be easier with a smart platform
                  <p>to save ,borrow & manage your money</p>
         </p>
       </header>
    </div>
  );
};

export default Home;
