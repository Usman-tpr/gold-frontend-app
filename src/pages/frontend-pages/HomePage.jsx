import React, { useEffect, useState } from "react";
import MainHeroSection from "../../components/home-page-components/MainHeroSection";
import CategoriesSection from "../../components/home-page-components/CategoriesSection";
import TopProductsSection from "../../components/home-page-components/TopProductsSection";
import { getRequest } from "../../Requests/Request";
import FullSet from "../../components/home-page-components/FullSet";
import Footer from "../../components/Footer";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getRequest("/category/getAll");
        setCategories(response.body);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchHomeProducts = async () => {
      try {
        const response = await getRequest("/product/get-homepage-products");
        setHomeProducts(response.body);
      } catch (error) {
        console.error("Error fetching home products:", error);
      }
    };

    fetchCategories();
    fetchHomeProducts();
  }, []);

  return (
    <>
      <MainHeroSection />
      <FullSet />
      <CategoriesSection data={categories} />
      <TopProductsSection homeData={homeProducts} />
      <Footer />

    </>
  );
}
