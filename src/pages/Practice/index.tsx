import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, BookOpen, Mic, Volume2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const practices = [
  { id: 'p1', title: '智能复习', desc: '根据遗忘曲线推荐', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  { id: 'p2', title: '口语强化', desc: '模拟真实对话场景', icon: Mic, color: 'text-coral-500', bg: 'bg-coral-50', border: 'border-coral-200' },
  { id: 'p3', title: '听力训练', desc: '多种口音听写练习', icon: Volume2, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
  { id: 'p4', title: '语法专项', desc: '攻克薄弱语法点', icon: BookOpen, color: 'text-mint-600', bg: 'bg-mint-50', border: 'border-mint-200' },
];

export default function Practice() {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto animate-in fade-in duration-500 pb-24">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">专项练习</h1>
        <p className="text-gray-500 font-semibold">选择你想要强化的技能</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practices.map((p) => (
          <div 
            key={p.id}
            onClick={() => navigate('/learn/random')}
            className={cn(
              "card-3d cursor-pointer hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center p-8 border-2",
              p.border, "hover:shadow-md"
            )}
          >
            <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mb-6", p.bg)}>
              <p.icon className={cn("w-10 h-10", p.color)} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">{p.title}</h2>
            <p className="text-gray-500 font-bold">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}