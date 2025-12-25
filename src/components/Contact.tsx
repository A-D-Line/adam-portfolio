import React from 'react';

const Contact: React.FC = () => {
    return (
        <section className="py-24 px-8 bg-white w-full text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-sm font-bold tracking-[0.2em] mb-6 text-black uppercase">
                    Status
                </h2>
                <p className="text-3xl md:text-4xl font-light text-dark-grey">
                    Not currently taking on new projects.
                </p>

                <div className="mt-20 text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Adam Line. All rights reserved.
                </div>
            </div>
        </section>
    );
};

export default Contact;
