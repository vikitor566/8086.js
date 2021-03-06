import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlayCircle,
    faForward,
    faArrowRight,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
    selectCode,
    updateRegisters,
    // updateMemory,
} from '../../slices/emulatorSlice';
import emulator from '../../emulator/emulator';

const useStyles = makeStyles((theme) => ({
    buttonsContainer: {
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: '1.2rem',
    },
    fontAwesomeIcon: {
        width: '3rem',
        height: '2rem',
        outline: 'none',
        display: 'inline-block',
        textAlign: 'center',
        background: 'none',
    },
}));

export default function ButtonsContainer() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const code = useSelector(selectCode);

    const loadCode = () => {
        emulator.loadCode(code);
    };

    const stepClick = () => {
        loadCode();
        emulator.cpu.step();
        dispatch(updateRegisters(emulator.getRegisters()));
        // dispatch(updateMemory(emulator.getMemory()));
    };

    return (
        <div className={classes.buttonsContainer}>
            <button type="button" className={classes.fontAwesomeIcon}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button type="button" className={classes.fontAwesomeIcon}>
                <FontAwesomeIcon icon={faPlayCircle} />
            </button>
            <button type="button" className={classes.fontAwesomeIcon} onClick={stepClick}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button type="button" className={classes.fontAwesomeIcon}>
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
    );
}
