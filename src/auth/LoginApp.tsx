import { useState, useEffect, useRef } from "react"
import config from "../config.json"
import "./auth.scss";
import BaseApp from "../BaseApp";

export default function LoginApp(props: {onLogin: Function}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [hasError, setHasError] = useState<boolean>(false);

    async function sendLogin() {
        if (!inputRef.current) {
            return;
        }

        let password = inputRef.current.value;
        let response = await fetch(config.AUTH_URL + "/login", {
            method: "POST",
            body: JSON.stringify({ "password": password }),
            headers: new Headers({"Content-Type": "application/json"})
        })
        let result = await response.json();

        if (result.error) {
            setHasError(true);
        } else {
            localStorage.setItem("access_token", result.access_token);
        }
    }

    return <BaseApp title="Login">
        <div className="login-prompt-wrapper">
            <input className={"login-prompt " + (hasError ? "error" : "")} ref={inputRef} type="password"></input>
            <button className="login-submit" onClick={sendLogin}>▸</button>
        </div>
    </BaseApp>
}