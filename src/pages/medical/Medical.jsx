import React from 'react'
import medical from '../../assets/medical/medical.jpg'
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight } from "react-icons/fi";
function Medical() {

    const navigate = useNavigate()
    const metrics = [
        {
            value: "30,000+",
            description: "Inpatients Annually",
        },
        {
            value: "1.2 Lakh+",
            description: "Outpatients Treated Every Year",
        },
        {
            value: "Comprehensive",
            description: "Multi-Speciality Treatments",
        },
    ]
    return (
        <>
            <section className="bg-[#F5E9D6] relative">
                <div
                    className="flex items-center min-h-[50vh] sm:min-h-[60vh] md:min-h-[50vh]  lg:min-h-[90vh] bg-cover bg-center relative animate-bgSlideUp"
                    style={{ backgroundImage: `url(${medical})` }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="w-full max-w-6xl mx-auto text-center relative z-10">
                        <h1 className="animate-h1 font-['Raleway'] font-bold text-2xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wider">
                            RUBY HALL CLINIC , PUNE
                        </h1>
                        <h2 className="animate-h2 font-['Rufina'] font-normal text-xl md:text-2xl text-[#F5F3F1] mb-12 max-w-3xl mx-auto leading-relaxed">
                            Over 50 Years of Excellence in Multi-Specialty Healthcare
                        </h2>
                        <button onClick={() => { navigate('/apartments') }} className="animate-btn flex items-center gap-2 mx-auto bg-[#5B656F] hover:bg-slate-600 text-white font-['Raleway'] py-3 px-8 md:py-4 md:px-10 rounded-lg duration-300 text-lg tracking-wide">
                            Book Your Appointment
                            <FiArrowUpRight className="text-xl" />
                        </button>
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-b from-[#F5E9D6] to-[#F5F3F1] ">
                <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-12">
                    <div className="text-center">
                        <h2 className="mt-3 text-balance text-3xl font-semibold text-foreground md:text-5xl font-[Raleway]">
                            Why Patients Trust <span className="text-primary">Us</span>
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3 py-6">
                        {metrics.map((metric) => (
                            <article
                                key={metric.value}
                                className="rounded-[calc(var(--radius)*2)] bg-card px-8 py-10 md:py-6 text-center shadow-lg bg-[#FFFFFF]  transition-shadow hover:shadow-xl rounded-tl-[40px] "
                            >
                                <h3 className="text-2xl font-[600]  md:text-2xl font-[Raleway]">{metric.value}</h3>
                                <p className="mt-3 text-sm font-medium leading-relaxed font-[Rufina]">{metric.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Medical
