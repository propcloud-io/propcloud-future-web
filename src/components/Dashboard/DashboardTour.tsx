import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const step = tourSteps[currentStep];
      const target = document.querySelector(step.target) as HTMLElement;
      
      if (target) {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        let top = 0;
        let left = 0;
        
        switch (step.position) {
          case 'bottom':
            top = rect.bottom + scrollTop + 20;
            left = Math.min(rect.left + rect.width / 2, viewportWidth - 200);
            break;
          case 'top':
            top = rect.top + scrollTop - 20;
            left = Math.min(rect.left + rect.width / 2, viewportWidth - 200);
            break;
          case 'right':
            top = rect.top + scrollTop + rect.height / 2;
            left = Math.min(rect.right + 20, viewportWidth - 320);
            break;
          case 'left':
            top = rect.top + scrollTop + rect.height / 2;
            left = Math.max(rect.left - 20, 20);
            break;
        }
        
        // Ensure tooltip stays within viewport bounds
        const tooltipHeight = 200; // Approximate tooltip height
        if (top + tooltipHeight > scrollTop + viewportHeight) {
          top = scrollTop + viewportHeight - tooltipHeight - 20;
        }
        if (top < scrollTop + 100) {
          top = scrollTop + 100;
        }
        
        setPosition({ top, left });
        
        // Smooth scroll to keep target in view with offset for header
        const targetTop = rect.top + scrollTop - 150;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth'
        });
        
        // Show tooltip after scroll animation
        setTimeout(() => setIsVisible(true), 300);
      }
    };

    setIsVisible(false);
    const timeoutId = setTimeout(updatePosition, 100);
    
    const handleResize = () => {
      setIsVisible(false);
      setTimeout(updatePosition, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTourStep = tourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" />
      
      {/* Tour Tooltip */}
      <div
        className={`fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-sm transform transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          top: position.top,
          left: position.left,
          transform: currentTourStep.position === 'top' || currentTourStep.position === 'bottom' 
            ? 'translateX(-50%)' 
            : currentTourStep.position === 'left' 
            ? 'translateX(-100%)' 
            : 'translateX(0)',
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg">{currentTourStep.title}</h3>
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">{currentTourStep.content}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-50"
              >
                <ArrowLeft size={14} />
                Back
              </button>
            )}
            <button
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              Skip Tour
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-lg text-sm hover:from-teal-700 hover:to-teal-800 transition-all shadow-md hover:shadow-lg"
            >
              {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
