'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ParticleSwarm() {
    const ref = useRef<THREE.Points>(null);

    const sphere = useMemo(() => {
        const array = new Float32Array(5000);
        for (let i = 0; i < 5000; i += 3) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = 1.5 * Math.cbrt(Math.random());
            const sinPhi = Math.sin(phi);
            array[i] = r * sinPhi * Math.cos(theta);
            array[i + 1] = r * sinPhi * Math.sin(theta);
            array[i + 2] = r * Math.cos(phi);
        }
        return array;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function FloatingShapes() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-2, 1, -3]}>
                <mesh>
                    <icosahedronGeometry args={[0.5, 0]} />
                    <meshPhongMaterial color="#60a5fa" wireframe opacity={0.3} transparent />
                </mesh>
            </Float>
            <Float speed={1.5} rotationIntensity={2} floatIntensity={1} position={[2, -1, -2]}>
                <mesh>
                    <octahedronGeometry args={[0.6, 0]} />
                    <meshPhongMaterial color="#34d399" wireframe opacity={0.2} transparent />
                </mesh>
            </Float>
        </group>
    );
}

export default function Scene3D() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <ParticleSwarm />
                <FloatingShapes />
            </Canvas>
        </div>
    );
}
