import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Accordion from "../../../features/UI/Accordion/Accordion";
import AccordionSmall from "../../../features/UI/Accordion/AccordionSmall";
import OutrightTournament from "./OutrightTournament";
import { translateNameWithLang } from "../../../utils/translations";

const CategoryOutright = (props) => {
  const [categoryTournaments, setCategoryTournaments] = useState([]);

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const tournamentSearchString = useSelector(
    (state) => state.sportsbook.tournamentSearchString
  );
  const tournamentSort = useSelector(
    (state) => state.sportsbook.tournamentSort
  );
  const tournamentTimeFilter = useSelector(
    (state) => state.sportsbook.tournamentTimeFilter
  );

  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

  useEffect(() => {
    if (!props.category) return;

    let updatedTournaments = [...props.category.Tournaments];

    if (tournamentSort === "Default Sort")
      updatedTournaments.sort((a, b) => a.Id - b.Id);
    else if (tournamentSort === "A - Z")
      updatedTournaments.sort((a, b) =>
        a.Name.International.localeCompare(b.Name.International)
      );
    else if (tournamentSort === "Z - A")
      updatedTournaments.sort((a, b) =>
        b.Name.International.localeCompare(a.Name.International)
      );

    setCategoryTournaments(updatedTournaments);
  }, [
    props.category?.Tournaments?.length,
    tournamentSearchString,
    tournamentSort,
    tournamentTimeFilter,
  ]);

  const getCategoryName = (categoryName) => {
    if (!categoryName) return "";
    let name = translateNameWithLang(categoryName);
    name = name.split(". Outright")[0];
    name = name.split("– Μακροχρόνια")[0];

    return name;
  };

  return (
    <Accordion
      title={translateNameWithLang(props.category.Name)}
      initOpen={props.initOpen}
      catIcon={`url('/flags/flags/${props.category.Name.International}.png')`}
    >
      {categoryTournaments.map((categoryTournament, tournamentIndex) => {
        return (
          <AccordionSmall
            key={categoryTournament.Id}
            icon={selectedSport.icon}
            title={getCategoryName(categoryTournament.Name)}
            initOpen={tournamentIndex < 3}
          >
            <OutrightTournament
              tournament={categoryTournament}
              slice={props.slice}
            />
          </AccordionSmall>
        );
      })}
    </Accordion>
  );
};

export default CategoryOutright;
