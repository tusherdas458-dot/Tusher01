import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Loader2, Upload, X as CloseIcon } from 'lucide-react';
import { initAuth, googleSignIn, getAccessToken } from '../lib/firebase';
import { sendConfirmationEmail } from '../lib/email';

const PLANS = [
  {
    id: "basic",
    name: "Basic Plan",
    monthly: 500,
    quarterly: 1400,
    annual: 5000,
    features: ["Gym Access", "No Air conditioner", "Personal Trainer for 1 week"]
  },
  {
    id: "pro",
    name: "Pro Plan",
    isPopular: true,
    monthly: 700,
    quarterly: 1900,
    annual: 7000,
    features: ["Gym Access", "Air conditioner", "Personal Trainer for 1 week"]
  },
  {
    id: "elite",
    name: "Elite Plan",
    monthly: 2500,
    quarterly: 7000,
    annual: 25000,
    features: ["Gym Access", "Air conditioner", "Personal Trainer"]
  }
];

export default function Memberships() {
  const [billingCycle, setBillingCycle] = useState<'monthly'|'quarterly'|'annual'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'billing' | 'successCash'>('form');
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Student',
    mobile: '',
    photos: [] as File[],
    captchaInput: '',
    coach: 'Rajesh Sarma'
  });
  
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, sum: 0 });

  useEffect(() => {
    generateCaptcha();
  }, [selectedPlan]);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ a, b, sum: a + b });
    setFormData(prev => ({ ...prev, captchaInput: '' }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(e.target.files!)]
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    
    if (parseInt(formData.captchaInput) !== captcha.sum) {
      alert("Incorrect CAPTCHA answer. Please try again.");
      generateCaptcha();
      return;
    }

    setCheckoutStep('billing');
  };

  const baseAdmission = formData.category === 'Student' ? 1000 : 1500;
  let coachFee = 0;
  if (selectedPlan?.id === 'elite') {
    coachFee = formData.coach === 'Rajesh Sarma' ? (billingCycle === 'monthly' ? 3000 : billingCycle === 'quarterly' ? 9000 : 36000) : (billingCycle === 'monthly' ? 1000 : billingCycle === 'quarterly' ? 3000 : 12000);
  }
  const planFee = (selectedPlan?.id === 'elite') ? (billingCycle === 'monthly' ? 500 : billingCycle === 'quarterly' ? 1400 : 5000) : (selectedPlan ? selectedPlan[billingCycle] : 0);
  const totalAmount = baseAdmission + planFee + coachFee;
  
  const upiLink = `upi://pay?pa=rajusarma000-2@okaxis&pn=Scavenger%20Gym&am=${totalAmount}&cu=INR`;

  return (
    <section id="membership" className="py-24 bg-zinc-950 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-zinc-950 to-zinc-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Choose Your <span className="text-red-500">Weapon</span></h2>
          <p className="text-zinc-400 font-medium mb-12">Select a membership plan that aligns with your fitness goals. Cancel anytime.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden w-full">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-zinc-800">
                     <th className="py-3 px-6 text-zinc-300 font-bold uppercase tracking-wider text-sm">Category</th>
                     <th className="py-3 px-6 text-zinc-300 font-bold uppercase tracking-wider text-sm text-right">Admission Fee</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   <tr className="hover:bg-white/[0.02] transition-colors">
                     <td className="py-4 px-6 text-zinc-300 font-semibold whitespace-nowrap">Students</td>
                     <td className="py-4 px-6 text-red-400 font-bold text-right whitespace-nowrap">₹1000</td>
                   </tr>
                   <tr className="hover:bg-white/[0.02] transition-colors">
                     <td className="py-4 px-6 text-zinc-300 font-semibold whitespace-nowrap">Adults</td>
                     <td className="py-4 px-6 text-red-400 font-bold text-right whitespace-nowrap">₹1500</td>
                   </tr>
                 </tbody>
               </table>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden w-full">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-zinc-800">
                     <th className="py-3 px-6 text-zinc-300 font-bold uppercase tracking-wider text-sm">Coach</th>
                     <th className="py-3 px-6 text-zinc-300 font-bold uppercase tracking-wider text-sm text-right">Personal Trainer Fee</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   <tr className="hover:bg-white/[0.02] transition-colors">
                     <td className="py-4 px-6 text-zinc-300 font-semibold whitespace-nowrap">Rajesh Sarma</td>
                     <td className="py-4 px-6 text-red-400 font-bold text-right whitespace-nowrap">₹3000</td>
                   </tr>
                   <tr className="hover:bg-white/[0.02] transition-colors">
                     <td className="py-4 px-6 text-zinc-300 font-semibold whitespace-nowrap">Atanu Mallik</td>
                     <td className="py-4 px-6 text-red-400 font-bold text-right whitespace-nowrap">₹1000</td>
                   </tr>
                 </tbody>
               </table>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-8 rounded-3xl border flex flex-col ${plan.isPopular ? 'bg-[#141212] border-white/10 scale-105 shadow-2xl' : 'bg-zinc-900/50 border-white/10'}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{plan.name}</h3>
              {plan.id === 'elite' ? (
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">
                      ₹{
                        (billingCycle === 'monthly' ? 500 : billingCycle === 'quarterly' ? 1400 : 5000) 
                        + (formData.coach === 'Rajesh Sarma' ? (billingCycle === 'monthly' ? 3000 : billingCycle === 'quarterly' ? 9000 : 36000) : (billingCycle === 'monthly' ? 1000 : billingCycle === 'quarterly' ? 3000 : 12000))
                      }
                    </span>
                    <span className="text-zinc-500 font-medium text-sm">/ {billingCycle.replace('ly', '')}</span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Personal Trainer</label>
                    <select 
                      value={formData.coach}
                      onChange={e => setFormData({...formData, coach: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500 transition-colors appearance-none text-sm"
                    >
                      <option value="Rajesh Sarma">Rajesh Sarma</option>
                      <option value="Atanu Mallik">Atanu Mallik</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black">₹{plan[billingCycle]}</span>
                  <span className="text-zinc-500 font-medium text-sm">/ {billingCycle.replace('ly', '')}</span>
                </div>
              )}
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3 text-zinc-300 font-medium text-sm">
                    {feature === "No Air conditioner" ? (
                      <X className="w-5 h-5 text-red-500 shrink-0" />
                    ) : (
                      <Check className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => {
                  setSelectedPlan(plan);
                  setCheckoutStep('form');
                }}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all flex justify-center items-center gap-2
                  ${plan.isPopular ? 'bg-[#2a2828] hover:bg-[#3a3838] text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              >
                Buy Membership
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              >
                <CloseIcon className="w-6 h-6" />
              </button>

              {checkoutStep === 'form' ? (
                <>
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-2">Member Details</h3>
                  <p className="text-zinc-400 mb-8">Complete your registration for the <span className="text-white font-bold">{selectedPlan.name}</span>.</p>

                  <form onSubmit={handlePurchase} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">Category</label>
                        <select 
                          value={formData.category}
                          onChange={e => setFormData({...formData, category: e.target.value})}
                          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
                        >
                          <option>Student</option>
                          <option>Adult</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">Mobile</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.mobile}
                          onChange={e => setFormData({...formData, mobile: e.target.value})}
                          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                        />
                      </div>
                    </div>

                    {selectedPlan?.id === 'elite' && (
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">Personal Trainer</label>
                        <select 
                          value={formData.coach}
                          onChange={e => setFormData({...formData, coach: e.target.value})}
                          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
                        >
                          <option value="Rajesh Sarma">Rajesh Sarma</option>
                          <option value="Atanu Mallik">Atanu Mallik</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">Photos</label>
                      <div className="relative border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-red-500/50 transition-colors">
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                        <p className="text-zinc-400 text-sm">Drop Passport size photos here or click to upload</p>
                      </div>
                      
                      {formData.photos.length > 0 && (
                        <div className="mt-4 flex gap-2 flex-wrap">
                          {formData.photos.map((photo, idx) => (
                            <div key={idx} className="relative group">
                              <img 
                                src={URL.createObjectURL(photo)} 
                                alt="upload preview" 
                                className="w-16 h-16 object-cover rounded-lg border border-white/10"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(idx)}
                                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <CloseIcon className="w-3 h-3 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-zinc-950 p-4 rounded-xl border border-white/10">
                      <label className="block text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">Security Check</label>
                      <p className="text-zinc-300 text-sm mb-3">Please solve this: {captcha.a} + {captcha.b}</p>
                      <input 
                        type="number" 
                        required
                        value={formData.captchaInput}
                        onChange={e => setFormData({...formData, captchaInput: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <button 
                        type="button"
                        onClick={async (e) => {
                          const form = e.currentTarget.closest('form');
                          if (form && form.checkValidity()) {
                            if (parseInt(formData.captchaInput) !== captcha.sum) {
                              alert("Incorrect CAPTCHA answer. Please try again.");
                              generateCaptcha();
                              return;
                            }
                            setLoadingPlan(selectedPlan.id);
                            try {
                              await fetch('/api/notify-admin', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  name: formData.name,
                                  mobile: formData.mobile,
                                  category: formData.category,
                                  plan: selectedPlan.name,
                                  amount: totalAmount
                                })
                              });
                            } catch (err) {
                              console.error(err);
                            }
                            setLoadingPlan(null);
                            setCheckoutStep('successCash');
                            setTimeout(() => {
                              setSelectedPlan(null);
                              setCheckoutStep('form');
                            }, 3000);
                          } else if (form) {
                            form.reportValidity();
                          }
                        }}
                        disabled={loadingPlan === selectedPlan.id}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors flex justify-center items-center gap-2"
                      >
                        {loadingPlan === selectedPlan.id ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application & Pay in Cash"}
                      </button>
                      
                      <button 
                        type="submit"
                        disabled={loadingPlan === selectedPlan.id}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors flex justify-center items-center gap-2"
                      >
                        {loadingPlan === selectedPlan.id ? <Loader2 className="w-5 h-5 animate-spin" /> : "Proceed to Payment"}
                      </button>
                    </div>
                  </form>
                </>
              ) : checkoutStep === 'billing' ? (
                <>
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-2 text-center">Billing Breakdown</h3>
                  
                  <div className="bg-zinc-950 rounded-xl p-6 mb-8 border border-white/5 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-zinc-400 font-medium">Admission Fee ({formData.category})</span>
                      <span className="font-bold text-white">₹{formData.category === 'Student' ? 1000 : 1500}</span>
                    </div>
                    {selectedPlan && (
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-zinc-400 font-medium">{selectedPlan.name} ({billingCycle})</span>
                        <span className="font-bold text-white">₹{planFee}</span>
                      </div>
                    )}
                    {selectedPlan?.id === 'elite' && (
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-zinc-400 font-medium">Trainer Fee ({formData.coach})</span>
                        <span className="font-bold text-white">₹{coachFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                       <span className="text-lg font-bold text-zinc-200">Total Amount</span>
                       <span className="text-3xl font-black text-red-500">₹{totalAmount}</span>
                    </div>
                  </div>

                  <div className="text-center mb-6 text-zinc-400 text-sm">
                    Click the button below to pay via your installed UPI app (Google Pay, Paytm, etc).
                  </div>

                  <a 
                    href={upiLink}
                    onClick={() => {
                        alert("Please complete the payment in your UPI app. Note: if you are on desktop, you will need to scan the QR manually.");
                        setSelectedPlan(null); // Close modal
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors flex justify-center items-center gap-2 mb-4"
                  >
                    Pay Using UPI
                  </a>
                  
                  <button onClick={() => setCheckoutStep('form')} className="w-full py-3 text-zinc-400 hover:text-white font-medium transition-colors">
                    Back to Details
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Success!</h3>
                  <p className="text-zinc-400 mb-2">Your application has been submitted successfully.</p>
                  <p className="text-zinc-300 font-medium">Please pay the cash amount at the reception.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
