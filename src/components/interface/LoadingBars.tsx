export default function LoadingBars() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="flex items-center justify-center">
        <span
          className="inline-block w-[3px] h-5 bg-white/50 rounded-[10px] animate-[scale-up4_1s_linear_infinite]"
        />
        <span
          className="inline-block w-[3px] h-[35px] mx-[5px] bg-white/50 rounded-[10px] animate-[scale-up4_1s_linear_infinite]"
          style={{ animationDelay: "0.25s" }}
        />
        <span
          className="inline-block w-[3px] h-5 bg-white/50 rounded-[10px] animate-[scale-up4_1s_linear_infinite]"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Keyframes via inline <style> (sem config do tailwind.config.js) */}
      <style>
        {`
          @keyframes scale-up4 {
            20% {
              background-color: white;
              transform: scaleY(1.5);
            }
            40% {
              transform: scaleY(1);
            }
          }
        `}
      </style>
    </div>
  );
}
