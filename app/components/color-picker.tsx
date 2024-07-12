import { HexColorPicker } from "react-colorful";

import { useSnapshot } from "valtio";

type StateProxy = {
    current: string | null;
    colors: {
        [key: string]: string;
    };
};

type Props = {
    state: StateProxy;
    updateColor: (color: string, value: string) => void;
};

export default function ColorPicker(props: Props) {
    const snap = useSnapshot(props.state);
    return (
        <div className='absolute top-3 right-3 w-fit h-fit z-[100] bg-slate-600'>
            <div className={snap.current !== null ? "color-picker" : "color-picker"}>
                <HexColorPicker
                    color={snap.colors[snap.current!]}
                    onChange={(color) => props.updateColor(snap.current!, color)}
                />
                <h1>{snap.current}</h1>
            </div>
        </div>
    );
}
