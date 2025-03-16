import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

interface ObjectProps {
  position: [number, number, number];
  label: string;
  width: number;
}

function Object({ position, label, width }: ObjectProps) {
  const lines = label.split("\n");
  const height = Math.max(1, lines.length * 0.5);
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[width, height, 0.5]} />
        <meshPhongMaterial color="#FFA500" />
      </mesh>
      {lines.map((line, index) => (
        <Text
          key={index}
          position={[0, height / 2 - 0.25 - index * 0.4, 0.26]}
          color="black"
          fontSize={0.3}
          maxWidth={width - 0.2}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {line}
        </Text>
      ))}
      <Line
        points={[
          [0, -height / 2, 0],
          [0, -15, 0],
        ]}
        color="black"
        lineWidth={1}
        dashed
        dashSize={0.2}
        gapSize={0.1}
      />
    </group>
  );
}

interface MessageProps {
  start: [number, number, number];
  end: [number, number, number];
  label: string;
  color?: string;
  dashed?: boolean;
}

function Message({
  start,
  end,
  label,
  color = "black",
  dashed = false,
}: MessageProps) {
  const mid = new THREE.Vector3()
    .addVectors(new THREE.Vector3(...start), new THREE.Vector3(...end))
    .multiplyScalar(0.5);
  const direction = new THREE.Vector3()
    .subVectors(new THREE.Vector3(...end), new THREE.Vector3(...start))
    .normalize();

  const arrowHelper = new THREE.ArrowHelper(direction, new THREE.Vector3());
  const rotation = arrowHelper.rotation;

  return (
    <>
      <Line
        points={[start, end]}
        color={color}
        lineWidth={2}
        dashed={dashed}
        dashSize={dashed ? 0.2 : 0}
        gapSize={dashed ? 0.1 : 0}
      />
      <Text
        position={mid}
        color={color}
        fontSize={0.2}
        anchorX="center"
        anchorY="bottom"
      >
        {label}
      </Text>
      <mesh position={end} rotation={rotation}>
        <coneGeometry args={[0.1, 0.2, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </>
  );
}

interface RectangleProps {
  position: [number, number, number];
  width: number;
  height: number;
  color: string;
}

interface BoxRectangleProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  color: string;
}
interface PersonModelProps {
  position: [number, number, number];
  scale?: [number, number, number];
}

interface PersonModelProps {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

const PersonModel: React.FC<PersonModelProps> = ({
  position,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) => {
  const { scene } = useGLTF("/models/person.glb"); // Corrected path
  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
};

useGLTF.preload("/models/person.glb"); // Preload the model for better performance

export { PersonModel };

const BoxRectangle: React.FC<BoxRectangleProps> = ({
  position,
  width,
  height,
  depth,
  color,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export { BoxRectangle };

function Grid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useEffect(() => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.Material;
      material.opacity = 0.2;
      material.transparent = true;
    }
  }, []);

  return (
    <gridHelper
      ref={gridRef}
      args={[100, 100, "gray", "gray"]}
      position={[0, -10, 1]}
      rotation={[0, 0, 0]}
    />
  );
}

function SequenceDiagram3D() {
  const mainObjects: ObjectProps[] = [
    { label: "User", position: [-10, 5, 0], width: 2 },
    { label: "Online Shop\nInterface", position: [-6, 5, 0], width: 3 },
    { label: "Item List", position: [-2, 5, 0], width: 2.5 },
    { label: "Purchase\nInterface", position: [2, 5, 0], width: 3 },
    { label: "Checkout", position: [6, 5, 0], width: 2.5 },
    { label: "Payment Option", position: [10, 5, 0], width: 3 },
  ];

  const backendObjects: ObjectProps[] = [
    { label: "Database", position: [0, 5, -5], width: 3 },
    { label: "Payment\nGateway", position: [8, 5, -5], width: 3 },
  ];

  const messages: MessageProps[] = [
    // Main flow messages
    { start: [-10, 4, 0], end: [-6, 4, 0], label: "search items" },
    { start: [-6, 3, 0], end: [-2, 3, 0], label: "item query" },
    { start: [-10, 2, 0], end: [-6, 2, 0], label: "choose items" },
    { start: [-6, 1, 0], end: [2, 1, 0], label: "purchase items" },
    { start: [2, 0, 0], end: [-6, 0, 0], label: "get selected items" },
    { start: [-6, -1, 0], end: [2, -1, 0], label: "show selected items" },
    { start: [2, -2, 0], end: [-2, -2, 0], label: "query price info" },
    { start: [-2, -3, 0], end: [2, -3, 0], label: "price info" },
    { start: [2, -4, 0], end: [-10, -4, 0], label: "display price info" },
    { start: [2, -5, 0], end: [6, -5, 0], label: "authorize purchase" },
    { start: [6, -6, 0], end: [10, -6, 0], label: "choose payment option" },
    {
      start: [10, -7, 0],
      end: [6, -7, 0],
      label: "place payment",
      dashed: true,
    },
    {
      start: [6, -8, 0],
      end: [2, -8, 0],
      label: "print payment info",
      dashed: true,
    },
    { start: [2, -9, 0], end: [-10, -9, 0], label: "send notification" },
    { start: [6, -10, 0], end: [-10, -10, 0], label: "send email" },

    // Database interactions
    { start: [-2, 3, 0], end: [0, 3, -5], label: "query DB", color: "blue" },
    {
      start: [0, 2, -5],
      end: [-2, 2, 0],
      label: "return results",
      color: "blue",
    },
    {
      start: [2, 0, 0],
      end: [0, 0, -5],
      label: "update inventory",
      color: "blue",
    },

    // Payment Gateway interactions
    {
      start: [6, -6, 0],
      end: [8, -6, -5],
      label: "process payment",
      color: "green",
    },
    {
      start: [8, -7, -5],
      end: [6, -7, 0],
      label: "payment confirmation",
      color: "green",
    },
  ];

  return (
    <div style={containerStyle}>
      <Canvas camera={{ position: [5, 5, 25], fov: 60 }}>
        <color attach="background" args={["#f0f0f0"]} />
        <ambientLight intensity={2.5} />
        <pointLight position={[10, 10, 10]} />
        {mainObjects.map((obj, index) => (
          <Object key={`main-${index}`} {...obj} />
        ))}
        {backendObjects.map((obj, index) => (
          <Object key={`backend-${index}`} {...obj} />
        ))}
        {messages.map((msg, index) => (
          <Message key={index} {...msg} />
        ))}
        <Grid />
        <PersonModel
          position={[4, -5, -3.5]}
          scale={[10, 10, 10]}
          rotation={[0, Math.PI / -1.5, 0]}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default SequenceDiagram3D;
