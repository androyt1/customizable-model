"use client";

import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { proxy } from "valtio";
import Shoe from "./components/shoe";
import Rocket from "./components/rocket";
import Axe from "./components/axe";
import Loader from "./components/Loader";
import Insect from "./components/insect";
import ModelPicker from "./components/model-picker";
import ColorPicker from "./components/color-picker";
import Teapot from "./components/teapot";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type StateType = {
    current: string | null;
    colors: {
        [key: string]: string;
    };
};

const RocketState = proxy<StateType>({
    current: null,
    colors: {
        hull: "#d3d3d3",
        base: "#d3d3d3",
        tip: "#d3d3d3",
        wings: "#a8a8a8",
        window: "#a8a8a8",
    },
});

const AxeState = proxy<StateType>({
    current: null,
    colors: {
        body: "#a8a8a8",
        design: "#d3d3d3",
        support: "#d3d3d3",
        inner: "#d3d3d3",
    },
});

const ShoeState = proxy<StateType>({
    current: null,
    colors: {
        laces: "#d3d3d3",
        mesh: "#d3d3d3",
        caps: "#d3d3d3",
        inner: "#d3d3d3",
        sole: "#d3d3d3",
        stripes: "#d3d3d3",
        band: "#d3d3d3",
        patch: "#d3d3d3",
    },
});

const InsectState = proxy<StateType>({
    current: null,
    colors: { body: "#d3d3d3", shell: "#a8a8a8" },
});

const TeapotState = proxy<StateType>({
    current: null,
    colors: { lid: "#d3d3d3", base: "#a8a8a8" },
});

function Home() {
    const [selectedModel, setSelectedModel] = useState<string>("Shoe");
    const [linkOpened, setLinkOpened] = useState<boolean>(false);
    const controls = useRef<OrbitControlsImpl>(null);

    const updateShoeCurrent = (value: string | null) => {
        ShoeState.current = value;
    };
    const updateShoeColor = (pro: string, value: string) => {
        ShoeState.colors[pro] = value;
    };

    const updateAxeCurrent = (value: string | null) => {
        AxeState.current = value;
    };
    const updateAxeColor = (pro: string, value: string) => {
        AxeState.colors[pro] = value;
    };

    const updateRocketCurrent = (value: string | null) => {
        RocketState.current = value;
    };
    const updateRocketColor = (pro: string, value: string) => {
        RocketState.colors[pro] = value;
    };

    const updateInsectCurrent = (value: string | null) => {
        InsectState.current = value;
    };
    const updateInsectColor = (pro: string, value: string) => {
        InsectState.colors[pro] = value;
    };

    const updateTeapotCurrent = (value: string | null) => {
        TeapotState.current = value;
    };
    const updateTeapotColor = (pro: string, value: string) => {
        TeapotState.colors[pro] = value;
    };

    const renderSelectedModel = () => {
        switch (selectedModel) {
            case "Shoe":
                return <Shoe colors={ShoeState.colors} updateCurrent={updateShoeCurrent} />;
            case "Rocket":
                return <Rocket colors={RocketState.colors} updateCurrent={updateRocketCurrent} />;
            case "Axe":
                return <Axe colors={AxeState.colors} updateCurrent={updateAxeCurrent} />;
            case "Insect":
                return <Insect colors={InsectState.colors} updateCurrent={updateInsectCurrent} />;
            case "Teapot":
                return (
                    <Teapot
                        colors={{ lid: TeapotState.colors.lid, base: TeapotState.colors.base }}
                        updateCurrent={updateTeapotCurrent}
                    />
                );
            default:
                return null;
        }
    };

    const renderSelectedColorPicker = () => {
        switch (selectedModel) {
            case "Shoe":
                return <ColorPicker state={ShoeState} updateColor={updateShoeColor} />;
            case "Rocket":
                return <ColorPicker state={RocketState} updateColor={updateRocketColor} />;
            case "Axe":
                return <ColorPicker state={AxeState} updateColor={updateAxeColor} />;
            case "Insect":
                return <ColorPicker state={InsectState} updateColor={updateInsectColor} />;
            case "Teapot":
                return <ColorPicker state={TeapotState} updateColor={updateTeapotColor} />;
            default:
                return null;
        }
    };

    const updateSelectedModel = (model: string) => {
        controls.current?.reset();
        setSelectedModel(model);
    };

    return (
        <>
            <ModelPicker updateSelectedModel={updateSelectedModel} />
            {renderSelectedColorPicker()}

            <div className='w-full h-screen flex justify-center items-center relative '>
                <Canvas shadows camera={{ position: [1, 0, 2] }} className='bg-white w-full h-full'>
                    <ambientLight />
                    <spotLight intensity={0.5} penumbra={1} position={[7, 15, 10]} castShadow />
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 1.1]} position={[0, -1, 0]}>
                        <planeGeometry args={[100, 100]} />
                        <shadowMaterial opacity={0.3} />
                    </mesh>
                    <Suspense fallback={<Loader />}>
                        <Float
                            speed={1}
                            rotationIntensity={1}
                            floatIntensity={1}
                            floatingRange={[0, 0.3]}>
                            {renderSelectedModel()}
                        </Float>
                    </Suspense>
                    <OrbitControls ref={controls} maxDistance={5} minDistance={1.5} />
                </Canvas>
            </div>
        </>
    );
}

export default Home;
