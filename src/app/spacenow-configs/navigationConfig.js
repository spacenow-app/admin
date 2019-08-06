const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				type: 'item',
				icon: 'dashboard',
				url: '/apps/dashboard',
			},
		],
	},
];

export default navigationConfig;
