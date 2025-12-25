import React from 'react';

const Experience: React.FC = () => {
    const experience = [
        "Theatre503",
        "David Adkin Ltd",
        "Spare Tyre Theatre Company",
        "Smart Entertainment",
        "Vicky Graham Productions"
    ];

    const venues = [
        "Park Theatre",
        "Jermyn Street Theatre",
        "Finborough Theatre",
        "Southwark Playhouse",
        "Hampstead Theatre",
        "VAULT Festival",
        "Marylebone Theatre"
    ];

    return (
        <section className="py-24 px-8 bg-white w-full">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Professional Experience */}
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-black border-b-2 border-soft-pink pb-2 inline-block">Professional Experience</h2>
                    <ul className="space-y-4">
                        {experience.map((item, index) => (
                            <li key={index} className="text-xl text-dark-grey hover:text-black transition-colors duration-200">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Notable Venues */}
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-black border-b-2 border-soft-pink pb-2 inline-block">Notable Venues</h2>
                    <div className="flex flex-wrap gap-3">
                        {venues.map((venue, index) => (
                            <span key={index} className="px-4 py-2 bg-gray-50 border border-gray-100 text-dark-grey rounded-sm text-lg">
                                {venue}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Experience;
