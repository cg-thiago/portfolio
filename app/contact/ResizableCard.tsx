"use client";
import React, { useState, ReactElement, isValidElement, cloneElement } from "react";
import { ExpandIcon, ShrinkIcon } from "lucide-react";
import { getFeedbackText } from '../utils/feedbackText';
import { useToolbar } from '../components/ToolbarContext';

export default function ResizableCard({
  children,
  defaultSize = "small",
}: {
  children: React.ReactNode;
  defaultSize?: "small" | "large";
}) {
  const [expanded, setExpanded] = useState(defaultSize === "large");
  const { setHoverText } = useToolbar();

  // Função utilitária para extrair o ícone do filho
  function extractIcon(child: React.ReactNode): React.ReactNode {
    if (!isValidElement(child)) return null;
    // Se for um link ou div com children, procurar SVG ou componente de ícone
    const inner = (child.props as any)?.children;
    if (Array.isArray(inner)) {
      // Procura o primeiro filho que seja SVG ou tenha 'Icon' no nome
      const icon = inner.find((el: any) => {
        if (!isValidElement(el)) return false;
        if (el.type === 'svg') return true;
        if (typeof el.type === 'function' && el.type.name && el.type.name.toLowerCase().includes('icon')) return true;
        return false;
      });
      if (icon && isValidElement(icon)) {
        // Só adiciona className se já existir ou for SVG
        if (typeof icon.type === 'string' && icon.type === 'svg') {
          const prev = (icon.props && typeof icon.props === 'object' && 'className' in icon.props) ? (icon.props.className as string) : '';
          // @ts-expect-error: className é válido para SVG
          return cloneElement(icon, { className: `${prev} mx-auto`.trim() });
        }
        // Não tenta passar className para outros tipos
        return icon;
      }
    } else if (isValidElement(inner)) {
      if (inner.type === 'svg') {
        const prev = (inner.props && typeof inner.props === 'object' && 'className' in inner.props) ? (inner.props.className as string) : '';
        // @ts-expect-error: className é válido para SVG
        return cloneElement(inner, { className: `${prev} mx-auto`.trim() });
      }
      // Não tenta passar className para outros tipos
      if (typeof inner.type === 'function' && inner.type.name && inner.type.name.toLowerCase().includes('icon')) return inner;
    }
    // Se não encontrar, retorna null
    return null;
  }

  const shouldShowOnlyIcon = !expanded;

  return (
    <div
      className={`
        rounded-xl shadow-lg bg-gradient-to-br from-gray-900 to-gray-800
        transition-all duration-300
        ${expanded ? "md:w-full h-[320px] p-8" : "md:w-1/3 h-[120px] p-4"}
        w-full mb-6 flex flex-col relative overflow-auto
      `}
      style={{
        minHeight: expanded ? 200 : 80,
        maxHeight: expanded ? 400 : 160,
      }}
    >
      <button
        className="absolute top-2 right-2 p-2 bg-black/30 rounded-full hover:bg-black/50 transition"
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? "Shrink" : "Expand"}
        type="button"
        onMouseEnter={() => {
          setHoverText('');
          setTimeout(() => setHoverText(getFeedbackText(expanded ? 'collapse' : 'expand')), 10);
        }}
        onMouseLeave={() => setHoverText('')}
      >
        {expanded ? <ShrinkIcon size={18} /> : <ExpandIcon size={18} />}
      </button>
      <div
        className={`w-full h-full flex-1 ${
          expanded ? "" : "flex items-center justify-center text-sm"
        }`}
        style={{ overflow: "auto" }}
      >
        {shouldShowOnlyIcon ? extractIcon(children) : children}
      </div>
    </div>
  );
} 