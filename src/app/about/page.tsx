import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata = {
  title: "About Us | All Purpose Contractors LLC",
  description: "Learn about All Purpose Contractors LLC, a professional cargo van transport and moving services company based in Rhode Island.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="bg-[#000000] text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-[#d4b14b]">Us</span></h1>
          <p className="text-xl text-gray-300">
            Learn more about All Purpose Contractors LLC and our mission
          </p>
        </div>
      </div>

      {/* AboutSection Content */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-[#000000] p-6 rounded-lg shadow-md flex justify-center">
              <div className="relative w-full aspect-square max-w-md">
                <Image 
                  src="/APCLLC.jpeg"
                  alt="APC LLC Logo"
                  fill
                  className="object-contain"
                  style={{ backgroundColor: "#000000" }}
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">At <span className="text-[#c62a2a]">ALL PURPOSE CONTRACTORS LLC</span></h2>
              <p className="text-gray-700 mb-4 text-lg">
                We provide professional cargo van transport and moving services across Rhode Island and will soon serve clients nationwide.
              </p>
              <p className="text-gray-700 mb-6 text-lg">
                Founded by a team of driven entrepreneurs with backgrounds in logistics and operations, we're committed to dependable, affordable, and legal transport solutions — whether you're a business shipping goods or a family relocating locally.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#ffebee] p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c62a2a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#d4b14b]">Fully Insured</h3>
                    <p className="text-gray-600">Our service is fully insured and operating in compliance with Rhode Island state regulations.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#ffebee] p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c62a2a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#d4b14b]">Nationwide Service Coming Soon</h3>
                    <p className="text-gray-600">Our federal operating authority is pending final FMCSA activation, and we'll soon be able to haul freight across all 48 continental U.S. states.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Our mission is to provide reliable, efficient, and affordable cargo van transport
              and moving services to businesses and individuals throughout Rhode Island and soon nationwide.
              We are committed to exceptional customer service, timeliness, and ensuring your items arrive safely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-[#d4b14b]">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">•</span>
                  <span className="text-gray-700"><strong>Reliability:</strong> We show up on time, every time.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">•</span>
                  <span className="text-gray-700"><strong>Integrity:</strong> Honest pricing and transparent service.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">•</span>
                  <span className="text-gray-700"><strong>Care:</strong> Your items are handled with attention and respect.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#c62a2a] font-bold">•</span>
                  <span className="text-gray-700"><strong>Adaptability:</strong> Customized solutions for your specific needs.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-[#d4b14b]">Service Areas</h3>
              <p className="text-gray-700 mb-6">
                We currently serve all cities and towns across Rhode Island, including:
              </p>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                <div>
                  <p>• Providence</p>
                  <p>• Warwick</p>
                  <p>• Cranston</p>
                  <p>• Pawtucket</p>
                  <p>• East Providence</p>
                </div>
                <div>
                  <p>• Woonsocket</p>
                  <p>• Newport</p>
                  <p>• West Warwick</p>
                  <p>• Coventry</p>
                  <p>• All other RI locations</p>
                </div>
              </div>
              <p className="mt-6 text-gray-700 font-medium">
                Interstate service coming soon to all 48 continental states!
              </p>
            </div>
          </div>
        </div>
      </div>
      <CTASection />
      <Footer />
    </main>
  );
} 