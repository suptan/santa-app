type Size = "small" | "medium";

interface LoaderProps {
  active?: boolean;
  overlay?: boolean;
  thick?: Size;
  size?: Size;
}

export { LoaderProps };
