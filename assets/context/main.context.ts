import React from "react";
import { MainContextData } from "../types/types";


export const MainContext: React.Context<MainContextData | null> = React.createContext<MainContextData | null>(null);