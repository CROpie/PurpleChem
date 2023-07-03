// didn't end up using this file
// can use it to move context logic to one location

import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';
import type { ActiveId, ActiveIdContext } from './types';

const activeComponentId = writable<ActiveId>(null);

export function setAccordionOptions() {
	setContext<ActiveIdContext>('active', activeComponentId);
}

export function getAccordionOptions() {
	const activeComponentId = getContext<ActiveIdContext>('active');
	return { activeComponentId };
}
