'use client'

import { useState, useMemo } from 'react'
import CouponCard from '@/components/CouponCard'
import SearchBar from '@/components/SearchBar'
import couponsData from '@/data/coupons.json'

interface Coupon {
  id: number
  store: string
  code: string
  discount: string
  description: string
  expiry: string
  category: string
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const coupons: Coupon[] = couponsData

  const categories = useMemo(() => {
    return [...new Set(coupons.map((coupon) => coupon.category))]
  }, [coupons])

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const matchesSearch =
        searchQuery === '' ||
        coupon.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === '' || coupon.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [coupons, searchQuery, selectedCategory])

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <header className="text-center mb-12">
          <div className="inline-block animate-float mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-4xl shadow-2xl shadow-purple-500/40">
              🎟️
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white mb-4">
            Coupon Finder
          </h1>
          <p className="text-xl text-purple-200/80 max-w-2xl mx-auto">
            Discover amazing deals and save money on your favorite brands
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="text-2xl">🔥</span>
              <span className="font-semibold">{coupons.length} Active Deals</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2 text-amber-400">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold">Updated Daily</span>
            </div>
          </div>
        </header>

        {/* Search & Filters */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-purple-200/80 font-medium">
            Showing <span className="text-white font-bold">{filteredCoupons.length}</span> of{' '}
            <span className="text-white font-bold">{coupons.length}</span> coupons
          </div>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('')
              }}
              className="text-purple-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          )}
        </div>

        {/* Coupon Grid */}
        {filteredCoupons.length === 0 ? (
          <div className="text-center py-16 glass-effect rounded-2xl">
            <div className="text-6xl mb-4 animate-float">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No coupons found</h2>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('')
              }}
              className="shimmer-btn px-6 py-3 rounded-xl text-white font-semibold"
            >
              Show all coupons
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-purple-300/60 text-sm">
            Made with 💜 • Coupon Finder © 2026
          </p>
        </footer>
      </div>
    </main>
  )
}
