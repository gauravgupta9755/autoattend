import React from "react";

export const Nav = (props) => {
  
  
  return (
    <>
      <nav class="navbar navbar-expand-lg p-0">
        <div
          class="container-fluid shadow"
          style={{ backgroundColor: "#57B894" }}
        >
          <a class="navbar-brand text-light" >
            AutoAttend
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a text-right>
            <img src="./images/profile.png" alt="profile" height={30} />
          </a>
          {/* <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        <a class="nav-link" href="#">Features</a>
        <a class="nav-link" href="#">Pricing</a>
        <a class="nav-link disabled">Disabled</a>
      </div>
    </div>  */}
        </div>
      </nav>
    </>
  );
};

export default Nav;
