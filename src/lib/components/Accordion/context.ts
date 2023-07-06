import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';
import type { AccordionOptions, ActiveId, ColapseContext, ActiveIdContext } from './types';

const activeComponentId = writable<ActiveId>(null);

export function setAccordionOptions({ colapse }: AccordionOptions) {
	setContext<ColapseContext>('colapse', colapse);
	setContext<ActiveIdContext>('active', activeComponentId);
}

export function getAccordionOptions() {
	const colapse = getContext<ColapseContext>('colapse');
	const activeComponentId = getContext<ActiveIdContext>('active');
	return { colapse, activeComponentId };
}
