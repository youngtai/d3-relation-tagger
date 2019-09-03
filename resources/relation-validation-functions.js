function buildDisplayedGraph(relationType) {
  function getDisplayRelations() {
    var relations = displayedGraph.relations;
    // remove irrelevant relationships from displayedGraph.relations
    for (var i = relations.length - 1; i>= 0; i--) {
      if (relations[i].type != relationType) {
        relations.splice(i,1);
      }
    }
    // add relevant relations to displayedGraph.relations from editedGraph.relations
    for (i in editedGraph.relations) {
      let relation = editedGraph.relations[i];
      if (!relationInGraph(relation) && (relation.type == relationType) && !/S=\d\+|S=\d/.test(relation.type)) {
        relations.push({type : relation.type, 
                              startToken : relation.startToken, 
                              source : relation.source, 
                              endToken : relation.endToken, 
                              target : relation.target,
                            distance : linkDistance(relation.type)})
      }
    }
    return relations;
  }
  function getDisplayEntities() {
    var entitySet = new Set();
    var entityArray = [];
    // Get entities of correct relation type from displayedGraph
    displayedGraph.relations.forEach(function(relation) {
      if (relation.type == relationType) {
        entitySet.add(relation.source);
        entitySet.add(relation.target);
      }
    });
    // Add in entities of correct relation type from editedGraph
    editedGraph.relations.forEach(function(relation) {
      if (relation.type == relationType) {
        // Add the source and target (have to get them from the editedGraph.entities)
        let source = editedGraph.getEntityById(relation.source);
        let target = editedGraph.getEntityById(relation.target);

        function entityInSet(e) {
          for (let entity of entitySet) {
            if (entity.id == e.id) {
              return true;
            }
          }
          return false;
        }
        // If it's already in the set, we don't add it
        // We can't rely on the set determining uniqueness for us because
        // we are getting different objects that represent the same thing
        // an entity from editedGraph.entity and from displayedGraph.entity
        if (!entityInSet(source)) {
          entitySet.add(source);
        }
        if (!entityInSet(target)) {
          entitySet.add(target);
        }

      }
    });
    // console.log(entitySet);
    // console.log(displayedGraph.entities);
    // console.log(Array.from(entitySet));
    // for (let entity of displayedGraph.entities) {
    //   if (entitySet.has(entity)) {
    //     entityArray.push(entity);
    //   }
    // }
    // return entityArray;
    return Array.from(entitySet);
  }
  displayedGraph.entities = getDisplayEntities();
  displayedGraph.relations = getDisplayRelations();
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
  displayedGraph.relations.forEach(function(relation) {
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
  });
  
  console.log("Checked 'Has Title' relation");
  restart(badRelations);
  // Now we change the styling of the bad entity nodes and bad rel links.
  
  // Styling for nodes/links of bad entities/relations
  console.log("After restart.");
  
}