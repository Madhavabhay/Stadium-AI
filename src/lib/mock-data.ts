// Simulated telemetry for StadiumMind AI. Deterministic-ish values are
// good enough for a demo; components that want live movement layer their
// own useEffect tickers on top.

export const venue = {
  name: "SoFi Stadium",
  city: "Los Angeles",
  match: "USA vs. Mexico — Group Stage",
  kickoff: "20:00 PT",
  capacity: 70_240,
  occupancy: 68_402,
  weather: "Clear · 24°C",
};

export type Sector = {
  id: string;
  name: string;
  occupancy: number; // 0..1
  flow: number; // fans/min
  status: "nominal" | "watch" | "critical";
};

export const sectors: Sector[] = [
  { id: "A", name: "Gate A · North", occupancy: 0.92, flow: 214, status: "critical" },
  { id: "B", name: "Gate B · East", occupancy: 0.45, flow: 88, status: "nominal" },
  { id: "C", name: "Gate C · South", occupancy: 0.71, flow: 142, status: "watch" },
  { id: "D", name: "Gate D · West", occupancy: 0.58, flow: 104, status: "nominal" },
  { id: "VIP", name: "VIP Concourse", occupancy: 0.34, flow: 28, status: "nominal" },
  { id: "ACC", name: "Accessible Entry", occupancy: 0.22, flow: 18, status: "nominal" },
];

export type Incident = {
  id: string;
  time: string;
  kind: "medical" | "security" | "missing" | "fire" | "system" | "transit";
  priority: "critical" | "high" | "info";
  title: string;
  detail: string;
  ai: string;
};

export const incidents: Incident[] = [
  {
    id: "INC-092",
    time: "18:22",
    kind: "medical",
    priority: "critical",
    title: "Heat exhaustion · Section 302, Row G",
    detail: "Volunteer report from Unit 07. Fan responsive, requesting shade.",
    ai: "Dispatched Volunteer Unit 14. Nearest medical station (Room 12) notified. Elevator 4 clear for transport in 40s.",
  },
  {
    id: "INC-091",
    time: "18:14",
    kind: "system",
    priority: "high",
    title: "West Wing restroom queue > 12 min",
    detail: "Camera metadata + door counter agree on sustained backlog.",
    ai: "Push notification sent to 3,412 fans in radius. Suggested South Wing (2 min wait) — 41% redirect rate.",
  },
  {
    id: "INC-088",
    time: "18:04",
    kind: "missing",
    priority: "high",
    title: "Missing child · reported at Guest Services N-2",
    detail: "8-year-old, red USA jersey #10, last seen near Merch Kiosk N-4.",
    ai: "CCTV metadata match likelihood 78% at concourse camera N-3-CAM-11 (17:59). Security team Bravo en route.",
  },
  {
    id: "INC-084",
    time: "17:58",
    kind: "transit",
    priority: "info",
    title: "Metro Line C frequency increased",
    detail: "LA Metro confirmed 3-min headways through post-match window.",
    ai: "Updated post-match departure recommendations. Estimated home-flow delay drop: −8 min.",
  },
  {
    id: "INC-081",
    time: "17:41",
    kind: "security",
    priority: "info",
    title: "Unattended bag · Concourse C, Bay 4",
    detail: "Reported by staff badge #4482.",
    ai: "Owner located via ticket beacon in 96s. Bag cleared. No escalation required.",
  },
];

export const transport = {
  metro: [
    { line: "Line A · Downtown", status: "nominal", eta: "3 min", crowding: 0.55 },
    { line: "Line C · Airport", status: "delayed", eta: "+12 min", crowding: 0.82 },
    { line: "Line E · Expo", status: "nominal", eta: "5 min", crowding: 0.4 },
  ],
  parking: [
    { lot: "Lot 1 · North", available: 412, total: 3200 },
    { lot: "Lot 4 · East", available: 1_204, total: 2800 },
    { lot: "VIP Garage", available: 88, total: 400 },
  ],
  buses: [
    { route: "Shuttle 405", crowding: 0.7, eta: "6 min" },
    { route: "Shuttle Union", crowding: 0.42, eta: "9 min" },
  ],
};

export const queues = [
  { name: "Food · Concourse B", wait: 14, suggestion: "Walk 80m to Concourse D — wait 2 min" },
  { name: "Food · Section 118", wait: 8, suggestion: "Nearby kiosk 118-B — wait 3 min" },
  { name: "Restroom · West Wing", wait: 12, suggestion: "South Wing — wait 2 min" },
  { name: "Merch · Main Store", wait: 22, suggestion: "Pop-up Kiosk N-4 — wait 5 min" },
];

export const volunteers = [
  { id: "V-14", name: "M. Alvarez", role: "Medical", location: "Sec 302", status: "on-task" },
  { id: "V-22", name: "K. Okafor", role: "Wayfinding", location: "Gate B", status: "available" },
  { id: "V-31", name: "P. Nakamura", role: "Accessibility", location: "Elev. 4", status: "available" },
  { id: "V-07", name: "R. Silva", role: "Language · PT/ES", location: "Concourse A", status: "on-task" },
];

export const sustainability = {
  waterSaved: "18,240 L",
  energyRenewable: 74,
  wasteDiverted: 62,
  co2Offset: "3.2 t",
};

export const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "hi", label: "हिन्दी" },
  { code: "ar", label: "العربية" },
  { code: "ja", label: "日本語" },
];

export const conciergePresets = [
  {
    q: "Where is the nearest wheelchair-accessible restroom?",
    a: "Level 200 · West Concourse, 60m from your seat. Elevator 4 (currently clear). Estimated walk: 90 seconds. I've marked the route on your map.",
  },
  {
    q: "¿Dónde puedo comprar la camiseta oficial?",
    a: "Tienda oficial en la Puerta A (cola actual: 22 min). Kiosco emergente N-4 tiene el mismo inventario con 5 min de espera. ¿Le guío?",
  },
  {
    q: "How do I get to Union Station after the match?",
    a: "Best option: Metro Line A from Stadium South at 22:45. Predicted crowding 62%. If you leave 8 min after final whistle, expected home time 23:31.",
  },
];