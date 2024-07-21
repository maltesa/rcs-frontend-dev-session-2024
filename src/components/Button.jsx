const variantClassName = {
  default: "bg-black text-white",
  outline: "bg-transparent text-black border border-black",
};

export function Button({ as, variant, className, ...props }) {
  const Component = as ?? "button";

  return (
    <Component
      className={`rounded-md px-4 py-2.5 cursor-pointer ${
        variantClassName[variant ?? "default"]
      } ${className}`}
      {...props}
    />
  );
}
