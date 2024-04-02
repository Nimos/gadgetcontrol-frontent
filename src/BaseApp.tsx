export default function BaseApp(props: { className?: string, title: string, children: string | JSX.Element | JSX.Element[] }) {   
    let classList = ["app"];
    if (props.className) {
        classList.push(props.className);
    } 

    return <div className={classList.join(" ")}>
        <span className="app-title">{props.title}</span>
        {props.children}
    </div>
}