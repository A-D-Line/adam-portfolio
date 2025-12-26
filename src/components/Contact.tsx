import React from 'react';

const Contact: React.FC = () => {
    return (
        <section className="py-24 px-8 bg-soft-pink w-full">
            <div className="max-w-xl mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-black text-center">Contact</h2>

                <p className="text-xl text-dark-grey text-center mb-12">
                    I work full time and I am not currently taking on any new projects. <br>
                    You can find me on <a href="https://www.linkedin.com/in/adam-line-9688a624a/">LinkedIn</a>.
                </p>

                <div className="mt-16 text-sm text-dark-grey text-center opacity-60">
                    &copy; {new Date().getFullYear()} Adam Line. All rights reserved.
                </div>
            </div>
        </section>
    );
};

export default Contact;
