import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Heart, Volume2, Mic, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const lessonData = [
  {
    type: 'vocabulary',
    question: '苹果',
    options: ['Apple', 'Banana', 'Orange', 'Grape'],
    correct: 0,
    audio: true
  },
  {
    type: 'grammar',
    question: 'I ___ a student.',
    options: ['am', 'is', 'are', 'be'],
    correct: 0
  },
  {
    type: 'speaking',
    question: 'How are you?',
    translation: '你好吗？',
    audio: true
  }
];

export default function Learn() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [lives, setLives] = useState(5);

  const currentLesson = lessonData[currentStep];
  const progress = ((currentStep) / lessonData.length) * 100;

  const handleCheck = () => {
    if (currentLesson.type === 'speaking') {
      setStatus('correct');
      return;
    }

    if (selectedOpt === currentLesson.correct) {
      setStatus('correct');
    } else {
      setStatus('wrong');
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentStep < lessonData.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOpt(null);
      setStatus('idle');
    } else {
      // Finished
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Top Header */}
      <header className="px-4 py-6 md:px-8 max-w-4xl mx-auto w-full flex items-center gap-4">
        <button 
          onClick={() => navigate('/courses')}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-mint-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="flex items-center gap-2 text-coral-500 font-bold text-xl">
          <Heart className="w-8 h-8 fill-coral-500" />
          {lives}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full"
          >
            {currentLesson.type === 'vocabulary' || currentLesson.type === 'grammar' ? (
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-gray-800 text-center">
                  {currentLesson.type === 'vocabulary' ? '选择正确的翻译' : '填空'}
                </h2>
                
                <div className="flex justify-center items-center gap-4 my-8">
                  {currentLesson.audio && (
                    <button className="w-12 h-12 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center hover:bg-violet-200 transition-colors">
                      <Volume2 className="w-6 h-6" />
                    </button>
                  )}
                  <div className="text-4xl font-bold text-gray-900 border-b-2 border-dashed border-gray-300 pb-2">
                    {currentLesson.question}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentLesson.options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => status === 'idle' && setSelectedOpt(idx)}
                      disabled={status !== 'idle'}
                      className={cn(
                        "p-4 rounded-2xl border-2 font-bold text-lg text-center transition-all duration-200",
                        selectedOpt === idx 
                          ? "border-violet-400 bg-violet-50 text-violet-700 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700",
                        status === 'correct' && selectedOpt === idx && "border-mint-500 bg-mint-50 text-mint-700",
                        status === 'wrong' && selectedOpt === idx && "border-coral-500 bg-coral-50 text-coral-700",
                        status === 'wrong' && idx === currentLesson.correct && "border-mint-500 bg-mint-50 text-mint-700"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8 text-center">
                <h2 className="text-3xl font-black text-gray-800">大声说出这句话</h2>
                <div className="my-12">
                  <button className="w-16 h-16 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-6 hover:bg-violet-200">
                    <Volume2 className="w-8 h-8" />
                  </button>
                  <div className="text-4xl font-bold text-gray-900 mb-4">{currentLesson.question}</div>
                  <div className="text-xl text-gray-500">{currentLesson.translation}</div>
                </div>
                
                <button 
                  onClick={() => status === 'idle' ? handleCheck() : undefined}
                  className={cn(
                    "w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-soft transition-all duration-300",
                    status === 'idle' ? "bg-violet-500 text-white hover:bg-violet-600 hover:scale-105" : "bg-mint-400 text-white"
                  )}
                >
                  {status === 'idle' ? <Mic className="w-12 h-12" /> : <Check className="w-12 h-12" />}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Action Bar */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 border-t-2 p-4 md:p-8 transition-colors duration-300 z-50",
        status === 'idle' ? "bg-white border-gray-100" : 
        status === 'correct' ? "bg-mint-50 border-mint-200" : "bg-coral-50 border-coral-200"
      )}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="hidden md:block">
            {status === 'correct' && (
              <div className="flex items-center gap-3 text-mint-600 font-black text-2xl">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Check className="w-6 h-6" strokeWidth={4} />
                </div>
                非常棒！
              </div>
            )}
            {status === 'wrong' && (
              <div className="flex items-center gap-3 text-coral-600 font-black text-2xl">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <X className="w-6 h-6" strokeWidth={4} />
                </div>
                正确答案是: {currentLesson.options?.[currentLesson.correct]}
              </div>
            )}
          </div>
          
          <button
            onClick={status === 'idle' ? handleCheck : handleNext}
            disabled={status === 'idle' && selectedOpt === null && currentLesson.type !== 'speaking'}
            className={cn(
              "w-full md:w-auto px-12 py-4 rounded-2xl font-black text-lg shadow-3d active:shadow-3d-active active:translate-y-1 transition-all",
              status === 'idle' 
                ? (selectedOpt !== null || currentLesson.type === 'speaking' 
                    ? "bg-violet-500 text-white shadow-violet-700" 
                    : "bg-gray-200 text-gray-400 shadow-gray-300 cursor-not-allowed")
                : status === 'correct'
                  ? "bg-mint-500 text-white shadow-mint-700"
                  : "bg-coral-500 text-white shadow-coral-700"
            )}
          >
            {status === 'idle' ? '检查答案' : '继续'}
          </button>
        </div>
      </div>
    </div>
  );
}