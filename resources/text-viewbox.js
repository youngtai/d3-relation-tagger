function enableTextViewboxDrag(box) {
  var pos2 = 0, pos4 = 0;
  document.getElementById("viewbox-grab-area").onmousedown = dragMouseDown;

  var topPanelDiv = document.getElementById("top-panel");
  var svgDiv = document.getElementById("svg-container");

  var topLimit = svgDiv.offsetTop;
  var bottomLimit = svgDiv.offsetTop + svgDiv.offsetHeight;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;
    if ( (box.offsetTop + box.offsetHeight) >= bottomLimit) {
      box.style.top = (bottomLimit - box.offsetHeight - 1) + "px";
    } else if (box.offsetTop <= topLimit) {
      box.style.top = (topLimit + 1) + "px";
    } else {
      box.style.top = (box.offsetTop - pos2) + "px";
    }

    // let rebuiltGraph = rebuildDisplayedGraph();
    // displayedGraph.entities = rebuiltGraph[0];
    // displayedGraph.relations = rebuiltGraph[1];
    restart();
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
// Make a viewbox over the nbx text. Only entities completely under the viewBox are displayed as nodes
var viewboxResizeObserver;
function textVB() {
  var textDiv = document.getElementById("text-div");
  var vbWidth = textDiv.offsetWidth;
  var box = document.createElement("div");
  box.setAttribute("id", "text-viewbox");
  // box.setAttribute("position", "absolute");
  // box.setAttribute("border", "2px solid #000");
  // box.style.width = (vbWidth - 15) + "px";
  box.style.width = "30.25%";
  box.style.height = "25%";
  box.style.top = "5.7%";
  box.style.left = "3px";
  box.style.pointerEvents = "none";
  document.getElementById("text-container").append(box);
  
  var boxGrabArea = document.createElement("div");
  boxGrabArea.setAttribute("id", "viewbox-grab-area");
  boxGrabArea.style.backgroundColor = "rgb(79,81,80)";
  boxGrabArea.style.cursor = "move";
  boxGrabArea.style.height = "25px";
  boxGrabArea.style.pointerEvents = "auto";
  boxGrabArea.style.opacity = ".7";
  document.getElementById("text-viewbox").append(boxGrabArea);
  enableTextViewboxDrag(box);
  makeviewboxResizeObserver();
}
function rebuildDisplayedGraph() {
  // get an array of elements in the nbx that are covered by the text-viewbox
  function getCoveredElements() {
    function isOverlappedByViewBox(element) {
      var viewBoxElement = document.getElementById("text-viewbox");
      if (typeof viewBoxElement === "undefined" || viewBoxElement === null) {
        return false;
      }
      var viewBoxTop = viewBoxElement.getBoundingClientRect().top;
      var viewBoxBottom = viewBoxElement.getBoundingClientRect().bottom;
      var elementTop = element.getBoundingClientRect().top;
      var elementBottom = element.getBoundingClientRect().bottom;

      if (viewBoxTop <= elementTop && viewBoxBottom >= elementBottom) {
        return true;
      } else {
        return false;
      }
    }
    var allElements = document.querySelectorAll(".ENAMEX, .TIMEX, .NUMEX");
    var displayedElements = [];
    allElements.forEach(function(element) {
      if (element.style.backgroundColor != "") {
        displayedElements.push(element);
      }
    });
    var coveredElements = [];
    for (let element of displayedElements) {
      if (isOverlappedByViewBox(element)) {
        coveredElements.push(element);
      }
    }
    return coveredElements;
  }
  var coveredEntities = [];
  for(element of getCoveredElements()) {
    // a round-about way to get the "id" of the entity corresponding to the entity tag element
    let id = editedGraph.entities[element.id].id;
    // we first look in the displayedGraph for the entity, for a smoother animation (update selection)
    let entity = displayedGraph.getEntityById(id); 
    if (entity != null) {
      coveredEntities.push(entity);
    } else {
      // now we check editedGraph (enter selection)
      entity = editedGraph.entities[element.id];
      coveredEntities.push({
        arrayindex : entity.arrayindex,
        id : entity.id,
        index : entity.index,
        tag : entity.tag,
        text : entity.text,
        type : entity.type
      });
    }
  }
  var updatedRelations = [];
  var relations = displayedGraph.filterRelationsByType(getCurrentRelationship());
  for (relation of relations) {
    if ( coveredEntities.includes(relation.source) && coveredEntities.includes(relation.target) ) {
      updatedRelations.push(relation);
    }
  }
  
  /* check if a relation from editedGraph.relations is in updatedRelations. Thus far, 
  if updatedRelations is nonempty, it should contain relations from displayedGraph,
  meaning source and target are objects, not just ids. */
  function contains(set, element) {
    for (thing of set) {
      if ( (thing.source.id == element.source) && (thing.target.id == element.target) ) {
        return true;
      }
    }
    return false;
  }
  function covered(relation) {
    function sourceCovered() {
      for (entity of coveredEntities) {
        if (entity.id == relation.source) {
          return true;
        }
      }
      return false;
    }
    function targetCovered() {
      for (entity of coveredEntities) {
        if (entity.id == relation.target) {
          return true;
        }
      }
      return false;
    }
    if (sourceCovered() && targetCovered()) {
      return true;
    } else {
      return false;
    }
  }
  relations = editedGraph.filterRelationsByType(getCurrentRelationship());
  for (relation of relations) {
    if (!contains(updatedRelations, relation)) {
      if (covered(relation))
        updatedRelations.push({
          linkId : relation.linkId,
          type : relation.type,
          startToken : relation.startToken,
          source : relation.source,
          endToken : relation.endToken,
          target : relation.target,
          distance : linkDistance(relation.type)
        });
    }
  }
  return [coveredEntities, updatedRelations];
}

function makeviewboxResizeObserver() {
  viewboxResizeObserver = new ResizeObserver(entries => {
    restart();
  });
  viewboxResizeObserver.observe(document.getElementById("text-viewbox"));
}
function toggleViewbox() {
  var element = document.getElementById("toggle-viewbox");
  var borderStyle = window.getComputedStyle(element).getPropertyValue("border-top-style");
  if (borderStyle == "solid") {
    toggleViewboxOff();
    showUpdatedGraph(getCurrentRelationship());
  } else {
    toggleViewboxOn();
  }
}
function toggleViewboxOn() {
  document.getElementById("toggle-viewbox").style.border = "0px solid #cc3333";
  document.getElementById("toggle-viewbox").style.backgroundColor = "#40c702";
  document.getElementById("toggle-viewbox").style.color = "#ffffff";
  textVB();
}
function toggleViewboxOff() {
  document.getElementById("toggle-viewbox").style.border = "none";
  document.getElementById("toggle-viewbox").style.backgroundColor = "";
  document.getElementById("toggle-viewbox").style.color = "";
  // how do I disconnect the resize observer? (made global)
  viewboxResizeObserver.disconnect();
  document.getElementById("text-viewbox").remove(); 
}
function viewboxOnScroll() {
  if (document.getElementById("text-viewbox")) {
    restart();
  }
}
function setToggleViewboxButtonVisibility() {
  if (getCurrentRelationship() == "UNSELECTED") {
    document.getElementById("toggle-viewbox").style.display = "none";
  } else {
    document.getElementById("toggle-viewbox").style.display = "block";
  }
}
function viewboxToggledOn() {
  var vb = document.getElementById("toggle-viewbox");
  if (vb.style.border == "" || vb.style.border == "none") {
    return false;
  } else {
    return true;
  }
}
// Some global variables
var linkId = 0;
function getLinkId(option) {
  if (option == "no increment") {
    return linkId;
  } else {
    linkId = linkId + 1;
    return linkId;
  }
}