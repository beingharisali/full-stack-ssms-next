import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import Link from "next/link";

function Page() {
  return (
    <div className="min-h-screen bg-[#060C19] text-white">
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">Client Dashboard</h1>
        <p className="text-xl mb-8">Welcome to the Client Support Portal</p>
        <Link 
          href="/client/tickets"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold"
        >
          Go to Tickets
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Page;