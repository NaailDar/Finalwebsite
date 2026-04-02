'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { NEURAL_PRISM_WIREFRAME_DATA } from './neuralPrismWireframeData'

const MAX_LINE_COUNT = 4000
const CHAOS_LINE_COUNT = 500
const POINTS_PER_LINE = 32

const ANIMATION_CONFIG = {
  timing: {
    idleDuration: 4,
    morphDuration: 1.5,
    modelShowDuration: 3.5,
  },
  
  rotation: {
    baseOffset: 6,
    speedY: 0.15,
    speedX: 0.1,
    speedZ: 0.08,
    amplitudeX: 0.12,
    amplitudeZ: 0.05,
  },
  
  colors: {
    tesseract: '#FFFFFF',
    neural: '#43A399',
    pulse: '#5FCFBD',
  },
  
  particles: {
    count: 50,
    size: 0.025,
    color: '#43A399',
    opacity: 0.5,
  },
  
  nodes: {
    pulseSpeed: 1.5,
    pulseAmplitude: 0.08,
  },
}

interface LineData {
  currentPositions: Float32Array
  targetPositions: Float32Array
  morphStartPositions: Float32Array
  visible: boolean
  nodeAIndex: number
  nodeBIndex: number
  nodeAType: 'inner' | 'outer' | 'extra'
  nodeBType: 'inner' | 'outer' | 'extra'
}

type Phase = 'idle' | 'morphing_to_neural' | 'showing_neural' | 'morphing_to_idle'

function generateNeuralWireframe(maxLines?: number): THREE.Vector3[][] {
  const lines: THREE.Vector3[][] = []
  const scale = 1.6
  const edgeCount = NEURAL_PRISM_WIREFRAME_DATA.length
  
  const targetCount = maxLines ? Math.min(maxLines, edgeCount) : edgeCount
  const step = edgeCount / targetCount
  
  for (let i = 0; i < targetCount; i++) {
    const edgeIndex = Math.floor(i * step) % edgeCount
    const edge = NEURAL_PRISM_WIREFRAME_DATA[edgeIndex]
    const line: THREE.Vector3[] = []
    const [p1, p2] = edge
    for (let j = 0; j < POINTS_PER_LINE; j++) {
      const t = j / (POINTS_PER_LINE - 1)
      const x = (p1[0] + (p2[0] - p1[0]) * t) * scale
      const y = (p1[1] + (p2[1] - p1[1]) * t) * scale
      const z = (p1[2] + (p2[2] - p1[2]) * t) * scale
      
      line.push(new THREE.Vector3(x, y, z))
    }
    lines.push(line)
  }
  
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor((i * 2654435761) % (i + 1))
    ;[lines[i], lines[j]] = [lines[j], lines[i]]
  }
  
  return lines
}

function SculptureLines() {
  const groupRef = useRef<THREE.Group>(null)
  const linesDataRef = useRef<LineData[]>([])
  const [phase, setPhase] = useState<Phase>('idle')
  const phaseStartRef = useRef(0)
  const morphProgressRef = useRef(0)
  const visibleCountRef = useRef(CHAOS_LINE_COUNT)
  const tesseractTimeRef = useRef(0)
  const targetLineCountRef = useRef(0)
  
  const targetLines = useMemo(() => generateNeuralWireframe(MAX_LINE_COUNT), [])
  
  const getTesseractNodePosition = (
    nodeIndex: number, 
    nodeType: 'inner' | 'outer' | 'extra', 
    time: number
  ): THREE.Vector3 => {
    const innerIdx = nodeIndex
    const outerIdx = nodeIndex - 8
    const extraIdx = nodeIndex - 16
    const yOffset = 0.3
    
    if (nodeType === 'inner') {
      const cornerIdx = innerIdx
      const x = (cornerIdx & 1 ? 1 : -1)
      const y = (cornerIdx & 2 ? 1 : -1)
      const z = (cornerIdx & 4 ? 1 : -1)
      
      const baseSize = 0.7
      const pulseA = Math.sin(time * 1.2 + cornerIdx * 0.5) * 0.15
      const pulseB = Math.sin(time * 0.8 + cornerIdx * 0.3) * 0.1
      const scale = baseSize + pulseA + pulseB
      
      const rotX = Math.sin(time * 0.3 + cornerIdx * 0.2) * 0.1
      const rotZ = Math.cos(time * 0.4 + cornerIdx * 0.15) * 0.1
      
      const rotatedY = y * Math.cos(rotX) - z * Math.sin(rotX)
      const rotatedZ = y * Math.sin(rotX) + z * Math.cos(rotX)
      const finalX = x * Math.cos(rotZ) - rotatedY * Math.sin(rotZ)
      const finalY = x * Math.sin(rotZ) + rotatedY * Math.cos(rotZ)
      
      return new THREE.Vector3(finalX * scale, finalY * scale + yOffset, rotatedZ * scale)
    } else if (nodeType === 'outer') {
      const cornerIdx = outerIdx
      const x = (cornerIdx & 1 ? 1 : -1)
      const y = (cornerIdx & 2 ? 1 : -1)
      const z = (cornerIdx & 4 ? 1 : -1)
      
      const baseSize = 1.2
      const pulseA = Math.sin(time * 0.9 + cornerIdx * 0.4 + Math.PI) * 0.12
      const pulseB = Math.sin(time * 1.1 + cornerIdx * 0.25) * 0.08
      const scale = baseSize + pulseA + pulseB
      
      const rotX = Math.sin(time * 0.25 + cornerIdx * 0.15 + Math.PI * 0.5) * 0.08
      const rotZ = Math.cos(time * 0.35 + cornerIdx * 0.1) * 0.08
      
      const rotatedY = y * Math.cos(rotX) - z * Math.sin(rotX)
      const rotatedZ = y * Math.sin(rotX) + z * Math.cos(rotX)
      const finalX = x * Math.cos(rotZ) - rotatedY * Math.sin(rotZ)
      const finalY = x * Math.sin(rotZ) + rotatedY * Math.cos(rotZ)
      
      return new THREE.Vector3(finalX * scale, finalY * scale + yOffset, rotatedZ * scale)
    } else {
      const extraIdxActual = extraIdx
      const baseTheta = (extraIdxActual / 20) * Math.PI * 2
      const basePhi = (extraIdxActual % 5) / 5 * Math.PI
      
      const thetaOffset = time * 0.4 + extraIdxActual * 0.2
      const phiOffset = Math.sin(time * 0.6 + extraIdxActual * 0.3) * 0.3
      
      const theta = baseTheta + thetaOffset
      const phi = basePhi + phiOffset
      
      const radiusPulse = Math.sin(time * 1.5 + extraIdxActual * 0.4) * 0.15
      const radius = 1.0 + radiusPulse
      
      return new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * radius,
        Math.cos(phi) * 0.8 + yOffset + Math.sin(time * 0.7 + extraIdxActual * 0.5) * 0.1,
        Math.sin(phi) * Math.sin(theta) * radius
      )
    }
  }
  
  const generateTesseractConnections = useMemo(() => {
    const connections: { a: number, b: number, aType: 'inner' | 'outer' | 'extra', bType: 'inner' | 'outer' | 'extra' }[] = []
    
    // Inner cube edges
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        const bitDiff = i ^ j
        if (bitDiff === 1 || bitDiff === 2 || bitDiff === 4) {
          connections.push({ a: i, b: j, aType: 'inner', bType: 'inner' })
        }
      }
    }
    
    // Outer cube edges
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        const bitDiff = i ^ j
        if (bitDiff === 1 || bitDiff === 2 || bitDiff === 4) {
          connections.push({ a: i + 8, b: j + 8, aType: 'outer', bType: 'outer' })
        }
      }
    }
    
    // Connections between inner and outer cubes
    for (let i = 0; i < 8; i++) {
      connections.push({ a: i, b: i + 8, aType: 'inner', bType: 'outer' })
    }
    
    // Extra nodes connections
    for (let i = 0; i < 20; i++) {
      const innerIdx = i % 8
      const outerIdx = (i + 1) % 8
      connections.push({ a: 16 + i, b: innerIdx, aType: 'extra', bType: 'inner' })
      connections.push({ a: 16 + i, b: outerIdx + 8, aType: 'extra', bType: 'outer' })
    }
    
    // Extra to extra connections
    for (let i = 0; i < 20; i++) {
      for (let j = i + 1; j < 20; j++) {
        if (Math.abs(i - j) <= 2 || Math.abs(i - j) >= 18) {
          connections.push({ a: 16 + i, b: 16 + j, aType: 'extra', bType: 'extra' })
        }
      }
    }
    
    return connections
  }, [])
  
  useEffect(() => {
    linesDataRef.current = []
    
    for (let i = 0; i < MAX_LINE_COUNT; i++) {
      const targetLine = targetLines[i % targetLines.length]
      const currentPositions = new Float32Array(POINTS_PER_LINE * 3)
      const targetPositions = new Float32Array(POINTS_PER_LINE * 3)
      const morphStartPositions = new Float32Array(POINTS_PER_LINE * 3)
      
      targetLine.forEach((p, j) => {
        targetPositions[j * 3] = p.x
        targetPositions[j * 3 + 1] = p.y
        targetPositions[j * 3 + 2] = p.z
      })
      
      const connIdx = i % generateTesseractConnections.length
      const conn = generateTesseractConnections[connIdx]
      
      linesDataRef.current.push({
        currentPositions,
        targetPositions,
        morphStartPositions,
        visible: i < CHAOS_LINE_COUNT,
        nodeAIndex: conn.a,
        nodeBIndex: conn.b,
        nodeAType: conn.aType,
        nodeBType: conn.bType,
      })
    }
    
    targetLineCountRef.current = targetLines.length
    phaseStartRef.current = performance.now()
  }, [targetLines, generateTesseractConnections])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    const now = performance.now()
    const phaseElapsed = (now - phaseStartRef.current) / 1000
    
    if (phase === 'idle') {
      tesseractTimeRef.current += 0.016
      
      if (phaseElapsed > ANIMATION_CONFIG.timing.idleDuration) {
        linesDataRef.current.forEach(data => {
          for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
            data.morphStartPositions[j] = data.currentPositions[j]
          }
        })
        
        setPhase('morphing_to_neural')
        phaseStartRef.current = now
        morphProgressRef.current = 0
      }
    } else if (phase === 'morphing_to_neural') {
      tesseractTimeRef.current += 0.016
      morphProgressRef.current = Math.min(1, phaseElapsed / ANIMATION_CONFIG.timing.morphDuration)
      
      if (phaseElapsed > ANIMATION_CONFIG.timing.morphDuration) {
        setPhase('showing_neural')
        phaseStartRef.current = now
        visibleCountRef.current = targetLineCountRef.current
      } else {
        const progress = morphProgressRef.current
        const targetVisible = CHAOS_LINE_COUNT + Math.floor((targetLineCountRef.current - CHAOS_LINE_COUNT) * progress)
        visibleCountRef.current = targetVisible
      }
    } else if (phase === 'showing_neural') {
      tesseractTimeRef.current += 0.016
      
      if (phaseElapsed > ANIMATION_CONFIG.timing.modelShowDuration) {
        linesDataRef.current.forEach(data => {
          for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
            data.morphStartPositions[j] = data.currentPositions[j]
          }
        })
        setPhase('morphing_to_idle')
        phaseStartRef.current = now
        morphProgressRef.current = 0
      }
    } else if (phase === 'morphing_to_idle') {
      tesseractTimeRef.current += 0.016
      morphProgressRef.current = Math.min(1, phaseElapsed / ANIMATION_CONFIG.timing.morphDuration)
      
      if (phaseElapsed > ANIMATION_CONFIG.timing.morphDuration) {
        setPhase('idle')
        phaseStartRef.current = now
        visibleCountRef.current = CHAOS_LINE_COUNT
      } else {
        const progress = morphProgressRef.current
        const targetVisible = targetLineCountRef.current - Math.floor((targetLineCountRef.current - CHAOS_LINE_COUNT) * progress)
        visibleCountRef.current = targetVisible
      }
    }
    
    const tesseractTime = tesseractTimeRef.current
    
    const tesseractColor = new THREE.Color(ANIMATION_CONFIG.colors.tesseract)
    const neuralColor = new THREE.Color(ANIMATION_CONFIG.colors.neural)
    const pulseColor = new THREE.Color(ANIMATION_CONFIG.colors.pulse)
    
    let targetColor: THREE.Color
    if (phase === 'idle') {
      targetColor = tesseractColor
    } else if (phase === 'morphing_to_neural') {
      targetColor = tesseractColor.clone().lerp(neuralColor, morphProgressRef.current)
    } else if (phase === 'showing_neural') {
      const pulse = Math.sin(time * ANIMATION_CONFIG.nodes.pulseSpeed) * 0.15 + 0.85
      targetColor = neuralColor.clone().lerp(pulseColor, (1 - pulse) * 0.3)
    } else {
      targetColor = neuralColor.clone().lerp(tesseractColor, morphProgressRef.current)
    }
    
    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line
      const geometry = line.geometry
      const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const data = linesDataRef.current[i]
      
      if (!data) return
      
      const material = line.material as THREE.LineBasicMaterial
      material.color.copy(targetColor)
      
      const isVisible = i < visibleCountRef.current
      line.visible = isVisible
      
      if (!isVisible) return
      
      if (phase === 'idle') {
        const nodeA = getTesseractNodePosition(data.nodeAIndex, data.nodeAType, tesseractTime)
        const nodeB = getTesseractNodePosition(data.nodeBIndex, data.nodeBType, tesseractTime)
        
        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const pt = j / (POINTS_PER_LINE - 1)
          const x = nodeA.x + (nodeB.x - nodeA.x) * pt
          const y = nodeA.y + (nodeB.y - nodeA.y) * pt
          const z = nodeA.z + (nodeB.z - nodeA.z) * pt
          positionAttr.array[j * 3] = x
          positionAttr.array[j * 3 + 1] = y
          positionAttr.array[j * 3 + 2] = z
          data.currentPositions[j * 3] = x
          data.currentPositions[j * 3 + 1] = y
          data.currentPositions[j * 3 + 2] = z
        }
      } else if (phase === 'morphing_to_neural') {
        const t = morphProgressRef.current
        const eased = t < 0.5 
          ? 2 * t * t 
          : 1 - Math.pow(-2 * t + 2, 2) / 2
        
        const nodeA = getTesseractNodePosition(data.nodeAIndex, data.nodeAType, tesseractTime)
        const nodeB = getTesseractNodePosition(data.nodeBIndex, data.nodeBType, tesseractTime)
        
        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const pt = j / (POINTS_PER_LINE - 1)
          const tesseractX = nodeA.x + (nodeB.x - nodeA.x) * pt
          const tesseractY = nodeA.y + (nodeB.y - nodeA.y) * pt
          const tesseractZ = nodeA.z + (nodeB.z - nodeA.z) * pt
          
          const x = tesseractX + (data.targetPositions[j * 3] - tesseractX) * eased
          const y = tesseractY + (data.targetPositions[j * 3 + 1] - tesseractY) * eased
          const z = tesseractZ + (data.targetPositions[j * 3 + 2] - tesseractZ) * eased
          
          positionAttr.array[j * 3] = x
          positionAttr.array[j * 3 + 1] = y
          positionAttr.array[j * 3 + 2] = z
          data.currentPositions[j * 3] = x
          data.currentPositions[j * 3 + 1] = y
          data.currentPositions[j * 3 + 2] = z
        }
      } else if (phase === 'showing_neural') {
        const pulse = Math.sin(time * ANIMATION_CONFIG.nodes.pulseSpeed + i * 0.02) * ANIMATION_CONFIG.nodes.pulseAmplitude
        
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          const baseValue = data.targetPositions[j]
          positionAttr.array[j] = baseValue * (1 + pulse * 0.05)
          data.currentPositions[j] = positionAttr.array[j]
        }
      } else if (phase === 'morphing_to_idle') {
        const t = morphProgressRef.current
        const eased = t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2
        
        const nodeA = getTesseractNodePosition(data.nodeAIndex, data.nodeAType, tesseractTime)
        const nodeB = getTesseractNodePosition(data.nodeBIndex, data.nodeBType, tesseractTime)
        
        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const pt = j / (POINTS_PER_LINE - 1)
          const targetX = nodeA.x + (nodeB.x - nodeA.x) * pt
          const targetY = nodeA.y + (nodeB.y - nodeA.y) * pt
          const targetZ = nodeA.z + (nodeB.z - nodeA.z) * pt
          
          const x = data.morphStartPositions[j * 3] + (targetX - data.morphStartPositions[j * 3]) * eased
          const y = data.morphStartPositions[j * 3 + 1] + (targetY - data.morphStartPositions[j * 3 + 1]) * eased
          const z = data.morphStartPositions[j * 3 + 2] + (targetZ - data.morphStartPositions[j * 3 + 2]) * eased
          
          positionAttr.array[j * 3] = x
          positionAttr.array[j * 3 + 1] = y
          positionAttr.array[j * 3 + 2] = z
          data.currentPositions[j * 3] = x
          data.currentPositions[j * 3 + 1] = y
          data.currentPositions[j * 3 + 2] = z
        }
      }
      
      positionAttr.needsUpdate = true
    })
    
    const { rotation } = ANIMATION_CONFIG
    
    const rotationTime = time + rotation.baseOffset
    const groupRotationY = rotationTime * rotation.speedY
    const groupRotationX = Math.sin(rotationTime * rotation.speedX) * rotation.amplitudeX
    const groupRotationZ = Math.cos(rotationTime * rotation.speedZ) * rotation.amplitudeZ
    groupRef.current.rotation.y = groupRotationY
    groupRef.current.rotation.x = groupRotationX
    groupRef.current.rotation.z = groupRotationZ
  })
  
  const lineObjects = useMemo(() => {
    const objects: THREE.Line[] = []
    
    for (let i = 0; i < MAX_LINE_COUNT; i++) {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(POINTS_PER_LINE * 3)
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      
      const material = new THREE.LineBasicMaterial({
        color: ANIMATION_CONFIG.colors.neural,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      })
      
      const line = new THREE.Line(geometry, material)
      line.visible = i < CHAOS_LINE_COUNT
      objects.push(line)
    }
    return objects
  }, [])
  
  return (
    <group ref={groupRef} position={[0, 1.35, 0]} scale={0.5}>
      {lineObjects.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </group>
  )
}

function GlowParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = ANIMATION_CONFIG.particles.count
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return pos
  }, [])
  
  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.elapsedTime
    const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      posAttr.array[i3 + 1] += Math.sin(time + i * 0.1) * 0.001
    }
    posAttr.needsUpdate = true
    
    pointsRef.current.rotation.y = time * 0.02
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={ANIMATION_CONFIG.particles.size}
        color={ANIMATION_CONFIG.particles.color}
        transparent
        opacity={ANIMATION_CONFIG.particles.opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function CameraRig() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    camera.position.x = 0 + Math.sin(t * 0.08) * 0.3
    camera.position.y = 2.6 + Math.sin(t * 0.1) * 0.15
    camera.position.z = 5 + Math.cos(t * 0.08) * 0.3
    camera.lookAt(0, 1.35, 0)
  })
  
  return null
}

interface NeuralNetworkMorphAnimationProps {
  className?: string
}

// WebGL Cleanup Component
function WebGLCleanup({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      // Force cleanup of any WebGL contexts when unmounting
      if (containerRef.current) {
        const canvases = containerRef.current.querySelectorAll('canvas')
        canvases.forEach(canvas => {
          const gl = canvas.getContext('webgl') || canvas.getContext('webgl2')
          if (gl) {
            const ext = gl.getExtension('WEBGL_lose_context')
            if (ext) ext.loseContext()
          }
        })
      }
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }}>{children}</div>
}

export function NeuralNetworkMorphAnimation({ className = '' }: NeuralNetworkMorphAnimationProps) {
  // Use a unique key to force new canvas creation
  const [canvasKey] = useState(() => `neural-canvas-${Date.now()}`)
  
  return (
    <div className={`w-full h-full ${className}`}>
      <WebGLCleanup>
        <Canvas
          key={canvasKey}
          camera={{ position: [0, 2.6, 5], fov: 45 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance'
          }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.4} color="#43A399" />
          <pointLight position={[-10, 5, -10]} intensity={0.2} color="#2D7A72" />
          
          <SculptureLines />
          <GlowParticles />
          <CameraRig />
        </Canvas>
      </WebGLCleanup>
    </div>
  )
}

export default NeuralNetworkMorphAnimation
