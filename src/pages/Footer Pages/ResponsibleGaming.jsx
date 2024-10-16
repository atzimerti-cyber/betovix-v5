import { useSelector, useDispatch } from "react-redux";
import classes from "./TermsOfService.module.css";

import { translate } from "../../utils/translations";

const ResponsibleGaming = () => {
  const dispatch = useDispatch();

  const lang = useSelector((state) => state.app.lang);

  return (
    <div className={classes.PageContent}>
      <div className={classes.ToS}>
        <div className={classes.Title}>
          <h1>{translate("Responsible Gaming Policy ")}</h1>
          <h2>{translate("Last updated: 15 October 2024")}.</h2>
        </div>
        <div className={classes.Context}>
          <div className={classes.Text}>
            <div className={classes.ParagraphText}>
              {translate(`Betovix.com is here to provide an excellent and enjoyable gaming experience and 
recognize our responsibility in preventing problematic activity. We advise all players to 
take into account the following, and not game irresponsibly:
`)}
              <br />
              {translate(`- Play for entertainment, not to make money.`)}
              <br />
              {translate(`- Avoid chasing losses.`)}
              <br />
              {translate(`- Establish limits for yourself.
`)}
              <br />
              {translate(
                `- Do not let gambling interfere with your daily responsibilities.`
              )}
              <br />
              {translate(`- Never gamble unless you can cover losses.`)}
              <br />
              {translate(`- Take breaks.`)}
              <br />
              <br />
              {translate(`See the below questions. If your answer to the majority of them is “YES”, we advise you 
take action to prevent gambling from negatively impacting your life:
`)}
              <br />
              {translate(`- Does gambling affect your work?`)}
              <br />
              {translate(
                `- Has gambling caused arguments with family/friends?`
              )}
              <br />
              {translate(`- Do you always return to win back your losses?`)}
              <br />
              {translate(`- Have you borrowed money to gamble?
`)}
              <br />
              {translate(`- Do you see gambling as a source of income?`)}
              <br />
              {translate(`- Do you find it difficult to limit your gambling?`)}
            </div>
            <div className={classes.ParagraphTitle}>
              {translate("What to do?")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(`Listed below are reputed organizations committed to helping those who struggle with 
gambling problems, and can be contacted at any time:`)}
              <br />
              <br />
              <p
                onClick={() =>
                  window.open("https://www.gamblersanonymous.org/ga/", "_blank")
                }
                style={{
                  textDecoration: "underline",
                  color: "lightblue",
                  cursor: "pointer",
                }}
              >
                <i>{translate(`- Gamblers Anonymous`)}</i>
              </p>
              <br />
              <p
                onClick={() =>
                  window.open("https://www.gamblingtherapy.org/", "_blank")
                }
                style={{
                  textDecoration: "underline",
                  color: "lightblue",
                  cursor: "pointer",
                }}
              >
                <i>{translate(`- Gambling Therapy`)}</i>
              </p>
              <br />
              <p
                onClick={() =>
                  window.open("https://www.gamcare.org.uk/", "_blank")
                }
                style={{
                  textDecoration: "underline",
                  color: "lightblue",
                  cursor: "pointer",
                }}
              >
                <i>{translate(`- GamCare`)}</i>
              </p>
            </div>

            <div className={classes.ParagraphTitle}>
              {translate("How we can help")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(`We advise all players who are concerned about their gambling behavior to take a break 
by excluding themselves from their gaming account. Self-exclusion will lock your 
account for a minimum of 6 months and no promotional material will be sent.`)}
              <br />
              <br />
              {translate(`Contact our experienced Customer Support team at any time to request this and they 
will kindly assist you. A 7 day cooling off period is also available. We recommend that 
you contact all other gambling sites where you have an account and request self-exclusion there also.
`)}
              <br />
              <br />
            </div>

            <div className={classes.ParagraphTitle}>
              {translate("Underage gambling")}
            </div>
            <div className={classes.ParagraphText}>
              {translate(`Players must be of legal gambling age in their jurisdiction (at least 18+) in order to play 
at Site Name. It is their responsibility to be aware of the age restriction where they 
reside and play, and to confirm their legitimacy when creating an account at Site Name. 
We also advise parents to do the following:`)}
              <br />
              <br />
              {translate(`- Password protect computer, mobile, and/or tablet.`)}
              <br />
              {translate(
                `- Do not leave device unattended when logged into your account.`
              )}
              <br />
              {translate(
                `- Make sure all account details and credit cards are inaccessible to children.`
              )}
              <br />
              {translate(`-  Do not save passwords on your computer, write them down and keep 
somewhere out of reach.`)}
              <br />
              {translate(`- Download filtering software (e.g. Net Nanny) to prevent minors from accessing 
inappropriate sites`)}
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsibleGaming;
