export default function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        maskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)',
      }}
    />
  );
}
