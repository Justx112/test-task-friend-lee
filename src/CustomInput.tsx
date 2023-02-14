import { useEffect, useRef } from "react"
import './styles/input.scss'

export function CustomInput() {
    const numberRef = useRef<HTMLInputElement>(null)
    const rangeRef = useRef<HTMLInputElement>(null)

    const max = 1.5e+7;
    const min = 1e+6;
    const defaultValue = 7e+6;
    const legend = 'Стоймость'

    useEffect(() => {
        SetInput(defaultValue)
    })



    function Input(e: React.ChangeEvent<HTMLInputElement>) {
        SetInput(e.target.valueAsNumber);
    }

    function SetInput(inputValue: number) {
        numberRef.current!.valueAsNumber = inputValue;
        rangeRef.current!.valueAsNumber = isNaN(inputValue) ? 0 : inputValue;
        rangeRef.current!.style.backgroundSize = inputValue >= min || isNaN(inputValue) ? (Number(inputValue) - min) * 100 / (max - min) + '%' : '0%';
    }

    function DisableSlider(e: React.FocusEvent<HTMLInputElement>) {
        rangeRef.current?.classList.toggle('value-input')
        rangeRef.current?.classList.toggle('value-range-disable')
    }

    function EnableSlider(e: React.FocusEvent<HTMLInputElement>) {
        rangeRef.current?.classList.toggle('value-range-disable')
        rangeRef.current?.classList.toggle('value-input')
    }


    return (
        <fieldset className="input">
            <legend className="discription">{legend}</legend>
            <div className="input-background">
                <input className="value-input" type="number" max={max} min={min} ref={numberRef}
                    maxLength={7}
                    onChange={Input}
                    onFocus={DisableSlider}
                    onBlur={EnableSlider} />
                <p className="rubl">₽</p>
                <input className="value-range-active"
                    type="range"
                    ref={rangeRef}
                    max={max}
                    min={min}
                    onChange={Input}
                />
            </div>
        </fieldset>
    )
}