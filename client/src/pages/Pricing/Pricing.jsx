import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import HomeHeader from "../../components/HomeHeader";
import Footer from "../../components/Footer";

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-zinc-900 overflow-x-hidden">
      {/* Header */}
      <HomeHeader />

      {/* Pricing Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-16 lg:py-24 flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-lime-100 text-lime-800 rounded-full">
            Simple Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Invest in your personal knowledge
          </h1>
          <p className="text-lg text-zinc-600">
            Choose the plan that fits your workflow. Upgrade, downgrade, or
            cancel anytime.
          </p>

          {/* Billing Toggle (Monthly / Annual) */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span
              className={`text-sm font-medium ${!isAnnual ? "text-zinc-900" : "text-zinc-500"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-zinc-900 rounded-full p-1 transition-colors duration-200 focus:outline-none cursor-pointer relative"
              aria-label="Toggle billing frequency"
            >
              <div
                className={`w-6 h-6 bg-lime-400 rounded-full transition-transform duration-200 ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium flex items-center gap-1.5 ${isAnnual ? "text-zinc-900" : "text-zinc-500"}`}
            >
              Annual{" "}
              <span className="text-xs bg-lime-100 text-lime-800 px-2 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl items-stretch">
          {/* Free Tier */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 flex flex-col justify-between hover:border-zinc-300 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Starter</h3>
                <p className="text-sm text-zinc-500 mt-1">
                  For casual note takers and individuals getting started.
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">
                  $0
                </span>
                <span className="text-sm text-zinc-500">/ forever</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-600 pt-4 border-t border-zinc-200">
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-600 shrink-0" /> Up to 500 notes
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-600 shrink-0" /> Basic text
                  search
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-600 shrink-0" /> Web access only
                </li>
                <li className="flex items-center gap-3 text-zinc-400 line-through">
                  AI-powered suggestions
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Link
                to="/signup"
                className="w-full block text-center py-3 px-4 font-semibold text-zinc-900 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Pro Tier (Highlighted) */}
          <div className="bg-zinc-900 text-white border-2 border-lime-400 rounded-3xl p-8 flex flex-col justify-between shadow-xl relative scale-105 lg:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-lime-400 text-zinc-950 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Most Popular
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Pro Workspace</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  For power users, creators, and deep thinkers.
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">
                  {isAnnual ? "$8" : "$10"}
                </span>
                <span className="text-sm text-zinc-400">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-300 pt-4 border-t border-zinc-800">
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-400 shrink-0" /> Unlimited notes
                  & spaces
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-400 shrink-0" /> Instant
                  lightning search (&lt;0.2s)
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-400 shrink-0" /> AI knowledge
                  assistant
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-400 shrink-0" /> Cross-device
                  sync (Mobile & Desktop)
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Link
                to="/signup"
                className="w-full block text-center py-3 px-4 font-semibold text-zinc-950 bg-lime-400 rounded-xl hover:bg-lime-300 transition-colors shadow-lg"
              >
                Start 14-Day Free Trial
              </Link>
            </div>
          </div>

          {/* Team Tier */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 flex flex-col justify-between hover:border-zinc-300 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">
                  Team / Enterprise
                </h3>
                <p className="text-sm text-zinc-500 mt-1">
                  For small teams and collaborative knowledge bases.
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">
                  {isAnnual ? "$18" : "$22"}
                </span>
                <span className="text-sm text-zinc-500">/ user / month</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-600 pt-4 border-t border-zinc-200">
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-600 shrink-0" /> Everything in
                  Pro
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-600 shrink-0" /> Shared team
                  workspaces
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-600 shrink-0" /> Admin controls
                  & security
                </li>
                <li className="flex items-center gap-3">
                  <FaCheck className="text-lime-600 shrink-0" /> Priority 24/7
                  support
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Link
                to="/signup"
                className="w-full block text-center py-3 px-4 font-semibold text-zinc-900 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Pricing;
