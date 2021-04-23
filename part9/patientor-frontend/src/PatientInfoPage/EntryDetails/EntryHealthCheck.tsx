import React from "react";
import { Icon, SemanticCOLORS, SemanticICONS} from "semantic-ui-react";
import { Entry } from "../../types";
import EntryBase from "./EntryBase";

const EntryHealthCheck = ({ entry }: { entry: Entry }) => {
  const iconName: SemanticICONS = "doctor";

  const healthColor: SemanticCOLORS[] = [
    "green",
    "yellow",
    "orange",
    "red"
  ];

  if (entry.type !== "HealthCheck") return null;
  return (
    <EntryBase entry={entry} iconName={iconName}>
      <br />
      <Icon name="heart" color={healthColor[entry.healthCheckRating]}></Icon>
    </EntryBase>
  );
};

export default EntryHealthCheck;