import React, { useEffect, useRef } from 'react';
import { Clock, FlaskConical, Cpu, Code, BookOpen } from 'lucide-react';

const ClassRoutine = () => {
  const dayRefs = {
    Sunday: useRef(null),
    Monday: useRef(null),
    Tuesday: useRef(null),
    Wednesday: useRef(null)
  };

  const schedule = {
    Sunday: [
      { time: '08:00 – 09:30', course: 'Digital Logic and Circuits', type: 'Theory', color: 'from-blue-500/10 to-blue-600/10', border: 'border-blue-500/20', icon: Cpu },
      { time: '10:20 – 12:20', course: 'Chemistry', type: 'Theory', color: 'from-emerald-500/10 to-emerald-600/10', border: 'border-emerald-500/20', icon: FlaskConical },
      { time: '12:40 – 15:00', course: 'Digital Logic and Circuits', type: 'Lab', color: 'from-blue-500/10 to-blue-600/10', border: 'border-blue-500/20', icon: Cpu }
    ],
    Monday: [
      { time: '10:20 – 12:20', course: 'Algorithms', type: 'Theory', color: 'from-purple-500/10 to-purple-600/10', border: 'border-purple-500/20', icon: Code },
      { time: '12:40 – 15:00', course: 'Software Engineering', type: 'Lab', color: 'from-orange-500/10 to-orange-600/10', border: 'border-orange-500/20', icon: BookOpen }
    ],
    Tuesday: [
      { time: '08:00 – 09:30', course: 'Digital Logic and Circuits', type: 'Theory', color: 'from-blue-500/10 to-blue-600/10', border: 'border-blue-500/20', icon: Cpu },
      { time: '10:20 – 12:40', course: 'Chemistry', type: 'Lab', color: 'from-emerald-500/10 to-emerald-600/10', border: 'border-emerald-500/20', icon: FlaskConical }
    ],
    Wednesday: [
      { time: '10:20 – 12:40', course: 'Algorithms', type: 'Lab', color: 'from-purple-500/10 to-purple-600/10', border: 'border-purple-500/20', icon: Code },
      { time: '12:40 – 14:40', course: 'Software Engineering', type: 'Theory', color: 'from-orange-500/10 to-orange-600/10', border: 'border-orange-500/20', icon: BookOpen }
    ]
  };

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const dayName = days[today];
    
    // Only return if it's a class day
    return schedule[dayName] ? dayName : null;
  };

  useEffect(() => {
    const currentDay = getCurrentDay();
    if (currentDay && dayRefs[currentDay]?.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        dayRefs[currentDay].current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, []);

  const currentDay = getCurrentDay();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-800 mb-2 tracking-tight">Class Routine</h1>
          <p className="text-sm sm:text-base text-slate-500 font-light">Spring 2025–2026</p>
          {currentDay && (
            <div className="mt-3 inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-light">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              Today is {currentDay}
            </div>
          )}
        </div>

        {/* Schedule Grid */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {Object.entries(schedule).map(([day, classes]) => {
            const isToday = day === currentDay;
            return (
              <div 
                key={day} 
                ref={dayRefs[day]}
                className={`bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border ${
                  isToday ? 'border-slate-400/50 ring-2 ring-slate-300/30' : 'border-slate-200/50'
                } overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
              >
                {/* Day Header */}
                <div className={`bg-gradient-to-r ${
                  isToday ? 'from-slate-900 to-slate-800' : 'from-slate-800 to-slate-700'
                } px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between`}>
                  <h2 className="text-white font-light text-base sm:text-lg tracking-wide">{day}</h2>
                  {isToday && (
                    <span className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full">Today</span>
                  )}
                </div>

                {/* Classes */}
                <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
                  {classes.map((cls, idx) => {
                    const Icon = cls.icon;
                    return (
                      <div
                        key={idx}
                        className={`bg-gradient-to-r ${cls.color} border ${cls.border} rounded-lg sm:rounded-xl p-4 sm:p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm`}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="mt-0.5 sm:mt-1 flex-shrink-0">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-2">
                              <h3 className="text-slate-800 font-medium text-sm sm:text-base">{cls.course}</h3>
                              <span className="text-xs font-medium text-slate-500 bg-white/60 px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap w-fit">
                                {cls.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-600">
                              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2} />
                              <span className="font-light">{cls.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center px-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500 font-light">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/30 border border-blue-500/20"></div>
              <span className="whitespace-nowrap">Digital Logic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 border border-emerald-500/20"></div>
              <span>Chemistry</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/20"></div>
              <span>Algorithms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-600/30 border border-orange-500/20"></div>
              <span className="whitespace-nowrap">Software Eng.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRoutine;