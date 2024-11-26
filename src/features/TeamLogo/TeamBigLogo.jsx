import notennislogo from "../../assets/images/notennislogo.png";
import noteamlogo from "../../assets/images/noteamlogo.png"; 
import classes from "./TeamBigLogo.module.css";
import config from "../../config";

const TeamBigLogo = (props) => {
  const getTeamLogo = () => {
    const competitorLogo = `${config.VITE_SPORTS_LOGOS}/teams/b/${props.teamId}.png`;
    return competitorLogo;
  };

  const handleImageError = (event) => {
    if (props.sportName === "Tennis") {
      event.target.src = notennislogo;
    } else {
      event.target.src = noteamlogo;  
    }
  };

  const logoStyles = {
    position: "absolute",
    [props.directionLeft ? "left" : "right"]: "15%",
  };

  return (
    <div className={classes.Logo} style={logoStyles}>
      <img
        loading="lazy"
        src={getTeamLogo()}
        alt="Team Logo"
        className={classes.TeamLogo}
        onError={handleImageError} 
      />
    </div>
  );
};

export default TeamBigLogo;
