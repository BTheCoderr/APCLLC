import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  notFound();
}
