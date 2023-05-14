type CheckboxProps = {
    checked: boolean
    onChange: (checked: boolean) => void
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
    const onClick = () => onChange(!checked)

    return (
        <div
            role="checkbox"
            onClick={onClick}
            className="flex justify-center items-center rounded cursor-pointer bg-white w-5 h-5 form-deboss"
        >
            {checked && <i className="text-slate-800 fa fa-check" />}
        </div>
    )
}

export default Checkbox
