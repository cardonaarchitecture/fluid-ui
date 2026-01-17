import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartData } from '../types';

interface AnalyticsPanelProps {
  data: ChartData[];
  title: string;
  subtitle: string;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ data, title, subtitle }) => {
  return (
    <motion.div 
      className="bg-flux-surface backdrop-blur-xl border border-flux-border rounded-[2rem] p-6 w-full h-full relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative z-10 mb-6">
        <h3 className="text-white/90 text-lg font-medium">{title}</h3>
        <p className="text-white/50 text-sm">{subtitle}</p>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D434FE" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4B50E6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.3)" 
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(5, 5, 17, 0.8)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#D434FE' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#D434FE" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Decorative bioluminescent accent */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-flux-deepBlue/20 blur-[50px] rounded-full" />
    </motion.div>
  );
};

export default AnalyticsPanel;