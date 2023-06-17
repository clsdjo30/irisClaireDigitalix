import { ImageURISource } from "react-native";

interface IStepper {
    key:number;
    title: string;
    description: string;
    image: ImageURISource
}

const STEPPER: IStepper[] = [
    {
        key: 1,
        title: "Welcome to the app",
        description: "This is the description of the app",
        image: require("../assets/images/1.png")
    },
    {
        key: 2,
        title: "Welcome to the app",
        description: "This is the description of the app",
        image: require("../assets/images/2.png")
    },
    {
        key: 3,
        title: "Welcome to the app",
        description: "This is the description of the app",
        image: require("../assets/images/3.png")
    },
]

export default STEPPER;