import { useState, useEffect } from "react"
import config from "../config.json"
import LightsButton from "./LightsButton";
import "./lights.scss";
import { ScriptInfo } from "./types";
import BaseApp from "../BaseApp";
import { authFetch } from "../utils";

export default function LightsApp(props: {onError: Function}) {
    const [lightsScripts, setLightScripts] = useState<ScriptInfo[]>(JSON.parse(localStorage.getItem("lights_scripts_list") ?? "[]"));


    async function updateLights() {
        const response = await authFetch(config.LIGHTS_URL + "/scripts");
        const scripts = await response.json();

        if (scripts.error) {
            props.onError(scripts.message);
            return;
        }

        setLightScripts(scripts);
        localStorage.setItem("lights_scripts_list", JSON.stringify(scripts))
    }

    async function runScript(name: string) {
        const response = await authFetch(config.LIGHTS_URL + "/scripts/run/" + name, {"method": "POST"});
        const result = await response.json();

        if (result.error) {
            props.onError(result.message);
        }

        updateLights();
    }
    
    useEffect(() => {
        const interval = setInterval(() => updateLights())

        return () => clearInterval(interval);
    }, [])

    return <BaseApp className="lights-app" title="Lights">
        <div className="lights-buttons">
            {lightsScripts.map(script => <LightsButton key={script.file} onRun={() => runScript(script.file)} script={script}></LightsButton>)}
        </div>
    </BaseApp>
}