import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {default as MDialog} from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

const Dialog = ({title, message, active, onClose, onAccept}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(active);
    }, [active]);
    
    const handleClose = () => {
        onClose();
    }
    return (
        <MDialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={onAccept}>Sim, Cancelar</Button>
                <Button color="primary" onClick={handleClose}>Não cancelar</Button>
            </DialogActions>
        </MDialog>
    )
}

Dialog.propTypes = {
  active: PropTypes.bool,
  message: PropTypes.string,
  onAccept: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string
}

export default Dialog
