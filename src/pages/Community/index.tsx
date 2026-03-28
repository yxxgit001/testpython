import React from 'react';
import { useStore } from '../../store/useStore';
import { MessageSquare, Heart, Share2, Trophy, Medal } from 'lucide-react';
import { cn } from '../../utils/cn';

const leaderboard = [
  { rank: 1, name: 'Alice_Ling', xp: 5430, avatar: '👩' },
  { rank: 2, name: 'BobTheBuilder', xp: 4200, avatar: '👨' },
  { rank: 3, name: 'Charlie_P', xp: 3850, avatar: '👦' },
  { rank: 4, name: 'PolyglotExplorer', xp: 2450, avatar: '🦊', isUser: true },
  { rank: 5, name: 'Eva_Learn', xp: 2100, avatar: '👧' },
];

const posts = [
  {
    id: 1,
    author: 'Alice_Ling',
    avatar: '👩',
    content: '今天终于把 A2 的听力测试全通关了！太激动了 🎉',
    likes: 45,
    comments: 12,
    time: '2小时前'
  },
  {
    id: 2,
    author: 'BobTheBuilder',
    avatar: '👨',
    content: '求问大家，西班牙语里的虚拟式到底怎么记比较好？总是记混...',
    likes: 18,
    comments: 34,
    time: '5小时前'
  }
];

export default function Community() {
  const user = useStore((state) => state.user);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto animate-in fade-in duration-500 pb-24">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">社区</h1>
        <p className="text-gray-500 font-semibold">与全球学习者一起交流进度与心得</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Input */}
          <div className="card-3d border-2 border-violet-100 bg-violet-50">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shrink-0">
                {user.avatar}
              </div>
              <div className="flex-1">
                <textarea 
                  placeholder="分享你的学习心得..." 
                  className="w-full bg-white rounded-2xl p-4 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-violet-400 font-medium text-gray-700"
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button className="bg-violet-500 text-white font-bold py-2 px-6 rounded-xl shadow-3d shadow-violet-700 active:shadow-3d-active active:translate-y-1 transition-all">
                    发布
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="card-3d">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center text-2xl">
                    {post.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{post.author}</div>
                    <div className="text-sm font-bold text-gray-400">{post.time}</div>
                  </div>
                </div>
                <p className="text-gray-800 font-medium text-lg mb-6 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-coral-500 transition-colors font-bold">
                    <Heart className="w-5 h-5" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-violet-500 transition-colors font-bold">
                    <MessageSquare className="w-5 h-5" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors font-bold ml-auto">
                    <Share2 className="w-5 h-5" /> 分享
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Column: Leaderboard */}
        <div className="space-y-6">
          <div className="card-3d sticky top-6">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-500 w-6 h-6" />
              本周排行榜
            </h2>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-2xl transition-colors",
                    user.isUser ? "bg-violet-100 border border-violet-200" : "hover:bg-gray-50"
                  )}
                >
                  <div className="w-8 flex justify-center font-black">
                    {user.rank === 1 ? <Medal className="text-yellow-500 w-6 h-6" /> : 
                     user.rank === 2 ? <Medal className="text-gray-400 w-6 h-6" /> : 
                     user.rank === 3 ? <Medal className="text-orange-400 w-6 h-6" /> : 
                     <span className="text-gray-400">{user.rank}</span>}
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shrink-0 shadow-sm">
                    {user.avatar}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="font-bold text-gray-900 truncate">{user.name}</div>
                  </div>
                  <div className="font-black text-violet-600">
                    {user.xp} XP
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm font-bold text-gray-500 mb-3">距离结算还有 2 天 14 小时</p>
              <button className="text-violet-600 font-bold hover:text-violet-700">查看完整榜单</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}