import { createPopper } from '@popperjs/core';
import type { StrictModifiers, Modifier } from '@popperjs/core';

type CustomModifier = Modifier<'custom', { customOption: string }>;
type ExtendedModifiers = StrictModifiers | $Shape<CustomModifier>;

/*
from popper docs

const instance = createPopper(reference, popper)
instance.setOptions(options) {}
instance.destroy()

type Instance = { ...,
                destroy: () => void,
                setOptions: ( options: $Shape<Options>),
                }
type Options = { placement: Placement, etc }

*/

export default function createPopperAction() {
	let popperElement: HTMLElement | null, popperTooltip: HTMLElement | null, popperParams;
	let popper: any;

	function initializePopper() {
		if (popperElement && popperTooltip) {
			popper = createPopper<ExtendedModifiers>(popperElement, popperTooltip, popperParams);
		}
	}

	function destroyPopper() {
		if (popper) {
			popper.destroy();
			popper = null;
		}
	}

	function usePopperElement(element: HTMLElement | null) {
		popperElement = element;
		initializePopper();
		return {
			destroy() {
				popperElement = null;
				destroyPopper();
			}
		};
	}
	function usePopperTooltip(element: HTMLElement | null, params: { placement: string } | null) {
		popperTooltip = element;
		popperParams = params;
		initializePopper();

		return {
			update(newParams) {
				popperParams = newParams;
				popper.setOptions(popperParams);
			},
			destroy() {
				popperTooltip = null;
				destroyPopper();
			}
		};
	}
	return [usePopperElement, usePopperTooltip];
}
