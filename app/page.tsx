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

const RocketState = proxy({
    current: null,
    colors: {
        hull: "#d3d3d3",
        base: "#d3d3d3",
        tip: "#d3d3d3",
        wings: "#a8a8a8",
        window: "#a8a8a8",
    },
});
const AxeState = proxy({
    current: null,
    colors: {
        body: "#a8a8a8",
        design: "#d3d3d3",
        support: "#d3d3d3",
        inner: "#d3d3d3",
    },
});
const ShoeState = proxy({
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
const InsectState = proxy({
    current: null,
    colors: { body: "#d3d3d3", shell: "#a8a8a8" },
});
const TeapotState = proxy({
    current: null,
    colors: { lid: "#d3d3d3", base: "#a8a8a8" },
});

function Home() {
    const [selectedModel, setSelectedModel] = useState("Shoe");
    const [linkOpened, setLinkOpened] = useState(false);
    const controls = useRef();

    const updateShoeCurrent = (value) => {
        ShoeState.current = value;
    };
    const updateShoeColor = (pro, value) => {
        ShoeState.colors[pro] = value;
    };

    const updateAxeCurrent = (value) => {
        AxeState.current = value;
    };
    const updateAxeColor = (pro, value) => {
        AxeState.colors[pro] = value;
    };

    const updateRocketCurrent = (value) => {
        RocketState.current = value;
    };
    const updateRocketColor = (pro, value) => {
        RocketState.colors[pro] = value;
    };

    const updateInsectCurrent = (value) => {
        InsectState.current = value;
    };
    const updateInsectColor = (pro, value) => {
        InsectState.colors[pro] = value;
    };

    const updateTeapotCurrent = (value) => {
        TeapotState.current = value;
    };
    const updateTeapotColor = (pro, value) => {
        TeapotState.colors[pro] = value;
    };

    const renderSelectedModel = () => {
        switch (selectedModel) {
            case "Shoe":
                return (
                    <Shoe castShadow colors={ShoeState.colors} updateCurrent={updateShoeCurrent} />
                );
            case "Rocket":
                return (
                    <Rocket
                        castShadow
                        colors={RocketState.colors}
                        updateCurrent={updateRocketCurrent}
                    />
                );
            case "Axe":
                return <Axe castShadow colors={AxeState.colors} updateCurrent={updateAxeCurrent} />;
            case "Insect":
                return (
                    <Insect
                        castShadow
                        colors={InsectState.colors}
                        updateCurrent={updateInsectCurrent}
                    />
                );
            case "Teapot":
                return (
                    <Teapot
                        castShadow
                        colors={TeapotState.colors}
                        updateCurrent={updateTeapotCurrent}
                    />
                );
            default:
                break;
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
                break;
        }
    };

    const updateSelectedModel = (selectedModel) => {
        controls.current.reset();
        setSelectedModel(selectedModel);
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
