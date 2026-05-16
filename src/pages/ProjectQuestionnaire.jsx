import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';
import translations, { FEATURE_VALUES } from '../translations';

const EN = translations.en.q.step2;

const TOTAL_STEPS = 4;

const initialFormData = {
  name: '', email: '', company: '', phone: '',
  projectType: '', message: '', features: [],
  budget: '', timeline: '',
  projectGoal: '', userActions: '', problemToSolve: '',
  targetUsers: '', keyActions: '', businessWorkflow: '',
  existingUrl: '', additionalNotes: '',
};

const inputClass =
  'w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-sky-400 transition-colors text-sm';

const selectClass =
  'w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-sky-400 transition-colors text-sm appearance-none cursor-pointer';

const textareaClass =
  'w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-sky-400 transition-colors text-sm resize-none';

const Field = ({ label, required, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
      {label}{required && <span className="text-sky-400 ml-0.5">*</span>}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

const SelectWrapper = ({ children }) => (
  <div className="relative">
    {children}
    <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-lg">
      expand_more
    </span>
  </div>
);

const StepIndicator = ({ current, steps }) => (
  <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-2">
    {steps.map((label, i) => {
      const stepNum = i + 1;
      const done = current > stepNum;
      const active = current === stepNum;
      return (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
              done ? 'bg-sky-400 border-sky-400 text-zinc-900'
              : active ? 'border-sky-400 text-sky-400'
              : 'border-zinc-600 text-zinc-500'
            }`}>
              {done ? <span className="material-symbols-rounded text-base">check</span> : stepNum}
            </div>
            <span className={`text-xs whitespace-nowrap hidden sm:block ${active ? 'text-sky-400' : done ? 'text-zinc-300' : 'text-zinc-500'}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-12 md:w-20 h-0.5 mx-1 mb-4 ${done ? 'bg-sky-400' : 'bg-zinc-700'}`} />
          )}
        </div>
      );
    })}
  </div>
);

const ProjectQuestionnaire = () => {
  const { t, toggle } = useLanguage();
  const q = t.q;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(false);

  const set = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleFeature = (value) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(value)
        ? prev.features.filter((f) => f !== value)
        : [...prev.features, value],
    }));
  };

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!formData.name.trim()) e.name = q.required;
      if (!formData.email.trim()) e.email = q.required;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email address.';
    }
    if (step === 2) {
      if (!formData.projectType) e.projectType = q.required;
      if (!formData.message.trim()) e.message = q.required;
    }
    if (step === 3) {
      if (!formData.projectGoal.trim()) e.projectGoal = q.required;
      if (!formData.userActions.trim()) e.userActions = q.required;
      if (!formData.problemToSolve.trim()) e.problemToSolve = q.required;
      if (!formData.targetUsers.trim()) e.targetUsers = q.required;
      if (!formData.keyActions.trim()) e.keyActions = q.required;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => s + 1); };
  const prev = () => { setErrors({}); setStep((s) => s - 1); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== TOTAL_STEPS) return;
    if (!validate()) return;
    setLoading(true);
    setSendError(false);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_QUESTIONNAIRE_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || '—',
          phone: formData.phone || '—',
          project_type: formData.projectType,
          budget: formData.budget || '—',
          timeline: formData.timeline || '—',
          features: formData.features.length > 0 ? formData.features.join(', ') : '—',
          message: formData.message,
          project_goal: formData.projectGoal,
          user_actions: formData.userActions,
          problem_to_solve: formData.problemToSolve,
          target_users: formData.targetUsers,
          key_actions: formData.keyActions,
          business_workflow: formData.businessWorkflow || '—',
          existing_url: formData.existingUrl || '—',
          additional_notes: formData.additionalNotes || '—',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
    } catch {
      setSendError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-sky-400/10 border-2 border-sky-400 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-rounded text-4xl text-sky-400">check_circle</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{q.success.title}</h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">{q.success.message}</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-300 text-zinc-900 font-semibold px-6 py-3 rounded-xl transition-colors">
            {q.success.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">

      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-zinc-400 hover:text-white text-sm transition-colors flex items-center gap-1">
            {q.backToPortfolio}
          </Link>
          <button
            onClick={toggle}
            className="text-xs font-bold text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-colors tracking-widest"
          >
            {t.langToggle}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">{q.title}</h1>
          <p className="text-zinc-400">{q.subtitle}</p>
        </div>

        <StepIndicator current={step} steps={q.steps} />

        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-zinc-800/40 border border-zinc-700 rounded-2xl p-6 md:p-10">

            {/* ── Step 1: Personal Info ── */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-zinc-100 mb-6">{q.step1.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label={q.step1.name} required error={errors.name}>
                    <input type="text" value={formData.name} onChange={set('name')} placeholder={q.step1.namePlaceholder} className={inputClass} />
                  </Field>
                  <Field label={q.step1.email} required error={errors.email}>
                    <input type="email" value={formData.email} onChange={set('email')} placeholder={q.step1.emailPlaceholder} className={inputClass} />
                  </Field>
                  <Field label={q.step1.company}>
                    <input type="text" value={formData.company} onChange={set('company')} placeholder={q.step1.companyPlaceholder} className={inputClass} />
                  </Field>
                  <Field label={q.step1.phone}>
                    <input type="tel" value={formData.phone} onChange={set('phone')} placeholder={q.step1.phonePlaceholder} className={inputClass} />
                  </Field>
                </div>
              </div>
            )}

            {/* ── Step 2: Project Details ── */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-zinc-100 mb-6">{q.step2.title}</h2>
                <Field label={q.step2.projectType} required error={errors.projectType}>
                  <SelectWrapper>
                    <select value={formData.projectType} onChange={set('projectType')} className={selectClass}>
                      <option value="">{q.step2.projectTypePlaceholder}</option>
                      {q.step2.projectTypes.map((label, i) => (
                        <option key={i} value={EN.projectTypes[i]}>{label}</option>
                      ))}
                    </select>
                  </SelectWrapper>
                </Field>
                <Field label={q.step2.description} required error={errors.message}>
                  <textarea value={formData.message} onChange={set('message')} placeholder={q.step2.descriptionPlaceholder} rows={4} className={textareaClass} />
                </Field>
                <div>
                  <p className="text-sm font-medium text-zinc-300 mb-3">{q.step2.features}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {q.step2.featureList.map((label, i) => {
                      const val = FEATURE_VALUES[i];
                      const checked = formData.features.includes(val);
                      return (
                        <label key={i} className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors text-sm ${checked ? 'border-sky-400 bg-sky-400/10 text-sky-300' : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-500'}`}>
                          <input type="checkbox" checked={checked} onChange={() => toggleFeature(val)} className="sr-only" />
                          <span className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center ${checked ? 'bg-sky-400 border-sky-400' : 'border-zinc-500'}`}>
                            {checked && <span className="material-symbols-rounded text-zinc-900 text-xs" style={{ fontSize: 12 }}>check</span>}
                          </span>
                          {label}
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label={q.step2.budget}>
                    <SelectWrapper>
                      <select value={formData.budget} onChange={set('budget')} className={selectClass}>
                        <option value="">{q.step2.budgetPlaceholder}</option>
                        {q.step2.budgetOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                      </select>
                    </SelectWrapper>
                  </Field>
                  <Field label={q.step2.timeline}>
                    <SelectWrapper>
                      <select value={formData.timeline} onChange={set('timeline')} className={selectClass}>
                        <option value="">{q.step2.timelinePlaceholder}</option>
                        {q.step2.timelineOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                      </select>
                    </SelectWrapper>
                  </Field>
                </div>
              </div>
            )}

            {/* ── Step 3: Goals & Context ── */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-zinc-100 mb-6">{q.step3.title}</h2>
                <Field label={q.step3.projectGoal} required error={errors.projectGoal}>
                  <textarea value={formData.projectGoal} onChange={set('projectGoal')} placeholder={q.step3.projectGoalPlaceholder} rows={3} className={textareaClass} />
                </Field>
                <Field label={q.step3.userActions} required error={errors.userActions}>
                  <textarea value={formData.userActions} onChange={set('userActions')} placeholder={q.step3.userActionsPlaceholder} rows={3} className={textareaClass} />
                </Field>
                <Field label={q.step3.problemToSolve} required error={errors.problemToSolve}>
                  <textarea value={formData.problemToSolve} onChange={set('problemToSolve')} placeholder={q.step3.problemToSolvePlaceholder} rows={3} className={textareaClass} />
                </Field>
                <Field label={q.step3.targetUsers} required error={errors.targetUsers}>
                  <textarea value={formData.targetUsers} onChange={set('targetUsers')} placeholder={q.step3.targetUsersPlaceholder} rows={2} className={textareaClass} />
                </Field>
                <Field label={q.step3.keyActions} required error={errors.keyActions}>
                  <textarea value={formData.keyActions} onChange={set('keyActions')} placeholder={q.step3.keyActionsPlaceholder} rows={3} className={textareaClass} />
                </Field>
                <Field label={q.step3.businessWorkflow}>
                  <textarea value={formData.businessWorkflow} onChange={set('businessWorkflow')} placeholder={q.step3.businessWorkflowPlaceholder} rows={3} className={textareaClass} />
                </Field>
              </div>
            )}

            {/* ── Step 4: Additional Info ── */}
            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-zinc-100 mb-6">{q.step4.title}</h2>
                <Field label={q.step4.existingUrl}>
                  <input type="url" value={formData.existingUrl} onChange={set('existingUrl')} placeholder={q.step4.existingUrlPlaceholder} className={inputClass} />
                </Field>
                <Field label={q.step4.additionalNotes}>
                  <textarea value={formData.additionalNotes} onChange={set('additionalNotes')} placeholder={q.step4.additionalNotesPlaceholder} rows={5} className={textareaClass} />
                </Field>

                {/* Summary preview */}
                <div className="mt-6 p-5 bg-zinc-900/50 border border-zinc-700 rounded-xl space-y-2 text-sm">
                  <p className="font-semibold text-zinc-300 mb-3">{step === 4 ? (t.langToggle === 'FR' ? 'Résumé' : 'Summary') : ''}</p>
                  {[
                    [q.step1.name, formData.name],
                    [q.step1.email, formData.email],
                    [q.step2.projectType, formData.projectType],
                    [q.step2.budget, formData.budget],
                    [q.step2.timeline, formData.timeline],
                    [q.step2.features, formData.features.join(', ') || '—'],
                  ].map(([label, value]) => (
                    value ? (
                      <div key={label} className="flex gap-2">
                        <span className="text-zinc-500 min-w-[120px]">{label}:</span>
                        <span className="text-zinc-200">{value}</span>
                      </div>
                    ) : null
                  ))}
                </div>

                {sendError && <p className="text-red-400 text-sm text-center">{q.error}</p>}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <button type="button" onClick={prev}
                className="inline-flex items-center gap-2 border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white px-6 py-3 rounded-xl text-sm transition-colors">
                <span className="material-symbols-rounded text-base">arrow_back</span>
                {q.prev}
              </button>
            ) : <div />}

            {step < TOTAL_STEPS ? (
              <button type="button" onClick={next}
                className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-300 text-zinc-900 font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                {q.next}
                <span className="material-symbols-rounded text-base">arrow_forward</span>
              </button>
            ) : (
              <button type="submit" disabled={loading}
                className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-300 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-900 font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin"></span>{q.sending}</>
                ) : (
                  <>{q.submit}<span className="material-symbols-rounded text-base">send</span></>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectQuestionnaire;
