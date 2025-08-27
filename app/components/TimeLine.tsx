"use client";

import React, { useState, useEffect, useRef } from 'react';

const Timeline = () => {
  const [timelineItems, setTimelineItems] = useState([
    {
      id: 1,
      year: '2023',
      title: 'Aktuelles Ereignis',
      content: 'Dies ist das aktuellste Ereignis in unserem Zeitstrahl.',
      image: 'https://images.unsplash.com/photo-1677442135135-416f8aa26a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      position: 'left'
    },
    {
      id: 2,
      year: '2020',
      title: 'Die Pandemie',
      content: 'Eine globale Pandemie verändert die Welt.',
      image: 'https://images.unsplash.com/photo-1584119164241-5c70f8377b2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      position: 'right'
    },
    {
      id: 3,
      year: '2016',
      title: 'Technologische Durchbrüche',
      content: 'KI und maschinelles Lernen werden Mainstream.',
      position: 'left'
    },
    {
      id: 4,
      year: '2012',
      title: 'Entdeckung des Higgs-Bosons',
      content: 'Wissenschaftler am CERN bestätigen die Existenz des Higgs-Boson-Teilchens.',
      image: 'https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      position: 'right'
    },
    {
      id: 5,
      year: '2008',
      title: 'Finanzkrise',
      content: 'Die Welt erlebt eine der schwersten Finanzkrisen der Geschichte.',
      position: 'left'
    }
  ]);

  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          setVisibleItems((prev) => [...prev, parseInt(id)]);
        }
      });
    }, { threshold: 0.3 });

    const timelineElements = document.querySelectorAll('.timeline-item');
    timelineElements.forEach((el) => observer.observe(el));

    return () => {
      timelineElements.forEach((el) => observer.unobserve(el));
    };
  }, [timelineItems]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Zeitstrahl der Vereinsgeschichte</h1>
        
        <div className="relative">
          {/* Zentrale Zeitstrahl-Linie */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>
          
          <div ref={timelineRef} className="space-y-12">
            {timelineItems.map((item, index) => (
              <div 
                key={item.id}
                data-id={item.id}
                className={`timeline-item relative flex ${item.position === 'left' ? 'flex-row' : 'flex-row-reverse'} ${visibleItems.includes(item.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700 ease-in-out`}
              >
                {/* Inhalt */}
                <div className={`w-5/12 ${item.position === 'left' ? 'pr-8 text-right' : 'pl-8'}`}>
                  {item.title && <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h2>}
                  {item.content && <p className="text-gray-600 mb-4">{item.content}</p>}
                  {item.image && (
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    </div>
                  )}
                </div>
                
                {/* Zeitstrahl-Punkt mit Jahreszahl */}
                <div className="relative w-2/12 flex justify-center items-center">
                  <div className="absolute w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-lg z-10"></div>
                  <div className={`absolute top-1/2 transform -translate-y-1/2 ${item.position === 'left' ? 'right-0' : 'left-0'} bg-white px-2 py-1 rounded-md shadow-md text-blue-600 font-bold`}>
                    {item.year}
                  </div>
                </div>
                
                {/* Platzhalter für die andere Seite */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
          >
            Weitere Ereignisse laden
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;