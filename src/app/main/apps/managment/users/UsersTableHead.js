import React from 'react';
import {
	TableHead,
	TableSortLabel,
	TableCell,
	TableRow,
	Tooltip,
} from '@material-ui/core';

const rows = [
	{
		id: 'avatar',
		align: 'left',
		disablePadding: true,
		label: '',
		sort: false,
	},
	{
		id: 'profileId',
		align: 'left',
		disablePadding: false,
		label: 'Profile id',
		sort: true,
	},
	{
		id: 'firstName',
		align: 'left',
		disablePadding: false,
		label: 'First name',
		sort: true,
	},
	{
		id: 'lastName',
		align: 'left',
		disablePadding: false,
		label: 'Last name',
		sort: true,
	},

	{
		id: 'email',
		align: 'left',
		disablePadding: false,
		label: 'Email',
		sort: true,
	},

	{
		id: 'phoneNumber',
		align: 'left',
		disablePadding: false,
		label: 'Phone number',
		sort: true,
	},
	{
		id: 'createdDate',
		align: 'left',
		disablePadding: false,
		label: 'Created Date',
		sort: true,
	},
	{
		id: 'action',
		align: 'left',
		disablePadding: false,
		label: 'Action',
		sort: true,
	},
	{
		id: 'provider',
		align: 'left',
		disablePadding: false,
		label: 'Provider',
		sort: true,
	},
	{
		id: 'emailConfirmed',
		align: 'center',
		disablePadding: false,
		label: 'Email Confirmed',
		sort: true,
	},
];

function UsersTableHead(props) {

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow className='h-64'>
				{rows.map(row => {
					return (
						<TableCell
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={
								props.order.id === row.id ? props.order.direction : false
							}
						>
							{row.sort && (
								<Tooltip
									title='Sort'
									placement={
										row.align === 'right' ? 'bottom-end' : 'bottom-start'
									}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default UsersTableHead;
