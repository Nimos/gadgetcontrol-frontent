import { useState, useEffect } from "react"
import config from "../config.json"
import LightsButton from "./LightsButton";
import "./lights.scss";
import { ScriptInfo } from "./types";

export default function LightsApp() {
    const [lightsScripts, setLightScripts] = useState<ScriptInfo[]>([]);

    async function updateLights() {
        const response = await fetch(config.LIGHTS_URL + "/scripts");
        const scripts = await response.json();

        setLightScripts(scripts);
    }

    async function runScript(name: string) {
        const response = await fetch(config.LIGHTS_URL + "/scripts/run/" + name, {"method": "POST"});
        const result = await response.json();

        updateLights();
    }
    
    useEffect(() => {
        updateLights();
    }, [])

    return <div className="app lights-app">
        <span className="app-title">Lights</span>
        <div className="lights-buttons">
            {lightsScripts.map(script => <LightsButton key={script.file} onRun={() => runScript(script.file)} script={script}></LightsButton>)}
        </div>
    </div>
}