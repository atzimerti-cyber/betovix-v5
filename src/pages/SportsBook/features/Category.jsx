import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Tournament from "./Tournament";
import Accordion from "../../../features/UI/Accordion/Accordion";
import AccordionSmall from "../../../features/UI/Accordion/AccordionSmall";
import { translate } from "../../../utils/translations";
import DUMMYTOURNAMENTS from "../../../dummyData/TODEL_tournaments";
import { translateNameWithLang } from "../../../utils/translations";

const Category = (props) => {
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
  const sportSettings = useSelector((state) => state.app.sportSettings);

  const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

  const specialGroups = useSelector((state) => state.sportsbook.specialGroups);

  useEffect(() => {
    if (!props.category) return;

    let updatedTournaments = [...props.category.Tournaments];

    if (tournamentSort === "Default Sort") {
      const toursOrder = sportSettings?.ToursOrder || {};

      updatedTournaments.sort((a, b) => {
        // Check if is in tours order first
        if (
          toursOrder[a.Id] &&
          toursOrder[a.Id] < 999999 &&
          !toursOrder[b.Id]
        ) {
          return -1; // a comes first
        } else if (
          toursOrder[b.Id] &&
          toursOrder[b.Id] < 999999 &&
          !toursOrder[a.Id]
        ) {
          return 1; // b comes first
        } else if (
          toursOrder[a.Id] &&
          toursOrder[a.Id] < 999999 &&
          toursOrder[b.Id] &&
          toursOrder[b.Id] < 999999
        ) {
          // Both have order, sort by order
          return toursOrder[a.Id] - toursOrder[b.Id];
        } else {
          // Neither has order, sort alphabetically
          return a.Name.International.localeCompare(b.Name.International);
        }
      });

      // updatedTournaments.sort((a, b) => a.Id - b.Id);
    } else if (tournamentSort === "A - Z")
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

  const getIsSpecial = (tournament) => {
    const tournamentName = tournament?.Name?.International;
    const filtered = specialGroups.filter((sg) =>
      tournamentName.includes(sg.name)
    );
    const isSpecial = filtered.length > 0;

    return isSpecial;
  };

  return (
    <div data-category={`Category:${props.category.Id}`}>
      <Accordion
        catId={props.category.Id}
        // title={translate(props.category.Name.International)}
        title={translateNameWithLang(props.category.Name)}
        initOpen={props.initOpen}
        catIcon={`url('/flags/flags/${props.category.Name.International}.png')`}
      >
        {categoryTournaments.map((categoryTournament, tournamentIndex) => {
          const isSpecial = getIsSpecial(categoryTournament);
          if (isSpecial) return null;
          return (
            <div
              key={categoryTournament.Id}
              data-tournament={`Tournament:${categoryTournament.Id}`}
            >
              <AccordionSmall
                catId={categoryTournament.Id}
                icon={selectedSport.icon}
                title={translateNameWithLang(categoryTournament.Name)}
                // title={translate(categoryTournament.Name.International)}
                initOpen={false}
                // initOpen={props.slice !== "sportsHome" && tournamentIndex < 2}
              >
                <Tournament
                  tournament={categoryTournament}
                  slice={props.slice}
                  includePregame={props.includePregame}
                  includeLive={props.includeLive}
                  catId={props.category.Id}
                  tourId={categoryTournament.Id}
                />
              </AccordionSmall>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Category;
