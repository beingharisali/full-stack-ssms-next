function Hero() {
  return (
    <div>
      <section className="text-gray-700 bg-gray-100 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-semibold text-gray-800">
              Before they sold out
              <br className="hidden lg:inline-block" />
              readymade gluten
            </h1>
            <p className="mb-8 leading-relaxed text-gray-600">
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra
              air plant cold-pressed tacos poke beard tote bag. Heirloom echo
              park mlkshk tote bag selvage hot chicken authentic tumeric
              truffaut hexagon try-hard chambray.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-gray-900 rounded-lg text-lg transition duration-200">
                Get Started
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-white border border-gray-300 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-lg text-lg transition duration-200">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded-2xl shadow-md"
              alt="hero"
              src="https://dummyimage.com/720x600"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
export default Hero;
