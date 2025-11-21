import React from 'react'
import landfing from '../../../src/assets/apartments/hero.jpg'
import { useNavigate } from "react-router-dom";
import img1 from '../../../src/assets/apartments/img1.jpg'
import img2 from '../../../src/assets/apartments/img2.jpg'
import img3 from '../../../src/assets/apartments/img3.jpg'


function Home() {

    const navigate = useNavigate();

    return (
        <>
            <div className='mt-14'>

                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="relative h-[100vh] bg-gradient-to-r from-orange-600 to-amber-600 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="relative z-10 text-center px-4">
                            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
                                Experience Luxury Redefined
                            </h2>
                            <p className="text-xl text-white/90 mb-8 text-balance">
                                Discover our world-class accommodations and exceptional service
                            </p>
                            <button style={{
                                backgroundColor: '#FFFFFF',
                                color: '#1a1a1a',
                                padding: '14px 32px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease',
                            }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#F0F0F0';
                                    e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#FFFFFF';
                                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                                    e.target.style.transform = 'translateY(0)';
                                }}>
                                Explore Rooms
                            </button>
                        </div>
                        <img
                            src={landfing}
                            alt="Luxury hotel lobby"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </section>

                    {/* Featured Rooms Section */}
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sky-900 text-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h3 className="text-5xl font-bold mb-6">Our Signature Suites</h3>
                                <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-teal-400 mx-auto mb-6"></div>
                                <p className="text-sky-100 text-xl max-w-2xl mx-auto leading-relaxed">
                                    Each room is meticulously designed to provide comfort, elegance, and modern convenience for an unforgettable stay.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {[
                                    {
                                        name: 'Deluxe Room',
                                        price: '30000',
                                        image: img1,
                                        features: ['King Bed', 'City View', 'En-suite Bathroom'],
                                        popular: false
                                    },
                                    {
                                        name: 'Premium Suite',
                                        price: '40000',
                                        image: img2,
                                        features: ['King Bed', 'Living Area', 'Balcony', 'Complimentary Breakfast'],
                                        popular: true
                                    },
                                    {
                                        name: 'Presidential Suite',
                                        price: '60000',
                                        image: img3,
                                        features: ['Master Bedroom', 'Dining Room', 'Private Spa', 'Butler Service'],
                                        popular: false
                                    },
                                ].map((room, idx) => (
                                    <div key={idx} className="relative bg-sky-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                                        {room.popular && (
                                            <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-400 to-amber-500 text-sky-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className="overflow-hidden">
                                            <img
                                                src={room.image}
                                                alt={room.name}
                                                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="text-2xl font-bold">{room.name}</h4>
                                                <span className="text-3xl font-bold text-amber-400">{room.price}<span className="text-lg text-sky-200">/night</span></span>
                                            </div>
                                            <ul className="space-y-3 mb-8">
                                                {room.features.map((feature, i) => (
                                                    <li key={i} className="text-sky-100 flex items-center">
                                                        <svg className="w-5 h-5 text-amber-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                        </svg>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-500 text-white font-semibold rounded-xl hover:from-sky-500 hover:to-teal-400 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                                                Book Apartment
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-16">
                                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-sky-900 transition-all duration-300">
                                    View All Rooms
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default Home
