/**
 * Format a date string to a human-readable format
 * @param {string} dateString - Date string in format 'YYYY-MM-DD' or 'YYYY-MM'
 * @returns {string} Formatted date string (e.g., 'January 15, 2024' or 'January 2024')
 */
export function formatDate(dateString) {
	let parts = dateString.split('-');
	let hasDay = parts.length > 2;

	// If it's a full ISO string (contains T) or already has time, use as is.
	// Otherwise, append T00:00:00Z to ensure consistent UTC parsing.
	const date = (dateString.includes('T') || dateString.includes(' '))
		? new Date(dateString)
		: new Date(`${dateString}T00:00:00Z`);

	return date.toLocaleDateString('ru-RU', {
		day: hasDay ? '2-digit' : undefined,
		month: hasDay ? '2-digit' : 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}
