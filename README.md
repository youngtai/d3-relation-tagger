## **R**elationship **A**nnotator **T**ool (RAT)
Tool for annotating entity relationships from text data.
---
## Notes on the underlying data model
- There are three "graphs":
  - Original Graph: the one made from the GedcomX file, without any edits
    - This one remains untouched throughout. We may be able to get rid of it at some point.
  - Edited Graph: the one we actually make changes to, and that will be used to export to a new file with new relations.
  - Displayed Graph: this one is underlying what is displayed, showing a subset of nodes and links from the *edited graph*.
---
### To-do list
- Fix same-as grouping (disjoin union)
- Use brushing to quickly select multiple nodes.
- Allow scroll input to control link length (may help to allow easier inspection of complicated graphs)
- Swiping across a link to cut (rather than clicking over a small target)
- Refactor
  - Remove global variables (WIP)
  - Move repeated code into functions (WIP)
