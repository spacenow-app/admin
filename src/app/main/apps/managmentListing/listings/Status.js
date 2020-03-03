import React from 'react';
import clsx from 'clsx';
import _ from '@lodash';
import { Button, Tooltip} from '@material-ui/core';

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
  const status = _.find(statuses, { name: props.name })
  return (
    <Tooltip title={props.tooltip || ''}>
      <Button {...props} className={status && clsx('inline text-12 p-4 rounded truncate', status.color)}>
        {props.name}
      </Button>
    </Tooltip>
  );
}

export default Status;
