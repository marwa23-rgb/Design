const Hero = ({ handleGenerateClick }: { handleGenerateClick: any }) => {
  return (
    <div className="relative z-10 flex flex-col items-start justify-center min-h-[80vh] px-12 text-white">
      <div
        className="absolute inset-0 h-[520px] bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1753802025065-e9d71f6c0d95?...')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70" />
      </div>

      <h1 className="text-5xl font-extrabold leading-snug">
        AI-Powered <br />
        <span className="text-blue-400">Architectural</span> Design <br />
        Generator
      </h1>
      <p className="mt-6 text-xl max-w-4xl text-gray-200">
        Transform your ideas into professional architectural
        <br/> plans instantly. Upload sketches, input dimensions, or
        <br/>describe your vision – and let our AI generate detailed
        <br/>2D and 3D designs in seconds.
      </p>
      <div className="mt-8 flex space-x-4">
        <button
          onClick={handleGenerateClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Start Designing Now
        </button>
        <button
          onClick={() => {
            const section = document.getElementById("Features");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="px-6 py-3 border border-gray-300 hover:border-blue-600 text-white rounded-lg font-medium hover:bg-blue-600"
        >
          View Features
        </button>
      </div>
    </div>
  );
};

export default Hero;
