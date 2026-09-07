import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

import goldCornerImg from "../assets/images/gold_corner_carving_1784774375970.jpg";
import goldCornerTopLeftImg from "../assets/images/gold_corner_top_left_1784775288496.jpg";
import goldCornerTopRightImg from "../assets/images/gold_corner_top_right_1784775305830.jpg";
import goldCornerBottomLeftImg from "../assets/images/gold_corner_bottom_left_1784775321816.jpg";
import goldCornerBottomRightImg from "../assets/images/gold_corner_bottom_right_1784775335511.jpg";

import realPinkRoseClusterImg from "../assets/images/real_pink_rose_cluster_1784774396383.jpg";
import realFlowerGarlandImg from "../assets/images/real_flower_garland_1784774412731.jpg";
import realFlowerGarlandSagePinkImg from "../assets/images/real_flower_garland_sage_pink_1784775355224.jpg";
import realHangingFloralSwagImg from "../assets/images/real_hanging_floral_swag_1784775378885.jpg";

import singleRealPinkImg from "../assets/images/single_real_pink_flower_1784774428751.jpg";
import singleRealYellowImg from "../assets/images/single_real_yellow_flower_1784774446011.jpg";
import singleRealDustyPinkRoseImg from "../assets/images/single_real_dusty_pink_rose_1784775400951.jpg";

/**
 * 3D Ornate Gold Floral Corner Carving component
 * User Specified Rotations & Images:
 * - Kiri Atas (top-left): rotate left (-90deg)
 * - Kanan Atas (top-right): 0deg
 * - Kiri Bawah (bottom-left): 2x rotate left (-180deg)
 * - Kanan Bawah (bottom-right): rotate ke kanan (90deg)
 */
export function GoldCornerCarving({ 
  position = "top-right", 
  className = "w-16 h-16 sm:w-20 sm:h-20" 
}: { 
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; 
  className?: string;
}) {
  let positionStyle = "";
  let imgSrc = goldCornerImg;

  switch (position) {
    case "top-left":
      positionStyle = "top-0 left-0";
      imgSrc = goldCornerTopLeftImg || goldCornerImg;
      break;
    case "bottom-right":
      positionStyle = "bottom-0 right-0";
      imgSrc = goldCornerBottomRightImg || goldCornerImg;
      break;
    case "bottom-left":
      positionStyle = "bottom-0 left-0";
      imgSrc = goldCornerBottomLeftImg || goldCornerImg;
      break;
    case "top-right":
    default:
      positionStyle = "top-0 right-0";
      imgSrc = goldCornerTopRightImg || goldCornerImg;
      break;
  }

  return (
    <div className={`absolute ${positionStyle} pointer-events-none z-20`}>
      <img
        src={imgSrc}
        alt="Ukiran Emas Pojok"
        className={`${className} object-contain transition-transform duration-300 drop-shadow-md`}
      />
    </div>
  );
}

/**
 * Real Flower Garland Border Accent (Sage Olive + Dusty Pink)
 */
export function RealFlowerGarland({ className = "w-full h-12" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden pointer-events-none ${className}`}>
      <img
        src={realFlowerGarlandSagePinkImg || realFlowerGarlandImg}
        alt="Real Flower Garland"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/**
 * Real Pink Rose Cluster Frame Accent
 */
export function RealFlowerCluster({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <img
        src={realPinkRoseClusterImg}
        alt="Real Flower Cluster"
        className="w-full h-full object-contain drop-shadow-md"
      />
    </div>
  );
}

/**
 * Hanging Wall Floral Swag for Desktop framing
 */
export function RealHangingFloralSwag({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <img
        src={realHangingFloralSwagImg}
        alt="Real Hanging Floral Swag"
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  );
}

/**
 * Desktop Side Framing Decorators for Laptop / Desktop screens
 */
export function DesktopSideDecorations() {
  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {/* Top Left Desktop Hanging Floral Garland */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-90 transition-transform duration-500 hover:scale-105">
        <RealHangingFloralSwag className="w-full h-full" />
      </div>

      {/* Top Right Desktop Hanging Floral Garland */}
      <div className="absolute top-0 right-0 w-64 h-64 transform scale-x-[-1] opacity-90 transition-transform duration-500 hover:scale-105">
        <RealHangingFloralSwag className="w-full h-full" />
      </div>

      {/* Left Side Penjor Accent */}
      <div className="absolute left-4 top-1/3 w-20 h-96 opacity-60">
        <PenjorOrnament side="left" className="w-full h-full" />
      </div>

      {/* Right Side Penjor Accent */}
      <div className="absolute right-4 top-1/3 w-20 h-96 opacity-60">
        <PenjorOrnament side="right" className="w-full h-full" />
      </div>

      {/* Bottom Left Desktop Floral Bouquet */}
      <div className="absolute bottom-4 left-6 w-52 h-52 opacity-80">
        <RealFlowerCluster className="w-full h-full" />
      </div>

      {/* Bottom Right Desktop Floral Bouquet */}
      <div className="absolute bottom-4 right-6 w-52 h-52 transform scale-x-[-1] opacity-80">
        <RealFlowerCluster className="w-full h-full" />
      </div>
    </div>
  );
}

/**
 * Beautifully drawn Pink Kamboja (frangipani) flower SVG
 */
export function PinkKambojaFlower({ className = "w-8 h-8", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`${className} filter drop-shadow-[0_2px_6px_rgba(236,72,153,0.3)]`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
      whileHover={{ scale: 1.12, rotate: 15 }}
    >
      {/* 5 Petals overlapping gracefully with Pink Gradient */}
      <path d="M50 50 C40 25, 60 25, 50 10 C65 25, 60 40, 50 50 Z" fill="url(#kamboja-pink-grad)" />
      <path d="M50 50 C75 40, 75 60, 90 50 C75 65, 60 60, 50 50 Z" fill="url(#kamboja-pink-grad)" transform="rotate(72, 50, 50)" />
      <path d="M50 50 C60 75, 40 75, 50 90 C35 75, 40 60, 50 50 Z" fill="url(#kamboja-pink-grad)" transform="rotate(144, 50, 50)" />
      <path d="M50 50 C25 60, 25 40, 10 50 C25 35, 40 40, 50 50 Z" fill="url(#kamboja-pink-grad)" transform="rotate(216, 50, 50)" />
      <path d="M50 50 C40 25, 25 40, 20 20 C35 25, 40 40, 50 50 Z" fill="url(#kamboja-pink-grad)" transform="rotate(288, 50, 50)" />

      {/* Center Yellow & Golden Glow */}
      <circle cx="50" cy="50" r="14" fill="url(#kamboja-pink-center)" />
      <circle cx="50" cy="50" r="6" fill="#FBBF24" />

      <defs>
        <radialGradient id="kamboja-pink-grad" cx="50%" cy="50%" r="55%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#FDF2F8" />
          <stop offset="45%" stopColor="#FBCFE8" />
          <stop offset="85%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#DB2777" />
        </radialGradient>
        <radialGradient id="kamboja-pink-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}

/**
 * Beautifully drawn Yellow Kamboja flower SVG
 */
export function YellowKambojaFlower({ className = "w-8 h-8", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`${className} filter drop-shadow-[0_2px_6px_rgba(245,158,11,0.3)]`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
      whileHover={{ scale: 1.12, rotate: 15 }}
    >
      <path d="M50 50 C40 25, 60 25, 50 10 C65 25, 60 40, 50 50 Z" fill="url(#kamboja-yellow-grad)" />
      <path d="M50 50 C75 40, 75 60, 90 50 C75 65, 60 60, 50 50 Z" fill="url(#kamboja-yellow-grad)" transform="rotate(72, 50, 50)" />
      <path d="M50 50 C60 75, 40 75, 50 90 C35 75, 40 60, 50 50 Z" fill="url(#kamboja-yellow-grad)" transform="rotate(144, 50, 50)" />
      <path d="M50 50 C25 60, 25 40, 10 50 C25 35, 40 40, 50 50 Z" fill="url(#kamboja-yellow-grad)" transform="rotate(216, 50, 50)" />
      <path d="M50 50 C40 25, 25 40, 20 20 C35 25, 40 40, 50 50 Z" fill="url(#kamboja-yellow-grad)" transform="rotate(288, 50, 50)" />

      <circle cx="50" cy="50" r="14" fill="url(#kamboja-yellow-center)" />
      <circle cx="50" cy="50" r="6" fill="#D97706" />

      <defs>
        <radialGradient id="kamboja-yellow-grad" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="40%" stopColor="#FEF08A" />
          <stop offset="80%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        <radialGradient id="kamboja-yellow-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="70%" stopColor="#D97706" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}

/**
 * Tropical Leaf Branch Vector Accent (Daun Tropis Emas & Hijau)
 */
export function LeafBranchOrnament({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`${className} pointer-events-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main stem curve */}
      <path d="M10 90 Q30 70 85 15" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M30 70 Q20 50 12 52 Q28 60 30 70" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
      <path d="M30 70 Q45 55 52 58 Q40 68 30 70" fill="#4ADE80" stroke="#15803D" strokeWidth="1" />
      
      <path d="M50 50 Q38 32 30 35 Q46 42 50 50" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
      <path d="M50 50 Q66 36 72 40 Q60 50 50 50" fill="#86EFAC" stroke="#15803D" strokeWidth="1" />

      <path d="M70 30 Q60 14 52 18 Q68 24 70 30" fill="#4ADE80" stroke="#15803D" strokeWidth="1" />
      <path d="M70 30 Q84 18 90 22 Q80 30 70 30" fill="#22C55E" stroke="#15803D" strokeWidth="1" />

      {/* Gold leaf accents */}
      <path d="M85 15 Q88 5 92 8 Q89 18 85 15" fill="#FAB313" stroke="#B45309" strokeWidth="1" />
    </svg>
  );
}

/**
 * Beautifully drawn 5-petal Kamboja (frangipani) flower SVG
 */
export function KambojaFlower({ className = "w-8 h-8", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`${className} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
      whileHover={{ scale: 1.1, rotate: 15 }}
    >
      {/* 5 Petals overlapping gracefully */}
      {/* Petal 1 (Top) */}
      <path
        d="M50 50 C40 25, 60 25, 50 10 C65 25, 60 40, 50 50 Z"
        fill="url(#kamboja-grad)"
      />
      {/* Petal 2 (Right Top) */}
      <path
        d="M50 50 C75 40, 75 60, 90 50 C75 65, 60 60, 50 50 Z"
        fill="url(#kamboja-grad)"
        transform="rotate(72, 50, 50)"
      />
      {/* Petal 3 (Right Bottom) */}
      <path
        d="M50 50 C60 75, 40 75, 50 90 C35 75, 40 60, 50 50 Z"
        fill="url(#kamboja-grad)"
        transform="rotate(144, 50, 50)"
      />
      {/* Petal 4 (Left Bottom) */}
      <path
        d="M50 50 C25 60, 25 40, 10 50 C25 35, 40 40, 50 50 Z"
        fill="url(#kamboja-grad)"
        transform="rotate(216, 50, 50)"
      />
      {/* Petal 5 (Left Top) */}
      <path
        d="M50 50 C40 25, 25 40, 20 20 C35 25, 40 40, 50 50 Z"
        fill="url(#kamboja-grad)"
        transform="rotate(288, 50, 50)"
      />

      {/* Center Pistil/Glow */}
      <circle cx="50" cy="50" r="12" fill="url(#kamboja-center-grad)" />
      <circle cx="50" cy="50" r="6" fill="#FBBF24" />

      <defs>
        {/* Soft white-to-cream gradient for petals */}
        <radialGradient id="kamboja-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="60%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3F4F6" />
        </radialGradient>
        {/* Rich Balinese gold/yellow gradient for the center */}
        <radialGradient id="kamboja-center-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}

/**
 * Elegant minimalist Balinese Penjor (traditional ritual bamboo pole)
 */
export function PenjorOrnament({ className = "w-16 h-48", side = "left" }: { className?: string; side?: "left" | "right" }) {
  const isRight = side === "right";
  return (
    <div className={`${className} select-none pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]`}>
      <svg
        viewBox="0 0 100 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ transform: isRight ? "scaleX(-1)" : "none" }}
      >
        {/* Main curved bamboo pole */}
        <path
          d="M10 290 Q15 150 40 90 T70 40 T90 45 C80 43, 75 52, 73 60"
          stroke="#EAB308"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Bamboo node segments */}
        <path d="M11.5 240 L16.5 242" stroke="#B45309" strokeWidth="2.5" />
        <path d="M14 180 L19 181.5" stroke="#B45309" strokeWidth="2" />
        <path d="M22 120 L27 121" stroke="#B45309" strokeWidth="2" />
        <path d="M42 80 L47 79" stroke="#B45309" strokeWidth="1.5" />

        {/* Decorative hanging Sampian (traditional palm leaf tassel at the tip) */}
        {/* Attachment ring */}
        <circle cx="73" cy="62" r="3" fill="#D97706" />
        {/* Hanging threads and leaf weaves */}
        <path
          d="M73 65 C72 80, 68 100, 65 115 M73 65 C75 85, 76 105, 78 120"
          stroke="#EAB308"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Sampian layered ornaments */}
        {/* Diamond leaf shape 1 */}
        <path
          d="M62 100 L68 95 L72 105 L66 110 Z"
          fill="#FEF08A"
          stroke="#CA8A04"
          strokeWidth="1"
        />
        <path
          d="M72 110 L80 105 L84 115 L76 120 Z"
          fill="#FEF08A"
          stroke="#CA8A04"
          strokeWidth="1"
        />

        {/* Hanging tassels (rumbing) at the very bottom of sampian */}
        <path
          d="M65 115 Q63 135 60 145 M78 120 Q80 140 82 150 M70 110 Q70 135 72 155"
          stroke="#EAB308"
          strokeWidth="1"
          strokeDasharray="2,2"
        />

        {/* Mid-pole hanging flags/coconut leaf decorations (Klangsah/Sari) */}
        {/* Ribbon decoration 1 */}
        <path
          d="M26 122 C32 125, 34 135, 32 142 C30 140, 28 130, 26 122"
          fill="#CA8A04"
          stroke="#B45309"
          strokeWidth="0.5"
        />
        <path
          d="M26 122 Q15 135 12 145"
          stroke="#EAB308"
          strokeWidth="1"
        />
        
        {/* Ribbon decoration 2 */}
        <path
          d="M17 181 C23 184, 25 194, 22 201 C20 198, 19 189, 17 181"
          fill="#CA8A04"
          stroke="#B45309"
          strokeWidth="0.5"
        />
        <path
          d="M17 181 Q5 195 2 205"
          stroke="#EAB308"
          strokeWidth="1"
        />

        {/* Small hanging bell/flower at the very tip */}
        <circle cx="73" cy="61" r="1.5" fill="#EF4444" />
      </svg>
    </div>
  );
}

/**
 * Simple, elegant Balinese wood carving corner ornament (Patra Sari motif)
 * Can be rotated to fit any corner.
 */
export function BalineseCornerOrnament({ className = "w-10 h-10", position = "top-left" }: { className?: string; position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  let rotation = "";
  if (position === "top-right") rotation = "rotate-90";
  if (position === "bottom-right") rotation = "rotate-180";
  if (position === "bottom-left") rotation = "-rotate-90";

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${rotation} absolute pointer-events-none opacity-85 transition-opacity duration-300`}
      fill="none"
      stroke="#FAB313"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer corner frame lines */}
      <path d="M 5,95 L 5,5 C 5,5 45,5 65,5" strokeWidth="2" opacity="0.3" />
      <path d="M 95,5 L 5,5 L 5,95" />

      {/* Traditional Patra curls/carving hooks */}
      {/* Outer elegant curl */}
      <path d="M 5,5 C 25,15 45,15 55,25 C 65,35 60,55 45,55 C 30,55 25,40 35,30 C 45,20 55,30 50,45" />
      
      {/* Small accent swirl inside corner */}
      <path d="M 5,25 C 15,25 20,20 20,10" />
      <path d="M 25,5 C 25,15 20,20 10,20" />

      {/* Leaves branching from corner */}
      <path d="M 5,45 Q 25,40 35,50" />
      <path d="M 45,5 Q 40,25 50,35" />
      
      {/* Center gold dot */}
      <circle cx="15" cy="15" r="3" fill="#FAB313" stroke="none" />
    </svg>
  );
}

/**
 * Elegant Balinese border divider line with Patra flower in center
 */
export function BalineseDivider({ className = "w-full my-4" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className} select-none`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#FAB313]/50" />
      {/* Center Patra Flower Symbol */}
      <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#FAB313]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="4" fill="currentColor" />
        {/* 4 Petals */}
        <path d="M20,16 C16,10 24,10 20,16 Z" />
        <path d="M20,24 C16,30 24,30 20,24 Z" />
        <path d="M16,20 C10,16 10,24 16,20 Z" />
        <path d="M24,20 C30,16 30,24 24,20 Z" />
        {/* Diagonal accents */}
        <path d="M17,17 L23,23 M17,23 L23,17" strokeWidth="1" opacity="0.6" />
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#FAB313]/50" />
    </div>
  );
}

/**
 * A beautiful, highly detailed SVG silhouette of a multi-tiered Balinese Meru temple (Pura Meru).
 * Perfect as a faded background watermark.
 */
export function BalineseMeruSilhouette({ className = "w-64 h-96", opacity = "opacity-10" }: { className?: string; opacity?: string }) {
  return (
    <svg
      viewBox="0 0 200 360"
      className={`${className} ${opacity} pointer-events-none select-none transition-all duration-700`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sacred light glow indicator */}
      <circle cx="100" cy="40" r="15" className="stroke-none fill-amber-500/10" />

      {/* TIER 11 (Top Pinnacle / Crown / Murda) */}
      <path d="M100,10 L100,35" strokeWidth="2.5" />
      <path d="M96,25 Q100,15 104,25 Q100,32 96,25 Z" fill="currentColor" fillOpacity="0.2" />
      <circle cx="100" cy="18" r="3" fill="currentColor" />

      {/* TIER 10 (Roof 10 - Tiny Top Roof) */}
      <path d="M92,48 C94,40 106,40 108,48 C102,48 98,48 92,48 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M88,52 L112,52 L105,48 L95,48 Z" />

      {/* TIER 9 (Roof 9) */}
      <path d="M85,68 Q100,56 115,68 C108,68 92,68 85,68 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M82,73 L118,73 L110,68 L90,68 Z" />
      {/* Hanging bells on tip */}
      <circle cx="82" cy="73" r="1.2" fill="currentColor" />
      <circle cx="118" cy="73" r="1.2" fill="currentColor" />

      {/* TIER 8 (Roof 8) */}
      <path d="M80,90 Q100,76 120,90 C110,90 90,90 80,90 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M75,96 L125,96 L116,90 L84,90 Z" />
      <circle cx="75" cy="96" r="1.2" fill="currentColor" />
      <circle cx="125" cy="96" r="1.2" fill="currentColor" />

      {/* TIER 7 (Roof 7) */}
      <path d="M74,115 Q100,98 126,115 C114,115 86,115 74,115 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M68,122 L132,122 L121,115 L79,115 Z" />
      <circle cx="68" cy="122" r="1.5" fill="currentColor" />
      <circle cx="132" cy="122" r="1.5" fill="currentColor" />

      {/* TIER 6 (Roof 6) */}
      <path d="M68,143 Q100,123 132,143 C118,143 82,143 68,143 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M60,151 L140,151 L127,143 L73,143 Z" />
      <circle cx="60" cy="151" r="1.5" fill="currentColor" />
      <circle cx="140" cy="151" r="1.5" fill="currentColor" />

      {/* TIER 5 (Roof 5) */}
      <path d="M62,174 Q100,152 138,174 C122,174 78,174 62,174 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M52,183 L148,183 L133,174 L67,174 Z" />
      <circle cx="52" cy="183" r="1.8" fill="currentColor" />
      <circle cx="148" cy="183" r="1.8" fill="currentColor" />

      {/* TIER 4 (Roof 4) */}
      <path d="M55,208 Q100,183 145,208 C128,208 72,208 55,208 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M44,218 L156,218 L139,208 L61,208 Z" strokeWidth="1.4" />
      <circle cx="44" cy="218" r="1.8" fill="currentColor" />
      <circle cx="156" cy="218" r="1.8" fill="currentColor" />

      {/* TIER 3 (Roof 3) */}
      <path d="M48,244 Q100,217 152,244 C132,244 68,244 48,244 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M35,255 L165,255 L146,244 L54,244 Z" strokeWidth="1.4" />
      <circle cx="35" cy="255" r="2" fill="currentColor" />
      <circle cx="165" cy="255" r="2" fill="currentColor" />

      {/* TIER 2 (Roof 2) */}
      <path d="M40,282 Q100,252 160,282 C138,282 62,282 40,282 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M25,294 L175,294 L154,282 L46,282 Z" strokeWidth="1.5" />
      <circle cx="25" cy="294" r="2.2" fill="currentColor" />
      <circle cx="175" cy="294" r="2.2" fill="currentColor" />

      {/* TIER 1 (Bottom Roof 1 - Widest) */}
      <path d="M32,322 Q100,290 168,322 C142,322 58,322 32,322 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M15,335 L185,335 L161,322 L39,322 Z" strokeWidth="1.6" />
      <circle cx="15" cy="335" r="2.5" fill="currentColor" />
      <circle cx="185" cy="335" r="2.5" fill="currentColor" />

      {/* Wooden pillars supporting the roofs */}
      <line x1="75" y1="335" x2="75" y2="355" strokeWidth="1.5" />
      <line x1="125" y1="335" x2="125" y2="355" strokeWidth="1.5" />
      <line x1="100" y1="335" x2="100" y2="355" strokeWidth="1" />

      {/* Ornate Base / Temple Altar Pedestal (Batur) */}
      <rect x="50" y="352" width="100" height="8" rx="1.5" fill="currentColor" fillOpacity="0.2" strokeWidth="1.5" />
      
      {/* Decorative details on the base pedestal */}
      <path d="M60,356 L140,356" strokeWidth="1" />
      <path d="M70,352 C75,348 80,348 85,352" strokeWidth="0.8" />
      <path d="M115,352 C120,348 125,348 130,352" strokeWidth="0.8" />

      {/* Tiny incense smoke spirals at base sides */}
      <path d="M38,358 Q34,352 38,348 T36,340" strokeWidth="0.6" opacity="0.4" />
      <path d="M162,358 Q166,352 162,348 T164,340" strokeWidth="0.6" opacity="0.4" />
    </svg>
  );
}

/**
 * Beautiful Left Gate half of Balinese Candi Bentar
 */
export function LeftGateSVG() {
  return (
    <svg
      viewBox="0 0 120 240"
      className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gate-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAB313" />
          <stop offset="50%" stopColor="#dfb24c" />
          <stop offset="100%" stopColor="#b58212" />
        </linearGradient>
      </defs>

      {/* PEDESTAL / BASE TIER (Thick Bottom Blocks) */}
      <path d="M 10,230 L 120,230 L 120,240 L 10,240 Z" fill="#201107" stroke="url(#gate-gold-grad)" strokeWidth="1.5" />
      <path d="M 20,215 L 120,215 L 120,230 L 20,230 Z" fill="#29160a" stroke="url(#gate-gold-grad)" strokeWidth="1.3" />
      <path d="M 28,195 L 120,195 L 120,215 L 28,215 Z" fill="#311d0e" stroke="url(#gate-gold-grad)" strokeWidth="1.3" />
      {/* Traditional nested carvings on the base */}
      <path d="M 35,215 C 30,222 25,225 20,230" stroke="url(#gate-gold-grad)" />
      <path d="M 45,195 C 40,202 35,208 28,215" stroke="url(#gate-gold-grad)" />

      {/* MID SECTION (Doorframe & Ornate Pillars) */}
      <path d="M 38,165 L 120,165 L 120,195 L 38,195 Z" fill="#3a2211" stroke="url(#gate-gold-grad)" strokeWidth="1.3" />
      <path d="M 44,140 L 120,140 L 120,165 L 44,165 Z" fill="#422714" stroke="url(#gate-gold-grad)" strokeWidth="1.3" />
      
      {/* Traditional Balinese wing relief (Patra/Ukir wing) on the left side of base */}
      <path d="M 38,165 Q 15,175 10,195 Q 25,190 38,195" fill="none" stroke="url(#gate-gold-grad)" strokeWidth="1.2" />
      <path d="M 44,140 Q 20,150 15,165 Q 30,160 44,165" fill="none" stroke="url(#gate-gold-grad)" strokeWidth="1.2" />
      
      {/* TIER 1 TOWER (Stepped body) */}
      <path d="M 52,115 L 120,115 L 120,140 L 52,140 Z" fill="#4e2e18" stroke="url(#gate-gold-grad)" strokeWidth="1.3" />
      <path d="M 60,92 L 120,92 L 120,115 L 60,115 Z" fill="#58341b" stroke="url(#gate-gold-grad)" strokeWidth="1.3" />

      {/* TIER 2 TOWER */}
      <path d="M 68,70 L 120,70 L 120,92 L 68,92 Z" fill="#643b1f" stroke="url(#gate-gold-grad)" strokeWidth="1.2" />
      <path d="M 76,50 L 120,50 L 120,70 L 76,70 Z" fill="#704223" stroke="url(#gate-gold-grad)" strokeWidth="1.2" />

      {/* TIER 3 TOWER (Top Levels) */}
      <path d="M 84,32 L 120,32 L 120,50 L 84,50 Z" fill="#7a4827" stroke="url(#gate-gold-grad)" strokeWidth="1.2" />
      <path d="M 92,16 L 120,16 L 120,32 L 92,32 Z" fill="#844e2b" stroke="url(#gate-gold-grad)" strokeWidth="1.2" />

      {/* PINNACLE / MURDA (Top Crown) */}
      <path d="M 100,2 L 120,2 L 120,16 L 100,16 Z" fill="#8d542f" stroke="url(#gate-gold-grad)" strokeWidth="1.2" />
      <circle cx="110" cy="9" r="3" fill="#FAB313" />

      {/* Intricate Relief Carving Patterns (Golden lines inside panels to look hand-carved) */}
      <path d="M 50,195 L 50,215" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />
      <path d="M 70,195 L 70,215" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />
      <path d="M 90,195 L 90,215" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />
      
      <path d="M 55,165 L 55,195" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />
      <path d="M 80,165 L 80,195" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />
      <path d="M 105,165 L 105,195" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />

      <path d="M 65,140 L 65,165" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />
      <path d="M 90,140 L 90,165" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />

      <path d="M 75,115 L 75,140" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />
      <path d="M 98,115 L 98,140" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />

      <path d="M 80,92 L 80,115" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />
      <path d="M 100,92 L 100,115" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.7" />

      {/* Traditional spiral curls (Ukir Bali) inside panels */}
      <path d="M 80,180 Q 75,175 80,170 T 85,180" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.6" />
      <path d="M 105,180 Q 100,175 105,170 T 110,180" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.6" />
      <path d="M 90,152 Q 85,148 90,144 T 95,152" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.6" />
      <path d="M 98,127 Q 94,123 98,119 T 102,127" stroke="url(#gate-gold-grad)" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

/**
 * Beautiful Right Gate half of Balinese Candi Bentar (Symmetrical Mirror of Left)
 */
export function RightGateSVG() {
  return (
    <div style={{ transform: "scaleX(-1)" }} className="w-full h-full">
      <LeftGateSVG />
    </div>
  );
}

/**
 * A magnificent Balinese Candi Bentar (split gate) transition overlay.
 * Features two half gates that split and slide out left and right when mounted,
 * creating a cinematic opening entrance into the invitation content.
 */
export function BalineseSplitGate() {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDismissed(true);
    }, 2200); // Allow animation to fully complete before unmounting
    return () => clearTimeout(timer);
  }, []);

  if (isDismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex pointer-events-none overflow-hidden">
      {/* Left Gate Panel */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
        className="w-1/2 h-full bg-[#311d0e] border-r border-[#FAB313]/30 relative flex items-center justify-end shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
        style={{ backgroundImage: "linear-gradient(to right, #201107, #3b2311)" }}
      >
        {/* Left Candi Bentar SVG aligned to the right edge */}
        <div className="h-[80vh] w-[45vw] max-w-[320px] mr-0 flex items-center justify-end text-[#FAB313]/90">
          <LeftGateSVG />
        </div>
      </motion.div>

      {/* Right Gate Panel */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
        className="w-1/2 h-full bg-[#311d0e] border-l border-[#FAB313]/30 relative flex items-center justify-start shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
        style={{ backgroundImage: "linear-gradient(to left, #201107, #3b2311)" }}
      >
        {/* Right Candi Bentar SVG aligned to the left edge */}
        <div className="h-[80vh] w-[45vw] max-w-[320px] ml-0 flex items-center justify-start text-[#FAB313]/90">
          <RightGateSVG />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * A luxurious Flowery Curtain Gate transition overlay ("Gorden Bunga").
 * Features elegant white-gold satin curtain panels decorated with pink & yellow
 * Kamboja flowers and leaf garlands that split and slide open left and right.
 */
export function FloweryCurtainGate() {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDismissed(true);
    }, 2400); // Unmount after curtain slide finishes
    return () => clearTimeout(timer);
  }, []);

  if (isDismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex pointer-events-none overflow-hidden">
      {/* Top Hanging Floral Header Garland across both sides */}
      <motion.div 
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: -120, opacity: 0 }}
        transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 z-20 h-28 flex items-center justify-around pointer-events-none px-4 bg-gradient-to-b from-black/40 via-black/20 to-transparent"
      >
        <div className="flex items-center gap-3 sm:gap-6">
          <PinkKambojaFlower className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-lg" />
          <YellowKambojaFlower className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-lg" />
          <LeafBranchOrnament className="w-10 h-10 sm:w-14 sm:h-14" />
          <PinkKambojaFlower className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-xl" />
          <YellowKambojaFlower className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-lg" />
          <PinkKambojaFlower className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-lg" />
        </div>
      </motion.div>

      {/* Left Curtain Panel */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
        className="w-1/2 h-full relative flex flex-col justify-between items-end border-r-2 border-[#FAB313]/50 shadow-[15px_0_40px_rgba(0,0,0,0.6)] overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FFFDF9 0%, #FAF0E6 40%, #F5E6D3 80%, #E6CFA8 100%)",
        }}
      >
        {/* Satin Curtain Folds Texture overlay */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none" 
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(181,130,18,0.1) 0px, rgba(255,255,255,0.4) 30px, rgba(181,130,18,0.15) 60px)"
          }} 
        />

        {/* Top-Right Floral Swag on Left Curtain */}
        <div className="absolute top-4 right-2 z-10 flex flex-col items-end gap-2 pr-2">
          <div className="flex items-center gap-1">
            <LeafBranchOrnament className="w-8 h-8 rotate-45" />
            <PinkKambojaFlower className="w-12 h-12" />
            <YellowKambojaFlower className="w-10 h-10" />
          </div>
          <div className="flex items-center gap-1 pr-4">
            <PinkKambojaFlower className="w-8 h-8" />
            <YellowKambojaFlower className="w-8 h-8" />
          </div>
          {/* Hanging flower string */}
          <div className="flex flex-col items-center gap-2 pr-6 mt-2 opacity-80">
            <span className="w-0.5 h-12 bg-gradient-to-b from-amber-400 to-pink-300" />
            <PinkKambojaFlower className="w-6 h-6 animate-pulse" />
            <span className="w-0.5 h-8 bg-gradient-to-b from-pink-300 to-yellow-400" />
            <YellowKambojaFlower className="w-5 h-5" />
          </div>
        </div>

        {/* Middle Royal Crest Ornament */}
        <div className="my-auto pr-6 text-amber-800/80 z-10 flex flex-col items-end">
          <div className="w-16 h-16 rounded-full border-2 border-[#FAB313]/60 bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <YellowKambojaFlower className="w-10 h-10" />
          </div>
        </div>

        {/* Bottom Floral Garland */}
        <div className="mb-8 pr-4 z-10 flex items-center gap-2">
          <PinkKambojaFlower className="w-10 h-10" />
          <YellowKambojaFlower className="w-8 h-8" />
          <LeafBranchOrnament className="w-8 h-8" />
        </div>
      </motion.div>

      {/* Right Curtain Panel */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
        className="w-1/2 h-full relative flex flex-col justify-between items-start border-l-2 border-[#FAB313]/50 shadow-[-15px_0_40px_rgba(0,0,0,0.6)] overflow-hidden"
        style={{
          background: "linear-gradient(-135deg, #FFFDF9 0%, #FAF0E6 40%, #F5E6D3 80%, #E6CFA8 100%)",
        }}
      >
        {/* Satin Curtain Folds Texture overlay */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none" 
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(181,130,18,0.1) 0px, rgba(255,255,255,0.4) 30px, rgba(181,130,18,0.15) 60px)"
          }} 
        />

        {/* Top-Left Floral Swag on Right Curtain */}
        <div className="absolute top-4 left-2 z-10 flex flex-col items-start gap-2 pl-2">
          <div className="flex items-center gap-1">
            <YellowKambojaFlower className="w-10 h-10" />
            <PinkKambojaFlower className="w-12 h-12" />
            <LeafBranchOrnament className="w-8 h-8 -rotate-45" />
          </div>
          <div className="flex items-center gap-1 pl-4">
            <YellowKambojaFlower className="w-8 h-8" />
            <PinkKambojaFlower className="w-8 h-8" />
          </div>
          {/* Hanging flower string */}
          <div className="flex flex-col items-center gap-2 pl-6 mt-2 opacity-80">
            <span className="w-0.5 h-12 bg-gradient-to-b from-amber-400 to-pink-300" />
            <YellowKambojaFlower className="w-6 h-6 animate-pulse" />
            <span className="w-0.5 h-8 bg-gradient-to-b from-yellow-400 to-pink-400" />
            <PinkKambojaFlower className="w-5 h-5" />
          </div>
        </div>

        {/* Middle Royal Crest Ornament */}
        <div className="my-auto pl-6 text-amber-800/80 z-10 flex flex-col items-start">
          <div className="w-16 h-16 rounded-full border-2 border-[#FAB313]/60 bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <PinkKambojaFlower className="w-10 h-10" />
          </div>
        </div>

        {/* Bottom Floral Garland */}
        <div className="mb-8 pl-4 z-10 flex items-center gap-2">
          <LeafBranchOrnament className="w-8 h-8" />
          <YellowKambojaFlower className="w-8 h-8" />
          <PinkKambojaFlower className="w-10 h-10" />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Beautiful rotating and falling Pink & Yellow Kamboja flowers background effect.
 * Flowers drift downwards, rotating gracefully, creating a high-end Balinese atmosphere.
 */
interface FloatingFlower {
  id: number;
  left: number;
  scale: number;
  duration: number;
  delay: number;
  type: "real-pink" | "real-yellow" | "kamboja-pink" | "kamboja-yellow";
  rotateDirection: number;
}

export function FloatingKambojaFlowers() {
  const [flowers, setFlowers] = useState<FloatingFlower[]>([]);

  useEffect(() => {
    // Generate beautiful drifting flowers with static params to prevent jumpy re-renders
    const list: FloatingFlower[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5, // 5% to 95%
      scale: Math.random() * 0.4 + 0.45, // 0.45 to 0.85 scale
      duration: Math.random() * 8 + 12, // 12 to 20 seconds
      delay: Math.random() * -20, // Negative delay so some start mid-screen immediately!
      type: i % 4 === 0 ? "real-pink" : i % 4 === 1 ? "real-yellow" : i % 4 === 2 ? "kamboja-pink" : "kamboja-yellow",
      rotateDirection: Math.random() > 0.5 ? 1 : -1,
    }));
    setFlowers(list);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{ 
            left: `${f.left}%`, 
            top: "-50px",
            width: `${f.scale * 52}px`,
            height: `${f.scale * 52}px`,
          }}
          initial={{ y: "-10vh", rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            rotate: 360 * f.rotateDirection * 3,
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {f.type === "real-pink" ? (
            <img 
              src={singleRealDustyPinkRoseImg || singleRealPinkImg} 
              alt="Real Dusty Pink Rose" 
              className="w-full h-full object-contain drop-shadow-sm" 
            />
          ) : f.type === "real-yellow" ? (
            <img 
              src={singleRealYellowImg} 
              alt="Real Yellow Flower" 
              className="w-full h-full object-contain drop-shadow-sm" 
            />
          ) : f.type === "kamboja-pink" ? (
            <PinkKambojaFlower className="w-full h-full" />
          ) : (
            <YellowKambojaFlower className="w-full h-full" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Doodle Teratai (Lotus) Balinese Vector SVG
 */
export function DoodleTerataiFlower({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_2px_8px_rgba(216,196,158,0.5)]`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="teratai-grad" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="50%" stopColor="#F5EEDC" />
          <stop offset="85%" stopColor="#E2D0AF" />
          <stop offset="100%" stopColor="#C5A059" />
        </radialGradient>
        <radialGradient id="teratai-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>

      {/* Outer Lotus Petals */}
      <path d="M50 85 C30 85 10 70 15 50 C20 35 40 45 50 85 Z" fill="url(#teratai-grad)" stroke="#8C6C2E" strokeWidth="1.2" />
      <path d="M50 85 C70 85 90 70 85 50 C80 35 60 45 50 85 Z" fill="url(#teratai-grad)" stroke="#8C6C2E" strokeWidth="1.2" />
      
      {/* Mid Petals */}
      <path d="M50 82 C25 72 15 45 28 32 C38 25 46 45 50 82 Z" fill="url(#teratai-grad)" stroke="#8C6C2E" strokeWidth="1.2" />
      <path d="M50 82 C75 72 85 45 72 32 C62 25 54 45 50 82 Z" fill="url(#teratai-grad)" stroke="#8C6C2E" strokeWidth="1.2" />

      {/* Inner Petals */}
      <path d="M50 80 C32 60 25 30 40 18 C48 12 49 35 50 80 Z" fill="url(#teratai-grad)" stroke="#8C6C2E" strokeWidth="1.2" />
      <path d="M50 80 C68 60 75 30 60 18 C52 12 51 35 50 80 Z" fill="url(#teratai-grad)" stroke="#8C6C2E" strokeWidth="1.2" />

      {/* Center Crown Petal */}
      <path d="M50 78 C42 50 42 20 50 10 C58 20 58 50 50 78 Z" fill="#FFFDF9" stroke="#8C6C2E" strokeWidth="1.5" />

      {/* Golden Stamen Dots */}
      <circle cx="50" cy="55" r="7" fill="url(#teratai-center)" />
      <circle cx="45" cy="52" r="1.5" fill="#FFF" />
      <circle cx="55" cy="52" r="1.5" fill="#FFF" />
      <circle cx="50" cy="48" r="1.5" fill="#FFF" />
    </svg>
  );
}

/**
 * Doodle Kamboja (Frangipani) Balinese Vector SVG
 */
export function DoodleKambojaFlower({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`${className} filter drop-shadow-[0_2px_8px_rgba(216,196,158,0.5)]`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="doodle-kamboja-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="60%" stopColor="#F9F3E5" />
          <stop offset="100%" stopColor="#E2CFA8" />
        </radialGradient>
        <radialGradient id="doodle-kamboja-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="80%" stopColor="#D97706" />
        </radialGradient>
      </defs>

      {/* 5 Overlapping Petals with doodle stroke */}
      <g stroke="#8C6C2E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 50 C38 22, 62 18, 50 8 C62 20, 62 38, 50 50 Z" fill="url(#doodle-kamboja-grad)" />
        <path d="M50 50 C38 22, 62 18, 50 8 C62 20, 62 38, 50 50 Z" fill="url(#doodle-kamboja-grad)" transform="rotate(72, 50, 50)" />
        <path d="M50 50 C38 22, 62 18, 50 8 C62 20, 62 38, 50 50 Z" fill="url(#doodle-kamboja-grad)" transform="rotate(144, 50, 50)" />
        <path d="M50 50 C38 22, 62 18, 50 8 C62 20, 62 38, 50 50 Z" fill="url(#doodle-kamboja-grad)" transform="rotate(216, 50, 50)" />
        <path d="M50 50 C38 22, 62 18, 50 8 C62 20, 62 38, 50 50 Z" fill="url(#doodle-kamboja-grad)" transform="rotate(288, 50, 50)" />
      </g>

      {/* Warm Golden Center */}
      <circle cx="50" cy="50" r="12" fill="url(#doodle-kamboja-center)" />
      <circle cx="50" cy="50" r="5" fill="#FBBF24" />
    </svg>
  );
}

/**
 * Reusable Bouncy Spring Floral Pop-out decorator component
 */
export function BouncyFloralDecorator({
  flowerType = "teratai",
  sizeClass = "w-10 h-10 sm:w-12 sm:h-12",
  delay = 0,
  className = ""
}: {
  flowerType?: "teratai" | "kamboja" | "kamboja-pink" | "kamboja-yellow";
  sizeClass?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -25 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotate: 0
      }}
      viewport={{ once: false, margin: "-30px" }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 11,
        mass: 0.8,
        delay
      }}
      className={`inline-block pointer-events-none drop-shadow-md ${className}`}
    >
      <motion.div
        animate={{
          rotate: [-3, 3, -3],
          y: [-2, 2, -2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {flowerType === "teratai" ? (
          <DoodleTerataiFlower className={sizeClass} />
        ) : flowerType === "kamboja-pink" ? (
          <PinkKambojaFlower className={sizeClass} />
        ) : flowerType === "kamboja-yellow" ? (
          <YellowKambojaFlower className={sizeClass} />
        ) : (
          <DoodleKambojaFlower className={sizeClass} />
        )}
      </motion.div>
    </motion.div>
  );
}



