import Head from "next/head";

export function Seo(props) {
  const {
    title = "Extreme Audio - El mejor audio para tu vehículo",
    description = "El mejor audiocar en Guatemala, encuentra speakers, pantallas, radios, subwoofers, equalizadores, amplificadores y más para tu vehículo.",
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}