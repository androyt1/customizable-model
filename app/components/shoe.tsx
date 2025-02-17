import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useSnapshot } from "valtio";

type GLTFResult = GLTF & {
    nodes: {
        shoe: THREE.Mesh;
        shoe_1: THREE.Mesh;
        shoe_2: THREE.Mesh;
        shoe_3: THREE.Mesh;
        shoe_4: THREE.Mesh;
        shoe_5: THREE.Mesh;
        shoe_6: THREE.Mesh;
        shoe_7: THREE.Mesh;
    };
    materials: {
        laces: THREE.MeshStandardMaterial;
        mesh: THREE.MeshStandardMaterial;
        caps: THREE.MeshStandardMaterial;
        inner: THREE.MeshStandardMaterial;
        sole: THREE.MeshStandardMaterial;
        stripes: THREE.MeshStandardMaterial;
        band: THREE.MeshStandardMaterial;
        patch: THREE.MeshStandardMaterial;
    };
};

type Props = JSX.IntrinsicElements["group"] & {
    updateCurrent: (value: string | null) => void;
    colors: {
        [key: string]: string;
    };
};

const Shoe: React.FC<Props> = (props: Props) => {
    const { nodes, materials } = useGLTF("/models/Shoe/shoe.gltf") as GLTFResult;

    const [hovered, setHovered] = useState<string | null>(null);
    const snap = useSnapshot(props.colors);

    useEffect(() => {
        const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${
            hovered && hovered in snap ? snap[hovered as keyof typeof snap] : ""
        }"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
        if (hovered) {
            document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`;
        }
        return () => {
            document.body.style.cursor = "auto";
        };
    }, [hovered, snap]);

    return (
        <group
            {...props}
            dispose={null}
            onPointerOver={(e) => {
                e.stopPropagation();
                if (e.object instanceof THREE.Mesh && e.object.material instanceof THREE.Material) {
                    setHovered(e.object.material.name);
                }
            }}
            onPointerOut={(e) => {
                if (e.intersections.length === 0) {
                    setHovered(null);
                }
            }}
            onPointerDown={(e) => {
                e.stopPropagation();
                if (e.object instanceof THREE.Mesh && e.object.material instanceof THREE.Material) {
                    props.updateCurrent(e.object.material.name);
                }
            }}
            onPointerMissed={() => {
                props.updateCurrent(null);
            }}>
            <mesh
                castShadow
                material-color={snap.laces}
                geometry={nodes.shoe.geometry}
                material={materials.laces}
            />
            <mesh
                castShadow
                material-color={snap.mesh}
                geometry={nodes.shoe_1.geometry}
                material={materials.mesh}
            />
            <mesh
                castShadow
                material-color={snap.caps}
                geometry={nodes.shoe_2.geometry}
                material={materials.caps}
            />
            <mesh
                castShadow
                material-color={snap.inner}
                geometry={nodes.shoe_3.geometry}
                material={materials.inner}
            />
            <mesh
                castShadow
                material-color={snap.sole}
                geometry={nodes.shoe_4.geometry}
                material={materials.sole}
            />
            <mesh
                castShadow
                material-color={snap.stripes}
                geometry={nodes.shoe_5.geometry}
                material={materials.stripes}
            />
            <mesh
                castShadow
                material-color={snap.band}
                geometry={nodes.shoe_6.geometry}
                material={materials.band}
            />
            <mesh
                castShadow
                material-color={snap.patch}
                geometry={nodes.shoe_7.geometry}
                material={materials.patch}
            />
        </group>
    );
};

useGLTF.preload("/models/Shoe/shoe.gltf");

export default Shoe;
