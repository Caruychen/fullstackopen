import React from "react";
import { SemanticICONS } from "semantic-ui-react";
import { Entry } from "../../types";
import EntryBase from "./EntryBase";

const EntryOccupationalHealthCare = ({ entry }: { entry: Entry }) => {
  const iconName: SemanticICONS = "stethoscope";

  if (entry.type !== "OccupationalHealthcare") return null;
  return (
    <EntryBase entry={entry} iconName={iconName}>
      <p>Employer: {entry.type === "OccupationalHealthcare" && entry.employerName}
        {entry.sickLeave &&
          <>
            <br />
            sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </>
        }
      </p>
    </EntryBase>
  );
};

export default EntryOccupationalHealthCare;