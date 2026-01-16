'use client'

import { useState } from 'react'

interface Coupon {
  id: number
  store: string
  code: string
  discount: string
  description: string
  expiry: string
  category: string
}

interface CouponCardProps {
  coupon: Coupon
}

const storeEmojis: Record<string, string> = {
  Amazon: '📦',
  Nike: '👟',
  'Uber Eats': '🍔',
  'Best Buy': '🖥️',
  Target: '🎯',
  Starbucks: '☕',
  Adidas: '⚽',
  DoorDash: '🚗',
  Apple: '🍎',
  'H&M': '👗',
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(coupon.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isExpiringSoon = () => {
    const expiryDate = new Date(coupon.expiry)
    const today = new Date()
    const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysLeft <= 7
  }

  const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
    Electronics: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    Fashion: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
    Food: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    General: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
  }

  const style = categoryStyles[coupon.category] || categoryStyles.General

  return (
    <div className="gradient-border card-hover">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
              {storeEmojis[coupon.store] || '🏷️'}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{coupon.store}</h3>
              <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border ${style.bg} ${style.text} ${style.border}`}>
                {coupon.category}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              {coupon.discount}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-5 text-sm leading-relaxed">{coupon.description}</p>

        {/* Code Section */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Coupon Code</p>
              <p className="font-mono font-bold text-lg text-gray-800 tracking-wider">{coupon.code}</p>
            </div>
            <button
              onClick={copyCode}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                copied
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'shimmer-btn text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Expiry */}
        <div className={`flex items-center gap-2 text-sm ${isExpiringSoon() ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {isExpiringSoon() && <span className="animate-pulse">⚠️</span>}
          <span>
            {isExpiringSoon() ? 'Expires soon: ' : 'Valid until '}
            {new Date(coupon.expiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  )
}
