import { useSelector, useDispatch } from "react-redux";
import classes from "./TermsOfService.module.css";

import { translate } from "../../utils/translations";

const Aml = () => {
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang);

  return (
    <div className={classes.PageContent}>
      <div className={classes.ToS}>
        <div className={classes.Title}>
          <h1>
            {translate(
              "Betovix AML Rules, Fraud Prevention Rules and Guidelines"
            )}
          </h1>
          <h2>{translate("Version 1.0")}.</h2>
        </div>
        <div className={classes.Context}>
          <div className={classes.Text}>
            <div className={classes.ParagraphText}>
              {translate(`The following rules must be strictly observed by Betovix.com under the 
Atlas Solutions Limited (Anjouan) remote gaming license.
`)}
              <br />
              <br />
              {translate(`Betovix.com is fully committed to be constantly vigilant to prevent 
money laundering and combat the financing of terrorism in order to 
minimise and manage risks such as the risks to its reputational risk, legal 
risk and regulatory risk. It is also committed to its social duty to prevent 
serious crime and not to allow its systems to be abused in furtherance of 
these crimes.`)}
              <br />
              <br />
              {translate(`Betovix.com will endeavour to keep itself updated with developments 
both at national and international level on any initiatives to prevent 
money laundering and the financing of terrorism. It commits itself to 
protect, at all times, the organisation and its operations and safeguards 
its reputation and all from the threat of money laundering, the funding 
of terrorist and other criminal activities.
`)}
              <br />
              <br />
              {translate(`It is your responsibility to understand and abide by these rules. If you have 
any questions or suggestions, please contact us at antifraud@Betovix.com.`)}
              <br />
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              1. {translate("PLAYER ACCOUNT VERIFICATION")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(
                `Each player account must be verified when the player has reached a certain stage of gaming activity:`
              )}
              <br />
              {translate(
                `- Deposits: Cumulative sum of EUR / USD 2,000 or currency equivalent, 
including cryptocurrencies`
              )}
              <br />
              {translate(
                `- Withdrawals: Cumulative sum of EUR / USD 2,000 or currency 
equivalent, including cryptocurrencies`
              )}
              <br />
              {translate(
                `- Using 2 and/or more payment systems for deposits and/or withdrawals.`
              )}
              <br />
            </div>

            <div className={classes.ParagraphTitle}>
              2. {translate("REQUESTING KYC DOCUMENTS")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(
                `Obligatory documents that should be part of any Know Your Customer 
(KYC) process:`
              )}
              <br />
              {translate(`- Photo of valid ID`)}
              <br />
              {translate(
                `- Proof of payment option used for deposit (i.e. screenshot of e-wallet, 
photo of the card, bank statement). The only exception are deposits made 
in cryptocurrency.`
              )}
              <br />
              <br />
              {translate(`Optional documents that you can request:`)}
              <br />
              {translate(`- Proof of address (i.e. utility bill)`)}
              <br />
              {translate(`- Selfie with ID`)}
              <br />
              {translate(`- Live verification via mobile or laptop camera`)}
              <br />
              {translate(
                `- Source of funds (SOF) and/or Source of wealth (SOW)`
              )}
              <br />
              <br />
              {translate(
                `Any other forms of KYC documents as may be requested in accordance 
with Anjouan license requirements.`
              )}
              <br />
              <br />
              {translate(
                `Betovix may supplement the use of documentary evidence by using other 
means which may include:`
              )}
              <br />
              {translate(
                `- Independently verifying the Player’s identity through the comparison 
of information provided by the Player with information obtained from 
any reporting agency, any public database, or any other source;`
              )}
              <br />
              {translate(
                `- Checking references with financial institutions; or`
              )}
              <br />
              {translate(`- Obtaining a copy of the financial statements.`)}
              <br />
              {translate(
                `- To this extent the Company utilizes external fully certified verification 
platforms and compliance services to verify the Player’s true identity.`
              )}
              <br />
            </div>

            <div className={classes.ParagraphTitle}>
              3.{" "}
              {translate("SUSPICIOUS TRANSACTION/ACTIVITY REPORTING (STR/SAR)")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(
                `Suspicious activities and/or transactions must be identified, handled, 
escalated and reported promptly. `
              )}
              <br />
              <br />
              {translate(
                `Betovix.com employees who identify/detect unusual or suspicious activities 
and/or transactions are obliged to report these incidents to the MLRO 
immediately. Betovix.com employees can use different ways to submit 
internal SAR/STRs and are instructed accordingly.  `
              )}
              <br />
              <br />
              {translate(
                `Once an internal report is received, the MLRO and his assignees will 
investigate the customer’s account to assess the unusual behaviour and/or 
suspicion described within the internal report. Based on the outcome of 
the investigation, the MLRO will decide whether to report the suspicion 
externally to the Anjouan FIU or to close the internal report with 
documented reasons.`
              )}
              <br />
              <br />
              {translate(
                `The suspected/involved customer or any other third party is not to be 
alerted of any investigations or reports regarding ML/FT, as under no 
circumstances a “Tipping-off” is accepted or tolerated, given the fact 
that this would be a serious criminal offence. `
              )}
              <br />
              <br />
              {translate(
                `The MLRO is obliged to report any suspicious activity or transaction to 
the respective authorities where the MLRO knows, suspects, or has 
reasonable grounds to suspect ML/FT promptly. The internal or external 
reporting of a suspicious activity cannot be suppressed.`
              )}
              <br />
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              4. {translate("AML/CFT TRAINING PROGRAM ")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(
                `Adequately AML/ CFT trained staff is a cornerstone of every effective 
AML/CFT program to protect the company of related risks. It creates 
also the level of awareness that is key to report any suspicious activity 
without undue delay. New employees shall receive anti-money laundering 
training as part of the mandatory new joiners training program (as 
applicable in their respective company). `
              )}
              <br />
              {translate(
                `All employees are required to complete a web-based AML/CFT training 
annually. Employees with operational or other substantial AML 
responsibilities shall receive additional AML/CFT trainings as applicable, 
especially if they are responsible for the maintenance of customer 
relationships or for processing transactions.
 `
              )}
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              5. {translate("POLITICALLY EXPOSED PERSONS")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(
                `The requirements relating to PEPs are of a preventive and not criminal 
nature by law. Betovix.com has an appropriate risk management system 
in place, including risk-based procedures, to determine `
              )}
              <br />
              {translate(
                `- whether a customer or the management or the beneficial owner of a 
business partner is a politically exposed person,
 `
              )}
              <br />
              {translate(
                `- whether this person can be accepted as a customer and ,
 `
              )}
              <br />
              {translate(
                `-which mitigating measures need to be applied.
 `
              )}
              <br />
              <br />
              {translate(
                `Generally, a person is politically exposed if he/she holds or has held a 
prominent public function in the past 12 months. Such prominent public 
functions shall include, but are not limited to: 
 `
              )}
              <br />
              {translate(
                `- Heads of State, 
 `
              )}
              <br />
              {translate(
                `- Heads of Government, 
 `
              )}
              <br />
              {translate(
                `- Ministers and Deputy and Assistant Ministers and Parliamentary 
Secretaries;
 `
              )}
              <br />
              {translate(
                `- Members of Parliament;
 `
              )}
              <br />
              {translate(
                `- Members of the governing bodies of political parties;
 `
              )}
              <br />
              {translate(
                `- Members of the Courts or of other high-level judicial bodies whose 
decisions are not subject to further appeal, except in exceptional 
circumstances; 
 `
              )}
              <br />
              {translate(
                `- Members of courts of auditors, Audit Committees or of the boards of 
central banks;
 `
              )}
              <br />
              {translate(
                `- Ambassadors, charge d’affaires/diplomats and other high-ranking 
officers in the armed forces; 
 `
              )}
              <br />
              {translate(
                `- Members of the administration, management or boards of state-owned 
corporations; and 
 `
              )}
              <br />
              {translate(
                `- anyone exercising a function equivalent to those set out in the 
paragraphs above within an institution of the European Union or any 
other international body. 
 `
              )}
              <br />
              <br />
              {translate(
                `Close family members, such as 
 `
              )}
              <br />
              {translate(
                `- the spouse or any person considered to be the equivalent to a spouse,
 `
              )}
              <br />
              {translate(
                `- parents and children and their spouses or any person considered to be 
the equivalent to a spouse are to be classified as PEPs as well.
 `
              )}
              <br />
              <br />
              {translate(
                `This also applies to persons who are considered “known to be close 
associates”. This definition applies to every natural person who has joint 
profits from assets or established business relationship or any other close 
business relations with a politically exposed person and natural persons 
who have sole beneficial ownership of a legal entity or legal arrangement 
which is known to have been set up for the de facto benefit of a 
politically exposed person.
 `
              )}
              <br />
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              6. {translate("SANCTIONS")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(
                `Betovix.com is required to screen customers and on a risk-based level also 
business partners against sanctions lists issued, among others, by the 
United Nations, European Union and US Office of Foreign Assets Control 
(OFAC) at a minimum in all jurisdictions in which Betovix.com operates, 
unless to do so would conflict with local legislation. `
              )}
              <br />
              <br />
              {translate(
                `Whereas Betovix.com can decide whether to accept PEPs as customers, 
under no circumstances can business be carried out with any sanctioned 
natural person or corporate entity.
 `
              )}
              <br />
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              7. {translate("MEASURES IN CASE OF PEP AND SANCTION MATCHES")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(`Relevant operational teams have procedures in place, which describe how 
to deal with PEP/sanction alerts, identify alerts as false positives or true 
matches and escalate true matches to the MLRO and Deputy. The MLRO 
has a separate procedure in place, which defines the steps that need to 
be taken if the designated teams escalate a PEP or sanction match. 
According to the escalation procedure, `)}
              <br />
              {translate(
                `- senior management approval for the establishment or continuation of a 
business relationship with a PEP has to be obtained; 
 `
              )}
              <br />
              {translate(
                `- EDD measures, including establishment of the source of wealth and if 
applicable the source of funds that are involved in such business 
relationships, need to be applied  
 `
              )}
              <br />
              {translate(
                `- enhanced, ongoing monitoring of those business relationships needs to 
be applied. If a customer is identified as a sanctioned person, the 
following actions are mandatory:  `
              )}
              <br />
              {translate(
                `-  immediately freeze all assets held on behalf of the sanctioned person and 
 `
              )}
              <br />
              {translate(
                `-  inform the Sanctions Monitoring Board (SMB) to receive further 
instructions.  `
              )}
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              8. {translate("RECORD KEEPING")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(`All identification documentation and service records shall be kept for a 
minimum period of no less than five years after the termination of the 
contractual relationship with the customer notwithstanding retention 
periods of other laws as e.g. tax or data protection laws. `)}
              <br />
              <br />
              {translate(`AML/CFT relevant data in relation to internal investigations, KYC 
measures or STRs/SARs shall be obtained for five years and - if no 
further need is identified - deleted after. `)}
              <br />
              <br />
              {translate(`All data and documentation shall be made available to authorized 
persons promptly on request and without undue delays. Authorized 
persons are e.g. competent authorities or public prosecutors, the 
FIAU/FIU, etc.`)}
              <br />
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              9. {translate("USE OF GIFTS AND MANUAL BALANCE CORRECTIONS")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(`‘Gifts’ and positive Balance Corrections must be created for rewarding 
players only, and cannot be used for Operator’s personal needs. We prohibit 
the use of ‘Gifts’ for any purpose other than rewarding players for certain 
activity (i.e. a forum contest, etc).`)}
              <br />
              <br />
              {translate(`In case you absolutely need to make a prepayment to an affiliate, or make 
any other form of payment using ‘Gifts’ or positive Balance Corrections, 
you must contact your Account Manager in advance and get a written 
approval`)}
              <br />
              <br />
              {translate(`We reserve the right to cancel your Gifts or positive Balance Corrections in 
the event that you do not have approval for issuing a Gift or making a 
positive Balance Correction. Furthermore, we reserve the right to restrict 
your access to the Admin Area until written explanation of Gifts or positive 
Balance Corrections are received by your Account Manager.`)}
              <br />
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              9. {translate("PROCESSING WITHDRAWALS")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(`As an Operator you should always attempt to process withdrawals via the 
same payment method used to make a deposit. It is crucial for Anti-Money 
Laundering (AML) protection to follow this rule in full measure. We, 
however, understand that in some cases it may not be possible (e.g. a 
Mastercard card used for deposit cannot be used for withdrawal etc.) and 
do not intend this measure to limit your operations in any way.`)}
              <br />
              <br />
              {translate(`All cryptocurrency deposits can be withdrawn back only to cryptocurrency 
wallets. All fiat money deposits can be withdrawn only via fiat payment 
options. In case of an urgent necessity to make fiat-crypto withdrawal, all 
such payments must be approved by antifraud@betovix.com.`)}
              <br />
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              10. {translate("THIRD-PARTY PAYMENT ACCOUNTS")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(`Use of 3rd party payment accounts is strictly prohibited. Please note 
that each customer can only use their own payment accounts or wallets. 
Any player who uses a 3rd party payment source must have their
account closed and their funds confiscated. Only in exceptional cases can 
the customer initiate a refund.
`)}
              <br />
              <br />
              {translate(`If you found a player who uses 3rd party payment accounts, you should 
report such a player to antifraud@betovix.com.`)}
              <br />
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              11. {translate("HANDLING FUNDS CONFISCATION")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(`In case a player’s funds are confiscated due to breach of the Terms and 
Conditions and/or Bonus Terms and Conditions, you must specify the 
exact reason for such action including the exact clause from the Terms 
and Conditions. Both the rule and the reason must be posted in the 
‘Change balance’ section.`)}
              <br />
              <br />
            </div>
            <div className={classes.ParagraphTitle}>
              12. {translate("OTHER CASES")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(`1. If a player attempts to manipulate casino games, casino systems, or 
you have a strong reason to believe that the customer is attempting to 
cheat, please report this customer to antifraud@betovix.com.`)}
              <br />
              <br />
              {translate(`2. If a player openly states in live chat or by email about possible 
chargebacks, please report such a player to antifraud@betovix.com.`)}
              <br />
              <br />
              {translate(`3. If a player provided forged or false documents, please report such a 
player to antifraud@betovix.com.`)}
              <br />
              <br />
              {translate(`4. All suspicious players, potential collusion attempts or fraud should be 
reported to antifraud@betovix.com immediately.`)}
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aml;
