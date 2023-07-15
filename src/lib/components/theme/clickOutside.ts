export function clickOutside(element: HTMLElement, callbackFunction: any) {
	function onClick(event: MouseEvent) {
		if (!element.contains(event.target)) {
			callbackFunction();
		}
	}

	document.addEventListener('click', onClick);

	return {
		update(newCallbackFunction: any) {
			callbackFunction = newCallbackFunction;
		},
		destroy() {
			document.removeEventListener('click', onClick);
		}
	};
}
