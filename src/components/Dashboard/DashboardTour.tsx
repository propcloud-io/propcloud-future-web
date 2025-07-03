import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    id: 'metrics',
    title: 'Performance Cards',
    content: 'These cards show your key property metrics at a glance - occupancy, revenue, and guest satisfaction.',
    target: '[data-tour="metrics"]',
    position: 'bottom'
  },
  {
    id: 'chart',
    title: 'Occupancy Trends',
    content: 'Track your booking patterns and occupancy rates over time with this interactive chart.',
    target: '[data-tour="chart"]',
    position: 'top'
  },
  {
    id: 'chat',
    title: 'AI Assistant',
    content: 'Ask questions about your properties and get instant insights from our AI assistant.',
    target: '[data-tour="chat"]',
    position: 'top'
  },
  {
    id: 'cta',
    title: 'Ready to Start?',
    content: 'Want this for your property? Click here to get started with a free walkthrough!',
    target: '[data-tour="sidebar"]',
    position: 'left'
  }
];

interface DashboardTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function DashboardTour({ onComplete, onSkip }: DashboardTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      const step = tourSteps[currentStep];
      const target = document.querySelector(step.target) as HTMLElement;
      
      if (target) {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        let top = 0;
        let left = 0;
        
        switch (step.position) {
          case 'bottom':
            top = rect.bottom + scrollTop + 10;
            left = rect.left + rect.width / 2;
            break;
          case 'top':
            top = rect.top + scrollTop - 10;
            left = rect.left + rect.width / 2;
            break;
          case 'right':
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.right + 10;
            break;
          case 'left':
            top = rect.top + scrollTop + rect.height / 2;
            left = rect.left - 10;
            break;
        }
        
        setPosition({ top, left });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentTourStep = tourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" />
      
      {/* Tour Tooltip */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm transform -translate-x-1/2 -translate-y-full"
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900">{currentTourStep.title}</h3>
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{currentTourStep.content}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip Tour
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 transition-colors"
            >
              {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}