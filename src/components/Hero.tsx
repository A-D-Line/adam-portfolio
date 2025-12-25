import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="py-24 px-8 bg-white min-h-[60vh] flex items-center justify-center">
            <div className="max-w-4xl w-full text-center">
                <h1 className="text-6xl md:text-7xl font-bold mb-8 tracking-tighter text-black">Adam Line</h1>
                <div className="w-24 h-1 bg-soft-pink mx-auto mb-8"></div>
                <p className="text-xl md:text-2xl text-dark-grey leading-relaxed max-w-2xl mx-auto font-medium">
                    London-based theatre producer with experience in UK subsidised and commercial sectors.
                    Currently Participation Manager for an arts charity.
                </p>
            </div>
        </section>
    );
};

export default Hero;
