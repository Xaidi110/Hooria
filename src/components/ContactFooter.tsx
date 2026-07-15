import { useState } from 'react';
import { Calendar, Clock, CheckCircle, Linkedin, Mail, MapPin, ArrowUpRight, Send } from 'lucide-react';

const AVAILABLE_HOURS = ['10:00 AM CEST', '11:30 AM CEST', '2:00 PM CEST', '3:30 PM CEST', '5:00 PM CEST'];
const DAYS = [
  { dayName: 'Mon', date: 'Jul 6' },
  { dayName: 'Tue', date: 'Jul 7' },
  { dayName: 'Wed', date: 'Jul 8' },
  { dayName: 'Thu', date: 'Jul 9' },
  { dayName: 'Fri', date: 'Jul 10' }
];

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceNeed: 'brand-positioning',
    message: ''
  });

  const [booking, setBooking] = useState({
    day: 'Jul 6',
    time: '2:00 PM CEST',
    name: '',
    email: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking.name || !booking.email) return;
    setBookingLoading(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      if (res.ok) {
        setBookingSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <footer id="contact-footer" className="bg-editorial-charcoal text-white py-20 px-4 md:px-8 relative border-t border-white/10">
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Side: Brand Statement & Booking Widget */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-editorial-orange font-sans text-[11px] font-bold text-white uppercase">
                  HK
                </div>
                <span className="font-display text-lg font-bold tracking-tight text-white leading-none">
                  hooria khan.
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug mb-5">
                Let’s make your growth <br />
                <span className="text-editorial-orange">completely un-copyable.</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/60 font-normal mb-8 max-w-sm leading-relaxed">
                Whether you need a brand positioning audit or a conversion sprint to plug digital leaks, I partner directly with you to scale your digital presence.
              </p>
            </div>

            {/* Sprints Scheduler Widget */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 w-full">
              <div className="flex items-center gap-2 mb-5 border-b border-white/10 pb-3">
                <Calendar className="h-4 w-4 text-editorial-orange" />
                <span className="font-sans text-xs font-bold tracking-wider uppercase text-white">
                  BOOK A 1:1 GROWTH DIAGNOSTIC CALL
                </span>
              </div>

              {!bookingSubmitted ? (
                <form onSubmit={handleBookSubmit} className="space-y-5 text-left">
                  
                  {/* Select Day Row */}
                  <div>
                    <span className="block font-sans text-[9px] font-bold tracking-wider text-white/40 uppercase mb-2">
                      1. Select Strategy Day:
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {DAYS.map((d) => (
                        <button
                          key={d.date}
                          type="button"
                          onClick={() => setBooking({ ...booking, day: d.date })}
                          className={`rounded-xl border px-1.5 py-2.5 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                            booking.day === d.date 
                              ? 'bg-editorial-orange border-editorial-orange text-white font-bold shadow-sm' 
                              : 'bg-transparent border-white/10 text-white/60 hover:border-white/35'
                          }`}
                        >
                          <span className="font-sans text-[8px] uppercase tracking-wider">{d.dayName}</span>
                          <span className="font-display text-xs mt-0.5">{d.date.split(' ')[1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Hour List */}
                  <div>
                    <span className="block font-sans text-[9px] font-bold tracking-wider text-white/40 uppercase mb-2">
                      2. Select Available Slot (CEST):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {AVAILABLE_HOURS.map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setBooking({ ...booking, time: h })}
                          className={`rounded-xl border px-3 py-2 font-sans text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                            booking.time === h 
                              ? 'bg-editorial-orange border-editorial-orange text-white' 
                              : 'bg-transparent border-white/10 text-white/60 hover:border-white/35'
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Booking Contact Info */}
                  <div>
                    <span className="block font-sans text-[9px] font-bold tracking-wider text-white/40 uppercase mb-2">
                      3. Your Contact Details:
                    </span>
                    <div className="space-y-2.5">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={booking.name}
                        onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 font-sans text-xs font-medium text-white focus:outline-none focus:border-editorial-orange transition-colors"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email Address"
                        value={booking.email}
                        onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 font-sans text-xs font-medium text-white focus:outline-none focus:border-editorial-orange transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full text-center rounded-full bg-editorial-orange py-3 font-sans text-xs font-bold uppercase tracking-wider text-white cursor-pointer hover:bg-white hover:text-editorial-charcoal transition-colors duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {bookingLoading ? 'Securing Slot...' : 'Confirm Diagnostic Slot'}
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center animate-fade-in">
                  <CheckCircle className="h-10 w-10 text-editorial-orange mx-auto mb-3" />
                  <span className="font-display text-sm font-bold text-white block">Strategy Session Booked!</span>
                  <p className="font-sans text-xs text-white/60 mt-1 max-w-xs mx-auto">
                    Confirmed for **{booking.day}** at **{booking.time}**. A calendar invitation has been sent to your email.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Inquiry Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 text-left">
            <div className="mb-6 border-b border-white/10 pb-4">
              <span className="font-sans text-[10px] font-bold tracking-widest text-editorial-orange uppercase">
                // START YOUR SPRINT
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight mt-1">
                Pitch Your Digital Bottleneck.
              </h4>
            </div>

            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[9px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g., Frank Schulte"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-sans text-xs font-medium text-white focus:outline-none focus:border-editorial-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[9px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g., frank@scaleup.de"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-sans text-xs font-medium text-white focus:outline-none focus:border-editorial-orange transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[9px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                      Company / Domain
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g., scaleup.de"
                      value={formData.company}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-sans text-xs font-medium text-white focus:outline-none focus:border-editorial-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[9px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                      Strategic Need
                    </label>
                    <select
                      name="serviceNeed"
                      value={formData.serviceNeed}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-white/10 bg-[#1e1e1e] px-4 py-3 font-sans text-xs font-medium text-white focus:outline-none focus:border-editorial-orange transition-colors cursor-pointer"
                    >
                      <option value="brand-positioning">Brand positioning pivot</option>
                      <option value="digital-growth-engine">Digital Funnel Growth Engine</option>
                      <option value="fractional-cmo-workshops">Fractional CMO Sprint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[9px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                    Describe your product and single biggest marketing friction *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="e.g., We are an HR software scale-up in Munich. We have strong organic traffic, but enterprise leads fall off on our pricing page..."
                    value={formData.message}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-sans text-xs font-medium text-white focus:outline-none focus:border-editorial-orange transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-editorial-orange hover:bg-white text-white hover:text-editorial-charcoal px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{formLoading ? 'Sending Request...' : 'Submit Strategic Request'}</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            ) : (
              <div className="py-12 text-center animate-fade-in">
                <CheckCircle className="h-12 w-12 text-editorial-orange mx-auto mb-4" />
                <span className="font-display text-xl font-bold text-white block">Inquiry Submitted!</span>
                <p className="font-sans text-sm text-white/60 mt-2 max-w-md mx-auto">
                  Vielen Dank, {formData.name}. Hooria will analyze your business profile and respond in 24 hours with custom strategic recommendations.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Bottom copyright details and links */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <span className="font-sans text-[10px] text-white/40 uppercase tracking-wider">
              © 2026 Hooria Khan. Frankfurt • Munich, Germany.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="mailto:khan.hooria1@gmail.com" 
              className="flex items-center gap-1.5 font-sans text-[10px] text-white/60 hover:text-editorial-orange uppercase tracking-wider"
            >
              <Mail className="h-3.5 w-3.5 text-editorial-orange" />
              <span>Contact Strategy Hub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/hooriakhan/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 font-sans text-[10px] text-white/60 hover:text-editorial-orange uppercase tracking-wider"
            >
              <Linkedin className="h-3.5 w-3.5 text-editorial-orange" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
