import { useMemo, useState } from "react";

type Unit = "kg" | "lb";

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

function fmt(n: number) {
  // evita muchos decimales feos
  return Number.isFinite(n) ? n.toFixed(n % 1 === 0 ? 0 : 1) : "—";
}

const KG_PLATES = [25, 20, 15, 10, 5, 2.5, 1.25];
const LB_PLATES = [45, 35, 25, 10, 5, 2.5];

function greedyPlates(perSide: number, plates: number[]) {
  // calcula discos por lado con algoritmo greedy (sirve bien con set común de placas)
  const result: { plate: number; count: number }[] = [];
  let remaining = perSide;

  for (const p of plates) {
    const c = Math.floor(remaining / p);
    if (c > 0) {
      result.push({ plate: p, count: c });
      remaining = Number((remaining - c * p).toFixed(4));
    }
  }

  return { result, remaining };
}

export default function App() {
  const [unit, setUnit] = useState<Unit>("kg");
  const [bar, setBar] = useState("20"); // 20 kg o 45 lb normalmente
  const [target, setTarget] = useState("80"); // peso total objetivo (barra + discos)

  const plates = unit === "kg" ? KG_PLATES : LB_PLATES;

  const computed = useMemo(() => {
    const barW = Number(bar);
    const targetW = Number(target);

    if (!Number.isFinite(barW) || barW <= 0) return null;
    if (!Number.isFinite(targetW) || targetW <= 0) return null;
    if (targetW < barW) return { error: "El peso objetivo no puede ser menor que la barra." };

    const totalPlates = targetW - barW;
    const perSideRaw = totalPlates / 2;

    // redondeo típico:
    // kg: a 1.25 (porque 2.5 total) / lb: a 2.5 (porque 5 total)
    const step = unit === "kg" ? 1.25 : 2.5;
    const perSide = roundTo(perSideRaw, step);

    const { result, remaining } = greedyPlates(perSide, plates);

    // aproximaciones (warm-up) en % del objetivo total
    const warmups = [0.4, 0.55, 0.7, 0.8, 0.9, 1.0].map((p) => ({
      pct: Math.round(p * 100),
      weight: roundTo(targetW * p, unit === "kg" ? 2.5 : 5), // redondeo práctico al total
      reps: p < 0.7 ? "8–5" : p < 0.9 ? "3–2" : p < 1 ? "1" : "Serie objetivo",
    }));

    return {
      barW,
      targetW,
      perSide,
      breakdown: result,
      remaining,
      warmups,
      step,
    };
  }, [bar, target, unit]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl p-6">
        <h1 className="text-2xl font-semibold">Gym Load Planner</h1>
        <p className="text-slate-300 mt-1">
          Calcula discos por lado y una guía de aproximaciones para llegar a tu peso objetivo.
        </p>

        {/* Controles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <label className="block">
            <span className="text-sm text-slate-300">Unidad</span>
            <select
              className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 outline-none focus:border-slate-600"
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Barra</span>
            <input
              className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 outline-none focus:border-slate-600"
              value={bar}
              onChange={(e) => setBar(e.target.value)}
              placeholder={unit === "kg" ? "20" : "45"}
            />
            <div className="text-xs text-slate-400 mt-1">
              Común: {unit === "kg" ? "20 kg" : "45 lb"}
            </div>
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">Peso objetivo total</span>
            <input
              className="mt-2 w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 outline-none focus:border-slate-600"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={unit === "kg" ? "80" : "185"}
            />
            <div className="text-xs text-slate-400 mt-1">
              Incluye barra + discos
            </div>
          </label>
        </div>

        {/* Resultados */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5">
            <div className="text-sm text-slate-300">Discos por lado</div>

            {!computed ? (
              <div className="mt-3 text-slate-400">—</div>
            ) : "error" in computed ? (
              <div className="mt-3 text-red-300">{computed.error}</div>
            ) : (
              <>
                <div className="mt-2 text-3xl font-bold">
                  {fmt(computed.perSide)} {unit} / lado
                </div>

                <div className="mt-3 text-sm text-slate-300">Desglose:</div>
                <ul className="mt-2 space-y-1 text-slate-200">
                  {computed.breakdown.length === 0 ? (
                    <li className="text-slate-400">No necesitas discos (solo barra).</li>
                  ) : (
                    computed.breakdown.map((x) => (
                      <li key={x.plate}>
                        {x.count} × {x.plate} {unit}
                      </li>
                    ))
                  )}
                </ul>

                {computed.remaining > 0.0001 && (
                  <div className="mt-3 text-xs text-amber-300">
                    Nota: faltan {fmt(computed.remaining)} {unit} por lado (depende de tus discos disponibles).
                  </div>
                )}

                <div className="mt-3 text-xs text-slate-400">
                  Redondeo aplicado por lado: {computed.step} {unit}
                </div>
              </>
            )}
          </div>

          <div className="h-full rounded-2xl bg-slate-950 border border-slate-800 p-5 ">
            <div className="text-sm text-slate-300">Aproximaciones (warm-up)</div>

            {!computed || ("error" in computed) ? (
              <div className="mt-3 text-slate-400">—</div>
            ) : (
              <div className="mt-3 space-y-2">
                {computed.warmups.map((w) => (
                  <div
                    key={w.pct}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3"
                  >
                    <div className="text-slate-200 font-medium">{w.pct}%</div>
                    <div className="text-slate-100">{fmt(w.weight)} {unit}</div>
                    <div className="text-slate-400 text-sm">{w.reps}</div>
                  </div>
                ))}

                <div className="text-xs text-slate-400 mt-2">
                  Consejo: mantén técnica limpia y sube progresivo. Si te sientes raro, baja la carga.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-500">
          Esta herramienta es orientativa. Entrena con buena técnica y supervisión si estás empezando.
        </div>
      </div>
    </div>
  );
}
