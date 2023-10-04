import { useState } from "react";
import { Image } from "semantic-ui-react";
import Link from "next/link";
import { Account } from "../Account";
import { Menu } from "../Menu";
import styles from "./TopBar.module.scss";

export function TopBar(props) {
  const { isOpenSearch } = props;
  const [isOpen, setIsopen] = useState(true);

  return (

    <div className={styles.topBar}>

      <div className={`${isOpen && "open"} ${styles.nav_toggle}`} onClick={() => setIsopen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.left}>
        <Link href="/">
          <Image src="/images/Logo-Extreme-Audio-para-fondo-oscuro.svg" alt="ExtremeAudio" />
        </Link>
      </div>

      <div className={`${isOpen && styles.open} ${styles.center}`}>
        <Menu isOpenSearch= { isOpenSearch } />
      </div>

      <div className={styles.right}>
        <Account />
      </div>

    </div>
  );
}