import React from 'react';
import { Typography, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as Actions from 'app/store/actions';
import * as AuthActions from 'app/auth/store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { SpacenowLayoutConfigs } from '@spacenow';
import clsx from 'clsx';
import _ from '@lodash';

const useStyles = makeStyles(theme => ({
    root: {},
    formControl: {
        margin: '6px 0',
        width: '100%',
        '&:last-child': {
            marginBottom: 0
        }
    },
    group: {},
    formGroupTitle: {
        position: 'absolute',
        top: -10,
        left: 8,
        fontWeight: 600,
        padding: '0 4px',
        backgroundColor: theme.palette.background.paper
    },
    formGroup: {
        position: 'relative',
        border: '1px solid ' + theme.palette.divider,
        borderRadius: 2,
        padding: '12px 12px 0 12px',
        margin: '24px 0 16px 0',
        '&:first-of-type': {
            marginTop: 16
        }
    }
}));

function SpacenowSettings(props) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const themes = useSelector(({ spacenow }) => spacenow.settings.themes);
    const settings = useSelector(({ spacenow }) => spacenow.settings.current);

    const classes = useStyles(props);

    function handleChange(event) {

        const newSettings = _.set(_.merge({}, settings), event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);

        /**
         * If layout style changes,
         * Reset Layout Configuration
         */
        if (event.target.name === 'layout.style' && event.target.value !== settings.layout.style) {
            newSettings.layout.config = {};
        }

        if (user.role === 'guest') {
            dispatch(Actions.setDefaultSettings(newSettings));
        }
        else {
            dispatch(AuthActions.updateUserSettings(newSettings));
        }
    }

    function ThemeSelect({ value, name, handleChange }) {
        return (
            <Select
                className="w-full"
                value={value}
                onChange={handleChange}
                name={name}
            >
                {Object.entries(themes).map(([key, val]) => (
                    <MenuItem
                        key={key} value={key}
                        className="m-8 mt-0 rounded-lg"
                        style={{
                            backgroundColor: val.palette.background.default,
                            color: val.palette.text.primary,
                            border: '1px solid ' + val.palette.divider
                        }}
                    >
                        {_.startCase(key)}
                        <div
                            className="flex w-full h-8 block absolute bottom-0 left-0 right-0"
                            style={{
                                borderTop: '1px solid ' + val.palette.divider
                            }}
                        >
                            <div className="w-1/4 h-8" style={{ backgroundColor: val.palette.primary.main }} />
                            <div className="w-1/4 h-8" style={{ backgroundColor: val.palette.secondary.main }} />
                            <div className="w-1/4 h-8" style={{ backgroundColor: val.palette.error.main }} />
                            <div className="w-1/4 h-8" style={{ backgroundColor: val.palette.background.paper }} />
                        </div>
                    </MenuItem>
                ))}
            </Select>
        );
    }

    const LayoutSelect = () => {
        return (
            <FormControl component="fieldset" className={classes.formControl}>

                <FormLabel component="legend" className="text-14">Style</FormLabel>

                <RadioGroup
                    aria-label="Layout Style"
                    name="layout.style"
                    className={classes.group}
                    value={settings.layout.style}
                    onChange={handleChange}
                >
                    {
                        <FormControlLabel key={SpacenowLayoutConfigs.key} value={SpacenowLayoutConfigs.key} control={<Radio />} label={SpacenowLayoutConfigs.title} />
                    }
                </RadioGroup>
            </FormControl>
        );
    };

    const getForm = (form, prefix) => {
        return Object.entries(form).map(([key, formControl]) => {
            const target = prefix ? prefix + '.' + key : key;
            switch (formControl.type) {
                case 'radio':
                    {
                        return (
                            <FormControl key={target} component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend" className="text-14">{formControl.title}</FormLabel>
                                <RadioGroup
                                    aria-label={formControl.title}
                                    name={`layout.config.${target}`}
                                    className={classes.group}
                                    value={_.get(settings.layout.config, target)}
                                    onChange={handleChange}
                                    row={formControl.options.length < 4}
                                >
                                    {formControl.options.map((opt) => (
                                        <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.name} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        );
                    }
                case 'switch':
                    {
                        return (
                            <FormControl key={target} component="fieldset" className={classes.formControl}>
                                <FormControlLabel
                                    classes={{
                                        // root: "flex-row-reverse justify-end pl-16"
                                    }}
                                    control={
                                        <Switch
                                            name={`layout.config.${target}`}
                                            checked={_.get(settings.layout.config, target)}
                                            onChange={handleChange}
                                            aria-label={formControl.title}
                                        />
                                    }
                                    label={<FormLabel component="legend" className="text-14">{formControl.title}</FormLabel>}
                                />
                            </FormControl>
                        )
                    }
                case 'group':
                    {
                        return (
                            <div key={target} className={classes.formGroup}>

                                <Typography className={classes.formGroupTitle} color="textSecondary">
                                    {formControl.title}
                                </Typography>

                                {
                                    getForm(formControl.children, key)
                                }
                            </div>
                        );
                    }
                default:
                    {
                        return ''
                    }
            }
        });
    };

    function LayoutConfig() {
        const form = SpacenowLayoutConfigs.form;
        return getForm(form);
    }

    return (
        <div className={classes.root}>

            <div className={classes.formGroup}>

                <Typography className={classes.formGroupTitle} color="textSecondary">
                    Layout
                </Typography>

                <LayoutSelect />

                <LayoutConfig />

                <Typography className="my-16 text-12 italic" color="textSecondary">
                    *Not all option combinations are available
                </Typography>

            </div>

            <div className={clsx(classes.formGroup, "pb-16")}>

                <Typography className={classes.formGroupTitle} color="textSecondary">
                    Theme
                </Typography>

                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className="text-14">Main</FormLabel>
                    <ThemeSelect value={settings.theme.main} name="theme.main" handleChange={handleChange} />
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className="text-14">Navbar</FormLabel>
                    <ThemeSelect value={settings.theme.navbar} name="theme.navbar" handleChange={handleChange} />
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className="text-14">Toolbar</FormLabel>
                    <ThemeSelect value={settings.theme.toolbar} name="theme.toolbar" handleChange={handleChange} />
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className="text-14">Footer</FormLabel>
                    <ThemeSelect value={settings.theme.footer} name="theme.footer" handleChange={handleChange} />
                </FormControl>
            </div>

            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className="text-14">Custom Scrollbars</FormLabel>
                <Switch
                    checked={settings.customScrollbars}
                    onChange={handleChange}
                    aria-label="Custom Scrollbars"
                    name="customScrollbars"
                />
            </FormControl>
        </div>
    );
}

export default React.memo(SpacenowSettings);
