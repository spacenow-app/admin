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
				id: 'managmentFee',
				title: 'Managment Fee',
				type: 'item',
				icon: 'dashboard',
				url: '/apps/managmentFee',
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
						url: '/apps/managment/users',
						exact: true
					},
					{
						id: 'newUsers',
						title: 'New User',
						type: 'item',
						url: '/apps/managment/users/new',
						exact: true
						
					}
				],
			},
			{
				id: 'managmentListing',
				title: 'Manage Listing',
				type: 'collapse',
				icon: 'dashboard',
				//url: '/apps/managmentListing/users',
				children: [
					{
						id: 'Listings',
						title: 'Listings',
						type: 'item',
						url: '/apps/managmentListing/listings',
						exact: true
					},
					// {
					// 	id: 'newUsers',
					// 	title: 'New User',
					// 	type: 'item',
					// 	url: '/apps/managment/users/new',
					// 	exact: true
						
					// }
				],
			},
		],
	},
];

export default navigationConfig;
