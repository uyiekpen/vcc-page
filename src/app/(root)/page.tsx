import React from "react";
import { Hero } from "../component/layout/Hero";
import { Footer } from "../component/layout/Footer";
import { About } from "../component/layout/About";
import LivePodFeed from "../component/layout/LivePod";
import SuccessMetrics from "../component/layout/SuccessMetrics";
import Testimonials from "../component/layout/Creator";

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <LivePodFeed />
      <SuccessMetrics />
      <Testimonials />
    </div>
  );
};

export default page;
