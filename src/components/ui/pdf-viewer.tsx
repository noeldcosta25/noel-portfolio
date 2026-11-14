"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask, TextLayer } from "pdfjs-dist";
import { ChevronLeft, ChevronRight, Download, ExternalLink, FileText, LoaderCircle, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import "pdfjs-dist/web/pdf_viewer.css";

interface PdfViewerProps {
  file: string;
  downloadHref: string;
  name: string;
}

export function PdfViewer({ file, downloadHref, name }: PdfViewerProps) {
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [width, setWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  const host = useRef<HTMLDivElement>(null);
  const pageHost = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const textHost = useRef<HTMLDivElement>(null);
  const linkHost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let disposed = false;
    let task: ReturnType<typeof import("pdfjs-dist").getDocument> | undefined;
    setLoading(true);
    setError(false);
    setDocument(null);
    setCurrentPage(1);
    async function load() {
      try {
        const pdfjs = await import("pdfjs-dist");
        if (disposed) return;
        pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
        task = pdfjs.getDocument(file);
        const pdf = await task.promise;
        if (!disposed) setDocument(pdf);
      } catch {
        if (!disposed) setError(true);
      } finally {
        if (!disposed) setLoading(false);
      }
    }
    void load();
    return () => { disposed = true; void task?.destroy(); };
  }, [file, revision]);

  useEffect(() => {
    if (!document || !width) return;
    let disposed = false;
    let renderTask: RenderTask | undefined;
    let textLayer: TextLayer | undefined;
    setRendering(true);
    setError(false);
    async function render() {
      try {
        const pdfjs = await import("pdfjs-dist");
        const page = await document!.getPage(currentPage);
        if (disposed || !canvas.current || !pageHost.current || !textHost.current || !linkHost.current) return;
        const base = page.getViewport({ scale: 1, rotation });
        const scale = Math.min(Math.max(width - 32, 160), 820) / base.width * zoom;
        const viewport = page.getViewport({ scale, rotation });
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const node = canvas.current;
        node.width = Math.floor(viewport.width * ratio);
        node.height = Math.floor(viewport.height * ratio);
        node.style.width = `${viewport.width}px`;
        node.style.height = `${viewport.height}px`;
        pageHost.current.style.width = `${viewport.width}px`;
        pageHost.current.style.height = `${viewport.height}px`;
        pageHost.current.style.setProperty("--scale-factor", String(scale));
        pageHost.current.style.setProperty("--total-scale-factor", String(scale));
        textHost.current.replaceChildren();
        linkHost.current.replaceChildren();
        renderTask = page.render({ canvas: node, viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
        await renderTask.promise;
        if (disposed) return;
        textLayer = new pdfjs.TextLayer({ textContentSource: page.streamTextContent(), container: textHost.current, viewport });
        await textLayer.render();
        const annotations = await page.getAnnotations();
        if (disposed || !linkHost.current) return;
        for (const annotation of annotations) {
          if (!annotation.url || !/^https?:\/\/|^mailto:/i.test(annotation.url)) continue;
          const [x1, y1, x2, y2] = viewport.convertToViewportRectangle(annotation.rect);
          const anchor = window.document.createElement("a");
          anchor.href = annotation.url;
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
          anchor.setAttribute("aria-label", `Open ${annotation.url} (new tab)`);
          Object.assign(anchor.style, { position: "absolute", left: `${Math.min(x1, x2)}px`, top: `${Math.min(y1, y2)}px`, width: `${Math.abs(x2 - x1)}px`, height: `${Math.abs(y2 - y1)}px` });
          linkHost.current.append(anchor);
        }
      } catch {
        if (!disposed) setError(true);
      } finally {
        if (!disposed) setRendering(false);
      }
    }
    void render();
    return () => { disposed = true; renderTask?.cancel(); textLayer?.cancel(); };
  }, [document, currentPage, width, zoom, rotation]);

  const disabled = !document || loading;
  const control = "flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-[0_12px_50px_rgba(0,0,0,0.04)]" aria-label={`Resume PDF: ${name}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-6" role="toolbar" aria-label="PDF viewer controls">
        <div className="flex min-w-0 items-center gap-3">
          <FileText size={20} className="shrink-0 text-primary" aria-hidden="true" />
          <div><p className="text-sm font-semibold">Professional resume</p><p className="max-w-[220px] truncate text-xs text-muted-foreground">{name}</p></div>
        </div>
        <a href={downloadHref} className="apple-button apple-button-small"><Download size={15} aria-hidden="true" />Download</a>
        <div className="flex w-full flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
          <div className="flex items-center gap-1" role="group" aria-label="Page navigation">
            <button className={control} disabled={disabled || currentPage === 1} aria-label="Previous page" onClick={() => setCurrentPage((page) => page - 1)}><ChevronLeft size={17} /></button>
            <span className="min-w-20 text-center text-xs tabular-nums" aria-live="polite">{document ? `${currentPage} of ${document.numPages}` : "—"}</span>
            <button className={control} disabled={disabled || currentPage === document?.numPages} aria-label="Next page" onClick={() => setCurrentPage((page) => page + 1)}><ChevronRight size={17} /></button>
          </div>
          <div className="flex items-center gap-1" role="group" aria-label="Zoom and document controls">
            <button className={control} disabled={disabled || zoom <= 0.5} aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(0.5, value - 0.25))}><ZoomOut size={17} /></button>
            <button className="rounded-lg px-2 py-2 text-xs tabular-nums hover:bg-muted disabled:opacity-30" disabled={disabled} aria-label="Fit page to width" onClick={() => setZoom(1)}>{Math.round(zoom * 100)}%</button>
            <button className={control} disabled={disabled || zoom >= 2} aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(2, value + 0.25))}><ZoomIn size={17} /></button>
            <button className={control} disabled={disabled} aria-label="Rotate clockwise" onClick={() => setRotation((value) => (value + 90) % 360)}><RotateCw size={16} /></button>
            <a className={control} href={file} target="_blank" rel="noopener noreferrer" aria-label="Open PDF in a new tab"><ExternalLink size={16} /></a>
          </div>
        </div>
      </div>
      <div ref={host} className="relative h-[65vh] min-h-[420px] max-h-[1000px] overflow-auto bg-muted/70 p-4 sm:h-[80vh] sm:p-6" aria-busy={loading || rendering}>
        {error ? (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4 text-center">
            <FileText className="text-muted-foreground" size={32} />
            <p className="text-sm text-muted-foreground">The resume couldn’t be loaded. Please retry or open the PDF directly.</p>
            <button className="apple-button apple-button-small" onClick={() => setRevision((value) => value + 1)}>Try again</button>
            <a href={file} className="apple-link" target="_blank" rel="noopener noreferrer">Open PDF <ExternalLink size={14} /></a>
          </div>
        ) : (
          <div ref={pageHost} className="relative mx-auto bg-white shadow-md" style={{ visibility: loading ? "hidden" : "visible" }}>
            <canvas ref={canvas} aria-label={`Resume page ${currentPage}`} />
            <div ref={textHost} className="textLayer" />
            <div ref={linkHost} className="absolute inset-0 pointer-events-none [&>a]:pointer-events-auto [&>a:hover]:bg-blue-400/10" />
          </div>
        )}
        {!error && (loading || rendering) && <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-24" role="status"><div className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm"><LoaderCircle size={16} className="animate-spin" />{loading ? "Loading resume…" : "Rendering page…"}</div></div>}
      </div>
      <div className="flex flex-wrap justify-between gap-2 border-t border-border px-5 py-3 text-[11px] text-muted-foreground"><span>PDF document · Select text or follow links</span><span>Powered by Mozilla PDF.js</span></div>
    </div>
  );
}