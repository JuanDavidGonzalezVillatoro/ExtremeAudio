import Link from "next/link";
import { Container, Image, Button } from "semantic-ui-react";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.columns}>
          <div>
            <Link href="/">
            <Image src="/images/Logo-Extreme-Audio-para-fondo-oscuro.svg" alt="ExtremeAudio" />
            </Link>
          </div>

          <div>
            <ul>
              {/* <Link href="#">Términos y condiciones</Link>
              <Link href="#">Política de privacidad</Link>
              <Link href="#">Contacto</Link>
              <Link href="#">FAQs</Link> */}
              
              <Link target="_blank" href="https://maps.app.goo.gl/f3guimkjsfAzDoZM9"><i class="map marker alternate icon"></i>10. av. 33-21 Zona 11 Centro Empresarial Las Charcas</Link>
              <Link target="_blank" href="mailto:x-audio@hotmail.com"><i class="envelope icon"></i>x-audio@hotmail.com</Link>
              <Link target="_blank" href="tel:+50241542472"><i class="phone volume icon"></i>(502) 4154 2472</Link>
            </ul>
          </div>

          <div className={styles.social}>
            <Button as="a" target="_blank" href="https://www.facebook.com/extremeaudiooficial" circular color="facebook" icon="facebook f" />
            <Button as="a" target="_blank" href="https://api.whatsapp.com/send?phone=50241542472" circular color="green" icon="whatsapp" />
            {/* <Button as="a" href="#" circular color="linkedin" icon="linkedin" />
            <Button as="a" href="#" circular color="youtube" icon="youtube" /> */}
          </div>
        </div>

        <div className={styles.copyright}>
          <span>Copyright © 2023 Extreme Audio - Todos los derechos reservados</span>
        </div>
      </Container>
    </div>
  );
}