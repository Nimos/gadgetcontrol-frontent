import { useState, useEffect } from "react"
import config from "../config.json"
import LightsButton from "./LightsButton";
import "./lights.scss";
import { ScriptInfo } from "./types";
import BaseApp from "../BaseApp";
import { authFetch } from "../utils";

export default function LightsApp() {
    const [lightsScripts, setLightScripts] = useState<ScriptInfo[]>([]);

    async function updateLights() {
        const response = await authFetch(config.LIGHTS_URL + "/scripts");
        const scripts = await response.json();

        setLightScripts(scripts);
    }

    async function runScript(name: string) {
        const response = await authFetch(config.LIGHTS_URL + "/scripts/run/" + name, {"method": "POST"});
        const result = await response.json();

        updateLights();
    }
    
    useEffect(() => {
        updateLights();
    }, [])

    return <BaseApp className="lights-app" title="Lights">
        <div className="lights-buttons">
            {lightsScripts.map(script => <LightsButton key={script.file} onRun={() => runScript(script.file)} script={script}></LightsButton>)}
        </div>
    </BaseApp>
}