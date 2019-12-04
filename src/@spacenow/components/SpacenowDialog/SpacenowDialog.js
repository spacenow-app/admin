import React from 'react';
import { Dialog } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from 'app/store/actions';

function SpacenowDialog(props) {
  const dispatch = useDispatch();
  const state = useSelector(({ spacenow }) => spacenow.dialog.state);
  const options = useSelector(({ spacenow }) => spacenow.dialog.options);
  return (
    <Dialog
      open={state}
      onClose={(ev) => dispatch(Actions.closeDialog())}
      aria-labelledby='spacenow-dialog-title'
      {...options}
    />
  );
}

export default SpacenowDialog;
