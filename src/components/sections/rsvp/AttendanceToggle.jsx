/** @format */

export default function AttendanceToggle({ value, onChange }) {
  const options = [
    { id: "hadir", label: "Hadir" },
    { id: "tidak_hadir", label: "Tidak Hadir" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={[
              "py-2.5 px-4 rounded-md border text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400",
              active
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-700",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
