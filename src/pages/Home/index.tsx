import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Flame, Star, BookOpen, Clock, Award, Users } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Home() {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
            欢迎回来, {user.name}! {user.avatar}
          </h1>
          <p className="text-gray-500 font-semibold text-lg">
            今天也是学习 <span className="text-violet-600">{user.learningLanguage}</span> 的好日子
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-orange-50 border-2 border-orange-200 text-orange-600 px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-soft">
            <Flame className="fill-orange-500 w-5 h-5" />
            <span>{user.streak} 天连胜</span>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 text-yellow-600 px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-soft">
            <Star className="fill-yellow-500 w-5 h-5" />
            <span>{user.xp} XP</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning Card */}
          <div className="card-3d bg-gradient-to-br from-violet-500 to-violet-700 text-white border-none shadow-3d shadow-violet-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="bg-white/20 inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 backdrop-blur-md">
                  单元 3 • 关卡 4
                </div>
                <h2 className="text-3xl font-black mb-2">日常点餐与购物</h2>
                <p className="text-violet-100 font-medium mb-6">掌握在餐厅和超市中常用的基本交流表达。</p>
                <button 
                  onClick={() => navigate('/learn/u3-l4')}
                  className="bg-white text-violet-700 font-black py-4 px-8 rounded-2xl shadow-3d shadow-violet-900/50 active:shadow-3d-active active:translate-y-1 transition-all duration-150 flex items-center gap-2 w-full md:w-auto justify-center"
                >
                  <Play className="fill-violet-700 w-5 h-5" />
                  继续学习
                </button>
              </div>
              <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=3d%20isometric%20illustration%20of%20a%20coffee%20cup%20and%20shopping%20bag%2C%20colorful%2C%20cute%2C%20clean%20background&image_size=square" alt="Shopping" className="w-full h-full object-contain drop-shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Daily Tasks */}
          <div>
            <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="text-violet-500" />
              今日任务
            </h3>
            <div className="space-y-4">
              {[
                { title: '完成 1 个新关卡', xp: 50, progress: 0, total: 1, icon: Play, color: 'text-blue-500', bg: 'bg-blue-100' },
                { title: '复习 20 个单词', xp: 20, progress: 12, total: 20, icon: BookOpen, color: 'text-mint-600', bg: 'bg-mint-100' },
                { title: '练习 5 分钟口语', xp: 30, progress: 5, total: 5, icon: Clock, color: 'text-coral-500', bg: 'bg-coral-100' },
              ].map((task, i) => (
                <div key={i} className="card-3d flex items-center gap-4 hover:border-violet-200 transition-colors cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.bg}`}>
                    <task.icon className={`w-6 h-6 ${task.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${task.progress === task.total ? 'bg-mint-500' : 'bg-violet-500'}`}
                          style={{ width: `${(task.progress / task.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-400 w-12 text-right">
                        {task.progress}/{task.total}
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 font-bold flex items-center gap-1">
                    +{task.xp} <Star className="w-4 h-4 fill-yellow-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Stats Radar or overview */}
          <div className="card-3d">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              <Award className="text-violet-500" />
              能力雷达
            </h3>
            <div className="aspect-square relative flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-50 to-transparent rounded-full"></div>
              <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=3d%20modern%20radar%20chart%20illustration%2C%20colorful%20transparent%20polygons%2C%20white%20background%2C%20cute%20UI%20element&image_size=square" alt="Radar Chart" className="w-full h-full object-contain relative z-10" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded-2xl">
                <div className="text-2xl font-black text-gray-800">342</div>
                <div className="text-sm font-bold text-gray-500">掌握词汇</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-2xl">
                <div className="text-2xl font-black text-gray-800">A2</div>
                <div className="text-sm font-bold text-gray-500">当前等级</div>
              </div>
            </div>
          </div>

          {/* Friends Activity */}
          <div className="card-3d">
            <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
              <Users className="text-violet-500 w-6 h-6" />
              好友动态
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Alice', action: '完成了单元 2 测试', time: '2小时前', avatar: '👩' },
                { name: 'Bob', action: '达到了 30 天连胜!', time: '5小时前', avatar: '👨' },
                { name: 'Charlie', action: '晋升到白银段位', time: '1天前', avatar: '👦' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-xl shrink-0">
                    {activity.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">
                      {activity.name} <span className="font-medium text-gray-500">{activity.action}</span>
                    </div>
                    <div className="text-xs font-bold text-gray-400 mt-0.5">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}