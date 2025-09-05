import { useFinanceData } from "../context/DataContext";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getBaseUrl } from "@/utils/baseURL.js";
import capitalizeWords from "@/utils/capitalizeWord";

export default function AddPotsForm({ setToast, setIsAddPotsOpen }) {
  const { pots } = useFinanceData();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeRef = useRef(null);

  const themes = [
    { color: "Green", hex: "#277C78" },
    { color: "Yellow", hex: "#F2CDAC" },
    { color: "Cyan", hex: "#82C9D7" },
    { color: "Navy", hex: "#626070" },
    { color: "Red", hex: "#C94736" },
    { color: "Purple", hex: "#826CB0" },
    { color: "Turquoise", hex: "#597C7C" },
    { color: "Brown", hex: "#93674F" },
    { color: "Magenta", hex: "#934F6F" },
    { color: "Blue", hex: "#3F82B2" },
    { color: "Navy Gray", hex: "#97A0AC" },
    { color: "Army Green", hex: "#7F9161" },
    { color: "Pink", hex: "#826CB0" },
    { color: "Gold", hex: "#CAB361" },
    { color: "Orange", hex: "#BE6C49" },
  ];

  const usedThemes = themes
    .filter((t) => pots.some((p) => p.theme === t.hex))
    .map((t) => t.hex);

  const [potName, setPotName] = useState("");
  const [potTarget, setPotTarget] = useState("");
  const [potTheme, setPotTheme] = useState(
    themes.filter((t) => !pots.some((p) => p.theme === t.hex))[0]?.hex
  );

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${getBaseUrl()}/api/pots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: capitalizeWords(potName),
          target: Number(potTarget),
          theme: potTheme,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setToast({
          type: "error",
          message: errorData.message || "All fields are required",
        });

        setTimeout(() => {
          setToast(null);
        }, 3000);

        return;
      }

      await res.json();
      setToast({ type: "success", message: "New Pot Added successfully!" });
      setIsAddPotsOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setToast({ type: "error", message: "Network or server error" });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    }
  };

  const handleClickOutside = (e) => {
    if (themeRef.current && !themeRef.current.contains(e.target)) {
      setIsThemeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <p className="text-xs font-bold text-grey-500 mb-1">Pot Name</p>
          <input
            type="text"
            value={potName}
            placeholder="e.g. Rainy Days"
            onChange={(e) => setPotName(e.target.value)}
            className="w-full pl-3 p-2 border border-beige-500 rounded-md focus:border-gray-900"
          />
        </div>

        <div className="relative w-full ">
          <p className="text-xs font-bold text-grey-500 mb-1">Target</p>
          <span className="absolute left-3 top-[40px] -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            value={potTarget}
            placeholder="e.g. 2000"
            onChange={(e) => setPotTarget(e.target.value)}
            className="w-full pl-7 p-2 border border-beige-500 rounded-md focus:border-gray-900"
          />
        </div>

        <div className="relative w-full">
          <p className="text-xs font-bold text-grey-500 mb-1">Theme</p>
          <div ref={themeRef}>
            <button
              type="button"
              onClick={() => setIsThemeOpen((prev) => !prev)}
              className=" dropDown-btn "
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: themes.find((t) => t.hex === potTheme)
                      ?.hex,
                  }}
                ></div>
                <p className="text-sm text-gray-900 ">
                  {themes.find((t) => t.hex === potTheme)?.color}
                </p>
              </div>
              <span
                className={` transition-transform duration-700 ${
                  isThemeOpen ? "rotate-180" : ""
                }`}
              >
                <Image
                  src="/images/chevron-icon.svg"
                  alt="Caret down"
                  width={16}
                  height={16}
                />
              </span>
            </button>

            {isThemeOpen && (
              <div className="absolute mt-5 w-full h-40 overflow-auto bg-white rounded-md z-10 px-3 left-0 shadow-around">
                <ul className="py-1">
                  {themes.map((theme, index) => {
                    const isUsed = usedThemes.includes(theme.hex);

                    return (
                      <li
                        key={index}
                        onClick={() => (
                          !isUsed && setPotTheme(theme.hex),
                          setIsThemeOpen(false)
                        )}
                        className={`py-3 cursor-pointer flex justify-between items-center ${
                          index === 0 ? "" : "border-t border-gray-200"
                        } ${
                          isUsed
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-neutral-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              backgroundColor: theme.hex,
                            }}
                          ></div>
                          <p className="text-sm text-gray-900">{theme.color}</p>
                        </div>
                        <div>
                          {isUsed && <p className="preset-5">Already Used</p>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        className="text-sm text-white font-bold w-full bg-gray-900 p-4 rounded-lg mt-6"
        onClick={handleUpdate}
      >
        Add Pot
      </button>
    </>
  );
}
