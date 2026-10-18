import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const LOCALES_DIR = path.join(ROOT, 'public', 'locales');
const CORE_DATA_PATH = path.join(ROOT, 'public', 'data', 'custody-core.json');
const LANGUAGES_CONFIG_PATH = path.join(ROOT, 'src', 'config', 'languages.ts');

// 扁平化对象 key
function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys = keys.concat(flattenKeys(v, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function runCheck() {
  console.log('🔍 Checking i18n translation integrity...\n');
  let hasErrors = false;

  if (!fs.existsSync(CORE_DATA_PATH)) {
    console.error(`❌ Core data file missing: ${CORE_DATA_PATH}`);
    process.exit(1);
  }
  const coreData = JSON.parse(fs.readFileSync(CORE_DATA_PATH, 'utf-8'));

  // 1. 以 src/config/languages.ts 为准获取语言列表，并与 locales 目录对照
  const languagesSource = fs.readFileSync(LANGUAGES_CONFIG_PATH, 'utf-8');
  const locales = [...languagesSource.matchAll(/code:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  if (locales.length === 0) {
    console.error(`❌ No language codes found in ${LANGUAGES_CONFIG_PATH}`);
    process.exit(1);
  }
  console.log(`Configured locales: ${locales.join(', ')}`);

  const localeDirs = fs.readdirSync(LOCALES_DIR).filter(item => {
    return fs.statSync(path.join(LOCALES_DIR, item)).isDirectory();
  });
  for (const locale of locales) {
    if (!localeDirs.includes(locale)) {
      console.error(`❌ [${locale}] Configured in languages.ts but public/locales/${locale}/ is missing!`);
      hasErrors = true;
    }
  }
  for (const dir of localeDirs) {
    if (!locales.includes(dir)) {
      console.warn(`⚠️ [${dir}] public/locales/${dir}/ exists but is not configured in languages.ts`);
    }
  }

  // 2. 基准 translation.json (en)
  const enTranslationPath = path.join(LOCALES_DIR, 'en', 'translation.json');
  if (!fs.existsSync(enTranslationPath)) {
    console.error('❌ Base translation file public/locales/en/translation.json missing!');
    process.exit(1);
  }
  const enTranslation = JSON.parse(fs.readFileSync(enTranslationPath, 'utf-8'));
  const enKeys = new Set(flattenKeys(enTranslation));

  // 检查每个语言的 translation.json
  for (const locale of locales) {
    if (locale === 'en') continue;
    const tPath = path.join(LOCALES_DIR, locale, 'translation.json');
    if (!fs.existsSync(tPath)) {
      console.error(`❌ [${locale}] Missing translation.json!`);
      hasErrors = true;
      continue;
    }
    const tData = JSON.parse(fs.readFileSync(tPath, 'utf-8'));
    const tKeys = new Set(flattenKeys(tData));

    const missingKeys = [...enKeys].filter(k => !tKeys.has(k));
    const extraKeys = [...tKeys].filter(k => !enKeys.has(k));

    if (missingKeys.length > 0) {
      console.error(`❌ [${locale}] Missing keys in translation.json (${missingKeys.length}):`);
      missingKeys.forEach(k => console.error(`    - ${k}`));
      hasErrors = true;
    }
    if (extraKeys.length > 0) {
      console.warn(`⚠️ [${locale}] Extra unused keys in translation.json (${extraKeys.length}):`);
      extraKeys.forEach(k => console.warn(`    - ${k}`));
    }
    if (missingKeys.length === 0) {
      console.log(`✅ [${locale}] translation.json matches English base.`);
    }
  }

  console.log('\n🔍 Checking transfer method keys...\n');

  const validTransferMethods = new Set(Object.keys(enTranslation.transferMethods || {}));
  let transferMethodErrors = 0;
  for (const [signerId, wallets] of Object.entries(coreData.transferMethods || {})) {
    for (const [walletId, methods] of Object.entries(wallets)) {
      for (const method of methods) {
        if (!validTransferMethods.has(method)) {
          console.error(`❌ Unknown transfer method "${method}" for ${signerId} -> ${walletId} (expected one of: ${[...validTransferMethods].join(', ')})`);
          hasErrors = true;
          transferMethodErrors++;
        }
      }
    }
  }
  if (transferMethodErrors === 0) {
    console.log('✅ All transfer methods in custody-core.json have translation keys.');
  }

  console.log('\n🔍 Checking custody data feature counts...\n');

  // 计算 core 中每个硬件/钱包/节点的 feature 数量
  const coreFeatureCounts = {};
  [...coreData.hardwareSigners, ...coreData.softwareWallets, ...coreData.nodes].forEach(item => {
    coreFeatureCounts[item.id] = (item.features || []).length;
  });

  // 检查每个语言的 custody.json
  for (const locale of locales) {
    const cPath = path.join(LOCALES_DIR, locale, 'custody.json');
    if (!fs.existsSync(cPath)) {
      console.error(`❌ [${locale}] Missing custody.json!`);
      hasErrors = true;
      continue;
    }
    const cData = JSON.parse(fs.readFileSync(cPath, 'utf-8'));
    const localeFeatures = cData.features || {};

    let localeFeatureErrors = 0;
    for (const [id, count] of Object.entries(coreFeatureCounts)) {
      const texts = localeFeatures[id];
      if (!texts) {
        console.error(`❌ [${locale}] Missing features for device id "${id}" in custody.json`);
        hasErrors = true;
        localeFeatureErrors++;
      } else if (texts.length !== count) {
        console.error(`❌ [${locale}] Feature count mismatch for "${id}": expected ${count}, got ${texts.length}`);
        hasErrors = true;
        localeFeatureErrors++;
      }
    }
    if (localeFeatureErrors === 0) {
      console.log(`✅ [${locale}] custody.json features match core specification.`);
    }
  }

  // 检查 FAQ
  console.log('\n🔍 Checking FAQ markdown files...\n');
  for (const locale of locales) {
    const faqPath = path.join(LOCALES_DIR, locale, 'faq.md');
    if (!fs.existsSync(faqPath)) {
      console.error(`❌ [${locale}] Missing faq.md!`);
      hasErrors = true;
    } else {
      console.log(`✅ [${locale}] faq.md exists.`);
    }
  }

  if (hasErrors) {
    console.error('\n❌ i18n check failed with errors.');
    process.exit(1);
  } else {
    console.log('\n🎉 All i18n checks passed cleanly!');
  }
}

runCheck();
