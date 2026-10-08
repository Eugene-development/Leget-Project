export const contentLoadingContext = Symbol('content-loading');

/** Track independent content loaders without letting an earlier cleanup clear a later one. */
export function createContentLoadingTracker(onChange) {
	const loaders = new Set();

	return {
		start() {
			const loader = Symbol();
			loaders.add(loader);
			onChange(loaders.size);
			return () => {
				if (loaders.delete(loader)) onChange(loaders.size);
			};
		}
	};
}
