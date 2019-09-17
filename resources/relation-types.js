function getAllTypes() {
  return [
    "STRUCTURE.addr",
    "AGE",
    "ANIMAL",
    "CHEMICAL",
    "COREF.gen",
    "COREF.loc",
    "COREF.dat",
    "COREF",
    "DATE",
    "DATE.non",
    "DURATANNIV",
    "EVENT",
    "EVENT.rel",
    "EVENT.xlife",
    "ITE.et",
    "FAMILYMEMBER",
    "NONFAMILY",
    "FOOD_DRINK",
    "GAME",
    "HEALTH_CONDITION",
    "ITE.gpe",
    "ITE.notgpe",
    "ITE.org",
    "LOCALE",
    "LOCALE.notgpe",
    "STRUCTURE",
    "MONEY",
    "OCCUPATION",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "ETPLACE",
    "PERCENT",
    "PERSON",
    "PHONENUMBER",
    "FLORA",
    "QUANTITY",
    "TIME",
    "TITLE",
    "TITLEFPH",
    "VEHICLE",
    "WEAPON",
    "URL",
    "WORK_OF_ART"
  ];
}
function getHasStartDateTypes() {
  return [
    "DATE",
    "DATE.non",
    "EVENT", 
    "EVENT.rel", 
    "EVENT.xlife", 
    "PERSON"
  ];
}
function getHasStartPlaceTypes() {
  return [
    "COREF.loc",
    "EVENT",
    "EVENT.rel",
    "EVENT.xlife", 
    "PERSON", 
    "LOCALE", 
    "LOCALE.notgpe",
    "STRUCTURE"
  ];
}
function getHasStartTimeTypes() {
  return [
    "EVENT",
    "EVENT.rel",
    "EVENT.xlife", 
    "PERSON", 
    "TIME"
  ];
}
function getHasEndDateTypes() {
  return [
    "DATE",
    "DATE.non",
    "EVENT", 
    "EVENT.rel", 
    "EVENT.xlife", 
    "PERSON"
  ];
}
function getHasEndPlaceTypes() {
  return [
    "COREF.loc",
    "EVENT",
    "EVENT.rel",
    "EVENT.xlife", 
    "PERSON", 
    "LOCALE", 
    "LOCALE.notgpe",
    "STRUCTURE"
  ];
}
function getHasEndTimeTypes() {
  return [
    "EVENT",
    "EVENT.rel",
    "EVENT.xlife", 
    "PERSON", 
    "TIME"
  ];
}
function getHasEventTypes() {
  return [
    "EVENT.rel",
    "EVENT.xlife", 
    "COREF",
    "PERSON"
  ];
}
function getHasEventFactTypes() {
  return [
    "DATE",
    "DATE.non",
    "LOCALE", 
    "LOCALE.notgpe", 
    "PERSON",
    "TIME"
  ];
}
function getIsEventFactTypes() {
  return [
    "DATE",
    "DATE.non",
    "EVENT",
    "EVENT.rel",
    "EVENT.xlife", 
    "LOCALE",
    "LOCALE.notgpe",
    "STRUCTURE", 
    "TIME"
  ];
}
function getHasSpouseTypes() {
  return [
    "PERSON"
  ];
}
function getHasFatherTypes() {
  return [
    "PERSON"
  ];
}
function getHasMotherTypes() {
  return [
    "PERSON"
  ];
}
function getAgeOfTypes() {
  return [
    "AGE",
    "STRUCTURE",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "PERSON"
  ];
}
function getAttendedTypes() {
  return [
    "ORGANIZATION.edu",
    "PERSON"
  ];
}
function getCausedByTypes() {
  return [
    "EVENT",
    "EVENT.rel",
    "EVENT.xlife", 
    "HEALTH_CONDITION", 
    "PERSON"
  ];
}
function getContactInfoTypes() {
  return [
    "STRUCTURE.addr",
    "STRUCTURE",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "PERSON",
    "URL",
    "PHONENUMBER"
  ];
}
function getCreatedTypes() {
  return [
    "STRUCTURE",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "PERSON",
    "WORK_OF_ART"
  ];
}
function getHasDurationTypes() {
  return [
    "DURATANNIV",
    "EVENT",
    "EVENT.rel",
    "EVENT.xlife",
    "OCCUPATION",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "PERSON"
  ];
}
function getEmployedByTypes() {
  return [
    "COREF",
    // "NONFAMILY",
    "OCCUPATION",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "PERSON"
  ];
}
function getHasFamilyMemberTypes() {
  return [
    "FAMILYMEMBER",
    "NONFAMILY",
    "COREF",
    "PERSON"
  ];
}
function getIsFemaleTypes() {
  return [
    "PERSON"
  ];
}
function getIsFictionalTypes() {
  return [
    "STRUCTURE.addr",
    "AGE",
    "ANIMAL",
    "CHEMICAL",
    "COREF.gen",
    "COREF.loc",
    "COREF.dat",
    "COREF",
    "DATE",
    "DATE.non",
    "DURATANNIV",
    "EVENT",
    "EVENT.rel",
    "EVENT.xlife",
    "ITE.et",
    "FAMILYMEMBER",
    "NONFAMILY",
    "FOOD_DRINK",
    "GAME",
    "HEALTH_CONDITION",
    "ITE.gpe",
    "ITE.notgpe",
    "ITE.org",
    "LOCALE",
    "LOCALE.notgpe",
    "STRUCTURE",
    "MONEY",
    "OCCUPATION",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "ETPLACE",
    "PERCENT",
    "PERSON",
    "PHONENUMBER",
    "FLORA",
    "QUANTITY",
    "TIME",
    "TITLE",
    "TITLEFPH",
    "VEHICLE",
    "WEAPON",
    "URL",
    "WORK_OF_ART"
  ];
}
function getIsMaleTypes() {
  return [
    "PERSON"
  ];
}
function getIsMemberOfTypes() {
  return [
    "PERSON",
    "COREF.loc",
    "LOCALE",
    "LOCALE.notgpe",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "FAMILYMEMBER",
    "NONFAMILY",
    "COREF.gen",
    "COREF",
    "VEHICLE",
    "WEAPON",
    "ANIMAL"
  ];
}
function getNameCombinerTypes() {
  return [
    "PERSON"
  ];
}
function getHasOccupationTypes() {
  return [
    "OCCUPATION",
    "COREF",
    "PERSON"
  ];
}
function getOwnsTypes() {
  return [
    "PERSON",
    "COREF.loc",
    "STRUCTURE", 
    "VEHICLE",
    "WORK_OF_ART",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "WEAPON"
  ];
}
function getPrecedesRecentlyTypes() {
  return [
    "DATE",
    "DATE.non"
  ];
}
function getPrincipalsAssociateTypes() {
  return [
    "PERSON"
  ];
}
function getIsPrincipalPersonTypes() {
  return [
    "PERSON"
  ];
}
function getQuantityTypes() {
  return [
    "QUANTITY",
    "FAMILYMEMBER",
    "NONFAMILY", 
    "STRUCTURE", 
    "VEHICLE",
    "WEAPON",
    "WORK_OF_ART"
  ];
}
function getHasResidencePlaceTypes() {
  return [
    "PERSON",
    "COREF",
    "LOCALE",
    "LOCALE.notgpe", 
    "STRUCTURE", 
    "STRUCTURE.addr"
  ];
}
function getSameAsTypes() {
  return [
    "STRUCTURE.addr",
    "ANIMAL",
    "CHEMICAL",
    "COREF.gen",
    "COREF.loc",
    "COREF.dat",
    "COREF",
    "DATE",
    "DATE.non",
    "ITE.et",
    "FAMILYMEMBER",
    "NONFAMILY",
    "FOOD_DRINK",
    "GAME",
    "ITE.gpe",
    "ITE.notgpe",
    "ITE.org",
    "LOCALE",
    "LOCALE.notgpe",
    "STRUCTURE",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "ETPLACE",
    "PERSON",
    "FLORA",
    "TIME",
    "VEHICLE",
    "WEAPON",
    "WORK_OF_ART"
  ];
}
function getSubplaceOfTypes() {
  return [
    "STRUCTURE.addr",
    "COREF.loc",   // is this a valid entity type?
    "LOCALE",
    "LOCALE.notgpe",
    "STRUCTURE",
    "ORGANIZATION",
    "ORGANIZATION.edu",
    "ORGANIZATION.mil",
    "ORGANIZATION.music",
    "ORGANIZATION.pub",
    "ORGANIZATION.rel",
    "ORGANIZATION.sports",
    "ETPLACE"
  ];
}
function getHasTitleTypes() {
  return [
    "PERSON",
    "TITLE",
    "TITLEFPH"
  ];
}
function getTypes(relationship) {
  var relationToTypesMap = {
    "E1:HAS_STDATE": getHasStartDateTypes(),
    "E1:HAS_ST_PL": getHasStartPlaceTypes(),
    "E1:HAS_ST_TM": getHasStartTimeTypes(),
    "E3:HAS_ENDDATE": getHasEndDateTypes(),
    "E3:HAS_END_PL": getHasEndPlaceTypes(),
    "E1:HAS_END_TM": getHasEndTimeTypes(),
    "Z:HAS_EVENT": getHasEventTypes(),
    "E4:HAS_EVENT_FACT": getHasEventFactTypes(),
    "E4:IS_EVENT_FACT": getIsEventFactTypes(),
    "R00:HAS_SPOUSE": getHasSpouseTypes(),
    "R01:HAS_FATHER": getHasFatherTypes(),
    "R02:HAS_MOTHER": getHasMotherTypes(),
    "Z:AGE_OF": getAgeOfTypes(),
    "Z:ATTENDED": getAttendedTypes(),
    "Z:CAUSED_BY": getCausedByTypes(),
    "Z:'S_CONTACT": getContactInfoTypes(),
    "Z:CREATED": getCreatedTypes(),
    "Z:HAS_DURATION": getHasDurationTypes(),
    "Z:EMPLOYED_BY": getEmployedByTypes(),
    "Z:HASFAMMEMLST": getHasFamilyMemberTypes(),
    "Z:IS_FEM_FOR": getIsFemaleTypes(),
    "Z:IS_FICTIONAL": getIsFictionalTypes(),
    "Z:IS_MALE_FOR": getIsMaleTypes(),
    "Z:MEMBER_OF": getIsMemberOfTypes(),
    "Z:NAMEXTRA_OF": getNameCombinerTypes(),
    "Z:OCCUPATION_OF": getHasOccupationTypes(),
    "Z:OWNS": getOwnsTypes(),
    "Z:PRECEDE_RCNT": getPrecedesRecentlyTypes(),
    "Z:PRIN_ASSOC": getPrincipalsAssociateTypes(),
    "Z:IS_PRINCIPAL": getIsPrincipalPersonTypes(),
    "Z:NUMBER_OF": getQuantityTypes(),
    "E2:HAS_RESPL": getHasResidencePlaceTypes(),
    "R40:IS_SAME_AS": getSameAsTypes(),
    "Z:SUBPLACE_OF": getSubplaceOfTypes(),
    "Z:TITLE_OF": getHasTitleTypes()
  }
  return relationToTypesMap[relationship];
}