export const Divider = () => {
  return (
    <hr
      style={{
        height: 0,
        borderTopWidth: '2px',
        filter: 'drop-shadow(0 0 7px oklch(0.623 0.214 259.815))',
        willChange: 'filter',
        borderImage:
          '-webkit-linear-gradient(left, transparent, oklch(0.623 0.214 259.815), transparent) 1',
      }}
      className="my-4"
    />
  );
};
