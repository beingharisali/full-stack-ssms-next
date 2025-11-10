import Footer from "@/app/components/footer";
import Hero from "@/app/components/hero";
import Nav from "@/app/components/nav";

function Page() {
  return (
    <div>
      <Nav />
      <h1 className="text-center bg-black text-blue-50">
        WELCOME TO ADMIN PAGE
      </h1>
      <Hero />
      <Footer />
    </div>
  );
}
export default Page;
