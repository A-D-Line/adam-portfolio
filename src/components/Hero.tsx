import React from 'react';
import headshot from '../assets/adam-headshot.jpg';

const Hero: React.FC = () => {
    return (
        <section className="py-12 md:py-16 px-8 bg-soft-pink w-full border-b border-gray-100">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Text Content - Left */}
                <div className="flex-1 text-left order-2 md:order-1">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter text-black">Adam Line</h1>
                    <div className="w-24 h-1 bg-black mb-6"></div>
                    <p className="text-lg md:text-xl text-dark-grey leading-relaxed font-medium max-w-xl">
                        I'm a London-based theatre producer. I have experience in producing and general management
                        within the UK subsidised & commercial theatre sectors. I currently work as participation
                        manager for an arts charity.
                    </p>
                </div>

                {/* Image - Right */}
                <div className="flex-1 flex justify-center md:justify-end order-1 md:order-2">
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        <img
                            src={headshot}
                            alt="Adam Line"
                            className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
