import React from 'react';
import experienceCollage from '../assets/experience-collage.png';

const Experience: React.FC = () => {
    return (
        <section className="py-24 px-8 bg-soft-pink w-full">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">

                {/* Image - Left */}
                <div className="flex-1 w-full relative">
                    <div className="relative z-10">
                        <img
                            src={experienceCollage}
                            alt="Montage of theatre productions and logos"
                            className="w-full rounded-lg"
                        />
                    </div>

                </div>

                {/* Text Content - Right */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-8 text-black border-b-2 border-black pb-2 inline-block">Experience</h2>
                    <p className="text-xl text-dark-grey leading-loose">
                        I have experience in producing and general management across a number of companies
                        including Theatre503, David Adkin Ltd, Spare Tyre Theatre Company, Smart Entertainment &
                        Vicky Graham Productions. I have worked on productions in London at venues including
                        Park Theatre, Jermyn Street Theatre, Finborough Theatre, Southwark Playhouse,
                        Hampstead Theatre, VAULT Festival & Marylebone Theatre.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Experience;
