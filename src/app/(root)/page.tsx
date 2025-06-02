import React from "react";
import { Hero } from "../component/layout/Hero";
import { Footer } from "../component/layout/Footer";
import { About } from "../component/layout/About";

const page = () => {
  return (
    <div>
      <Hero />
      <About/>
      <Footer />
    </div>
  );
};

export default page;
