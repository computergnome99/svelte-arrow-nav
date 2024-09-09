import type { Action } from "svelte/action";

export const arrowNav: Action<HTMLElement, number | undefined> = (node, index) => {
  let memory = index;

  const nodeList = (): NodeList => {
    return node.querySelectorAll(
      `a[href]:not([aria-hidden="true"]) ,
       area[href]:not([aria-hidden="true"]) ,
       input:not([type="hidden"]):not([disabled]):not([aria-hidden="true"]) ,
       select:not([disabled]):not([aria-hidden="true"]) ,
       textarea:not([disabled]):not([aria-hidden="true"]) ,
       button:not([disabled]):not([aria-hidden="true"]) ,
       [tabindex]:not([tabindex="-1"]):not([disabled]):not([aria-hidden="true"]) ,
       [contenteditable]:not([disabled]):not([aria-hidden="true"]) `
    );
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey && event.key === 'ArrowUp') || (event.ctrlKey && event.key === 'ArrowLeft') || event.key === 'Home' || event.key === 'PageUp') {
      focusFirst();
    } else if ((event.ctrlKey && event.key === 'ArrowDown') || (event.ctrlKey && event.key === 'ArrowRight') || event.key === 'End' || event.key === 'PageDown') {
      focusLast();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      focusPrevious();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      focusNext();
    }
  }

  const handleFocusOut = (event: FocusEvent) => {
    if (node.contains(event.relatedTarget as HTMLElement)) return;

    if (memory !== undefined) {
      const list = nodeList();
      if (!list || list.length === 0 || memory < 0 || memory > list.length - 1) return;

      const el = list.item(memory) as HTMLElement;
      list.forEach(child => (child as HTMLElement).setAttribute('tabindex', '-1'));
      el.setAttribute('tabindex', '0');
    }
  }

  const focusFirst = () => {
    const list = nodeList();
    if (!list) return;

    const el = list.item(0) as HTMLElement;
    el.focus();
    list.forEach(child => { (child as HTMLElement).setAttribute('tabindex', '-1') })
    el.setAttribute('tabindex', '0');
  }

  const focusLast = () => {
    const list = nodeList();
    if (!list) return;

    const el = list.item(list.length - 1) as HTMLElement;
    el.focus();
    list.forEach(child => { (child as HTMLElement).setAttribute('tabindex', '-1') })
    el.setAttribute('tabindex', '0');
  }

  const focusPrevious = () => {
    const target = document.activeElement;

    const list = nodeList();
    if (!list) return;
    const array = Array.from(list);

    const currentIndex = array.indexOf(target as HTMLElement);

    if (currentIndex <= 0) focusLast();
    else {
      const el = array[currentIndex - 1] as HTMLElement;
      el.focus();
      list.forEach(child => { (child as HTMLElement).setAttribute('tabindex', '-1') })
      el.setAttribute('tabindex', '0');
    }
  }

  const focusNext = () => {
    const target = document.activeElement;

    const list = nodeList();
    if (!list) return;
    const array = Array.from(list);

    const currentIndex = array.indexOf(target as HTMLElement);

    if (currentIndex === -1 || currentIndex === array.length - 1) focusFirst();
    else {
      const el = array[currentIndex + 1] as HTMLElement;
      el.focus();
      list.forEach(child => { (child as HTMLElement).setAttribute('tabindex', '-1') });
      el.setAttribute('tabindex', '0');
    }
  }

  node.addEventListener('keydown', handleKeyDown);
  node.addEventListener('focusout', handleFocusOut);

  if (memory) {
    const list = nodeList();
    if (!list || list.length === 0 || memory < 0 || memory > list.length - 1) return;

    const el = list.item(memory) as HTMLElement;
    list.forEach(child => (child as HTMLElement).setAttribute('tabindex', '-1'));
    el.setAttribute('tabindex', '0');
  }

  return {
    update(index) {
      memory = index;
      if (memory !== undefined) {
        const list = nodeList();
        if (!list || list.length === 0 || memory < 0 || memory > list.length - 1) return;

        const el = list.item(memory) as HTMLElement;
        list.forEach(child => (child as HTMLElement).setAttribute('tabindex', '-1'));
        el.setAttribute('tabindex', '0');
      }
    },

    destroy() {
      node.removeEventListener('keydown', handleKeyDown);
      node.removeEventListener('focusout', handleFocusOut);
    }
  }
}


