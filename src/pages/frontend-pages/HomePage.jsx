import React, { useEffect, useState } from "react";
import MainHeroSection from "../../components/home-page-components/MainHeroSection";
import CategoriesSection from "../../components/home-page-components/CategoriesSection";
import TopProductsSection from "../../components/home-page-components/TopProductsSection";
import { getRequest } from "../../Requests/Request";
import FullSet from "../../components/home-page-components/FullSet";
import Footer from "../../components/Footer";

export default function HomePage() {
  const [homeProducts, setHomeProducts] = useState([]);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const response = await getRequest("/product/get-homepage-products");
        setHomeProducts(response.body);
      } catch (error) {
        console.error("Error fetching home products:", error);
      }
    };

    fetchHomeProducts();
  }, []);
  const categories = [
    { value: 'F', label: 'Full Set', image:"assets/category/body-jwellery.jpg" },
    { value: 'anklets', label: 'Anklets', image:"assets/category/anklets.png" },
    { value: 'bracelets', label: 'Bracelets', image:"assets/category/bracelets.png" },
    { value: 'brooches', label: 'Brooches', image:"assets/category/brooches.jpg" },
    { value: 'chains', label: 'Chains', image:"assets/category/chains.jpg" },
    { value: 'charms', label: 'Charms', image:"assets/category/charms.jpg" },
    { value: 'earrings', label: 'Earrings', image:"assets/category/earrings.jpg" },
    { value: 'necklaces', label: 'Necklaces', image:"assets/category/necklaces.png" },
    { value: 'pendants', label: 'Pendants', image:"assets/category/pendants.jpg" },
    { value: 'rings', label: 'Rings' , image:"assets/category/rings.png"},
  ];

  return (
    <>
      <MainHeroSection />
      <CategoriesSection data={categories} />
      <FullSet />
      <TopProductsSection homeData={homeProducts} />
      <Footer />

    </>
  );
}
