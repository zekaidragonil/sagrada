'use client'
import Banner from "@/components/sections/Banner";
import About from "@/components/sections/About";
import Recomendacion from "@/components/sections/Recomendacion";
import Normativas from "@/components/sections/Normativa";
import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
import withLazyLoad from "./withLazyLoad";

const Horarios = dynamic(() => import('@/components/sections/Horarios'));
const Map = dynamic(() => import('@/components/sections/Mapa'));

const LazyMap = withLazyLoad(Map);
const LazyHorarios = withLazyLoad(Horarios);
export default function Home() {

  return (
    <Layout>
      <Banner />
      <About />
      <LazyHorarios />
      <Recomendacion />
      <LazyMap />
      <Normativas />
    </ Layout>
  );
}
