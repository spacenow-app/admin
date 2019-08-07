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
			{
				id: 'managment',
				title: 'Managment',
				type: 'collapse',
				icon: 'dashboard',
				children: [
					{
						id: 'users',
						title: 'Users',
						type: 'item',
						url: '/apps/managment'
					},
				],
			},
		],
	},
];

export default navigationConfig;
