/** @type {Record<string, string>} */
const translated = {
	'/en/about': '/en/about',
	'/de/ueber-uns': '/de/about',
	'/fr/a-propos': '/fr/about',
};

/** @type {import('@sveltejs/kit').Reroute} */
export function reroute(event) {
	if (event.url.pathname in translated) {
		return translated[event.url.pathname];
	}
}

