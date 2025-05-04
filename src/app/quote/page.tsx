import Navbar from "@/components/Navbar";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export const metadata = {
  title: "Get a Quote | All Purpose Contractors LLC",
  description: "Request a free quote for cargo van transport, moving services, or junk removal from All Purpose Contractors LLC.",
};

export default function QuotePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="bg-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get a <span className="text-accent">Free Quote</span></h1>
          <p className="text-xl text-gray-300">
            Request pricing for our cargo van transport and moving services
          </p>
        </div>
      </div>
      
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Request Your Quote</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below with details about your service needs, and we'll provide 
                you with a customized quote. For immediate assistance, please
                <Link href="tel:+1234567890" className="text-[#c62a2a] font-medium"> call us directly</Link>.
              </p>
              <QuoteForm />
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FiCheckCircle className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                    <p className="text-gray-700">Competitive and transparent pricing with no hidden fees</p>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                    <p className="text-gray-700">Fast response times and same-day service availability</p>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                    <p className="text-gray-700">Professional, experienced, and insured team members</p>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                    <p className="text-gray-700">High-quality equipment and properly maintained vehicles</p>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                    <p className="text-gray-700">Customized solutions for your specific needs and timeline</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-lg shadow-md border border-blue-100">
                <h3 className="text-xl font-bold mb-4">Pricing Information</h3>
                <p className="text-gray-700 mb-4">
                  Our pricing is based on several factors including:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-gray-700">Distance between pickup and delivery locations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-gray-700">Size, weight, and quantity of items</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-gray-700">Labor requirements and time needed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-gray-700">Special handling or equipment needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-gray-700">Urgency and scheduling requirements</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  We offer competitive rates and are committed to providing fair, transparent pricing.
                  Special discounts available for seniors, students, and recurring clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 