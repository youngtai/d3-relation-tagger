## patmatJr, or **R**elationship **A**nnotator **T**ool (RAT)
Hoping to be a GedcomX entity and relation visualizer and editor
---
## Notes on the underlying data model
- There are three "graphs":
  - Original Graph: the one made from the GedcomX file, without any edits
    - This one remains untouched throughout. We may be able to get rid of it at some point.
  - Edited Graph: the one we actually make changes to, and that will be used to export to a new file with new relations.
  - Displayed Graph: this one is underlying what is displayed, showing a subset of nodes and links from the *edited graph*.
---
### To-do list
- Fix same-as grouping
- Fix convex hull disappearing when links are added or removed.
- Highlight only a subset of entities in the nbx - matching the nodes that are shown.
- Use a window to view entities in a subset of the text (showing the corresponding subset of nodes) The value here is that very large documents have too many entities.
  - This won't work for relationships that span across an entire document, like "same as" relationships.
- Use brushing to quickly select multiple nodes.
- Allow scroll input to control link length (may help to allow easier inspection of complicated graphs)
- Scrolling on the text area to change font size of nbx text.
- A button and/or hotkey to pause the animation. Everytime a link is cut the nodes move around a bunch, when I'd prefer they mostly stay put. Consider using a red/green indicator (stoplight)
- Refactor
  - Remove global variables.
  - Move repeated code into functions.
