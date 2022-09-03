/**
 * It takes a DOM Element as an argument and removes all of its children.
 */
const emptyElement = element => {
  if (element instanceof Element) {
    while (element.firstElementChild) {
      element.removeChild(element.firstElementChild);
    }
  } else {
    console.error("Please provide a valid DOM Element as an argument");
  }
};
