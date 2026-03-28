import React from 'react';
import { useStore } from '../../store/useStore';
import { Flame, Star, Trophy, Target, Zap, Crown } from 'lucide-react';
import { cn } from '../../utils/cn';

const achievements = [
  { id: 1, title: '初来乍到', desc: '完成第一节课', icon: Target, unlocked: true, date: '2023-10-01' },
  { id: 2, title: '持之以恒', desc: '达到 7 天连胜', icon: Flame, unlocked: true, date: '2023-10-08' },
  { id: 3, title: '词汇达人', desc: '掌握 100 个单词', icon: Zap, unlocked: true, date: '2023-10-15' },
  { id: 4, title: '语法大师', desc: '全对完成 10 次语法练习', icon: Crown, unlocked: false },
  { id: 5, title: '传奇学者', desc: '达到 30 天连胜', icon: Trophy, unlocked: false },
  { id: 6, title: '母语者', desc: '完成所有 A1 课程', icon: Star, unlocked: false },
];

export default function Profile() {
  const user = useStore((state) => state.user);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto animate-in fade-in duration-500 pb-24">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <div className="w-32 h-32 bg-violet-100 rounded-full flex items-center justify-center text-6xl shadow-soft shrink-0 border-4 border-white">
          {user.avatar}
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl font-black text-gray-900 mb-2">{user.name}</h1>
          <p className="text-gray-500 font-bold text-lg mb-4">
            正在学习 <span className="text-violet-600">{user.learningLanguage}</span>
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-white px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-sm border border-gray-100">
              <Flame className="fill-orange-500 text-orange-500 w-5 h-5" />
              <span className="text-gray-700">{user.streak} 天连胜</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-sm border border-gray-100">
              <Star className="fill-yellow-500 text-yellow-500 w-5 h-5" />
              <span className="text-gray-700">{user.xp} XP</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-sm border border-gray-100">
              <Trophy className="fill-violet-500 text-violet-500 w-5 h-5" />
              <span className="text-gray-700">{user.level} 级</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-gray-900 mb-6">学习统计</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '总计经验', value: user.xp, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { label: '最高连胜', value: '14 天', color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: '掌握词汇', value: '342', color: 'text-mint-600', bg: 'bg-mint-50' },
            { label: '完成课程', value: '18', color: 'text-violet-600', bg: 'bg-violet-50' },
          ].map((stat, idx) => (
            <div key={idx} className="card-3d flex flex-col items-center justify-center p-6">
              <div className={cn("text-3xl font-black mb-2", stat.color)}>{stat.value}</div>
              <div className="text-sm font-bold text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-6">成就徽章</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((badge) => (
            <div 
              key={badge.id} 
              className={cn(
                "card-3d flex items-start gap-4 transition-all",
                badge.unlocked ? "opacity-100" : "opacity-60 grayscale"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                badge.unlocked ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"
              )}>
                <badge.icon className={cn("w-8 h-8", badge.unlocked && "fill-yellow-500")} />
              </div>
              <div>
                <h3 className="font-black text-lg text-gray-900 mb-1">{badge.title}</h3>
                <p className="text-sm font-bold text-gray-500 mb-2">{badge.desc}</p>
                {badge.unlocked ? (
                  <span className="text-xs font-bold text-mint-600 bg-mint-50 px-2 py-1 rounded-lg">
                    已解锁: {badge.date}
                  </span>
                ) : (
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                    未解锁
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}