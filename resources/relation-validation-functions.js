function buildDisplayedGraph(relationType) {
  var relations = displayedGraph.relations;
  // remove irrelevant relationships from displayedGraph.relations
  for (var i = relations.length - 1; i>= 0; i--) {
    if (relations[i].type != relationType) {
      relations.splice(i,1);
    }
  }
  // add relevant relations to displayedGraph.relations from editedGraph.relations
  for (i in editedGraph.relations) {
    var relation = editedGraph.relations[i];
    if (!relationInGraph(relation) && (relation.type == relationType) && !/S=\d\+|S=\d/.test(relation.type)) {
      relations.push({type : relation.type, 
                            startToken : relation.startToken, 
                            source : relation.source, 
                            endToken : relation.endToken, 
                            target : relation.target,
													distance : linkDistance(relation.type)})
    }
  }
  // return relations;
  displayedGraph.relations = relations;
  displayedGraph.entities = function getDisplayEntities() {
    var entitySet = new Set();
    for (relation of displayedGraph.relations) {
      entitySet.add(relation.source);
      entitySet.add(relation.target);
    }
    console.log(entitySet);
    console.log(Array.from(entitySet));
    return Array.from(entitySet);
  }
}

function checkHasTitle() {
  currentRelationship = "Z:TITLE_OF";
  buildDisplayedGraph("Z:TITLE_OF");
  // displayedGraph.entities = getDisplayEntities();

  // types should contain a list of **invalid** entities for this particular relationship
  // So the entities should NOT be of the following types
  var types = [
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
    "PHONENUMBER",
    "FLORA",
    "QUANTITY",
    "TIME",
    "VEHICLE",
    "WEAPON",
    "URL",
    "WORK_OF_ART"
  ];
  var badRelations = [];
  for (let relation of displayedGraph.relations) {
    // check source and target against all types, for each relation
    for (let type of types) {
      if (relation.source.type == type) {
        badRelations.push([relation, "source"]);
        console.log("Found a bad relation with bad source.");
      }
      if (relation.target.type == type) {
        badRelations.push([relation, "target"]);
        console.log("Found a bad relation with bad target.");
      }
    }
  }
  
  console.log("Checked 'Has Title' relation");
  restart(badRelations);
  // Now we change the styling of the bad entity nodes and bad rel links.
  
  // Styling for nodes/links of bad entities/relations
  
  // if (Array.isArray(badRelations) && badRelations.length) {
  for (badRel of badRelations) {
    let id = "#linkarrayindex" + badRel[0].index;
    console.log("id: " + id);
    d3.select(id).style("stroke","red");
    console.log(d3.select(id));
  }
  // }
}