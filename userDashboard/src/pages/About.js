import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            About EVER HIGH
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Shaping the future of Indian streetwear with a unique blend of comfort and trendsetting designs.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Streetwear is now widely accepted as a popular style that comes from the underground culture, and India is no exception. The once-popular apparel of loose-fitting jeans, graphic t-shirts, and high-top sneakers has evolved into a statement of freedom, luxury, and creativity.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Embodying the essence of premium street fashion, EVER HIGH is a rising luxury streetwear clothing brand in India. With the rise of streetwear culture in India, the sense of comfort and fashion comes hand in hand. Heavily influenced by pop culture, streetwear focuses on unisex clothing with high-quality premium fabric, cozy fittings, and comfy styles.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Since 2020, EVER HIGH has carved a niche in India's competitive market with luxury streetwear. Our focus on quality, inclusive design, and innovation is redefining streetwear in India.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To provide premium streetwear that empowers individuals to express their unique style while maintaining the highest standards of quality and comfort. We believe fashion should be accessible to everyone, regardless of gender or background.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To become the leading streetwear brand in India, known for innovative designs, sustainable practices, and a commitment to fostering a vibrant streetwear community that celebrates individuality and creativity.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Passion</h3>
              <p className="text-gray-600">
                We're passionate about streetwear culture and creating designs that inspire
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Quality</h3>
              <p className="text-gray-600">
                Every piece is crafted with premium materials and attention to detail
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Inclusivity</h3>
              <p className="text-gray-600">
                Our unisex designs celebrate diversity and individual expression
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly push boundaries to create unique and trendsetting designs
              </p>
            </div>
          </div>
        </div>

        {/* What Makes Us Unique */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">What Makes EVER HIGH Unique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Unique Designs</h3>
              <p className="text-gray-700 leading-relaxed">
                Our in-house design team creates unique pieces that are not found in other stores or shops. Each design is carefully crafted to reflect the latest trends while maintaining our signature style.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Premium Quality</h3>
              <p className="text-gray-700 leading-relaxed">
                Our products are made from the best quality fabrics to provide maximum comfort and product life. We never compromise on quality, ensuring every piece meets our high standards.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Unisex Styles</h3>
              <p className="text-gray-700 leading-relaxed">
                Our collection caters to all genders, offering versatile pieces that can be styled in various ways. We believe fashion should be fluid and accessible to everyone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Trendsetting Designs</h3>
              <p className="text-gray-700 leading-relaxed">
                Stay fashionable and up-to-date with our modern and stylish products. We're always ahead of the curve, bringing you the latest streetwear trends.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Our Team</h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
            Behind EVER HIGH is a passionate team of designers, creatives, and fashion enthusiasts who are dedicated to bringing you the best streetwear experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-black mb-2">Design Team</h3>
              <p className="text-gray-600">Creative minds behind our unique designs</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-black mb-2">Production Team</h3>
              <p className="text-gray-600">Ensuring quality in every stitch</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-black mb-2">Customer Service</h3>
              <p className="text-gray-600">Dedicated to your satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 