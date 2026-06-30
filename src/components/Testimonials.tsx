import React, { useState } from 'react';
import { Star, MessageSquare, Quote, Sparkles, User, CheckCircle2 } from 'lucide-react';
import { Language, translations, REVIEWS, Review } from '../types';

interface TestimonialsProps {
  language: Language;
}

export default function Testimonials({ language }: TestimonialsProps) {
  const t = translations[language];
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  
  // Custom new review state
  const [showForm, setShowForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTag, setNewTag] = useState('General Medicine');
  const [newContentEn, setNewContentEn] = useState('');
  const [newContentHi, setNewContentHi] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Tags list for filtering
  const tags = ['All', 'Maternity', 'Pediatrics', 'Surgery', 'General Medicine', 'Orthopaedics'];

  const filteredReviews = selectedTag === 'All' 
    ? reviewsList 
    : reviewsList.filter(rev => rev.tag.toLowerCase() === selectedTag.toLowerCase());

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || (!newContentEn && !newContentHi)) {
      alert(language === 'en' ? 'Please fill in your name and comment.' : 'कृपया अपना नाम और समीक्षा टिप्पणी दर्ज करें।');
      return;
    }

    const newRev: Review = {
      id: `custom-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: language === 'en' ? 'Just now' : 'अभी-अभी',
      source: 'Saubhagya Feedback',
      content: {
        en: newContentEn || newContentHi,
        hi: newContentHi || newContentEn
      },
      tag: newTag
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewAuthor('');
    setNewContentEn('');
    setNewContentHi('');
    setNewRating(5);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <section id="reviews-section" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50/70 px-3 py-1 rounded-full border border-blue-100">
            {t.reviewsBadge}
          </span>
          <h2 className="mt-4 text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl font-serif">
            {t.reviewsTitle}
          </h2>
          <p className="mt-4 text-base text-slate-550 font-normal max-w-2xl mx-auto font-sans">
            {t.reviewsSubtitle}
          </p>
          <div className="mt-4 h-[1px] w-16 bg-blue-500 mx-auto" />
        </div>

        {/* Rating Overview and Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10 border-b border-slate-200 pb-8">
          
          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 bg-blue-50/40 border border-blue-100 p-4 rounded-2xl w-fit">
            <div className="bg-slate-900 text-white rounded-xl p-3 text-center border border-slate-800 min-w-[70px]">
              <span className="block text-3xl font-normal leading-none font-serif">4.8</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Rating</span>
            </div>
            <div>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                {language === 'en' ? "531+ verified reviews in Raipur, Chhattisgarh" : "रायपुर, छत्तीसगढ़ के 531+ मरीजों द्वारा सत्यापित"}
              </p>
            </div>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition cursor-pointer ${
                  selectedTag === tag 
                    ? 'bg-slate-900 text-white shadow-xs border border-slate-900' 
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tag === 'All' ? t.reviewFilterAll : tag}
              </button>
            ))}
          </div>

          {/* Write a review action */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 font-bold text-xs sm:text-sm hover:bg-blue-100 transition cursor-pointer active:scale-95 flex items-center gap-2 self-start lg:self-auto"
          >
            <MessageSquare className="h-4 w-4 text-blue-600" />
            <span>{t.reviewWriteBtn}</span>
          </button>
        </div>

        {/* Submit Review Dialog (Conditional Expansion) */}
        {showForm && (
          <div className="mb-12 p-6 sm:p-8 rounded-2xl border border-blue-100 bg-blue-50/15 max-w-2xl mx-auto transition-all duration-300">
            <h3 className="text-lg font-bold font-serif text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
              <span>{language === 'en' ? 'Share Your Experience' : 'अपना अनुभव साझा करें'}</span>
            </h3>

            {formSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>{language === 'en' ? 'Thank you! Your feedback has been posted in the feed below.' : 'धन्यवाद! आपकी समीक्षा नीचे फ़ीड में जोड़ दी गई है।'}</span>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{language === 'en' ? 'Your Name' : 'आपका नाम'}</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Ramesh Sahu"
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{language === 'en' ? 'Rating' : 'रेटिंग'}</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-600 focus:outline-hidden"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 / 5)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 / 5)</option>
                      <option value={3}>⭐⭐⭐ (3 / 5)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{language === 'en' ? 'Department Visited' : 'किस विभाग में आए थे'}</label>
                    <select
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-600 focus:outline-hidden"
                    >
                      <option value="Maternity">Maternity & Gynecology</option>
                      <option value="Pediatrics">Pediatrics & Neonatology</option>
                      <option value="Surgery">Laparoscopic Surgery</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Orthopaedics">Orthopaedics & Joint Care</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{language === 'en' ? 'Review Comment (English / Hindi)' : 'समीक्षा टिप्पणी (अंग्रेजी / हिंदी)'}</label>
                  <textarea
                    rows={3}
                    required
                    value={newContentEn}
                    onChange={(e) => setNewContentEn(e.target.value)}
                    placeholder={language === 'en' ? "Tell others about the doctor, treatment, or hospital staff..." : "डॉक्टर, उपचार या अस्पताल के कर्मचारियों के बारे में बताएं..."}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-blue-600 focus:outline-hidden"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-55 cursor-pointer"
                  >
                    {language === 'en' ? 'Cancel' : 'रद्द करें'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 cursor-pointer"
                  >
                    {language === 'en' ? 'Post Review' : 'समीक्षा पोस्ट करें'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400">
              <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>{language === 'en' ? 'No reviews found in this category.' : 'इस श्रेणी में कोई समीक्षा नहीं मिली।'}</p>
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Quote Icon & Rating row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold text-blue-700 uppercase tracking-wider border border-blue-100">
                      {rev.tag}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-3 -left-3 h-8 w-8 text-blue-100/40 -z-10" />
                    <p className="text-sm text-slate-600 leading-relaxed italic relative z-10 font-normal font-serif">
                      "{rev.content[language]}"
                    </p>
                  </div>
                </div>

                {/* Footer Author Details */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                      {rev.author[0]}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{rev.author}</h4>
                      <p className="text-[10px] text-slate-400">{rev.date}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{rev.source}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
