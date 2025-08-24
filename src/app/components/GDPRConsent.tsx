'use client';
import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";

interface ConsentCategories {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  ads: boolean;
}

interface ConsentRecord {
  version: string;
  ts: string;
  country: string | null;
  categories: ConsentCategories;
}

interface GDPRTexts {
  banner: {
    title: string;
    body: string;
    acceptAll: string;
    rejectAll: string;
    manage: string;
  };
}

interface GDPRContextType {
  record: ConsentRecord | null;
  setRecord: (rec: ConsentRecord) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  texts: GDPRTexts;
}

const GDPRContext = createContext<GDPRContextType | null>(null);

export function useGDPR() {
  const ctx = useContext(GDPRContext);
  if (!ctx) throw new Error("useGDPR must be used within GDPRProvider");
  return ctx;
}

export function GDPRProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [open, setOpen] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);

  // Check if consent has been given on component mount
  useEffect(() => {
    const hasConsent = localStorage.getItem('gdpr-consent');
    if (!hasConsent) {
      setShowConsentModal(true);
    }
  }, []);

  // expose a global function to open the privacy center
  useEffect(() => {
    window.openPrivacyCenter = () => setOpen(true);
  }, []);

  const texts: GDPRTexts = useMemo(() => ({
    banner: {
      title: "We value your privacy",
      body: "We use cookies to enhance your experience. Manage your preferences or accept all.",
      acceptAll: "Accept All",
      rejectAll: "Reject All",
      manage: "Manage Preferences",
    }
  }), []);

  const handleAcceptAll = () => {
    const consentRecord: ConsentRecord = {
      version: "1.0",
      ts: new Date().toISOString(),
      country: null,
      categories: {
        necessary: true,
        analytics: true,
        functional: true,
        ads: true,
      }
    };
    setRecord(consentRecord);
    localStorage.setItem('gdpr-consent', JSON.stringify(consentRecord));
    setShowConsentModal(false);
  };

  const handleRejectAll = () => {
    const consentRecord: ConsentRecord = {
      version: "1.0",
      ts: new Date().toISOString(),
      country: null,
      categories: {
        necessary: true,
        analytics: false,
        functional: false,
        ads: false,
      }
    };
    setRecord(consentRecord);
    localStorage.setItem('gdpr-consent', JSON.stringify(consentRecord));
    setShowConsentModal(false);
  };

  const handleManagePreferences = () => {
    setOpen(true);
    setShowConsentModal(false);
  };

  const value = useMemo(() => ({ record, setRecord, open, setOpen, texts }), [record, open, texts]);

  return (
    <GDPRContext.Provider value={value}>
      {children}
      
      {/* GDPR Consent Modal */}
      {showConsentModal && (
        <div 
          className="gdpr-modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
        >
          <div 
            className="gdpr-modal-content"
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              maxWidth: '32rem',
              width: '100%',
              padding: '1.5rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              position: 'relative',
              zIndex: 10000
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                {texts.banner.title}
              </h2>
              <p style={{ color: '#6B7280' }}>
                {texts.banner.body}
              </p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontWeight: '500', color: '#111827', fontSize: '0.875rem' }}>Necessary Cookies</h3>
                    <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Required for the website to function</p>
                  </div>
                  <input type="checkbox" checked disabled style={{ borderRadius: '0.25rem' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontWeight: '500', color: '#111827', fontSize: '0.875rem' }}>Analytics Cookies</h3>
                    <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Help us improve our website</p>
                  </div>
                  <input type="checkbox" style={{ borderRadius: '0.25rem' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontWeight: '500', color: '#111827', fontSize: '0.875rem' }}>Functional Cookies</h3>
                    <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Enable enhanced functionality</p>
                  </div>
                  <input type="checkbox" style={{ borderRadius: '0.25rem' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontWeight: '500', color: '#111827', fontSize: '0.875rem' }}>Advertising Cookies</h3>
                    <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Used for personalized ads</p>
                  </div>
                  <input type="checkbox" style={{ borderRadius: '0.25rem' }} />
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
              <button
                onClick={handleRejectAll}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#374151',
                  backgroundColor: '#F3F4F6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
              >
                {texts.banner.rejectAll}
              </button>
              <button
                onClick={handleManagePreferences}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: '#374151',
                  backgroundColor: '#F3F4F6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
              >
                {texts.banner.manage}
              </button>
              <button
                onClick={handleAcceptAll}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: '#2563EB',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
              >
                {texts.banner.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Center Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Privacy Preferences</h2>
            <p className="text-gray-600 mb-4">
              Manage your cookie preferences and privacy settings.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Necessary Cookies</h3>
                  <p className="text-sm text-gray-500">Required for the website to function</p>
                </div>
                <input type="checkbox" checked disabled className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Analytics Cookies</h3>
                  <p className="text-sm text-gray-500">Help us improve our website</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Functional Cookies</h3>
                  <p className="text-sm text-gray-500">Enable enhanced functionality</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Advertising Cookies</h3>
                  <p className="text-sm text-gray-500">Used for personalized ads</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAcceptAll();
                  setOpen(false);
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </GDPRContext.Provider>
  );
}
