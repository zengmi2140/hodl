import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        meta: {
          title: string;
        };
        common: {
          loading: string;
          reset: string;
          faq: string;
          close: string;
          selected: string;
          delete: string;
        };
        header: {
          title: string;
          resetPref: string;
          viewFaq: string;
          selectLang: string;
        };
        guide: {
          step1_title: string;
          step1_desc: string;
          step2_title: string;
          step2_desc: string;
          device: {
            mobile: string;
            mobileDesc: string;
            desktop: string;
            desktopDesc: string;
          };
          signer: {
            yes: string;
            yesDesc: string;
            no: string;
            noDesc: string;
          };
        };
        mode: {
          single: string;
          multi: string;
          single_short: string;
          multi_short: string;
          selectMode: string;
          threshold_label: string;
          threshold_hint_2of3: string;
          threshold_hint_3of5: string;
          threshold: string;
        };
        multisig: {
          signer_slot: string;
          drag_drop: string;
          select_signer: string;
          select_signer_with_index: string;
          threshold_label: string;
        };
        columns: {
          signer: string;
          wallet: string;
          node: string;
        };
        features: {
          signer: string;
          wallet: string;
          node: string;
        };
        arrows: {
          pubkey_sig: string;
          unsigned_tx: string;
          address_signed: string;
          balance: string;
          select_hint_signer_wallet: string;
          select_hint_wallet_node: string;
          please_select_node: string;
          please_select_wallet: string;
          please_select_signer: string;
          no_signer_used: string;
          connected: string;
          incompatible: string;
        };
      };
    };
  }
}
