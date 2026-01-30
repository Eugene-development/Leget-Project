<script>
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/Container.svelte';
	import FadeIn from '$lib/components/FadeIn.svelte';
	import Offices from '$lib/components/Offices.svelte';
	import PageIntro from '$lib/components/PageIntro.svelte';
	import SocialMedia from '$lib/components/SocialMedia.svelte';

	// Form state
	let formData = $state({
		name: '',
		email: '',
		company: '',
		phone: '',
		message: '',
		budget: ''
	});

	// Validation errors
	let errors = $state({
		name: '',
		email: '',
		message: ''
	});

	// Form submission state
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);

	// Generate unique IDs for form fields
	let nameId = $state('');
	let emailId = $state('');
	let companyId = $state('');
	let phoneId = $state('');
	let messageId = $state('');

	$effect(() => {
		nameId = crypto.randomUUID();
		emailId = crypto.randomUUID();
		companyId = crypto.randomUUID();
		phoneId = crypto.randomUUID();
		messageId = crypto.randomUUID();
	});

	// Validate email format
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Validate form
	function validateForm() {
		let isValid = true;
		errors = { name: '', email: '', message: '' };

		if (!formData.name.trim()) {
			errors.name = 'Name is required';
			isValid = false;
		}

		if (!formData.email.trim()) {
			errors.email = 'Email is required';
			isValid = false;
		} else if (!isValidEmail(formData.email)) {
			errors.email = 'Please enter a valid email address';
			isValid = false;
		}

		if (!formData.message.trim()) {
			errors.message = 'Message is required';
			isValid = false;
		}

		return isValid;
	}

	// Handle form submission
	function handleSubmit(event) {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		isSubmitting = true;

		// Simulate form submission
		setTimeout(() => {
			isSubmitting = false;
			submitSuccess = true;
			// Reset form
			formData = {
				name: '',
				email: '',
				company: '',
				phone: '',
				message: '',
				budget: ''
			};
		}, 1000);
	}

	// Email contacts data
	const emailContacts = [
		{ label: 'Careers', email: 'careers@studioagency.com' },
		{ label: 'Press', email: 'press@studioagency.com' }
	];
</script>

<svelte:head>
	<title>Contact Us - Studio</title>
	<meta name="description" content="Let's work together. We can't wait to hear from you." />
</svelte:head>

<PageIntro eyebrow="Contact us" title="Let's work together">
	<p>We can't wait to hear from you.</p>
</PageIntro>

<Container class="mt-24 sm:mt-32 lg:mt-40">
	<div class="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
		<!-- Contact Form -->
		<FadeIn class="lg:order-last">
			<form onsubmit={handleSubmit}>
				<h2 class="font-display text-base font-semibold text-neutral-950">Work inquiries</h2>

				{#if submitSuccess}
					<div class="mt-6 rounded-2xl bg-green-50 p-6 text-green-800">
						<p class="font-semibold">Thank you for your message!</p>
						<p class="mt-2">We'll get back to you as soon as possible.</p>
					</div>
				{:else}
					<div class="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
						<!-- Name Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="text"
								id={nameId}
								name="name"
								autocomplete="name"
								placeholder=" "
								bind:value={formData.name}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition first:rounded-t-2xl last:rounded-b-2xl focus:border-neutral-950 focus:outline-hidden focus:ring-neutral-950/5"
								class:border-red-500={errors.name}
							/>
							<label
								for={nameId}
								class="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Name
							</label>
							{#if errors.name}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.name}</p>
							{/if}
						</div>

						<!-- Email Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="email"
								id={emailId}
								name="email"
								autocomplete="email"
								placeholder=" "
								bind:value={formData.email}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition first:rounded-t-2xl last:rounded-b-2xl focus:border-neutral-950 focus:outline-hidden focus:ring-neutral-950/5"
								class:border-red-500={errors.email}
							/>
							<label
								for={emailId}
								class="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Email
							</label>
							{#if errors.email}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.email}</p>
							{/if}
						</div>

						<!-- Company Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="text"
								id={companyId}
								name="company"
								autocomplete="organization"
								placeholder=" "
								bind:value={formData.company}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition first:rounded-t-2xl last:rounded-b-2xl focus:border-neutral-950 focus:outline-hidden focus:ring-neutral-950/5"
							/>
							<label
								for={companyId}
								class="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Company
							</label>
						</div>

						<!-- Phone Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="tel"
								id={phoneId}
								name="phone"
								autocomplete="tel"
								placeholder=" "
								bind:value={formData.phone}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition first:rounded-t-2xl last:rounded-b-2xl focus:border-neutral-950 focus:outline-hidden focus:ring-neutral-950/5"
							/>
							<label
								for={phoneId}
								class="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Phone
							</label>
						</div>

						<!-- Message Input -->
						<div class="group relative z-0 transition-all focus-within:z-10">
							<input
								type="text"
								id={messageId}
								name="message"
								placeholder=" "
								bind:value={formData.message}
								class="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition first:rounded-t-2xl last:rounded-b-2xl focus:border-neutral-950 focus:outline-hidden focus:ring-neutral-950/5"
								class:border-red-500={errors.message}
							/>
							<label
								for={messageId}
								class="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
							>
								Message
							</label>
							{#if errors.message}
								<p class="absolute -bottom-5 left-6 text-sm text-red-500">{errors.message}</p>
							{/if}
						</div>

						<!-- Budget Radio Buttons -->
						<div
							class="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl"
						>
							<fieldset>
								<legend class="text-base/6 text-neutral-500">Budget</legend>
								<div class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
									<label class="flex gap-x-3">
										<input
											type="radio"
											name="budget"
											value="25"
											bind:group={formData.budget}
											class="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-hidden checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
										/>
										<span class="text-base/6 text-neutral-950">$25K – $50K</span>
									</label>
									<label class="flex gap-x-3">
										<input
											type="radio"
											name="budget"
											value="50"
											bind:group={formData.budget}
											class="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-hidden checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
										/>
										<span class="text-base/6 text-neutral-950">$50K – $100K</span>
									</label>
									<label class="flex gap-x-3">
										<input
											type="radio"
											name="budget"
											value="100"
											bind:group={formData.budget}
											class="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-hidden checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
										/>
										<span class="text-base/6 text-neutral-950">$100K – $150K</span>
									</label>
									<label class="flex gap-x-3">
										<input
											type="radio"
											name="budget"
											value="150"
											bind:group={formData.budget}
											class="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-hidden checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
										/>
										<span class="text-base/6 text-neutral-950">More than $150K</span>
									</label>
								</div>
							</fieldset>
						</div>
					</div>

					<Button type="submit" class="mt-10" disabled={isSubmitting}>
						{#if isSubmitting}
							Sending...
						{:else}
							Let's work together
						{/if}
					</Button>
				{/if}
			</form>
		</FadeIn>

		<!-- Contact Details -->
		<FadeIn>
			<h2 class="font-display text-base font-semibold text-neutral-950">Our offices</h2>
			<p class="mt-6 text-base text-neutral-600">
				Prefer doing things in person? We don't but we have to list our addresses here for legal
				reasons.
			</p>

			<Offices class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

			<Border class="mt-16 pt-16">
				<h2 class="font-display text-base font-semibold text-neutral-950">Email us</h2>
				<dl class="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
					{#each emailContacts as contact}
						<div>
							<dt class="font-semibold text-neutral-950">{contact.label}</dt>
							<dd>
								<a
									href="mailto:{contact.email}"
									class="text-neutral-600 hover:text-neutral-950"
								>
									{contact.email}
								</a>
							</dd>
						</div>
					{/each}
				</dl>
			</Border>

			<Border class="mt-16 pt-16">
				<h2 class="font-display text-base font-semibold text-neutral-950">Follow us</h2>
				<SocialMedia class="mt-6" />
			</Border>
		</FadeIn>
	</div>
</Container>
