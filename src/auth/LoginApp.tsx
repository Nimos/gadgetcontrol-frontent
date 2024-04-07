import { useState, useEffect, useRef } from "react"
import config from "../config.json"
import "./auth.scss";
import BaseApp from "../BaseApp";

export default function LoginApp(props: {onLogin: Function}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [hasError, setHasError] = useState<boolean>(false);

    const [log, setLog] = useState<string>("");

    async function sendLogin() {
        if (!inputRef.current) {
            return;
        }
        setHasError(false);

        let password = inputRef.current.value;
        let result;
        try {
            let response = await fetch(config.AUTH_URL + "/login", {
                method: "POST",
                body: JSON.stringify({ "password": password }),
                headers: new Headers({ "Content-Type": "application/json" })
            })
            result = await response.json();
        } catch (e: any) {
            setLog("" + e.message)
            return;
        }

        if (result.error) {
            setHasError(true);
        } else {
            localStorage.setItem("access_token", result.access_token);
            props.onLogin()
        }
    }

    return <BaseApp title="Login">
        <div className="login-prompt-wrapper">
            <input className={"login-prompt " + (hasError ? "has-error" : "")} ref={inputRef} type="password"></input>
            <button className="login-submit" onClick={sendLogin}>▸</button>
        </div>
    </BaseApp>
}