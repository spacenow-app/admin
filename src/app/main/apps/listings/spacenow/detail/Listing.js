import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Switch, ListItemSecondaryAction, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography, Paper, InputBase, IconButton, Divider, FormControl, InputLabel, Select, OutlinedInput } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import { SpacenowAnimate, SpacenowPageCarded, SpacenowUtils } from '@spacenow';
import { useForm } from '@spacenow/hooks';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "auto",
    },
    rootList: {
        display: 'flex',
        flexFlow: "column",
        width: "50%",
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    input: {
        margin: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    listingImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    listingImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    listingImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $listingImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $listingImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $listingImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

const Listing = (props) => {

    const dispatch = useDispatch();
    const { listing, rules, amenities } = useSelector(({ listings }) => listings.listings)

    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);
    const [checkedRules, setCheckedRules] = React.useState([]);
    const [checkedAmenities, setCheckedAmenities] = React.useState([]);
    const [handleBookingPeriod, setHandleBookingPeriod] = React.useState(false);
    const { form, handleChange, setForm } = useForm(null);

    useEffect(() => {
        dispatch(Actions.getRules());
        listing.data && dispatch(Actions.getAmenities(listing.data.settingsParent.subcategory.id));
        listing.data && dispatch(Actions.getSpecifications(listing.data.settingsParent.id));
        listing.data && dispatch(Actions.getAvailabilities(listing.data.id));
    }, [dispatch, listing])

    useEffect(() => {
        const _updateListingState = () => {
            const params = props.match.params;
            const { listingId } = params;
            if (listingId === 'new') {
                dispatch(Actions.newListing());
            }
            else {
                dispatch(Actions.getListingById(props.match.params));
            }
        }

        _updateListingState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (listing.data && !form) ||
            (listing.data && form && listing.data.id !== form.id)
        ) {
            setForm(listing.data);
        }
    }, [form, listing.data, setForm]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    const handleToggleRules = value => () => {
        const currentIndex = checkedRules.indexOf(value);
        const newChecked = [...checkedRules];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedRules(newChecked);
    };

    const handleToggleAmenities = value => () => {
        const currentIndex = checkedAmenities.indexOf(value);
        const newChecked = [...checkedAmenities];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedAmenities(newChecked);
    };

    function handleChipChange(value, name) {
        setForm(_.set({ ...form }, name, value.map(item => item.value)));
    }

    function setFeaturedImage(id) {
        setForm(_.set({ ...form }, 'featuredImageId', id));
    }

    function handleUploadChange(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = () => {
            setForm(_.set({ ...form }, `images`,
                [
                    {
                        'id': SpacenowUtils.generateGUID(),
                        'url': `data:${file.type};base64,${btoa(reader.result)}`,
                        'type': 'image'
                    },
                    ...form.images
                ]
            ));
        };

        reader.onerror = function () {
            console.log("error on load image");
        };
    }

    function canBeSubmitted() {
        return (
            form.title.length > 0 &&
            !_.isEqual(listing.data, form)
        );
    }

    const _toggleLabel = (labelId) => {
        console.log(labelId);
        // setInForm('idLabels', _.xor(cardForm.idLabels, [labelId]));
    }

    return (
        <SpacenowPageCarded
            classes={{
                toolbar: "p-0",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <SpacenowAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/listings/spacenow" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Listings
                                </Typography>
                            </SpacenowAnimate>

                            <div className="flex items-center max-w-full">
                                <SpacenowAnimate animation="transition.expandIn" delay={300}>
                                    {form.photos ? (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.photos, { isCover: true }).name} alt={form.title} />
                                    ) : (
                                            <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/listing-image-placeholder.png" alt={form.title} />
                                        )}
                                </SpacenowAnimate>
                                <div className="flex flex-col min-w-0">
                                    <SpacenowAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.title ? form.title : 'New Listing'}
                                        </Typography>
                                    </SpacenowAnimate>
                                    <SpacenowAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Listing Detail</Typography>
                                    </SpacenowAnimate>
                                </div>
                            </div>
                        </div>
                        <SpacenowAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.saveListing(form))}
                            >
                                Save
                            </Button>
                        </SpacenowAnimate>
                    </div>
                )
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{ root: "w-full h-64" }}
                >
                    <Tab className="h-64 normal-case" label="Location" />
                    <Tab className="h-64 normal-case" label="Category" />
                    <Tab className="h-64 normal-case" label="Basic Info" />
                    <Tab className="h-64 normal-case" label="Listing Images" />
                    <Tab className="h-64 normal-case" label="Specifications" />
                    <Tab className="h-64 normal-case" label="Rules" />
                    <Tab className="h-64 normal-case" label="Amenities" />
                    <Tab className="h-64 normal-case" label="Pricing" />
                    <Tab className="h-64 normal-case" label="Booking" />
                    <Tab className="h-64 normal-case" label="Availability" />
                </Tabs>
            }

            content={
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                            (
                                <Paper className={classes.root}>
                                    <InputBase
                                        className={classes.input}
                                        placeholder="Search Google Maps"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    <Divider className={classes.divider} />
                                    <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            )
                        }
                        {tabValue === 2 &&
                            (
                                <div>

                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.title === ''}
                                        required
                                        label="Title"
                                        autoFocus
                                        id="title"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        id="description"
                                        name="description"
                                        onChange={handleChange}
                                        label="Description"
                                        type="text"
                                        value={form.listingData && form.listingData.description}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    {/* <SpacenowChipSelect
                                        className="mt-8 mb-24"
                                        value={
                                            form.categories.map(item => ({
                                                value: item,
                                                label: item
                                            }))
                                        }
                                        onChange={(value) => handleChipChange(value, 'categories')}
                                        placeholder="Select multiple categories"
                                        textFieldProps={{
                                            label: 'Categories',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant: 'outlined'
                                        }}
                                        isMulti
                                    /> */}

                                    {/* <SpacenowChipSelect
                                        className="mt-8 mb-16"
                                        value={
                                            form.tags.map(item => ({
                                                value: item,
                                                label: item
                                            }))
                                        }
                                        onChange={(value) => handleChipChange(value, 'tags')}
                                        placeholder="Select multiple tags"
                                        textFieldProps={{
                                            label: 'Tags',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant: 'outlined'
                                        }}
                                        isMulti
                                    /> */}
                                </div>
                            )}
                        {tabValue === 3 && (
                            <div>
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file"
                                    type="file"
                                    onChange={handleUploadChange}
                                />
                                <div className="flex justify-center sm:justify-start flex-wrap">
                                    <label
                                        htmlFor="button-file"
                                        className={
                                            clsx(
                                                classes.listingImageUpload,
                                                "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                                            )}
                                    >
                                        <Icon fontSize="large" color="action">cloud_upload</Icon>
                                    </label>
                                    {form.photos.map(media => (
                                        <div
                                            onClick={() => setFeaturedImage(media.id)}
                                            className={
                                                clsx(
                                                    classes.listingImageItem,
                                                    "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                                                    (media.isCover) && 'featured')
                                            }
                                            key={media.id}
                                        >
                                            <Icon className={classes.listingImageFeaturedStar}>star</Icon>
                                            <img className="max-w-none w-auto h-full" src={media.name} alt="listing" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {tabValue === 4 && (
                            <div>

                                <TextField
                                    className="mt-8 mb-16"
                                    label="Tax Excluded Price"
                                    id="priceTaxExcl"
                                    name="priceTaxExcl"
                                    value={form.priceTaxExcl}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    type="number"
                                    variant="outlined"
                                    autoFocus
                                    fullWidth
                                />

                                {/* <TextField
                                    className="mt-8 mb-16"
                                    label="Tax Included Price"
                                    id="priceTaxIncl"
                                    name="priceTaxIncl"
                                    value={form.priceTaxIncl}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    label="Tax Rate"
                                    id="taxRate"
                                    name="taxRate"
                                    value={form.taxRate}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    label="Compared Price"
                                    id="comparedPrice"
                                    name="comparedPrice"
                                    value={form.comparedPrice}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    helperText="Add a compare price to show next to the real price"
                                /> */}


                            </div>
                        )}
                        {tabValue === 5 && (
                            <div>
                                {rules.data && <List>
                                    {
                                        rules.data.map(rule =>
                                            <ListItem key={rule.id}>
                                                <ListItemText id={`switch-list-label-${rule.id}`} primary={rule.itemName} />
                                                <ListItemSecondaryAction className="ml-16">
                                                    <Switch
                                                        edge="end"
                                                        onChange={handleToggleRules(rule.id)}
                                                        checked={checkedRules.indexOf(rule.id) !== -1}
                                                        inputProps={{ 'aria-labelledby': `switch-list-label-${rule.id}` }}
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )}
                                </List>
                                }


                            </div>
                        )}
                        {tabValue === 6 && (
                            <div>
                                {amenities.data && <List>
                                    {
                                        amenities.data.map(amenity =>
                                            <ListItem key={amenity.id}>
                                                <ListItemText id={`switch-list-label-${amenity.id}`} primary={amenity.itemName} />
                                                <ListItemSecondaryAction className="ml-16">
                                                    <Switch
                                                        edge="end"
                                                        onChange={handleToggleAmenities(amenity.id)}
                                                        checked={checkedAmenities.indexOf(amenity.id) !== -1}
                                                        inputProps={{ 'aria-labelledby': `switch-list-label-${amenity.id}` }}
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )}
                                </List>
                                }


                            </div>
                        )}
                        {tabValue === 7 && (
                            <div>
                                <div className="flex">
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel>Booking Period</InputLabel>
                                        <Select
                                            native
                                            value={form.bookingPeriod}
                                            name="bookingPeriod"
                                            onChange={handleChange}
                                            input={
                                                <OutlinedInput name="bookingPeriod" />
                                            }
                                        >
                                            <option value="" />
                                            <option value={"hourly"}>Hourly</option>
                                            <option value={"daily"}>Daily</option>
                                            <option value={"weekly"}>Weekly</option>
                                            <option value={"monthly"}>Monthly</option>
                                        </Select>
                                    </FormControl>


                                    <TextField
                                        className={classes.input}
                                        label="Base Price"
                                        id="basePrice"
                                        name="basePrice"
                                        value={form.listingData.basePrice}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">AUD$</InputAdornment>
                                        }}
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel>Booking Type</InputLabel>
                                        <Select
                                            native
                                            value={form.listingData.bookingType}
                                            name="bookingType"
                                            onChange={handleChange}
                                            input={
                                                <OutlinedInput name="bookingType" />
                                            }
                                        >
                                            <option value="" />
                                            <option value={"instant"}>Request</option>
                                            <option value={"request"}>Instant</option>
                                            {listing.user.provider === 'poa' && <option value={"poa"}>POA</option>}
                                        </Select>
                                    </FormControl>

                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel>Booking Fee</InputLabel>
                                        <Select
                                            native
                                            value={form.listingData.isAbsorvedFee}
                                            name="isAbsorvedFee"
                                            onChange={handleChange}
                                            input={
                                                <OutlinedInput name="isAbsorvedFee" />
                                            }
                                        >
                                            <option value="" />
                                            <option value={true}>Guest</option>
                                            <option value={false}>Host</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel>Minimum Term</InputLabel>
                                        <Select
                                            native
                                            value={form.listingData.minTerm}
                                            name="minTerm"
                                            onChange={handleChange}
                                            input={
                                                <OutlinedInput name="minTerm" />
                                            }
                                        >
                                            <option value="" />
                                            <option value={1}>1</option>

                                            <option value={false}>Host</option>
                                        </Select>
                                    </FormControl>

                                </div>
                                {/* <div className="flex">
                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        label="Width"
                                        autoFocus
                                        id="width"
                                        name="width"
                                        value={form.width}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        label="Height"
                                        id="height"
                                        name="height"
                                        value={form.height}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        label="Depth"
                                        id="depth"
                                        name="depth"
                                        value={form.depth}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                </div>

                                <TextField
                                    className="mt-8 mb-16"
                                    label="Weight"
                                    id="weight"
                                    name="weight"
                                    value={form.weight}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    label="Extra Shipping Fee"
                                    id="extraShippingFee"
                                    name="extraShippingFee"
                                    value={form.extraShippingFee}
                                    onChange={handleChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    fullWidth
                                /> */}
                            </div>
                        )}
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('listings', reducer)(Listing);
