import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full bg-black flex flex-col items-center px-5 sm:px-10 lg:px-[140px] pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">
      {/* Main Heading */}
      <h1 className="max-w-[1007px] text-center text-2xl sm:text-3xl lg:text-[38px] font-medium leading-tight lg:leading-[46px] mb-4 sm:mb-6">
        <span className="text-[#F0F0F0]">International </span>
        <span className="text-[#95DE64]">IT & AI Expert Hub</span>
        <span className="text-[#F0F0F0]"> For Your </span>
        <span className="text-[#95DE64]">Universal Success</span>
      </h1>

      {/* Description */}
      <p className="max-w-[850px] text-center text-[#BFBFBF] text-sm font-normal leading-[22px] mb-8 sm:mb-10 lg:mb-12 px-4">
        At Globonexo, we empower European IT and software companies with world-class outstaffing solutions that transform challenges into opportunities. With our headquarters in Germany and a network of development centers across India, Poland, Czech Republic, Ukraine, and Moldova, we provide seamless access to a global talent pool that drives innovation and delivers results.
      </p>

      {/* Video Placeholder */}
      <div className="w-full max-w-[1062px] aspect-video sm:h-auto lg:h-[512px] relative mb-8 sm:mb-10 lg:mb-12 rounded-lg overflow-hidden">
        <Image
          src="/video_placeholder.png"
          alt="Video placeholder"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Join Now CTA Button */}
      <button className="bg-[#95DE64] text-black text-sm font-medium leading-[22px] px-6 py-2 rounded-lg hover:bg-[#7bc653] transition-colors min-w-[180px] h-[38px]">
        Join now
      </button>
    </section>
  );
};

export default HeroSection;
