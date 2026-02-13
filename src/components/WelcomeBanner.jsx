export function WelcomeBanner({ name = "Learner" }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-linear-to-br from-white-600 to-pink-600 flex items-center justify-center text-white text-2xl border-2 border-(--brand-primary) border-b-2">
          👨🏾
        </div>
        <div>
          <h2 className="text-lg text-(--brand-primary) font-bold">
            Welcome back, {name}
          </h2>
          <p className="text-gray-600">
            Your transformation journey continues. Keep building your wings!
          </p>
        </div>
      </div>
    </div>
  );
}
