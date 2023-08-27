export default function removeScript(document: any, id: any) {
    const element = document.getElementById(id)
  
    if (element) {
      element.parentNode.removeChild(element)
    };
};