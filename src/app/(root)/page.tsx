import React from "react";
import { Hero } from "../component/layout/Hero";
import { Footer } from "../component/layout/Footer";
import { EventStats } from "../component/layout/Event";
import { About } from "../component/layout/About";

const page = () => {
  return (
    <div>
      <Hero />
      <About/>
    </div>
  );
};

export default page;
