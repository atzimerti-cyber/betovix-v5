import { useSelector, useDispatch } from 'react-redux';
import classes from './TermsOfService.module.css'

import { translate } from '../../utils/translations';

const TermsOfService = () => {
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang);

    return (
        <div className={classes.PageContent}>
            <div className={classes.ToS}>
                <div className={classes.Title}>
                    <h1>{translate('Terms Of Service')}</h1>
                    <h2>{translate('Last updated on: September 19, 2024')}.</h2>
                </div>
                <div className={classes.Context}>
                    <div className={classes.Text}>
                        <div className={classes.ParagraphText}>
                            {translate('These Terms of Service ("Terms") govern your use of betovix.com (the "Website"), including the casino and sportsbook services offered. By accessing or using our services, you agree to abide by these Terms, our Privacy Policy, and any other legal notices or guidelines published on our Website.')}<br />
                        </div>
                        <div className={classes.ParagraphTitle}>1. {translate('Eligibility')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('To access or use the Website, you must')}:<br />

                            {translate('Be at least 18 years old (or the legal age of gambling in your jurisdiction). Reside in a jurisdiction where online gambling is legal. Have the legal capacity to enter into a binding contract. By using the Website, you warrant that you meet these requirements.')}
                        </div>

                        <div className={classes.ParagraphTitle}> 2.{translate(' Account Registration')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('To access certain features of the Website, you must create an account. You agree to')}:<br />

                            {translate(' Provide accurate and up-to-date information during registration. Maintain the confidentiality of your account credentials. Be responsible for any activities that occur under your account. We reserve the right to suspend or terminate accounts if fraudulent or suspicious activity is detected.')}

                        </div>

                        <div className={classes.ParagraphTitle}>3. {translate('Responsible Gambling')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('We promote responsible gambling. You should')}:<br />

                            {translate('Only gamble with money you can afford to lose. Set limits on your gambling activities. Seek assistance if gambling becomes problematic. We offer self-exclusion tools and provide resources for support. You agree that betovix.com is not liable for any gambling losses incurred')}.
                        </div>

                        <div className={classes.ParagraphTitle}> 4. {translate('Prohibited Activities')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('While using the Website, you agree NOT to')}:<br />

                            {translate(' Use the Website for illegal purposes or to breach any applicable laws.Use bots, scripts, or other automated methods to interfere with the Website. Engage in fraudulent activities such as collusion or match-fixing. Manipulate the odds or outcomes of any events or games. Any violation of this section may result in account suspension or permanent banning')}.
                        </div>

                        <div className={classes.ParagraphTitle}> 5. {translate('Deposits and Withdrawals')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('You may deposit funds into your account using approved payment methods. By making a deposit, you agree that')}:<br />

                            {translate(' You are the authorized owner of the payment method. Deposited funds are legally obtained and not from unlawful activities. Withdrawals are subject to our verification processes, and we reserve the right to request documentation to confirm your identity.')}
                        </div>

                        <div className={classes.ParagraphTitle}>6. {translate('Bonuses and Promotions')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('All bonuses, promotions, and special offers are subject to terms and conditions. These may include wagering requirements, expiration dates, and usage restrictions. betovix.com reserves the right to amend or cancel promotions at any time.')}
                        </div>

                        <div className={classes.ParagraphTitle}>7. {translate('Sportsbook Terms')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('In addition to these Terms, sportsbook users agree to')}:<br />

                            {translate('Familiarize themselves with the rules governing the placing of bets. Understand that all bets are final once confirmed. Accept that odds may fluctuate and that bets are settled based on the final outcome. We reserve the right to void bets if suspicious or fraudulent behavior is detected')}.
                        </div>

                        <div className={classes.ParagraphTitle}>8. {translate('Casino Game Rules')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('The outcome of all casino games is determined by random number generators (RNGs) for fairness. You agree that')}:<br />

                            {translate('The outcome of a game is final. No form of hacking, cheating, or exploiting game mechanics is permitted. Your account balance reflects any winnings or losses from games')}.
                        </div>

                        <div className={classes.ParagraphTitle}>9. {translate('Privacy')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('Your use of the Website is subject to our Privacy Policy, which outlines how we collect, use, and share your personal data.')}
                        </div>

                        <div className={classes.ParagraphTitle}>10. {translate('Limitations of Liability')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('To the fullest extent permitted by law, betovix.com is not liable for')}:<br />

                            {translate('Any direct, indirect, incidental, or consequential damages arising from your use of the Website. Any losses or damages resulting from technical issues, including server outages or software malfunctions. The conduct or statements of third parties')}.
                        </div>
                        <div className={classes.ParagraphTitle}> 11. {translate('Termination')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('We reserve the right to suspend or terminate your account at our sole discretion if')}:<br />

                            {translate('You violate any provision of these Terms. Your account is linked to fraudulent activities. We are required to do so by law or regulatory authorities.')}
                        </div>
                        <div className={classes.ParagraphTitle}> 12. {translate('Governing Law')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('These Terms shall be governed by the laws of Anjouan Offshore Finance Authority (AOFA). Any disputes arising from or relating to these Terms will be subject to the exclusive jurisdiction of the courts of Anjouan Offshore Finance Authority (AOFA).')}
                        </div>

                        <div className={classes.ParagraphTitle}>13. {translate('Changes to the Terms')}</div>
                        <div className={classes.ParagraphText}>
                            {translate(' We may modify these Terms from time to time. You will be notified of any material changes, and your continued use of the Website will constitute acceptance of the updated Terms.')}
                        </div>

                        <div className={classes.ParagraphTitle}>14. {translate('Contact Us')}</div>
                        <div className={classes.ParagraphText}>
                            {translate('If you have any questions about these Terms, please contact us at')} <i style={{ color: 'var(--db-body-text)' }}>support@betovix.com</i>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
