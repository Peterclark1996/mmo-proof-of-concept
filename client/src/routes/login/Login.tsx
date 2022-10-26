import classes from "./Login.module.scss"
import { useNavigate } from "react-router-dom"

type LoginProps = {
    username: string,
    setUsername: (username: string) => void
}

const Login = ({ username, setUsername }: LoginProps) => {
    const navigate = useNavigate()

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)

    const onLoginClick = () => {
        if (username === "") return
        navigate("/game")
    }

    return (
        <div className="d-flex flex-column rounded p-2 bg-secondary text-white user-select-none">
            <h1>Pete MMO</h1>
            <div className="d-flex">
                <input className={`rounded border-0 px-2 ${classes.input}`} value={username} onChange={onInputChange} />
                <div role="button" className="ms-1 p-1 rounded bg-success" onClick={onLoginClick}>
                    Login
                </div>
            </div>
        </div>
    )
}

export default Login