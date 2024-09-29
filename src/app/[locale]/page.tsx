
import Banner from "@/components/sections/Banner";
import About from "@/components/sections/About";
import Horarios from "@/components/sections/Horarios";
import Recomendacion from "@/components/sections/Recomendacion";
import Normativas from "@/components/sections/Normativa";
import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";

const  Map = dynamic(() => import('@/components/sections/Mapa'));

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
