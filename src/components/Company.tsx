import React from 'react';

const Company: React.FC = () => {
    return (
        <section className="py-32 px-8 bg-soft-pink w-full flex items-center justify-center">
            <div className="max-w-4xl text-center">
                <span className="block text-sm font-bold tracking-[0.2em] mb-4 text-black uppercase opacity-60">
                    Est. 2022
                </span>

                <h2 className="text-5xl md:text-6xl font-black mb-8 text-black tracking-tight leading-tight">
                    Adam Line Creative Ltd
                </h2>

                <div className="w-32 h-1 bg-black mx-auto mb-10"></div>

                <p className="text-2xl md:text-3xl font-medium text-dark-grey italic mb-12">
                    "Uplifting stories and uplifting people."
                </p>

                <div className="inline-block border border-black px-6 py-3">
                    <p className="text-lg font-bold text-black">
                        Recipient of Stage One New Producers Bursary
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Company;
