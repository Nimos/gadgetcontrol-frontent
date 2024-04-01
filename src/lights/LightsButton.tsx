import { ScriptInfo } from "./types";
import "./lights.scss";
import { MouseEvent, useState } from "react";

export default function LightsButton(props: { script: ScriptInfo, onRun: Function }) {
    
    const [loading, setLoading] = useState<boolean>(false);

    const classList = ["script-button"];
    if (props.script.active) {
        classList.push("active");
    }
    if (loading) {
        classList.push("loading")
    }

    async function handleClick(ev: MouseEvent) {
        setLoading(true);
        try {
            let runResult = await props.onRun();
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    return <div onClick={handleClick} className={classList.join(" ")}>
        <span>{props.script.name}</span>
    </div>
}