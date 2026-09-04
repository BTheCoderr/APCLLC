import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileContactBar from '@/components/MobileContactBar';

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
