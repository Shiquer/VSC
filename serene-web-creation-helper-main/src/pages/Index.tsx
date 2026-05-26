import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import usePageTitle from "@/hooks/usePageTitle";

const Index = () => {
    usePageTitle("Natalia Kourycheva - Psychanalyste & Hypnothérapeute à Paris");

    return (
          <div className="min-h-screen">
                <Header />
                <main id="main-content" aria-label="Contenu principal">
                        <Hero />
                        <Services />
                        <About />
                        <Contact />
                </main>main>
                <Footer />
          </div>
        );
};

export default Index;
