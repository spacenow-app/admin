import React from 'react';
import clsx from 'clsx';
import _ from '@lodash';
import Tooltip from '@material-ui/core/Tooltip';

export const statuses = [
  {
    id: 1,
    name: 'Claimed',
    slug: 'claimed',
    color: 'bg-purple text-white'
  },
  {
    id: 2,
    name: 'Active',
    slug: 'active',
    color: 'bg-green text-white'
  },
  {
    id: 3,
    name: 'Deleted',
    slug: 'deleted',
    color: 'bg-pink text-white'
  }
];

function Status(props) {
  return (
    <Tooltip title={props.tooltip || ''}>
      <div
        {...props}
        className={clsx(
          'inline text-12 p-4 rounded truncate',
          _.find(statuses, { name: props.name }).color
        )}
      >
        {props.name}
      </div>
    </Tooltip>
  );
}

export default Status;
