import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Building2, Target, MessageSquare } from "lucide-react";

const features = [
  { icon: <Users className="w-8 h-8" />, title: "Candidate Pipeline", desc: "Upload CVs, assess competencies, and track readiness with AI." },
  { icon: <Building2 className="w-8 h-8" />, title: "Employer Role Intake", desc: "Define requirements, KPIs, and compensation to shape perfect roles." },
  { icon: <Target className="w-8 h-8" />, title: "Intelligent Matching", desc: "Smart scoring highlights strengths and gaps for fast decisions." },
  { icon: <MessageSquare className="w-8 h-8" />, title: "Community Groups", desc: "Collaborate with top executives and innovative companies." },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* top bar */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 flex items-center justify-between">
        <img
          src="/logo.png"
          alt="ApexMatch"
          className="h-14 w-14 rounded-xl ring-1 ring-slate-200 object-contain bg-white shadow-sm"
        />
        <button
          onClick={() => navigate("/profile")}
          className="text-xs sm:text-sm text-slate-600 hover:text-slate-800"
        >
          Log in / Sign Up
        </button>
      </div>

      {/* hero */}
      <section className="mx-auto w-full max-w-4xl px-4 text-center pt-16 pb-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
          The Future of Executive <br className="hidden sm:block" />
          <span className="inline-block">Search Is Here</span>
        </h1>
        <p className="mt-6 text-slate-600 text-base sm:text-lg">
          ApexMatch is an AI-powered platform that connects visionary companies with elite executive talent.
          Precision, speed, and strategy—all in one place.
        </p>
        <div className="mt-8">
          <button
            onClick={() => navigate("/candidates")}
            className="inline-flex items-center rounded-xl px-6 py-3 text-white shadow
                       bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>

      {/* feature grid */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">A Platform Built for Excellence</h2>
            <p className="mt-3 text-slate-600">Discover the tools that drive successful executive placements.</p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-start">
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-slate-100 p-4 text-blue-600">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
