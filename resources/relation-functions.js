// helper functions for loadWholeGraph(), sameAs(), subplaceOf(), etc...
function entityInGraph(entity) {
  for (a in displayedGraph.entities) {
    if ((displayedGraph.entities[a].id == entity.id) && (displayedGraph.entities[a].text == entity.text)) {
      return true;
    }
  }
  return false;
}
function relationInGraph(relation) {
  for (b in displayedGraph.relations) {
    if ((displayedGraph.relations[b].source.id == relation.source) && 
        (displayedGraph.relations[b].target.id == relation.target) && 
        (displayedGraph.relations[b].type == relation.type)) {
      return true;
    }
  }
  return false;
}

var currentRelationship = "UNSELECTED";
function getCurrentRelationship() {
  return currentRelationship;
}

// This displays the entire graph with edits.
function loadWholeGraph() {
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    // is it the correct tag type?
    if (entity.tag == "ENAMEX" || entity.tag == "TIMEX" || entity.tag == "NUMEX") {
      // is it in the displayedGraph?
      if (!entityInGraph(entity)) {
        //var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  displayedGraph.relations = [];
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    // console.log(relationInGraph(relation));
      // if (relation.type == "E2:HAS_RESPL") {
      //   console.log("E2:HAS_RESPL found before if!");
      //   console.log(relationInGraph(relation));
      // }
    if (!relationInGraph(relation) && !/S=\d\+|S=\d/.test(relation.type)) {
      // if (relation.type == "E2:HAS_RESPL") { console.log("E2:HAS_RESPL found inside if!");}
      displayedGraph.relations.push({type : relation.type,
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
                          distance : linkDistance(relation.type)});
    }
  }
  console.log("Showing All Relationships: ");
  // console.log(displayedGraph);
  restart();
  currentRelationship = "UNSELECTED";
}
//--------------------------------------------------------------------------------
//--------------------------------RELATION FILTERS--------------------------------
//--------------------------------------------------------------------------------

function hasStartDate() {
  currentRelationship = "E1:HAS_STDATE";
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "DATE" ||
          entity.type == "DATE.non" ||
          entity.type == "EVENT" || 
          entity.type == "EVENT.rel" || 
          entity.type == "EVENT.xlife" || 
          entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "E1:HAS_STDATE") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "E1:HAS_STDATE") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
                          distance : linkDistance(relation.type)});
    }
  }
  console.log("Updated to 'has start date' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
}

function hasStartPlace() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "COREF.loc" ||
          entity.type == "EVENT" ||
          entity.type == "EVENT.rel" ||
          entity.type == "EVENT.xlife" || 
          entity.type == "PERSON" || 
          entity.type == "LOCALE" || 
          entity.type == "LOCALE.notgpe" ||
          entity.type == "STRUCTURE") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "E1:HAS_ST_PL") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "E1:HAS_ST_PL") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
                          distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has start place' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "E1:HAS_ST_PL";
}

function hasStartTime() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "EVENT" ||
          entity.type == "EVENT.rel" ||
          entity.type == "EVENT.xlife" || 
          entity.type == "PERSON" || 
          entity.type == "TIME") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "E1:HAS_ST_TM") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "E1:HAS_ST_TM") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has start time' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "E1:HAS_ST_TM";
}

function hasEndDate() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "DATE" ||
          entity.type == "DATE.non" ||
          entity.type == "EVENT" || 
          entity.type == "EVENT.rel" || 
          entity.type == "EVENT.xlife" || 
          entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "E3:HAS_ENDDATE") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "E3:HAS_ENDDATE") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has end date' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "E3:HAS_ENDDATE";
}

function hasEndPlace() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "COREF.loc" ||
          entity.type == "EVENT" ||
          entity.type == "EVENT.rel" ||
          entity.type == "EVENT.xlife" || 
          entity.type == "PERSON" || 
          entity.type == "LOCALE" || 
          entity.type == "LOCALE.notgpe" ||
          entity.type == "STRUCTURE") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "E3:HAS_END_PL") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "E3:HAS_END_PL") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has end place' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "E3:HAS_END_PL";
}

function hasEndTime() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "EVENT" ||
          entity.type == "EVENT.rel" ||
          entity.type == "EVENT.xlife" || 
          entity.type == "PERSON" || 
          entity.type == "TIME") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "E3:HAS_END_TM") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "E1:HAS_END_TM") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has end time' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "E1:HAS_END_TM";
}

function hasEvent() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "EVENT.rel" ||
          entity.type == "EVENT.xlife" || 
          entity.type == "COREF" ||
          entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:HAS_EVENT") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:HAS_EVENT") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has event' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:HAS_EVENT";
}

function hasEventFact() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "DATE" ||
          entity.type == "DATE.non" ||
          entity.type == "LOCALE" || 
          entity.type == "LOCALE.notgpe" || 
          entity.type == "PERSON" ||
          entity.type == "TIME") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "E4:HAS_EVENT_FACT") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "E4:HAS_EVENT_FACT") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has event fact' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "E4:HAS_EVENT_FACT";
}

function isEventFact() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERSON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "DATE" ||
          entity.type == "DATE.non" ||
          entity.type == "EVENT" ||
          entity.type == "EVENT.rel" ||
          entity.type == "EVENT.xlife" || 
          entity.type == "LOCALE" ||
          entity.type == "LOCALE.notgpe" ||
          entity.type == "STRUCTURE" || 
          entity.type == "TIME") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "E4:IS_EVENT_FACT") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "E4:IS_EVENT_FACT") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'is event fact' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "E4:IS_EVENT_FACT";
}

function hasSpouse() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "R00:HAS_SPOUSE") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "R00:HAS_SPOUSE") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has spouse' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "R00:HAS_SPOUSE";
}

function hasFather() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "R01:HAS_FATHER") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "R01:HAS_FATHER") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has father' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "R01:HAS_FATHER";
}

function hasMother() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "R02:HAS_MOTHER") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "R02:HAS_MOTHER") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has mother' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "R02:HAS_MOTHER";
}

function ageOf() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "AGE" ||
          entity.type == "STRUCTURE" ||
          entity.type == "ORGANIZATION" ||
          entity.type == "ORGANIZATION.edu" ||
          entity.type == "ORGANIZATION.mil" ||
          entity.type == "ORGANIZATION.music" ||
          entity.type == "ORGANIZATION.pub" ||
          entity.type == "ORGANIZATION.rel" ||
          entity.type == "ORGANIZATION.sports" ||
          entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:AGE_OF") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:AGE_OF") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'age of' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:AGE_OF";
}

function attended() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "ORGANIZATION.edu" ||
          entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:ATTENDED") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:ATTENDED") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'attended' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:ATTENDED";
}

function causedBy() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "EVENT" ||
          entity.type == "EVENT.rel" ||
          entity.type == "EVENT.xlife" || 
          entity.type == "HEALTH_CONDITION" || 
          entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:CAUSED_BY") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:CAUSED_BY") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'caused by' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:CAUSED_BY";
}

function contactInfo() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "STRUCTURE.addr" ||
          entity.type == "STRUCTURE" ||
          entity.type == "ORGANIZATION" ||
          entity.type == "ORGANIZATION.edu" ||
          entity.type == "ORGANIZATION.mil" ||
          entity.type == "ORGANIZATION.music" ||
          entity.type == "ORGANIZATION.pub" ||
          entity.type == "ORGANIZATION.rel" ||
          entity.type == "ORGANIZATION.sports" ||
          entity.type == "PERSON" ||
          entity.type == "URL" ||
          entity.type == "PHONENUMBER") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:'S_CONTACT") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:'S_CONTACT") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'entitie's phone number' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:'S_CONTACT";
}

function created() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "STRUCTURE" ||
          entity.type == "ORGANIZATION" ||
          entity.type == "ORGANIZATION.edu" ||
          entity.type == "ORGANIZATION.mil" ||
          entity.type == "ORGANIZATION.music" ||
          entity.type == "ORGANIZATION.pub" ||
          entity.type == "ORGANIZATION.rel" ||
          entity.type == "ORGANIZATION.sports" ||
          entity.type == "PERSON" ||
          entity.type == "WORK_OF_ART") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:CREATED") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:CREATED") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'created' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:CREATED";
}

function hasDuration() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "EVENT" ||
          entity.type == "EVENT.rel" ||
          entity.type == "EVENT.xlife" ||
          entity.type == "OCCUPATION" ||
          entity.type == "ORGANIZATION" ||
          entity.type == "ORGANIZATION.edu" ||
          entity.type == "ORGANIZATION.mil" ||
          entity.type == "ORGANIZATION.music" ||
          entity.type == "ORGANIZATION.pub" ||
          entity.type == "ORGANIZATION.rel" ||
          entity.type == "ORGANIZATION.sports" ||
          entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:HAS_DURATION") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:HAS_DURATION") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has duration' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:HAS_DURATION";
}

function employedBy() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "COREF" ||
          entity.type == "NONFAMILY" ||
          entity.type == "OCCUPATION" ||
          entity.type == "ORGANIZATION" ||
          entity.type == "ORGANIZATION.edu" ||
          entity.type == "ORGANIZATION.mil" ||
          entity.type == "ORGANIZATION.music" ||
          entity.type == "ORGANIZATION.pub" ||
          entity.type == "ORGANIZATION.rel" ||
          entity.type == "ORGANIZATION.sports" ||
          entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:EMPLOYED_BY") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:EMPLOYED_BY") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'employed by' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:EMPLOYED_BY";
}

function hasFamilyMember() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "FAMILYMEMBER" ||
          entity.type == "NONFAMILY" ||
          entity.type == "COREF" ||
          entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:HASFAMMEMLST") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:HASFAMMEMLST") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'has family member' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:HASFAMMEMLST";
}

function isFemale() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:IS_FEM_FOR") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:IS_FEM_FOR") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'is female' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:IS_FEM_FOR";
}

function isFictional() {
  loadWholeGraph();
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:IS_FICTIONAL") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:IS_FICTIONAL") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'is fictional' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:IS_FICTIONAL";
}

function isMale() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:IS_MALE_FOR") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:IS_MALE_FOR") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'is male' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:IS_MALE_FOR";
}

function isMemberOf() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON" ||
          entity.type == "COREF.loc" ||
          entity.type == "LOCALE" ||
          entity.type == "LOCALE.notgpe" ||
          entity.type == "ORGANIZATION" ||
          entity.type == "ORGANIZATION.edu" ||
          entity.type == "ORGANIZATION.mil" ||
          entity.type == "ORGANIZATION.music" ||
          entity.type == "ORGANIZATION.pub" ||
          entity.type == "ORGANIZATION.rel" ||
          entity.type == "ORGANIZATION.sports" ||
          entity.type == "FAMILYMEMBER" ||
          entity.type == "NONFAMILY" ||
          entity.type == "COREF.gen" ||
          entity.type == "COREF" ||
          entity.type == "VEHICLE" ||
          entity.type == "WEAPON" ||
          entity.type == "ANIMAL") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:MEMBER_OF") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:MEMBER_OF") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'is member of' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:MEMBER_OF";
}

function nameCombiner() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:NAMEXTRA_OF") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:NAMEXTRA_OF") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'name combiner' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:NAMEXTRA_OF";
}

function hasOccupation() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "OCCUPATION" ||
          entity.type == "COREF" ||
          entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:OCCUPATION_OF") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:OCCUPATION_OF") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'occupation of' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:OCCUPATION_OF";
}

function owns() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON" ||
          entity.type == "COREF.loc" ||
          entity.type == "STRUCTURE" || 
          entity.type == "VEHICLE" ||
          entity.type == "WORK_OF_ART" ||
          entity.type == "ORGANIZATION" ||
          entity.type == "ORGANIZATION.edu" ||
          entity.type == "ORGANIZATION.mil" ||
          entity.type == "ORGANIZATION.music" ||
          entity.type == "ORGANIZATION.pub" ||
          entity.type == "ORGANIZATION.rel" ||
          entity.type == "ORGANIZATION.sports" ||
          entity.type == "WEAPON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:OWNS") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:OWNS") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'owns' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:OWNS";
}

function precedesRecently() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERSON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "DATE" ||
          entity.type == "DATE.non") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:PRECEDE_RCNT") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:PRECEDE_RCNT") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'precedes recently' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:PRECEDE_RCNT";
}

function principalsAssociate() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:PRIN_ASSOC") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:PRIN_ASSOC") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'principal's associate' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:PRIN_ASSOC";
}

function isPrincipalPerson() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:IS_PRINCIPAL") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:IS_PRINCIPAL") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'is principal person' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:IS_PRINCIPAL";
}

function quantity() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERSON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "QUANTITY" ||
          entity.type == "FAMILYMEMBER" ||
          entity.type == "NONFAMILY" || 
          entity.type == "STRUCTURE" || 
          entity.type == "VEHICLE" ||
          entity.type == "WEAPON" ||
          entity.type == "WORK_OF_ART") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:NUMBER_OF") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:NUMBER_OF") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'quantity' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:NUMBER_OF";
}

function hasResidencePlace() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON" ||
          entity.type == "COREF" ||
          entity.type == "LOCALE" ||
          entity.type == "LOCALE.notgpe" || 
          entity.type == "STRUCTURE" || 
          entity.type == "STRUCTURE.addr") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "E2:HAS_RESPL") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "E2:HAS_RESPL") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'residence place' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "E2:HAS_RESPL";
}

function subplaceOf() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERSON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "STRUCTURE.addr" ||
          entity.type == "COREF.loc" ||
          entity.type == "LOCALE" || 
          entity.type == "LOCALE.notgpe" || 
          entity.type == "STRUCTURE" || 
          entity.type == "ORGANIZATION" || 
          entity.type == "ORGANIZATION.edu" || 
          entity.type == "ORGANIZATION.mil" || 
          entity.type == "ORGANIZATION.music" || 
          entity.type == "ORGANIZATION.pub" || 
          entity.type == "ORGANIZATION.rel" || 
          entity.type == "ORGANIZATION.sports" ||
          entity.type == "ETPLACE") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:SUBPLACE_OF") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:SUBPLACE_OF") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated 'is subplace of' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  //var numberOfEntities = displayedGraph.entities.length;
  restart();
  currentRelationship = "Z:SUBPLACE_OF";
}

function sameAs() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TITLEFPH") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "STRUCTURE.addr" ||
          entity.type == "ANIMAL" ||
          entity.type == "CHEMICAL" ||
          entity.type == "COREF.gen" ||
          entity.type == "COREF.loc" ||
          entity.type == "COREF.dat" ||
          entity.type == "COREF" ||
          entity.type == "DATE" ||
          entity.type == "DATE.non" ||
          entity.type == "ITE.et" ||
          entity.type == "FAMILYMEMBER" ||
          entity.type == "NONFAMILY" ||
          entity.type == "FOOD_DRINK" ||
          entity.type == "GAME" ||
          entity.type == "ITE.gpe" ||
          entity.type == "ITE.notgpe" ||
          entity.type == "ITE.org" ||
          entity.type == "LOCALE" ||
          entity.type == "LOCALE.notgpe" ||
          entity.type == "STRUCTURE" ||
          entity.type == "ORGANIZATION" ||
          entity.type == "ORGANIZATION.edu" ||
          entity.type == "ORGANIZATION.mil" ||
          entity.type == "ORGANIZATION.music" ||
          entity.type == "ORGANIZATION.pub" ||
          entity.type == "ORGANIZATION.rel" ||
          entity.type == "ORGANIZATION.sports" ||
          entity.type == "ETPLACE" ||
          entity.type == "PERSON" ||
          entity.type == "FLORA" ||
          entity.type == "TIME" ||
          entity.type == "VEHICLE" ||
          entity.type == "WEAPON" ||
          entity.type == "WORK_OF_ART") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }

  // remove irrelevant relationships from displayedGraph.relations
  // for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
  //   if (displayedGraph.relations[i].type != "R40:IS_SAME_AS") {
  //     displayedGraph.relations.splice(i,1);
  //   }
  // }
  // clear out all relations from displayedGraph (we could have some in here if Show "Same As" button is in a toggled state.)
  displayedGraph.relations = [];
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "R40:IS_SAME_AS") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated 'is same as' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "R40:IS_SAME_AS";
}

function hasTitle() {
  // remove irrelevant entities from displayedGraph.entities
  for (var i = displayedGraph.entities.length - 1; i>= 0; i--) {
    if (displayedGraph.entities[i].type == "STRUCTURE.addr") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "AGE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ANIMAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "CHEMICAL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.gen") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.loc") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF.dat") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "COREF") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DATE.non") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "DURATANNIV") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "EVENT.xlife") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.et") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FAMILYMEMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "NONFAMILY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FOOD_DRINK") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "GAME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "HEALTH_CONDITION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.gpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ITE.org") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "LOCALE.notgpe") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "STRUCTURE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "MONEY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "OCCUPATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.edu") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.mil") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.music") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.pub") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.rel") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ORGANIZATION.sports") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "ETPLACE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PERCENT") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "PHONENUMBER") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "FLORA") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "QUANTITY") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "TIME") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "VEHICLE") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WEAPON") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "URL") { displayedGraph.entities.splice(i,1);
    } else if (displayedGraph.entities[i].type == "WORK_OF_ART") { displayedGraph.entities.splice(i,1);
    }
  }
  // add relevant entities to displayedGraph.entities
  for (i in editedGraph.entities) {
    var entity = editedGraph.entities[i];
    if (!entityInGraph(entity)) {
      if (entity.type == "PERSON" ||
          entity.type == "TITLE" ||
          entity.type == "TITLEFPH") {
        // var textentity = entity.text.replace(/ \n/g, " ").replace(/\n/g, " ");
        displayedGraph.entities.push({tag : entity.tag, type : entity.type, text : entity.text, id : entity.id, arrayindex : entity.arrayindex});
      }
    }
  }
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = displayedGraph.relations.length - 1; i>= 0; i--) {
    if (displayedGraph.relations[i].type != "Z:TITLE_OF") {
      displayedGraph.relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == "Z:TITLE_OF") && !/S=\d\+|S=\d/.test(relation.type)) {
      displayedGraph.relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  console.log("Updated to 'title of' displayedGraph:");
  // console.log(displayedGraph);
  // simulation.force("x", d3.forceX().strength(.020))
  //           .force("y", d3.forceY().strength(.020));
  // edit link strength to be stronger
  restart();
  currentRelationship = "Z:TITLE_OF";
}