"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Sphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(300, 300);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphereRef.current = sphere;
    scene.add(sphere);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    camera.position.z = 2.5;

    const animate = () => {
      requestAnimationFrame(animate);
      if (sphereRef.current) {
        sphereRef.current.rotation.x += 0.001;
        sphereRef.current.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute right-0 bottom-0 w-[300px] h-[300px]"
    />
  );
}
