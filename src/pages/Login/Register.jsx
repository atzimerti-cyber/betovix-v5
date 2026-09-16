import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getCountries, getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input';

import MainInput from '../../features/UI/Inputs/MainInput';
import MainButton from '../../features/UI/Buttons/MainButton';
import Checkbox from '../../features/UI/Checkbox/Checkbox';
import EyeIcon from '../../assets/svgs/eye.svg?react';
import AngleDownIcon from '../../assets/svgs/angle-down.svg?react';
import classes from './Login.module.css';
import {
  getRegistrationBonuses,
  getRegistrationPreferences,
  registerPlayer,
} from './loginAsyncActions';
import { translate } from '../../utils/translations';
import config from '../../config';

const normalizeDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
};

const isAdult = (value) => {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  const threshold = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
  return date <= threshold;
};

const createRequestKey = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const getOptionTitle = (option) =>
  option?.title || option?.name || option?.label || option?.campaignName || option?.campaignKey || translate('Bonus');

const getOptionDescription = (option) =>
  option?.description || option?.subtitle || option?.rewardDescription || option?.campaignDescription || '';

const isNoBonusOption = (option) =>
  option?.isNoBonus || String(option?.optionType || option?.type || '').toLowerCase() === 'nobonus';

const getCountryFlagUrl = (countryCode) =>
  countryCode && countryCode.length === 2
    ? `https://flagcdn.com/24x18/${String(countryCode).toLowerCase()}.png`
    : null;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const lang = useSelector((state) => state.app.lang);
  const siteSettings = useSelector((state) => state.app.siteSettings || {});
  const appSettings = useSelector((state) => state.app.settings || {});
  const defaultCountry = useSelector((state) => state.app.defaultCountry);
  const siteDefaultCountry = siteSettings.DefaultCountry || siteSettings.defaultCountry || defaultCountry || null;
  const registerPromoImg = useSelector((state) => state.app.registerPromoImg);
  const registerPromoImgMobile = useSelector((state) => state.app.registerPromoImgMobile);
  const loginLoading = useSelector((state) => state.login.loginLoading);

  const promoImage = isMobile
    ? registerPromoImgMobile || registerPromoImg || null
    : registerPromoImg || registerPromoImgMobile || null;

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [choiceSet, setChoiceSet] = useState(null);
  const [bonusLoading, setBonusLoading] = useState(true);
  const [selectedBonus, setSelectedBonus] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [phoneCountryMenuOpen, setPhoneCountryMenuOpen] = useState(false);
  const [nationalityMenuOpen, setNationalityMenuOpen] = useState(false);
  const [documentTypeMenuOpen, setDocumentTypeMenuOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [nationalitySearch, setNationalitySearch] = useState('');

  const [form, setForm] = useState({
    email: '',
    password: '',
    country: '',
    currency: '',
    phone: '',
    acceptTerms: false,
    marketing: true,
    firstName: '',
    lastName: '',
    birthDate: '',
    nationality: '',
    documentType: '',
    documentId: '',
  });

  const regionNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([lang?.id || 'en'], { type: 'region' });
    } catch {
      return new Intl.DisplayNames(['en'], { type: 'region' });
    }
  }, [lang?.id]);

  const countries = useMemo(
    () =>
      getCountries()
        .map((code) => ({
          code,
          name: regionNames.of(code) || code,
          dialCode: `+${getCountryCallingCode(code)}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [regionNames],
  );

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      dispatch(getRegistrationPreferences(controller.signal)),
      dispatch(getRegistrationBonuses(controller.signal)),
    ]).then(([prefs, bonuses]) => {
      if (controller.signal.aborted) return;

      setPreferences(prefs || null);
      setChoiceSet(bonuses || null);
      setBonusLoading(false);

      const defaultCurrency =
        prefs?.defaults?.currency ||
        prefs?.Defaults?.Currency ||
        siteSettings.Currency ||
        siteSettings.currency ||
        'EUR';

      setForm((current) => ({
        ...current,
        currency: current.currency || defaultCurrency,
      }));
    });

    return () => controller.abort();
  }, [dispatch]);

  useEffect(() => {
    if (!siteDefaultCountry || form.country) return;

    const normalizedDefaultCountry = String(siteDefaultCountry).trim().toLowerCase();
    const match = countries.find(
      (country) =>
        country.code.toLowerCase() === normalizedDefaultCountry ||
        country.name.toLowerCase() === normalizedDefaultCountry,
    );

    if (match) {
      setForm((current) => ({
        ...current,
        country: match.code,
      }));
    }
  }, [countries, siteDefaultCountry, form.country]);

  const bonusOptions = useMemo(() => {
    const shouldShow = choiceSet?.shouldShow ?? choiceSet?.ShouldShow ?? true;
    if (!shouldShow) return [];

    const options = choiceSet?.options || choiceSet?.Options || [];
    const allowNoBonus = Boolean(choiceSet?.allowNoBonus ?? choiceSet?.AllowNoBonus);
    const hasNoBonus = options.some(isNoBonusOption);

    if (allowNoBonus && !hasNoBonus) {
      return [
        ...options,
        {
          id: 'no-bonus',
          isNoBonus: true,
          title: translate("I don't want a bonus"),
        },
      ];
    }

    return options;
  }, [choiceSet, lang?.id]);

  useEffect(() => {
    if (selectedBonus || bonusOptions.length === 0) return;
    setSelectedBonus(bonusOptions[0]);
  }, [bonusOptions, selectedBonus]);

  const currencies = useMemo(() => {
    const list = preferences?.currencies || preferences?.Currencies || [];
    return list.map((item) =>
      typeof item === 'string'
        ? { value: item, label: item }
        : {
            value: item.code || item.value || item.id || item.currencyCode,
            label: item.name || item.label || item.code || item.value || item.currencyCode,
          },
    );
  }, [preferences]);

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    if (!query) return countries;
    return countries.filter((country) =>
      `${country.name} ${country.code} ${country.dialCode}`.toLowerCase().includes(query),
    );
  }, [countries, countrySearch]);

  const filteredNationalities = useMemo(() => {
    const query = nationalitySearch.trim().toLowerCase();
    if (!query) return countries;
    return countries.filter((country) =>
      `${country.name} ${country.code}`.toLowerCase().includes(query),
    );
  }, [countries, nationalitySearch]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const minPassword = Math.max(6, Number(appSettings.passwordMinLength || 6));
  const passwordValid = form.password.length >= minPassword;
  const selectedPhoneCountry = countries.find((country) => country.code === form.country) || null;
  const localPhoneDigits = String(form.phone || '').replace(/\D/g, '');
  const fullPhoneNumber = selectedPhoneCountry && localPhoneDigits
    ? `${selectedPhoneCountry.dialCode}${localPhoneDigits}`
    : '';
  const phoneValid = Boolean(fullPhoneNumber) && isValidPhoneNumber(fullPhoneNumber);
  const step1Valid =
    emailValid &&
    passwordValid &&
    Boolean(form.country) &&
    Boolean(form.currency) &&
    phoneValid &&
    form.acceptTerms &&
    !bonusLoading;

  const birthDateValid = isAdult(form.birthDate);
  const step2Valid =
    Boolean(form.firstName.trim()) &&
    Boolean(form.lastName.trim()) &&
    Boolean(form.birthDate) &&
    birthDateValid &&
    Boolean(form.nationality) &&
    Boolean(form.documentType) &&
    Boolean(form.documentId.trim());

  const changeTab = (tab) => {
    const params = new URLSearchParams(location.search);
    params.set('modal', 'auth');
    params.set('tab', tab);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const onRegister = async (event) => {
    event.preventDefault();
    if (!step1Valid || !step2Valid || loginLoading) return;

    const url = new URLSearchParams(location.search);
    const affiliateTrackingCode =
      url.get('code') ||
      url.get('affiliateTrackingCode') ||
      localStorage.getItem('AffiliateCode') ||
      null;

    const parentAccountId = Number(
      siteSettings.defaultShopId ??
        siteSettings.DefaultShopId ??
        siteSettings.RegistrationParentAccountId ??
        siteSettings.PlayerParentAccountId ??
        siteSettings.ParentAccountId ??
        siteSettings.RootAccountId ??
        0,
    );

    if (!parentAccountId && !affiliateTrackingCode) {
      setSubmitError(translate('Registration parent account is not configured for this site.'));
      return;
    }

    setSubmitError('');

    const requestKey = createRequestKey();
    const selectedIsNoBonus = isNoBonusOption(selectedBonus);
    const selectedId = Number(selectedBonus?.id || 0) || null;
    const selectedChoiceOptionId = Number(selectedBonus?.choiceOptionId || selectedBonus?.ChoiceOptionId || 0) || null;
    const choiceSetId = Number(choiceSet?.choiceSetId || choiceSet?.ChoiceSetId || 0);

    const payload = {
      siteId: Number(config.VITE_SITE_ID),
      parentAccountId,
      email: form.email.trim(),
      // Backend falls back to normalized email when Username is blank.
      username: form.email.trim(),
      password: form.password,
      phoneNumber: fullPhoneNumber || null,
      mobile: fullPhoneNumber || null,
      phoneVerified: false,
      status: 1,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      birthDate: normalizeDate(form.birthDate),
      country: form.country || null,
      nationality: form.nationality || null,
      documentIdType: form.documentType || null,
      documentType: form.documentType || null,
      documentId: form.documentId.trim() || null,
      queueOnboardingAutomation: true,
      enforcePasswordPolicy: true,
      clientRegistrationKey: requestKey,
      correlationId: requestKey,
      affiliateTrackingCode,
      affiliateReferralCode: url.get('referralCode') || url.get('affiliateReferralCode') || null,
      affiliateClickId: url.get('clickId') || url.get('affiliateClickId') || null,
      affiliateSubId1: url.get('subId1') || url.get('affiliateSubId1') || null,
      affiliateSubId2: url.get('subId2') || url.get('affiliateSubId2') || null,
      affiliateSubId3: url.get('subId3') || url.get('affiliateSubId3') || null,
      affiliateSubId4: url.get('subId4') || url.get('affiliateSubId4') || null,
      affiliateSubId5: url.get('subId5') || url.get('affiliateSubId5') || null,
      affiliateSource: url.get('source') || url.get('affiliateSource') || null,
      affiliateLandingPage: typeof window !== 'undefined' ? window.location.href : null,
      preferences: {
        language: preferences?.defaults?.language || preferences?.Defaults?.Language || lang?.id || 'en',
        currency: form.currency,
        theme: preferences?.defaults?.theme || preferences?.Defaults?.Theme || undefined,
        oddsFormat: preferences?.defaults?.oddsFormat || preferences?.Defaults?.OddsFormat || undefined,
      },
      bonusChoice:
        !selectedIsNoBonus && choiceSetId && (selectedId || selectedChoiceOptionId)
          ? {
              choiceSetId,
              id: selectedId,
              choiceOptionId: selectedChoiceOptionId,
            }
          : null,
    };

    await dispatch(registerPlayer(payload, navigate, location));
  };

  return (
    <div className={`${classes.RegisterContainer} ${!promoImage ? classes.NoPromo : ''}`}>
      {promoImage ? (
        <div className={classes.PromoContainer}>
          <div className={classes.ImageContainer} style={{ backgroundImage: `url(${promoImage})` }} />
          <div className={classes.PromoOverlay} />

          {bonusOptions.length > 0 ? (
            <div className={classes.RegistrationBonusPanel}>
              <div className={classes.RegistrationBonusHeader}>
                <strong>{translate('Choose your bonus')}</strong>
                <span>{translate('Select a welcome offer before you continue.')}</span>
              </div>

              <div className={classes.RegistrationBonusList}>
                {bonusOptions.map((option, index) => {
                  const key = option?.id ?? option?.choiceOptionId ?? `bonus-${index}`;
                  const active = option === selectedBonus || String(key) === String(selectedBonus?.id);
                  return (
                    <button
                      key={key}
                      type='button'
                      className={`${classes.RegistrationBonusOption} ${active ? classes.ActiveBonus : ''} ${isNoBonusOption(option) ? classes.NoBonusOption : ''}`}
                      onClick={() => setSelectedBonus(option)}
                    >
                      <span className={classes.RegistrationBonusNumber}>{isNoBonusOption(option) ? '×' : index + 1}</span>
                      <span>
                        <strong>{translate(getOptionTitle(option))}</strong>
                        {getOptionDescription(option) ? <small>{translate(getOptionDescription(option))}</small> : null}
                      </span>
                      <i aria-hidden='true' />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <form className={classes.Form} autoComplete='off' onSubmit={onRegister}>
        <div className={classes.StageProgress}>
          <span className={classes.StageProgressLineActive} />
          <small>{translate('Step')} {step}/2</small>
          <span className={step === 2 ? classes.StageProgressLineActive : classes.StageProgressLineInactive} />
        </div>

        {!promoImage && bonusOptions.length > 0 ? (
          <div className={classes.InlineBonusChooser}>
            <div className={classes.RegistrationBonusHeader}>
              <strong>{translate('Choose your bonus')}</strong>
              <span>{translate('Select a welcome offer before you continue.')}</span>
            </div>
            <div className={classes.RegistrationBonusList}>
              {bonusOptions.map((option, index) => {
                const key = option?.id ?? option?.choiceOptionId ?? `inline-bonus-${index}`;
                const active = option === selectedBonus || String(key) === String(selectedBonus?.id);
                return (
                  <button
                    key={key}
                    type='button'
                    className={`${classes.RegistrationBonusOption} ${active ? classes.ActiveBonus : ''} ${isNoBonusOption(option) ? classes.NoBonusOption : ''}`}
                    onClick={() => setSelectedBonus(option)}
                  >
                    <span className={classes.RegistrationBonusNumber}>{isNoBonusOption(option) ? '×' : index + 1}</span>
                    <span>
                      <strong>{translate(getOptionTitle(option))}</strong>
                      {getOptionDescription(option) ? <small>{translate(getOptionDescription(option))}</small> : null}
                    </span>
                    <i aria-hidden='true' />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className={classes.AuthIntro}>
          <div className={classes.Title}>{step === 1 ? translate('Create an account') : translate('Tell us about yourself')}</div>
          <p>
            {step === 1
              ? translate('Sign up and start playing in less than 60 seconds.')
              : translate('Complete the required details to finish your registration.')}
          </p>
        </div>

        {step === 1 ? (
          <div className={classes.AuthStep}>
            <div className={classes.InputOuter}>
              <MainInput
                type='email'
                value={form.email}
                placeholder={translate('Email')}
                onChange={(value) => update('email', value)}
                isInvalid={Boolean(form.email) && !emailValid}
              />
            </div>

            <div className={classes.InputOuter}>
              <MainInput
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                placeholder={translate('Password')}
                onChange={(value) => update('password', value.trim())}
                isInvalid={Boolean(form.password) && !passwordValid}
                rightIcon={<EyeIcon className={showPassword ? classes.ShowPasswordIcon : `${classes.ShowPasswordIcon} ${classes.ShowLine}`} onClick={() => setShowPassword((value) => !value)} />}
              />
            </div>

            <div className={classes.AuthTwoColumns}>
              <div className={`${classes.NativeField} ${classes.CustomSelectField}`}>
                <label>{translate('Country')}</label>
                <button
                  type='button'
                  className={classes.CustomSelectTrigger}
                  onClick={() => {
                    setCountryMenuOpen((open) => !open);
                    setPhoneCountryMenuOpen(false);
                  }}
                  aria-expanded={countryMenuOpen}
                >
                  <span>{selectedPhoneCountry?.name || translate('Country')}</span>
                  <AngleDownIcon className={classes.CustomSelectArrow} aria-hidden='true' />
                </button>
                {countryMenuOpen ? (
                  <div className={classes.CustomSelectMenu}>
                    <div className={classes.SelectSearchWrapper}>
                      <input
                        className={classes.SelectSearchInput}
                        type='search'
                        value={countrySearch}
                        placeholder={translate('Search country')}
                        autoFocus
                        onChange={(event) => setCountrySearch(event.target.value)}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </div>
                    {filteredCountries.map((country) => (
                      <button
                        key={country.code}
                        type='button'
                        className={`${classes.CustomSelectOption} ${form.country === country.code ? classes.CustomSelectOptionActive : ''}`}
                        onClick={() => {
                          setForm((current) => ({ ...current, country: country.code }));
                          setCountryMenuOpen(false);
                          setPhoneCountryMenuOpen(false);
                          setCountrySearch('');
                        }}
                      >
                        <img className={classes.CustomSelectFlag} src={getCountryFlagUrl(country.code)} alt='' aria-hidden='true' />
                        <span>{country.name}</span>
                      </button>
                    ))}
                    {filteredCountries.length === 0 ? (
                      <div className={classes.SelectNoResults}>{translate('No results')}</div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className={`${classes.NativeField} ${classes.ReadOnlyField}`}>
                <label>{translate('Currency')}</label>
                <div className={classes.ReadOnlyValue}>{form.currency || '—'}</div>
              </div>
            </div>

            <div className={`${classes.PhoneField} ${phoneTouched && !phoneValid ? classes.PhoneFieldInvalid : ''}`}>
              <div className={classes.PhoneDialSelector}>
                <button
                  type='button'
                  className={classes.PhoneDialTrigger}
                  aria-label={translate('Phone country code')}
                  aria-expanded={phoneCountryMenuOpen}
                  onClick={() => {
                    setPhoneCountryMenuOpen((open) => !open);
                    setCountryMenuOpen(false);
                  }}
                >
                  {getCountryFlagUrl(form.country) ? <img className={classes.PhoneFlag} src={getCountryFlagUrl(form.country)} alt='' aria-hidden='true' /> : null}
                  <span className={classes.PhoneDialCode}>{selectedPhoneCountry?.dialCode || '—'}</span>
                  <AngleDownIcon className={classes.PhoneDialArrow} aria-hidden='true' />
                </button>
                {phoneCountryMenuOpen ? (
                  <div className={`${classes.CustomSelectMenu} ${classes.PhoneCountryMenu}`}>
                    {countries.map((country) => (
                      <button
                        key={`phone-${country.code}`}
                        type='button'
                        className={`${classes.CustomSelectOption} ${form.country === country.code ? classes.CustomSelectOptionActive : ''}`}
                        onClick={() => {
                          setForm((current) => ({ ...current, country: country.code }));
                          setPhoneCountryMenuOpen(false);
                          setPhoneTouched(true);
                        }}
                      >
                        <img className={classes.CustomSelectFlag} src={getCountryFlagUrl(country.code)} alt='' aria-hidden='true' />
                        <span className={classes.PhoneCountryOptionText}>{country.name}</span>
                        <span className={classes.PhoneCountryOptionCode}>{country.dialCode}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <input
                className={classes.PhoneNumberInput}
                type='tel'
                inputMode='numeric'
                autoComplete='tel-national'
                value={form.phone}
                placeholder={translate('Number')}
                onBlur={() => setPhoneTouched(true)}
                onChange={(event) => {
                  const digits = event.target.value.replace(/\D/g, '').slice(0, 15);
                  update('phone', digits);
                }}
              />
            </div>

            <div className={classes.ConsentRow}>
              <Checkbox checked={form.acceptTerms} onChange={() => update('acceptTerms', !form.acceptTerms)} />
              <span>{translate('I am 18 years old and I accept the Terms and Conditions and Privacy Policy.')}</span>
            </div>
            <div className={classes.ConsentRow}>
              <Checkbox checked={form.marketing} onChange={() => update('marketing', !form.marketing)} />
              <span>{translate('I agree to receive marketing promotions.')}</span>
            </div>

            <MainButton color='primary' type='button' disabled={!step1Valid} onClick={() => setStep(2)}>
              {translate('Continue')}
            </MainButton>
          </div>
        ) : (
          <div className={`${classes.AuthStep} ${classes.AuthStepDetails}`}>
            <div className={classes.InputOuter}>
              <MainInput value={form.firstName} placeholder={translate('Firstname')} onChange={(value) => update('firstName', value)} />
            </div>

            <div className={classes.InputOuter}>
              <MainInput value={form.lastName} placeholder={translate('Lastname')} onChange={(value) => update('lastName', value)} />
            </div>

            <div className={classes.NativeField}>
              <label>{translate('Birthdate')}</label>
              <input
                type='date'
                value={form.birthDate}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().slice(0, 10)}
                onChange={(event) => update('birthDate', event.target.value)}
              />
            </div>

            <div className={`${classes.NativeField} ${classes.CustomSelectField}`}>
              <label>{translate('Nationality')}</label>
              <button
                type='button'
                className={classes.CustomSelectTrigger}
                onClick={() => {
                  setNationalityMenuOpen((open) => !open);
                  setDocumentTypeMenuOpen(false);
                  setCountryMenuOpen(false);
                  setPhoneCountryMenuOpen(false);
                }}
                aria-expanded={nationalityMenuOpen}
              >
                <span>{countries.find((country) => country.code === form.nationality)?.name || translate('Nationality')}</span>
                <AngleDownIcon className={classes.CustomSelectArrow} aria-hidden='true' />
              </button>
              {nationalityMenuOpen ? (
                <div className={classes.CustomSelectMenu}>
                  <div className={classes.SelectSearchWrapper}>
                    <input
                      className={classes.SelectSearchInput}
                      type='search'
                      value={nationalitySearch}
                      placeholder={translate('Search nationality')}
                      autoFocus
                      onChange={(event) => setNationalitySearch(event.target.value)}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </div>
                  {filteredNationalities.map((country) => (
                    <button
                      key={`nationality-${country.code}`}
                      type='button'
                      className={`${classes.CustomSelectOption} ${form.nationality === country.code ? classes.CustomSelectOptionActive : ''}`}
                      onClick={() => {
                        update('nationality', country.code);
                        setNationalityMenuOpen(false);
                        setNationalitySearch('');
                      }}
                    >
                      <img className={classes.CustomSelectFlag} src={getCountryFlagUrl(country.code)} alt='' aria-hidden='true' />
                      <span>{country.name}</span>
                    </button>
                  ))}
                  {filteredNationalities.length === 0 ? (
                    <div className={classes.SelectNoResults}>{translate('No results')}</div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className={`${classes.NativeField} ${classes.CustomSelectField}`}>
              <label>{translate('Document ID Type')}</label>
              <button
                type='button'
                className={classes.CustomSelectTrigger}
                onClick={() => {
                  setDocumentTypeMenuOpen((open) => !open);
                  setNationalityMenuOpen(false);
                  setCountryMenuOpen(false);
                  setPhoneCountryMenuOpen(false);
                }}
                aria-expanded={documentTypeMenuOpen}
              >
                <span>
                  {form.documentType === 'nationalId'
                    ? translate('National Identity')
                    : form.documentType === 'passport'
                      ? translate('Passport')
                      : translate('Document ID Type')}
                </span>
                <AngleDownIcon className={classes.CustomSelectArrow} aria-hidden='true' />
              </button>
              {documentTypeMenuOpen ? (
                <div className={classes.CustomSelectMenu}>
                  {[
                    { value: 'nationalId', label: translate('National Identity') },
                    { value: 'passport', label: translate('Passport') },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type='button'
                      className={`${classes.CustomSelectOption} ${form.documentType === option.value ? classes.CustomSelectOptionActive : ''}`}
                      onClick={() => {
                        update('documentType', option.value);
                        setDocumentTypeMenuOpen(false);
                      }}
                    >
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={classes.InputOuter}>
              <MainInput
                value={form.documentId}
                placeholder={translate('Document ID')}
                onChange={(value) => update('documentId', value)}
              />
            </div>

            {form.birthDate && !birthDateValid ? (
              <div className={classes.FormValidationMessage}>{translate('You must be over 18')}</div>
            ) : null}

            <div className={classes.RegisterActionRow}>
              <button type='button' className={classes.SecondaryAuthButton} onClick={() => setStep(1)}>
                {translate('Back')}
              </button>
              <MainButton color='primary' type='submit' loading={loginLoading} disabled={!step2Valid || loginLoading}>
                {translate('Sign Up')}
              </MainButton>
            </div>
          </div>
        )}

        {submitError ? <div className={classes.FormValidationMessage}>{submitError}</div> : null}

        <div className={classes.AuthSwitch}>
          <span>{translate('Already have an account?')}</span>
          <button type='button' onClick={() => changeTab('login')}>{translate('Sign In')}</button>
        </div>

        {bonusLoading ? <div className={classes.AuthLoading}>{translate('Loading bonuses')}...</div> : null}
      </form>
    </div>
  );
};

export default Register;
