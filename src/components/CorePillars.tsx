import React from 'react';

const CorePillars: React.FC = () => {
    const pillars = [
        {
            title: "Numbers & Documents",
            description: "Budget management, contracting, and administration."
        },
        {
            title: "Artists & Collaborators",
            description: "Fostering collaborative environments and respecting artistic vision."
        },
        {
            title: "Management & Guidance",
            description: "Facilitating workshops and creative processes."
        }
    ];

    return (
        <section className="py-24 px-8 bg-soft-pink w-full">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-black tracking-tight">What I Do</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            <div className="w-12 h-1 bg-black mb-6 transition-all duration-300 group-hover:w-24"></div>
                            <h3 className="text-2xl font-bold mb-4 text-black">{pillar.title}</h3>
                            <p className="text-lg text-dark-grey leading-relaxed">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CorePillars;
