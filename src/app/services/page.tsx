import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export const metadata = {
  title: "Our Services | All Purpose Contractors LLC",
  description: "Explore our cargo van transport and moving services including residential moving, freight transport, junk removal, and more.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="bg-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-accent">Services</span></h1>
          <p className="text-xl text-gray-300">
            Professional cargo van transport and moving services for all your needs
          </p>
        </div>
      </div>
      <Services />
      
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Service Details</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Learn more about what each of our specialized services includes
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-[#d4b14b]">Residential Moving Services</h3>
              <p className="text-gray-700 mb-6">
                Our residential moving services are perfect for apartments, small homes, and studio moves
                within Rhode Island. We provide:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Professional loading and unloading</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Careful handling of furniture and boxes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Efficient same-day moves</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Flexible scheduling options</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Specialized handling for fragile items</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Student and senior discounts available</span>
                </li>
              </ul>
              <Link href="/quote" className="inline-flex items-center text-[#c62a2a] font-semibold hover:underline">
                Get a quote for your move <FiArrowRight className="ml-2" />
              </Link>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-[#d4b14b]">Cargo Van Freight Transport</h3>
              <p className="text-gray-700 mb-6">
                Our cargo van transport services are ideal for businesses and individuals needing reliable 
                delivery of goods and items without palletized freight requirements:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Business-to-business deliveries</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Furniture and appliance transport</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Urgent/same-day delivery options</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Scheduled recurring deliveries</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Inventory and stock transfers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">E-commerce returns and exchanges</span>
                </li>
              </ul>
              <Link href="/quote" className="inline-flex items-center text-[#c62a2a] font-semibold hover:underline">
                Request freight transport <FiArrowRight className="ml-2" />
              </Link>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-[#d4b14b]">Junk Removal & Hauling</h3>
              <p className="text-gray-700 mb-6">
                Clear out unwanted items with our efficient junk removal and hauling services:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Household junk and clutter removal</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Furniture and appliance disposal</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Yard waste and debris hauling</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Post-renovation cleanup</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Responsible disposal practices</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">✓</span>
                  <span className="text-gray-700">Donation drop-offs for usable items</span>
                </li>
              </ul>
              <Link href="/quote" className="inline-flex items-center text-[#c62a2a] font-semibold hover:underline">
                Book junk removal <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </main>
  );
} 