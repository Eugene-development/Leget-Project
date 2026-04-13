export class RegionState {
	selectedCountry = $state<string>('Россия');
	hasConfirmedCountry = $state<boolean>(false);
	isCountryModalOpen = $state<boolean>(false);

	init() {
		if (typeof window !== 'undefined') {
			const savedCountry = localStorage.getItem('leget_selected_country');
			if (savedCountry) {
				this.selectedCountry = savedCountry;
			}
			const confirmed = sessionStorage.getItem('leget_bot_filter_confirmed');
			if (confirmed === 'true') {
				this.hasConfirmedCountry = true;
			}
		}
	}

	setCountry(country: string) {
		this.selectedCountry = country;
		if (typeof window !== 'undefined') {
			localStorage.setItem('leget_selected_country', country);
		}
	}

	confirmCountry() {
		this.hasConfirmedCountry = true;
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('leget_bot_filter_confirmed', 'true');
		}
	}
}

export const regionState = new RegionState();
if (typeof window !== 'undefined') {
	regionState.init();
}
