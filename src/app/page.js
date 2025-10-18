import Image from "next/image";
import styles from "./page.module.css";
import Banner from "./Components/Banner/Banner";
import Premium from "./Components/Premium/Premium";
import Testimonial from "./Components/Testimonial/Testimonial";
import Features from "./Components/Features/Features";
import ReelSection from "./Components/ReelSection/reelSection";
import VideoSection from "./Components/VideoSection/VideoSection";
import VideoSection2 from "./Components/VideoSection2/VideoSection2";
import View from "./Components/View";

export default function Home() {
  return (
   <>
    <Banner/>
    <ReelSection/>
    <VideoSection/>
    <Premium/>
    <VideoSection2/>
   <Testimonial/>
   <Features/>
   <View />
   </>
  );
}
