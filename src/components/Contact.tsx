import React from 'react';

const Contact: React.FC = () => {
    return (
        <section className="py-24 px-8 bg-soft-pink w-full">
            <div className="max-w-xl mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-black text-center">Contact</h2>

                <p className="text-xl text-dark-grey text-center mb-12">
                    I am not currently taking on any new projects.
                </p>

                <form
                    action="mailto:adam@adamline.co.uk"
                    method="post"
                    encType="text/plain"
                    className="space-y-6 bg-white p-8 rounded-lg shadow-sm"
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-black focus:ring-0 outline-none transition-colors"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-black focus:ring-0 outline-none transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-black focus:ring-0 outline-none transition-colors resize-none"
                            placeholder="How can I help you?"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                    >
                        Send Message
                    </button>
                </form>

                <div className="mt-16 text-sm text-dark-grey text-center opacity-60">
                    &copy; {new Date().getFullYear()} Adam Line. All rights reserved.
                </div>
            </div>
        </section>
    );
};

export default Contact;
