import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Lock, Check, Book } from 'lucide-react';
import { cn } from '../../utils/cn';

const courseData = [
  {
    unit: 1,
    title: '基础入门 (A1)',
    description: '学习基础发音和简单问候',
    levels: [
      { id: 'u1-l1', type: 'vocabulary', status: 'completed', stars: 3 },
      { id: 'u1-l2', type: 'grammar', status: 'completed', stars: 2 },
      { id: 'u1-l3', type: 'speaking', status: 'completed', stars: 3 },
      { id: 'u1-l4', type: 'listening', status: 'completed', stars: 3 },
    ]
  },
  {
    unit: 2,
    title: '日常交流',
    description: '掌握数字、时间和常见动词',
    levels: [
      { id: 'u2-l1', type: 'vocabulary', status: 'completed', stars: 3 },
      { id: 'u2-l2', type: 'grammar', status: 'completed', stars: 1 },
      { id: 'u2-l3', type: 'speaking', status: 'unlocked', stars: 0 },
      { id: 'u2-l4', type: 'listening', status: 'locked', stars: 0 },
    ]
  },
  {
    unit: 3,
    title: '点餐与购物',
    description: '餐厅和超市中的必备表达',
    levels: [
      { id: 'u3-l1', type: 'vocabulary', status: 'locked', stars: 0 },
      { id: 'u3-l2', type: 'grammar', status: 'locked', stars: 0 },
      { id: 'u3-l3', type: 'speaking', status: 'locked', stars: 0 },
    ]
  }
];

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">学习路线</h1>
        <p className="text-gray-500 font-semibold">沿着路线逐步解锁，掌握全新语言</p>
      </div>

      <div className="space-y-16">
        {courseData.map((unit, unitIdx) => (
          <div key={unit.unit} className="relative">
            {/* Unit Header */}
            <div className="card-3d bg-violet-50 border-2 border-violet-100 mb-8 relative z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-violet-700 mb-1">
                    单元 {unit.unit}: {unit.title}
                  </h2>
                  <p className="text-violet-500 font-bold">{unit.description}</p>
                </div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-inner-soft">
                  <Book className="w-8 h-8 text-violet-400" />
                </div>
              </div>
            </div>

            {/* Path Nodes */}
            <div className="flex flex-col items-center gap-6 relative">
              {/* Path Background Line */}
              <div className="absolute top-0 bottom-0 w-4 bg-gray-100 rounded-full z-0 left-1/2 -translate-x-1/2"></div>
              
              {unit.levels.map((level, levelIdx) => {
                // Alternating left/right offset for the "snake" path look
                const offsetClass = levelIdx % 2 === 0 ? '-translate-x-12' : 'translate-x-12';
                
                const isCompleted = level.status === 'completed';
                const isUnlocked = level.status === 'unlocked';
                const isLocked = level.status === 'locked';

                return (
                  <div 
                    key={level.id} 
                    className={cn(
                      "relative z-10 flex flex-col items-center gap-2 transition-transform duration-300",
                      offsetClass,
                      isUnlocked && "hover:scale-110 cursor-pointer"
                    )}
                    onClick={() => isUnlocked && navigate(`/learn/${level.id}`)}
                  >
                    {/* Crown/Stars for completed */}
                    {isCompleted && (
                      <div className="absolute -top-4 -right-4 bg-white rounded-full px-2 py-0.5 shadow-sm border border-yellow-100 flex items-center gap-1 z-20">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-black text-yellow-600">{level.stars}</span>
                      </div>
                    )}

                    {/* Node Button */}
                    <button 
                      disabled={isLocked}
                      className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center border-b-8 transition-all duration-150 relative",
                        isCompleted && "bg-mint-400 border-mint-600 text-white",
                        isUnlocked && "bg-violet-500 border-violet-700 text-white active:border-b-0 active:translate-y-2",
                        isLocked && "bg-gray-200 border-gray-300 text-gray-400"
                      )}
                    >
                      {isCompleted && <Check className="w-10 h-10" strokeWidth={4} />}
                      {isUnlocked && <Star className="w-10 h-10 fill-white" />}
                      {isLocked && <Lock className="w-8 h-8" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}