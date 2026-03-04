import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { 
  ArrowUpRight, ArrowDownLeft, Zap, Globe, Shield, 
  TrendingUp, ChevronRight, Activity, Layers, 
  RefreshCw, CheckCircle, Clock, DollarSign,
  Send, ArrowRight, BarChart3, Lock
} from 'lucide-react'

// ─── Mock Data ───────────────────────────────────────────────────────────────
const TRANSACTIONS = [
  { id: 'TX-8821', from: 'Singapore', to: 'Dubai', amount: '125,000', currency: 'USDC', time: '2s ago', status: 'confirmed', flag_from: '🇸🇬', flag_to: '🇦🇪' },
  { id: 'TX-8820', from: 'New York', to: 'London', amount: '48,200', currency: 'USDC', time: '8s ago', status: 'confirmed', flag_from: '🇺🇸', flag_to: '🇬🇧' },
  { id: 'TX-8819', from: 'Tokyo', to: 'Seoul', amount: '3,400', currency: 'USDC', time: '15s ago', status: 'confirmed', flag_from: '🇯🇵', flag_to: '🇰🇷' },
  { id: 'TX-8818', from: 'Frankfurt', to: 'Mumbai', amount: '92,750', currency: 'USDC', time: '31s ago', status: 'confirmed', flag_from: '🇩🇪', flag_to: '🇮🇳' },
  { id: 'TX-8817', from: 'São Paulo', to: 'Miami', amount: '17,600', currency: 'USDC', time: '44s ago', status: 'confirmed', flag_from: '🇧🇷', flag_to: '🇺🇸' },
  { id: 'TX-8816', from: 'Sydney', to: 'Hong Kong', amount: '234,000', currency: 'USDC', time: '1m ago', status: 'confirmed', flag_from: '🇦🇺', flag_to: '🇭🇰' },
]

const CHART_DATA = [
  { h: '00', vol: 42 }, { h: '02', vol: 28 }, { h: '04', vol: 18 },
  { h: '06', vol: 35 }, { h: '08', vol: 68 }, { h: '10', vol: 82 },
  { h: '12', vol: 95 }, { h: '14', vol: 88 }, { h: '16', vol: 74 },
  { h: '18', vol: 91 }, { h: '20', vol: 78 }, { h: '22', vol: 62 },
]

const STATS = [
  { label: 'Total Settled Today', value: '$4.2B', change: '+12.4%', up: true, icon: DollarSign },
  { label: 'Avg Finality', value: '0.8s', change: '-0.2s', up: true, icon: Zap },
  { label: 'Active Corridors', value: '148', change: '+6', up: true, icon: Globe },
  { label: 'Gas Cost (USDC)', value: '$0.001', change: 'Fixed', up: true, icon: Shield },
]

const CORRIDORS = [
  { route: 'US → EU', volume: '$1.2B', share: 78, trend: '+8%' },
  { route: 'APAC → ME', volume: '$840M', share: 54, trend: '+22%' },
  { route: 'LATAM → US', volume: '$620M', share: 40, trend: '+15%' },
  { route: 'EU → APAC', volume: '$490M', share: 31, trend: '+5%' },
]

// ─── Components ──────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center" style={{background: 'linear-gradient(135deg, #00e5ff, #00b4d8)'}}>
            <span className="text-black font-bold text-sm" style={{fontFamily: 'Syne, sans-serif'}}>A</span>
          </div>
          <span className="font-bold text-white text-lg" style={{fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em'}}>
            Arc<span style={{color: '#00e5ff'}}>Flow</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Dashboard', 'Send', 'Analytics', 'Docs'].map(item => (
            <a key={item} href="#" className="text-sm transition-colors duration-200" 
               style={{color: item === 'Dashboard' ? '#00e5ff' : '#64748b', fontFamily: 'DM Sans, sans-serif'}}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{background: 'rgba(0,255,148,0.1)', border: '1px solid rgba(0,255,148,0.2)'}}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background: '#00ff94'}}></div>
            <span className="text-xs font-mono" style={{color: '#00ff94', fontFamily: 'JetBrains Mono, monospace'}}>TESTNET LIVE</span>
          </div>
          <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg" 
                  style={{background: 'linear-gradient(135deg, #00e5ff, #00b4d8)', color: '#040812', fontFamily: 'Syne, sans-serif', fontWeight: 600}}>
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  const [volume, setVolume] = useState(0)
  const [txCount, setTxCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      setVolume(Math.floor((4200000000 * step) / steps))
      setTxCount(Math.floor((284729 * step) / steps))
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,255,0.08) 0%, transparent 70%)'}}></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 animate-pulse" style={{background: 'radial-gradient(circle, #00e5ff, transparent)', filter: 'blur(80px)'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5" style={{background: 'radial-gradient(circle, #00ff94, transparent)', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite 2s'}}></div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Hero text */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)'}}>
              <Zap size={12} style={{color: '#00e5ff'}} />
              <span className="text-xs font-mono" style={{color: '#00e5ff', fontFamily: 'JetBrains Mono, monospace'}}>Built on Arc Network · EVM Compatible</span>
            </div>
            
            <h1 className="mb-6 leading-none" style={{fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em'}}>
              <span className="block text-5xl lg:text-7xl font-black text-white">Global</span>
              <span className="block text-5xl lg:text-7xl font-black text-white">Payments</span>
              <span className="block text-5xl lg:text-7xl font-black" style={{
                background: 'linear-gradient(135deg, #00e5ff 0%, #00ff94 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Reimagined.</span>
            </h1>
            
            <p className="text-lg mb-8 max-w-md leading-relaxed" style={{color: '#94a3b8', fontFamily: 'DM Sans, sans-serif'}}>
              Send stablecoins across 148+ corridors with sub-second finality. 
              Fixed $0.001 fees. Zero FX risk. Powered by Arc's deterministic consensus.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105" 
                      style={{background: 'linear-gradient(135deg, #00e5ff, #00b4d8)', color: '#040812', fontFamily: 'Syne, sans-serif'}}>
                <Send size={16} />
                Send Payment
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:border-cyan-400"
                      style={{color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', fontFamily: 'Syne, sans-serif'}}>
                <BarChart3 size={16} />
                View Analytics
              </button>
            </div>

            {/* Live stats */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-black text-white font-mono" style={{fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em'}}>
                  ${(volume / 1e9).toFixed(1)}B
                </div>
                <div className="text-sm mt-1" style={{color: '#64748b'}}>Settled today</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white" style={{fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em'}}>
                  {txCount.toLocaleString()}
                </div>
                <div className="text-sm mt-1" style={{color: '#64748b'}}>Transactions</div>
              </div>
            </div>
          </div>

          {/* Right: Live transaction feed */}
          <div className="relative">
            <div className="rounded-2xl p-1" style={{background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,255,148,0.05), rgba(0,229,255,0.1))'}}>
              <div className="rounded-xl p-6" style={{background: '#080f1e'}}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Activity size={16} style={{color: '#00e5ff'}} />
                    <span className="font-semibold text-sm" style={{fontFamily: 'Syne, sans-serif', color: '#e2e8f0'}}>Live Transactions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{background: '#00ff94', animation: 'pulse 1s ease-in-out infinite'}}></div>
                    <span className="text-xs" style={{color: '#00ff94', fontFamily: 'JetBrains Mono, monospace'}}>LIVE</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {TRANSACTIONS.map((tx, i) => (
                    <TransactionRow key={tx.id} tx={tx} delay={i * 100} />
                  ))}
                </div>

                <div className="mt-4 pt-4 flex items-center justify-between" style={{borderTop: '1px solid rgba(26,37,64,0.8)'}}>
                  <span className="text-xs" style={{color: '#64748b', fontFamily: 'JetBrains Mono, monospace'}}>Arc Testnet · Block #4,829,104</span>
                  <span className="text-xs" style={{color: '#00e5ff', fontFamily: 'JetBrains Mono, monospace'}}>~0.8s finality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TransactionRow({ tx, delay }: { tx: typeof TRANSACTIONS[0], delay: number }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-opacity-80 group cursor-pointer"
         style={{background: 'rgba(26,37,64,0.3)', animationDelay: `${delay}ms`}}>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-base">{tx.flag_from}</span>
          <ArrowRight size={10} style={{color: '#64748b'}} />
          <span className="text-base">{tx.flag_to}</span>
        </div>
        <div>
          <div className="text-xs font-mono" style={{color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace'}}>{tx.id}</div>
          <div className="text-xs" style={{color: '#475569'}}>{tx.from} → {tx.to}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold" style={{fontFamily: 'Syne, sans-serif', color: '#e2e8f0'}}>${tx.amount}</div>
        <div className="text-xs" style={{color: '#00ff94'}}>{tx.time}</div>
      </div>
    </div>
  )
}

function StatsGrid() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="rounded-2xl p-6 gradient-border hover:glow-cyan transition-all duration-300 group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg" style={{background: 'rgba(0,229,255,0.08)'}}>
                    <Icon size={18} style={{color: '#00e5ff'}} />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-mono" 
                        style={{
                          background: stat.up ? 'rgba(0,255,148,0.1)' : 'rgba(255,107,53,0.1)',
                          color: stat.up ? '#00ff94' : '#ff6b35',
                          fontFamily: 'JetBrains Mono, monospace'
                        }}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-black mb-1" style={{fontFamily: 'Syne, sans-serif', color: '#e2e8f0', letterSpacing: '-0.03em'}}>
                  {stat.value}
                </div>
                <div className="text-xs" style={{color: '#64748b'}}>{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SendWidget() {
  const [amount, setAmount] = useState('10000')
  const [fromCurrency, setFromCurrency] = useState('USDC')
  const [toCurrency, setToCurrency] = useState('USDC')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 2000)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{background: '#00e5ff'}}></div>
              <span className="text-xs font-mono uppercase tracking-widest" style={{color: '#00e5ff', fontFamily: 'JetBrains Mono, monospace'}}>Send Payment</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4 leading-none" style={{fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em'}}>
              <span className="text-white">Move money at</span><br/>
              <span style={{background: 'linear-gradient(135deg, #00e5ff, #00ff94)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>internet speed.</span>
            </h2>
            <p className="text-base mb-8" style={{color: '#64748b', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.7'}}>
              No SWIFT delays. No correspondent banks. No surprise fees. 
              Just instant, programmable money movement powered by USDC on Arc.
            </p>
            <div className="space-y-3">
              {[
                { icon: Zap, text: 'Sub-second finality guaranteed' },
                { icon: Shield, text: 'Compliant infrastructure, opt-in privacy' },
                { icon: Globe, text: '148+ payment corridors worldwide' },
                { icon: Lock, text: 'Circle-backed, enterprise-grade security' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{background: 'rgba(0,229,255,0.1)'}}>
                    <Icon size={10} style={{color: '#00e5ff'}} />
                  </div>
                  <span className="text-sm" style={{color: '#94a3b8'}}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Send form */}
          <div className="rounded-2xl p-6 gradient-border" style={{background: '#0d1829'}}>
            <h3 className="font-bold mb-6" style={{fontFamily: 'Syne, sans-serif', color: '#e2e8f0'}}>New Transfer</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs mb-2 block" style={{color: '#64748b', fontFamily: 'JetBrains Mono, monospace'}}>AMOUNT</label>
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{background: '#080f1e', border: '1px solid rgba(26,37,64,0.8)'}}>
                  <input 
                    type="text" 
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="flex-1 bg-transparent text-2xl font-black outline-none"
                    style={{fontFamily: 'Syne, sans-serif', color: '#e2e8f0', letterSpacing: '-0.02em'}}
                  />
                  <span className="text-sm px-2 py-1 rounded-lg" style={{background: 'rgba(0,229,255,0.1)', color: '#00e5ff', fontFamily: 'JetBrains Mono, monospace'}}>USDC</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs mb-2 block" style={{color: '#64748b', fontFamily: 'JetBrains Mono, monospace'}}>FROM</label>
                  <select className="w-full p-3 rounded-xl outline-none text-sm" 
                          style={{background: '#080f1e', border: '1px solid rgba(26,37,64,0.8)', color: '#e2e8f0', fontFamily: 'DM Sans, sans-serif'}}>
                    <option>🇺🇸 United States</option>
                    <option>🇸🇬 Singapore</option>
                    <option>🇬🇧 United Kingdom</option>
                    <option>🇩🇪 Germany</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs mb-2 block" style={{color: '#64748b', fontFamily: 'JetBrains Mono, monospace'}}>TO</label>
                  <select className="w-full p-3 rounded-xl outline-none text-sm"
                          style={{background: '#080f1e', border: '1px solid rgba(26,37,64,0.8)', color: '#e2e8f0', fontFamily: 'DM Sans, sans-serif'}}>
                    <option>🇦🇪 Dubai, UAE</option>
                    <option>🇯🇵 Japan</option>
                    <option>🇧🇷 Brazil</option>
                    <option>🇮🇳 India</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs mb-2 block" style={{color: '#64748b', fontFamily: 'JetBrains Mono, monospace'}}>RECIPIENT ADDRESS</label>
                <input 
                  type="text" 
                  placeholder="0x..."
                  className="w-full p-3 rounded-xl outline-none text-sm font-mono"
                  style={{background: '#080f1e', border: '1px solid rgba(26,37,64,0.8)', color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace'}}
                />
              </div>

              {/* Fee breakdown */}
              <div className="p-3 rounded-xl" style={{background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.08)'}}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{color: '#64748b'}}>Network fee</span>
                  <span style={{color: '#00ff94', fontFamily: 'JetBrains Mono, monospace'}}>$0.001 USDC</span>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{color: '#64748b'}}>Settlement time</span>
                  <span style={{color: '#00e5ff', fontFamily: 'JetBrains Mono, monospace'}}>~0.8s</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{color: '#64748b'}}>Protocol fee</span>
                  <span style={{color: '#00ff94', fontFamily: 'JetBrains Mono, monospace'}}>$0.00</span>
                </div>
              </div>

              <button 
                onClick={handleSend}
                disabled={sending || sent}
                className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{
                  background: sent ? 'linear-gradient(135deg, #00ff94, #00e5ff)' : 
                              sending ? 'rgba(0,229,255,0.3)' : 'linear-gradient(135deg, #00e5ff, #00b4d8)',
                  color: '#040812',
                  fontFamily: 'Syne, sans-serif',
                  cursor: sending ? 'not-allowed' : 'pointer'
                }}>
                {sent ? (
                  <><CheckCircle size={16} /> Payment Confirmed!</>
                ) : sending ? (
                  <><RefreshCw size={16} className="animate-spin" /> Processing on Arc...</>
                ) : (
                  <><Send size={16} /> Send ${Number(amount.replace(',', '')).toLocaleString()} USDC</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AnalyticsSection() {
  const maxVol = Math.max(...CHART_DATA.map(d => d.vol))

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Volume chart */}
          <div className="lg:col-span-2 rounded-2xl p-6 gradient-border" style={{background: '#0d1829'}}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-white" style={{fontFamily: 'Syne, sans-serif'}}>Settlement Volume</h3>
                <p className="text-xs mt-1" style={{color: '#64748b'}}>24h · USDC</p>
              </div>
              <div className="flex items-center gap-1 text-xs" style={{color: '#00ff94', fontFamily: 'JetBrains Mono, monospace'}}>
                <TrendingUp size={12} />
                <span>+18.4% from yesterday</span>
              </div>
            </div>
            
            <div className="flex items-end gap-1.5 h-32">
              {CHART_DATA.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full rounded-t-sm transition-all duration-500 hover:opacity-100 opacity-60 cursor-pointer"
                    style={{
                      height: `${(d.vol / maxVol) * 100}%`,
                      background: i === 12 ? 'linear-gradient(180deg, #00e5ff, #00b4d8)' : 
                                 d.vol > 70 ? 'linear-gradient(180deg, #00e5ff80, #00b4d840)' : 
                                 'rgba(0,229,255,0.2)',
                      minHeight: '4px',
                      animationDelay: `${i * 50}ms`
                    }}
                  ></div>
                  <span className="text-xs" style={{color: '#475569', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px'}}>{d.h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Corridors */}
          <div className="rounded-2xl p-6 gradient-border" style={{background: '#0d1829'}}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white" style={{fontFamily: 'Syne, sans-serif'}}>Top Corridors</h3>
              <Layers size={14} style={{color: '#64748b'}} />
            </div>
            <div className="space-y-4">
              {CORRIDORS.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{color: '#94a3b8'}}>{c.route}</span>
                    <div className="flex items-center gap-2">
                      <span style={{color: '#64748b', fontFamily: 'JetBrains Mono, monospace'}}>{c.volume}</span>
                      <span style={{color: '#00ff94', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px'}}>{c.trend}</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full" style={{background: 'rgba(26,37,64,0.8)'}}>
                    <div className="h-full rounded-full transition-all duration-1000" 
                         style={{width: `${c.share}%`, background: i === 0 ? 'linear-gradient(90deg, #00e5ff, #00b4d8)' : `rgba(0,229,255,${0.3 + (i * 0.15)})`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Deterministic Finality',
      desc: 'Built on Malachite BFT — every transaction settles in under 1 second with cryptographic certainty. No probabilistic confirmation waiting.',
      tag: 'Core Protocol',
      color: '#00e5ff'
    },
    {
      icon: DollarSign,
      title: 'Stable Fee Design',
      desc: 'Pay gas in USDC at fixed, predictable rates. No ETH volatility, no gas wars. Enterprise treasury teams can budget precisely.',
      tag: 'Treasury',
      color: '#00ff94'
    },
    {
      icon: Shield,
      title: 'Opt-in Privacy',
      desc: 'Configure transaction visibility per use case. Public by default for transparency, private when compliance or confidentiality demands it.',
      tag: 'Compliance',
      color: '#7c3aed'
    },
    {
      icon: Globe,
      title: 'Circle CCTP Native',
      desc: 'Cross-chain USDC transfers via Circle\'s Cross-Chain Transfer Protocol. Move liquidity across ecosystems without bridging risk.',
      tag: 'Multichain',
      color: '#ff6b35'
    },
    {
      icon: Layers,
      title: 'EVM Compatible',
      desc: 'Deploy existing Solidity contracts without modification. Full Hardhat, Foundry, ethers.js and viem support out of the box.',
      tag: 'Developer',
      color: '#00e5ff'
    },
    {
      icon: Activity,
      title: 'Agentic Commerce',
      desc: 'Built for AI agents and autonomous systems. Machine-to-machine payment rails for the era of programmable economic coordination.',
      tag: 'Future',
      color: '#00ff94'
    },
  ]

  return (
    <section className="py-20" style={{background: 'linear-gradient(180deg, transparent, rgba(0,229,255,0.02), transparent)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px" style={{background: '#00e5ff'}}></div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{color: '#00e5ff', fontFamily: 'JetBrains Mono, monospace'}}>Why Arc</span>
            <div className="w-8 h-px" style={{background: '#00e5ff'}}></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black leading-none" style={{fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em'}}>
            <span className="text-white">Infrastructure built</span><br/>
            <span style={{background: 'linear-gradient(135deg, #00e5ff, #00ff94)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>for real money.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={i} className="p-6 rounded-2xl group hover:glow-cyan transition-all duration-300 cursor-pointer gradient-border"
                   style={{background: '#0d1829'}}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl" style={{background: `${f.color}15`}}>
                    <Icon size={20} style={{color: f.color}} />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full" 
                        style={{background: `${f.color}10`, color: f.color, fontFamily: 'JetBrains Mono, monospace'}}>
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-2" style={{fontFamily: 'Syne, sans-serif'}}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{color: '#64748b'}}>{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs group-hover:gap-2 transition-all duration-200" style={{color: f.color}}>
                  <span>Learn more</span>
                  <ChevronRight size={12} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="rounded-3xl p-12 relative overflow-hidden" 
             style={{background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(0,255,148,0.04), rgba(0,229,255,0.08))', border: '1px solid rgba(0,229,255,0.15)'}}>
          <div className="absolute inset-0 opacity-30" style={{background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.1) 0%, transparent 70%)'}}></div>
          <div className="relative">
            <div className="text-5xl font-black mb-4" style={{fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em'}}>
              <span className="text-white">Start building</span><br/>
              <span style={{background: 'linear-gradient(135deg, #00e5ff, #00ff94)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>on Arc today.</span>
            </div>
            <p className="text-base mb-8 max-w-md mx-auto" style={{color: '#64748b', fontFamily: 'DM Sans, sans-serif'}}>
              Deploy on Arc testnet in minutes. Get testnet USDC from Circle's faucet and start sending payments.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://docs.arc.network/arc/tutorials/deploy-on-arc" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                 style={{background: 'linear-gradient(135deg, #00e5ff, #00b4d8)', color: '#040812', fontFamily: 'Syne, sans-serif'}}>
                <ArrowUpRight size={16} />
                Deploy on Arc
              </a>
              <a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200"
                 style={{color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Syne, sans-serif'}}>
                Get Testnet USDC
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 border-t" style={{borderColor: 'rgba(26,37,64,0.8)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #00e5ff, #00b4d8)'}}>
              <span className="text-black font-bold text-xs" style={{fontFamily: 'Syne, sans-serif'}}>A</span>
            </div>
            <span className="font-bold" style={{fontFamily: 'Syne, sans-serif', color: '#e2e8f0'}}>
              Arc<span style={{color: '#00e5ff'}}>Flow</span>
            </span>
            <span className="text-xs px-2 py-1 rounded" style={{background: 'rgba(0,229,255,0.06)', color: '#64748b', fontFamily: 'JetBrains Mono, monospace'}}>
              Built on Arc Network
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs" style={{color: '#475569'}}>
            <a href="https://docs.arc.network" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Docs</a>
            <a href="https://discord.com/invite/buildonarc" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Discord</a>
            <a href="https://x.com/arc" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Twitter</a>
            <a href="https://testnet.arcscan.app" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Explorer</a>
          </div>
          <div className="text-xs" style={{color: '#334155', fontFamily: 'JetBrains Mono, monospace'}}>
            © 2025 ArcFlow · Open source
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Head>
        <title>ArcFlow — Cross-border Payments on Arc Network</title>
        <meta name="description" content="Send USDC globally with sub-second finality. Built on Arc Network — the Economic OS for the internet." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ArcFlow — Cross-border Payments on Arc" />
        <meta property="og:description" content="Sub-second stablecoin payments. Fixed $0.001 fees. 148+ corridors. Built on Arc Network." />
        <meta property="og:type" content="website" />
      </Head>
      
      <div style={{background: '#040812', minHeight: '100vh'}}>
        <NavBar />
        <HeroSection />
        <StatsGrid />
        <SendWidget />
        <AnalyticsSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </div>
    </>
  )
}
