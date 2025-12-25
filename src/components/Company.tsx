import React from 'react';
import companyLogo from '../assets/company-logo.png';

const Company: React.FC = () => {
    return (
        <section className="py-24 px-8 bg-soft-pink w-full">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

                {/* Text Content - Left */}
                <div className="flex-1 order-2 md:order-1">
                    <h2 className="text-4xl md:text-5xl font-black mb-8 text-black tracking-tight leading-tight">
                        Adam Line Creative Ltd
                    </h2>
                    <div className="w-24 h-1 bg-black mb-8"></div>

                    <div className="space-y-6 text-lg md:text-xl text-dark-grey leading-relaxed font-medium">
                        <p>
                            I set up a creative production company in 2022 after receiving a New Producers bursary from Stage One.
                            With the mission of “uplifting stories and uplifting people”, I have a number of independent projects in development.
                        </p>
                        <p>
                            Please get in touch if you would like to find out more about the future life of these projects.
                        </p>
                    </div>
                </div>

                {/* Image - Right */}
                <div className="flex-1 flex justify-center md:justify-end order-1 md:order-2">
                    <img
                        src={companyLogo}
                        alt="Adam Line Creative Logo - Just Bubble"
                        className="w-full max-w-md object-contain drop-shadow-md"
                    />
                </div>

            </div>
        </section>
    );
};

export default Company;
