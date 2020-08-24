import React from "react";
import styles from "./Navbar.module.scss";

const Navbar = (props) => {
  console.log("rendering the navbar");
  return ( 
    <header>
      <nav>
        <ul className={styles.list}>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Pricing</li>
        </ul>
      </nav>
    </header>
  );
}


 
export default Navbar;