"use client";

import Hero from "@/Components/Hero/Hero";
import Features from "@/Components/Features/Features";
import Categories from "@/Components/Categories/Categories";
import Products from "@/Components/Products/Products";
import Testimonials from "@/Components/Testimonials/Testimonials";
import Newsletter from "@/Components/Newsletter/Newsletter";
import Footer from "@/Components/Footer/Footer";

const Home = () => {
 
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <Products />
      <Newsletter />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
