"use client";
import React from "react";
import ResizableCard from "./ResizableCard";
import { useToolbar } from '../components/ToolbarContext';
import { getFeedbackText } from '../utils/feedbackText';

export const contactGridData = [
  { id: "map", type: "map" },
  { id: "headline", type: "headline" },
  { id: "linkedin", type: "linkedin" },
  { id: "email", type: "email" },
]; 