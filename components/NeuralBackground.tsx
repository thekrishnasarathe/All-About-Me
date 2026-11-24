"use client";

import { useCallback, useEffect, useRef } from "react";

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

interface DataPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

const NODE_COUNT = 40;
const CONNECTION_DIST = 180;
const PACKET_SPAWN_CHANCE = 0.003;

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const nodesRef = useRef<NeuralNode[]>([]);
  const packetsRef = useRef<DataPacket[]>([]);
  const rafRef = useRef(0);

  const initNodes = useCallback((w: number, h: number) => {
    const nodes: NeuralNode[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: 1.5 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015
      });
    }
    nodesRef.current = nodes;
    packetsRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodesRef.current.length === 0) {
        initNodes(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      };
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) { rafRef.current = requestAnimationFrame(draw); return; }

      const w = rect.width;
      const h = rect.height;
      const nodes = nodesRef.current;
      const packets = packetsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // parallax offset
      const px = (mx - 0.5) * 8;
      const py = (my - 0.5) * 8;

      ctx.clearRect(0, 0, w, h);

      // update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x + px, nodes[i].y + py);
            ctx.lineTo(nodes[j].x + px, nodes[j].y + py);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            // spawn data packets
            if (Math.random() < PACKET_SPAWN_CHANCE) {
              packets.push({
                fromIndex: i,
                toIndex: j,
                progress: 0,
                speed: 0.008 + Math.random() * 0.012
              });
            }
          }
        }
      }

      // draw nodes
      for (const node of nodes) {
        const glow = 0.4 + Math.sin(node.pulse) * 0.3;
        const r = node.radius * (1 + Math.sin(node.pulse) * 0.2);

        // outer glow
        const gradient = ctx.createRadialGradient(
          node.x + px, node.y + py, 0,
          node.x + px, node.y + py, r * 4
        );
        gradient.addColorStop(0, `rgba(0, 240, 255, ${glow * 0.25})`);
        gradient.addColorStop(1, "rgba(0, 240, 255, 0)");
        ctx.beginPath();
        ctx.arc(node.x + px, node.y + py, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // core
        ctx.beginPath();
        ctx.arc(node.x + px, node.y + py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${glow})`;
        ctx.fill();
      }

      // draw and update data packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const packet = packets[k];
        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const from = nodes[packet.fromIndex];
        const to = nodes[packet.toIndex];
        const x = from.x + (to.x - from.x) * packet.progress;
        const y = from.y + (to.y - from.y) * packet.progress;

        const packetGlow = ctx.createRadialGradient(
          x + px, y + py, 0,
          x + px, y + py, 5
        );
        packetGlow.addColorStop(0, "rgba(0, 240, 255, 0.9)");
        packetGlow.addColorStop(0.5, "rgba(0, 240, 255, 0.3)");
        packetGlow.addColorStop(1, "rgba(0, 240, 255, 0)");
        ctx.beginPath();
        ctx.arc(x + px, y + py, 5, 0, Math.PI * 2);
        ctx.fillStyle = packetGlow;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 z-0 opacity-50"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
