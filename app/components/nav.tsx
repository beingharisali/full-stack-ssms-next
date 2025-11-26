export default function Nav() {
  return (
    <div>
      <header className="text-gray-900 bg-gray-200 shadow-lg body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-semibold items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-gray-800 rounded-full"
              viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl tracking-wide">SSMS-NEXT</span>
          </a>

          <nav className="md:mr-auto md:ml-6 md:py-1 md:pl-6 md:border-l md:border-gray-300 flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 text-gray-700 hover:text-black transition duration-200 cursor-pointer">
              Home
            </a>
            <a className="mr-5 text-gray-700 hover:text-black transition duration-200 cursor-pointer">
              Services
            </a>
            <a className="mr-5 text-gray-700 hover:text-black transition duration-200 cursor-pointer">
              About
            </a>
            <a className="mr-5 text-gray-700 hover:text-black transition duration-200 cursor-pointer">
              Contact
            </a>
          </nav>

          <button className="inline-flex items-center bg-gray-700 border-0 py-2 px-5 focus:outline-none hover:bg-gray-900 rounded-lg text-white text-base mt-4 md:mt-0 transition duration-200">
            <a href="/login">Login</a>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}