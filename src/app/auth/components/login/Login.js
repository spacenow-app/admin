import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  Typography,
  Icon
} from "@material-ui/core";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { makeStyles } from "@material-ui/styles";
import { SpacenowAnimate, TextFieldFormsy } from "@spacenow";
import Formsy from "formsy-react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "app/auth/store/actions";

const useStyles = makeStyles(theme => ({
  root: {
    background:
      "radial-gradient(" +
      darken(theme.palette.primary.main, 0.5) +
      " 0%, " +
      theme.palette.primary.main +
      " 80%)",
    color: theme.palette.primary.contrastText
  }
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.login);

  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (login.error && (login.error.email || login.error.password)) {
      formRef.current.updateInputsWithError({
        ...login.error
      });
      disableButton();
    }
  }, [login.error]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(authActions.submitLogin(model));
  }

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <SpacenowAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <img
                className="w-128 m-32"
                src="assets/images/logos/spacenow.svg"
                alt="logo"
              />

              <Typography variant="h6" className="mt-16 mb-32">
                ADMIN LOGIN
              </Typography>

              <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
              >
                <TextFieldFormsy
                  className="mb-16"
                  type="text"
                  name="email"
                  label="Email"
                  value=""
                  validations={{
                    minLength: 4
                  }}
                  validationErrors={{
                    minLength: "Min character length is 4"
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          email
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  required
                />

                <TextFieldFormsy
                  className="mb-16"
                  type="password"
                  name="password"
                  label="Password"
                  value=""
                  validations={{
                    minLength: 4
                  }}
                  validationErrors={{
                    minLength: "Min character length is 4"
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          vpn_key
                        </Icon>
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto mt-16 normal-case"
                  aria-label="LOG IN"
                  disabled={!isFormValid}
                  value="legacy"
                >
                  LOGIN
                </Button>
              </Formsy>
            </CardContent>
          </Card>
        </SpacenowAnimate>
      </div>
    </div>
  );
};

export default Login;
