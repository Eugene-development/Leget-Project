export class RegionState {
	selectedCity = $state<string>('Москва и МО');
	hasConfirmedCity = $state<boolean>(false);
	isCityModalOpen = $state<boolean>(false);

	init() {
		if (typeof window !== 'undefined') {
			const savedCity = localStorage.getItem('leget_selected_city');
			if (savedCity) {
				this.selectedCity = savedCity;
			}
			const confirmed = sessionStorage.getItem('leget_bot_filter_confirmed');
			if (confirmed === 'true') {
				this.hasConfirmedCity = true;
			}
		}
	}

	setCity(city: string) {
		this.selectedCity = city;
		if (typeof window !== 'undefined') {
			localStorage.setItem('leget_selected_city', city);
		}
	}

	confirmCity() {
		this.hasConfirmedCity = true;
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('leget_bot_filter_confirmed', 'true');
		}
	}
}

export const regionState = new RegionState();
if (typeof window !== 'undefined') {
	regionState.init();
}
