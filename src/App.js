import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid, Typography, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import ClearIcon from "@mui/icons-material/Clear";
const mainTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#4cbb17",
        },
        secondary: {
            main: "#00ff00",
        },
    },
});

function Trivia() {
    const [triviaType, SetTriviaType] = useState("trivia");
    const [typeButtonsColors, SetTypeButtonsColors] = useState([
        false,
        false,
        false,
    ]);
    const [trivia, SetTrivia] = useState(null);
    const GetTrivia = () => {
        fetch("http://numbersapi.com/random/" + triviaType)
            .then((response) => response.text())
            .then((data) => SetTrivia(data))
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        GetTrivia();
    }, []);
    useEffect(() => {
        switch (triviaType) {
            case "trivia":
                SetTypeButtonsColors([false, false, false]);
                break;
            case "math":
                SetTypeButtonsColors([true, false, false]);
                break;
            case "date":
                SetTypeButtonsColors([false, true, false]);
                break;
            case "year":
                SetTypeButtonsColors([false, false, true]);
                break;
            default:
                console.warn("Problems with Type Buttons' Colors");
        }
    }, [triviaType]);

    return (
        <div>
            <div>{trivia}</div>
            <ThemeProvider theme={mainTheme}>
                <TextField
                    color="primary"
                    label="Number"
                    placeholder="Leave blank for random number"
                    variant="filled"
                ></TextField>
                <Button size="large" variant="contained" onClick={GetTrivia}>
                    <Typography color="common.white">Get Trivia</Typography>
                </Button>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            onClick={() => {
                                SetTriviaType("math");
                            }}
                            color={
                                typeButtonsColors[0] ? "secondary" : "primary"
                            }
                            variant="contained"
                            style={{ height: 100, width: 100 }}
                        >
                            <Typography
                                color="common.white"
                                variant="h2"
                                style={{
                                    position: "absolute",
                                    bottom: 20,
                                }}
                            >
                                Σ
                            </Typography>
                            <Typography
                                color="common.white"
                                variant="h6"
                                style={{ position: "absolute", bottom: 0 }}
                            >
                                math
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={() => {
                                SetTriviaType("date");
                            }}
                            color={
                                typeButtonsColors[1] ? "secondary" : "primary"
                            }
                            variant="contained"
                            style={{ height: 100, width: 100 }}
                        >
                            <Typography
                                color="common.white"
                                variant="h2"
                                style={{
                                    position: "absolute",
                                    bottom: 20,
                                }}
                            >
                                D
                            </Typography>
                            <Typography
                                color="common.white"
                                variant="h6"
                                style={{ position: "absolute", bottom: 0 }}
                            >
                                date
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={() => {
                                SetTriviaType("year");
                            }}
                            color={
                                typeButtonsColors[2] ? "secondary" : "primary"
                            }
                            variant="contained"
                            style={{ height: 100, width: 100 }}
                        >
                            <Typography
                                color="common.white"
                                variant="h2"
                                style={{
                                    position: "absolute",
                                    bottom: 20,
                                }}
                            >
                                M
                            </Typography>
                            <Typography
                                color="common.white"
                                variant="h6"
                                style={{ position: "absolute", bottom: 0 }}
                            >
                                year
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Button
                    startIcon={<ClearIcon />}
                    onClick={() => SetTriviaType("trivia")}
                >
                    reset to random trivia
                </Button>
            </ThemeProvider>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Header />
            <h1>Get trivia for any number.</h1>
            <Trivia />
        </div>
    );
}

export default App;
