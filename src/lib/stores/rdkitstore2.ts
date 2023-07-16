import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { RDKitModule } from '$lib/rdkitTypes';

type RDKit = RDKitModule | null;
type RDKitSS = Writable<RDKit>;
export const RDKitSS: RDKitSS = writable(null);
