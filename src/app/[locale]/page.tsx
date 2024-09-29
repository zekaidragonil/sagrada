
import Banner from "@/components/sections/Banner";
import About from "@/components/sections/About";
import Horarios from "@/components/sections/Horarios";
import Map from "@/components/sections/Mapa";
import Recomendacion from "@/components/sections/Recomendacion";
import Normativas from "@/components/sections/Normativa";
import Layout from "@/components/layout/Layout";

export default function Home() {

  return (
    <Layout>
      <Banner />
      <About />
      <Horarios />
      <Map />
      <Recomendacion />
      <Normativas />
    </ Layout>
  );
}
