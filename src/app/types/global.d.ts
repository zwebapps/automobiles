// export {};

// declare global {
//   interface Window {
//     openPrivacyCenter?: () => void;
//     __GEO_COUNTRY: string | undefined;
//     dataLayer: IArguments[];
//     gtag: (command: string, type: string, config) => void;
//   }
// }

declare global {
  interface Window {
    __GEO_COUNTRY: string | undefined;
    openPrivacyCenter?: () => void;
    // Google Tag Manager / Consent Mode types
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: (string | number | Date | Record<string, unknown>)[]) => void;
  }
}

