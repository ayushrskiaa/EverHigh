import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const latestDrop = products.filter(product => product.newArrival);
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-[calc(100vh-80px)] relative">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-white overflow-hidden">
        {/* Layered, animated background text effects */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute top-1/4 left-0 w-full flex justify-center opacity-10 animate-marquee-slow text-3d-effect">
            <span className="text-[7vw] md:text-[5vw] font-black uppercase tracking-widest whitespace-nowrap">
              Ever High T-Shirts • Streetwear • Limited Drop •
            </span>
          </div>
          <div className="absolute bottom-1/4 left-0 w-full flex justify-center opacity-10 animate-marquee-reverse text-3d-effect">
            <span className="text-[6vw] md:text-[4vw] font-black uppercase tracking-widest whitespace-nowrap">
              Premium Quality • Unisex Fit • Bold Graphics •
            </span>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-yellow-300 mr-2" size={24} />
            <span className="text-lg font-semibold text-yellow-300">TRENDING NOW</span>
            <Sparkles className="text-yellow-300 ml-2" size={24} />
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-white drop-shadow-lg text-3d-effect neon-text">
            UNLEASH THE HYPE
          </h1>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white drop-shadow-2xl text-3d-effect neon-text">
            THE FUTURE OF STREETWEAR
          </h2>
          <p className="text-xl md:text-2xl mb-8 font-bold text-yellow-300">
            🚀 NEW DROP - NOW LIVE 🚀
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center bg-white text-red-600 px-8 py-4 text-lg font-black hover:bg-yellow-300 hover:text-red-700 transition-all duration-300 transform hover:scale-110 pulse-glow rounded-lg shadow-xl hover:shadow-2xl hover:-rotate-x-6 hover:rotate-y-6 hover:skew-y-1 cta-3d"
            style={{ perspective: '600px' }}
          >
            SHOP NOW
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Latest Drop Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Zap className="text-red-500 mr-2" size={24} />
              <h2 className="text-4xl font-black text-gradient-primary">LATEST DROP</h2>
              <Zap className="text-red-500 ml-2" size={24} />
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center text-red-600 hover:text-red-700 font-bold hover:underline"
            >
              DISCOVER MORE
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-visible">
            {latestDrop.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* More from EVER HIGH Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Star className="text-blue-500 mr-2" size={24} />
              <h2 className="text-4xl font-black text-gradient-secondary">MORE FROM EVER HIGH</h2>
              <Star className="text-blue-500 ml-2" size={24} />
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold hover:underline"
            >
              DISCOVER MORE
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-visible">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-gradient-accent mb-8">
            Feel the Luxury of Premium Streetwear with EVER HIGH - Best Unisex Clothing Brand in India
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Streetwear is now widely accepted as a popular style that comes from the underground culture, and India is no exception. The once-popular apparel of loose-fitting jeans, graphic t-shirts, and high-top sneakers has evolved into a statement of freedom, luxury, and creativity.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Embodying the essence of premium street fashion, EVER HIGH is a rising luxury streetwear clothing brand in India. With the rise of streetwear culture in India, the sense of comfort and fashion comes hand in hand. Heavily influenced by pop culture, streetwear focuses on unisex clothing with high-quality premium fabric, cozy fittings, and comfy styles. Shaping the future of Indian streetwear with a unique blend of comfort and trendsetting designs.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center btn-primary"
          >
            LEARN MORE
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">WHY CHOOSE EVER HIGH?</h2>
            <p className="text-xl opacity-90">Premium quality meets street style</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} className="text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
              <p className="opacity-90">Crafted with the finest materials for ultimate comfort and durability</p>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} className="text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-4">Trendsetting Designs</h3>
              <p className="opacity-90">Stay ahead of the curve with our innovative and unique designs</p>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-4">Unisex Collection</h3>
              <p className="opacity-90">Inclusive fashion for everyone, regardless of gender or style preference</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 